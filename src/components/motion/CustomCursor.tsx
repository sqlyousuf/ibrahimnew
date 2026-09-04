"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/motionGate";

/** Elements that swell the cursor ring to signal "interactive". */
const HOVER_SELECTOR = "a, button, [data-cursor]";

/**
 * Bespoke dot + ring cursor. Only mounts on fine-pointer devices — a touch
 * screen has no persistent pointer, so a custom cursor there would just be
 * dead code running for nothing. Reduced motion disables it outright.
 */
export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;

    document.documentElement.dataset.cursorReady = "true";

    const target = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const dot = { ...target };
    const ring = { ...target };
    let hasMoved = false;

    const onMove = (e: PointerEvent) => {
      target.x = e.clientX;
      target.y = e.clientY;
      if (!hasMoved) {
        hasMoved = true;
        dot.x = ring.x = target.x;
        dot.y = ring.y = target.y;
        document.documentElement.dataset.cursorVisible = "true";
      }
    };
    window.addEventListener("pointermove", onMove);

    const setHover = (value: boolean) => (e: Event) => {
      if ((e.target as HTMLElement)?.closest?.(HOVER_SELECTOR)) {
        document.documentElement.dataset.cursorHover = String(value);
      }
    };
    const onOver = setHover(true);
    const onOut = setHover(false);
    document.addEventListener("pointerover", onOver);
    document.addEventListener("pointerout", onOut);

    const tick = () => {
      dot.x += (target.x - dot.x) * 0.35;
      dot.y += (target.y - dot.y) * 0.35;
      ring.x += (target.x - ring.x) * 0.15;
      ring.y += (target.y - ring.y) * 0.15;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${dot.x}px, ${dot.y}px, 0)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ring.x}px, ${ring.y}px, 0)`;
      }
    };
    gsap.ticker.add(tick);

    return () => {
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerover", onOver);
      document.removeEventListener("pointerout", onOut);
      gsap.ticker.remove(tick);
      delete document.documentElement.dataset.cursorReady;
      delete document.documentElement.dataset.cursorVisible;
      delete document.documentElement.dataset.cursorHover;
    };
  }, []);

  return (
    <div className="cinematic-cursor" aria-hidden="true">
      <div ref={ringRef} className="cinematic-cursor__ring" />
      <div ref={dotRef} className="cinematic-cursor__dot" />
    </div>
  );
}
