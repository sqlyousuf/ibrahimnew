/**
 * Composition layer pairing Masjidal's Adhan and Iqamah data into the board
 * format a masjid actually displays. `./masjidal` supplies the raw per-day
 * timings; all the joining/formatting logic lives here.
 */

import {
  fetchMasjidalDay,
  fetchMasjidalWeek,
  type MasjidalDayTimings,
} from "./masjidal";
import { getMasjidDateKey, MASJID_TIMEZONE } from "./iqamah";

export { MASJID_TIMEZONE, getMasjidDateKey };

export type PrayerRow = {
  name: string;
  /** Start of the prayer window. Null if the data wasn't available. */
  adhan: string | null;
  /** When the congregation stands. */
  iqamah: string | null;
  /** Shown alongside the iqamah time, e.g. the Maghrib offset rule. */
  iqamahNote: string | null;
};

const TIME_PATTERN = /^(\d{1,2}):(\d{2})\s*(AM|PM)$/i;

/** Parses "8:05 PM" into minutes past midnight. Null if unparseable. */
function toMinutes(time: string): number | null {
  const match = time.trim().match(TIME_PATTERN);
  if (!match) return null;
  const hour = Number(match[1]) % 12;
  const minute = Number(match[2]);
  const isPm = match[3].toUpperCase() === "PM";
  return (hour + (isPm ? 12 : 0)) * 60 + minute;
}

/** Minutes between two "H:MM AM/PM" times, wrapping past midnight. Null if either is unparseable. */
function diffMinutes(from: string, to: string): number | null {
  const a = toMinutes(from);
  const b = toMinutes(to);
  if (a === null || b === null) return null;
  return ((b - a + 1440) % 1440);
}

export function formatMaghribOffset(minutes: number): string {
  return `${minutes} min after Adhan`;
}

/** Masjidal already formats times as "5:55 AM" with no leading zero — this
 * is an identity pass-through kept so callers don't need to know that. */
export function formatTime(time: string): string {
  return time;
}

export type PrayerBoard = {
  rows: PrayerRow[];
  /** Informational — the end of the Fajr window, not a prayer. */
  sunrise: string | null;
  jummah: string[];
  /** Minutes between Maghrib Adhan and Iqamah, when both are known. */
  maghribOffsetMinutes: number | null;
};

function boardFromDay(day: MasjidalDayTimings | null): PrayerBoard {
  if (!day) {
    return {
      rows: ["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"].map((name) => ({
        name,
        adhan: null,
        iqamah: null,
        iqamahNote: null,
      })),
      sunrise: null,
      jummah: [],
      maghribOffsetMinutes: null,
    };
  }

  const maghribOffset = diffMinutes(day.salah.maghrib, day.iqamah.maghrib);

  const rows: PrayerRow[] = [
    { name: "Fajr", adhan: day.salah.fajr, iqamah: day.iqamah.fajr, iqamahNote: null },
    { name: "Dhuhr", adhan: day.salah.zuhr, iqamah: day.iqamah.zuhr, iqamahNote: null },
    { name: "Asr", adhan: day.salah.asr, iqamah: day.iqamah.asr, iqamahNote: null },
    {
      name: "Maghrib",
      adhan: day.salah.maghrib,
      iqamah: day.iqamah.maghrib,
      iqamahNote: maghribOffset !== null ? formatMaghribOffset(maghribOffset) : null,
    },
    { name: "Isha", adhan: day.salah.isha, iqamah: day.iqamah.isha, iqamahNote: null },
  ];

  const jummah = [day.iqamah.jummah1, day.iqamah.jummah2, day.iqamah.jummah3].filter(
    (t): t is string => Boolean(t) && t !== "N/A",
  );

  return { rows, sunrise: day.salah.sunrise, jummah, maghribOffsetMinutes: maghribOffset };
}

/** Today's full board, live from Masjidal. */
export async function getPrayerBoard(date: Date = new Date()): Promise<PrayerBoard> {
  const day = await fetchMasjidalDay(getMasjidDateKey(date));
  return boardFromDay(day);
}

export type DayStartTimes = {
  /** YYYY-MM-DD at the masjid. */
  key: string;
  /** e.g. "Fri, Aug 14". */
  label: string;
  isToday: boolean;
  times: {
    fajr: string;
    sunrise: string;
    dhuhr: string;
    asr: string;
    maghrib: string;
    isha: string;
  } | null;
};

/**
 * Adhan times for today and the following days, live from Masjidal.
 */
export async function getWeekAhead(
  date: Date = new Date(),
  days = 7,
): Promise<DayStartTimes[]> {
  const todayKey = getMasjidDateKey(date);
  const week = await fetchMasjidalWeek(todayKey, days);
  const byKey = new Map(
    (week ?? []).map((day, i) => {
      const [y, m, d] = todayKey.split("-").map(Number);
      const key = new Date(Date.UTC(y, m - 1, d) + i * 86_400_000)
        .toISOString()
        .slice(0, 10);
      return [key, day];
    }),
  );

  const [year, month, day] = todayKey.split("-").map(Number);
  const start = Date.UTC(year, month - 1, day);

  return Array.from({ length: days }, (_, offset) => {
    const current = new Date(start + offset * 86_400_000);
    const key = current.toISOString().slice(0, 10);
    const entry = byKey.get(key);

    return {
      key,
      label: new Intl.DateTimeFormat("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
        timeZone: "UTC",
      }).format(current),
      isToday: offset === 0,
      times: entry
        ? {
            fajr: entry.salah.fajr,
            sunrise: entry.salah.sunrise,
            dhuhr: entry.salah.zuhr,
            asr: entry.salah.asr,
            maghrib: entry.salah.maghrib,
            isha: entry.salah.isha,
          }
        : null,
    };
  });
}

/** e.g. "Friday, August 14". */
export function formatMasjidToday(
  date: Date = new Date(),
  month: "long" | "short" = "long",
): string {
  return new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    month,
    day: "numeric",
    timeZone: MASJID_TIMEZONE,
  }).format(date);
}
