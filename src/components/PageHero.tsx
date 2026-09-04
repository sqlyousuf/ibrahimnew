import { PatternField } from "@/components/Ornament";
import Reveal from "@/components/Reveal";
import CinematicImage from "@/components/motion/CinematicImage";

export default function PageHero({
  eyebrow,
  title,
  description,
  image,
  imageAlt,
  imagePosition = "object-center",
}: {
  eyebrow: string;
  title: string;
  description?: string;
  image: string;
  imageAlt: string;
  /**
   * Landscape stock photos lose their subject when cropped to a tall phone
   * viewport, so each page tunes its own focal point.
   */
  imagePosition?: string;
}) {
  return (
    <section className="relative flex min-h-[20rem] items-end overflow-hidden bg-navy-975 sm:min-h-[24rem] lg:min-h-[28rem]">
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
        className="absolute inset-0 bg-gradient-to-t from-navy-975 via-navy-975/75 to-navy-975/30"
      />
      <div aria-hidden="true" className="absolute inset-0 bg-navy-975/20" />
      <PatternField opacity={0.09} />
      <div aria-hidden="true" className="grain absolute inset-0" />

      {/* Gold hairline tying the hero to the header's brand thread. */}
      <span
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-gold-500/50 to-transparent"
      />

      <Reveal
        as="div"
        className="container-page relative z-10 pb-10 pt-24 sm:pb-14 sm:pt-28 lg:pb-16"
      >
        <p className="section-eyebrow text-gold-300 before:bg-gold-400">
          {eyebrow}
        </p>
        <h1 className="mt-4 max-w-3xl text-balance font-display text-display-lg font-semibold text-white">
          {title}
        </h1>
        {description && (
          <p className="measure-narrow mt-4 text-[0.9375rem] leading-relaxed text-cream-100/85 sm:text-base">
            {description}
          </p>
        )}
      </Reveal>
    </section>
  );
}
