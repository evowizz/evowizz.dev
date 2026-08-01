'use client'

import { useRef, useState, type ReactNode } from 'react'
import Link from 'next/link'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { reducedMotion, withMotionPreference } from '@/lib/motion-preference'
import { Container, PageTitle } from '@/components/elements'
import { MaterialSymbol } from '@/components/material-symbol'
import { Reveal } from '@/components/reveal'
import { useParisClock } from '@/hooks/use-paris-clock'
import { AXES, REST, axesToStyle, type Axes } from '../type-axes'
import { TypeSpecimen } from '../type-specimen'

gsap.registerPlugin(useGSAP)

/** The width the name breathes out from. */
const BREATH_FROM = 74

/** Recedes on hover, so only the two letters he goes by stay lit. */
const Aside = ({ children }: { children: ReactNode }) => (
  <span className="motion-effects-slow group-hover:text-outline-variant transition-colors">{children}</span>
)

/** One line of the availability card. `flex-1` shares the tile height between rows. */
const Fact = ({ icon, children }: { icon: string; children: ReactNode }) => (
  <li className="flex flex-1 items-center gap-3 py-3">
    <MaterialSymbol name={icon} className="text-outline shrink-0 text-lg" />
    <span className="min-w-0 truncate">{children}</span>
  </li>
)

export function Hero() {
  const statementRef = useRef<HTMLHeadingElement>(null)
  const [axes, setAxes] = useState<Axes>(REST)
  const [resetting, setResetting] = useState(false)
  const resetTween = useRef<gsap.core.Tween | null>(null)
  const clock = useParisClock()

  // Reaching for a ruler cancels a reset in flight.
  const change = (next: Axes) => {
    resetTween.current?.kill()
    setResetting(false)
    setAxes(next)
  }

  // Walks the rulers home in sequence, or jumps there when motion is reduced.
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

  // React owns the axes so the specimen ruler sweeps too, GSAP owns only the filter.
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
    <section className="bg-surface text-on-surface flex min-h-[calc(100svh-4rem)] flex-col justify-center">
      <Container className="py-16 md:py-20">
        {/* At lg: name in cols 1-4 across both rows, availability then specimen in 5-6. */}
        <Reveal immediate stagger y={30} className="grid gap-4 md:grid-cols-2 md:gap-5 lg:grid-cols-6">
          {/* Centred, not spaced: the column stretches to the cards beside it. */}
          <div className="flex flex-col justify-center gap-8 md:col-span-2 md:gap-10 lg:col-span-4 lg:col-start-1 lg:row-span-2 lg:row-start-1">
            <div className="flex flex-col gap-4 md:gap-5">
              {/* Keeps the name copyable as two words, though the blocks hide the space. */}
              <PageTitle ref={statementRef} className="group" style={axesToStyle(axes)}>
                <span className="block">
                  Dy<Aside>lan</Aside>
                </span>{' '}
                <span className="block">
                  <Aside>Roussel</Aside>
                </span>
              </PageTitle>

              <p className="text-on-surface-variant text-lg font-medium md:text-xl">Android developer and designer.</p>
            </div>

            <Link
              href="#work"
              className="bg-primary text-on-primary group focus-ring motion-effects-default inline-flex w-fit items-center gap-2 rounded-full py-3 pr-5 pl-6 text-base font-semibold transition-opacity hover:opacity-90"
            >
              See the work
              <MaterialSymbol
                name="arrow_downward"
                className="motion-spatial-fast text-xl transition-transform group-hover:translate-y-0.5"
              />
            </Link>
          </div>

          <div className="border-outline-variant flex flex-col gap-6 rounded-2xl border p-6 md:p-7 lg:col-span-2 lg:col-start-5 lg:row-start-1">
            <p className="flex items-center gap-2.5 text-xl leading-snug font-medium md:text-2xl">
              <span aria-hidden className="bg-primary size-2.5 shrink-0 rounded-full" />
              Available for hire
            </p>

            <ul className="divide-outline-variant border-outline-variant text-on-surface-variant flex flex-1 flex-col divide-y border-t text-base font-medium">
              <Fact icon="location_on">Nantes, France</Fact>
              <Fact icon="schedule">
                <span className="block min-h-[1.5em]">{clock ? `${clock.time} ${clock.zone}` : ''}</span>
              </Fact>
              <Fact icon="public">Happy to work remote</Fact>
            </ul>
          </div>

          <TypeSpecimen
            axes={axes}
            onChange={change}
            onReset={reset}
            resetting={resetting}
            className="hidden md:col-span-2 md:flex lg:col-span-2 lg:col-start-5 lg:row-start-2"
          />
        </Reveal>
      </Container>
    </section>
  )
}
