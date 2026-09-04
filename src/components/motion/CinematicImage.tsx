import Image from "next/image";
import type { ComponentProps } from "react";
import ParallaxLayer from "@/components/motion/ParallaxLayer";

type ImageProps = ComponentProps<typeof Image>;

/**
 * The site's one standard treatment for full-bleed photography: warm grade
 * + vignette (globals.css) over a parallaxed `next/image`. Every hero and
 * section background image on the site should go through this rather than
 * a bare `<Image fill>`, so the "one continuous film" look stays consistent.
 */
export default function CinematicImage({
  speed = 0.25,
  vignette = true,
  wrapperClassName = "absolute inset-0",
  className,
  alt,
  ...imgProps
}: ImageProps & {
  speed?: number;
  vignette?: boolean;
  wrapperClassName?: string;
}) {
  return (
    <ParallaxLayer speed={speed} className={wrapperClassName}>
      <Image
        {...imgProps}
        alt={alt}
        fill
        className={`cinematic-photo object-cover ${className ?? ""}`}
      />
      {vignette && (
        <div aria-hidden="true" className="cinematic-vignette absolute inset-0" />
      )}
    </ParallaxLayer>
  );
}
