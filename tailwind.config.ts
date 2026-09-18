import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#0A0B0D",
        raised: "#121418",
        line: "#1E232B",
        fg: "#EDEFF2",
        muted: "#8A919C",
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
