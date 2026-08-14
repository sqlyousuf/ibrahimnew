import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import { programs, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Institute",
  description:
    "Masjid Ibrahim Institute offers Quran Maktab, WISE Sunday School, and YM Ibrahim youth programs for all ages in Spring, Texas.",
};

export default function InstitutePage() {
  return (
    <>
      <PageHero
        eyebrow="Masjid Ibrahim Institute"
        title="Nurturing Faith Through Education"
        description="Quran memorization, weekend school, and youth mentorship for every stage of the journey."
        image="https://images.unsplash.com/photo-1703492897922-befb3b3d148c?auto=format&fit=crop&w=2000&q=80"
        imageAlt="Open Quran"
      />

      <section className="mx-auto max-w-4xl px-5 py-20 text-center lg:px-8">
        <p className="section-eyebrow justify-center">Our Programs</p>
        <h2 className="mt-3 font-display text-3xl font-semibold text-navy-900 sm:text-4xl">
          Three Paths of Learning
        </h2>
        <p className="mt-5 leading-relaxed text-navy-700">
          Whether your child is beginning to read the Qur&apos;an or your
          teenager is looking for brotherhood and purpose, the Masjid Ibrahim
          Institute has a program built for them.
        </p>
      </section>

      <section className="mx-auto max-w-6xl space-y-16 px-5 pb-24 lg:px-8">
        {programs.map((program, i) => (
          <div
            key={program.slug}
            className="grid items-center gap-10 overflow-hidden rounded-3xl bg-white shadow-soft lg:grid-cols-2"
          >
            <div
              className={`relative h-72 w-full lg:h-full lg:min-h-[380px] ${
                i % 2 === 1 ? "lg:order-2" : ""
              }`}
            >
              <Image
                src={program.image}
                alt={program.name}
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 50vw, 100vw"
              />
            </div>
            <div className="p-8 lg:p-12">
              <p className="section-eyebrow">{program.subtitle}</p>
              <h3 className="mt-3 font-display text-3xl font-semibold text-navy-900">
                {program.name}
              </h3>

              {program.description && (
                <p className="mt-4 leading-relaxed text-navy-700">
                  {program.description}
                </p>
              )}

              <dl className="mt-6 space-y-3 text-sm text-navy-700">
                <div className="flex gap-2">
                  <dt className="w-24 shrink-0 font-semibold text-navy-900">
                    Ages
                  </dt>
                  <dd>{program.audience}</dd>
                </div>
                <div className="flex gap-2">
                  <dt className="w-24 shrink-0 font-semibold text-navy-900">
                    Schedule
                  </dt>
                  <dd>{program.schedule}</dd>
                </div>
                <div className="flex gap-2">
                  <dt className="w-24 shrink-0 font-semibold text-navy-900">
                    Location
                  </dt>
                  <dd>{program.location}</dd>
                </div>
                {program.supervisors && (
                  <div className="flex gap-2">
                    <dt className="w-24 shrink-0 font-semibold text-navy-900">
                      Teachers
                    </dt>
                    <dd>{program.supervisors.join(", ")}</dd>
                  </div>
                )}
              </dl>

              <div className="mt-8 flex flex-wrap gap-4">
                <a href={site.contact.phoneHref} className="btn-primary">
                  {program.cta ?? "Contact Us"}
                </a>
                <Link href="/contact" className="btn-outline-navy">
                  Ask a Question
                </Link>
              </div>
            </div>
          </div>
        ))}
      </section>
    </>
  );
}
