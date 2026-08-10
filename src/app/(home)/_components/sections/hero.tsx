import { type ReactNode } from 'react'
import Link from 'next/link'
import { SITE_LOCATION } from '@/config/site'
import { Container } from '@/components/ui/container'
import { MaterialSymbol } from '@/components/ui/material-symbol'
import { Reveal } from '@/components/ui/reveal'
import { HeroMotion } from '../hero-motion'
import { SignatureTime } from '../local-time'

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

export function Hero() {
  return (
    <HeroMotion>
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
              {SITE_LOCATION}
            </span>
            <span aria-hidden className="bg-outline-variant h-5 w-px" />
            <SignatureTime />
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
    </HeroMotion>
  )
}
