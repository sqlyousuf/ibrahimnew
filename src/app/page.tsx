import Link from "next/link";
import ProgramCard from "@/components/ProgramCard";
import Reveal from "@/components/Reveal";
import PrayerBoard from "@/components/PrayerBoard";
import SectionHeading from "@/components/SectionHeading";
import { PatternField, Rosette, StarDivider, StarGlyph } from "@/components/Ornament";
import HomeHero from "@/components/home/HomeHero";
import UpcomingFliers from "@/components/home/UpcomingFliers";
import TestimonialCarousel from "@/components/home/TestimonialCarousel";
import PageTransition from "@/components/motion/PageTransition";
import CinematicImage from "@/components/motion/CinematicImage";
import HorizontalRail from "@/components/motion/HorizontalRail";
import { programs, site, testimonials } from "@/lib/site";

export default function HomePage() {
  return (
    <PageTransition>
      <HomeHero
        eyebrow={`Under Construction · ${site.donate.campaign.name.replace("Construction ", "")}`}
        title={
          <>
            Help us <span className="text-foil italic">build</span> the
            House of Allah
          </>
        }
        hadith={{
          text: "Whoever builds a masjid for Allah, Allah will build for him a house in Paradise.",
          source: "Sahih al-Bukhari & Sahih Muslim",
        }}
        description="Masjid Ibrahim is growing, and our construction is underway. Give generously today and share in the reward of every salah, every lesson, and every gathering held within these walls."
        highlights={site.donate.campaign.description.split(/\s*(?:,|&)\s*/)}
        ctaLabel="Donate to Construction"
        ctaHref={site.donate.campaign.url}
        secondaryLabel="Other Ways to Give"
        secondaryHref="/donate"
      />

      {/* ------------------------------------------------------- Prayer times
          First section after the hero on every viewport, rendered from local
          data so it paints instantly — cinematic chrome wraps around it, but
          the board itself is never gated behind an animation. */}
      <section className="relative overflow-hidden bg-navy-975 pb-16 pt-12 sm:pb-24 sm:pt-20 lg:py-28">
        <PatternField opacity={0.05} />
        <div aria-hidden="true" className="grain absolute inset-0" />
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-80 bg-[radial-gradient(60%_100%_at_50%_0%,rgba(220,181,106,0.12),transparent_70%)]"
        />

        <div className="container-page relative grid gap-8 lg:grid-cols-2 lg:items-center lg:gap-16">
          <SectionHeading
            arabic="الصلاة"
            eyebrow="Salah Times"
            title={
              <>
                Today at <span className="text-foil italic">Masjid Ibrahim</span>
              </>
            }
            tone="dark"
            className="text-center lg:col-start-1 lg:row-start-1 lg:text-left [&_.section-eyebrow]:justify-center lg:[&_.section-eyebrow]:justify-start"
          />

          <PrayerBoard
            className="lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:self-center"
          />

          <div className="text-center lg:col-start-1 lg:row-start-2 lg:text-left">
            <p className="mx-auto max-w-md text-[0.9375rem] leading-[1.75] text-cream-100/70 lg:mx-0">
              Adhan marks the start of each salah window; iqamah is when the
              congregation lines up. Jumu&apos;ah timings, sunrise, and the week
              ahead are on the salah times page.
            </p>
            <Link href="/prayer-times" className="btn-outline mt-7 w-full sm:w-auto">
              Full Salah Schedule
            </Link>
          </div>
        </div>
      </section>

      {/* Upcoming one-off events with fliers — renders nothing when there
          are none (see UpcomingFliers.tsx). */}
      <UpcomingFliers />

      {/* ------------------------------------------------------ Welcome/story */}
      <section className="section relative overflow-hidden">
        <div className="container-page grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <Reveal className="relative mx-auto w-full max-w-md lg:max-w-none">
            {/* Offset gold arch behind the photo — a second frame that makes
                the image feel set into the page rather than placed on it. */}
            <div
              aria-hidden="true"
              className="arch absolute inset-0 translate-x-3 translate-y-3 border border-gold-500/50 sm:translate-x-5 sm:translate-y-5"
            />
            <div className="arch relative aspect-[4/5] w-full overflow-hidden shadow-panel">
              <CinematicImage
                src="https://images.unsplash.com/photo-1761640864240-f793d7ec8348?auto=format&fit=crop&w=1200&q=80"
                alt="Congregants standing shoulder to shoulder in salah"
                speed={0.15}
                sizes="(min-width: 1024px) 40vw, 90vw"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-navy-975/50 via-transparent to-transparent"
              />
            </div>
            <div className="card-night absolute -bottom-8 -left-2 w-44 px-5 py-4 sm:-left-8 sm:w-52">
              <StarGlyph className="h-5 w-5 text-gold-300" />
              <p className="text-foil mt-2 font-display text-5xl font-semibold leading-none">
                5×
              </p>
              <p className="mt-2 text-[0.625rem] font-semibold uppercase leading-snug tracking-[0.2em] text-cream-100/75">
                Daily congregational salah
              </p>
            </div>
          </Reveal>

          <Reveal delay={80} className="mt-6 lg:mt-0">
            <SectionHeading
              arabic="أهلاً وسهلاً"
              eyebrow="Our Story"
              title={
                <>
                  A sanctuary for <span className="text-foil-deep italic">every</span>{" "}
                  generation
                </>
              }
            />
            <div className="measure mt-5 space-y-4 text-[0.9375rem] leading-[1.8] text-navy-700 sm:text-base">
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
              className="btn-outline-navy mt-8 w-full sm:w-auto"
            >
              Learn More About Us
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ---------------------------------------------------------- Ayah band
          At-Tawbah 9:18. Set in Amiri (a Naskh), not the Ruq'ah used for
          ornamental accents — Qur'anic text is never set decoratively. */}
      <section className="relative overflow-hidden bg-navy-975 py-20 sm:py-28">
        <PatternField opacity={0.06} />
        <div aria-hidden="true" className="grain absolute inset-0" />
        <Rosette className="pointer-events-none absolute left-1/2 top-1/2 h-[34rem] w-[34rem] -translate-x-1/2 -translate-y-1/2 animate-star-spin-slow text-gold-300/[0.07] sm:h-[44rem] sm:w-[44rem]" />
        <span aria-hidden="true" className="rule-gold absolute inset-x-0 top-0" />
        <span aria-hidden="true" className="rule-gold absolute inset-x-0 bottom-0" />

        <Reveal className="container-page relative mx-auto max-w-3xl text-center">
          <StarDivider />
          <blockquote className="mt-8">
            <p
              lang="ar"
              dir="rtl"
              className="text-foil font-arabic text-[2rem] leading-[1.9] sm:text-5xl sm:leading-[1.8]"
            >
              إنما يعمر مساجد الله من آمن بالله واليوم الآخر
            </p>
            <p className="mx-auto mt-6 max-w-xl font-display text-[1.375rem] italic leading-[1.45] text-cream-100/85 sm:text-[1.75rem]">
              &ldquo;The masjids of Allah are only to be maintained by those who
              believe in Allah and the Last Day.&rdquo;
            </p>
          </blockquote>
          <p className="mt-6 text-[0.625rem] font-semibold uppercase tracking-[0.32em] text-gold-300/80">
            Surah At-Tawbah · 9:18
          </p>
        </Reveal>
      </section>

      {/* ---------------------------------------------------------- Institute
          Pinned horizontal rail — the site's signature "scroll through the
          programs" moment. Degrades to a native horizontal-scroll row when
          motion is off (see HorizontalRail.tsx), so every card is always
          reachable. */}
      <section className="section relative overflow-hidden bg-cream-200">
        <PatternField opacity={0.05} />
        <div className="container-page relative">
          <Reveal>
            <SectionHeading
              arabic="العلم"
              eyebrow="Masjid Ibrahim Institute"
              title={
                <>
                  Nurturing faith through{" "}
                  <span className="text-foil-deep italic">education</span>
                </>
              }
              description="From young learners memorizing Qur'an to youth building brotherhood, our Institute offers a program for every stage of the journey."
              align="center"
              className="max-w-2xl"
            />
          </Reveal>
        </div>

        <HorizontalRail
          className="mt-10 lg:mt-14"
          trackClassName="flex gap-5 px-5 sm:gap-8 sm:px-6 lg:px-8"
        >
          {programs.map((program) => (
            <div key={program.slug} className="w-[84vw] shrink-0 sm:w-[420px]">
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
      <section className="section relative overflow-hidden">
        <div className="container-page grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <Reveal className="relative lg:order-2">
            <div
              aria-hidden="true"
              className="arch-sm absolute inset-0 -translate-x-3 translate-y-3 border border-gold-500/50 sm:-translate-x-5 sm:translate-y-5"
            />
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
            <SectionHeading
              arabic="القيادة"
              eyebrow="Our Leadership"
              title={
                <>
                  Guided by knowledge, <span className="text-foil-deep italic">rooted</span>{" "}
                  in community
                </>
              }
              description="Imam Yousuf Ahmed and Dr. Mamdouh Moustafa Mahmoud lead our congregation with decades of combined scholarship — from classical Islamic sciences to Qur'anic Qira'at, guiding our community with warmth and wisdom."
            />
            <Link href="/about" className="btn-outline-navy mt-8 w-full sm:w-auto">
              Meet Our Imams
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ---------------------------------------------------------- Testimonials */}
      <section className="section relative overflow-hidden bg-cream-200">
        <PatternField opacity={0.05} />
        <div className="container-page relative">
          <Reveal>
            <SectionHeading
              eyebrow="What Our Community Says"
              title={
                <>
                  Strengthening faith <span className="text-foil-deep italic">together</span>
                </>
              }
              align="center"
              className="max-w-2xl"
            />
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
        <div aria-hidden="true" className="absolute inset-0 bg-navy-975/[0.88]" />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(60%_60%_at_50%_45%,rgba(220,181,106,0.16),transparent_70%)]"
        />
        <PatternField opacity={0.07} />
        <div aria-hidden="true" className="grain absolute inset-0" />

        <Reveal className="container-page section relative z-10 mx-auto max-w-3xl text-center">
          <SectionHeading
            arabic="صدقة جارية"
            eyebrow={site.donate.campaign.name}
            title={
              <>
                Every brick, a <span className="text-foil italic">lasting</span>{" "}
                reward
              </>
            }
            description={`Our ${site.donate.campaign.description} are being built now. Whatever you give becomes part of this masjid — a sadaqah jariyah that keeps giving for as long as people pray here.`}
            align="center"
            tone="dark"
          />
          <div className="mx-auto mt-9 flex max-w-sm flex-col gap-3 sm:max-w-none sm:flex-row sm:justify-center">
            <a
              href={site.donate.campaign.url}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary w-full sm:w-auto"
            >
              Donate to Construction
            </a>
            <Link href="/donate" className="btn-outline w-full sm:w-auto">
              Other Ways to Give
            </Link>
          </div>
        </Reveal>
      </section>
    </PageTransition>
  );
}
