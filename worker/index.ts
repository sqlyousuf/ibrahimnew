/**
 * The site's only server code — a Cloudflare Worker sized for the Workers
 * Free plan (10ms CPU per request).
 *
 * The Next.js app is a static export (`out/`) served straight from Workers
 * static assets, which never invokes this script and costs no CPU. Only
 * `/api/*` and `/media/*` reach here (see `run_worker_first` in
 * wrangler.jsonc), and every route is I/O-bound: a Masjidal fetch, a KV
 * read/write, an HMAC. Nothing does real computation — which is why the
 * admin password check is an HMAC comparison rather than bcrypt (~100ms of
 * CPU by design, far over the limit).
 *
 * Storage is one KV namespace (free tier, no card needed):
 * - `calendar-events`   — the This Week ad-hoc entries, one JSON array
 * - `flier:<file>`      — uploaded flier images, served at /media/fliers/<file>
 * - `prayer:<date>`     — today's Masjidal response, cached 30 minutes
 */

import { jwtVerify, SignJWT } from "jose";
import { fetchMasjidalRange } from "../src/lib/masjidal";
import { buildPrayerPayload, getMasjidDateKey, rangeEndKey } from "../src/lib/prayerTimes";
import type { CalendarEvent } from "../src/lib/site";

// --------------------------------------------------------------------- Types
// Declared by hand (just what's used) rather than pulling in
// @cloudflare/workers-types, whose globals clash with the DOM lib the Next
// app type-checks against.

interface KVNamespace {
  get(key: string, type: "text"): Promise<string | null>;
  getWithMetadata<M>(
    key: string,
    options: { type: "stream" },
  ): Promise<{ value: ReadableStream | null; metadata: M | null }>;
  put(
    key: string,
    value: string | ArrayBuffer,
    options?: { expirationTtl?: number; metadata?: unknown },
  ): Promise<void>;
}

interface Env {
  ASSETS: { fetch(request: Request): Promise<Response> };
  SITE_KV: KVNamespace;
  MASJIDAL_SERVER_KEY?: string;
  ADMIN_USERNAME?: string;
  ADMIN_PASSWORD?: string;
  ADMIN_SESSION_SECRET?: string;
}

// ----------------------------------------------------------------- Constants

const EVENTS_KEY = "calendar-events";
const PRAYER_TTL_SECONDS = 1800;
const MAX_FLIER_BYTES = 4 * 1024 * 1024;
const SESSION_COOKIE = "mi_admin_session";
const SESSION_SECONDS = 60 * 60 * 24 * 14;

// ------------------------------------------------------------------- Helpers

function json(data: unknown, status = 200, headers: HeadersInit = {}): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "content-type": "application/json; charset=utf-8", ...headers },
  });
}

function error(message: string, status: number): Response {
  return json({ error: message }, status, { "cache-control": "no-store" });
}

async function readEvents(env: Env): Promise<CalendarEvent[]> {
  const raw = await env.SITE_KV.get(EVENTS_KEY, "text");
  if (!raw) return [];
  try {
    const data: unknown = JSON.parse(raw);
    return Array.isArray(data) ? (data as CalendarEvent[]) : [];
  } catch {
    return [];
  }
}

async function writeEvents(env: Env, events: CalendarEvent[]): Promise<void> {
  await env.SITE_KV.put(EVENTS_KEY, JSON.stringify(events));
}

/** kebab-case, collision-safe against the current list. */
function slugify(title: string, existing: CalendarEvent[]): string {
  const base =
    title
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "") || "event";
  const taken = new Set(existing.map((e) => e.slug));
  if (!taken.has(base)) return base;
  let suffix = 2;
  while (taken.has(`${base}-${suffix}`)) suffix += 1;
  return `${base}-${suffix}`;
}

// ----------------------------------------------------------------- Sessions

function sessionKey(env: Env): Uint8Array | null {
  return env.ADMIN_SESSION_SECRET ? new TextEncoder().encode(env.ADMIN_SESSION_SECRET) : null;
}

function readCookie(request: Request, name: string): string | null {
  const header = request.headers.get("cookie") ?? "";
  for (const part of header.split(";")) {
    const [k, ...v] = part.trim().split("=");
    if (k === name) return v.join("=");
  }
  return null;
}

async function isAuthenticated(request: Request, env: Env): Promise<boolean> {
  const key = sessionKey(env);
  const token = readCookie(request, SESSION_COOKIE);
  if (!key || !token) return false;
  try {
    await jwtVerify(token, key);
    return true;
  } catch {
    return false;
  }
}

function sessionCookie(value: string, maxAge: number, secure: boolean): string {
  return [
    `${SESSION_COOKIE}=${value}`,
    "Path=/",
    "HttpOnly",
    "SameSite=Strict",
    `Max-Age=${maxAge}`,
    secure ? "Secure" : "",
  ]
    .filter(Boolean)
    .join("; ");
}

/**
 * Constant-time string comparison: HMAC both sides under a per-request
 * random key, then compare digests. Costs two HMACs — microseconds.
 */
async function safeEqual(a: string, b: string): Promise<boolean> {
  const key = await crypto.subtle.generateKey({ name: "HMAC", hash: "SHA-256" }, false, [
    "sign",
  ]);
  const enc = new TextEncoder();
  const [da, db] = await Promise.all([
    crypto.subtle.sign("HMAC", key, enc.encode(a)),
    crypto.subtle.sign("HMAC", key, enc.encode(b)),
  ]);
  const x = new Uint8Array(da);
  const y = new Uint8Array(db);
  let diff = 0;
  for (let i = 0; i < x.length; i++) diff |= x[i] ^ y[i];
  return diff === 0;
}

/**
 * Mutations must be same-origin JSON (or an image upload). A cross-site
 * <form> can only send form/text content types, so this — plus the
 * SameSite=Strict cookie — closes off CSRF without a token.
 */
function isSafeMutation(request: Request, expect: "json" | "image"): boolean {
  const type = request.headers.get("content-type") ?? "";
  return expect === "json" ? type.startsWith("application/json") : type.startsWith("image/");
}

// -------------------------------------------------------------------- Routes

async function prayer(env: Env): Promise<Response> {
  const now = new Date();
  const dateKey = getMasjidDateKey(now);
  const cacheKey = `prayer:${dateKey}`;
  const headers = { "cache-control": "public, max-age=300" };

  const cached = await env.SITE_KV.get(cacheKey, "text");
  if (cached) return new Response(cached, { headers: { ...headers, "content-type": "application/json; charset=utf-8" } });

  const timings = env.MASJIDAL_SERVER_KEY
    ? await fetchMasjidalRange(env.MASJIDAL_SERVER_KEY, dateKey, rangeEndKey(dateKey, 7))
    : null;
  if (!env.MASJIDAL_SERVER_KEY) console.error("MASJIDAL_SERVER_KEY is not set");

  const payload = buildPrayerPayload(now, timings);
  if (timings) {
    // Only cache a good answer — an outage should retry on the next visit.
    await env.SITE_KV.put(cacheKey, JSON.stringify(payload), {
      expirationTtl: PRAYER_TTL_SECONDS,
    });
    return json(payload, 200, headers);
  }
  return json(payload, 200, { "cache-control": "no-store" });
}

async function publicEvents(env: Env): Promise<Response> {
  return json(await readEvents(env), 200, { "cache-control": "public, max-age=60" });
}

async function flier(env: Env, name: string): Promise<Response> {
  const { value, metadata } = await env.SITE_KV.getWithMetadata<{ contentType?: string }>(
    `flier:${name}`,
    { type: "stream" },
  );
  if (!value) return new Response("Not found", { status: 404 });
  return new Response(value, {
    headers: {
      "content-type": metadata?.contentType ?? "application/octet-stream",
      // File names are random UUIDs, never reused — cache forever.
      "cache-control": "public, max-age=31536000, immutable",
    },
  });
}

async function login(request: Request, env: Env): Promise<Response> {
  if (!isSafeMutation(request, "json")) return error("Bad request", 400);
  const key = sessionKey(env);
  if (!env.ADMIN_USERNAME || !env.ADMIN_PASSWORD || !key) {
    return error("Admin login isn't configured yet.", 503);
  }

  const body = (await request.json().catch(() => ({}))) as {
    username?: unknown;
    password?: unknown;
  };
  const [userOk, passOk] = await Promise.all([
    safeEqual(String(body.username ?? ""), env.ADMIN_USERNAME),
    safeEqual(String(body.password ?? ""), env.ADMIN_PASSWORD),
  ]);
  if (!userOk || !passOk) {
    // Wall-clock delay (not CPU) to blunt password guessing.
    await new Promise((resolve) => setTimeout(resolve, 800));
    return error("Incorrect username or password.", 401);
  }

  const token = await new SignJWT({ sub: env.ADMIN_USERNAME })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${SESSION_SECONDS}s`)
    .sign(key);
  const secure = new URL(request.url).protocol === "https:";
  return json({ ok: true }, 200, {
    "set-cookie": sessionCookie(token, SESSION_SECONDS, secure),
    "cache-control": "no-store",
  });
}

function logout(request: Request): Response {
  const secure = new URL(request.url).protocol === "https:";
  return json({ ok: true }, 200, {
    "set-cookie": sessionCookie("", 0, secure),
    "cache-control": "no-store",
  });
}

/** Create or edit — `originalSlug` picks the entry to replace. */
async function saveEvent(request: Request, env: Env): Promise<Response> {
  if (!isSafeMutation(request, "json")) return error("Bad request", 400);
  const input = (await request.json().catch(() => null)) as Record<string, unknown> | null;
  if (!input) return error("Bad request", 400);

  const text = (field: string) => String(input[field] ?? "").trim();
  const title = text("title");
  const description = text("description");
  const flierSrc = text("flierSrc");
  const flierAlt = text("flierAlt");
  const originalSlug = text("originalSlug");

  if (!title) return error("Title is required.", 400);
  if (!description) return error("Description is required.", 400);
  if (flierSrc && !flierAlt) {
    return error("A flier description (alt text) is required when a flier is attached.", 400);
  }

  const base = {
    slug: "",
    title,
    time: text("time") || undefined,
    location: text("location") || undefined,
    description,
    flier: flierSrc ? { src: flierSrc, alt: flierAlt } : undefined,
  };

  let event: CalendarEvent;
  if (input.recurrence === "once") {
    const date = text("date");
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) return error("A date is required for a one-off event.", 400);
    event = { ...base, recurrence: "once", date };
  } else {
    const days = Array.isArray(input.daysOfWeek) ? input.daysOfWeek : [];
    const daysOfWeek = [...new Set(days.map(Number))].filter(
      (n) => Number.isInteger(n) && n >= 0 && n <= 6,
    );
    if (daysOfWeek.length === 0) return error("Pick at least one day of the week.", 400);
    event = { ...base, recurrence: "weekly", daysOfWeek };
  }

  const events = await readEvents(env);
  const index = originalSlug ? events.findIndex((e) => e.slug === originalSlug) : -1;
  if (index >= 0) {
    event.slug = originalSlug;
    events[index] = event;
  } else {
    event.slug = slugify(title, events);
    events.push(event);
  }

  await writeEvents(env, events);
  return json({ slug: event.slug }, 200, { "cache-control": "no-store" });
}

async function deleteEvent(env: Env, slug: string): Promise<Response> {
  const events = await readEvents(env);
  await writeEvents(
    env,
    events.filter((e) => e.slug !== slug),
  );
  return json({ ok: true }, 200, { "cache-control": "no-store" });
}

/** Raw image body (not multipart — nothing to parse, so near-zero CPU). */
async function upload(request: Request, env: Env): Promise<Response> {
  if (!isSafeMutation(request, "image")) return error("The flier must be an image file", 400);
  const declared = Number(request.headers.get("content-length") ?? 0);
  if (declared > MAX_FLIER_BYTES) {
    return error(`That image is too large — please use one under ${MAX_FLIER_BYTES / (1024 * 1024)}MB.`, 413);
  }

  const bytes = await request.arrayBuffer();
  if (bytes.byteLength === 0) return error("No file provided", 400);
  if (bytes.byteLength > MAX_FLIER_BYTES) {
    return error(`That image is too large — please use one under ${MAX_FLIER_BYTES / (1024 * 1024)}MB.`, 413);
  }

  const contentType = request.headers.get("content-type") ?? "image/jpeg";
  const ext = (contentType.split("/")[1] ?? "jpg").replace(/[^a-z0-9]/gi, "").slice(0, 5) || "jpg";
  const name = `${crypto.randomUUID()}.${ext}`;
  await env.SITE_KV.put(`flier:${name}`, bytes, { metadata: { contentType } });
  return json({ src: `/media/fliers/${name}` }, 200, { "cache-control": "no-store" });
}

// -------------------------------------------------------------------- Router

const worker = {
  async fetch(request: Request, env: Env): Promise<Response> {
    const { pathname } = new URL(request.url);
    const method = request.method;

    try {
      if (method === "GET" && pathname === "/api/prayer") return await prayer(env);
      if (method === "GET" && pathname === "/api/events") return await publicEvents(env);
      if (method === "GET" && pathname.startsWith("/media/fliers/")) {
        return await flier(env, decodeURIComponent(pathname.slice("/media/fliers/".length)));
      }

      if (pathname.startsWith("/api/admin/")) {
        const route = pathname.slice("/api/admin/".length);
        if (method === "POST" && route === "login") return await login(request, env);
        if (method === "POST" && route === "logout") return logout(request);

        if (!(await isAuthenticated(request, env))) return error("Not authenticated", 401);

        if (method === "GET" && route === "session") return json({ ok: true }, 200, { "cache-control": "no-store" });
        if (method === "GET" && route === "events") {
          return json(await readEvents(env), 200, { "cache-control": "no-store" });
        }
        if (method === "POST" && route === "events") return await saveEvent(request, env);
        if (method === "DELETE" && route.startsWith("events/")) {
          return await deleteEvent(env, decodeURIComponent(route.slice("events/".length)));
        }
        if (method === "POST" && route === "upload") return await upload(request, env);
      }

      if (pathname.startsWith("/api/") || pathname.startsWith("/media/")) {
        return error("Not found", 404);
      }
      return env.ASSETS.fetch(request);
    } catch (err) {
      console.error(err);
      return error("Something went wrong. Please try again.", 500);
    }
  },
};

export default worker;
