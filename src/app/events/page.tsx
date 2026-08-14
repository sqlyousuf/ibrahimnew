import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import { events, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Events",
  description:
    "Upcoming events, halaqas, and community programs at Masjid Ibrahim in Spring, Texas.",
};

export default function EventsPage() {
  return (
    <>
      <PageHero
        eyebrow="What's Happening"
        title="Events & Announcements"
        description="Join us for community programs, halaqas, and seasonal celebrations."
        image="https://images.unsplash.com/photo-1743417597339-f4bc72e2a8ba?auto=format&fit=crop&w=2000&q=80"
        imageAlt="Community gathered together"
      />

      <section className="mx-auto max-w-4xl px-5 py-24 lg:px-8">
        {events.length > 0 ? (
          <div className="space-y-6">
            {events.map((event) => (
              <div
                key={event.title}
                className="rounded-2xl bg-white p-8 shadow-soft"
              >
                <p className="text-sm font-semibold uppercase tracking-wide text-gold-600">
                  {event.date}
                  {event.time ? ` · ${event.time}` : ""}
                </p>
                <h3 className="mt-2 font-display text-2xl font-semibold text-navy-900">
                  {event.title}
                </h3>
                <p className="mt-3 leading-relaxed text-navy-700">
                  {event.description}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <div className="rounded-3xl bg-white p-12 text-center shadow-soft">
            <p className="section-eyebrow justify-center">Stay Tuned</p>
            <h2 className="mt-3 font-display text-2xl font-semibold text-navy-900 sm:text-3xl">
              Our Events Calendar Is Coming Soon
            </h2>
            <p className="mx-auto mt-4 max-w-xl leading-relaxed text-navy-700">
              We&apos;re putting together our upcoming programs, Ramadan and
              Eid celebrations, and community halaqas. In the meantime, the
              best way to stay updated is to reach out directly or ask about
              our WhatsApp community groups.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <a href={site.contact.phoneHref} className="btn-primary">
                Call {site.contact.phone}
              </a>
              <a
                href={`mailto:${site.contact.adminEmail}`}
                className="btn-outline-navy"
              >
                Email the Masjid
              </a>
            </div>
          </div>
        )}
      </section>
    </>
  );
}
