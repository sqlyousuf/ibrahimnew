import type { Metadata } from "next";
import Image from "next/image";
import PageHero from "@/components/PageHero";
import { galleryImages } from "@/lib/site";

export const metadata: Metadata = {
  title: "Gallery",
  description: "A visual look at life at Masjid Ibrahim in Spring, Texas.",
};

export default function GalleryPage() {
  return (
    <>
      <PageHero
        eyebrow="Moments"
        title="Gallery"
        description="A glimpse into worship, learning, and community life at Masjid Ibrahim."
        image="https://images.unsplash.com/photo-1755518346374-8698aef237b8?auto=format&fit=crop&w=2000&q=80"
        imageAlt="Mosque minaret against a pale sky"
      />

      <section className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
        <p className="mx-auto max-w-2xl text-center text-sm leading-relaxed text-navy-700/80">
          Photos will be updated regularly with real moments from our masjid
          and Institute. For now, enjoy this preview of our community
          spirit.
        </p>

        <div className="mt-12 columns-1 gap-5 sm:columns-2 lg:columns-3">
          {galleryImages.map((image, i) => (
            <div
              key={image.src}
              className="mb-5 break-inside-avoid overflow-hidden rounded-2xl shadow-soft"
            >
              <Image
                src={image.src}
                alt={image.alt}
                width={800}
                height={i % 3 === 0 ? 1000 : 600}
                className="h-auto w-full object-cover transition duration-500 hover:scale-105"
              />
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
