import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import PageTransition from "@/components/motion/PageTransition";
import GalleryLightbox from "@/components/gallery/GalleryLightbox";
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
    <PageTransition>
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

        <GalleryLightbox images={galleryImages} ratios={ratios} />
      </section>
    </PageTransition>
  );
}
