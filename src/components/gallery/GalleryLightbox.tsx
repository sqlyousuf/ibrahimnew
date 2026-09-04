"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Reveal from "@/components/Reveal";

type GalleryImage = { src: string; alt: string };

/**
 * Grid of Reveal-staggered thumbnails that open into a full-screen lightbox.
 * A crossfade, not a shared-element morph: the same photo appears in the
 * grid and the lightbox at once, and the View Transition API rejects two
 * elements sharing a view-transition-name in the same frame — so this uses
 * a plain opacity/scale transition instead of `<ViewTransition name>`.
 */
export default function GalleryLightbox({
  images,
  ratios,
}: {
  images: GalleryImage[];
  ratios: readonly (readonly [number, number])[];
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  useEffect(() => {
    if (openIndex === null) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenIndex(null);
    };
    window.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [openIndex]);

  return (
    <>
      <div className="mt-8 columns-1 gap-4 sm:columns-2 sm:gap-5 lg:mt-12 lg:columns-3">
        {images.map((image, i) => {
          const [w, h] = ratios[i % ratios.length];
          return (
            <Reveal
              key={image.src}
              delay={(i % 3) * 80}
              className="mb-4 break-inside-avoid sm:mb-5"
            >
              <button
                type="button"
                onClick={() => setOpenIndex(i)}
                aria-label={`View larger: ${image.alt}`}
                data-cursor="view"
                className="group relative block w-full overflow-hidden rounded-2xl shadow-soft ring-1 ring-navy-900/5"
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  width={w * 200}
                  height={h * 200}
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="cinematic-photo h-auto w-full object-cover transition-transform duration-700 ease-entrance group-hover:scale-[1.04]"
                />
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-2 bg-gradient-to-t from-navy-950/85 to-transparent p-4 text-left text-sm font-medium text-white opacity-0 transition duration-300 ease-entrance group-hover:translate-y-0 group-hover:opacity-100"
                >
                  {image.alt}
                </span>
              </button>
            </Reveal>
          );
        })}
      </div>

      {openIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={images[openIndex].alt}
          className="fixed inset-0 z-[250] flex animate-fade-up items-center justify-center bg-navy-975/95 p-4 duration-300 sm:p-10"
          onClick={() => setOpenIndex(null)}
        >
          <Image
            src={images[openIndex].src}
            alt={images[openIndex].alt}
            width={1600}
            height={1200}
            sizes="90vw"
            className="cinematic-photo max-h-[85vh] w-auto max-w-full rounded-lg object-contain shadow-panel"
            onClick={(e) => e.stopPropagation()}
          />
          <button
            type="button"
            onClick={() => setOpenIndex(null)}
            aria-label="Close"
            className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-xl leading-none text-white transition hover:bg-white/20"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
      )}
    </>
  );
}
