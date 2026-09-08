/**
 * Reads and writes the ad-hoc "This Week" calendar entries — the one thing
 * the admin panel edits — as a single JSON file in Vercel Blob. Recurring
 * Institute programs stay static in site.ts; this store only covers
 * `calendarEvents`. Whole-file overwrite on every save: fine at this scale
 * (a handful of entries, occasional edits by a small team) — not worth a
 * real database's concurrency machinery.
 *
 * Flier images are uploaded separately, straight from the browser to Blob
 * (see src/app/api/admin/upload/route.ts and EventForm.tsx) rather than
 * through a helper here — routing a multi-MB photo through a Server Action
 * hits Next's 1MB default body limit.
 */

import { head, put } from "@vercel/blob";
import type { CalendarEvent } from "@/lib/site";

const EVENTS_PATHNAME = "data/calendar-events.json";

export async function getCalendarEvents(): Promise<CalendarEvent[]> {
  try {
    const blob = await head(EVENTS_PATHNAME);
    const res = await fetch(blob.url, { cache: "no-store" });
    if (!res.ok) return [];
    const data: unknown = await res.json();
    return Array.isArray(data) ? (data as CalendarEvent[]) : [];
  } catch {
    // No file yet (first run before any admin save) — no ad-hoc events.
    return [];
  }
}

export async function saveCalendarEvents(events: CalendarEvent[]): Promise<void> {
  await put(EVENTS_PATHNAME, JSON.stringify(events, null, 2), {
    access: "public",
    contentType: "application/json",
    addRandomSuffix: false,
    allowOverwrite: true,
  });
}

/** kebab-case, collision-safe against the current list. */
export function slugifyEventTitle(title: string, existing: CalendarEvent[]): string {
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
