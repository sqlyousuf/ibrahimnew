"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { navLinks, site } from "@/lib/site";
import { LogoMark, PatternField, Rosette, StarGlyph } from "@/components/Ornament";

const PRAYER_HREF = "/prayer-times";
// Rendered separately as the featured entry in the phone menu.
const otherLinks = navLinks.filter((link) => link.href !== PRAYER_HREF);

function YouTubeGlyph({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" className={className}>
      <path
        fill="currentColor"
        d="M21.6 7.2a2.7 2.7 0 0 0-1.9-1.9C18 5 12 5 12 5s-6 0-7.7.3a2.7 2.7 0 0 0-1.9 1.9A28 28 0 0 0 2 12a28 28 0 0 0 .4 4.8 2.7 2.7 0 0 0 1.9 1.9C6 19 12 19 12 19s6 0 7.7-.3a2.7 2.7 0 0 0 1.9-1.9A28 28 0 0 0 22 12a28 28 0 0 0-.4-4.8ZM10 15V9l5 3-5 3Z"
      />
    </svg>
  );
}

/** Staggered entrance for each row of the phone menu as it opens. */
function menuItemMotion(open: boolean, delayMs: number) {
  return {
    style: { transitionDelay: open ? `${delayMs}ms` : "0ms" },
    className: `transition-[transform,opacity] duration-700 ease-entrance ${
      open ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
    }`,
  };
}

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [lastPathname, setLastPathname] = useState(pathname);

  if (pathname !== lastPathname) {
    setLastPathname(pathname);
    setOpen(false);
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock background scroll while the phone menu is open, close on Escape, and
  // drop the menu if the viewport grows past the desktop breakpoint.
  useEffect(() => {
    // Signals the sticky prayer bar to duck out of the way, so the two pieces
    // of mobile chrome never overlap.
    document.documentElement.dataset.menuOpen = open ? "true" : "false";
  }, [open]);

  useEffect(() => {
    if (!open) return;

    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    const desktop = window.matchMedia("(min-width: 1024px)");
    const onBreakpoint = () => {
      if (desktop.matches) setOpen(false);
    };

    document.addEventListener("keydown", onKeyDown);
    desktop.addEventListener("change", onBreakpoint);

    return () => {
      document.body.style.overflow = overflow;
      document.removeEventListener("keydown", onKeyDown);
      desktop.removeEventListener("change", onBreakpoint);
    };
  }, [open]);

  const prayerTile = menuItemMotion(open, 80);
  const footerRow = menuItemMotion(open, 140 + otherLinks.length * 50);

  return (
    <>
      <header
        style={{ viewTransitionName: "site-header" }}
        className={`sticky top-0 z-50 border-b backdrop-blur-xl backdrop-saturate-150 transition-[box-shadow,border-color,background-color] duration-500 ${
          scrolled || open
            ? "border-gold-300/10 bg-navy-975/95 shadow-[0_12px_40px_-20px_rgba(0,0,0,0.8)]"
            : "border-transparent bg-navy-975"
        }`}
      >
        {/* Brand hairline — a thin gold rule reading as a thread of the logo. */}
        <span
          aria-hidden="true"
          className="rule-gold absolute inset-x-0 bottom-0 opacity-60"
        />

        <div className="container-page flex items-center justify-between gap-3 py-2.5 sm:py-3">
          <Link
            href="/"
            transitionTypes={["nav-back"]}
            className="group flex items-center gap-3 rounded-lg"
            aria-label={`${site.name} — home`}
          >
            <LogoMark
              className={`w-auto transition-[height] duration-500 ease-entrance ${
                scrolled ? "h-10 lg:h-12" : "h-12 lg:h-14"
              }`}
            />
            <span className="flex flex-col">
              <span className="whitespace-nowrap font-display text-[1.375rem] font-semibold leading-none tracking-[0.01em] text-cream-50 transition-colors group-hover:text-gold-200 sm:text-2xl">
                {site.name}
              </span>
              <span className="mt-1.5 flex items-center gap-2 font-body text-[0.5625rem] font-semibold uppercase tracking-[0.3em] text-gold-300/90 sm:text-[0.625rem]">
                <span aria-hidden="true" className="h-px w-3 bg-gold-400/60" />
                Spring, Texas
              </span>
            </span>
          </Link>

          <nav aria-label="Primary" className="hidden items-center gap-5 lg:flex xl:gap-7">
            {navLinks.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  transitionTypes={[link.href === "/" ? "nav-back" : "nav-forward"]}
                  aria-current={active ? "page" : undefined}
                  className={`group relative whitespace-nowrap py-2 text-[0.75rem] font-semibold uppercase tracking-[0.2em] transition-colors ${
                    active ? "text-gold-300" : "text-cream-100/80 hover:text-gold-200"
                  }`}
                >
                  {link.label}
                  {/* Underline grows from the centre on hover, stays put when active. */}
                  <span
                    aria-hidden="true"
                    className={`absolute -bottom-0.5 left-0 h-px w-full origin-center bg-gradient-to-r from-transparent via-gold-300 to-transparent transition-transform duration-500 ease-entrance ${
                      active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                    }`}
                  />
                </Link>
              );
            })}
          </nav>

          <div className="hidden items-center gap-3 lg:flex xl:gap-4">
            <a
              href={site.contact.phoneHref}
              className="hidden whitespace-nowrap text-sm font-medium tabular-nums text-cream-100/75 transition-colors hover:text-gold-200 2xl:inline"
            >
              {site.contact.phone}
            </a>
            <a
              href={site.social.youtubeLive}
              target="_blank"
              rel="noopener noreferrer"
              title="Watch Live on YouTube"
              aria-label="Watch live on YouTube"
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-gold-300/25 text-cream-100/85 transition hover:border-gold-300/60 hover:text-gold-200"
            >
              <YouTubeGlyph className="h-4 w-4 shrink-0" />
            </a>
            <Link href="/donate" className="btn-primary min-h-[2.75rem] px-6">
              Donate
            </Link>
          </div>

          <button
            type="button"
            className="-mr-1.5 flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-cream-50 transition-colors active:bg-white/10 lg:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
          >
            {/* Two unequal gold strokes rather than a stock three-bar icon. */}
            <span className="relative block h-3.5 w-7">
              <span
                className={`absolute right-0 top-0 block h-px w-7 rounded-full bg-gold-200 transition-all duration-500 ease-entrance ${
                  open ? "translate-y-[7px] rotate-45" : ""
                }`}
              />
              <span
                className={`absolute right-0 top-[13px] block h-px rounded-full bg-gold-200 transition-all duration-500 ease-entrance ${
                  open ? "w-7 -translate-y-[6px] -rotate-45" : "w-4"
                }`}
              />
            </span>
          </button>
        </div>
      </header>

      {/* Phone menu — a full-screen midnight sheet under the header. Lives
          outside <header> because the header's backdrop-filter would make it
          the containing block for this fixed layer. Kept mounted and inert
          when closed so focus never lands inside it. */}
      <div
        id="mobile-menu"
        inert={!open}
        className={`fixed inset-0 z-40 overflow-hidden bg-navy-975 transition-[opacity,visibility] duration-500 ease-entrance lg:hidden ${
          open ? "visible opacity-100" : "pointer-events-none invisible opacity-0"
        }`}
      >
        <PatternField opacity={0.05} />
        <div aria-hidden="true" className="grain absolute inset-0" />
        <Rosette className="pointer-events-none absolute -bottom-32 -right-32 h-96 w-96 animate-star-spin-slow text-gold-400/[0.09]" />

        <nav
          aria-label="Mobile"
          className="container-page relative flex h-full flex-col overflow-y-auto overscroll-contain pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-24"
        >
          {/* Prayer times is the single most common reason for a phone
              visit, so it leads the menu as a distinguished tile rather
              than sitting as one of seven equal-weight links. */}
          <div style={prayerTile.style} className={prayerTile.className}>
            <Link
              href={PRAYER_HREF}
              transitionTypes={["nav-forward"]}
              onClick={() => setOpen(false)}
              aria-current={pathname === PRAYER_HREF ? "page" : undefined}
              className="card-night flex min-h-[4.5rem] items-center gap-4 px-5"
            >
              <StarGlyph className="h-6 w-6 shrink-0 text-gold-300" />
              <span className="min-w-0 flex-1">
                <span className="block font-display text-[1.625rem] font-semibold leading-none text-cream-50">
                  Salah Times
                </span>
                <span className="mt-1.5 block text-[0.625rem] font-semibold uppercase tracking-[0.24em] text-gold-300/90">
                  Today&apos;s full schedule
                </span>
              </span>
              <span aria-hidden="true" className="shrink-0 text-lg text-gold-300">
                &rarr;
              </span>
            </Link>
          </div>

          <ul className="mt-4">
            {otherLinks.map((link, i) => {
              const active = pathname === link.href;
              const motion = menuItemMotion(open, 140 + i * 50);
              return (
                <li
                  key={link.href}
                  style={motion.style}
                  className={`border-b border-gold-300/10 ${motion.className}`}
                >
                  <Link
                    href={link.href}
                    transitionTypes={[link.href === "/" ? "nav-back" : "nav-forward"]}
                    aria-current={active ? "page" : undefined}
                    onClick={() => setOpen(false)}
                    className="group flex min-h-[3.5rem] items-center gap-4"
                  >
                    <span
                      aria-hidden="true"
                      className="w-6 shrink-0 font-body text-[0.625rem] font-semibold tabular-nums tracking-[0.2em] text-gold-400/70"
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span
                      className={`font-display text-[1.75rem] font-medium leading-none transition-colors ${
                        active ? "italic text-gold-300" : "text-cream-50 group-active:text-gold-200"
                      }`}
                    >
                      {link.label}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>

          <div
            style={footerRow.style}
            className={`mt-auto space-y-3 pt-8 ${footerRow.className}`}
          >
            <Link
              href="/donate"
              onClick={() => setOpen(false)}
              className="btn-primary w-full"
            >
              Donate
            </Link>
            <div className="grid grid-cols-2 gap-3">
              <a
                href={site.social.youtubeLive}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline min-h-[3rem] px-4 tracking-[0.14em]"
              >
                <YouTubeGlyph className="h-4 w-4 shrink-0" />
                Live
              </a>
              <a
                href={site.contact.phoneHref}
                className="btn-outline min-h-[3rem] px-4 tracking-[0.14em]"
              >
                Call Us
              </a>
            </div>
            <p
              lang="ar"
              dir="rtl"
              className="arabic-accent pt-3 text-center text-2xl text-gold-300/60"
            >
              مسجد إبراهيم
            </p>
          </div>
        </nav>
      </div>
    </>
  );
}
