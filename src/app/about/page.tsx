import type { Metadata } from "next";
import Image from "next/image";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import { PatternField, StarDivider, StarGlyph } from "@/components/Ornament";
import { leadership } from "@/lib/site";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Masjid Ibrahim's mission, story, and the imams leading our community in Spring, Texas.",
};

const values = [
  {
    title: "Worship",
    body: "A welcoming sanctuary for the five daily salah, Jumu'ah, and the spiritual life of every believer.",
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
        imageAlt="The masjid minaret silhouetted at sunset"
        imagePosition="object-center"
      />

      {/* ---------------------------------------------------------- Our story */}
      <section className="section container-page max-w-3xl">
        <Reveal>
          <p className="section-eyebrow justify-center text-center">
            Our Story
          </p>
          {/* Left-aligned on phones: centred long-form copy is hard to track
              when lines are short. Centred only once lines get wide enough. */}
          <div className="mt-6 space-y-5 leading-[1.75] text-navy-700 sm:text-center sm:text-lede">
            <p>
              At Masjid Ibrahim, we are committed to fostering a strong and
              connected Muslim community through salah, education, and
              service. Our masjid is a sanctuary where individuals and families
              come together to seek knowledge, strengthen their faith, and
              engage in meaningful worship.
            </p>
            <p>
              Beyond being a place of salah, we serve as a center for learning,
              personal growth, and community development. Through our various
              programs and initiatives, we aim to instill Islamic values,
              promote unity, and provide a space for spiritual enrichment.
            </p>
            <p>
              As part of our mission, we also focus on charitable efforts to
              support those in need. With your generous contributions, we can
              continue expanding our services, maintaining our facilities, and
              offering valuable programs to our community.
            </p>
          </div>

          <StarDivider className="my-8 sm:my-10" />

          <p className="text-balance text-center font-display text-xl italic leading-snug text-navy-900 sm:text-2xl">
            We invite you to join us in salah, learning, and giving, as we work
            together to build a stronger, more connected ummah.
          </p>
        </Reveal>
      </section>

      {/* ------------------------------------------------------------ Values */}
      <section className="section-tight relative overflow-hidden bg-cream-200">
        <PatternField opacity={0.05} />
        <div className="container-page relative">
          <div className="grid gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
            {values.map((value, i) => (
              <Reveal key={value.title} delay={i * 70} className="h-full">
                <div className="card h-full p-5 sm:p-6 lg:p-7">
                  <StarGlyph className="h-5 w-5 text-gold-500" />
                  <h2 className="mt-3 font-display text-lg font-semibold text-navy-900 sm:text-xl">
                    {value.title}
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-navy-700">
                    {value.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------- Leadership */}
      <section className="section container-page">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="section-eyebrow justify-center">Our Leadership</p>
          <h2 className="mt-3 font-display text-display-md font-semibold text-navy-900">
            Meet Our Imams
          </h2>
        </Reveal>

        <div className="mt-10 space-y-12 lg:mt-16 lg:space-y-20">
          {leadership.map((leader, i) => (
            <Reveal
              key={leader.name}
              className="grid items-center gap-7 lg:grid-cols-5 lg:gap-12"
            >
              <div
                className={`arch relative mx-auto aspect-[4/5] w-full max-w-[17rem] overflow-hidden shadow-panel sm:max-w-xs lg:col-span-2 lg:mx-0 lg:max-w-none ${
                  i % 2 === 1 ? "lg:order-2" : "lg:order-1"
                }`}
              >
                <Image
                  src={leader.image}
                  alt={`${leader.name}, ${leader.role}`}
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 30vw, 17rem"
                />
              </div>
              <div
                className={`lg:col-span-3 ${
                  i % 2 === 1 ? "lg:order-1" : "lg:order-2"
                }`}
              >
                <h3 className="font-display text-xl font-semibold text-navy-900 sm:text-2xl">
                  {leader.name}
                </h3>
                <p className="mt-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-gold-700 sm:text-sm">
                  {leader.role}
                </p>
                <div className="measure mt-4 space-y-4 leading-relaxed text-navy-700">
                  {leader.bio.map((paragraph, idx) => (
                    <p key={idx}>{paragraph}</p>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
