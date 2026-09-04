"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import { StarGlyph } from "@/components/Ornament";
import type { CalendarDay, CalendarDisplayEntry } from "@/lib/calendar";

/**
 * 7-day week calendar. Same markup renders as a stacked list on phones and
 * a 7-column grid from `lg` up — no separate mobile layout to keep in sync.
 *
 * Most entries have no flier (recurring programs never do, and plenty of
 * one-off events won't either), so the flier is treated as an optional
 * accent — a small thumbnail that opens a lightbox — never the thing an
 * entry's layout depends on.
 */
export default function WeekCalendar({ days }: { days: CalendarDay[] }) {
  const [openFlier, setOpenFlier] = useState<{ src: string; alt: string } | null>(null);

  useEffect(() => {
    if (!openFlier) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenFlier(null);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [openFlier]);

  return (
    <>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-7 lg:gap-3">
        {days.map((day, i) => (
          <Reveal key={day.dateKey} delay={i * 60} className="h-full">
            <div
              className={`flex h-full flex-col rounded-2xl p-3 ring-1 sm:p-4 ${
                day.isToday
                  ? "bg-navy-975 text-cream-100 ring-gold-500/40"
                  : "bg-white ring-navy-900/5"
              }`}
            >
              <div className="flex items-baseline justify-between gap-2 border-b border-current/10 pb-2.5">
                <p
                  className={`text-xs font-semibold uppercase tracking-[0.14em] ${
                    day.isToday ? "text-gold-300" : "text-navy-500"
                  }`}
                >
                  {day.weekdayLabel}
                </p>
                <p
                  className={`font-display text-lg font-semibold leading-none ${
                    day.isToday ? "text-white" : "text-navy-900"
                  }`}
                >
                  {day.monthLabel} {day.dayNumber}
                </p>
              </div>

              <div className="mt-3 flex flex-1 flex-col gap-2.5">
                {day.entries.length === 0 ? (
                  <p
                    className={`py-2 text-xs italic ${
                      day.isToday ? "text-cream-100/50" : "text-navy-400"
                    }`}
                  >
                    Nothing scheduled
                  </p>
                ) : (
                  day.entries.map((entry) => (
                    <EntryChip
                      key={entry.key}
                      entry={entry}
                      dark={day.isToday}
                      onOpenFlier={setOpenFlier}
                    />
                  ))
                )}
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      {openFlier && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={openFlier.alt}
          className="fixed inset-0 z-[250] flex animate-fade-up items-center justify-center bg-navy-975/95 p-4 duration-300 sm:p-10"
          onClick={() => setOpenFlier(null)}
        >
          <Image
            src={openFlier.src}
            alt={openFlier.alt}
            width={1200}
            height={1500}
            sizes="90vw"
            className="max-h-[85vh] w-auto max-w-full rounded-lg object-contain shadow-panel"
            onClick={(e) => e.stopPropagation()}
          />
          <button
            type="button"
            onClick={() => setOpenFlier(null)}
            aria-label="Close"
            className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-xl leading-none text-white transition hover:bg-white/20"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
      )}
    </>
  );
}

function EntryChip({
  entry,
  dark,
  onOpenFlier,
}: {
  entry: CalendarDisplayEntry;
  dark: boolean;
  onOpenFlier: (flier: { src: string; alt: string }) => void;
}) {
  const body = (
    <>
      <div className="flex items-start justify-between gap-2">
        <p
          className={`text-[0.8125rem] font-semibold leading-snug ${
            dark ? "text-white" : "text-navy-900"
          }`}
        >
          {entry.title}
        </p>
        {entry.flier && (
          <button
            type="button"
            onClick={() => onOpenFlier(entry.flier!)}
            aria-label={`View flier: ${entry.title}`}
            data-cursor="view"
            className="relative h-8 w-8 shrink-0 overflow-hidden rounded-md ring-1 ring-gold-500/40"
          >
            <Image
              src={entry.flier.src}
              alt=""
              fill
              className="cinematic-photo object-cover"
              sizes="32px"
            />
          </button>
        )}
      </div>
      {entry.time && (
        <p className={`mt-0.5 text-[0.6875rem] ${dark ? "text-gold-300" : "text-gold-700"}`}>
          {entry.time}
        </p>
      )}
      <p
        className={`mt-1 text-[0.6875rem] leading-relaxed ${
          dark ? "text-cream-100/70" : "text-navy-600"
        }`}
      >
        {entry.description}
      </p>
    </>
  );

  const className = `rounded-lg p-2.5 ring-1 transition ${
    dark
      ? "bg-white/5 ring-white/10 hover:bg-white/10"
      : "bg-cream-100 ring-navy-900/5 hover:ring-gold-500/30"
  }`;

  if (entry.kind === "program" && entry.href) {
    return (
      <Link href={entry.href} className={`group block ${className}`}>
        <span className="mb-1 inline-flex items-center gap-1 text-[0.5625rem] font-semibold uppercase tracking-[0.14em] text-gold-600">
          <StarGlyph className="h-2.5 w-2.5 shrink-0" />
          Program
        </span>
        {body}
      </Link>
    );
  }

  return <div className={className}>{body}</div>;
}
