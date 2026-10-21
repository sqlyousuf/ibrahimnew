"use client";

import { useEffect, useRef } from "react";
import type { ReactNode } from "react";
import Link from "next/link";
import { gsap } from "@/lib/gsap";
import { motionAllowed } from "@/lib/motionGate";
import CinematicImage from "@/components/motion/CinematicImage";
import { ArchOutline, PatternField, Rosette } from "@/components/Ornament";

/**
 * The signature moment: a staggered entrance on load.
 *
 * This used to also hold itself in place while the next section rose over
 * it (`position: sticky` inside a padded "runway" wrapper). That broke
 * under this page's `<ViewTransition>` wrapper — sticky positioning
 * silently stopped engaging, so the hero just scrolled away normally while
 * the runway's reserved padding was left behind as a blank gap. Plain GSAP
 * `pin: true` has the same problem from the other direction (see git log
 * for that history) — it mutates the DOM in a way that conflicts with
 * React's unmount during a page transition. Simplest fix for both: no
 * pin/sticky here at all.
 *
 * Deliberately short on phones — the prayer schedule right after it is the
 * number-one reason someone opens this site on a phone, so the hero must
 * not consume the whole first screen there.
 */
export default function HomeHero({
  eyebrow,
  title,
  description,
  ctaLabel,
  ctaHref,
}: {
  eyebrow: string;
  /** JSX so a single phrase can be set in gilded italic. */
  title: ReactNode;
  description: string;
  ctaLabel: string;
  ctaHref: string;
}) {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const content = contentRef.current;
    if (!content || !motionAllowed()) return;

    const ctx = gsap.context(() => {
      const items = content.querySelectorAll("[data-hero-item]");

      const frame = content.querySelectorAll("[data-hero-frame]");

      gsap.set(items, { autoAlpha: 0, y: 28 });
      gsap.to(items, {
        autoAlpha: 1,
        y: 0,
        duration: 1.2,
        ease: "power3.out",
        stagger: 0.12,
        delay: 0.2,
      });
      // The mihrab outline draws itself up from the floor.
      gsap.fromTo(
        frame,
        { autoAlpha: 0, scaleY: 0.6, transformOrigin: "50% 100%" },
        { autoAlpha: 1, scaleY: 1, duration: 1.8, ease: "power3.out" },
      );
    }, content);

    return () => ctx.revert();
  }, []);

  return (
    <section className="relative flex min-h-[37rem] items-center overflow-hidden bg-navy-975 sm:min-h-[40rem] lg:min-h-screen">
      <CinematicImage
        src="https://images.unsplash.com/photo-1577561426384-62154a1e9457?auto=format&fit=crop&w=2000&q=80"
        alt="The prayer hall at Masjid Ibrahim, lined with warm arches"
        priority
        speed={0.35}
        sizes="100vw"
      />
      {/* Deep midnight scrim: dark at the floor and crown, a little light
          let through the middle so the arches behind still read. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-b from-navy-975/90 via-navy-975/[0.72] to-navy-975"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(70%_50%_at_50%_42%,rgba(220,181,106,0.16),transparent_70%)]"
      />
      <PatternField opacity={0.06} />
      <div aria-hidden="true" className="grain absolute inset-0" />
      <Rosette className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 animate-star-spin-slow text-gold-300/[0.12] sm:h-[28rem] sm:w-[28rem] lg:-right-32 lg:-top-32 lg:h-[40rem] lg:w-[40rem]" />

      <div
        ref={contentRef}
        className="container-page relative z-10 flex flex-col items-center pb-14 pt-12 text-center sm:pb-24 sm:pt-20 lg:pb-32 lg:pt-28"
      >
        {/* Mihrab frame behind the type, echoing the arch in the logo. */}
        <div
          data-hero-frame
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-3 bottom-4 top-3 mx-auto max-w-3xl text-gold-300/25 sm:inset-x-6 sm:top-6"
        >
          <ArchOutline className="h-full w-full" />
        </div>

        <p
          data-hero-item
          lang="ar"
          dir="rtl"
          className="arabic-accent relative mt-14 text-[1.875rem] text-foil sm:mt-20 sm:text-[2.5rem]"
        >
          بِسْمِ ٱللَّٰهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ
        </p>
        <p
          data-hero-item
          className="section-eyebrow relative mt-5 justify-center text-gold-300 before:bg-gold-300"
        >
          {eyebrow}
        </p>
        <h1
          data-hero-item
          className="relative mt-4 max-w-4xl text-balance font-display text-display-hero font-semibold text-cream-50"
        >
          {title}
        </h1>
        <span
          data-hero-item
          aria-hidden="true"
          className="relative mt-6 flex items-center gap-3 text-gold-300/70"
        >
          <span className="h-px w-10 bg-gradient-to-r from-transparent to-gold-300/70" />
          <span className="h-1.5 w-1.5 rotate-45 bg-gold-300" />
          <span className="h-px w-10 bg-gradient-to-l from-transparent to-gold-300/70" />
        </span>
        <p
          data-hero-item
          className="relative mt-6 max-w-[34ch] text-[0.9375rem] leading-[1.75] text-cream-100/80 sm:max-w-xl sm:text-lede"
        >
          {description}
        </p>
        <div
          data-hero-item
          className="relative mt-9 flex w-full max-w-sm flex-col gap-3 sm:w-auto sm:max-w-none sm:flex-row"
        >
          <Link href={ctaHref} className="btn-primary w-full sm:w-auto">
            {ctaLabel}
          </Link>
          <Link href="/events" className="btn-outline w-full sm:w-auto">
            This Week
          </Link>
        </div>
      </div>

      <span
        aria-hidden="true"
        className="rule-gold absolute inset-x-0 bottom-0"
      />
    </section>
  );
}
