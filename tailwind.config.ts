import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "rgb(var(--app-background) / <alpha-value>)",
        card: "rgb(var(--app-card) / <alpha-value>)",
        border: "rgb(var(--app-border) / <alpha-value>)",
        text: "rgb(var(--app-text) / <alpha-value>)",
        muted: "rgb(var(--app-muted) / <alpha-value>)",
        orange: "#FF6B35",
        blue: "#004E89",
        teal: "#2EC4B6",
        red: "#E71D36"
      },
      boxShadow: {
        glow: "0 0 28px rgba(255, 107, 53, 0.18)"
      }
    }
  },
  plugins: []
};

export default config;
