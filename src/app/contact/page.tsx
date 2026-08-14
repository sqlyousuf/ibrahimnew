import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import { StarGlyph } from "@/components/Ornament";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Masjid Ibrahim in Spring, Texas — address, phone, email, and directions.",
};

const contactLinkClass =
  "flex min-h-[2.75rem] items-center text-navy-700 transition-colors hover:text-gold-700";

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Get In Touch"
        title="Contact Us"
        description="We'd love to hear from you — reach out with questions, feedback, or to get involved."
        image="https://images.unsplash.com/photo-1758618079913-b6b631637ad9?auto=format&fit=crop&w=2000&q=80"
        imageAlt="The dome and minaret of Masjid Ibrahim"
        imagePosition="object-center"
      />

      <section className="section container-page">
        <div className="grid gap-6 lg:grid-cols-5 lg:gap-8">
          <div className="space-y-5 lg:col-span-2 lg:space-y-6">
            <Reveal>
              <div className="card p-5 sm:p-7">
                <p className="section-eyebrow">Visit</p>
                <h2 className="mt-2 font-display text-lg font-semibold text-navy-900 sm:text-xl">
                  Address
                </h2>
                <p className="mt-2 leading-relaxed text-navy-700">
                  {site.address.line1}
                  <br />
                  {site.address.line2}
                </p>
                {/* Directions is the top mobile intent on a contact page. */}
                <a
                  href={`https://www.google.com/maps/dir/?api=1&destination=${site.address.mapsQuery}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-outline-navy mt-5 w-full sm:w-auto"
                >
                  Get Directions
                </a>
              </div>
            </Reveal>

            <Reveal delay={70}>
              <div className="card p-5 sm:p-7">
                <p className="section-eyebrow">Call &amp; Email</p>
                <h2 className="mt-2 font-display text-lg font-semibold text-navy-900 sm:text-xl">
                  Reach Us Directly
                </h2>
                <ul className="mt-2 divide-y divide-navy-900/[0.07]">
                  <li>
                    <a
                      href={site.contact.phoneHref}
                      className={`${contactLinkClass} font-semibold`}
                    >
                      {site.contact.phone}
                    </a>
                  </li>
                  <li>
                    <a
                      href={`mailto:${site.contact.adminEmail}`}
                      className={contactLinkClass}
                    >
                      <span className="min-w-0">
                        <span className="block break-all text-sm sm:text-base">
                          {site.contact.adminEmail}
                        </span>
                        <span className="block text-xs text-navy-500">
                          Admin
                        </span>
                      </span>
                    </a>
                  </li>
                  <li>
                    <a
                      href={`mailto:${site.contact.imamEmail}`}
                      className={contactLinkClass}
                    >
                      <span className="min-w-0">
                        <span className="block break-all text-sm sm:text-base">
                          {site.contact.imamEmail}
                        </span>
                        <span className="block text-xs text-navy-500">
                          Imam
                        </span>
                      </span>
                    </a>
                  </li>
                </ul>
              </div>
            </Reveal>

            <Reveal delay={140}>
              <div className="card-dark p-5 sm:p-7">
                <p className="section-eyebrow text-gold-300 before:bg-gold-400">
                  Institute Enrollment
                </p>
                <h2 className="mt-2 flex items-start gap-2.5 font-display text-lg font-semibold text-white sm:text-xl">
                  <StarGlyph className="mt-1 h-4 w-4 shrink-0 text-gold-300" />
                  <span>Questions about a program?</span>
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-cream-100/80">
                  Call or email us to enroll in Quran Maktab, WISE Sunday
                  School, or YM Ibrahim.
                </p>
              </div>
            </Reveal>
          </div>

          {/* Shorter on phones so the map doesn't eat a full screen before
              the visitor reaches anything else. */}
          <div className="overflow-hidden rounded-3xl shadow-panel ring-1 ring-navy-900/5 lg:col-span-3">
            <iframe
              title="Map showing the location of Masjid Ibrahim in Spring, Texas"
              src={`https://maps.google.com/maps?q=${site.address.mapsQuery}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="block h-[20rem] w-full border-0 sm:h-[26rem] lg:h-full lg:min-h-[30rem]"
            />
          </div>
        </div>
      </section>
    </>
  );
}
