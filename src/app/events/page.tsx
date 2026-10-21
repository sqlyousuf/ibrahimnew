import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import PageTransition from "@/components/motion/PageTransition";
import LiveWeekCalendar from "@/components/events/LiveWeekCalendar";

export const metadata: Metadata = {
  title: "This Week",
  description:
    "This week's calendar of programs, halaqas, and events at Masjid Ibrahim in Spring, Texas.",
};

export default function EventsPage() {
  return (
    <PageTransition>
      <PageHero
        arabic="هذا الأسبوع"
        eyebrow="What's Happening"
        title="This Week at Masjid Ibrahim"
        description="Everything happening this week, day by day — tap a flier for a closer look where there is one. For anything time-sensitive, call the masjid directly."
        image="https://images.unsplash.com/photo-1577214407836-1f3a0604ecb2?auto=format&fit=crop&w=2000&q=80"
        imageAlt="Rows of ornate lanterns glowing warmly"
        imagePosition="object-center"
      />

      <section className="section container-page">
        <LiveWeekCalendar />
      </section>
    </PageTransition>
  );
}
