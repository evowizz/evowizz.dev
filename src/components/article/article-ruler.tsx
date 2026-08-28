'use client'

import { motion, useMotionValue, useSpring, useTransform } from 'motion/react'
import { useEffect, useRef, useState } from 'react'
import { cva, type VariantProps } from 'cva'
import { reducedMotion } from '@/lib/motion-preference'

const TICK_COUNT = 91
const TICK_INTERVALS = Array.from({ length: TICK_COUNT - 1 }, (_, index) => index)
// Leaves 3rem below endpoint labels, including their 8px hit area.
const RULER_BOTTOM_GAP = 48
// Matches prose headings' `scroll-mt-32`.
const SECTION_SCROLL_OFFSET = 128

type Section = {
  id: string
  title: string
  /** Snapped position on the ruler track, 0..1. */
  at: number
  /** Scroll distance from the article top, in pixels. */
  scrollOffset: number
}

const rulerTickVariants = cva('h-0.5 transition-all duration-150', {
  variants: {
    emphasis: {
      currentSection: 'bg-primary w-8',
      current: 'bg-on-surface w-8',
      neighbor: 'bg-on-surface-variant w-4',
      section: 'bg-on-surface-variant w-3',
      rest: 'bg-outline-variant w-2',
    },
  },
  defaultVariants: {
    emphasis: 'rest',
  },
})

type RulerTickProps = VariantProps<typeof rulerTickVariants>

function RulerTick({ emphasis }: RulerTickProps) {
  return <span className={rulerTickVariants({ emphasis })} />
}

export function ArticleRuler({ articleId }: { articleId: string }) {
  const trackRef = useRef<HTMLDivElement>(null)
  const [sections, setSections] = useState<Section[]>([])
  const [activeTick, setActiveTick] = useState<number | null>(null)

  // Shares progress math with ticks and jumps, avoiding Framer's cached offset drift.
  const rawProgress = useMotionValue(0)
  const rulerBottom = useMotionValue(RULER_BOTTOM_GAP)
  const progress = useSpring(rawProgress, {
    stiffness: 150,
    damping: 30,
    restDelta: 0.0001,
  })

  const markerTop = useTransform(progress, (value) => `${Math.min(Math.max(value, 0), 1) * 100}%`)
  const readout = useTransform(progress, (value) => Math.min(Math.max(value, 0), 1).toFixed(2))
  const sectionByTick = new Map(
    sections.map((section) => [Math.round(section.at * (TICK_COUNT - 1)), section] as const),
  )
  const tickEmphasis = (index: number): RulerTickProps['emphasis'] => {
    const distance = activeTick === null ? Number.POSITIVE_INFINITY : Math.abs(activeTick - index)
    if (distance === 0) return sectionByTick.has(index) ? 'currentSection' : 'current'
    if (distance === 1) return 'neighbor'
    if (sectionByTick.has(index)) return 'section'
    return 'rest'
  }

  // Snaps headings so labels, jumps, and progress share one tick scale.
  useEffect(() => {
    const article = document.getElementById(articleId)
    if (!article) return

    const measureSections = () => {
      const range = article.offsetHeight - window.innerHeight
      if (range <= 0) {
        setSections([])
        return
      }
      const articleTop = article.getBoundingClientRect().top + window.scrollY
      setSections(
        Array.from(article.querySelectorAll<HTMLElement>('h1[id], h2[id]')).map((heading) => {
          const headingTop = heading.getBoundingClientRect().top + window.scrollY
          const targetOffset = Math.max(headingTop - articleTop - SECTION_SCROLL_OFFSET, 0)
          const at = Math.round(Math.min(targetOffset / range, 1) * (TICK_COUNT - 1)) / (TICK_COUNT - 1)
          return {
            id: heading.id,
            title: heading.textContent ?? '',
            at,
            scrollOffset: targetOffset <= range ? at * range : targetOffset,
          }
        }),
      )
    }

    const updateProgress = () => {
      const range = article.offsetHeight - window.innerHeight
      const articleRect = article.getBoundingClientRect()
      rulerBottom.set(Math.max(RULER_BOTTOM_GAP, window.innerHeight - articleRect.bottom + RULER_BOTTOM_GAP))
      if (range <= 0) {
        rawProgress.set(0)
        return
      }
      const articleTop = articleRect.top + window.scrollY
      rawProgress.set(Math.min(Math.max((window.scrollY - articleTop) / range, 0), 1))
    }

    const onResize = () => {
      measureSections()
      updateProgress()
    }

    onResize()
    window.addEventListener('scroll', updateProgress, { passive: true })
    window.addEventListener('resize', onResize)
    const observer = new ResizeObserver(onResize)
    observer.observe(article)
    return () => {
      window.removeEventListener('scroll', updateProgress)
      window.removeEventListener('resize', onResize)
      observer.disconnect()
    }
  }, [articleId, rawProgress, rulerBottom])

  const scrollToArticleOffset = (offset: number) => {
    const article = document.getElementById(articleId)
    if (!article) return
    const articleTop = article.getBoundingClientRect().top + window.scrollY
    const behavior = reducedMotion() ? 'auto' : 'smooth'
    window.scrollTo({
      top: articleTop + offset,
      behavior,
    })
  }

  const jumpToProgress = (value: number) => {
    const article = document.getElementById(articleId)
    if (!article) return
    const range = article.offsetHeight - window.innerHeight
    if (range <= 0) return
    scrollToArticleOffset(Math.min(Math.max(value, 0), 1) * range)
  }

  const jumpToSection = (section: Section) => scrollToArticleOffset(section.scrollOffset)

  return (
    <>
      <motion.div
        className="bg-tertiary fixed top-0 right-0 left-0 z-5000 h-1 origin-left xl:hidden"
        style={{ scaleX: progress }}
      />

      <div
        aria-hidden
        onClick={() => window.dispatchEvent(new Event('press-close-ruler-overlay'))}
        className="ruler-scrim fixed inset-0 z-40"
      >
        <div
          className="absolute inset-0"
          style={{ maskImage: 'linear-gradient(to right, rgba(0,0,0,0.35) 0%, rgb(0,0,0) 30%)' }}
        />
        <div
          className="absolute inset-0"
          style={{ maskImage: 'linear-gradient(to right, transparent 10%, rgb(0,0,0) 55%)' }}
        />
        <div
          className="absolute inset-0"
          style={{ maskImage: 'linear-gradient(to right, transparent 40%, rgb(0,0,0) 80%)' }}
        />
        <div className="from-surface/40 to-surface/90 absolute inset-0 bg-linear-to-r" />
      </div>

      <div className="ruler-root pointer-events-none fixed inset-y-0 right-0 z-30 hidden w-14 xl:block">
        <motion.div
          ref={trackRef}
          style={{ bottom: rulerBottom }}
          onPointerLeave={() => setActiveTick(null)}
          className="group/ruler pointer-events-auto absolute top-20 right-0 w-14"
        >
          <div aria-hidden className="absolute inset-0">
            {TICK_INTERVALS.map((index) => (
              <div
                key={index}
                style={{
                  top: `${(index / (TICK_COUNT - 1)) * 100}%`,
                  height: `${100 / (TICK_COUNT - 1)}%`,
                }}
                className="absolute inset-x-0"
              >
                <div
                  onClick={() => {
                    const section = sectionByTick.get(index)
                    if (section) jumpToSection(section)
                    else jumpToProgress(index / (TICK_COUNT - 1))
                  }}
                  onPointerEnter={() => setActiveTick(index)}
                  className="ruler-tick-hit absolute inset-x-0 top-0 flex h-full -translate-y-1/2 cursor-pointer items-center justify-end pr-3"
                >
                  <RulerTick emphasis={tickEmphasis(index)} />
                </div>
              </div>
            ))}

            <div
              style={{
                top: `${100 - 100 / (TICK_COUNT - 1)}%`,
                height: `${100 / (TICK_COUNT - 1)}%`,
              }}
              className="absolute inset-x-0"
            >
              <div
                onClick={() => {
                  const section = sectionByTick.get(TICK_COUNT - 1)
                  if (section) jumpToSection(section)
                  else jumpToProgress(1)
                }}
                onPointerEnter={() => setActiveTick(TICK_COUNT - 1)}
                className="ruler-tick-hit absolute inset-x-0 bottom-0 flex h-full translate-y-1/2 cursor-pointer items-center justify-end pr-3"
              >
                <RulerTick emphasis={tickEmphasis(TICK_COUNT - 1)} />
              </div>
            </div>
          </div>

          {sections.map((section, index) => {
            const tickIndex = Math.round(section.at * (TICK_COUNT - 1))
            const tickAt = tickIndex / (TICK_COUNT - 1)
            return (
              <a
                key={section.id}
                href={`#${section.id}`}
                onPointerEnter={() => setActiveTick(tickIndex)}
                onClick={(event) => {
                  event.preventDefault()
                  jumpToSection(section)
                  window.dispatchEvent(new Event('press-close-ruler-overlay'))
                }}
                style={{ top: `${tickAt * 100}%`, transitionDelay: `${index * 50}ms` }}
                // `36.5rem` keeps labels beyond the 68rem paper and 2.5rem inset.
                className={`ruler-label bg-surface focus-ring pointer-events-none absolute right-8 z-10 flex w-[min(11rem,50vw-36.5rem)] -translate-y-1/2 items-center justify-end pr-2 text-right font-mono text-[0.625rem] leading-[1.4] tracking-[0.08em] uppercase opacity-0 transition-opacity duration-300 group-hover/ruler:pointer-events-auto group-hover/ruler:opacity-100 focus-visible:opacity-100 ${activeTick === tickIndex ? 'text-primary' : 'text-on-surface hover:text-primary'}`}
              >
                {section.title}
              </a>
            )
          })}

          <motion.div
            aria-hidden
            style={{ top: markerTop }}
            className="absolute right-3 flex w-max -translate-y-1/2 items-center gap-2"
          >
            <motion.span className="text-primary font-mono text-xs transition-opacity duration-300 group-hover/ruler:opacity-0">
              {readout}
            </motion.span>
            <span className="bg-primary h-px w-4" />
          </motion.div>
        </motion.div>
      </div>
    </>
  )
}
