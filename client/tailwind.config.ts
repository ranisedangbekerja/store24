import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        press: ["'Press Start 2P'", "cursive"],
      },
      backgroundImage: {
        landing: "url('/documentation/landingpage pixel.jpg')",
        cloud: "url('/documentation/awan pixel.png')",
        "sun-cloud": "url('/documentation/awan matahari pixel.png')",
      },
    },
  },
  plugins: [],
};

export default config;
