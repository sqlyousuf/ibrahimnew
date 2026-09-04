import Link from "next/link";
import ProgramCard from "@/components/ProgramCard";
import Reveal from "@/components/Reveal";
import PrayerBoard from "@/components/PrayerBoard";
import { PatternField, StarDivider, StarGlyph } from "@/components/Ornament";
import HomeHero from "@/components/home/HomeHero";
import TestimonialCarousel from "@/components/home/TestimonialCarousel";
import PageTransition from "@/components/motion/PageTransition";
import CinematicImage from "@/components/motion/CinematicImage";
import HorizontalRail from "@/components/motion/HorizontalRail";
import { formatMasjidToday, getPrayerBoard } from "@/lib/prayerTimes";
import { programs, site, testimonials } from "@/lib/site";

export default function HomePage() {
  const board = getPrayerBoard();
  const todayLabel = formatMasjidToday(new Date(), "short");

  return (
    <PageTransition>
      <HomeHero
        eyebrow={`Welcome to ${site.name}`}
        title="A Place of Worship, Learning & Community"
        description="Serving Spring, Texas with daily salah, Islamic education, and a welcoming home for families to grow in faith together."
        ctaLabel="Support the Masjid"
        ctaHref="/donate"
      />

      {/* ------------------------------------------------------- Prayer times
          First section after the hero on every viewport, rendered from local
          data so it paints instantly — cinematic chrome wraps around it, but
          the board itself is never gated behind an animation. */}
      <section className="relative overflow-hidden bg-navy-975 pb-14 pt-8 sm:pb-20 sm:pt-16 lg:py-24">
        <PatternField opacity={0.06} />
        <div aria-hidden="true" className="grain absolute inset-0" />

        <div className="container-page relative grid gap-5 lg:grid-cols-2 lg:items-center lg:gap-14">
          <div className="lg:col-start-1 lg:row-start-1">
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
            <div className="arch relative aspect-[4/5] w-full overflow-hidden shadow-panel">
              <CinematicImage
                src="https://images.unsplash.com/photo-1761640864240-f793d7ec8348?auto=format&fit=crop&w=1200&q=80"
                alt="Congregants standing shoulder to shoulder in salah"
                speed={0.15}
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

      {/* ---------------------------------------------------------- Institute
          Pinned horizontal rail — the site's signature "scroll through the
          programs" moment. Degrades to a native horizontal-scroll row when
          motion is off (see HorizontalRail.tsx), so every card is always
          reachable. */}
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
        </div>

        <HorizontalRail
          className="mt-10 lg:mt-14"
          trackClassName="flex gap-6 px-5 sm:gap-8 sm:px-6 lg:px-8"
        >
          {programs.map((program) => (
            <div key={program.slug} className="w-[82vw] shrink-0 sm:w-[420px]">
              <ProgramCard program={program} />
            </div>
          ))}
          {/* Trailing spacer so the last card can reach center-screen at the
              end of the pinned scroll, matching the leading container gutter. */}
          <div aria-hidden="true" className="w-px shrink-0 sm:w-2" />
        </HorizontalRail>

        <div className="container-page relative mt-10 text-center">
          <Link
            href="/institute"
            className="btn-outline-navy w-full sm:w-auto"
          >
            Explore the Institute
          </Link>
        </div>
      </section>

      {/* --------------------------------------------------------- Leadership */}
      <section className="section container-page">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <Reveal className="lg:order-2">
            <div className="arch-sm relative aspect-[4/3] w-full overflow-hidden shadow-panel">
              <CinematicImage
                src="https://images.unsplash.com/photo-1758618079913-b6b631637ad9?auto=format&fit=crop&w=1200&q=80"
                alt="The dome and minaret of Masjid Ibrahim against an open sky"
                speed={0.15}
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

      {/* ---------------------------------------------------------- Testimonials */}
      <section className="section relative overflow-hidden bg-cream-200">
        <PatternField opacity={0.05} />
        <div className="container-page relative">
          <Reveal className="mx-auto max-w-2xl text-center">
            <p className="section-eyebrow justify-center">
              What Our Community Says
            </p>
            <h2 className="mt-3 font-display text-display-md font-semibold text-navy-900">
              Strengthening Faith Together
            </h2>
          </Reveal>

          <TestimonialCarousel testimonials={testimonials} />
        </div>
      </section>

      {/* ------------------------------------------------------------- Donate */}
      <section className="relative overflow-hidden bg-navy-975">
        <CinematicImage
          src="https://images.unsplash.com/photo-1593113646773-028c64a8f1b8?auto=format&fit=crop&w=2000&q=80"
          alt=""
          speed={0.3}
          sizes="100vw"
        />
        <div aria-hidden="true" className="absolute inset-0 bg-navy-975/85" />
        <PatternField opacity={0.08} />
        <div aria-hidden="true" className="grain absolute inset-0" />

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
    </PageTransition>
  );
}
