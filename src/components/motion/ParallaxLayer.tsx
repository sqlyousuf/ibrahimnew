"use client";

import { useEffect, useRef } from "react";
import type { ReactNode } from "react";
import { gsap } from "@/lib/gsap";
import { motionAllowed } from "@/lib/motionGate";

/**
 * Moves its children vertically at a fraction of scroll speed, tied to the
 * viewport passing the wrapping element. Used for hero/section imagery depth
 * throughout the site — the wrapper must have `overflow-hidden` from the
 * caller so the offset layer never peeks past its frame.
 */
export default function ParallaxLayer({
  children,
  className,
  speed = 0.3,
}: {
  children: ReactNode;
  className?: string;
  /** Fraction of scroll distance the layer travels. Negative drifts up. */
  speed?: number;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const layerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const layer = layerRef.current;
    if (!wrap || !layer || !motionAllowed()) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        layer,
        { yPercent: -speed * 50 },
        {
          yPercent: speed * 50,
          ease: "none",
          scrollTrigger: {
            trigger: wrap,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        },
      );
    }, wrap);

    return () => ctx.revert();
  }, [speed]);

  // Scale up enough that the vertical travel (±speed * 50%) never exposes
  // the layer's edge inside the wrapper's overflow-hidden frame.
  const overscan = 1 + Math.abs(speed) * 0.7;

  return (
    <div ref={wrapRef} className={className}>
      <div
        ref={layerRef}
        className="relative h-full w-full"
        style={{ transform: `scale(${overscan})` }}
      >
        {children}
      </div>
    </div>
  );
}
