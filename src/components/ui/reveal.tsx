'use client'

import { useRef, type ReactNode } from 'react'
import gsap from 'gsap'
import { withMotionPreference } from '@/lib/motion-preference'
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

      const targets = stagger ? Array.from(el.children) : el

      return withMotionPreference(
        () => {
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
            ...(immediate ? {} : { scrollTrigger: { trigger: el, start: 'top 85%', once: true } }),
          })
        },
        () => gsap.set(targets, { clearProps: 'opacity,transform' }),
      )
    },
    { scope: ref },
  )

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}
