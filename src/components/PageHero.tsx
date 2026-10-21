import type { ReactNode } from "react";
import { PatternField, Rosette } from "@/components/Ornament";
import Reveal from "@/components/Reveal";
import CinematicImage from "@/components/motion/CinematicImage";

export default function PageHero({
  eyebrow,
  title,
  arabic,
  description,
  image,
  imageAlt,
  imagePosition = "object-center",
}: {
  eyebrow?: string;
  title: string;
  /** Optional Arabic word set in Ruq'ah above the eyebrow. */
  arabic?: string;
  /** Plain text, or JSX (e.g. for inline emphasis like <strong>). */
  description?: ReactNode;
  image: string;
  imageAlt: string;
  /**
   * Landscape stock photos lose their subject when cropped to a tall phone
   * viewport, so each page tunes its own focal point.
   */
  imagePosition?: string;
}) {
  return (
    <section className="relative flex min-h-[22rem] items-end overflow-hidden bg-navy-975 sm:min-h-[26rem] lg:min-h-[30rem]">
      <CinematicImage
        src={image}
        alt={imageAlt}
        priority
        speed={0.25}
        className={imagePosition}
        sizes="100vw"
      />

      {/* Two-part scrim: a vertical ramp that guarantees contrast for the
          text block, plus a flat tint so bright skies never blow out. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-navy-975 via-navy-975/80 to-navy-975/40"
      />
      <div aria-hidden="true" className="absolute inset-0 bg-navy-975/20" />
      <PatternField opacity={0.07} />
      <Rosette className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 animate-star-spin-slow text-gold-300/[0.12] sm:h-96 sm:w-96" />
      <div aria-hidden="true" className="grain absolute inset-0" />

      {/* Gold hairline tying the hero to the header's brand thread. */}
      <span
        aria-hidden="true"
        className="rule-gold absolute inset-x-0 bottom-0"
      />

      <Reveal
        as="div"
        className="container-page relative z-10 pb-10 pt-24 sm:pb-14 sm:pt-28 lg:pb-16"
      >
        {arabic && (
          <p className="arabic-accent mb-3 text-[1.75rem] text-gold-300/90 sm:text-[2.25rem]">
            <span lang="ar" dir="rtl">
              {arabic}
            </span>
          </p>
        )}
        {eyebrow && (
          <p className="section-eyebrow text-gold-300 before:bg-gold-300">
            {eyebrow}
          </p>
        )}
        <h1 className="mt-4 max-w-3xl text-balance font-display text-display-lg font-semibold text-cream-50">
          {title}
        </h1>
        {description && (
          <p className="measure-narrow mt-4 text-[0.9375rem] leading-[1.75] text-cream-100/80 sm:text-base">
            {description}
          </p>
        )}
      </Reveal>
    </section>
  );
}
