import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import { StarGlyph } from "@/components/Ornament";
import { programs, services, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Institute",
  description:
    "Masjid Ibrahim Institute offers Quran Maktab, WISE Sunday School, and YM Ibrahim youth programs for all ages in Spring, Texas.",
};

function Detail({ label, value }: { label: string; value: string }) {
  return (
    // Stacks on phones (a fixed 96px label column left only ~190px for the
    // value at 375px) and becomes a two-column row from sm up.
    <div className="sm:flex sm:gap-4">
      <dt className="text-[0.625rem] font-semibold uppercase tracking-[0.16em] text-gold-700 sm:w-24 sm:shrink-0 sm:pt-0.5">
        {label}
      </dt>
      <dd className="mt-0.5 text-sm leading-relaxed text-navy-700 sm:mt-0 sm:flex-1">
        {value}
      </dd>
    </div>
  );
}

export default function InstitutePage() {
  return (
    <>
      <PageHero
        eyebrow="Masjid Ibrahim Institute"
        title="Nurturing Faith Through Education"
        description="Quran memorization, weekend school, and youth mentorship for every stage of the journey."
        image="https://images.unsplash.com/photo-1703492897922-befb3b3d148c?auto=format&fit=crop&w=2000&q=80"
        imageAlt="An open Qur'an resting on a wooden stand"
        imagePosition="object-center"
      />

      <section className="container-page max-w-3xl pb-10 pt-14 text-center sm:pb-12 sm:pt-20 lg:pt-24">
        <Reveal>
          <p className="section-eyebrow justify-center">Our Programs</p>
          <h2 className="mt-3 font-display text-display-md font-semibold text-navy-900">
            Three Paths of Learning
          </h2>
          <p className="mx-auto mt-4 max-w-xl leading-relaxed text-navy-700">
            Whether your child is beginning to read the Qur&apos;an or your
            teenager is looking for brotherhood and purpose, the Masjid Ibrahim
            Institute has a program built for them.
          </p>
        </Reveal>
      </section>

      <section className="container-page max-w-6xl space-y-8 pb-16 sm:space-y-12 sm:pb-20 lg:space-y-16 lg:pb-28">
        {programs.map((program, i) => (
          <Reveal key={program.slug}>
            <article className="panel grid items-center overflow-hidden lg:grid-cols-2">
              <div
                className={`relative aspect-[16/10] w-full sm:aspect-[2/1] lg:aspect-auto lg:h-full lg:min-h-[24rem] ${
                  i % 2 === 1 ? "lg:order-2" : ""
                }`}
              >
                <Image
                  src={program.image}
                  alt={`${program.name} at Masjid Ibrahim`}
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 50vw, 100vw"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-navy-950/25 to-transparent lg:hidden"
                />
              </div>

              <div className="p-6 sm:p-8 lg:p-12">
                <p className="section-eyebrow">{program.subtitle}</p>
                <h3 className="mt-3 flex items-start gap-3 font-display text-display-sm font-semibold text-navy-900">
                  <StarGlyph className="mt-1 h-5 w-5 shrink-0 text-gold-500" />
                  <span>{program.name}</span>
                </h3>

                {program.description && (
                  <p className="mt-4 leading-relaxed text-navy-700">
                    {program.description}
                  </p>
                )}

                <dl className="mt-6 space-y-3 border-t border-navy-900/[0.07] pt-5 sm:space-y-4">
                  <Detail label="Ages" value={program.audience} />
                  <Detail label="Schedule" value={program.schedule} />
                  <Detail label="Location" value={program.location} />
                  {program.supervisors && (
                    <Detail
                      label="Teachers"
                      value={program.supervisors.join(", ")}
                    />
                  )}
                  {program.price && (
                    <Detail label="Tuition" value={program.price} />
                  )}
                </dl>

                {/* Stacked with a real gap on phones so the two adjacent
                    targets can't be mis-tapped. */}
                <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-4">
                  <a
                    href={program.enrollUrl ?? site.contact.phoneHref}
                    target={program.enrollUrl ? "_blank" : undefined}
                    rel={program.enrollUrl ? "noopener noreferrer" : undefined}
                    className="btn-primary"
                  >
                    {program.cta ?? "Contact Us"}
                  </a>
                  <Link href="/contact" className="btn-outline-navy">
                    Ask a Question
                  </Link>
                </div>
              </div>
            </article>
          </Reveal>
        ))}
      </section>

      <section className="section-tight relative overflow-hidden bg-cream-200">
        <div className="container-page relative max-w-4xl">
          <Reveal className="mx-auto max-w-2xl text-center">
            <p className="section-eyebrow justify-center">Additional Services</p>
            <h2 className="mt-3 font-display text-display-sm font-semibold text-navy-900">
              Beyond the Classroom
            </h2>
          </Reveal>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 sm:gap-6">
            {services.map((service, i) => (
              <Reveal key={service.slug} delay={i * 80} className="h-full">
                <div className="card h-full p-6 sm:p-7">
                  <StarGlyph className="h-5 w-5 text-gold-500" />
                  <h3 className="mt-3 font-display text-lg font-semibold text-navy-900">
                    {service.name}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-navy-700">
                    {service.description}
                  </p>
                  <a
                    href={site.contact.phoneHref}
                    className="link-underline mt-4 inline-block text-sm font-semibold text-gold-700"
                  >
                    Call {site.contact.phone}
                  </a>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
