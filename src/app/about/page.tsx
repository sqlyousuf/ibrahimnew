import type { Metadata } from "next";
import Image from "next/image";
import PageHero from "@/components/PageHero";
import { leadership } from "@/lib/site";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Masjid Ibrahim's mission, story, and the imams leading our community in Spring, Texas.",
};

const values = [
  {
    title: "Worship",
    body: "A welcoming sanctuary for the five daily prayers, Jumu'ah, and the spiritual life of every believer.",
  },
  {
    title: "Education",
    body: "Rooted in classical Islamic scholarship, delivered in a way that speaks to modern life.",
  },
  {
    title: "Community",
    body: "A gathering place that strengthens bonds between families and generations.",
  },
  {
    title: "Service",
    body: "Charitable efforts that support those in need, near and far.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About Masjid Ibrahim"
        title="A Place of Worship, Learning, and Community"
        description="Rooted in faith, built for our community in Spring, Texas."
        image="https://images.unsplash.com/photo-1742148534796-70b39f29bff6?auto=format&fit=crop&w=2000&q=80"
        imageAlt="Masjid minaret at sunset"
      />

      {/* Our story */}
      <section className="mx-auto max-w-4xl px-5 py-24 lg:px-8">
        <p className="section-eyebrow justify-center text-center">Our Story</p>
        <div className="mt-6 space-y-6 text-center text-lg leading-relaxed text-navy-700">
          <p>
            At Masjid Ibrahim, we are committed to fostering a strong and
            connected Muslim community through prayer, education, and
            service. Our masjid is a sanctuary where individuals and families
            come together to seek knowledge, strengthen their faith, and
            engage in meaningful worship.
          </p>
          <p>
            Beyond being a place of prayer, we serve as a center for
            learning, personal growth, and community development. Through
            our various programs and initiatives, we aim to instill Islamic
            values, promote unity, and provide a space for spiritual
            enrichment.
          </p>
          <p>
            As part of our mission, we also focus on charitable efforts to
            support those in need. With your generous contributions, we can
            continue expanding our services, maintaining our facilities, and
            offering valuable programs to our community.
          </p>
          <p className="font-display text-2xl italic text-navy-900">
            We invite you to join us in prayer, learning, and giving, as we
            work together to build a stronger, more connected ummah.
          </p>
        </div>
      </section>

      {/* Values */}
      <section className="bg-cream-200 py-20">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value) => (
              <div
                key={value.title}
                className="rounded-2xl bg-white p-8 shadow-soft"
              >
                <h3 className="font-display text-xl font-semibold text-navy-900">
                  {value.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-navy-700">
                  {value.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className="mx-auto max-w-7xl px-5 py-24 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="section-eyebrow justify-center">Our Leadership</p>
          <h2 className="mt-3 font-display text-3xl font-semibold text-navy-900 sm:text-4xl">
            Meet Our Imams
          </h2>
        </div>

        <div className="mt-16 space-y-20">
          {leadership.map((leader, i) => (
            <div key={leader.name} className="grid items-center gap-12 lg:grid-cols-5">
              <div
                className={`relative aspect-square w-full overflow-hidden rounded-3xl shadow-soft lg:col-span-2 ${
                  i % 2 === 1 ? "lg:order-2" : "lg:order-1"
                }`}
              >
                <Image
                  src={leader.image}
                  alt={leader.name}
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 30vw, 90vw"
                />
              </div>
              <div
                className={`lg:col-span-3 ${i % 2 === 1 ? "lg:order-1" : "lg:order-2"}`}
              >

                <h3 className="font-display text-2xl font-semibold text-navy-900">
                  {leader.name}
                </h3>
                <p className="mt-1 text-sm font-semibold uppercase tracking-wide text-gold-600">
                  {leader.role}
                </p>
                <div className="mt-5 space-y-4 text-navy-700">
                  {leader.bio.map((paragraph, idx) => (
                    <p key={idx} className="leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
