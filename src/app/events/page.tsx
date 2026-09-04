import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import PageTransition from "@/components/motion/PageTransition";
import FlierCard from "@/components/events/FlierCard";
import { StarGlyph } from "@/components/Ornament";
import { getActiveWeeklyEvents, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "This Week",
  description:
    "Fliers, halaqas, and programs happening this week at Masjid Ibrahim in Spring, Texas.",
};

export default function EventsPage() {
  const activeEvents = getActiveWeeklyEvents();

  return (
    <PageTransition>
      <PageHero
        eyebrow="What's Happening"
        title="This Week at Masjid Ibrahim"
        description="Fliers, halaqas, and programs happening this week — check back often for what's coming up."
        image="https://images.unsplash.com/photo-1577214407836-1f3a0604ecb2?auto=format&fit=crop&w=2000&q=80"
        imageAlt="Rows of ornate lanterns glowing warmly"
        imagePosition="object-center"
      />

      <section className="section container-page">
        {activeEvents.length > 0 ? (
          <>
            <Reveal className="mx-auto max-w-2xl text-center">
              <p className="section-eyebrow justify-center">This Week</p>
              <h2 className="mt-3 font-display text-display-md font-semibold text-navy-900">
                What&apos;s Coming Up
              </h2>
              <p className="mx-auto mt-4 max-w-xl leading-relaxed text-navy-700">
                Tap a flier for a closer look. For anything time-sensitive,
                call the masjid directly.
              </p>
            </Reveal>

            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:mt-14 lg:grid-cols-3 lg:gap-8">
              {activeEvents.map((event, i) => (
                <FlierCard key={event.slug} event={event} delay={i * 70} />
              ))}
            </div>
          </>
        ) : (
          <Reveal>
            <div className="card-dark relative overflow-hidden px-5 py-14 text-center sm:px-10 sm:py-20">
              <div
                aria-hidden="true"
                className="pattern-stars pointer-events-none absolute inset-0"
                style={{ opacity: 0.06 }}
              />
              <div aria-hidden="true" className="grain absolute inset-0" />
              <div className="relative">
                <div className="mx-auto mb-7 flex h-14 w-14 items-center justify-center rounded-full border border-gold-500/30 text-gold-300 animate-star-spin [animation-duration:40s]">
                  <StarGlyph className="h-6 w-6" />
                </div>
                <p className="section-eyebrow justify-center text-gold-300 before:bg-gold-400">
                  Stay Tuned
                </p>
                <h2 className="mt-3 text-balance font-display text-display-sm font-semibold text-white">
                  This Week&apos;s Schedule Is Being Updated
                </h2>
                <p className="measure mx-auto mt-4 leading-relaxed text-cream-100/80">
                  We&apos;re putting together this week&apos;s fliers and
                  programs. In the meantime, the best way to stay updated is
                  to reach out directly or ask about our WhatsApp community
                  groups.
                </p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:justify-center sm:gap-4">
                  <a href={site.contact.phoneHref} className="btn-primary">
                    Call {site.contact.phone}
                  </a>
                  <a
                    href={`mailto:${site.contact.adminEmail}`}
                    className="btn-outline"
                  >
                    Email the Masjid
                  </a>
                </div>
              </div>
            </div>
          </Reveal>
        )}
      </section>
    </PageTransition>
  );
}
