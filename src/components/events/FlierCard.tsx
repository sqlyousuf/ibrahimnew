"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Reveal from "@/components/Reveal";
import type { WeeklyEvent } from "@/lib/site";

/**
 * Flier fills the card's frame with `object-contain` on a neutral ground,
 * never `object-cover` — a flier's text runs close to its edges, and
 * cropping it the way a photo gets cropped would cut off real information.
 *
 * The click-to-enlarge modal is rendered as a sibling of the Reveal-wrapped
 * card, not a child: Reveal's GSAP tween leaves an inline `transform` on its
 * wrapped element even at rest, and a `transform` on any ancestor turns it
 * into the containing block for `position: fixed` descendants — nested
 * inside Reveal, the "full-screen" modal would size to the card instead of
 * the viewport.
 */
export default function FlierCard({
  event,
  delay,
}: {
  event: WeeklyEvent;
  delay?: number;
}) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <Reveal delay={delay} className="h-full">
        <article className="card card-interactive flex h-full flex-col overflow-hidden">
          {event.flier && (
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label={`View larger flier for ${event.title}`}
              data-cursor="view"
              className="group relative aspect-[4/5] w-full shrink-0 overflow-hidden bg-cream-200"
            >
              <Image
                src={event.flier.src}
                alt={event.flier.alt}
                fill
                className="object-contain p-3 transition-transform duration-500 ease-entrance group-hover:scale-[1.03]"
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              />
            </button>
          )}

          {/* justify-center: a card without a flier stretches to match its
              row's tallest (flier) card, so its shorter text block should
              settle in the middle of that extra height, not pin to the top
              and leave dead space below. */}
          <div className="flex flex-1 flex-col justify-center p-5 sm:p-6">
            <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-gold-700">
              {event.date}
              {event.time ? ` · ${event.time}` : ""}
            </p>
            <h2 className="mt-2 font-display text-lg font-semibold text-navy-900 sm:text-xl">
              {event.title}
            </h2>
            {event.location && (
              <p className="mt-1 text-xs font-medium uppercase tracking-wide text-navy-500">
                {event.location}
              </p>
            )}
            <p className="mt-3 text-sm leading-relaxed text-navy-700">
              {event.description}
            </p>
          </div>
        </article>
      </Reveal>

      {open && event.flier && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={event.flier.alt}
          className="fixed inset-0 z-[250] flex animate-fade-up items-center justify-center bg-navy-975/95 p-4 duration-300 sm:p-10"
          onClick={() => setOpen(false)}
        >
          <Image
            src={event.flier.src}
            alt={event.flier.alt}
            width={1200}
            height={1500}
            sizes="90vw"
            className="max-h-[85vh] w-auto max-w-full rounded-lg object-contain shadow-panel"
            onClick={(e) => e.stopPropagation()}
          />
          <button
            type="button"
            onClick={() => setOpen(false)}
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
