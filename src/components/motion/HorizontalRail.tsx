"use client";

import { useEffect, useRef } from "react";
import type { ReactNode } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { motionAllowed } from "@/lib/motionGate";

/**
 * Pins the section and translates its inner row horizontally as the visitor
 * scrolls vertically — the site's signature "pinned rail" moment, used for
 * the Institute program showcase. Falls back to a plain horizontal-scroll
 * flex row (via the caller's own overflow-x styling) when motion is off, so
 * every card stays reachable either way.
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
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    if (!motionAllowed()) {
      // No pin/scrub — let the row scroll natively so every card stays
      // reachable without GSAP.
      track.classList.add("overflow-x-auto", "snap-x", "snap-mandatory");
      return;
    }

    const ctx = gsap.context(() => {
      const distance = () => track.scrollWidth - section.clientWidth;

      const trigger = ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: () => `+=${Math.max(distance(), 1)}`,
        pin: true,
        pinSpacing: true,
        scrub: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          gsap.set(track, { x: -distance() * self.progress });
        },
      });

      return () => trigger.kill();
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={sectionRef} className={className}>
      <div
        ref={trackRef}
        className={trackClassName ?? "flex gap-6 sm:gap-8"}
      >
        {children}
      </div>
    </div>
  );
}
