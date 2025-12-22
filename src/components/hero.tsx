'use client'

import { cn } from '@/lib/utils'
import { ArrowRight } from '@/components/svg'
import Link from 'next/link'

export function Hero() {
  return (
    <div className="flex flex-col items-start gap-8">
      {/* Availability chip */}
      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-on-surface/5 border border-on-surface/10 motion-safe:animate-hero-opacity">
        <span className="relative flex h-2.5 w-2.5 items-center justify-center">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-tertiary opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-tertiary" />
        </span>
        <span className="text-xs font-medium tracking-wider uppercase text-on-surface/70">
          Available for hire
        </span>
      </div>

      {/* Main Headline */}
      <h1 className="text-5xl md:text-7xl lg:text-8xl font-semibold tracking-tight">
        <span className="block motion-safe:animate-hero-appear motion-safe:opacity-0 motion-safe:animation-delay-100">
          Building
        </span>
        <span className="block motion-safe:animate-hero-appear motion-safe:opacity-0 motion-safe:animation-delay-200">
          <span className="italic font-serif text-primary">
            Android
          </span>
        </span>
        <span className="block motion-safe:animate-hero-appear motion-safe:opacity-0 motion-safe:animation-delay-300">
          experiences.
        </span>
      </h1>

      {/* Subtitle */}
      <p className="max-w-lg text-lg md:text-xl text-on-surface/60 border-l-2 border-on-surface/20 pl-4 motion-safe:animate-hero-appear motion-safe:opacity-0 motion-safe:animation-delay-400">
        Developer & Designer building intuitive experiences across Android, Web & beyond, with a
        focus on Material Design.
      </p>

      {/* CTA */}
      <Link
        href="#projects"
        className="group inline-flex items-center gap-2 text-base font-medium border-b border-current pb-1 hover:gap-3 transition-all duration-300 motion-safe:animate-hero-appear motion-safe:opacity-0 motion-safe:animation-delay-500"
      >
        See my work
        <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
      </Link>

      {/* Scroll indicator */}
      <div className="mt-8 motion-safe:animate-hero-appear motion-safe:opacity-0 motion-safe:animation-delay-700">
        <svg
          className="w-6 h-6 text-on-surface/40 animate-bounce"
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
