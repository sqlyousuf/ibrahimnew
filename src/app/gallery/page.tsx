import type { Metadata } from "next";
import Image from "next/image";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import { galleryImages } from "@/lib/site";

export const metadata: Metadata = {
  title: "Gallery",
  description: "A visual look at life at Masjid Ibrahim in Spring, Texas.",
};

// A deliberate portrait/landscape rhythm rather than an arbitrary modulo, so
// the masonry columns stay balanced instead of drifting.
const ratios = [
  [4, 5],
  [4, 3],
  [3, 4],
  [4, 3],
  [4, 5],
  [3, 4],
  [4, 3],
  [4, 5],
] as const;

export default function GalleryPage() {
  return (
    <>
      <PageHero
        eyebrow="Moments"
        title="Gallery"
        description="A glimpse into worship, learning, and community life at Masjid Ibrahim."
        image="https://images.unsplash.com/photo-1755518346374-8698aef237b8?auto=format&fit=crop&w=2000&q=80"
        imageAlt="The masjid minaret against a pale morning sky"
        imagePosition="object-center"
      />

      <section className="section container-page">
        <p className="measure mx-auto text-center text-sm leading-relaxed text-navy-700/90">
          Photos will be updated regularly with real moments from our masjid and
          Institute. For now, enjoy this preview of our community spirit.
        </p>

        <div className="mt-8 columns-1 gap-4 sm:columns-2 sm:gap-5 lg:mt-12 lg:columns-3">
          {galleryImages.map((image, i) => {
            const [w, h] = ratios[i % ratios.length];
            return (
              <Reveal
                key={image.src}
                delay={(i % 3) * 80}
                className="mb-4 break-inside-avoid sm:mb-5"
              >
                <figure className="group relative overflow-hidden rounded-2xl shadow-soft ring-1 ring-navy-900/5">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    width={w * 200}
                    height={h * 200}
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="h-auto w-full object-cover transition-transform duration-700 ease-entrance group-hover:scale-[1.04]"
                  />
                  {/* Caption rides in on hover for pointer users; the alt text
                      carries the same information for everyone else. */}
                  <figcaption
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-2 bg-gradient-to-t from-navy-950/85 to-transparent p-4 text-sm font-medium text-white opacity-0 transition duration-300 ease-entrance group-hover:translate-y-0 group-hover:opacity-100"
                  >
                    {image.alt}
                  </figcaption>
                </figure>
              </Reveal>
            );
          })}
        </div>
      </section>
    </>
  );
}
