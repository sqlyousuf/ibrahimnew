import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Prayer Times",
  description:
    "Live daily and Jumu'ah prayer times for Masjid Ibrahim in Spring, Texas.",
};

const dailyPrayers = ["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"];

export default function PrayerTimesPage() {
  return (
    <>
      <PageHero
        eyebrow="Salah Times"
        title="Prayer Times"
        description="Stay on time for every salah with our live, always-up-to-date prayer schedule."
        image="https://images.unsplash.com/photo-1761640864240-f793d7ec8348?auto=format&fit=crop&w=2000&q=80"
        imageAlt="Congregants praying together"
      />

      <section className="mx-auto max-w-5xl px-5 py-20 lg:px-8">
        <div className="flex flex-wrap justify-center gap-3">
          {dailyPrayers.map((name) => (
            <span
              key={name}
              className="rounded-full bg-navy-900 px-5 py-2 text-sm font-semibold uppercase tracking-wide text-cream-100"
            >
              {name}
            </span>
          ))}
          <span className="rounded-full bg-gold-500 px-5 py-2 text-sm font-semibold uppercase tracking-wide text-navy-950">
            Jumu&apos;ah
          </span>
        </div>

        <div className="mt-12 overflow-hidden rounded-3xl bg-white shadow-soft">
          <iframe
            src={site.prayerWidget}
            title="Masjid Ibrahim Prayer Times"
            width="100%"
            height="560"
            frameBorder={0}
            allowTransparency
            className="block h-[560px] w-full"
          />
        </div>

        <p className="mt-8 text-center text-sm text-navy-700/80">
          Iqama times may shift slightly for special occasions. For the most
          accurate schedule, please refer to the board above or call the
          masjid at{" "}
          <a href={site.contact.phoneHref} className="font-semibold text-gold-600">
            {site.contact.phone}
          </a>
          .
        </p>
      </section>
    </>
  );
}
