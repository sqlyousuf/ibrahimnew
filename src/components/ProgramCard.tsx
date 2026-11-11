import Image from "next/image";
import Link from "next/link";
import type { programs } from "@/lib/site";

type Program = (typeof programs)[number];

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-[0.5625rem] font-semibold uppercase tracking-[0.24em] text-gold-600">
        {label}
      </dt>
      <dd className="mt-1 text-sm leading-relaxed text-navy-800">{value}</dd>
    </div>
  );
}

export default function ProgramCard({ program }: { program: Program }) {
  return (
    <article className="card card-interactive group flex h-full flex-col overflow-hidden">
      <div className="relative aspect-[4/3] w-full overflow-hidden">
        <Image
          src={program.image}
          alt={`${program.name} at Masjid Ibrahim`}
          fill
          className="object-cover transition-transform duration-700 ease-entrance group-hover:scale-[1.04]"
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-navy-975/90 via-navy-975/25 to-transparent"
        />
        <div className="absolute inset-x-5 bottom-4 sm:inset-x-6">
          <p className="text-[0.5625rem] font-semibold uppercase tracking-[0.26em] text-gold-200">
            {program.subtitle}
          </p>
          <p className="mt-1.5 font-display text-[1.875rem] font-semibold leading-none text-cream-50">
            {program.name}
          </p>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        {/* Label-above-value stacking keeps long addresses readable at 375px,
            where an inline label/value split leaves ~190px for the value. */}
        <dl className="space-y-3.5">
          <DetailRow label="Ages" value={program.audience} />
          <DetailRow label="Schedule" value={program.schedule} />
          <DetailRow label="Location" value={program.location} />
          {program.supervisors && (
            <DetailRow
              label="Instructors"
              value={program.supervisors.join(", ")}
            />
          )}
        </dl>

        {program.description && (
          <p className="mt-4 text-sm leading-relaxed text-navy-700/90">
            {program.description}
          </p>
        )}

        {/* Pinned to the card floor so cards of different lengths in the
            rail still end on the same line, with a real tap target. */}
        <div className="mt-auto pt-5">
          <Link
            href={`/institute#${program.slug}`}
            className="flex min-h-[2.75rem] items-center justify-between gap-3 border-t border-navy-900/[0.07] pt-4 text-[0.75rem] font-bold uppercase tracking-[0.16em] text-gold-700 transition-colors hover:text-gold-600"
          >
            Program details
            <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 transition-transform duration-500 ease-entrance group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
            <span className="sr-only"> for {program.name}</span>
          </Link>
        </div>
      </div>
    </article>
  );
}
