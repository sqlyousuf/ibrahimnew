import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import PrayerBoard from "@/components/PrayerBoard";
import PageTransition from "@/components/motion/PageTransition";
import { StarDivider, StarGlyph } from "@/components/Ornament";
import { formatEffectiveDate, formatMaghribOffset } from "@/lib/iqamah";
import {
  formatMasjidToday,
  formatTime,
  getPrayerBoard,
  getWeekAhead,
} from "@/lib/prayerTimes";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Salah Times",
  description:
    "Daily adhan and iqamah times, Jumu'ah timings, and the week ahead for Masjid Ibrahim in Spring, Texas.",
};

export default function PrayerTimesPage() {
  const board = getPrayerBoard();
  const week = getWeekAhead().slice(1);
  const todayLabel = formatMasjidToday();
  const { iqamahRecord } = board;

  return (
    <PageTransition>
      <PageHero
        eyebrow="Salah Times"
        title="Salah Times"
        description="Adhan and iqamah timings for the five daily salah and Jumu'ah at Masjid Ibrahim."
        image="https://images.unsplash.com/photo-1761640864240-f793d7ec8348?auto=format&fit=crop&w=2000&q=80"
        imageAlt="Congregants standing shoulder to shoulder in salah"
        imagePosition="object-center"
      />

      {/* Tighter top padding than the standard rhythm — this is the one page
          where the visitor wants the answer immediately. */}
      <section className="container-page max-w-4xl pb-16 pt-8 sm:pb-20 sm:pt-12 lg:pb-24 lg:pt-14">
        <PrayerBoard
          board={board}
          todayLabel={todayLabel}
          emphasis
          showSunrise
        />

        <p className="mt-4 text-center text-xs leading-relaxed text-navy-700/80">
          Iqamah times took effect on{" "}
          <span className="font-semibold text-navy-800">
            {formatEffectiveDate(iqamahRecord.effectiveFrom)}
          </span>{" "}
          and hold until the next scheduled change.
        </p>

        {/* -------------------------------------------------- What this means */}
        <Reveal className="mt-10 grid gap-4 sm:mt-14 sm:grid-cols-2 sm:gap-5">
          <div className="card p-5 sm:p-6">
            <StarGlyph className="h-5 w-5 text-gold-500" />
            <h2 className="mt-3 font-display text-lg font-semibold text-navy-900">
              Adhan and iqamah
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-navy-700">
              Adhan is the call that opens each salah window. Iqamah is the
              second call, given as the congregation lines up and the salah
              begins &mdash; arrive before it to join the first row.
            </p>
          </div>
          <div className="card p-5 sm:p-6">
            <StarGlyph className="h-5 w-5 text-gold-500" />
            <h2 className="mt-3 font-display text-lg font-semibold text-navy-900">
              Why Maghrib is different
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-navy-700">
              Maghrib follows sunset, which moves a little each day, so its
              iqamah is set as{" "}
              <span className="font-semibold text-navy-900">
                {formatMaghribOffset(iqamahRecord.maghribOffsetMinutes)}
              </span>{" "}
              rather than a fixed clock time.
            </p>
          </div>
        </Reveal>

        {/* ------------------------------------------------------ Week ahead */}
        {week.length > 0 && (
          <Reveal className="mt-10 sm:mt-14">
            <StarDivider className="mb-8" />
            <p className="section-eyebrow justify-center">Plan Ahead</p>
            <h2 className="mt-3 text-center font-display text-display-sm font-semibold text-navy-900">
              The Week Ahead
            </h2>
            <p className="measure mx-auto mt-3 text-center text-sm leading-relaxed text-navy-700/90">
              Adhan times for the coming days. Iqamah stays as shown above
              until the next scheduled change.
            </p>

            <div className="mt-6 overflow-hidden rounded-2xl bg-white shadow-soft ring-1 ring-navy-900/5">
              {/* Scrolls inside its own container rather than pushing the page
                  sideways on a narrow phone. */}
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
                              {formatTime(time)}
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
            </div>
          </Reveal>
        )}

        {/* --------------------------------------------------------- Footnote */}
        <Reveal>
          <p className="measure mx-auto mt-10 text-center text-sm leading-relaxed text-navy-700/90 sm:mt-14">
            Times may shift slightly for Ramadan, Eid, and special occasions.
            For anything time-sensitive, please call the masjid at{" "}
            <a
              href={site.contact.phoneHref}
              className="link-underline whitespace-nowrap font-semibold text-gold-700"
            >
              {site.contact.phone}
            </a>
            .
          </p>
        </Reveal>
      </section>
    </PageTransition>
  );
}
