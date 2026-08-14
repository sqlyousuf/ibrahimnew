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
        },
        cream: {
          50: "#fdfcfa",
          100: "#faf7f0",
          200: "#f3ede0",
        },
      },
      fontFamily: {
        display: ["var(--font-playfair)", "serif"],
        body: ["var(--font-inter)", "sans-serif"],
        arabic: ["var(--font-amiri)", "serif"],
      },
      // Fluid display scale — one ramp shared by every page so headings
      // stay in proportion from 375px phones up to wide desktops.
      fontSize: {
        "display-xl": [
          "clamp(2.125rem, 6.4vw, 4.25rem)",
          { lineHeight: "1.08", letterSpacing: "-0.021em" },
        ],
        "display-lg": [
          "clamp(1.875rem, 4.4vw, 3rem)",
          { lineHeight: "1.13", letterSpacing: "-0.018em" },
        ],
        "display-md": [
          "clamp(1.5rem, 3.1vw, 2.25rem)",
          { lineHeight: "1.19", letterSpacing: "-0.015em" },
        ],
        "display-sm": [
          "clamp(1.25rem, 2.1vw, 1.5rem)",
          { lineHeight: "1.26", letterSpacing: "-0.01em" },
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
      },
      transitionTimingFunction: {
        entrance: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
      keyframes: {
        "fade-up": {
          from: { opacity: "0", transform: "translate3d(0, 14px, 0)" },
          to: { opacity: "1", transform: "translate3d(0, 0, 0)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.6s cubic-bezier(0.22, 1, 0.36, 1) both",
      },
    },
  },
  plugins: [],
};

export default config;
