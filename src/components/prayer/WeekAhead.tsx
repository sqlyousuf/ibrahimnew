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

      {/* Fits a 375px phone with all five salah visible, so nobody has to
          discover a sideways swipe. On phones the AM/PM suffix is dropped
          (Fajr is always morning, the rest afternoon/evening) and the day
          stacks over its date; from sm up the full strings return. */}
      <div className="mt-6 overflow-hidden rounded-[1.375rem] bg-cream-50 shadow-soft ring-1 ring-gold-700/10">
        <table className="w-full table-fixed text-left text-[0.8125rem] sm:table-auto sm:text-sm">
          <caption className="sr-only">
            Adhan times for the coming week
          </caption>
          <thead className="bg-cream-100">
            <tr className="border-b border-navy-900/[0.07]">
              {["Day", "Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"].map(
                (heading, i) => (
                  <th
                    key={heading}
                    scope="col"
                    className={`whitespace-nowrap py-3 text-[0.5625rem] font-semibold uppercase tracking-[0.08em] text-navy-500 sm:px-4 sm:text-[0.625rem] sm:tracking-[0.14em] ${
                      i === 0 ? "w-[22%] pl-3 pr-1 sm:w-auto" : "px-1 text-center sm:text-left"
                    }`}
                  >
                    {heading === "Maghrib" ? (
                      <>
                        <span aria-hidden="true" className="sm:hidden">Mgrb</span>
                        <span className="sr-only sm:not-sr-only">Maghrib</span>
                      </>
                    ) : (
                      heading
                    )}
                  </th>
                ),
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-navy-900/[0.06]">
            {week.map((day) => {
              const [weekday, date] = day.label.split(", ");
              return (
                <tr key={day.key}>
                  <th
                    scope="row"
                    className="py-2.5 pl-3 pr-1 font-semibold leading-tight text-navy-900 sm:whitespace-nowrap sm:px-4 sm:py-3"
                  >
                    <span className="sm:hidden">
                      {weekday}
                      <span className="block text-[0.6875rem] font-medium text-navy-500">
                        {date}
                      </span>
                    </span>
                    <span className="hidden sm:inline">{day.label}</span>
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
                        className="whitespace-nowrap px-1 py-2.5 text-center tabular-nums text-navy-700 sm:px-4 sm:py-3 sm:text-left"
                      >
                        <span className="sm:hidden">
                          {time.replace(/\s?[AP]M$/i, "")}
                        </span>
                        <span className="hidden sm:inline">{time}</span>
                      </td>
                    ))
                  ) : (
                    <td colSpan={5} className="px-4 py-3 text-navy-500">
                      &mdash;
                    </td>
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </Reveal>
  );
}
