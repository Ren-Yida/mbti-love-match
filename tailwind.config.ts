import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        petal: "#F47C9B",
        coral: "#FF8A6A",
        mint: "#79C7B8",
        ink: "#25232B",
        cream: "#FFF8F2"
      },
      boxShadow: {
        soft: "0 20px 60px rgba(65, 47, 54, 0.12)"
      }
    }
  },
  plugins: []
};

export default config;
