"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import bcrypt from "bcryptjs";
import { createSessionToken, requireSession, SESSION_COOKIE } from "@/lib/adminAuth";
import {
  getCalendarEvents,
  saveCalendarEvents,
  slugifyEventTitle,
  uploadFlier,
} from "@/lib/calendarStore";
import type { CalendarEvent } from "@/lib/site";

export type FormState = { error?: string } | undefined;

export async function login(_prevState: FormState, formData: FormData): Promise<FormState> {
  const username = String(formData.get("username") ?? "");
  const password = String(formData.get("password") ?? "");

  const expectedUsername = process.env.ADMIN_USERNAME;
  // Stored base64-encoded, not as a raw bcrypt hash: a raw hash starts with
  // "$2b$", and both Next.js's local .env loading and (per Vercel's own
  // guidance) its dashboard env vars run values through dotenv-style $
  // expansion, which silently mangles a leading-$ value. Base64 never
  // contains "$", so this sidesteps the bug entirely rather than relying on
  // everyone who ever edits this value to remember to escape it correctly.
  const expectedHashEncoded = process.env.ADMIN_PASSWORD_HASH;
  const expectedHash = expectedHashEncoded
    ? Buffer.from(expectedHashEncoded, "base64").toString("utf8")
    : undefined;

  if (!expectedUsername || !expectedHash) {
    return { error: "Admin login isn't configured yet." };
  }

  const usernameOk = username === expectedUsername;
  const passwordOk = await bcrypt.compare(password, expectedHash);

  if (!usernameOk || !passwordOk) {
    return { error: "Incorrect username or password." };
  }

  const token = await createSessionToken(username);
  const store = await cookies();
  store.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 14,
  });

  redirect("/admin");
}

export async function logout(): Promise<void> {
  const store = await cookies();
  store.delete(SESSION_COOKIE);
  redirect("/admin/login");
}

function parseDaysOfWeek(formData: FormData): number[] {
  return formData
    .getAll("daysOfWeek")
    .map((v) => Number(v))
    .filter((n) => Number.isInteger(n) && n >= 0 && n <= 6);
}

/**
 * Handles both create and edit. On edit, `originalSlug` (a hidden field)
 * identifies which entry to replace; slugs never change after creation, so
 * nothing else that might reference one can break.
 */
export async function saveEvent(_prevState: FormState, formData: FormData): Promise<FormState> {
  await requireSession();

  const title = String(formData.get("title") ?? "").trim();
  const time = String(formData.get("time") ?? "").trim();
  const location = String(formData.get("location") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  const recurrence = formData.get("recurrence") === "once" ? "once" : "weekly";
  const originalSlug = String(formData.get("originalSlug") ?? "");
  const removeFlier = formData.get("removeFlier") === "on";
  const existingFlierSrc = String(formData.get("existingFlierSrc") ?? "");
  const existingFlierAlt = String(formData.get("existingFlierAlt") ?? "");
  const flierAltInput = String(formData.get("flierAlt") ?? "").trim();
  const flierFile = formData.get("flier");

  if (!title) return { error: "Title is required." };
  if (!description) return { error: "Description is required." };

  let events: CalendarEvent[];
  try {
    events = await getCalendarEvents();
  } catch {
    return { error: "Couldn't reach storage. Please try again in a moment." };
  }

  let flier: { src: string; alt: string } | undefined;
  if (!removeFlier) {
    if (flierFile instanceof File && flierFile.size > 0) {
      if (!flierAltInput) {
        return { error: "A flier description (alt text) is required when uploading a flier." };
      }
      try {
        flier = await uploadFlier(flierFile, flierAltInput);
      } catch {
        return { error: "Couldn't upload the flier. Please try again." };
      }
    } else if (existingFlierSrc) {
      flier = { src: existingFlierSrc, alt: existingFlierAlt };
    }
  }

  const base = {
    title,
    time: time || undefined,
    location: location || undefined,
    description,
    flier,
  };

  let event: CalendarEvent;
  if (recurrence === "once") {
    const date = String(formData.get("date") ?? "");
    if (!date) return { error: "A date is required for a one-off event." };
    event = { ...base, slug: "", recurrence: "once", date };
  } else {
    const daysOfWeek = parseDaysOfWeek(formData);
    if (daysOfWeek.length === 0) {
      return { error: "Pick at least one day of the week." };
    }
    event = { ...base, slug: "", recurrence: "weekly", daysOfWeek };
  }

  const existingIndex = originalSlug ? events.findIndex((e) => e.slug === originalSlug) : -1;

  if (existingIndex >= 0) {
    event.slug = originalSlug;
    events[existingIndex] = event;
  } else {
    event.slug = slugifyEventTitle(title, events);
    events.push(event);
  }

  try {
    await saveCalendarEvents(events);
  } catch {
    return { error: "Couldn't save. Please try again in a moment." };
  }

  redirect("/admin");
}

export async function deleteEvent(formData: FormData): Promise<void> {
  await requireSession();
  const slug = String(formData.get("slug") ?? "");

  try {
    const events = await getCalendarEvents();
    await saveCalendarEvents(events.filter((e) => e.slug !== slug));
  } catch {
    redirect("/admin?error=delete-failed");
  }

  redirect("/admin");
}
