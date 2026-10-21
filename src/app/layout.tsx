import type { Metadata, Viewport } from "next";
import { Amiri, Aref_Ruqaa, Cormorant_Garamond, Manrope } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PrayerQuickBar from "@/components/PrayerQuickBar";
import SmoothScrollProvider from "@/components/motion/SmoothScrollProvider";
import CustomCursor from "@/components/motion/CustomCursor";
import Preloader from "@/components/motion/Preloader";
import ScrollProgressStar from "@/components/motion/ScrollProgressStar";
import { getPrayerBoard } from "@/lib/prayerTimes";
import { site } from "@/lib/site";

/**
 * Prayer times are resolved per render from date-keyed data, so the pages
 * regenerate periodically rather than freezing today's times at build time.
 */
export const revalidate = 1800;

// Body/UI face — a quiet geometric sans that stays crisp at small sizes on
// phone screens, so the serif can carry all the ceremony.
const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

// Display face — high-contrast Garamond with a true italic, used large and
// sparingly. Its small x-height is why the display scale runs a step bigger.
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

// Arabic reading text (names, short phrases set inline with English).
const amiri = Amiri({
  subsets: ["arabic"],
  weight: ["400"],
  variable: "--font-amiri",
  display: "swap",
});

// Calligraphic Ruq'ah — ornamental Arabic only (greetings, section marks),
// never body copy.
const ruqaa = Aref_Ruqaa({
  subsets: ["arabic"],
  weight: ["400", "700"],
  variable: "--font-ruqaa",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | ${site.tagline}`,
    template: `%s | ${site.name}`,
  },
  description:
    "Masjid Ibrahim in Spring, Texas is a center for salah, Islamic education, and community — home to Quran Maktab, WISE Sunday School, and YM Ibrahim youth programs.",
  openGraph: {
    title: site.name,
    description: site.tagline,
    url: site.url,
    siteName: site.name,
    images: ["/brand/logo-navy-bg.jpg"],
    locale: "en_US",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#060a17",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
  // Never trap a visitor who needs to zoom.
  maximumScale: 5,
};

/**
 * Gates the entire cinematic motion system (Reveal, ParallaxLayer,
 * HorizontalRail, the custom cursor, Lenis) — see motionGate.ts. Runs before
 * hydration so there's never a flash of motion-ready content that then has
 * to be walked back. Without this class nothing animates and everything
 * renders in its normal, final state, so content can't be hidden by a JS
 * failure or a reduced-motion preference.
 */
const revealReady = `try{if('IntersectionObserver' in window&&!window.matchMedia('(prefers-reduced-motion: reduce)').matches){document.documentElement.classList.add('reveal-ready')}}catch(e){}`;

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const prayerBoard = await getPrayerBoard();

  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${manrope.variable} ${cormorant.variable} ${amiri.variable} ${ruqaa.variable}`}
      // The inline script below mutates this element's classList before React
      // hydrates (that's the point — it must run pre-paint to avoid a flash of
      // un-revealed content). That intentional, expected mismatch is exactly
      // what suppressHydrationWarning exists for.
      suppressHydrationWarning
    >
      <body className="flex min-h-screen flex-col">
        <script dangerouslySetInnerHTML={{ __html: revealReady }} />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-navy-975 focus:px-5 focus:py-3 focus:text-sm focus:font-semibold focus:text-cream-100"
        >
          Skip to content
        </a>
        <SmoothScrollProvider>
          <Preloader />
          <CustomCursor />
          <ScrollProgressStar />
          <Header />
          <main id="main" className="flex-1">
            {children}
          </main>
          <Footer />
          <PrayerQuickBar board={prayerBoard} />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
