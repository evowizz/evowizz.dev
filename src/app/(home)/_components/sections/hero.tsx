import { ArrowRight } from '@/components/svg'
import Link from 'next/link'

export function Hero() {
  return (
    <div className="flex flex-col items-start gap-8">
      {/* Availability chip */}
      <div className="bg-surface-container-lowest border-outline-variant motion-safe:animate-hero-opacity inline-flex items-center gap-2 rounded-full border px-4 py-2">
        <span className="relative flex h-2.5 w-2.5 items-center justify-center">
          <span className="bg-tertiary absolute inline-flex h-full w-full animate-ping rounded-full opacity-75" />
          <span className="bg-tertiary relative inline-flex h-2 w-2 rounded-full" />
        </span>
        <span className="text-on-surface/70 text-xs font-medium tracking-wider uppercase">
          Available for hire
        </span>
      </div>

      {/* Main Headline */}
      <h1 className="text-6xl font-semibold tracking-tight">
        <span className="motion-safe:animate-hero-appear motion-safe:animation-delay-100 block motion-safe:opacity-0">
          Building
        </span>
        <span className="motion-safe:animate-hero-appear motion-safe:animation-delay-200 block motion-safe:opacity-0">
          <span className="text-primary font-serif italic">Android</span>
        </span>
        <span className="motion-safe:animate-hero-appear motion-safe:animation-delay-300 block motion-safe:opacity-0">
          experiences.
        </span>
      </h1>

      {/* Subtitle */}
      <p className="text-on-surface/60 border-on-surface/20 motion-safe:animate-hero-appear motion-safe:animation-delay-400 max-w-lg border-l-2 pl-4 text-lg motion-safe:opacity-0">
        Developer & Designer building intuitive experiences across Android, Web & beyond, with a
        focus on Material Design.
      </p>

      {/* CTA */}
      <Link
        href="#projects"
        className="group motion-safe:animate-hero-appear motion-safe:animation-delay-500 motion-effects-default inline-flex items-center gap-2 border-b border-current pb-1 text-base font-medium transition-all hover:gap-3 motion-safe:opacity-0"
      >
        See my work
        <ArrowRight className="motion-spatial-default h-4 w-4 transition-transform group-hover:translate-x-1" />
      </Link>

      {/* Scroll indicator */}
      <div className="motion-safe:animate-hero-appear motion-safe:animation-delay-700 mt-8 motion-safe:opacity-0">
        <svg
          className="text-on-surface/40 h-6 w-6 animate-bounce"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </div>
    </div>
  )
}
