import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      colors: {
        glass: {
          DEFAULT: "rgba(255,255,255,0.7)",
          border: "rgba(255,255,255,0.4)",
        },
      },
      backgroundImage: {
        "liquid-primary":
          "linear-gradient(120deg, #2563eb 0%, #6366f1 50%, #22d3ee 100%)",
        "liquid-soft":
          "linear-gradient(135deg, rgba(37,99,235,0.12) 0%, rgba(99,102,241,0.10) 50%, rgba(34,211,238,0.12) 100%)",
        "mesh":
          "radial-gradient(at 0% 0%, rgba(37,99,235,0.18) 0px, transparent 55%), radial-gradient(at 98% 10%, rgba(34,211,238,0.16) 0px, transparent 50%), radial-gradient(at 50% 100%, rgba(99,102,241,0.14) 0px, transparent 55%)",
      },
      boxShadow: {
        glass: "0 8px 32px 0 rgba(31,38,135,0.10)",
        "glass-lg": "0 20px 60px -10px rgba(31,38,135,0.18)",
        "glow-blue": "0 0 0 1px rgba(37,99,235,0.20), 0 8px 30px rgba(37,99,235,0.28)",
        "glow-green": "0 0 24px rgba(34,197,94,0.45)",
      },
      borderRadius: {
        "4xl": "2rem",
      },
      backdropBlur: {
        xs: "2px",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        },
        "pulse-ring": {
          "0%": { boxShadow: "0 0 0 0 rgba(34,197,94,0.5)" },
          "70%": { boxShadow: "0 0 0 12px rgba(34,197,94,0)" },
          "100%": { boxShadow: "0 0 0 0 rgba(34,197,94,0)" },
        },
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        shimmer: "shimmer 6s ease infinite",
        "pulse-ring": "pulse-ring 2s ease-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
