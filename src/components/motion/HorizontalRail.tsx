"use client";

import type { ReactNode } from "react";
import Reveal from "@/components/Reveal";

/**
 * A horizontally-scrollable row (native `overflow-x`, with scroll-snap for
 * a tidy stopping point per card) — used for the Institute program
 * showcase. Every card is always reachable by a plain swipe/scroll,
 * regardless of motion preference.
 *
 * This used to scroll horizontally in lockstep with vertical scroll,
 * pinned via `position: sticky` while the user scrolled through it. That
 * broke under this page's `<ViewTransition>` wrapper — sticky silently
 * stopped engaging (see the fuller writeup in HomeHero.tsx, which hit the
 * same issue) — and GSAP's `pin: true` has its own DOM-mutation conflict
 * with React's unmount there too. Rather than chase a third pinning
 * strategy, this just scrolls natively; Reveal still gives it a fade-in
 * entrance so it doesn't feel static.
 */
export default function HorizontalRail({
  children,
  className,
  trackClassName,
}: {
  children: ReactNode;
  className?: string;
  trackClassName?: string;
}) {
  return (
    <Reveal className={className}>
      <div
        className={`overflow-x-auto snap-x snap-mandatory ${trackClassName ?? "flex gap-6 sm:gap-8"}`}
      >
        {children}
      </div>
    </Reveal>
  );
}
