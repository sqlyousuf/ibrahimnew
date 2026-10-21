import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        navy: {
          50: "#eef1f8",
          100: "#d7deee",
          200: "#b0bddd",
          300: "#8698c4",
          400: "#5b70a3",
          500: "#3d5182",
          600: "#2a3c66",
          700: "#1f2d4f",
          800: "#16213d",
          900: "#101a30",
          950: "#0a1122",
          // Cinematic ground — the resting-black behind full-bleed scenes.
          // Darker than 950 so gold light reads as the one source in frame.
          975: "#060a17",
        },
        gold: {
          50: "#fbf7ee",
          100: "#f4e9cd",
          200: "#e9d29e",
          300: "#dcb56a",
          400: "#cd9c47",
          500: "#b8863a",
          600: "#996c2f",
          700: "#7a5528",
          800: "#654625",
          900: "#563c22",
          // Hot highlight — cursor glow, light-beam edges, loader trace.
          // Used sparingly; the working palette otherwise stops at 50-900.
          glow: "#f6dfae",
        },
        // Ivory paper — warm enough to read as parchment beside the gold,
        // never a flat white.
        cream: {
          50: "#fdfbf7",
          100: "#f8f4eb",
          200: "#efe7d6",
          300: "#e4d8bf",
        },
      },
      fontFamily: {
        display: ["var(--font-cormorant)", "Georgia", "serif"],
        body: ["var(--font-manrope)", "system-ui", "sans-serif"],
        arabic: ["var(--font-amiri)", "serif"],
        calligraphy: ["var(--font-ruqaa)", "var(--font-amiri)", "serif"],
      },
      // Fluid display scale — one ramp shared by every page so headings
      // stay in proportion from 375px phones up to wide desktops.
      fontSize: {
        // Cinematic hero scale only — one step above display-xl, reserved
        // for signature pinned-hero headlines.
        "display-hero": [
          "clamp(3.25rem, 12.5vw, 7.75rem)",
          { lineHeight: "0.98", letterSpacing: "-0.02em" },
        ],
        "display-xl": [
          "clamp(2.5rem, 7.5vw, 4.75rem)",
          { lineHeight: "1.04", letterSpacing: "-0.018em" },
        ],
        "display-lg": [
          "clamp(2.375rem, 5.6vw, 3.75rem)",
          { lineHeight: "1.06", letterSpacing: "-0.015em" },
        ],
        "display-md": [
          "clamp(2rem, 4vw, 2.875rem)",
          { lineHeight: "1.1", letterSpacing: "-0.012em" },
        ],
        "display-sm": [
          "clamp(1.5rem, 2.6vw, 1.875rem)",
          { lineHeight: "1.18", letterSpacing: "-0.008em" },
        ],
        lede: [
          "clamp(1.0625rem, 1.5vw, 1.1875rem)",
          { lineHeight: "1.7", letterSpacing: "-0.003em" },
        ],
      },
      backgroundImage: {
        "geometric-fade":
          "linear-gradient(180deg, rgba(10,17,34,0.85) 0%, rgba(16,26,48,0.92) 100%)",
      },
      // Single elevation ramp. `soft` is the resting state for every card on
      // the site; `lift` is its hover partner; `panel` is for large features.
      boxShadow: {
        soft: "0 1px 2px rgba(16,26,48,0.04), 0 10px 30px -18px rgba(16,26,48,0.30)",
        lift: "0 2px 6px rgba(16,26,48,0.05), 0 28px 50px -24px rgba(16,26,48,0.38)",
        panel:
          "0 2px 4px rgba(16,26,48,0.04), 0 32px 64px -28px rgba(16,26,48,0.42)",
        // Warm bloom for the one light source in a cinematic frame — cursor
        // dot, active nav glyph, loader star.
        glow: "0 0 1px rgba(246,223,174,0.8), 0 0 40px rgba(205,156,71,0.35)",
        // Gold-leaf button: a lit top edge plus a warm cast below.
        foil: "inset 0 1px 0 rgba(255,244,214,0.55), inset 0 -1px 0 rgba(122,85,40,0.35), 0 10px 28px -12px rgba(184,134,58,0.65)",
        // Midnight card floating on midnight — depth from a soft black pool.
        night: "0 1px 0 rgba(246,223,174,0.06) inset, 0 30px 60px -30px rgba(0,0,0,0.8)",
      },
      transitionTimingFunction: {
        entrance: "cubic-bezier(0.22, 1, 0.36, 1)",
        // Slower, more weighted than `entrance` — the GSAP-timeline pairing
        // for pinned/scrubbed cinematic reveals rather than quick UI hovers.
        cinematic: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
      keyframes: {
        "fade-up": {
          from: { opacity: "0", transform: "translate3d(0, 14px, 0)" },
          to: { opacity: "1", transform: "translate3d(0, 0, 0)" },
        },
        "star-spin": {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(360deg)" },
        },
        // Light passing across gold leaf.
        sheen: {
          "0%, 70%": { transform: "translateX(-120%) skewX(-20deg)" },
          "100%": { transform: "translateX(220%) skewX(-20deg)" },
        },
        "soft-pulse": {
          "0%, 100%": { opacity: "1", transform: "scale(1)" },
          "50%": { opacity: "0.45", transform: "scale(0.8)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.6s cubic-bezier(0.22, 1, 0.36, 1) both",
        "star-spin": "star-spin 16s linear infinite",
        "star-spin-slow": "star-spin 90s linear infinite",
        sheen: "sheen 6s cubic-bezier(0.22, 1, 0.36, 1) infinite",
        "soft-pulse": "soft-pulse 2.4s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
