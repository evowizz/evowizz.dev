'use client'

import { type ReactNode, useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { withMotionPreference } from '@/lib/motion-preference'

gsap.registerPlugin(useGSAP, ScrollTrigger)

export function HeroMotion({ children }: { children: ReactNode }) {
  const heroRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const el = heroRef.current
      if (!el) return

      return withMotionPreference(
        () => {
          gsap.set(el, { filter: 'blur(20px)' })
          gsap.to(el, {
            filter: 'blur(0px)',
            duration: 0.9,
            delay: 0.15,
            ease: 'power3.out',
            onComplete: () => gsap.set(el, { clearProps: 'filter' }),
          })
        },
        () => gsap.set(el, { clearProps: 'filter' }),
      )
    },
    { scope: heroRef },
  )

  useGSAP(
    () => {
      const content = contentRef.current
      const about = document.querySelector<HTMLElement>('#about')
      if (!content || !about) return

      return withMotionPreference(
        () => {
          gsap.to(content, {
            opacity: 0,
            filter: 'blur(20px)',
            ease: 'none',
            scrollTrigger: {
              trigger: about,
              start: 'top 92%',
              end: 'top 55%',
              scrub: true,
              invalidateOnRefresh: true,
            },
          })
        },
        () => gsap.set(content, { clearProps: 'filter,opacity' }),
      )
    },
    { scope: contentRef },
  )

  return (
    <section ref={heroRef} className="bg-surface text-on-surface flex min-h-[calc(100svh-4rem)] items-center">
      <div ref={contentRef} data-hero-content className="w-full">
        {children}
      </div>
    </section>
  )
}
