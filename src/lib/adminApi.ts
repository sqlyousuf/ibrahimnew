"use client";

/**
 * Browser-side calls to the Worker's admin API (worker/index.ts). The
 * session is an HttpOnly cookie the Worker sets on login, so these never
 * handle a token themselves.
 */

import type { CalendarEvent } from "./site";

export class AdminApiError extends Error {
  constructor(
    message: string,
    readonly status: number,
  ) {
    super(message);
  }
}

async function call<T>(path: string, init: RequestInit = {}): Promise<T> {
  const res = await fetch(`/api/admin/${path}`, { cache: "no-store", ...init });
  const data = (await res.json().catch(() => ({}))) as T & { error?: string };
  if (!res.ok) {
    throw new AdminApiError(data.error || "Something went wrong. Please try again.", res.status);
  }
  return data;
}

function postJson<T>(path: string, body: unknown): Promise<T> {
  return call<T>(path, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(body),
  });
}

export const adminApi = {
  login: (username: string, password: string) =>
    postJson<{ ok: true }>("login", { username, password }),
  logout: () => postJson<{ ok: true }>("logout", {}),
  session: () => call<{ ok: true }>("session"),
  events: () => call<CalendarEvent[]>("events"),
  saveEvent: (input: Record<string, unknown>) => postJson<{ slug: string }>("events", input),
  deleteEvent: (slug: string) =>
    call<{ ok: true }>(`events/${encodeURIComponent(slug)}`, { method: "DELETE" }),
  /** Sends the raw file as the body — the Worker stores it as-is. */
  uploadFlier: (file: File) =>
    call<{ src: string }>("upload", {
      method: "POST",
      headers: { "content-type": file.type || "image/jpeg" },
      body: file,
    }),
};
