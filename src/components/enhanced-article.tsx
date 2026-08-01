'use client'

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { reducedMotion } from '@/lib/motion-preference'

const TICK_COUNT = 121
const TICKS = Array.from({ length: TICK_COUNT }, (_, index) => index)

type Section = {
  id: string
  title: string
  /** Position on the ruler track, 0..1, proportional to the article. */
  at: number
}

export default function EnhancedArticle(props: React.HTMLAttributes<HTMLElement>) {
  const articleRef = useRef<HTMLElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const [sections, setSections] = useState<Section[]>([])

  // Progress shares its math with the section ticks and jumps so the marker
  // lines up with them (framer's useScroll caches offsets and drifts).
  const rawProgress = useMotionValue(0)
  const progress = useSpring(rawProgress, {
    stiffness: 150,
    damping: 30,
    restDelta: 0.0001,
  })

  const markerTop = useTransform(progress, (value) => `${Math.min(Math.max(value, 0), 1) * 100}%`)
  const readout = useTransform(progress, (value) => Math.min(Math.max(value, 0), 1).toFixed(2))

  // Proportional mapping: jumping to a section tick lands the marker exactly
  // on it, and at that progress the heading is on screen.
  useEffect(() => {
    const article = articleRef.current
    if (!article) return

    const measureSections = () => {
      if (article.offsetHeight <= window.innerHeight) {
        setSections([])
        return
      }
      const articleTop = article.getBoundingClientRect().top + window.scrollY
      setSections(
        Array.from(article.querySelectorAll<HTMLElement>('h1[id], h2[id]')).map((heading) => {
          const headingTop = heading.getBoundingClientRect().top + window.scrollY
          return {
            id: heading.id,
            title: heading.textContent ?? '',
            at: Math.min(Math.max((headingTop - articleTop) / article.offsetHeight, 0), 1),
          }
        }),
      )
    }

    const updateProgress = () => {
      const range = article.offsetHeight - window.innerHeight
      if (range <= 0) {
        rawProgress.set(0)
        return
      }
      const articleTop = article.getBoundingClientRect().top + window.scrollY
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
  }, [rawProgress])

  const jumpToProgress = (value: number) => {
    const article = articleRef.current
    if (!article) return
    const range = article.offsetHeight - window.innerHeight
    if (range <= 0) return
    const articleTop = article.getBoundingClientRect().top + window.scrollY
    const behavior = reducedMotion() ? 'auto' : 'smooth'
    window.scrollTo({
      top: articleTop + Math.min(Math.max(value, 0), 1) * range,
      behavior,
    })
  }

  return (
    <>
      <motion.div
        className="bg-tertiary fixed top-0 right-0 left-0 z-5000 h-1 origin-left xl:hidden"
        style={{ scaleX: progress }}
      />

      {/* Section-map scrim: stacked mask-faded backdrop blurs compound into
          a progressive blur toward the ruler. Clicking it dismisses. */}
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

      {/* Reading ruler, only at widths where the gutter fits it entirely:
          the instrument must never overlap the paper. */}
      <div className="ruler-root pointer-events-none fixed inset-y-0 right-0 z-30 hidden xl:block">
        <div ref={trackRef} className="group/ruler pointer-events-auto absolute top-20 right-0 bottom-8 w-14">
          <div aria-hidden className="absolute inset-0">
            {TICKS.map((index) => (
              <div
                key={index}
                style={{ top: `${(index / (TICK_COUNT - 1)) * 100}%` }}
                className="group/tick absolute inset-x-0 flex -translate-y-1/2 items-center justify-end pr-3"
              >
                <span className="bg-outline-variant group-hover/tick:bg-on-surface h-px w-2 transition-all duration-100 group-hover/tick:w-4" />
                <div
                  onClick={() => jumpToProgress(index / (TICK_COUNT - 1))}
                  className="absolute inset-x-0 top-1/2 h-2 -translate-y-1/2 cursor-pointer"
                />
              </div>
            ))}

            {sections.map((section) => (
              <div
                key={section.id}
                style={{ top: `${section.at * 100}%` }}
                className="group/tick absolute inset-x-0 flex -translate-y-1/2 items-center justify-end pr-3"
              >
                <span className="bg-on-surface-variant group-hover/tick:bg-on-surface h-px w-2 transition-all duration-100 group-hover/tick:w-4" />
                <div
                  onClick={() => jumpToProgress(section.at)}
                  className="absolute inset-x-0 top-1/2 h-2 -translate-y-1/2 cursor-pointer"
                />
              </div>
            ))}
          </div>

          {sections.map((section, index) => (
            <a
              key={section.id}
              href={`#${section.id}`}
              onClick={(event) => {
                event.preventDefault()
                jumpToProgress(section.at)
                window.dispatchEvent(new Event('press-close-ruler-overlay'))
              }}
              style={{ top: `${section.at * 100}%`, transitionDelay: `${index * 50}ms` }}
              // Capped to the gutter (paper right edge = 50vw + 34rem) so
              // labels wrap beside the sheet instead of crossing onto it.
              className="ruler-label text-on-surface hover:text-primary focus-ring pointer-events-none absolute right-8 flex w-[min(11rem,50vw-36.5rem)] -translate-y-1/2 items-center justify-end text-right font-mono text-[0.625rem] leading-[1.4] tracking-[0.08em] uppercase opacity-0 transition-opacity duration-300 group-hover/ruler:pointer-events-auto group-hover/ruler:opacity-100 focus-visible:opacity-100"
            >
              {section.title}
            </a>
          ))}

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
        </div>
      </div>

      <article ref={articleRef} {...props} />
    </>
  )
}
