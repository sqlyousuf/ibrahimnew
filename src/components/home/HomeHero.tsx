"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { motionAllowed } from "@/lib/motionGate";
import CinematicImage from "@/components/motion/CinematicImage";
import { PatternField } from "@/components/Ornament";

/**
 * The signature moment: a staggered entrance, then a pinned exit where the
 * next section rises to cover the hero like a slow curtain close, rather
 * than a hard cut. Deliberately short on phones — the prayer schedule right
 * after it is the number-one reason someone opens this site on a phone, so
 * the hero must not consume the whole first screen there.
 */
export default function HomeHero({
  eyebrow,
  title,
  description,
  ctaLabel,
  ctaHref,
}: {
  eyebrow: string;
  title: string;
  description: string;
  ctaLabel: string;
  ctaHref: string;
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;
    if (!section || !content || !motionAllowed()) return;

    const ctx = gsap.context(() => {
      const items = content.querySelectorAll("[data-hero-item]");

      gsap.set(items, { autoAlpha: 0, y: 28 });
      gsap.to(items, {
        autoAlpha: 1,
        y: 0,
        duration: 1.1,
        ease: "power3.out",
        stagger: 0.12,
        delay: 0.2,
      });

      ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: "+=60%",
        pin: true,
        pinSpacing: false,
        scrub: 1,
        animation: gsap
          .timeline()
          .to(content, { autoAlpha: 0, y: 40, ease: "none" }),
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-[25rem] items-center overflow-hidden bg-navy-975 sm:min-h-[32rem] lg:min-h-screen"
    >
      <CinematicImage
        src="https://images.unsplash.com/photo-1577561426384-62154a1e9457?auto=format&fit=crop&w=2000&q=80"
        alt="The prayer hall at Masjid Ibrahim, lined with warm arches"
        priority
        speed={0.35}
        sizes="100vw"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-navy-975 via-navy-975/75 to-navy-975/35"
      />
      <PatternField opacity={0.08} />
      <div aria-hidden="true" className="grain absolute inset-0" />

      <div
        ref={contentRef}
        className="container-page relative z-10 pb-16 pt-10 sm:pb-28 sm:pt-20 lg:pb-40 lg:pt-32"
      >
        <p
          data-hero-item
          lang="ar"
          className="font-arabic text-xl text-gold-300 sm:text-2xl"
        >
          السلام عليكم
        </p>
        <p
          data-hero-item
          className="section-eyebrow mt-2.5 text-gold-300 before:bg-gold-400"
        >
          {eyebrow}
        </p>
        <h1
          data-hero-item
          className="mt-3 max-w-4xl text-balance font-display text-display-hero font-semibold text-white"
        >
          {title}
        </h1>
        <p
          data-hero-item
          className="measure-narrow mt-3 text-[0.9375rem] leading-relaxed text-cream-100/85 sm:mt-6 sm:text-lede"
        >
          {description}
        </p>
        <div data-hero-item className="mt-6 flex justify-center sm:mt-10">
          <Link href={ctaHref} className="btn-primary w-full sm:w-auto">
            {ctaLabel}
          </Link>
        </div>
      </div>

      <span
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-gold-500/50 to-transparent"
      />
    </section>
  );
}
