'use client'

import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { withMotionPreference } from '@/lib/motion-preference'

gsap.registerPlugin(useGSAP, ScrollTrigger)

const groupDigits = (value: number) => String(value).replace(/\B(?=(\d{3})+(?!\d))/g, ',')

type CountUpProps = {
  to: number
  prefix?: string
  suffix?: string
  className?: string
  /** Insert thousands separators, such as 630,000. */
  group?: boolean
  duration?: number
}

/** Counts from zero when the figure scrolls into view. */
export function CountUp({ to, prefix = '', suffix = '', className, group = false, duration = 1.4 }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const render = (value: number) => prefix + (group ? groupDigits(value) : String(value)) + suffix

  useGSAP(
    () => {
      const element = ref.current
      if (!element) return
      const set = (value: number) => {
        element.textContent = render(Math.round(value))
      }

      return withMotionPreference(
        () => {
          set(0)
          const counter = { value: 0 }
          gsap.to(counter, {
            value: to,
            duration,
            ease: 'power2.out',
            onUpdate: () => set(counter.value),
            scrollTrigger: { trigger: element, start: 'top 90%', once: true },
          })
        },
        () => set(to),
      )
    },
    { scope: ref },
  )

  return (
    <span ref={ref} className={className}>
      {render(to)}
    </span>
  )
}
