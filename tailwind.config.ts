import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: ['selector', '[data-theme="dark"]'],
  theme: {
    extend: {
      animation: {
        'slow-spin': 'spin 80s linear infinite',
        'slower-spin': 'spin 100s linear infinite',
      },
      fontFamily: {
        sans: ['var(--font-geist-sans)'],
        mono: ['var(--font-geist-mono)'],
      },
      colors: {
        background: 'var(--color-background)',
        foreground: 'var(--color-foreground)',
      }
    },
  },
  plugins: [],
};
export default config;
