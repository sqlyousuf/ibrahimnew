import type { Metadata } from "next";
import type { ReactNode } from "react";
import Reveal from "@/components/Reveal";
import PageTransition from "@/components/motion/PageTransition";
import SharePageButton from "@/components/connect/SharePageButton";
import { StarGlyph } from "@/components/Ornament";
import { site } from "@/lib/site";

/**
 * The page behind the printed QR code (public/brand/connect-qr.*). Everyone
 * here has just scanned with a phone, so it is one column of big tap targets.
 * The QR code points at /connect itself, so links can change here at any
 * time without reprinting anything.
 */

export const metadata: Metadata = {
  title: "Stay Connected",
  description:
    "Join the Masjid Ibrahim WhatsApp community, follow us on YouTube, Facebook, and Instagram, donate, and find salah times and directions — all in one place.",
};

type ConnectLink = {
  title: string;
  description: string;
  href: string;
  /** Leaves this site (opens in a new tab so the visitor can come back). */
  external?: boolean;
  icon: ReactNode;
  /** A second, smaller action on the same row. */
  secondary?: { label: string; href: string };
};

const icons = {
  whatsapp: (
    <>
      <path d="M3.5 20.5l1.3-4.2A8.5 8.5 0 1 1 8 19.4l-4.5 1.1Z" />
      <path d="M9 8.6c.2-.5.5-.6.8-.6h.5c.2 0 .4.1.5.4l.7 1.7c.1.2 0 .5-.1.6l-.5.6c-.1.1-.1.3 0 .5.6 1.1 1.4 1.9 2.5 2.5.2.1.4.1.5 0l.6-.6c.2-.2.4-.2.6-.1l1.7.8c.2.1.3.3.3.5v.4c0 .4-.2.8-.6 1-.6.3-1.4.5-2.4.1a9.6 9.6 0 0 1-4.9-4.9c-.4-1-.3-1.9.1-2.5" />
    </>
  ),
  youtube: (
    <path
      fill="currentColor"
      stroke="none"
      d="M21.6 7.2a2.7 2.7 0 0 0-1.9-1.9C18 5 12 5 12 5s-6 0-7.7.3a2.7 2.7 0 0 0-1.9 1.9A28 28 0 0 0 2 12a28 28 0 0 0 .4 4.8 2.7 2.7 0 0 0 1.9 1.9C6 19 12 19 12 19s6 0 7.7-.3a2.7 2.7 0 0 0 1.9-1.9A28 28 0 0 0 22 12a28 28 0 0 0-.4-4.8ZM10 15V9l5 3-5 3Z"
    />
  ),
  facebook: (
    <path
      fill="currentColor"
      stroke="none"
      d="M13.5 21v-7.5h2.5l.4-3h-2.9V8.4c0-.9.2-1.5 1.5-1.5h1.6V4.2C16.3 4.1 15.3 4 14.2 4c-2.4 0-4.1 1.5-4.1 4.1v2.4H7.5v3H10V21h3.5Z"
    />
  ),
  instagram: (
    <>
      <rect x="3.5" y="3.5" width="17" height="17" rx="4.5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
    </>
  ),
  heart: (
    <path d="M19 14c1.5-1.5 3-3.2 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.8 0-3 .5-4.5 2-1.5-1.5-2.7-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4 3 5.5l7 7Z" />
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </>
  ),
  calendar: (
    <>
      <rect x="3" y="4.5" width="18" height="16" rx="2" />
      <path d="M16 2.5v4M8 2.5v4M3 10h18" />
    </>
  ),
  book: (
    <>
      <path d="M2 4h6a4 4 0 0 1 4 4v13a3 3 0 0 0-3-3H2Z" />
      <path d="M22 4h-6a4 4 0 0 0-4 4v13a3 3 0 0 1 3-3h7Z" />
    </>
  ),
  pin: (
    <>
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </>
  ),
  phone: (
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92Z" />
  ),
  mail: (
    <>
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </>
  ),
};

const groups: { eyebrow: string; title: string; links: ConnectLink[] }[] = [
  {
    eyebrow: "Community",
    title: "Join & follow",
    links: [
      {
        title: "WhatsApp Community",
        description: "Announcements and reminders from the masjid, on your phone.",
        href: site.social.whatsapp,
        external: true,
        icon: icons.whatsapp,
      },
      {
        title: "YouTube",
        description: "Khutbahs, lectures, and livestreams.",
        href: "https://www.youtube.com/@MasjidIbrahimSpring",
        external: true,
        icon: icons.youtube,
        secondary: {
          label: "Subscribe",
          href: "https://www.youtube.com/@MasjidIbrahimSpring?sub_confirmation=1",
        },
      },
      {
        title: "Facebook",
        description: "Community events and announcements.",
        href: site.social.facebook,
        external: true,
        icon: icons.facebook,
      },
      {
        title: "Instagram",
        description: "Moments, events, and community highlights.",
        href: site.social.instagram,
        external: true,
        icon: icons.instagram,
      },
    ],
  },
  {
    eyebrow: "At the Masjid",
    title: "Pray, learn, gather",
    links: [
      {
        title: "Salah Times",
        description: "Today's prayer and iqamah times, and the week ahead.",
        href: "/prayer-times",
        icon: icons.clock,
      },
      {
        title: "This Week",
        description: "Classes, halaqas, and events happening this week.",
        href: "/events",
        icon: icons.calendar,
      },
      {
        title: "Institute",
        description: "Quran Maktab, WISE Sunday School, YM Ibrahim, and more.",
        href: "/institute",
        icon: icons.book,
      },
    ],
  },
  {
    eyebrow: "Visit & Contact",
    title: "Find us",
    links: [
      {
        title: "Directions",
        description: site.address.full,
        href: `https://www.google.com/maps/dir/?api=1&destination=${site.address.mapsQuery}`,
        external: true,
        icon: icons.pin,
      },
      {
        title: "Call the Office",
        description: site.contact.phone,
        href: site.contact.phoneHref,
        icon: icons.phone,
      },
      {
        title: "Email the Office",
        description: "Send masjid administration a question.",
        href: `mailto:${site.contact.adminEmail}`,
        icon: icons.mail,
      },
    ],
  },
];

const faqs = [
  {
    q: "Will scanning the QR code add me to a group?",
    a: "No. The QR code only opens this page. You choose which group or channel to open, and WhatsApp will ask you to confirm before you join anything.",
  },
  {
    q: "Can I share this page with family and friends?",
    a: "Yes, please do. Tap “Share this page” below to send it by WhatsApp, text, or email.",
  },
];

function Icon({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {children}
    </svg>
  );
}

function LinkRow({ link }: { link: ConnectLink }) {
  const ext = link.external
    ? { target: "_blank", rel: "noopener noreferrer" }
    : {};
  return (
    <li className="relative flex items-center gap-4 px-4 py-4 transition-colors hover:bg-cream-100/70 sm:px-6 sm:py-5">
      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-navy-950 text-gold-200 ring-1 ring-gold-300/25">
        <Icon className="h-5 w-5">{link.icon}</Icon>
      </span>
      <span className="min-w-0 flex-1">
        {/* The overlay makes the whole row the tap target for the main link. */}
        <a
          href={link.href}
          {...ext}
          className="block font-display text-[1.25rem] font-semibold leading-tight text-navy-900 after:absolute after:inset-0 after:content-[''] sm:text-[1.375rem]"
        >
          {link.title}
          {link.external && <span className="sr-only"> (opens in a new tab)</span>}
        </a>
        <span className="mt-1 block text-[0.8125rem] leading-snug text-navy-600 sm:text-sm">
          {link.description}
        </span>
      </span>
      {link.secondary ? (
        <a
          href={link.secondary.href}
          target="_blank"
          rel="noopener noreferrer"
          className="relative z-10 inline-flex min-h-[2.75rem] shrink-0 items-center rounded-full border border-gold-600/35 px-4 text-[0.6875rem] font-bold uppercase tracking-[0.14em] text-navy-900 transition-colors hover:border-gold-500 hover:text-gold-700"
        >
          {link.secondary.label}
        </a>
      ) : (
        <Icon className="h-4 w-4 shrink-0 text-gold-600">
          {link.external ? <path d="M7 17 17 7M8 7h9v9" /> : <path d="m9 6 6 6-6 6" />}
        </Icon>
      )}
    </li>
  );
}

export default function ConnectPage() {
  return (
    <PageTransition>
      {/* No hero: a scanned QR code should land straight on the links. */}
      <section className="container-page pb-12 pt-8 sm:pb-16 sm:pt-12">
        <h1 className="sr-only">Stay connected with {site.name}</h1>
        <div className="mx-auto max-w-2xl space-y-8 sm:space-y-10">
          {groups.map((group, i) => (
            <Reveal key={group.title} delay={i * 60}>
              <p className="section-eyebrow">{group.eyebrow}</p>
              <h2 className="mt-2 font-display text-[1.625rem] font-semibold leading-tight text-navy-900 sm:text-[2rem]">
                {group.title}
              </h2>
              <ul className="card mt-4 divide-y divide-navy-900/[0.07] overflow-hidden">
                {group.links.map((link) => (
                  <LinkRow key={link.title} link={link} />
                ))}
              </ul>
            </Reveal>
          ))}

          <Reveal>
            <div className="card-dark p-5 sm:p-7">
              <p className="section-eyebrow text-gold-300 before:bg-gold-400">
                Support the Masjid
              </p>
              <h2 className="mt-2 flex items-start gap-2.5 font-display text-[1.5rem] font-semibold leading-tight text-white sm:text-[1.75rem]">
                <StarGlyph className="mt-1 h-4 w-4 shrink-0 text-gold-300" />
                <span>Every gift keeps the doors open</span>
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-cream-100/80">
                Donations are tax-deductible through {site.donate.nonprofit.name},
                a 501(c)(3) nonprofit (EIN {site.donate.nonprofit.ein}).
              </p>
              <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                <a href={site.donate.url} target="_blank" rel="noopener noreferrer" className="btn-primary">
                  Donate Now
                </a>
                <a href="/donate" className="btn-outline">
                  Other ways to give
                </a>
              </div>
            </div>
          </Reveal>

          <Reveal>
            <p className="section-eyebrow">Common Questions</p>
            <div className="card mt-4 divide-y divide-navy-900/[0.07]">
              {faqs.map((faq) => (
                <details key={faq.q} className="group px-5 py-4 sm:px-7">
                  <summary className="flex min-h-[2.75rem] cursor-pointer list-none items-center justify-between gap-4 font-semibold text-navy-900 [&::-webkit-details-marker]:hidden">
                    {faq.q}
                    <Icon className="h-4 w-4 shrink-0 text-gold-600 transition-transform group-open:rotate-180">
                      <path d="m6 9 6 6 6-6" />
                    </Icon>
                  </summary>
                  <p className="pb-1 pt-2 text-sm leading-relaxed text-navy-700">{faq.a}</p>
                </details>
              ))}
            </div>
          </Reveal>

          <div className="flex justify-center">
            <SharePageButton
              className="btn-outline-navy"
              title={`Stay connected with ${site.name}`}
              text={`${site.name} links: WhatsApp, YouTube, social media, salah times, and more.`}
            />
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
