"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";
import { gsap } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/motionGate";
import { StarGlyph } from "@/components/Ornament";

const SESSION_KEY = "mi-intro-played";

// A one-shot, read-only decision (never changes after mount), so it's read
// via useSyncExternalStore rather than a `useState` + `useEffect` "mounted"
// flag — that pattern causes an extra render pass the React Compiler-era
// lint rules now flag. getSnapshot must stay pure; marking the session as
// played happens separately, as a plain effect side effect below.
function subscribe() {
  return () => {};
}
function getSnapshot() {
  if (prefersReducedMotion()) return false;
  return window.sessionStorage.getItem(SESSION_KEY) === null;
}
function getServerSnapshot() {
  return false;
}

/**
 * One-time intro: the khatim star traces itself in, then the whole overlay
 * dissolves. Skipped entirely under reduced motion. Once the GSAP timeline
 * finishes, it sets the overlay's `autoAlpha` to 0 — GSAP's opacity+
 * visibility combo — so the (still-mounted) overlay becomes invisible *and*
 * non-interactive without needing a second render to unmount it.
 */
export default function Preloader() {
  const shouldPlay = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );
  const rootRef = useRef<HTMLDivElement>(null);
  const starRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!shouldPlay || !rootRef.current || !starRef.current) return;

    window.sessionStorage.setItem(SESSION_KEY, "true");
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const tl = gsap.timeline({
      onComplete: () => {
        document.body.style.overflow = previousOverflow;
      },
    });

    tl.fromTo(
      starRef.current,
      { autoAlpha: 0, scale: 0.8, rotate: -25 },
      { autoAlpha: 1, scale: 1, rotate: 0, duration: 1, ease: "power3.out" },
    )
      .to(starRef.current, { rotate: 180, duration: 1.4, ease: "power2.inOut" }, "<")
      .to(rootRef.current, {
        autoAlpha: 0,
        duration: 0.7,
        ease: "power2.inOut",
        delay: 0.15,
      });

    return () => {
      tl.kill();
      document.body.style.overflow = previousOverflow;
    };
  }, [shouldPlay]);

  if (!shouldPlay) return null;

  return (
    <div
      ref={rootRef}
      aria-hidden="true"
      className="fixed inset-0 z-[300] flex items-center justify-center bg-navy-975"
    >
      <div ref={starRef} className="h-14 w-14 text-gold-glow sm:h-16 sm:w-16">
        <StarGlyph className="h-full w-full" />
      </div>
    </div>
  );
}
