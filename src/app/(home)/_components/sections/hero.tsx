'use client'

import Link from 'next/link'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { Container } from '@/components/elements'
import { MaterialSymbol } from '@/components/material-symbol'
import { Reveal } from '@/components/reveal'
import { useWidthBreath } from '@/hooks/use-width-breath'

gsap.registerPlugin(useGSAP)

export const Hero = () => {
  const statementRef = useWidthBreath<HTMLHeadingElement>({ from: 74, duration: 1.4, delay: 0.15 })

  // Blur reveal: the name appears from a uniform 20px blur while it widens,
  // then the filter is cleared so nothing keeps rendering through it.
  useGSAP(
    () => {
      const el = statementRef.current
      if (!el) return

      const mm = gsap.matchMedia()

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.set(el, { filter: 'blur(20px)' })
        gsap.to(el, {
          filter: 'blur(0px)',
          duration: 0.9,
          delay: 0.15,
          ease: 'power3.out',
          onComplete: () => gsap.set(el, { clearProps: 'filter' }),
        })
      })

      mm.add('(prefers-reduced-motion: reduce)', () => {
        gsap.set(el, { clearProps: 'filter' })
      })

      return () => mm.revert()
    },
    { scope: statementRef },
  )

  return (
    <section className="flex min-h-[calc(100svh-4rem)] flex-col justify-center">
      <Container>
        <Reveal immediate stagger y={30} className="flex flex-col items-start gap-7 py-20 md:gap-9">
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

          <h1
            ref={statementRef}
            className="variation-sans text-on-surface text-[clamp(3.25rem,11vw,8.5rem)] leading-none font-semibold tracking-[-0.03em]"
          >
            <span className="block">Dylan</span>
            <span className="block">Roussel</span>
          </h1>

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
      </Container>
    </section>
  )
}
