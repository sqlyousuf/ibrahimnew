"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";
import { gsap } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/motionGate";
import { LogoMark, Rosette } from "@/components/Ornament";

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

    // Scroll is locked for this whole timeline (see below), so its length is
    // a direct tax on how long a visitor's first scroll attempt goes
    // nowhere — kept snappy rather than lingering for its own sake.
    tl.fromTo(
      starRef.current,
      { autoAlpha: 0, scale: 0.92, y: 8 },
      { autoAlpha: 1, scale: 1, y: 0, duration: 0.9, ease: "power3.out" },
    )
      .to(rootRef.current, {
        autoAlpha: 0,
        duration: 0.5,
        ease: "power2.inOut",
        delay: 0.1,
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
      <Rosette className="absolute h-72 w-72 animate-star-spin text-gold-300/15" />
      <div ref={starRef} className="relative">
        <LogoMark className="h-28 w-auto sm:h-32" />
      </div>
    </div>
  );
}
