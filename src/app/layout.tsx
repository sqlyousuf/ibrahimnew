import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display, Amiri } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PrayerQuickBar from "@/components/PrayerQuickBar";
import { getPrayerBoard } from "@/lib/prayerTimes";
import { site } from "@/lib/site";

/**
 * Prayer times are resolved per render from date-keyed data, so the pages
 * regenerate periodically rather than freezing today's times at build time.
 */
export const revalidate = 1800;

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const amiri = Amiri({
  subsets: ["arabic"],
  weight: ["400", "700"],
  variable: "--font-amiri",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | ${site.tagline}`,
    template: `%s | ${site.name}`,
  },
  description:
    "Masjid Ibrahim in Spring, Texas is a center for prayer, Islamic education, and community — home to daily salah, Quran Maktab, WISE Sunday School, and YM Ibrahim youth programs.",
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
  themeColor: "#0a1122",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
  // Never trap a visitor who needs to zoom.
  maximumScale: 5,
};

/**
 * Opt into scroll-reveal only when the browser can drive it and the visitor
 * has not asked for reduced motion. Without this class the reveal styles in
 * globals.css never apply, so content can't be hidden by a JS failure.
 */
const revealReady = `try{if('IntersectionObserver' in window&&!window.matchMedia('(prefers-reduced-motion: reduce)').matches){document.documentElement.classList.add('reveal-ready')}}catch(e){}`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${inter.variable} ${playfair.variable} ${amiri.variable}`}
    >
      <body className="flex min-h-screen flex-col">
        <script dangerouslySetInnerHTML={{ __html: revealReady }} />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-navy-950 focus:px-5 focus:py-3 focus:text-sm focus:font-semibold focus:text-cream-100"
        >
          Skip to content
        </a>
        <Header />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
        <PrayerQuickBar board={getPrayerBoard()} />
      </body>
    </html>
  );
}
