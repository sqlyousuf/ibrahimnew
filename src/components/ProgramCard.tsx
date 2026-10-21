import Image from "next/image";
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
      </div>
    </article>
  );
}
