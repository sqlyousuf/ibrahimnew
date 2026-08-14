import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import { PatternField, StarGlyph } from "@/components/Ornament";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Donate",
  description:
    "Support Masjid Ibrahim's salah, Institute programs, and community services with a donation or Zelle transfer.",
};

const causes = [
  {
    title: "Masjid Operations",
    body: "Utilities, maintenance, and upkeep so our doors stay open for every salah.",
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
        imageAlt="Volunteers preparing boxes of donated goods"
        imagePosition="object-center"
      />

      <section className="section container-page max-w-5xl">
        <div className="grid gap-5 sm:grid-cols-3 sm:gap-6">
          {causes.map((cause, i) => (
            <Reveal key={cause.title} delay={i * 80} className="h-full">
              <div className="card h-full p-5 sm:p-6">
                <StarGlyph className="h-5 w-5 text-gold-500" />
                <h2 className="mt-3 font-display text-lg font-semibold text-navy-900">
                  {cause.title}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-navy-700">
                  {cause.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="mt-10 grid gap-6 lg:mt-14 lg:grid-cols-2 lg:gap-8">
          <Reveal className="h-full">
            <div className="relative h-full overflow-hidden rounded-3xl bg-navy-900 p-6 text-cream-100 shadow-panel ring-1 ring-white/10 sm:p-8 lg:p-10">
              <PatternField opacity={0.07} />
              <div className="relative">
                <p className="section-eyebrow text-gold-300 before:bg-gold-400">
                  Give Online
                </p>
                <h2 className="mt-3 font-display text-display-sm font-semibold text-white">
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
                  className="btn-primary mt-7 w-full sm:w-auto"
                >
                  Donate Online
                </a>
              </div>
            </div>
          </Reveal>

          <Reveal delay={80} className="h-full">
            <div className="card h-full p-6 sm:p-8 lg:p-10">
              <p className="section-eyebrow">Give by Zelle</p>
              <h2 className="mt-3 font-display text-display-sm font-semibold text-navy-900">
                Zelle Transfer
              </h2>
              <p className="mt-4 leading-relaxed text-navy-700">
                You can also send your donation directly via Zelle &mdash; no
                fees, 100% goes to the masjid.
              </p>
              {/* Stacked block rather than an inline pill: the address is a
                  single 28-character token that cannot wrap, and the old pill
                  overflowed the viewport at 375px. */}
              <div className="mt-7 rounded-2xl bg-cream-200 p-4 ring-1 ring-navy-900/5 sm:p-5">
                <p className="text-[0.625rem] font-semibold uppercase tracking-[0.18em] text-gold-700">
                  Zelle Recipient
                </p>
                <p className="mt-1.5 break-all font-semibold text-navy-900">
                  {site.donate.zelle}
                </p>
              </div>
            </div>
          </Reveal>
        </div>

        <p className="measure mx-auto mt-10 text-center text-sm leading-relaxed text-navy-700/90">
          Questions about donating, Zakat calculations, or recurring gifts?
          Reach us at{" "}
          <a
            href={`mailto:${site.contact.adminEmail}`}
            className="link-underline break-all font-semibold text-gold-700"
          >
            {site.contact.adminEmail}
          </a>{" "}
          or call{" "}
          <a
            href={site.contact.phoneHref}
            className="link-underline whitespace-nowrap font-semibold text-gold-700"
          >
            {site.contact.phone}
          </a>
          .
        </p>
      </section>
    </>
  );
}
