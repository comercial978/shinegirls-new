import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ink: "#171318",
        charcoal: "#2f2931",
        pearl: "#fffaf8",
        blush: "#ffe0ef",
        rose: "#e83f8f",
        wine: "#9d174d",
        copper: "#b97855",
        mist: "#e9edf0",
        sage: "#81927f",
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "Arial", "sans-serif"],
      },
      boxShadow: {
        soft: "0 24px 80px rgba(47, 41, 49, 0.12)",
      },
    },
  },
  plugins: [],
};

export default config;
