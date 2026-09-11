"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import Image from "next/image";
import { motionAllowed } from "@/lib/motionGate";
import type { UpcomingFlierEvent } from "@/lib/calendar";

const INTERVAL_MS = 6000;
const EVENTS_HREF = "/events";

function subscribe() {
  return () => {};
}
function getServerSnapshot() {
  return false;
}

/**
 * Replaces the welcome hero whenever there's at least one upcoming one-off
 * event with a flier (see getUpcomingEventFliers) — the homepage decides
 * which to render, this just draws the slides.
 *
 * Fliers are posters with real information printed on them, so unlike the
 * rest of the site's photography this never crops (`object-contain`, not
 * `cover`) — cutting off a date or time on a real flier would be a genuine
 * functional problem, not just a framing choice.
 */
export default function HeroFlierSlider({
  events,
}: {
  events: UpcomingFlierEvent[];
}) {
  const enabled = useSyncExternalStore(subscribe, motionAllowed, getServerSnapshot);
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (!enabled || paused || events.length < 2) return;
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % events.length);
    }, INTERVAL_MS);
    return () => window.clearInterval(id);
  }, [enabled, paused, events.length]);

  // Without motion (or before hydration), show just the soonest flier —
  // still useful, still linked to the full list, no carousel machinery.
  const visibleEvents = enabled ? events : events.slice(0, 1);
  const activeIndex = enabled ? index : 0;

  return (
    <section
      className="relative h-[36rem] overflow-hidden bg-navy-975 sm:h-[40rem] lg:h-[44rem]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      {visibleEvents.map((event, i) => (
        <Link
          key={event.slug}
          href={EVENTS_HREF}
          aria-hidden={i !== activeIndex}
          tabIndex={i === activeIndex ? 0 : -1}
          className="absolute inset-0 flex flex-col items-center gap-5 p-6 pb-14 pt-10 transition-opacity duration-700 ease-cinematic sm:gap-6 sm:p-10 sm:pb-16 sm:pt-14"
          style={{
            opacity: i === activeIndex ? 1 : 0,
            pointerEvents: i === activeIndex ? "auto" : "none",
          }}
        >
          <div className="relative min-h-0 w-full max-w-md flex-1">
            <Image
              src={event.flier.src}
              alt={event.flier.alt}
              fill
              priority={i === 0}
              sizes="(min-width: 640px) 28rem, 90vw"
              className="object-contain drop-shadow-2xl"
            />
          </div>

          <div className="relative z-10 shrink-0 text-center">
            <p className="section-eyebrow justify-center text-gold-300 before:bg-gold-400">
              {event.dateLabel}
              {event.time ? ` · ${event.time}` : ""}
            </p>
            <h1 className="mt-3 max-w-2xl text-balance font-display text-display-sm font-semibold text-white sm:text-display-md">
              {event.title}
            </h1>
            <span className="btn-primary mt-5 inline-flex">See This Week&apos;s Events</span>
          </div>
        </Link>
      ))}

      {enabled && events.length > 1 && (
        <div className="absolute inset-x-0 bottom-6 z-20 flex justify-center gap-2 sm:bottom-10">
          {events.map((event, i) => (
            <button
              key={event.slug}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Show flier for ${event.title}`}
              aria-current={i === index}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === index
                  ? "w-6 bg-gold-500"
                  : "w-1.5 bg-white/30 hover:bg-white/50"
              }`}
            />
          ))}
        </div>
      )}
    </section>
  );
}
