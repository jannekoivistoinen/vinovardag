import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        body: "var(--font-haskoy)",
        heading: "var(--font-cabinet-grotesk)",
      },
      colors: {
        "brand-dark": "#A77E16",
        "brand-primary": "#D3A01C",
        "brand-light": "#EBE0D6",
        "brand-brown": "#503825",
      },
    },
  },
  plugins: [require("@tailwindcss/typography"), require("tailwindcss-animate")],
};
export default config;
