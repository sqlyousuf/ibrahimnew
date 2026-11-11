/**
 * Builds the "This Week at Masjid Ibrahim" calendar: the Institute's
 * recurring programs (static, from site.ts) plus one-off/ad-hoc entries
 * managed through the /admin panel (stored in Workers KV, served by
 * worker/index.ts at /api/events), merged onto the next 7 days starting today — not a
 * fixed Sunday-Saturday week, which would show already-past days once the
 * week is partway through.
 *
 * Dates are stepped from the masjid's own calendar day (`getMasjidDateKey`,
 * already used by the prayer-times week-ahead logic) rather than the
 * server's or visitor's timezone, so "today" and "the next 7 days" always
 * match Spring, TX regardless of where this runs or who's viewing it.
 */

import { getMasjidDateKey } from "@/lib/prayerTimes";
import { programs } from "@/lib/site";
import type { CalendarEvent } from "@/lib/site";

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

export type ShowcaseFlier = {
  key: string;
  title: string;
  /** Short pill above the title: a date for one-off events, else "Weekly". */
  tag: string;
  /** e.g. "Every Sunday after Isha" or "7:00 PM". */
  schedule?: string;
  /** Second caption line, e.g. who it's for. */
  detail?: string;
  flier: { src: string; alt: string };
};

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function weeklyLabel(days: number[]): string {
  return days.length === 7 ? "Daily" : `Every ${days.map((d) => WEEKDAYS[d]).join(", ")}`;
}

/**
 * Everything with a flier, for the homepage flier rail (FlierShowcase.tsx):
 * upcoming one-off events first (soonest first — they're time-sensitive),
 * then the Institute programs, then admin-added weekly entries. Pass
 * `calendarEvents = []` before the live list has loaded to get just the
 * programs, which are static and safe to prerender.
 */
export function getFlierShowcase(
  calendarEvents: CalendarEvent[],
  referenceDate: Date = new Date(),
): ShowcaseFlier[] {
  const todayKey = getMasjidDateKey(referenceDate);
  const withFlier = calendarEvents.filter((e) => e.flier?.src);

  const oneOff = withFlier
    .filter((e): e is Extract<CalendarEvent, { recurrence: "once" }> =>
      e.recurrence === "once" && e.date >= todayKey,
    )
    .sort((a, b) => a.date.localeCompare(b.date))
    .map((e): ShowcaseFlier => {
      const [y, m, d] = e.date.split("-").map(Number);
      return {
        key: `event-${e.slug}`,
        title: e.title,
        tag: new Intl.DateTimeFormat("en-US", {
          weekday: "short",
          month: "short",
          day: "numeric",
          timeZone: "UTC",
        }).format(new Date(Date.UTC(y, m - 1, d))),
        schedule: e.time,
        detail: e.location,
        flier: e.flier!,
      };
    });

  const programFliers = programs.flatMap((p): ShowcaseFlier[] =>
    p.flier
      ? [
          {
            key: `program-${p.slug}`,
            title: p.name,
            tag: "Weekly",
            schedule: p.schedule,
            detail: p.audience,
            flier: p.flier,
          },
        ]
      : [],
  );

  const weekly = withFlier.flatMap((e): ShowcaseFlier[] =>
    e.recurrence === "weekly"
      ? [
          {
            key: `event-${e.slug}`,
            title: e.title,
            tag: "Weekly",
            schedule: [weeklyLabel(e.daysOfWeek), e.time].filter(Boolean).join(" · "),
            detail: e.location,
            flier: e.flier!,
          },
        ]
      : [],
  );

  return [...oneOff, ...programFliers, ...weekly];
}

export function getWeekCalendar(
  calendarEvents: CalendarEvent[],
  referenceDate: Date = new Date(),
): CalendarDay[] {
  const todayKey = getMasjidDateKey(referenceDate);
  const [y, m, d] = todayKey.split("-").map(Number);
  const todayUTC = Date.UTC(y, m - 1, d);

  return Array.from({ length: 7 }, (_, i) => {
    const current = new Date(todayUTC + i * DAY_MS);
    const weekday = current.getUTCDay();
    const dateKey = [
      current.getUTCFullYear(),
      String(current.getUTCMonth() + 1).padStart(2, "0"),
      String(current.getUTCDate()).padStart(2, "0"),
    ].join("-");

    const entries: CalendarDisplayEntry[] = [];

    for (const program of programs) {
      const session = program.calendar.find((slot) => slot.daysOfWeek.includes(weekday));
      if (!session) continue;
      entries.push({
        key: `program-${program.slug}`,
        title: program.name,
        time: session.time,
        location: program.location,
        description: program.subtitle,
        flier: program.flier,
        kind: "program",
        href: `/institute#${program.slug}`,
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
