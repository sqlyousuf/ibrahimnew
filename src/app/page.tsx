import Image from "next/image";
import Link from "next/link";
import ProgramCard from "@/components/ProgramCard";
import Reveal from "@/components/Reveal";
import PrayerBoard from "@/components/PrayerBoard";
import { PatternField, StarDivider, StarGlyph } from "@/components/Ornament";
import { formatMasjidToday, getPrayerBoard } from "@/lib/prayerTimes";
import { programs, site } from "@/lib/site";

export default function HomePage() {
  const board = getPrayerBoard();
  const todayLabel = formatMasjidToday(new Date(), "short");

  return (
    <>
      {/* ---------------------------------------------------------------- Hero
          Deliberately short on phones: the prayer schedule below it is the
          number-one reason someone opens this site on a phone, so the hero
          must not consume the whole first screen. */}
      <section className="relative flex min-h-[25rem] items-center overflow-hidden bg-navy-950 sm:min-h-[32rem] lg:min-h-[44rem]">
        <Image
          src="https://images.unsplash.com/photo-1577561426384-62154a1e9457?auto=format&fit=crop&w=2000&q=80"
          alt="The prayer hall at Masjid Ibrahim, lined with warm arches"
          fill
          priority
          className="object-cover object-center opacity-70"
          sizes="100vw"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/80 to-navy-950/40"
        />
        <PatternField opacity={0.08} />

        <div className="container-page relative z-10 pt-10 pb-16 sm:pt-20 sm:pb-28 lg:pt-32 lg:pb-40">
          {/* No dir="rtl" — Arabic shapes correctly from its own Unicode
              directionality, and this keeps it flush with the left-aligned
              hero stack instead of drifting to the right edge. */}
          <p lang="ar" className="font-arabic text-xl text-gold-300 sm:text-2xl">
            السلام عليكم
          </p>
          <p className="section-eyebrow mt-2.5 text-gold-300 before:bg-gold-400">
            Welcome to {site.name}
          </p>
          <h1 className="mt-3 max-w-3xl text-balance font-display text-display-xl font-semibold text-white">
            A Place of Worship, Learning &amp; Community
          </h1>
          <p className="measure-narrow mt-3 text-[0.9375rem] leading-relaxed text-cream-100/85 sm:mt-6 sm:text-lede">
            Serving Spring, Texas with daily salah, Islamic education, and a
            welcoming home for families to grow in faith together.
          </p>
          <div className="mt-6 flex justify-center sm:mt-10">
            <Link href="/donate" className="btn-primary w-full sm:w-auto">
              Support the Masjid
            </Link>
          </div>
        </div>

        <span
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-gold-500/50 to-transparent"
        />
      </section>

      {/* ------------------------------------------------------- Prayer times
          First section after the hero on every viewport, rendered from local
          data so it paints instantly. On a phone this lands at the fold —
          today's times with no navigating and no tapping. */}
      <section className="relative overflow-hidden bg-navy-900 pb-14 pt-8 sm:pb-20 sm:pt-16 lg:py-24">
        <PatternField opacity={0.06} />

        <div className="container-page relative grid gap-5 lg:grid-cols-2 lg:items-center lg:gap-14">
          <div className="lg:col-start-1 lg:row-start-1">
            {/* The eyebrow is redundant with the card's own header on a phone,
                and the space it costs is space the times could occupy. */}
            <p className="section-eyebrow hidden text-gold-300 before:bg-gold-400 sm:inline-flex">
              Salah Times
            </p>
            <h2 className="font-display text-xl font-semibold text-white sm:mt-3 sm:text-display-md">
              Today at Masjid Ibrahim
            </h2>
          </div>

          <PrayerBoard
            board={board}
            todayLabel={todayLabel}
            className="lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:self-center"
          />

          <div className="lg:col-start-1 lg:row-start-2">
            <p className="measure-narrow leading-relaxed text-cream-100/80">
              Adhan marks the start of each salah window; iqamah is when the
              congregation lines up. Jumu&apos;ah timings, sunrise, and the week
              ahead are on the salah times page.
            </p>
            <Link
              href="/prayer-times"
              className="btn-primary mt-6 w-full sm:w-auto"
            >
              View Full Salah Schedule
            </Link>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------ Welcome/story */}
      <section className="section container-page">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <Reveal className="relative">
            {/* Arch framing echoes the dome in the masjid's logo. */}
            <div className="arch relative aspect-[4/5] w-full overflow-hidden shadow-panel">
              <Image
                src="https://images.unsplash.com/photo-1761640864240-f793d7ec8348?auto=format&fit=crop&w=1200&q=80"
                alt="Congregants standing shoulder to shoulder in salah"
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 40vw, 90vw"
              />
            </div>
            <div className="card absolute -bottom-6 -right-2 w-40 p-4 sm:-right-6 sm:w-48 sm:p-5">
              <StarGlyph className="h-5 w-5 text-gold-500" />
              <p className="mt-2 font-display text-3xl font-bold leading-none text-navy-900">
                5x
              </p>
              <p className="mt-1.5 text-[0.6875rem] font-semibold uppercase leading-snug tracking-wide text-navy-700">
                Daily congregational salah
              </p>
            </div>
          </Reveal>

          <Reveal delay={80} className="mt-8 lg:mt-0">
            <p className="section-eyebrow">Our Story</p>
            <h2 className="mt-3 font-display text-display-md font-semibold text-navy-900">
              Welcome to Masjid Ibrahim
            </h2>
            <div className="measure mt-5 space-y-4 leading-relaxed text-navy-700">
              <p>
                At Masjid Ibrahim, we are committed to fostering a strong and
                connected Muslim community through salah, education, and
                service. Our masjid is a sanctuary where individuals and
                families come together to seek knowledge, strengthen their
                faith, and engage in meaningful worship.
              </p>
              <p>
                Beyond being a place of salah, we serve as a center for
                learning, personal growth, and community development &mdash;
                instilling Islamic values, promoting unity, and offering a
                space for spiritual enrichment for every generation.
              </p>
            </div>
            <Link
              href="/about"
              className="btn-outline-navy mt-7 w-full sm:w-auto"
            >
              Learn More About Us
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ---------------------------------------------------------- Institute */}
      <section className="section relative overflow-hidden bg-cream-200">
        <PatternField opacity={0.05} />
        <div className="container-page relative">
          <Reveal className="mx-auto max-w-2xl text-center">
            <p className="section-eyebrow justify-center">
              Masjid Ibrahim Institute
            </p>
            <h2 className="mt-3 font-display text-display-md font-semibold text-navy-900">
              Nurturing Faith Through Education
            </h2>
            <p className="mx-auto mt-4 max-w-xl leading-relaxed text-navy-700">
              From young learners memorizing Qur&apos;an to youth building
              brotherhood, our Institute offers a program for every stage of
              the journey.
            </p>
          </Reveal>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:mt-14 lg:grid-cols-3 lg:gap-8">
            {programs.map((program, i) => (
              <Reveal key={program.slug} delay={i * 90} className="h-full">
                <ProgramCard program={program} />
              </Reveal>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link
              href="/institute"
              className="btn-outline-navy w-full sm:w-auto"
            >
              Explore the Institute
            </Link>
          </div>
        </div>
      </section>

      {/* --------------------------------------------------------- Leadership */}
      <section className="section container-page">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <Reveal className="lg:order-2">
            <div className="arch-sm relative aspect-[4/3] w-full overflow-hidden shadow-panel">
              <Image
                src="https://images.unsplash.com/photo-1758618079913-b6b631637ad9?auto=format&fit=crop&w=1200&q=80"
                alt="The dome and minaret of Masjid Ibrahim against an open sky"
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 40vw, 90vw"
              />
            </div>
          </Reveal>
          <Reveal delay={80} className="lg:order-1">
            <p className="section-eyebrow">Our Leadership</p>
            <h2 className="mt-3 font-display text-display-md font-semibold text-navy-900">
              Guided by Knowledge, Rooted in Community
            </h2>
            <p className="measure mt-5 leading-relaxed text-navy-700">
              Imam Yousuf Ahmed and Dr. Mamdouh Moustafa Mahmoud lead our
              congregation with decades of combined scholarship &mdash; from
              classical Islamic sciences to Qur&apos;anic Qira&apos;at, guiding
              our community with warmth and wisdom.
            </p>
            <Link href="/about" className="btn-outline-navy mt-7 w-full sm:w-auto">
              Meet Our Imams
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ------------------------------------------------------------- Donate */}
      <section className="relative overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1593113646773-028c64a8f1b8?auto=format&fit=crop&w=2000&q=80"
          alt=""
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div aria-hidden="true" className="absolute inset-0 bg-navy-950/85" />
        <PatternField opacity={0.08} />

        <Reveal className="container-page section relative z-10 mx-auto max-w-3xl text-center">
          <StarDivider className="mb-7" />
          <p className="section-eyebrow justify-center text-gold-300 before:bg-gold-400">
            Give for the Sake of Allah
          </p>
          <h2 className="mt-3 font-display text-display-md font-semibold text-white">
            Help Us Grow &amp; Serve
          </h2>
          <p className="mx-auto mt-4 max-w-xl leading-relaxed text-cream-100/85">
            With your generous contributions, we can continue expanding our
            services, maintaining our facilities, and offering valuable
            programs to our community.
          </p>
          <Link href="/donate" className="btn-primary mt-8 w-full sm:w-auto">
            Donate Now
          </Link>
        </Reveal>
      </section>
    </>
  );
}
