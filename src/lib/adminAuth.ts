/**
 * Session handling for the "This Week" admin panel — a single shared login
 * (no user database), credentials from environment variables. Split
 * deliberately so the session-verification half (`jose`, pure JS) works in
 * both the Edge runtime (`proxy.ts`) and the Node runtime (Server Actions),
 * while the password check (`bcryptjs`) only ever runs in the login Server
 * Action.
 */

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { SignJWT, jwtVerify } from "jose";

export const SESSION_COOKIE = "mi_admin_session";
const SESSION_DURATION_SECONDS = 60 * 60 * 24 * 14; // 14 days

function getSecretKey(): Uint8Array {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret) {
    throw new Error("ADMIN_SESSION_SECRET is not set");
  }
  return new TextEncoder().encode(secret);
}

export async function createSessionToken(username: string): Promise<string> {
  return new SignJWT({ sub: username })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${SESSION_DURATION_SECONDS}s`)
    .sign(getSecretKey());
}

export async function verifySessionToken(token: string): Promise<boolean> {
  try {
    await jwtVerify(token, getSecretKey());
    return true;
  } catch {
    return false;
  }
}

/**
 * Defense-in-depth check for Server Actions and admin pages — proxy.ts
 * already gates page navigation, but a Server Action can in principle be
 * invoked directly, so every admin mutation re-checks the session itself
 * rather than trusting proxy.ts alone.
 */
export async function requireSession(): Promise<void> {
  const store = await cookies();
  const token = store.get(SESSION_COOKIE)?.value;
  const valid = token ? await verifySessionToken(token) : false;
  if (!valid) {
    redirect("/admin/login");
  }
}
