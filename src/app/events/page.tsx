import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import { StarDivider } from "@/components/Ornament";
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
        imageAlt="Community members gathered together at the masjid"
        imagePosition="object-center"
      />

      <section className="section container-page max-w-3xl">
        {events.length > 0 ? (
          <div className="space-y-5 sm:space-y-6">
            {events.map((event, i) => (
              <Reveal key={event.title} delay={i * 70}>
                <article className="card p-5 sm:p-7">
                  <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-gold-700">
                    {event.date}
                    {event.time ? ` · ${event.time}` : ""}
                  </p>
                  <h2 className="mt-2 font-display text-xl font-semibold text-navy-900 sm:text-2xl">
                    {event.title}
                  </h2>
                  <p className="mt-3 leading-relaxed text-navy-700">
                    {event.description}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        ) : (
          <Reveal>
            <div className="panel px-5 py-10 text-center sm:px-10 sm:py-14">
              <StarDivider className="mb-7" />
              <p className="section-eyebrow justify-center">Stay Tuned</p>
              <h2 className="mt-3 text-balance font-display text-display-sm font-semibold text-navy-900">
                Our Events Calendar Is Coming Soon
              </h2>
              <p className="measure mx-auto mt-4 leading-relaxed text-navy-700">
                We&apos;re putting together our upcoming programs, Ramadan and
                Eid celebrations, and community halaqas. In the meantime, the
                best way to stay updated is to reach out directly or ask about
                our WhatsApp community groups.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:justify-center sm:gap-4">
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
          </Reveal>
        )}
      </section>
    </>
  );
}
