"use client";

import { useEffect, useRef } from "react";
import type { ElementType, ReactNode } from "react";
import { gsap } from "@/lib/gsap";
import { motionAllowed } from "@/lib/motionGate";

/**
 * Scroll-triggered reveal, driven by GSAP/ScrollTrigger.
 *
 * Only animates when `motionAllowed()` is true (see motionGate.ts) — the
 * same reveal-ready gate the rest of the motion system uses. Without it,
 * this component is a no-op wrapper and children render in their normal,
 * final state: content can never be hidden by failed JS or a reduced-motion
 * preference.
 */
export default function Reveal({
  as: Tag = "div",
  children,
  className,
  delay = 0,
}: {
  as?: ElementType;
  children: ReactNode;
  className?: string;
  /** Stagger in ms. Keep small — this should feel like settling, not queuing. */
  delay?: number;
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node || !motionAllowed()) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        node,
        { autoAlpha: 0, y: 20 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.9,
          delay: delay / 1000,
          ease: "power3.out",
          scrollTrigger: {
            trigger: node,
            start: "top 90%",
            toggleActions: "play none none none",
          },
        },
      );
    }, node);

    // gsap.context tracks every tween/ScrollTrigger created inside it, so
    // revert() tears both down together.
    return () => ctx.revert();
  }, [delay]);

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}
