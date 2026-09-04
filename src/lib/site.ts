export const site = {
  name: "Masjid Ibrahim",
  tagline: "A Place of Worship, Learning, and Community",
  url: "https://masjidibrahimspring.org",
  address: {
    line1: "5500 Farm to Market 2920",
    line2: "Spring, TX 77388, USA",
    full: "5500 Farm to Market 2920, Spring, TX 77388, USA",
    mapsQuery: "5500+FM+2920+Rd+Spring+TX+77388",
  },
  contact: {
    phone: "+1 (832) 743-8303",
    phoneHref: "tel:+18327438303",
    adminEmail: "admin@kleinislamiccenter.org",
    imamEmail: "imam@masjidibrahimspring.org",
  },
  donate: {
    url: "https://payments.madinaapps.com/masjidibrahimtx",
    zelle: "admin@kleinislamiccenter.org",
    campaign: {
      name: "Construction Phase 3",
      description: "Community Hall, Wudu Area & Restrooms",
      url: "https://www.zeffy.com/en-US/donation-form/masjid-ibrahim-construction-phase-3-community-hall-wudu-area-restrooms",
    },
  },
  social: {
    youtube: "https://youtube.com/@masjidibrahimspring?si=kQO_mJbvC_37BC9f",
    /** Live/past broadcast streams tab, used by the header's "Watch Live" button. */
    youtubeLive: "https://www.youtube.com/@MasjidIbrahimSpring/streams",
    facebook: "https://www.facebook.com/KICMASJID",
    instagram: "https://www.instagram.com/masjid.ibrahim.spring.tx?igsh=NW51anNuZGcwdG9v",
  },
};

export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/prayer-times", label: "Salah Times" },
  { href: "/institute", label: "Institute" },
  { href: "/events", label: "This Week" },
  { href: "/gallery", label: "Gallery" },
  { href: "/contact", label: "Contact" },
];

export const leadership = [
  {
    name: "Imam Yousuf Ahmed",
    role: "Resident Imam",
    bio: [
      "Imam Yousuf Ahmed is a passionate and community-driven leader who began his journey in Islamic education by memorizing the Qur'an under the guidance of Mawlana Kashif Ahmed (Imam of Irving Masjid). He went on to complete the 'Alimiyyah program at the Institute of Islamic Education (IIE), receiving comprehensive training in classical Islamic sciences.",
      "Deeply invested in teaching, mentorship, and youth engagement, Imam Yousuf has served as an Imam, Islamic educator, and youth coordinator, connecting Islamic teachings to modern-day realities through impactful talks and educational programs in the greater Houston area for the past 7 years.",
      "Originally from Karachi, Pakistan, Imam Yousuf brings not only a commitment to spiritual growth, but also a warm and relatable personality. He enjoys meaningful community interaction and finds joy in helping others grow through faith and connection.",
    ],
    image:
      "https://images.unsplash.com/photo-1758618079913-b6b631637ad9?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Dr. Mamdouh Moustafa Mahmoud",
    role: "Senior Imam · Head of AQI Department, HQA Spring",
    bio: [
      "Al-Azhar graduate with a Ph.D. in Islamic Studies, focused on marriage and divorce.",
      "Holds several ijazahs (certifications) in the Qira'at of the Qur'an, books of Hadith, and many other traditional Islamic sciences.",
      "Texas mediator/arbitrator and public speaker, bringing decades of scholarship to the community.",
    ],
    image:
      "https://images.unsplash.com/photo-1577561426384-62154a1e9457?auto=format&fit=crop&w=800&q=80",
  },
];

export const programs = [
  {
    slug: "maktab",
    name: "Quran Maktab",
    subtitle: "Quran Nazira · Hifdh · Dua and Salat",
    audience: "Boys and girls, ages 5 and up",
    schedule: "Monday to Thursday, 5:30 PM – 7:30 PM",
    // Structured recurrence for the This Week calendar (0=Sun..6=Sat) — keep
    // in sync with `schedule` above, which is the human-readable version
    // used on the Institute page.
    calendar: { daysOfWeek: [1, 2, 3, 4], time: "5:30 PM – 7:30 PM" },
    location: "5500 FM 2920 Rd, Spring, TX 77388",
    supervisors: ["Ustadh Shaykh Yousuf Ahmed", "Ustadha Sajida Lashkarwala"],
    price: "$75/month per child",
    cta: "Enroll Now",
    enrollUrl:
      "https://docs.google.com/forms/d/e/1FAIpQLSfsdSi_SULF16vhWa4NVXXOv-LTksnqVphvah0gdSWqCMQ2Xw/viewform?usp=send_form",
    image:
      "https://images.unsplash.com/photo-1703492897922-befb3b3d148c?auto=format&fit=crop&w=1200&q=80",
  },
  {
    slug: "wise",
    name: "WISE Sunday School",
    subtitle: "Weekend Islamic School Education",
    audience: "Children ages 5–12",
    schedule: "Sundays, 11:00 AM – 2:00 PM",
    calendar: { daysOfWeek: [0], time: "11:00 AM – 2:00 PM" },
    location: "Masjid Ibrahim, 5500 Farm to Market 2920, Spring, TX 77388",
    description:
      "To nurture a love for Islam while building foundational knowledge in Quran, Islamic Studies, and Arabic in an engaging and developmentally appropriate manner.",
    price: "$50/month",
    cta: "Enroll Now",
    enrollUrl:
      "https://docs.google.com/forms/u/0/d/1YiDp7cjhhnoAUcP---u3n8nc6A82e3j1JdjW-QypSCk/viewform?edit_requested=true",
    image:
      "https://images.unsplash.com/photo-1684335269060-55d7440b5d8c?auto=format&fit=crop&w=1200&q=80",
  },
  {
    slug: "ym-ibrahim",
    name: "YM Ibrahim",
    subtitle: "Youth Ministry for Brothers 13–25",
    audience: "Brothers ages 13–25",
    schedule: "Every Saturday from 3:30 PM",
    calendar: { daysOfWeek: [6], time: "From 3:30 PM" },
    location: "5500 FM 2920, Spring, TX 77388 · 11815 Adel Rd, Houston, TX 77067",
    description:
      "Activities, halaqa, and food. For up-to-date locations and timings, join the WhatsApp group.",
    price: "Free",
    cta: "Join WhatsApp Group",
    enrollUrl: "https://chat.whatsapp.com/KjXpwInKxQiH6Ha6Z2Vr3O",
    image:
      "https://images.unsplash.com/photo-1779903596788-0004e2a2680c?auto=format&fit=crop&w=1200&q=80",
  },
];

// Administrative services alongside the youth/education programs above.
export const services = [
  {
    slug: "nikah",
    name: "Nikah Service",
    description:
      "Islamic marriage ceremonies officiated by our imams, with guidance through the process from start to finish.",
  },
  {
    slug: "financial-aid",
    name: "Financial Aid Application",
    description:
      "Support for community members facing financial hardship. Reach out to the masjid office to start an application.",
  },
];

export const testimonials = [
  {
    name: "Ahmed S.",
    quote:
      "The Sunday School and youth classes have been a blessing for my children. They not only learn Quranic teachings but also develop strong moral values that guide them in their daily lives.",
  },
  {
    name: "Omar R.",
    quote:
      "Masjid Ibrahim has been more than just a place of worship for me and my family. The knowledgeable teachers and engaging programs have helped us grow spiritually and strengthen our connection with Islam.",
  },
  {
    name: "Muhammad H.",
    quote:
      "From daily prayers to community events, Masjid Ibrahim has provided a space where I truly feel at home. The sense of brotherhood and support here is unmatched.",
  },
];

type CalendarEventBase = {
  slug: string;
  title: string;
  /** e.g. "7:00 PM – 8:30 PM" or "After Maghrib". */
  time?: string;
  location?: string;
  description: string;
  /**
   * The poster/flier graphic itself, if there is one — most entries won't
   * have one. `alt` should describe the flier's content in words (screen
   * readers can't read text baked into an image); title/time/description
   * carry that information as real text regardless, so nothing here is
   * image-only.
   */
  flier?: { src: string; alt: string };
};

/** Repeats every week on the given days. */
type RecurringCalendarEvent = CalendarEventBase & {
  recurrence: "weekly";
  /** 0 = Sunday .. 6 = Saturday. */
  daysOfWeek: number[];
};

/** A single, specific-date happening. */
type OneOffCalendarEvent = CalendarEventBase & {
  recurrence: "once";
  /** ISO date, YYYY-MM-DD. */
  date: string;
};

/**
 * "This Week at Masjid Ibrahim" — one-off and ad-hoc-recurring entries for
 * the calendar (see WeekCalendar.tsx). The Institute's three core programs
 * (Quran Maktab, WISE, YM Ibrahim, above) also appear on the calendar
 * automatically via their own `calendar` field — this type doesn't cover
 * them.
 *
 * Unlike the rest of this file, entries of this type are **not** stored
 * here in code — they live in Vercel Blob, managed through the /admin
 * panel (see src/lib/calendarStore.ts and src/app/admin/). This type is
 * still the shared shape both sides agree on:
 *
 * - `slug` — unique, kebab-case.
 * - `time` — a free-text display string, written the way a visitor should
 *   read it, not a machine format.
 * - `recurrence: "once"` + `date` (ISO YYYY-MM-DD) for a specific-date
 *   happening — it only shows on the week containing that date, and drops
 *   off on its own afterward.
 * - `recurrence: "weekly"` + `daysOfWeek` for anything recurring that isn't
 *   already one of the three core programs above.
 * - `flier`'s `alt` must describe the flier in words — never a filename or
 *   generic placeholder, since screen readers can't read text baked into
 *   the image. Most entries won't have a flier at all, and that's fine.
 */
export type CalendarEvent = RecurringCalendarEvent | OneOffCalendarEvent;

export const galleryImages = [
  {
    src: "https://images.unsplash.com/photo-1577561426384-62154a1e9457?auto=format&fit=crop&w=1200&q=80",
    alt: "Mosque interior with warm arches",
  },
  {
    src: "https://images.unsplash.com/photo-1742148534796-70b39f29bff6?auto=format&fit=crop&w=1200&q=80",
    alt: "Minaret silhouette at sunset",
  },
  {
    src: "https://images.unsplash.com/photo-1758618079913-b6b631637ad9?auto=format&fit=crop&w=1200&q=80",
    alt: "Mosque dome and minaret against the sky",
  },
  {
    src: "https://images.unsplash.com/photo-1761640864240-f793d7ec8348?auto=format&fit=crop&w=1200&q=80",
    alt: "Congregants praying together",
  },
  {
    src: "https://images.unsplash.com/photo-1703492897922-befb3b3d148c?auto=format&fit=crop&w=1200&q=80",
    alt: "Open Quran close up",
  },
  {
    src: "https://images.unsplash.com/photo-1755518346374-8698aef237b8?auto=format&fit=crop&w=1200&q=80",
    alt: "Mosque minaret against a pale sky",
  },
  {
    src: "https://images.unsplash.com/photo-1684335269060-55d7440b5d8c?auto=format&fit=crop&w=1200&q=80",
    alt: "Child studying and writing",
  },
  {
    src: "https://images.unsplash.com/photo-1593113646773-028c64a8f1b8?auto=format&fit=crop&w=1200&q=80",
    alt: "Volunteers packing donation boxes",
  },
];
