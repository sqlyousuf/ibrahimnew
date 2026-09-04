"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { motionAllowed } from "@/lib/motionGate";
import { StarGlyph } from "@/components/Ornament";

type Testimonial = { name: string; quote: string };

const INTERVAL_MS = 6000;

// Read-only, so this goes through useSyncExternalStore rather than a
// useState+useEffect "mounted" flag — see Preloader.tsx for why.
function subscribe() {
  return () => {};
}
function getServerSnapshot() {
  return false;
}

/**
 * Slow, auto-advancing crossfade — pausable on hover/focus so a reader isn't
 * fighting the timer. Falls back to the plain static grid (the site's
 * original testimonials layout) whenever motion is off.
 */
export default function TestimonialCarousel({
  testimonials,
}: {
  testimonials: Testimonial[];
}) {
  const enabled = useSyncExternalStore(subscribe, motionAllowed, getServerSnapshot);
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (!enabled || paused || testimonials.length < 2) return;
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % testimonials.length);
    }, INTERVAL_MS);
    return () => window.clearInterval(id);
  }, [enabled, paused, testimonials.length]);

  if (!enabled) {
    return (
      <div className="mt-10 grid gap-5 sm:grid-cols-3 sm:gap-6 lg:mt-14">
        {testimonials.map((testimonial) => (
          <figure
            key={testimonial.name}
            className="card flex h-full flex-col p-6 sm:p-7"
          >
            <StarGlyph className="h-5 w-5 shrink-0 text-gold-500" />
            <blockquote className="mt-3 flex-1 text-sm leading-relaxed text-navy-700">
              &ldquo;{testimonial.quote}&rdquo;
            </blockquote>
            <figcaption className="mt-4 text-sm font-semibold text-navy-900">
              {testimonial.name}
            </figcaption>
          </figure>
        ))}
      </div>
    );
  }

  return (
    <div
      className="relative mx-auto mt-10 max-w-2xl lg:mt-14"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div className="card relative min-h-[19rem] overflow-hidden p-8 sm:min-h-[15rem] sm:p-10">
        {testimonials.map((testimonial, i) => (
          <figure
            key={testimonial.name}
            aria-hidden={i !== index}
            className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center transition-opacity duration-700 ease-cinematic sm:p-10"
            style={{
              opacity: i === index ? 1 : 0,
              pointerEvents: i === index ? "auto" : "none",
            }}
          >
            <StarGlyph className="h-6 w-6 shrink-0 text-gold-500" />
            <blockquote className="measure mt-4 text-base leading-relaxed text-navy-700 sm:text-lg">
              &ldquo;{testimonial.quote}&rdquo;
            </blockquote>
            <figcaption className="mt-5 text-sm font-semibold uppercase tracking-wide text-navy-900">
              {testimonial.name}
            </figcaption>
          </figure>
        ))}
      </div>

      <div className="mt-6 flex justify-center gap-2">
        {testimonials.map((testimonial, i) => (
          <button
            key={testimonial.name}
            type="button"
            onClick={() => setIndex(i)}
            aria-label={`Show testimonial from ${testimonial.name}`}
            aria-current={i === index}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === index
                ? "w-6 bg-gold-500"
                : "w-1.5 bg-navy-900/20 hover:bg-navy-900/40"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
