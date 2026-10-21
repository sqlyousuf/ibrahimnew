"use client";

import Reveal from "@/components/Reveal";
import { StarDivider } from "@/components/Ornament";
import { usePrayerData } from "@/lib/liveData";

/**
 * Adhan times for the six days after today, from the same Masjidal
 * response as the board above. Renders nothing until the data is in (it's
 * below the fold, so there's nothing to hold space for).
 */
export default function WeekAhead() {
  const data = usePrayerData();
  const week = data?.week.slice(1) ?? [];
  if (week.length === 0) return null;

  return (
    <Reveal className="mt-10 sm:mt-14">
      <StarDivider className="mb-8" />
      <p className="section-eyebrow flex justify-center">Plan Ahead</p>
      <h2 className="mt-3 text-center font-display text-display-sm font-semibold text-navy-900">
        The Week Ahead
      </h2>
      <p className="measure mx-auto mt-3 text-center text-sm leading-relaxed text-navy-700/90">
        Adhan times for the coming days. Iqamah stays as shown above
        until the next scheduled change.
      </p>

      <div className="relative mt-6 overflow-hidden rounded-[1.375rem] bg-cream-50 shadow-soft ring-1 ring-gold-700/10">
        {/* Scrolls inside its own container rather than pushing the page
            sideways on a narrow phone. Below sm, the table (36rem min)
            is wider than the viewport, so Maghrib/Isha sit off to the
            right with nothing else hinting they're there — this fade
            is the only cue to swipe for them. */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-[36rem] text-left text-sm">
            <caption className="sr-only">
              Adhan times for the coming week
            </caption>
            <thead className="bg-cream-100">
              <tr className="border-b border-navy-900/[0.07]">
                {["Day", "Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"].map(
                  (heading) => (
                    <th
                      key={heading}
                      scope="col"
                      className="whitespace-nowrap px-4 py-3 text-[0.625rem] font-semibold uppercase tracking-[0.14em] text-navy-500"
                    >
                      {heading}
                    </th>
                  ),
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-navy-900/[0.06]">
              {week.map((day) => (
                <tr key={day.key}>
                  <th
                    scope="row"
                    className="whitespace-nowrap px-4 py-3 font-semibold text-navy-900"
                  >
                    {day.label}
                  </th>
                  {day.times ? (
                    [
                      day.times.fajr,
                      day.times.dhuhr,
                      day.times.asr,
                      day.times.maghrib,
                      day.times.isha,
                    ].map((time, i) => (
                      <td
                        key={i}
                        className="whitespace-nowrap px-4 py-3 tabular-nums text-navy-700"
                      >
                        {time}
                      </td>
                    ))
                  ) : (
                    <td colSpan={5} className="px-4 py-3 text-navy-500">
                      &mdash;
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-cream-50 to-transparent sm:hidden"
        />
      </div>
    </Reveal>
  );
}
