/**
 * Single source of truth for "is cinematic motion allowed right now".
 *
 * Mirrors the inline script in layout.tsx that adds `reveal-ready` to <html>
 * only when IntersectionObserver/ScrollTrigger can run AND the visitor has
 * not asked for reduced motion. Every GSAP-driven component checks this
 * before touching the DOM, so content is never trapped behind failed JS or
 * a motion preference — it just renders in its final state.
 */
export function motionAllowed(): boolean {
  if (typeof document === "undefined") return false;
  return document.documentElement.classList.contains("reveal-ready");
}

export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return true;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
