"use client";

import { usePrayerData } from "@/lib/liveData";
import { formatMaghribOffset } from "@/lib/prayerTimes";

/** "5 min after Adhan" — today's actual Maghrib iqamah offset. */
export default function MaghribRule() {
  const minutes = usePrayerData()?.board.maghribOffsetMinutes ?? null;
  return (
    <span className="font-semibold text-navy-900">
      {minutes !== null ? formatMaghribOffset(minutes) : "a short offset"}
    </span>
  );
}
