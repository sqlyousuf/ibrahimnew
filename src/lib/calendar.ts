/**
 * Builds the "This Week at Masjid Ibrahim" calendar: the Institute's three
 * recurring programs (static, from site.ts) plus one-off/ad-hoc entries
 * managed through the /admin panel (live, from Vercel Blob via
 * calendarStore.ts), merged onto the 7 days (Sunday-Saturday) of the
 * current week.
 *
 * Dates are stepped from the masjid's own calendar day (`getMasjidDateKey`,
 * already used by the prayer-times week-ahead logic) rather than the
 * server's or visitor's timezone, so "today" and "this week" always match
 * Spring, TX regardless of where this runs or who's viewing it.
 */

import { getMasjidDateKey } from "@/lib/prayerTimes";
import { getCalendarEvents } from "@/lib/calendarStore";
import { programs } from "@/lib/site";

export type CalendarDisplayEntry = {
  key: string;
  title: string;
  time?: string;
  location?: string;
  description: string;
  flier?: { src: string; alt: string };
  kind: "program" | "event";
  /** Where "more info" should point, if anywhere. */
  href?: string;
};

export type CalendarDay = {
  /** YYYY-MM-DD at the masjid. */
  dateKey: string;
  /** e.g. "Friday" */
  weekdayLabel: string;
  /** e.g. "Sep" */
  monthLabel: string;
  /** e.g. "12" */
  dayNumber: string;
  isToday: boolean;
  entries: CalendarDisplayEntry[];
};

const DAY_MS = 86_400_000;

export async function getWeekCalendar(referenceDate: Date = new Date()): Promise<CalendarDay[]> {
  const calendarEvents = await getCalendarEvents();

  const todayKey = getMasjidDateKey(referenceDate);
  const [y, m, d] = todayKey.split("-").map(Number);
  const todayUTC = Date.UTC(y, m - 1, d);
  const todayWeekday = new Date(todayUTC).getUTCDay();
  const weekStartUTC = todayUTC - todayWeekday * DAY_MS;

  return Array.from({ length: 7 }, (_, i) => {
    const current = new Date(weekStartUTC + i * DAY_MS);
    const weekday = current.getUTCDay();
    const dateKey = [
      current.getUTCFullYear(),
      String(current.getUTCMonth() + 1).padStart(2, "0"),
      String(current.getUTCDate()).padStart(2, "0"),
    ].join("-");

    const entries: CalendarDisplayEntry[] = [];

    for (const program of programs) {
      if (!program.calendar?.daysOfWeek.includes(weekday)) continue;
      entries.push({
        key: `program-${program.slug}`,
        title: program.name,
        time: program.calendar.time,
        location: program.location,
        description: program.subtitle,
        kind: "program",
        href: "/institute",
      });
    }

    for (const event of calendarEvents) {
      const matches =
        event.recurrence === "weekly"
          ? event.daysOfWeek.includes(weekday)
          : event.date === dateKey;
      if (!matches) continue;
      entries.push({
        key: `event-${event.slug}`,
        title: event.title,
        time: event.time,
        location: event.location,
        description: event.description,
        flier: event.flier,
        kind: "event",
      });
    }

    return {
      dateKey,
      weekdayLabel: new Intl.DateTimeFormat("en-US", {
        weekday: "long",
        timeZone: "UTC",
      }).format(current),
      monthLabel: new Intl.DateTimeFormat("en-US", {
        month: "short",
        timeZone: "UTC",
      }).format(current),
      dayNumber: String(current.getUTCDate()),
      isToday: dateKey === todayKey,
      entries,
    };
  });
}
