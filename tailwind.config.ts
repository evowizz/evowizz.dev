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
        'hero-appear': 'hero-slide 0.5s ease-in-out forwards, hero-opacity 0.5s ease-in-out forwards',
        'hero-slide': 'hero-slide 0.5s ease-in-out forwards',
        'hero-opacity': 'hero-opacity 0.5s ease-in-out forwards',
        'spin-slow': 'spin 48s linear infinite',
      },
      keyframes: {
        'hero-opacity': {
          from: { opacity: '0' },
          to: { opacity: '1' },
        }
      },
      transitionTimingFunction: {
        'slow-in': 'cubic-bezier(0, 0, 0, 1)',
        'slow-in-out': 'cubic-bezier(0.5, 0, 0.25, 1)',
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
