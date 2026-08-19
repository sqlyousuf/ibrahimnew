import Image from "next/image";
import Link from "next/link";
import { navLinks, site } from "@/lib/site";
import { PatternField, StarGlyph } from "@/components/Ornament";

const linkClass =
  "inline-flex min-h-[2.75rem] items-center text-cream-100/80 transition-colors hover:text-gold-300 lg:min-h-0 lg:py-1";

const socialLinks = [
  {
    label: "YouTube",
    href: site.social.youtube,
    icon: (
      <path
        fill="currentColor"
        stroke="none"
        d="M21.6 7.2a2.7 2.7 0 0 0-1.9-1.9C18 5 12 5 12 5s-6 0-7.7.3a2.7 2.7 0 0 0-1.9 1.9A28 28 0 0 0 2 12a28 28 0 0 0 .4 4.8 2.7 2.7 0 0 0 1.9 1.9C6 19 12 19 12 19s6 0 7.7-.3a2.7 2.7 0 0 0 1.9-1.9A28 28 0 0 0 22 12a28 28 0 0 0-.4-4.8ZM10 15V9l5 3-5 3Z"
      />
    ),
  },
  {
    label: "Facebook",
    href: site.social.facebook,
    icon: (
      <path
        fill="currentColor"
        stroke="none"
        d="M13.5 21v-7.5h2.5l.4-3h-2.9V8.4c0-.9.2-1.5 1.5-1.5h1.6V4.2C16.3 4.1 15.3 4 14.2 4c-2.4 0-4.1 1.5-4.1 4.1v2.4H7.5v3H10V21h3.5Z"
      />
    ),
  },
  {
    label: "Instagram",
    href: site.social.instagram,
    icon: (
      <>
        <rect x="3.5" y="3.5" width="17" height="17" rx="4.5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
      </>
    ),
  },
];

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
            {site.tagline}. A center for salah, learning, and service in
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
            Your generosity sustains our salah, programs, and community
            services.
          </p>
          <Link href="/donate" className="btn-primary mt-5 w-full sm:w-auto">
            Donate Now
          </Link>
        </div>
      </div>

      <div className="relative border-t border-white/10">
        <div className="container-page flex flex-col items-center justify-between gap-5 py-6 text-xs text-cream-100/70 sm:flex-row sm:gap-4">
          <p>
            &copy; {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>

          <ul className="flex items-center gap-2 order-first sm:order-none">
            {socialLinks.map((social) => (
              <li key={social.label}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${site.name} on ${social.label}`}
                  className="flex h-10 w-10 items-center justify-center rounded-full text-cream-100/80 transition-colors hover:bg-white/10 hover:text-gold-300"
                >
                  <svg
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                    className="h-[1.15rem] w-[1.15rem]"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    {social.icon}
                  </svg>
                </a>
              </li>
            ))}
          </ul>

          <p>Built with care for our community.</p>
        </div>
      </div>
    </footer>
  );
}
