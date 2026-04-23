import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      colors: {
        navy: {
          950: "#060d18",
          900: "#0d1b2a",
          800: "#132236",
          700: "#1a2f47",
          600: "#243d5c",
        },
        gold: {
          300: "#e8d5a3",
          400: "#d4af6a",
          500: "#c8a050",
          600: "#a8843a",
        },
      },
    },
  },
  plugins: [],
};
export default config;
