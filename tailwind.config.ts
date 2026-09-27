import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      // Canonical palette. Static brand assets (app/icon.svg,
      // app/opengraph-image.tsx) hardcode the dark-theme values below
      // because they can't import TS — keep them in sync manually:
      // bg #0A0B0D, fg #EDEFF2, muted #8A919C, accent #3E7BFA,
      // accent-soft #7FA6FF, line #1E232B, ok #4ADE80, warn #F0A868.
      colors: {
        bg: "rgb(var(--bg) / <alpha-value>)",
        raised: "rgb(var(--raised) / <alpha-value>)",
        line: "rgb(var(--line) / <alpha-value>)",
        fg: "rgb(var(--fg) / <alpha-value>)",
        muted: "rgb(var(--muted) / <alpha-value>)",
        accent: "#3E7BFA",
        "accent-dim": "#16294F",
        "accent-soft": "#7FA6FF",
        ok: "#4ADE80",
        warn: "#F0A868",
      },
      fontFamily: {
        sans: ["var(--font-plex-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-plex-mono)", "ui-monospace", "monospace"],
      },
      backgroundImage: {
        blueprint:
          "linear-gradient(rgba(62,123,250,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(62,123,250,0.06) 1px, transparent 1px)",
      },
      backgroundSize: {
        grid: "32px 32px",
      },
      keyframes: {
        "count-up": {
          "0%": { transform: "translateY(6px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        blink: {
          "0%, 49%": { opacity: "1" },
          "50%, 100%": { opacity: "0" },
        },
      },
      animation: {
        "count-up": "count-up 220ms ease-out",
        blink: "blink 1s step-start infinite",
      },
    },
  },
  plugins: [],
};

export default config;
