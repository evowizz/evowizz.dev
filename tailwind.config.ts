import type { Config } from "tailwindcss";

const oklch = (cssVar: string) => `oklch(var(${cssVar}) / <alpha-value>)`;

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
            DEFAULT: oklch('--theme-base-white-raw'),
            soft: oklch('--theme-base-white-soft-raw'),
            softer: oklch('--theme-base-white-softer-raw'),
          },
          black: {
            DEFAULT: oklch('--theme-base-black-raw'),
            soft: oklch('--theme-base-black-soft-raw'),
            softer: oklch('--theme-base-black-softer-raw'),
          },
        },
        background: oklch('--color-background'),
        'background-inv': oklch('--color-background-inv'),
        foreground: oklch('--color-foreground'),
        'foreground-inv': oklch('--color-foreground-inv'),
        accent: oklch('--color-accent'),
        'accent-inv': oklch('--color-accent-inv'),
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
