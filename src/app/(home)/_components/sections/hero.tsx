'use client'

import { type ReactNode, useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { withMotionPreference } from '@/lib/motion-preference'
import { Container } from '@/components/elements'
import { MaterialSymbol } from '@/components/material-symbol'
import { Reveal } from '@/components/reveal'
import { useParisClock } from '@/hooks/use-paris-clock'

gsap.registerPlugin(useGSAP, ScrollTrigger)

function HeroName() {
  return (
    <h1
      aria-label="Dylan Roussel"
      className="group/name variation-serif flex max-w-5xl flex-wrap items-baseline justify-center gap-x-[0.22em] font-[family-name:var(--font-roboto-slab)] text-[clamp(3.75rem,11vw,8.5rem)] leading-[0.88] tracking-[-0.035em] text-balance"
    >
      <span className="inline-block">
        <span className="group-hover/name:text-primary inline-block transition-colors duration-500 ease-out motion-reduce:transition-none">
          Dy
        </span>
        <NameAside>lan</NameAside>
      </span>
      <span className="inline-block">
        <NameAside>Roussel</NameAside>
      </span>
    </h1>
  )
}

function NameAside({ children }: { children: ReactNode }) {
  return (
    <span className="group-hover/name:text-outline-variant transition-colors duration-500 ease-out motion-reduce:transition-none">
      {children}
    </span>
  )
}

function HeroAction() {
  return (
    <Link
      href="#work"
      className="group/action bg-primary text-on-primary focus-ring motion-effects-default inline-flex min-h-11 w-fit items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition-[color,background-color,opacity,transform] hover:opacity-85 active:scale-[0.96]"
    >
      See the work
      <MaterialSymbol
        name="arrow_downward"
        className="motion-spatial-fast text-lg transition-transform group-hover/action:translate-y-0.5"
      />
    </Link>
  )
}

function SignatureTime({ clock }: { clock: ReturnType<typeof useParisClock> }) {
  const [localTime, setLocalTime] = useState<string | null>(null)

  useEffect(() => {
    const readLocalTime = () =>
      setLocalTime(
        new Intl.DateTimeFormat('en-GB', {
          hour: '2-digit',
          minute: '2-digit',
          hourCycle: 'h23',
        }).format(new Date()),
      )

    readLocalTime()
    const id = setInterval(readLocalTime, 30000)
    return () => clearInterval(id)
  }, [])

  const parisTime = clock?.time ?? '\u00a0'
  const parisZone = clock?.zone ?? ''
  const shortZone = parisZone.replace(/\s+\(.*\)$/, '')
  const zoneOffset = parisZone.slice(shortZone.length)
  const visitorTime = localTime ?? parisTime
  const canRevealLocalTime = Boolean(
    clock && localTime && (process.env.NODE_ENV !== 'production' || localTime !== clock.time),
  )

  const parisLabel = (
    <>
      {parisTime} {shortZone}
      {zoneOffset && <span className="hidden sm:inline">{zoneOffset}</span>}
    </>
  )

  if (!canRevealLocalTime) {
    return (
      <span className="text-on-surface flex min-h-11 items-center gap-2 px-3 leading-none font-medium whitespace-nowrap tabular-nums">
        <MaterialSymbol className="text-primary text-lg leading-none" name="schedule" />
        <span>{parisLabel}</span>
      </span>
    )
  }

  return (
    <button
      type="button"
      aria-label={`Paris time ${parisTime} ${parisZone}. Your local time ${visitorTime}.`}
      className="group/time text-on-surface focus-ring flex min-h-11 cursor-default items-center gap-2 rounded-full px-3 leading-none font-medium whitespace-nowrap tabular-nums"
    >
      <MaterialSymbol
        className="text-on-surface-variant group-hover/time:text-primary group-focus-visible/time:text-primary motion-effects-fast text-lg leading-none transition-colors"
        name="schedule"
      />
      <span aria-hidden className="relative grid overflow-hidden py-1">
        <span className="motion-effects-default col-start-1 row-start-1 transition-[translate,opacity] group-hover/time:-translate-y-1.5 group-hover/time:opacity-0 group-focus-visible/time:-translate-y-1.5 group-focus-visible/time:opacity-0 motion-reduce:translate-y-0 motion-reduce:transition-none">
          {parisLabel}
        </span>
        <span className="text-primary motion-effects-default col-start-1 row-start-1 translate-y-1.5 text-left opacity-0 transition-[translate,opacity] group-hover/time:translate-y-0 group-hover/time:opacity-100 group-focus-visible/time:translate-y-0 group-focus-visible/time:opacity-100 motion-reduce:translate-y-0 motion-reduce:transition-none">
          {visitorTime} Your time
        </span>
      </span>
    </button>
  )
}

export function Hero() {
  const clock = useParisClock()
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
        <Container className="py-10 pb-32 md:py-20 md:pb-32">
          <Reveal
            immediate
            stagger
            staggerEach={0.14}
            y={28}
            className="flex flex-col items-center gap-5 text-center md:gap-9"
          >
            <div className="bg-surface-container-low text-on-surface inline-flex items-center rounded-full text-xs sm:text-sm">
              <span className="flex min-h-11 items-center gap-2 px-3 leading-none font-medium whitespace-nowrap">
                <MaterialSymbol className="text-primary text-lg leading-none" name="location_on" />
                Nantes, France
              </span>
              <span aria-hidden className="bg-outline-variant h-5 w-px" />
              <SignatureTime clock={clock} />
            </div>

            <HeroName />

            <div className="border-outline-variant flex max-w-3xl flex-col items-center gap-5 border-t px-2 pt-6 md:gap-6 md:px-10 md:pt-7">
              <p className="text-xl leading-tight font-medium md:text-2xl">
                Developer and designer for Android and the web.
              </p>

              <HeroAction />
            </div>
          </Reveal>
        </Container>
      </div>
    </section>
  )
}
