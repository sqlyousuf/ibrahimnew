"use client";

import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import Image from "next/image";
import Link from "next/link";
import SectionHeading from "@/components/SectionHeading";
import { PatternField } from "@/components/Ornament";
import { getFlierShowcase, type ShowcaseFlier } from "@/lib/calendar";
import { useCalendarEvents } from "@/lib/liveData";
import { motionAllowed } from "@/lib/motionGate";

const AUTO_ADVANCE_MS = 5000;

function subscribeNever() {
  return () => {};
}
function serverFalse() {
  return false;
}

/**
 * Homepage "Programs & Events" rail: every flier we have, as a row of
 * poster cards with the essentials written underneath (so nothing depends
 * on reading text baked into an image). Tap a card for the full flier.
 *
 * The Institute programs are static, so they prerender and paint
 * immediately; admin-added events (one-off and weekly) join once
 * /api/events loads.
 *
 * Cards crop to a uniform 2:3 from the top so the row stays tidy — the
 * lightbox always shows the uncropped flier.
 */
export default function FlierShowcase() {
  const events = useCalendarEvents();
  const fliers = getFlierShowcase(events ?? []);

  const motion = useSyncExternalStore(subscribeNever, motionAllowed, serverFalse);
  const railRef = useRef<HTMLDivElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);
  const [paused, setPaused] = useState(false);
  // Any manual scroll/arrow/tap stops the auto-advance for good.
  const [userTookOver, setUserTookOver] = useState(false);
  const [open, setOpen] = useState<ShowcaseFlier | null>(null);

  const updateArrows = useCallback(() => {
    const rail = railRef.current;
    if (!rail) return;
    setCanPrev(rail.scrollLeft > 4);
    setCanNext(rail.scrollLeft + rail.clientWidth < rail.scrollWidth - 4);
  }, []);

  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;
    updateArrows();
    rail.addEventListener("scroll", updateArrows, { passive: true });
    window.addEventListener("resize", updateArrows);
    return () => {
      rail.removeEventListener("scroll", updateArrows);
      window.removeEventListener("resize", updateArrows);
    };
  }, [updateArrows, fliers.length]);

  const step = useCallback((dir: 1 | -1) => {
    const rail = railRef.current;
    if (!rail) return;
    const card = rail.querySelector<HTMLElement>("[data-card]");
    const gap = parseFloat(getComputedStyle(rail).columnGap) || 0;
    const width = card ? card.offsetWidth + gap : rail.clientWidth * 0.8;
    rail.scrollBy({ left: dir * width, behavior: "smooth" });
  }, []);

  useEffect(() => {
    if (!motion || paused || userTookOver || open || fliers.length < 2) return;
    const id = window.setInterval(() => {
      const rail = railRef.current;
      if (!rail) return;
      const atEnd = rail.scrollLeft + rail.clientWidth >= rail.scrollWidth - 4;
      if (atEnd) rail.scrollTo({ left: 0, behavior: "smooth" });
      else step(1);
    }, AUTO_ADVANCE_MS);
    return () => window.clearInterval(id);
  }, [motion, paused, userTookOver, open, fliers.length, step]);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  if (fliers.length === 0) return null;

  const arrowClass =
    "flex h-11 w-11 items-center justify-center rounded-full border border-gold-600/35 text-navy-900 transition hover:border-gold-500 hover:bg-cream-50 hover:text-gold-700 disabled:pointer-events-none disabled:opacity-30";

  return (
    <section className="relative overflow-hidden bg-cream-200 py-14 sm:py-20 lg:py-24">
      <PatternField opacity={0.05} />
      <span aria-hidden="true" className="rule-gold absolute inset-x-0 top-0" />

      <div className="container-page relative">
        <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            arabic="فعاليات"
            eyebrow="Programs & Events"
            title={
              <>
                What&apos;s happening at{" "}
                <span className="text-foil-deep italic">Masjid Ibrahim</span>
              </>
            }
            description="Classes, halaqas, and gatherings for every age. Tap a flier to see it in full."
            className="max-w-2xl text-center sm:text-left [&_.section-eyebrow]:justify-center sm:[&_.section-eyebrow]:justify-start"
          />
          <div className="hidden shrink-0 gap-3 sm:flex">
            <button
              type="button"
              aria-label="Previous fliers"
              disabled={!canPrev}
              onClick={() => {
                setUserTookOver(true);
                step(-1);
              }}
              className={arrowClass}
            >
              <svg viewBox="0 0 20 20" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
                <path d="M12.5 4.5 7 10l5.5 5.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button
              type="button"
              aria-label="Next fliers"
              disabled={!canNext}
              onClick={() => {
                setUserTookOver(true);
                step(1);
              }}
              className={arrowClass}
            >
              <svg viewBox="0 0 20 20" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
                <path d="M7.5 4.5 13 10l-5.5 5.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>

        <div
          ref={railRef}
          role="region"
          aria-label="Program and event fliers"
          className="-mx-5 mt-8 flex snap-x snap-mandatory scroll-px-5 gap-4 overflow-x-auto px-5 pb-4 pt-1 [scrollbar-width:none] sm:mx-0 sm:mt-10 sm:scroll-px-0 sm:gap-6 sm:px-0 [&::-webkit-scrollbar]:hidden"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={() => setPaused(false)}
          onPointerDown={() => setUserTookOver(true)}
          onWheel={(e) => {
            if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) setUserTookOver(true);
          }}
        >
          {fliers.map((item, i) => (
            <figure
              key={item.key}
              data-card
              className="m-0 flex w-[72vw] max-w-[18rem] shrink-0 snap-start flex-col sm:w-[16.5rem] lg:w-[17.5rem]"
            >
              <button
                type="button"
                onClick={() => setOpen(item)}
                aria-label={`View full flier: ${item.title}`}
                data-cursor="view"
                className="group relative block aspect-[2/3] w-full overflow-hidden rounded-2xl bg-navy-975 shadow-soft ring-1 ring-gold-700/15 transition duration-300 hover:-translate-y-1 hover:shadow-panel hover:ring-gold-500/60"
              >
                <Image
                  src={item.flier.src}
                  alt={item.flier.alt}
                  fill
                  priority={i < 2}
                  sizes="(min-width: 1024px) 17.5rem, (min-width: 640px) 16.5rem, 72vw"
                  className="object-cover object-top transition-transform duration-700 ease-entrance group-hover:scale-[1.03]"
                />
              </button>
              <figcaption className="px-1 pt-4">
                <span className="inline-block rounded-full bg-navy-975 px-2.5 py-1 text-[0.625rem] font-semibold uppercase tracking-[0.14em] text-gold-300">
                  {item.tag}
                </span>
                <h3 className="mt-2.5 font-display text-[1.375rem] font-semibold leading-tight text-navy-900">
                  {item.title}
                </h3>
                {item.schedule && (
                  <p className="mt-1.5 text-[0.8125rem] font-medium leading-snug text-gold-700">
                    {item.schedule}
                  </p>
                )}
                {item.detail && (
                  <p className="mt-1 line-clamp-2 text-[0.8125rem] leading-snug text-navy-600">
                    {item.detail}
                  </p>
                )}
              </figcaption>
            </figure>
          ))}
        </div>

        <div className="mt-6 text-center sm:mt-8">
          <Link href="/events" className="btn-outline-navy w-full sm:w-auto">
            See This Week&apos;s Calendar
          </Link>
        </div>
      </div>

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={open.flier.alt}
          className="fixed inset-0 z-[250] flex animate-fade-up items-center justify-center bg-navy-975/95 p-4 duration-300 sm:p-10"
          onClick={() => setOpen(null)}
        >
          <Image
            src={open.flier.src}
            alt={open.flier.alt}
            width={1200}
            height={1800}
            sizes="90vw"
            className="max-h-[88vh] w-auto max-w-full rounded-lg object-contain shadow-panel"
            onClick={(e) => e.stopPropagation()}
          />
          <button
            type="button"
            onClick={() => setOpen(null)}
            aria-label="Close"
            autoFocus
            className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-xl leading-none text-white transition hover:bg-white/20"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
      )}
    </section>
  );
}
