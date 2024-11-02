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
      keyframes: {
        dropDown: {
          '0%': { transform: 'translateY(-1000px)' },
          '100%': { transform: 'translateY(0px)' },
        },
        slideInFromRight: {
          '0%': { transform: 'translatex(500px)' },
          '100%': { transform: 'translatex(0px)' },
        },
      },
      animation: {
        dropDown: 'dropDown .35s ease-in-out',
        slideInFromRight: 'slideInFromRight .3s ease-in-out',
      },
      screens: {
        'xs': '480px'
      }
    },
  },
  plugins: [],
};
export default config;
