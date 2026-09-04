"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { navLinks, site } from "@/lib/site";
import { StarGlyph } from "@/components/Ornament";

const PRAYER_HREF = "/prayer-times";
// Rendered separately as the featured entry in the phone menu.
const otherLinks = navLinks.filter((link) => link.href !== PRAYER_HREF);

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

  return (
    <header
      style={{ viewTransitionName: "site-header" }}
      className={`sticky top-0 z-50 border-b bg-white/90 backdrop-blur-md transition-[box-shadow,border-color,background-color] duration-300 ${
        scrolled || open
          ? "border-navy-900/10 shadow-soft"
          : "border-transparent"
      }`}
    >
      {/* Brand hairline — a thin gold rule reading as a thread of the logo. */}
      <span
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-gold-500/40 to-transparent"
      />

      <div className="container-page flex items-center justify-between gap-3 py-2.5 sm:py-3">
        <Link
          href="/"
          transitionTypes={["nav-back"]}
          className="group flex items-center gap-2.5 rounded-lg sm:gap-3"
          aria-label={`${site.name} — home`}
        >
          {/* 193x250 matches the file's true 1145x1481 ratio — the previous
              48x60 props were subtly squishing the mark. */}
          <Image
            src="/brand/logo-white-bg.jpg"
            alt=""
            width={193}
            height={250}
            className={`w-auto transition-[height] duration-300 ease-entrance ${
              scrolled ? "h-12 lg:h-14" : "h-14 lg:h-16"
            }`}
            priority
          />
          <span className="font-display text-base font-semibold leading-tight text-navy-900 transition-colors group-hover:text-navy-700 sm:text-lg">
            {site.name}
            <span className="mt-0.5 block font-body text-[0.5625rem] font-medium uppercase tracking-[0.18em] text-gold-600 sm:text-[11px] sm:tracking-[0.2em]">
              Spring, Texas
            </span>
          </span>
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-7 lg:flex xl:gap-8">
          {navLinks.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                transitionTypes={[link.href === "/" ? "nav-back" : "nav-forward"]}
                aria-current={active ? "page" : undefined}
                className={`group relative py-2 text-sm font-semibold uppercase tracking-wide transition-colors ${
                  active ? "text-gold-700" : "text-navy-800 hover:text-gold-700"
                }`}
              >
                {link.label}
                {/* Underline grows from the centre on hover, stays put when active. */}
                <span
                  aria-hidden="true"
                  className={`absolute -bottom-0.5 left-0 h-0.5 w-full origin-center bg-gold-500 transition-transform duration-300 ease-entrance ${
                    active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                  }`}
                />
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-5 lg:flex">
          <a
            href={site.contact.phoneHref}
            className="text-sm font-semibold text-navy-800 transition-colors hover:text-gold-700"
          >
            {site.contact.phone}
          </a>
          <Link href="/donate" className="btn-primary">
            Donate
          </Link>
        </div>

        <button
          type="button"
          className="-mr-1.5 flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-navy-900 transition-colors hover:bg-navy-50 active:bg-navy-100 lg:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-menu"
        >
          <span className="relative block h-4 w-6">
            <span
              className={`absolute left-0 block h-0.5 w-6 rounded-full bg-current transition-all duration-300 ease-entrance ${
                open ? "top-[7px] rotate-45" : "top-0"
              }`}
            />
            <span
              className={`absolute left-0 top-[7px] block h-0.5 w-6 rounded-full bg-current transition-all duration-200 ${
                open ? "scale-x-0 opacity-0" : "scale-x-100 opacity-100"
              }`}
            />
            <span
              className={`absolute left-0 block h-0.5 w-6 rounded-full bg-current transition-all duration-300 ease-entrance ${
                open ? "top-[7px] -rotate-45" : "top-[14px]"
              }`}
            />
          </span>
        </button>
      </div>

      {/* Phone menu. Animated open/close via a 0fr→1fr grid row so it eases
          to its natural height without hard-coding one. Kept in the DOM and
          made inert when closed so focus never lands inside it. */}
      <div
        id="mobile-menu"
        inert={!open}
        className={`grid overflow-hidden border-t transition-all duration-300 ease-entrance lg:hidden ${
          open
            ? "grid-rows-[1fr] border-navy-900/10 opacity-100"
            : "pointer-events-none grid-rows-[0fr] border-transparent opacity-0"
        }`}
      >
        <div className="min-h-0">
          <nav
            aria-label="Mobile"
            className="container-page max-h-[calc(100dvh-5rem)] overflow-y-auto overscroll-contain py-2"
          >
            {/* Prayer times is the single most common reason for a phone
                visit, so it leads the menu as a distinguished tile rather
                than sitting as one of seven equal-weight links. */}
            <Link
              href={PRAYER_HREF}
              transitionTypes={["nav-forward"]}
              onClick={() => setOpen(false)}
              aria-current={pathname === PRAYER_HREF ? "page" : undefined}
              className="mt-2 flex min-h-[3.5rem] items-center gap-3 rounded-2xl bg-navy-950 px-4 text-cream-100 shadow-soft ring-1 ring-gold-500/30 transition-colors active:bg-navy-900"
            >
              <StarGlyph className="h-5 w-5 shrink-0 text-gold-300" />
              <span className="min-w-0 flex-1">
                <span className="block text-base font-semibold uppercase tracking-wide">
                  Salah Times
                </span>
                <span className="block text-[0.6875rem] font-medium uppercase tracking-[0.18em] text-gold-300">
                  Today&apos;s full schedule
                </span>
              </span>
              <span aria-hidden="true" className="shrink-0 text-gold-300">
                &rarr;
              </span>
            </Link>

            <ul className="mt-2 divide-y divide-navy-900/[0.07]">
              {otherLinks.map((link) => {
                const active = pathname === link.href;
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      transitionTypes={[link.href === "/" ? "nav-back" : "nav-forward"]}
                      aria-current={active ? "page" : undefined}
                      onClick={() => setOpen(false)}
                      className={`flex min-h-[3.25rem] items-center gap-3 text-base font-semibold uppercase tracking-wide transition-colors ${
                        active ? "text-gold-700" : "text-navy-800"
                      }`}
                    >
                      <span
                        aria-hidden="true"
                        className={`h-1.5 w-1.5 rotate-45 shrink-0 transition-colors ${
                          active ? "bg-gold-500" : "bg-navy-200"
                        }`}
                      />
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>

            <div className="mt-4 space-y-3 pb-5">
              <a
                href={site.contact.phoneHref}
                className="flex min-h-[3rem] items-center justify-center gap-2 rounded-full bg-cream-200 text-base font-semibold text-navy-900 transition-colors active:bg-cream-100"
              >
                {site.contact.phone}
              </a>
              <Link
                href="/donate"
                onClick={() => setOpen(false)}
                className="btn-primary w-full"
              >
                Donate
              </Link>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
