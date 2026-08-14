import Image from "next/image";
import Link from "next/link";
import ProgramCard from "@/components/ProgramCard";
import { programs, site } from "@/lib/site";

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative flex min-h-[88vh] items-center overflow-hidden bg-navy-950">
        <Image
          src="https://images.unsplash.com/photo-1577561426384-62154a1e9457?auto=format&fit=crop&w=2000&q=80"
          alt="Masjid Ibrahim prayer hall"
          fill
          priority
          className="object-cover opacity-60"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/70 to-navy-950/30" />
        <div className="relative z-10 mx-auto w-full max-w-7xl px-5 py-32 lg:px-8">
          <p className="section-eyebrow text-gold-300">
            Welcome to {site.name}
          </p>
          <h1 className="mt-5 max-w-3xl font-display text-5xl font-semibold leading-tight text-white sm:text-6xl lg:text-7xl">
            A Place of Worship, Learning &amp; Community
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-cream-100/85">
            Serving Spring, Texas with daily prayer, Islamic education, and a
            welcoming home for families to grow in faith together.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link href="/prayer-times" className="btn-primary">
              View Prayer Times
            </Link>
            <Link href="/donate" className="btn-outline">
              Support the Masjid
            </Link>
          </div>
        </div>
      </section>

      {/* Welcome / About snippet */}
      <section className="mx-auto max-w-7xl px-5 py-24 lg:px-8">
        <div className="grid items-center gap-14 lg:grid-cols-2">
          <div className="relative">
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-3xl shadow-soft">
              <Image
                src="https://images.unsplash.com/photo-1761640864240-f793d7ec8348?auto=format&fit=crop&w=1200&q=80"
                alt="Congregants praying together at Masjid Ibrahim"
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 40vw, 90vw"
              />
            </div>
            <div className="absolute -bottom-8 -right-6 hidden w-48 rounded-2xl bg-white p-5 shadow-soft sm:block">
              <p className="font-display text-3xl font-bold text-navy-900">
                5x
              </p>
              <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-navy-700">
                Daily congregational prayers
              </p>
            </div>
          </div>

          <div>
            <p className="section-eyebrow">Our Story</p>
            <h2 className="mt-3 font-display text-3xl font-semibold text-navy-900 sm:text-4xl">
              Welcome to Masjid Ibrahim
            </h2>
            <p className="mt-6 leading-relaxed text-navy-700">
              At Masjid Ibrahim, we are committed to fostering a strong and
              connected Muslim community through prayer, education, and
              service. Our masjid is a sanctuary where individuals and
              families come together to seek knowledge, strengthen their
              faith, and engage in meaningful worship.
            </p>
            <p className="mt-4 leading-relaxed text-navy-700">
              Beyond being a place of prayer, we serve as a center for
              learning, personal growth, and community development &mdash;
              instilling Islamic values, promoting unity, and offering a
              space for spiritual enrichment for every generation.
            </p>
            <Link href="/about" className="btn-outline-navy mt-8">
              Learn More About Us
            </Link>
          </div>
        </div>
      </section>

      {/* Prayer times CTA */}
      <section className="bg-navy-900 py-20">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 lg:grid-cols-2 lg:px-8">
          <div>
            <p className="section-eyebrow text-gold-300">Salah Times</p>
            <h2 className="mt-3 font-display text-3xl font-semibold text-white sm:text-4xl">
              Join Us in Prayer
            </h2>
            <p className="mt-5 max-w-md leading-relaxed text-cream-100/80">
              Live iqama and adhan times for all five daily prayers and
              Jumu&apos;ah, updated automatically so you&apos;re never late
              for salah.
            </p>
            <Link href="/prayer-times" className="btn-primary mt-8">
              View Full Prayer Schedule
            </Link>
          </div>
          <div className="overflow-hidden rounded-2xl bg-white shadow-soft">
            <iframe
              src={site.prayerWidget}
              title="Masjid Ibrahim Prayer Times"
              width="100%"
              height="420"
              frameBorder={0}
              className="block h-[420px] w-full"
            />
          </div>
        </div>
      </section>

      {/* Institute programs */}
      <section className="mx-auto max-w-7xl px-5 py-24 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="section-eyebrow justify-center">Masjid Ibrahim Institute</p>
          <h2 className="mt-3 font-display text-3xl font-semibold text-navy-900 sm:text-4xl">
            Nurturing Faith Through Education
          </h2>
          <p className="mt-5 leading-relaxed text-navy-700">
            From young learners memorizing Qur&apos;an to youth building
            brotherhood, our Institute offers a program for every stage of
            the journey.
          </p>
        </div>

        <div className="mt-14 grid gap-8 md:grid-cols-3">
          {programs.map((program) => (
            <ProgramCard key={program.slug} program={program} />
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link href="/institute" className="btn-outline-navy">
            Explore the Institute
          </Link>
        </div>
      </section>

      {/* Leadership snippet */}
      <section className="bg-cream-200 py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 lg:grid-cols-2 lg:px-8">
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl shadow-soft lg:order-2">
            <Image
              src="https://images.unsplash.com/photo-1758618079913-b6b631637ad9?auto=format&fit=crop&w=1200&q=80"
              alt="Masjid Ibrahim dome and minaret"
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 40vw, 90vw"
            />
          </div>
          <div className="lg:order-1">
            <p className="section-eyebrow">Our Leadership</p>
            <h2 className="mt-3 font-display text-3xl font-semibold text-navy-900 sm:text-4xl">
              Guided by Knowledge, Rooted in Community
            </h2>
            <p className="mt-6 leading-relaxed text-navy-700">
              Imam Yousuf Ahmed and Dr. Mamdouh Moustafa Mahmoud lead our
              congregation with decades of combined scholarship &mdash; from
              classical Islamic sciences to Qur&apos;anic Qira&apos;at,
              guiding our community with warmth and wisdom.
            </p>
            <Link href="/about" className="btn-outline-navy mt-8">
              Meet Our Imams
            </Link>
          </div>
        </div>
      </section>

      {/* Donate banner */}
      <section className="relative overflow-hidden py-24">
        <Image
          src="https://images.unsplash.com/photo-1593113646773-028c64a8f1b8?auto=format&fit=crop&w=2000&q=80"
          alt="Volunteers packing donation boxes"
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-navy-950/80" />
        <div className="relative z-10 mx-auto max-w-3xl px-5 text-center lg:px-8">
          <p className="section-eyebrow justify-center text-gold-300">
            Give for the Sake of Allah
          </p>
          <h2 className="mt-3 font-display text-3xl font-semibold text-white sm:text-4xl">
            Help Us Grow &amp; Serve
          </h2>
          <p className="mt-5 leading-relaxed text-cream-100/85">
            With your generous contributions, we can continue expanding our
            services, maintaining our facilities, and offering valuable
            programs to our community.
          </p>
          <Link href="/donate" className="btn-primary mt-8">
            Donate Now
          </Link>
        </div>
      </section>
    </>
  );
}
