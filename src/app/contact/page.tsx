import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Masjid Ibrahim in Spring, Texas — address, phone, email, and directions.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Get In Touch"
        title="Contact Us"
        description="We'd love to hear from you — reach out with questions, feedback, or to get involved."
        image="https://images.unsplash.com/photo-1758618079913-b6b631637ad9?auto=format&fit=crop&w=2000&q=80"
        imageAlt="Masjid dome and minaret"
      />

      <section className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-5">
          <div className="lg:col-span-2 space-y-6">
            <div className="rounded-2xl bg-white p-8 shadow-soft">
              <p className="section-eyebrow">Visit</p>
              <h3 className="mt-2 font-display text-xl font-semibold text-navy-900">
                Address
              </h3>
              <p className="mt-2 text-navy-700">
                {site.address.line1}
                <br />
                {site.address.line2}
              </p>
            </div>

            <div className="rounded-2xl bg-white p-8 shadow-soft">
              <p className="section-eyebrow">Call & Email</p>
              <h3 className="mt-2 font-display text-xl font-semibold text-navy-900">
                Reach Us Directly
              </h3>
              <ul className="mt-3 space-y-2 text-navy-700">
                <li>
                  <a href={site.contact.phoneHref} className="hover:text-gold-600">
                    {site.contact.phone}
                  </a>
                </li>
                <li>
                  <a
                    href={`mailto:${site.contact.adminEmail}`}
                    className="hover:text-gold-600"
                  >
                    {site.contact.adminEmail} <span className="text-sm text-navy-500">(Admin)</span>
                  </a>
                </li>
                <li>
                  <a
                    href={`mailto:${site.contact.imamEmail}`}
                    className="hover:text-gold-600"
                  >
                    {site.contact.imamEmail} <span className="text-sm text-navy-500">(Imam)</span>
                  </a>
                </li>
              </ul>
            </div>

            <div className="rounded-2xl bg-navy-900 p-8 text-cream-100 shadow-soft">
              <p className="section-eyebrow text-gold-300">Institute Enrollment</p>
              <h3 className="mt-2 font-display text-xl font-semibold text-white">
                Questions about a program?
              </h3>
              <p className="mt-2 text-sm text-cream-100/80">
                Call or email us to enroll in Quran Maktab, WISE Sunday
                School, or YM Ibrahim.
              </p>
            </div>
          </div>

          <div className="overflow-hidden rounded-3xl shadow-soft lg:col-span-3">
            <iframe
              title="Masjid Ibrahim location map"
              src={`https://maps.google.com/maps?q=${site.address.mapsQuery}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: 480 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-full min-h-[480px] w-full"
            />
          </div>
        </div>
      </section>
    </>
  );
}
