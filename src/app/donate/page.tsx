import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Donate",
  description:
    "Support Masjid Ibrahim's prayers, Institute programs, and community services with a donation or Zelle transfer.",
};

const causes = [
  {
    title: "Masjid Operations",
    body: "Utilities, maintenance, and upkeep so our doors stay open for every prayer.",
  },
  {
    title: "Institute Programs",
    body: "Quran Maktab, WISE Sunday School, and YM Ibrahim — supporting teachers and resources.",
  },
  {
    title: "Community Support",
    body: "Charitable outreach for families and individuals in need.",
  },
];

export default function DonatePage() {
  return (
    <>
      <PageHero
        eyebrow="Sadaqah & Zakat"
        title="Support Masjid Ibrahim"
        description="With your generous contributions, we can continue expanding our services, maintaining our facilities, and offering valuable programs to our community."
        image="https://images.unsplash.com/photo-1593113646773-028c64a8f1b8?auto=format&fit=crop&w=2000&q=80"
        imageAlt="Volunteers preparing donation boxes"
      />

      <section className="mx-auto max-w-5xl px-5 py-20 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-3">
          {causes.map((cause) => (
            <div key={cause.title} className="rounded-2xl bg-white p-7 shadow-soft">
              <h3 className="font-display text-lg font-semibold text-navy-900">
                {cause.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-navy-700">
                {cause.body}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-16 grid gap-8 lg:grid-cols-2">
          <div className="rounded-3xl bg-navy-900 p-10 text-cream-100 shadow-soft">
            <p className="section-eyebrow text-gold-300">Give Online</p>
            <h2 className="mt-3 font-display text-2xl font-semibold text-white">
              Secure Online Donation
            </h2>
            <p className="mt-4 leading-relaxed text-cream-100/80">
              Give a one-time or recurring donation securely online. Every
              contribution goes directly toward sustaining our masjid and
              Institute.
            </p>
            <a
              href={site.donate.url}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary mt-8"
            >
              Donate Online
            </a>
          </div>

          <div className="rounded-3xl bg-white p-10 shadow-soft">
            <p className="section-eyebrow">Give by Zelle</p>
            <h2 className="mt-3 font-display text-2xl font-semibold text-navy-900">
              Zelle Transfer
            </h2>
            <p className="mt-4 leading-relaxed text-navy-700">
              You can also send your donation directly via Zelle &mdash; no
              fees, 100% goes to the masjid.
            </p>
            <div className="mt-8 inline-flex items-center gap-3 rounded-full bg-cream-200 px-6 py-3">
              <span className="text-xs font-semibold uppercase tracking-wide text-navy-700">
                Zelle
              </span>
              <span className="font-semibold text-navy-900">
                {site.donate.zelle}
              </span>
            </div>
          </div>
        </div>

        <p className="mt-12 text-center text-sm text-navy-700/80">
          Questions about donating, Zakat calculations, or recurring gifts?
          Reach us at{" "}
          <a href={`mailto:${site.contact.adminEmail}`} className="font-semibold text-gold-600">
            {site.contact.adminEmail}
          </a>{" "}
          or call{" "}
          <a href={site.contact.phoneHref} className="font-semibold text-gold-600">
            {site.contact.phone}
          </a>
          .
        </p>
      </section>
    </>
  );
}
