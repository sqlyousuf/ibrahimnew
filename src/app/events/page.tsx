import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import PageTransition from "@/components/motion/PageTransition";
import WeekCalendar from "@/components/events/WeekCalendar";
import { getWeekCalendar } from "@/lib/calendar";

export const metadata: Metadata = {
  title: "This Week",
  description:
    "This week's calendar of programs, halaqas, and events at Masjid Ibrahim in Spring, Texas.",
};

// Ad-hoc entries now live in Vercel Blob, edited through /admin — always
// render fresh rather than serving a stale cached copy after a save.
export const dynamic = "force-dynamic";

export default async function EventsPage() {
  const days = await getWeekCalendar();

  return (
    <PageTransition>
      <PageHero
        eyebrow="What's Happening"
        title="This Week at Masjid Ibrahim"
        description="Recurring programs and one-off events, all in one calendar — check back often for what's coming up."
        image="https://images.unsplash.com/photo-1577214407836-1f3a0604ecb2?auto=format&fit=crop&w=2000&q=80"
        imageAlt="Rows of ornate lanterns glowing warmly"
        imagePosition="object-center"
      />

      <section className="section container-page">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="section-eyebrow justify-center">This Week</p>
          <h2 className="mt-3 font-display text-display-md font-semibold text-navy-900">
            The Week at a Glance
          </h2>
          <p className="mx-auto mt-4 max-w-xl leading-relaxed text-navy-700">
            Everything happening this week, day by day — tap a flier for a
            closer look where there is one. For anything time-sensitive, call
            the masjid directly.
          </p>
        </Reveal>

        <div className="mt-10 lg:mt-14">
          <WeekCalendar days={days} />
        </div>
      </section>
    </PageTransition>
  );
}
