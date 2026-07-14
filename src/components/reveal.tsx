'use client'

import { useRef, type ReactNode } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(useGSAP, ScrollTrigger)

type RevealProps = {
  children: ReactNode
  className?: string
  /** Animate the direct children in sequence instead of the wrapper as a whole. */
  stagger?: boolean
  /** Seconds between each child when `stagger` is set. */
  staggerEach?: number
  /** Play on mount instead of when scrolled into view (for above-the-fold content). */
  immediate?: boolean
  /** Travel distance, in px. */
  y?: number
  /** Start delay, in seconds (only meaningful with `immediate`). */
  delay?: number
}

/**
 * The single motion primitive: a fade-and-rise reveal driven by GSAP. Honors
 * `prefers-reduced-motion` (the animation simply does not run, content stays
 * visible) and only touches `opacity` + `transform` so it stays on the
 * compositor. Use `immediate` for the hero and `stagger` to sequence a group.
 */
export function Reveal({
  children,
  className,
  stagger = false,
  staggerEach = 0.09,
  immediate = false,
  y = 28,
  delay = 0,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const el = ref.current
      if (!el) return

      const mm = gsap.matchMedia()
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const targets = stagger ? Array.from(el.children) : el
        // Explicit hidden start + explicit visible end (opacity 1, y 0) so the
        // reveal survives re-renders. `gsap.from` would re-capture the current
        // opacity (already 0) on a re-run and animate 0 -> 0, leaving it hidden.
        gsap.set(targets, { opacity: 0, y })
        gsap.to(targets, {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: 'power3.out',
          delay,
          stagger: stagger ? staggerEach : 0,
          ...(immediate
            ? {}
            : { scrollTrigger: { trigger: el, start: 'top 85%', once: true } }),
        })
      })

      return () => mm.revert()
    },
    { scope: ref },
  )

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}

const groupDigits = (n: number) => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ',')

type CountUpProps = {
  to: number
  prefix?: string
  suffix?: string
  className?: string
  /** Insert thousands separators (e.g. 630,000). */
  group?: boolean
  duration?: number
}

/**
 * Counts a figure up from zero when it scrolls into view. Renders the final
 * value on the server (and for reduced-motion / no-JS), then counts for
 * everyone else.
 */
export function CountUp({
  to,
  prefix = '',
  suffix = '',
  className,
  group = false,
  duration = 1.4,
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const render = (n: number) => prefix + (group ? groupDigits(n) : String(n)) + suffix

  useGSAP(
    () => {
      const el = ref.current
      if (!el) return
      const set = (v: number) => {
        el.textContent = render(Math.round(v))
      }

      const mm = gsap.matchMedia()
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        set(0)
        const counter = { v: 0 }
        gsap.to(counter, {
          v: to,
          duration,
          ease: 'power2.out',
          onUpdate: () => set(counter.v),
          scrollTrigger: { trigger: el, start: 'top 90%', once: true },
        })
      })

      return () => mm.revert()
    },
    { scope: ref },
  )

  return (
    <span ref={ref} className={className}>
      {render(to)}
    </span>
  )
}

type ParallaxProps = {
  children: ReactNode
  className?: string
  /** Vertical travel in px across the element's scroll range. */
  amount?: number
}

/**
 * A gentle scroll-linked vertical drift. Scrubbed, so it tracks the scrollbar
 * directly. Disabled under reduced-motion.
 */
export function Parallax({ children, className, amount = 36 }: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const el = ref.current
      if (!el) return
      const mm = gsap.matchMedia()
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.fromTo(
          el,
          { y: amount },
          {
            y: -amount,
            ease: 'none',
            scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true },
          },
        )
      })

      return () => mm.revert()
    },
    { scope: ref },
  )

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}
