"use client";

import SectionHeading from "@/components/SectionHeading";
import HeroFlierSlider from "@/components/home/HeroFlierSlider";
import { getUpcomingEventFliers } from "@/lib/calendar";
import { useCalendarEvents } from "@/lib/liveData";
import { useMasjidMinute } from "@/lib/nextPrayer";

/**
 * Upcoming one-off events with a flier, as a slider band on the homepage.
 * Entries come from the admin panel via /api/events, and "upcoming" depends
 * on today's date — so both are decided in the browser (the page itself is
 * prebuilt). Renders nothing when there's nothing upcoming.
 */
export default function UpcomingFliers() {
  const events = useCalendarEvents();
  // Doubles as a "mounted" gate: null during prerender and hydration.
  const minute = useMasjidMinute();
  if (!events || minute === null) return null;

  const fliers = getUpcomingEventFliers(events);
  if (fliers.length === 0) return null;

  return (
    <section className="relative overflow-hidden bg-navy-975 pt-14 sm:pt-20">
      <span aria-hidden="true" className="rule-gold absolute inset-x-0 top-0" />
      <div className="container-page">
        <SectionHeading
          arabic="فعاليات"
          eyebrow="Coming Up"
          title={
            <>
              Upcoming at <span className="text-foil italic">the masjid</span>
            </>
          }
          align="center"
          tone="dark"
        />
      </div>
      <HeroFlierSlider events={fliers} />
    </section>
  );
}
