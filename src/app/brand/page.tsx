import type { Metadata } from "next";
import Image from "next/image";
import Reveal from "@/components/Reveal";
import PageTransition from "@/components/motion/PageTransition";
import CopyLinkButton from "@/components/brand/CopyLinkButton";
import { PatternField, StarGlyph } from "@/components/Ornament";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Logos & Brand Assets",
  description:
    "Download the official Masjid Ibrahim logos for flyers, signage, and social posts.",
  // Shared as a direct link with volunteers and partners, so it stays out of
  // search results and the sitemap (which only lists navLinks).
  robots: { index: false, follow: false },
};

const logos = [
  {
    name: "Logo — navy background",
    file: "/brand/logo-navy-bg.jpg",
    note: "Use on light or cream backgrounds, and for social profile pictures.",
    // Matches the artwork's own background so the download preview reads true.
    surface: "bg-cream-200",
  },
  {
    name: "Logo — white background",
    file: "/brand/logo-white-bg.jpg",
    note: "Use on dark or photographic backgrounds, such as banners and headers.",
    surface: "bg-navy-950",
  },
];

export default function BrandPage() {
  return (
    <PageTransition>
      {/* No stock photo here: a hero image would compete with the logos the
          page exists to show, so the header is type-only. */}
      <section className="relative overflow-hidden bg-navy-975 pb-12 pt-28 sm:pb-16 sm:pt-32">
        <PatternField opacity={0.09} />
        <div aria-hidden="true" className="grain absolute inset-0" />
        <span
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-gold-500/50 to-transparent"
        />
        <Reveal as="div" className="container-page relative z-10">
          <p className="section-eyebrow text-gold-300 before:bg-gold-400">
            Brand Assets
          </p>
          <h1 className="mt-4 max-w-3xl text-balance font-display text-display-lg font-semibold text-white">
            Masjid Ibrahim Logos
          </h1>
          <p className="measure-narrow mt-4 text-[0.9375rem] leading-relaxed text-cream-100/85 sm:text-base">
            Download the official logos for flyers, signage, and social posts —
            or copy a direct link to share with a designer or printer.
          </p>
        </Reveal>
      </section>

      {/* ------------------------------------------------------------- Logos */}
      <section className="section container-page">
        <div className="grid gap-6 sm:gap-8 lg:grid-cols-2">
          {logos.map((logo, i) => (
            <Reveal key={logo.file} delay={i * 70} className="h-full">
              <div className="card flex h-full flex-col overflow-hidden">
                <div
                  className={`flex items-center justify-center p-6 sm:p-10 ${logo.surface}`}
                >
                  <Image
                    src={logo.file}
                    alt={`${site.name} ${logo.name}`}
                    width={900}
                    height={900}
                    className="h-auto w-full max-w-[22rem]"
                    sizes="(min-width: 1024px) 22rem, 80vw"
                  />
                </div>
                <div className="flex flex-1 flex-col p-5 sm:p-7">
                  <h2 className="font-display text-lg font-semibold text-navy-900 sm:text-xl">
                    {logo.name}
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-navy-700">
                    {logo.note}
                  </p>
                  <div className="mt-5 flex flex-wrap gap-3 sm:mt-auto sm:pt-5">
                    <a href={logo.file} download className="btn-primary">
                      Download JPG
                    </a>
                    <CopyLinkButton path={logo.file} />
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* ------------------------------------------------- Vector + usage */}
        <Reveal className="mt-10 sm:mt-12">
          <div className="card p-5 sm:p-7">
            <StarGlyph className="h-5 w-5 text-gold-500" />
            <h2 className="mt-3 font-display text-lg font-semibold text-navy-900 sm:text-xl">
              Printing something large?
            </h2>
            <p className="measure mt-2 text-sm leading-relaxed text-navy-700">
              Send your printer the Adobe Illustrator source instead of the JPG.
              It scales to any size — banners, yard signs, vinyl — without going
              blurry.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <a
                href="/brand/ibrahim-logo.ai"
                download
                className="btn-outline-navy"
              >
                Download vector (.ai)
              </a>
              <CopyLinkButton path="/brand/ibrahim-logo.ai" />
            </div>
          </div>
        </Reveal>

        <Reveal className="mt-8">
          <p className="measure text-sm leading-relaxed text-navy-700">
            Please keep the logo unstretched and don&apos;t recolour it or add
            effects. For anything beyond these files, email{" "}
            <a
              href={`mailto:${site.contact.adminEmail}`}
              className="link-underline font-semibold text-navy-900"
            >
              {site.contact.adminEmail}
            </a>
            .
          </p>
        </Reveal>
      </section>
    </PageTransition>
  );
}
