"use client";

import WeekCalendar from "@/components/events/WeekCalendar";
import { getWeekCalendar } from "@/lib/calendar";
import { useCalendarEvents } from "@/lib/liveData";
import { useMasjidMinute } from "@/lib/nextPrayer";

/**
 * The next seven days at the masjid. Which days those are depends on the
 * visitor's "today", and the admin-managed entries come from /api/events,
 * so the week is assembled in the browser. The Institute's recurring
 * programs show as soon as the page mounts; ad-hoc entries join them when
 * the request lands (or are simply absent if it fails).
 */
export default function LiveWeekCalendar() {
  const events = useCalendarEvents();
  const minute = useMasjidMinute();

  if (minute === null) {
    return (
      <div aria-hidden="true" className="grid gap-4">
        {Array.from({ length: 3 }, (_, i) => (
          <div key={i} className="card h-36 animate-pulse" />
        ))}
      </div>
    );
  }

  return <WeekCalendar days={getWeekCalendar(events ?? [])} />;
}
