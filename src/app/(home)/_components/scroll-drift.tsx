'use client'

import { useRef, type ReactNode } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { withMotionPreference } from '@/lib/motion-preference'

gsap.registerPlugin(useGSAP)

type ScrollDriftProps = {
  children: ReactNode
  className?: string
  /** Only drifts where this matches. Defaults to the `lg` breakpoint. */
  media?: string
  /** Share of the cell's spare height to drift through. Lower keeps it nearer the top. */
  range?: number
  /** Share of the remaining distance closed each frame. Lower feels heavier. */
  ease?: number
}

/**
 * Drifts a child down the spare height of its cell as that cell scrolls past.
 *
 * The child sits at the top of its cell until that cell is wholly on screen, then climbs
 * slower than whatever sits beside it. Its cell bounds the travel.
 * `ease` is weight on top of that drift, not the source of it, since damping alone settles
 * at a fixed offset under constant scroll speed and just looks parked lower.
 *
 * Writes `translate`, not `transform`, which `Reveal` already owns on the same node.
 */
export function ScrollDrift({
  children,
  className,
  media = '(min-width: 64rem)',
  range = 1,
  ease = 0.08,
}: ScrollDriftProps) {
  const ref = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const el = ref.current
      if (!el) return

      return withMotionPreference(() => {
        const mq = window.matchMedia(media)
        // The scroll range the drift runs over, in document coordinates, and its travel.
        let from = 0
        let span = 1
        let travel = 0
        let offset = 0

        const target = () => gsap.utils.clamp(0, 1, (window.scrollY - from) / span) * travel
        const place = () => (el.style.translate = `0 ${offset.toFixed(2)}px`)

        const measure = () => {
          const cell = el.parentElement
          travel = cell && mq.matches ? Math.max(0, (cell.offsetHeight - el.offsetHeight) * range) : 0

          if (!cell || !travel) {
            el.style.translate = ''
            return
          }

          let docTop = 0
          for (let node: HTMLElement | null = cell; node; node = node.offsetParent as HTMLElement | null) {
            docTop += node.offsetTop
          }

          // Starts once the cell is wholly on screen, so nothing moves while it arrives.
          from = docTop + cell.offsetHeight - window.innerHeight
          span = window.innerHeight
          // Start settled, so loading partway down the page does not animate from the top.
          offset = target()
          place()
        }

        const tick = () => {
          if (!travel) return

          const to = target()
          // Converging never quite lands, so stop below the precision actually written.
          if (Math.abs(to - offset) < 0.01) return

          offset += (to - offset) * ease
          place()
        }

        measure()
        gsap.ticker.add(tick)
        window.addEventListener('resize', measure)
        mq.addEventListener('change', measure)

        return () => {
          gsap.ticker.remove(tick)
          window.removeEventListener('resize', measure)
          mq.removeEventListener('change', measure)
          el.style.translate = ''
        }
      })
    },
    { scope: ref },
  )

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}
