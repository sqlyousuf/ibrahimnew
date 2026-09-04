"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { motionAllowed } from "@/lib/motionGate";
import { StarGlyph } from "@/components/Ornament";

/**
 * The khatim star as a scroll-progress glyph — one full rotation per page,
 * a quiet reminder of the motif everywhere on the site. Desktop only: on
 * mobile/tablet this corner is already claimed by PrayerQuickBar.
 */
export default function ScrollProgressStar() {
  const starRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!motionAllowed() || !starRef.current) return;
    const el = starRef.current;

    const trigger = ScrollTrigger.create({
      start: 0,
      end: "max",
      onUpdate: (self) => {
        gsap.set(el, { rotate: self.progress * 360 });
      },
    });

    return () => trigger.kill();
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed bottom-7 right-7 z-40 hidden h-8 w-8 text-gold-300/70 lg:block"
    >
      <div ref={starRef} className="h-full w-full">
        <StarGlyph className="h-full w-full" />
      </div>
    </div>
  );
}
