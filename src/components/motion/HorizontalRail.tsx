"use client";

import { useEffect, useRef } from "react";
import type { ReactNode } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { motionAllowed } from "@/lib/motionGate";

/**
 * Sticky-based horizontal scroll — the site's signature "pinned rail"
 * moment, used for the Institute program showcase. Falls back to a plain
 * horizontal-scroll flex row (via the caller's own overflow-x styling) when
 * motion is off, so every card stays reachable either way.
 *
 * Uses CSS `position: sticky`, not GSAP's `pin: true` — see the comment in
 * HomeHero.tsx for why: ScrollTrigger's pin option inserts its own wrapper
 * `<div>` into the DOM at runtime, which can desync from React's expected
 * tree shape during a page-transition unmount and throw a `removeChild`
 * error. The runway wrapper's height is set (and kept in sync on resize) to
 * the sticky element's height plus the horizontal scroll distance, so
 * scrolling through that extra height drives the track's translateX 1:1.
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
  const runwayRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const runway = runwayRef.current;
    const sticky = stickyRef.current;
    const track = trackRef.current;
    if (!runway || !sticky || !track) return;

    if (!motionAllowed()) {
      // No scrub — let the row scroll natively so every card stays
      // reachable without GSAP.
      track.classList.add("overflow-x-auto", "snap-x", "snap-mandatory");
      return;
    }

    const ctx = gsap.context(() => {
      const updateRunwayHeight = () => {
        const dist = Math.max(track.scrollWidth - sticky.clientWidth, 0);
        runway.style.height = `${sticky.offsetHeight + dist}px`;
        return dist;
      };

      let distance = updateRunwayHeight();

      const trigger = ScrollTrigger.create({
        trigger: runway,
        start: "top top",
        end: "bottom bottom",
        scrub: 1,
        onRefreshInit: () => {
          distance = updateRunwayHeight();
        },
        onUpdate: (self) => {
          gsap.set(track, { x: -distance * self.progress });
        },
      });

      return () => trigger.kill();
    }, runway);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={runwayRef} className="relative">
      <div
        ref={stickyRef}
        className={`sticky top-20 overflow-hidden ${className ?? ""}`}
      >
        <div ref={trackRef} className={trackClassName ?? "flex gap-6 sm:gap-8"}>
          {children}
        </div>
      </div>
    </div>
  );
}
