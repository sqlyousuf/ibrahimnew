import Image from "next/image";
import type { programs } from "@/lib/site";

type Program = (typeof programs)[number];

export default function ProgramCard({ program }: { program: Program }) {
  return (
    <div className="group overflow-hidden rounded-2xl bg-white shadow-soft transition hover:-translate-y-1">
      <div className="relative h-56 w-full overflow-hidden">
        <Image
          src={program.image}
          alt={program.name}
          fill
          className="object-cover transition duration-500 group-hover:scale-105"
          sizes="(min-width: 1024px) 33vw, 100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950/70 via-navy-950/0" />
      </div>
      <div className="p-6">
        <h3 className="font-display text-xl font-semibold text-navy-900">
          {program.name}
        </h3>
        <p className="mt-1 text-sm font-medium uppercase tracking-wide text-gold-600">
          {program.subtitle}
        </p>

        <dl className="mt-4 space-y-2 text-sm text-navy-700">
          <div className="flex gap-2">
            <dt className="font-semibold">Ages:</dt>
            <dd>{program.audience}</dd>
          </div>
          <div className="flex gap-2">
            <dt className="font-semibold">Schedule:</dt>
            <dd>{program.schedule}</dd>
          </div>
          <div className="flex gap-2">
            <dt className="font-semibold">Location:</dt>
            <dd>{program.location}</dd>
          </div>
        </dl>

        {program.description && (
          <p className="mt-4 text-sm leading-relaxed text-navy-700/90">
            {program.description}
          </p>
        )}

        {program.supervisors && (
          <p className="mt-4 text-sm text-navy-700">
            <span className="font-semibold">Instructors: </span>
            {program.supervisors.join(", ")}
          </p>
        )}
      </div>
    </div>
  );
}
