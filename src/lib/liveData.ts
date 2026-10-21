"use client";

/**
 * Live data for the static site. Pages are prebuilt HTML; the things that
 * change are fetched in the browser — today's salah times straight from
 * Masjidal's public feed, and the This Week entries from the Worker
 * (worker/index.ts).
 *
 * Each resource is fetched once per page load and shared by every component
 * that reads it (the prayer board and the phone prayer bar both use the same
 * request), via useSyncExternalStore so there's no extra render pass.
 */

import { useSyncExternalStore } from "react";
import { fetchMasjidalRange } from "./masjidal";
import { buildPrayerPayload, getMasjidDateKey, rangeEndKey } from "./prayerTimes";
import type { PrayerPayload } from "./prayerTimes";
import type { CalendarEvent } from "./site";

/** `undefined` while loading, `null` if the request failed. */
type Snapshot<T> = T | null | undefined;

function createResource<T>(loader: () => Promise<T | null>) {
  let value: Snapshot<T> = undefined;
  let started = false;
  const listeners = new Set<() => void>();

  function load() {
    if (started) return;
    started = true;
    loader()
      .catch(() => null)
      .then((data) => {
        value = data;
        listeners.forEach((listener) => listener());
      });
  }

  function subscribe(listener: () => void) {
    listeners.add(listener);
    load();
    return () => listeners.delete(listener);
  }

  return {
    use(): Snapshot<T> {
      return useSyncExternalStore(
        subscribe,
        () => value,
        () => undefined,
      );
    },
  };
}

async function fetchJson<T>(url: string): Promise<T | null> {
  const res = await fetch(url);
  return res.ok ? ((await res.json()) as T) : null;
}

/** Today plus six days, so the board and the week-ahead table share one call. */
async function loadPrayer(): Promise<PrayerPayload | null> {
  const now = new Date();
  const today = getMasjidDateKey(now);
  const timings = await fetchMasjidalRange(today, rangeEndKey(today, 7));
  return timings ? buildPrayerPayload(now, timings) : null;
}

const prayer = createResource<PrayerPayload>(loadPrayer);
const events = createResource<CalendarEvent[]>(() => fetchJson("/api/events"));

export const usePrayerData = prayer.use;
export const useCalendarEvents = events.use;
