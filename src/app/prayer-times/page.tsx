import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import PrayerBoard from "@/components/PrayerBoard";
import PageTransition from "@/components/motion/PageTransition";
import { StarGlyph } from "@/components/Ornament";
import MaghribRule from "@/components/prayer/MaghribRule";
import WeekAhead from "@/components/prayer/WeekAhead";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Salah Times",
  description:
    "Daily adhan and iqamah times, Jumu'ah timings, and the week ahead for Masjid Ibrahim in Spring, Texas.",
};

export default function PrayerTimesPage() {
  return (
    <PageTransition>
      <PageHero
        arabic="أوقات الصلاة"
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
        <PrayerBoard emphasis showSunrise />

        {/* -------------------------------------------------- What this means */}
        <Reveal className="mt-10 grid gap-4 sm:mt-14 sm:grid-cols-2 sm:gap-5">
          <div className="card p-5 sm:p-6">
            <StarGlyph className="h-5 w-5 text-gold-500" />
            <h2 className="mt-3 font-display text-[1.5rem] font-semibold leading-tight text-navy-900">
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
            <h2 className="mt-3 font-display text-[1.5rem] font-semibold leading-tight text-navy-900">
              Why Maghrib is different
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-navy-700">
              Maghrib follows sunset, which moves a little each day, so its
              iqamah is set as{" "}
              <MaghribRule />{" "}
              rather than a fixed clock time.
            </p>
          </div>
        </Reveal>

        {/* ------------------------------------------------------ Week ahead */}
        <WeekAhead />

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
