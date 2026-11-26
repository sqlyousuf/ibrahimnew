import Link from "next/link";
import { navLinks, site } from "@/lib/site";
import { LogoMark, PatternField, Rosette, StarGlyph } from "@/components/Ornament";

const linkClass =
  "inline-flex min-h-[2.75rem] items-center text-cream-100/80 transition-colors hover:text-gold-300 lg:min-h-0 lg:py-1";

const socialLinks = [
  {
    label: "YouTube",
    href: site.social.youtubeLive,
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

const quickActions = [
  {
    label: "Call",
    href: site.contact.phoneHref,
    external: false,
    icon: (
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92Z" />
    ),
  },
  {
    label: "Directions",
    href: `https://www.google.com/maps/dir/?api=1&destination=${site.address.mapsQuery}`,
    external: true,
    icon: (
      <>
        <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
        <circle cx="12" cy="10" r="3" />
      </>
    ),
  },
  {
    label: "Email",
    href: `mailto:${site.contact.adminEmail}`,
    external: false,
    icon: (
      <>
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
      </>
    ),
  },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-navy-975 text-cream-100">
      <PatternField opacity={0.05} />
      <div aria-hidden="true" className="grain absolute inset-0" />
      <span aria-hidden="true" className="rule-gold absolute inset-x-0 top-0" />
      <Rosette className="pointer-events-none absolute -left-40 top-10 h-[30rem] w-[30rem] animate-star-spin-slow text-gold-300/[0.06]" />

      {/* Ceremonial close — the gilded mark and the masjid's name in Ruq'ah,
          before the utilitarian columns. */}
      <div className="container-page relative flex flex-col items-center pb-2 pt-12 text-center sm:pb-4 sm:pt-16 lg:pt-20">
        <LogoMark className="h-20 w-auto sm:h-28 lg:h-32" />
        <p className="mt-4 max-w-xs font-display text-[1.25rem] italic leading-snug text-cream-100/85 sm:mt-6 sm:max-w-md sm:text-[1.75rem]">
          {site.tagline}
        </p>
        <span aria-hidden="true" className="mt-5 flex items-center gap-3 sm:mt-6">
          <span className="h-px w-12 bg-gradient-to-r from-transparent to-gold-300/60" />
          <StarGlyph className="h-4 w-4 text-gold-300" />
          <span className="h-px w-12 bg-gradient-to-l from-transparent to-gold-300/60" />
        </span>
      </div>

      {/* Phone footer — what a visitor reaches for at the bottom of a page
          on their phone: call, get directions, email, give. Three thumb-sized
          tiles plus one gold button instead of four stacked columns. */}
      <div className="container-page relative pb-10 pt-8 sm:hidden">
        <ul className="grid grid-cols-3 gap-2.5">
          {quickActions.map((action) => (
            <li key={action.label}>
              <a
                href={action.href}
                target={action.external ? "_blank" : undefined}
                rel={action.external ? "noopener noreferrer" : undefined}
                className="flex h-full flex-col items-center gap-2 rounded-2xl border border-gold-300/15 bg-white/[0.04] px-2 py-4 text-center transition-colors active:bg-white/[0.08]"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gold-300/10 text-gold-200 ring-1 ring-gold-300/25">
                  <svg viewBox="0 0 24 24" aria-hidden="true" className="h-[1.1rem] w-[1.1rem]" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                    {action.icon}
                  </svg>
                </span>
                <span className="text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-cream-100/90">
                  {action.label}
                </span>
              </a>
            </li>
          ))}
        </ul>

        <Link href="/donate" className="btn-primary mt-4 w-full">
          Donate Now
        </Link>

        <p className="mt-6 text-center text-[0.8125rem] leading-relaxed text-cream-100/65">
          {site.address.full}
        </p>

        <nav aria-label="Footer" className="mt-6 border-t border-white/10 pt-4">
          <ul className="grid grid-cols-2 gap-x-4 text-sm">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className={linkClass}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="container-page relative hidden gap-10 pb-14 pt-10 sm:grid sm:grid-cols-2 lg:grid-cols-4 lg:gap-12 lg:pb-16">
        <div className="sm:col-span-2 lg:col-span-1">
          <h2 className="flex items-center gap-2.5 font-display text-[1.375rem] font-semibold italic text-gold-200">
            <StarGlyph className="h-3.5 w-3.5 text-gold-400" />
            {site.name}
          </h2>
          <p className="measure-narrow mt-3 text-sm leading-relaxed text-cream-100/70">
            A center for salah, learning, and service in Spring, Texas.
          </p>
        </div>

        <div>
          <h2 className="flex items-center gap-2.5 font-display text-[1.375rem] font-semibold italic text-gold-200">
            <StarGlyph className="h-3.5 w-3.5 text-gold-400" />
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
          <h2 className="flex items-center gap-2.5 font-display text-[1.375rem] font-semibold italic text-gold-200">
            <StarGlyph className="h-3.5 w-3.5 text-gold-400" />
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
          <h2 className="flex items-center gap-2.5 font-display text-[1.375rem] font-semibold italic text-gold-200">
            <StarGlyph className="h-3.5 w-3.5 text-gold-400" />
            Support the Masjid
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-cream-100/75 lg:mt-4">
            Your generosity sustains our salah, programs, and community
            services.
          </p>
          <Link href="/donate" className="btn-primary mt-5 w-full sm:w-auto">
            Donate Now
          </Link>
          <Link href="/events" className="btn-outline mt-3 w-full sm:w-auto">
            Events This Week
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
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-gold-300/20 text-cream-100/80 transition-colors hover:border-gold-300/60 hover:text-gold-200"
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

          <p lang="ar" dir="rtl" className="arabic-accent text-base text-gold-300/70">جزاكم الله خيرا</p>
        </div>
      </div>
    </footer>
  );
}
