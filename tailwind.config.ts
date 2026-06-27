import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "#0D1117",
        card: "#161B22",
        border: "#30363D",
        text: "#C9D1D9",
        muted: "#8B949E",
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
