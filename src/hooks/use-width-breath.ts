'use client'

import { useRef, type RefObject } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { withMotionPreference } from '@/lib/motion-preference'

gsap.registerPlugin(useGSAP, ScrollTrigger)

type WidthBreathOptions = {
  /** Condensed starting width. */
  from: number
  /** Settled width. */
  to?: number
  duration?: number
  delay?: number
  /** Run when scrolled into view instead of on mount. */
  scroll?: boolean
  /** Controlled mode: breathe in when true, condense back when false. */
  play?: boolean
}

/**
 * Animates the `--font-wdth` custom property that `variation-sans` feeds into
 * Google Sans Flex. Reduced motion gets the settled width with no animation.
 */
export function useWidthBreath<T extends HTMLElement>({
  from,
  to = 100,
  duration = 1,
  delay = 0,
  scroll = false,
  play,
}: WidthBreathOptions): RefObject<T | null> {
  const ref = useRef<T>(null)

  useGSAP(
    () => {
      const el = ref.current
      if (!el) return

      return withMotionPreference(
        () => {
          if (play === false) {
            gsap.to(el, {
              '--font-wdth': from,
              duration: 0.25,
              ease: 'power2.in',
              overwrite: 'auto',
            })
            return
          }

          gsap.set(el, { '--font-wdth': from })
          gsap.to(el, {
            '--font-wdth': to,
            duration,
            delay,
            ease: 'power3.out',
            overwrite: 'auto',
            ...(scroll ? { scrollTrigger: { trigger: el, start: 'top 85%', once: true } } : {}),
          })
        },
        () => gsap.set(el, { '--font-wdth': to }),
      )
    },
    { dependencies: [play], scope: ref },
  )

  return ref
}
