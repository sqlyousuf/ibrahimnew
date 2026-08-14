import Image from "next/image";
import Link from "next/link";
import { navLinks, site } from "@/lib/site";
import { PatternField, StarGlyph } from "@/components/Ornament";

const linkClass =
  "inline-flex min-h-[2.75rem] items-center text-cream-100/80 transition-colors hover:text-gold-300 lg:min-h-0 lg:py-1";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-navy-950 text-cream-100">
      <PatternField opacity={0.05} />
      <span
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold-500/40 to-transparent"
      />

      <div className="container-page relative grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4 lg:gap-12 lg:py-16">
        <div className="sm:col-span-2 lg:col-span-1">
          {/* 206x250 matches the file's true 1407x1704 ratio. */}
          <Image
            src="/brand/logo-navy-bg.jpg"
            alt=""
            width={206}
            height={250}
            className="h-16 w-auto lg:h-20"
          />
          <p lang="ar" className="mt-4 font-arabic text-2xl leading-none text-gold-300">
            مسجد إبراهيم
          </p>
          <p className="measure-narrow mt-3 text-sm leading-relaxed text-cream-100/75">
            {site.tagline}. A center for prayer, learning, and service in
            Spring, Texas.
          </p>
        </div>

        <div>
          <h2 className="flex items-center gap-2 font-display text-sm font-semibold uppercase tracking-[0.2em] text-gold-300">
            <StarGlyph className="h-3.5 w-3.5" />
            Explore
          </h2>
          {/* Two columns on phones so seven 44px targets don't run long. */}
          <ul className="mt-2 grid grid-cols-2 gap-x-4 text-sm sm:grid-cols-1 lg:mt-4">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className={linkClass}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="flex items-center gap-2 font-display text-sm font-semibold uppercase tracking-[0.2em] text-gold-300">
            <StarGlyph className="h-3.5 w-3.5" />
            Contact
          </h2>
          <ul className="mt-2 text-sm lg:mt-4">
            <li className="py-1.5 leading-relaxed text-cream-100/75">
              {site.address.line1}
              <br />
              {site.address.line2}
            </li>
            <li>
              <a href={site.contact.phoneHref} className={linkClass}>
                {site.contact.phone}
              </a>
            </li>
            <li>
              <a
                href={`mailto:${site.contact.adminEmail}`}
                className={`${linkClass} break-all`}
              >
                {site.contact.adminEmail}
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="flex items-center gap-2 font-display text-sm font-semibold uppercase tracking-[0.2em] text-gold-300">
            <StarGlyph className="h-3.5 w-3.5" />
            Support the Masjid
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-cream-100/75 lg:mt-4">
            Your generosity sustains our prayers, programs, and community
            services.
          </p>
          <Link href="/donate" className="btn-primary mt-5 w-full sm:w-auto">
            Donate Now
          </Link>
        </div>
      </div>

      <div className="relative border-t border-white/10">
        <div className="container-page flex flex-col items-center justify-between gap-2 py-6 text-xs text-cream-100/70 sm:flex-row">
          <p>
            &copy; {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
          <p>Built with care for our community.</p>
        </div>
      </div>
    </footer>
  );
}
