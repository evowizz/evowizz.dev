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
        base: {
          white: {
            DEFAULT: 'var(--theme-base-white)',
            soft: 'var(--theme-base-white-soft)',
            softer: 'var(--theme-base-white-softer)',
          },
          black: {
            DEFAULT: 'var(--theme-base-black)',
            soft: 'var(--theme-base-black-soft)',
            softer: 'var(--theme-base-black-softer)',
          },
        },
        background: 'var(--color-background)',
        'background-inv': 'var(--color-background-inv)',
        foreground: 'var(--color-foreground)',
        'foreground-inv': 'var(--color-foreground-inv)',
      },
      fontWeight: {
        100: '100',
        200: '200',
        300: '300',
        400: '400',
        500: '500',
        600: '600',
        700: '700',
        800: '800',
        900: '900',
      }
    },
  },
  plugins: [],
};
export default config;
