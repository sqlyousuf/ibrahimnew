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
  },
  prayerWidget:
    "https://timing.athanplus.com/masjid/widgets/embed?theme=1&masjid_id=zKz3YnLO",
  social: {
    // Add links when available
  },
};

export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/prayer-times", label: "Prayer Times" },
  { href: "/institute", label: "Institute" },
  { href: "/events", label: "Events" },
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
    location: "5500 FM 2920 Rd, Spring, TX 77388",
    supervisors: ["Ustadh Shaykh Yousuf Ahmed", "Ustadha Sajida Lashkarwala"],
    cta: "Enroll Now",
    image:
      "https://images.unsplash.com/photo-1703492897922-befb3b3d148c?auto=format&fit=crop&w=1200&q=80",
  },
  {
    slug: "wise",
    name: "WISE Sunday School",
    subtitle: "Weekend Islamic School Education",
    audience: "Children ages 5–12",
    schedule: "Sundays, 11:00 AM – 2:00 PM",
    location: "Masjid Ibrahim, 5500 Farm to Market 2920, Spring, TX 77388",
    description:
      "To nurture a love for Islam while building foundational knowledge in Quran, Islamic Studies, and Arabic in an engaging and developmentally appropriate manner.",
    image:
      "https://images.unsplash.com/photo-1684335269060-55d7440b5d8c?auto=format&fit=crop&w=1200&q=80",
  },
  {
    slug: "ym-ibrahim",
    name: "YM Ibrahim",
    subtitle: "Youth Ministry for Brothers 13–25",
    audience: "Brothers ages 13–25",
    schedule: "Every Saturday from 3:30 PM",
    location: "5500 FM 2920, Spring, TX 77388 · 11815 Adel Rd, Houston, TX 77067",
    description:
      "Activities, halaqa, and food. For up-to-date locations and timings, join the WhatsApp group.",
    image:
      "https://images.unsplash.com/photo-1743417597339-f4bc72e2a8ba?auto=format&fit=crop&w=1200&q=80",
  },
];

export type MasjidEvent = {
  title: string;
  date: string;
  time?: string;
  description: string;
};

// No recurring events published yet — add entries here as they're confirmed.
export const events: MasjidEvent[] = [];

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
