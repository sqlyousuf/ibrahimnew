"use client";

/**
 * Live data for the static site. Pages are prebuilt HTML; the things that
 * change — today's salah times and the This Week entries — are fetched in
 * the browser from the Worker (worker/index.ts).
 *
 * Each resource is fetched once per page load and shared by every component
 * that reads it (the prayer board and the phone prayer bar both use the same
 * request), via useSyncExternalStore so there's no extra render pass.
 */

import { useSyncExternalStore } from "react";
import type { CalendarEvent } from "./site";
import type { PrayerPayload } from "./prayerTimes";

/** `undefined` while loading, `null` if the request failed. */
type Snapshot<T> = T | null | undefined;

function createResource<T>(url: string) {
  let value: Snapshot<T> = undefined;
  let started = false;
  const listeners = new Set<() => void>();

  function load() {
    if (started) return;
    started = true;
    fetch(url)
      .then((res) => (res.ok ? (res.json() as Promise<T>) : null))
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

const prayer = createResource<PrayerPayload>("/api/prayer");
const events = createResource<CalendarEvent[]>("/api/events");

export const usePrayerData = prayer.use;
export const useCalendarEvents = events.use;
