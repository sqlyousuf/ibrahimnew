/**
 * Composition layer pairing the two prayer datasets into the board format a
 * masjid actually displays: Adhan (when the prayer window starts) next to
 * Iqamah (when the congregation stands).
 *
 * `./salahTimes` supplies Adhan, `./iqamah` supplies Iqamah. Both are plain
 * data modules; all the joining logic lives here.
 */

import {
  formatMaghribOffset,
  getCurrentIqamah,
  getMasjidDateKey,
  MASJID_TIMEZONE,
  type IqamahRecord,
} from "./iqamah";
import {
  getStartTimesFor,
  getTodayStartTimes,
  type SalahStartTimes,
} from "./salahTimes";

export { MASJID_TIMEZONE };

export type PrayerRow = {
  name: string;
  /** Start of the prayer window. Null if the calendar has no entry. */
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

/** Formats minutes past midnight as "8:10 PM". */
function fromMinutes(total: number): string {
  const wrapped = ((total % 1440) + 1440) % 1440;
  const hour24 = Math.floor(wrapped / 60);
  const minute = wrapped % 60;
  const hour12 = hour24 % 12 === 0 ? 12 : hour24 % 12;
  const suffix = hour24 < 12 ? "AM" : "PM";
  return `${hour12}:${String(minute).padStart(2, "0")} ${suffix}`;
}

/** Normalises "05:55 AM" to "5:55 AM" so both datasets render alike. */
export function formatTime(time: string): string {
  const minutes = toMinutes(time);
  return minutes === null ? time : fromMinutes(minutes);
}

export function addMinutes(time: string, minutes: number): string | null {
  const base = toMinutes(time);
  return base === null ? null : fromMinutes(base + minutes);
}

export type PrayerBoard = {
  rows: PrayerRow[];
  /** Informational — the end of the Fajr window, not a prayer. */
  sunrise: string | null;
  jummah: string[];
  iqamahRecord: IqamahRecord;
  startTimes: SalahStartTimes | null;
};

/**
 * Today's full board. Maghrib's iqamah is derived by applying the record's
 * offset to today's Maghrib adhan, so it shows a real clock time rather than
 * only a rule — with the rule kept as a note.
 */
export function getPrayerBoard(date: Date = new Date()): PrayerBoard {
  const iqamahRecord = getCurrentIqamah(date);
  const startTimes = getTodayStartTimes(date);

  const maghribIqamah = startTimes
    ? addMinutes(startTimes.maghrib, iqamahRecord.maghribOffsetMinutes)
    : null;

  const rows: PrayerRow[] = [
    {
      name: "Fajr",
      adhan: startTimes ? formatTime(startTimes.fajr) : null,
      iqamah: formatTime(iqamahRecord.fajr),
      iqamahNote: null,
    },
    {
      name: "Dhuhr",
      adhan: startTimes ? formatTime(startTimes.dhuhr) : null,
      iqamah: formatTime(iqamahRecord.dhuhr),
      iqamahNote: null,
    },
    {
      name: "Asr",
      adhan: startTimes ? formatTime(startTimes.asr) : null,
      iqamah: formatTime(iqamahRecord.asr),
      iqamahNote: null,
    },
    {
      name: "Maghrib",
      adhan: startTimes ? formatTime(startTimes.maghrib) : null,
      iqamah: maghribIqamah,
      iqamahNote: formatMaghribOffset(iqamahRecord.maghribOffsetMinutes),
    },
    {
      name: "Isha",
      adhan: startTimes ? formatTime(startTimes.isha) : null,
      iqamah: formatTime(iqamahRecord.isha),
      iqamahNote: null,
    },
  ];

  return {
    rows,
    sunrise: startTimes ? formatTime(startTimes.sunrise) : null,
    jummah: iqamahRecord.jummah.map(formatTime),
    iqamahRecord,
    startTimes,
  };
}

export type DayStartTimes = {
  /** YYYY-MM-DD at the masjid. */
  key: string;
  /** e.g. "Fri, Aug 14". */
  label: string;
  isToday: boolean;
  times: SalahStartTimes | null;
};

/**
 * Adhan times for today and the following days. Dates are stepped in UTC from
 * the masjid's current calendar date, so the sequence never skips or repeats a
 * day due to the visitor's own timezone.
 */
export function getWeekAhead(
  date: Date = new Date(),
  days = 7,
): DayStartTimes[] {
  const todayKey = getMasjidDateKey(date);
  const [year, month, day] = todayKey.split("-").map(Number);
  const start = Date.UTC(year, month - 1, day);

  return Array.from({ length: days }, (_, offset) => {
    const current = new Date(start + offset * 86_400_000);
    const m = current.getUTCMonth() + 1;
    const d = current.getUTCDate();
    const key = `${current.getUTCFullYear()}-${String(m).padStart(2, "0")}-${String(d).padStart(2, "0")}`;

    return {
      key,
      label: new Intl.DateTimeFormat("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
        timeZone: "UTC",
      }).format(current),
      isToday: offset === 0,
      times: getStartTimesFor(m, d),
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

export { getMasjidDateKey };
