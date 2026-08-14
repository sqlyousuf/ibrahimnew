import Image from "next/image";
import type { programs } from "@/lib/site";

type Program = (typeof programs)[number];

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-[0.625rem] font-semibold uppercase tracking-[0.16em] text-gold-700">
        {label}
      </dt>
      <dd className="mt-0.5 text-sm leading-relaxed text-navy-700">{value}</dd>
    </div>
  );
}

export default function ProgramCard({ program }: { program: Program }) {
  return (
    <article className="card card-interactive group flex h-full flex-col overflow-hidden">
      <div className="relative aspect-[16/10] w-full overflow-hidden">
        <Image
          src={program.image}
          alt={`${program.name} at Masjid Ibrahim`}
          fill
          className="object-cover transition-transform duration-700 ease-entrance group-hover:scale-[1.04]"
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-navy-950/65 via-navy-950/10 to-transparent"
        />
        <p className="absolute inset-x-5 bottom-4 font-display text-xl font-semibold leading-tight text-white">
          {program.name}
        </p>
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-gold-700">
          {program.subtitle}
        </p>

        {/* Label-above-value stacking keeps long addresses readable at 375px,
            where an inline label/value split leaves ~190px for the value. */}
        <dl className="mt-4 space-y-3 border-t border-navy-900/[0.07] pt-4">
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
