"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { navLinks, site } from "@/lib/site";

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
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 bg-white/95 backdrop-blur transition-shadow ${
        scrolled ? "shadow-soft" : ""
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3 lg:px-8">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/brand/logo-white-bg.jpg"
            alt={site.name}
            width={48}
            height={60}
            className="h-12 w-auto"
            priority
          />
          <span className="hidden font-display text-lg font-semibold leading-tight text-navy-900 sm:block">
            {site.name}
            <span className="block font-body text-[11px] font-medium uppercase tracking-[0.2em] text-gold-600">
              Spring, Texas
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          {navLinks.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-semibold uppercase tracking-wide transition hover:text-gold-600 ${
                  active ? "text-gold-600" : "text-navy-800"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-4 lg:flex">
          <a href={site.contact.phoneHref} className="text-sm font-semibold text-navy-800 hover:text-gold-600">
            {site.contact.phone}
          </a>
          <Link href="/donate" className="btn-primary">
            Donate
          </Link>
        </div>

        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-navy-200 lg:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          <span className="relative block h-4 w-5">
            <span
              className={`absolute left-0 top-0 h-0.5 w-5 bg-navy-900 transition ${
                open ? "translate-y-[7px] rotate-45" : ""
              }`}
            />
            <span
              className={`absolute left-0 top-[7px] h-0.5 w-5 bg-navy-900 transition ${
                open ? "opacity-0" : ""
              }`}
            />
            <span
              className={`absolute left-0 top-[14px] h-0.5 w-5 bg-navy-900 transition ${
                open ? "-translate-y-[7px] -rotate-45" : ""
              }`}
            />
          </span>
        </button>
      </div>

      {open && (
        <div className="border-t border-navy-100 bg-white px-5 py-4 lg:hidden">
          <nav className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`py-1 text-base font-semibold uppercase tracking-wide ${
                  pathname === link.href ? "text-gold-600" : "text-navy-800"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <a href={site.contact.phoneHref} className="py-1 text-base font-semibold text-navy-800">
              {site.contact.phone}
            </a>
            <Link href="/donate" className="btn-primary mt-2 w-full">
              Donate
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
