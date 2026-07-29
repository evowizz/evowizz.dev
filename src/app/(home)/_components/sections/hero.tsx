'use client'

import { useRef, useState } from 'react'
import Link from 'next/link'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { reducedMotion, withMotionPreference } from '@/lib/motion-preference'
import { Container, PageTitle } from '@/components/elements'
import { MaterialSymbol } from '@/components/material-symbol'
import { Reveal } from '@/components/reveal'
import { AXES, TypeSpecimen, REST, axesToStyle, type Axes } from '../type-specimen'

gsap.registerPlugin(useGSAP)

/** The width the name breathes out from, matching the rest of the site. */
const BREATH_FROM = 74

/** Hovering the name recedes everything but the two letters he goes by. */
const aside = 'motion-effects-slow transition-colors group-hover:text-outline-variant'

export const Hero = () => {
  const statementRef = useRef<HTMLHeadingElement>(null)
  const [axes, setAxes] = useState<Axes>(REST)
  const [resetting, setResetting] = useState(false)
  const resetTween = useRef<gsap.core.Tween | null>(null)

  // Reaching for a ruler cancels a reset in flight, so the two never fight over
  // the same value.
  const change = (next: Axes) => {
    resetTween.current?.kill()
    setResetting(false)
    setAxes(next)
  }

  // One tween per axis, staggered, so the rulers walk home in sequence rather
  // than snapping back together.
  const reset = () => {
    resetTween.current?.kill()

    if (reducedMotion()) {
      setAxes(REST)
      return
    }

    const walk = AXES.map((axis) => ({ id: axis.id, value: axes[axis.id] }))
    setResetting(true)
    resetTween.current = gsap.to(walk, {
      value: (_index: number, target: (typeof walk)[number]) => REST[target.id],
      duration: 1.1,
      ease: 'power3.out',
      stagger: 0.25,
      onUpdate: () => setAxes(Object.fromEntries(walk.map((a) => [a.id, a.value])) as Axes),
      onComplete: () => setResetting(false),
    })
  }

  // The name appears from a uniform 20px blur while it widens, then the filter
  // is cleared so nothing keeps rendering through it. The width runs through
  // state rather than the element so the ruler beside it moves too, which is
  // the only thing that says what the ruler is for.
  useGSAP(
    () => {
      const el = statementRef.current
      if (!el) return

      return withMotionPreference(
        () => {
          const breath = { wdth: BREATH_FROM }
          setAxes((current) => ({ ...current, wdth: BREATH_FROM }))

          gsap.set(el, { filter: 'blur(20px)' })
          gsap.to(el, {
            filter: 'blur(0px)',
            duration: 0.9,
            delay: 0.15,
            ease: 'power3.out',
            onComplete: () => gsap.set(el, { clearProps: 'filter' }),
          })
          gsap.to(breath, {
            wdth: REST.wdth,
            duration: 1.4,
            delay: 0.15,
            ease: 'power3.out',
            onUpdate: () => setAxes((current) => ({ ...current, wdth: breath.wdth })),
          })
        },
        () => gsap.set(el, { clearProps: 'filter' }),
      )
    },
    { scope: statementRef },
  )

  return (
    <section className="flex min-h-[calc(100svh-4rem)] flex-col justify-center">
      <Container className="grid items-center py-20 xl:grid-cols-[minmax(0,1fr)_22rem] xl:gap-12">
        <Reveal immediate stagger y={30} className="flex flex-col items-start gap-7 md:gap-9">
          <p className="text-on-surface-variant flex flex-wrap items-center gap-x-3 gap-y-1 text-sm font-medium">
            <span className="inline-flex items-center gap-2">
              <span aria-hidden className="bg-primary size-2 rounded-full" />
              <span className="text-on-surface">Available for hire</span>
            </span>
            <span aria-hidden className="text-outline-variant">
              /
            </span>
            <span>Nantes, France</span>
          </p>

          {/* The space between the two blocks is not rendered, but it keeps the
              heading from reading as one word to anything walking the text. */}
          <PageTitle ref={statementRef} className="group" style={axesToStyle(axes)}>
            <span className="block">
              Dy<span className={aside}>lan</span>
            </span>{' '}
            <span className={`block ${aside}`}>Roussel</span>
          </PageTitle>

          <p className="text-on-surface-variant -mt-4 text-lg font-medium md:-mt-6 md:text-xl">
            Android developer and designer.
          </p>

          <Link
            href="#work"
            className="text-primary group focus-ring inline-flex items-center gap-2 text-lg font-medium"
          >
            See the work
            <MaterialSymbol
              name="arrow_downward"
              className="motion-spatial-fast text-xl transition-transform group-hover:translate-y-0.5"
            />
          </Link>
        </Reveal>

        <Reveal immediate delay={0.5} className="hidden xl:block">
          <TypeSpecimen axes={axes} onChange={change} onReset={reset} resetting={resetting} />
        </Reveal>
      </Container>
    </section>
  )
}
