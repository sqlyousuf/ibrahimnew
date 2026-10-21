/**
 * Client-safe "which salah is next" logic. Pure functions over the board's
 * display strings — no server imports, so the live countdown and the phone
 * prayer bar can both run it in the browser against the masjid's clock.
 */

import { useSyncExternalStore } from "react";
import { MASJID_TIMEZONE } from "./iqamah";
import type { PrayerRow } from "./prayerTimes";

const TIME_PATTERN = /^(\d{1,2}):(\d{2})\s*(AM|PM)$/i;

/** "8:05 PM" → minutes past midnight, or null if unparseable. */
export function toMinutes(time: string | null): number | null {
  const match = time?.trim().match(TIME_PATTERN);
  if (!match) return null;
  const hour = Number(match[1]) % 12;
  const isPm = match[3].toUpperCase() === "PM";
  return (hour + (isPm ? 12 : 0)) * 60 + Number(match[2]);
}

/** Minutes past midnight right now, on the masjid's clock in Spring, TX. */
export function masjidMinutesNow(now: Date = new Date()): number {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: MASJID_TIMEZONE,
    hour: "numeric",
    minute: "numeric",
    hourCycle: "h23",
  }).formatToParts(now);
  const get = (type: string) =>
    Number(parts.find((p) => p.type === type)?.value ?? 0);
  return get("hour") * 60 + get("minute");
}

export type NextPrayer = {
  row: PrayerRow;
  /** Adhan has been called and the congregation hasn't stood yet. */
  phase: "before-adhan" | "before-iqamah";
  /** Minutes until the next milestone (adhan, or iqamah if adhan has passed). */
  minutesUntil: number;
  /** After Isha's iqamah the next salah is tomorrow's Fajr. */
  tomorrow: boolean;
};

/**
 * The salah a visitor should be heading to now. Uses today's Fajr as the
 * stand-in for tomorrow's after Isha — it moves by a minute or two at most.
 */
export function findNextPrayer(
  rows: PrayerRow[],
  now: number,
): NextPrayer | null {
  for (const row of rows) {
    const adhan = toMinutes(row.adhan);
    const iqamah = toMinutes(row.iqamah) ?? adhan;
    if (iqamah === null) continue;
    if (adhan !== null && now < adhan) {
      return { row, phase: "before-adhan", minutesUntil: adhan - now, tomorrow: false };
    }
    if (now < iqamah) {
      return { row, phase: "before-iqamah", minutesUntil: iqamah - now, tomorrow: false };
    }
  }

  const fajr = rows[0];
  const fajrAdhan = toMinutes(fajr?.adhan ?? null);
  if (!fajr || fajrAdhan === null) return null;
  return {
    row: fajr,
    phase: "before-adhan",
    minutesUntil: 1440 - now + fajrAdhan,
    tomorrow: true,
  };
}

/** "2h 05m", "45 min", "now". */
export function formatCountdown(minutes: number): string {
  if (minutes <= 0) return "now";
  if (minutes < 60) return `${minutes} min`;
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return m === 0 ? `${h}h` : `${h}h ${String(m).padStart(2, "0")}m`;
}

// A shared ticking clock: one interval no matter how many components read
// it, and a primitive snapshot so React only re-renders when the minute
// actually changes.
function subscribe(onChange: () => void) {
  const id = window.setInterval(onChange, 15_000);
  return () => window.clearInterval(id);
}
function getServerSnapshot() {
  return null;
}

/**
 * The masjid's current minute-of-day, or null during SSR/hydration — times
 * are server-rendered, but "next" depends on the visitor's moment, so it's
 * only decided in the browser.
 */
export function useMasjidMinute(): number | null {
  return useSyncExternalStore(subscribe, masjidMinutesNow, getServerSnapshot);
}
