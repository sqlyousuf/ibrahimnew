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
      backgroundImage: {
        "geometric-fade":
          "linear-gradient(180deg, rgba(10,17,34,0.85) 0%, rgba(16,26,48,0.92) 100%)",
      },
      boxShadow: {
        soft: "0 10px 40px -12px rgba(16,26,48,0.25)",
      },
    },
  },
  plugins: [],
};

export default config;
