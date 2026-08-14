import Image from "next/image";
import Link from "next/link";
import { navLinks, site } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="bg-navy-950 text-cream-100">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-16 lg:grid-cols-4 lg:px-8">
        <div>
          <Image
            src="/brand/logo-navy-bg.jpg"
            alt={site.name}
            width={72}
            height={90}
            className="h-16 w-auto"
          />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-cream-100/70">
            {site.tagline}. A center for prayer, learning, and service in
            Spring, Texas.
          </p>
        </div>

        <div>
          <h3 className="font-display text-sm font-semibold uppercase tracking-[0.2em] text-gold-400">
            Explore
          </h3>
          <ul className="mt-4 space-y-2 text-sm text-cream-100/80">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="hover:text-gold-300">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-display text-sm font-semibold uppercase tracking-[0.2em] text-gold-400">
            Contact
          </h3>
          <ul className="mt-4 space-y-3 text-sm text-cream-100/80">
            <li>{site.address.line1}</li>
            <li>{site.address.line2}</li>
            <li>
              <a href={site.contact.phoneHref} className="hover:text-gold-300">
                {site.contact.phone}
              </a>
            </li>
            <li>
              <a href={`mailto:${site.contact.adminEmail}`} className="hover:text-gold-300">
                {site.contact.adminEmail}
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-display text-sm font-semibold uppercase tracking-[0.2em] text-gold-400">
            Support the Masjid
          </h3>
          <p className="mt-4 text-sm text-cream-100/80">
            Your generosity sustains our prayers, programs, and community
            services.
          </p>
          <Link href="/donate" className="btn-primary mt-4">
            Donate Now
          </Link>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-5 py-6 text-xs text-cream-100/60 sm:flex-row lg:px-8">
          <p>
            &copy; {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
          <p>Built with care for our community.</p>
        </div>
      </div>
    </footer>
  );
}
