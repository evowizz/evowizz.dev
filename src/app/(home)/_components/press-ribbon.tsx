'use client'

import { useState, type CSSProperties, type ReactNode } from 'react'
import type { StaticImageData } from 'next/image'
import { cn } from '@/lib/utils'
import { Container } from '@/components/ui/container'
import { MaterialSymbol } from '@/components/ui/material-symbol'
import nineToFiveGoogle from './media-logos/9to5google.svg'
import androidAuthority from './media-logos/android_authority.svg'
import androidCentral from './media-logos/android_central.svg'
import androidHeadlines from './media-logos/android_headlines.svg'
import androidPolice from './media-logos/android_police.svg'
import bbc from './media-logos/bbc.svg'
import bgr from './media-logos/bgr.svg'
import engadget from './media-logos/engadget.svg'
import futurism from './media-logos/futurism.svg'
import mobileSyrup from './media-logos/mobilesyrup.svg'
import samMobile from './media-logos/sammobile.svg'
import slashGear from './media-logos/slashgear.svg'
import techCrunch from './media-logos/techcrunch.svg'
import techRadar from './media-logos/techradar.svg'
import theVerge from './media-logos/theverge.svg'
import tomsGuide from './media-logos/toms_guide.svg'
import xda from './media-logos/xda.svg'

type Outlet = {
  name: string
  url: string
  logo: StaticImageData
}

/** A curated selection, so nothing on the page states a count. */
const OUTLETS: Outlet[] = [
  { name: '9to5Google', url: 'https://9to5google.com', logo: nineToFiveGoogle },
  { name: 'The Verge', url: 'https://www.theverge.com', logo: theVerge },
  { name: 'BBC', url: 'https://www.bbc.com', logo: bbc },
  { name: 'TechCrunch', url: 'https://techcrunch.com', logo: techCrunch },
  { name: 'Engadget', url: 'https://www.engadget.com', logo: engadget },
  { name: 'Android Police', url: 'https://www.androidpolice.com', logo: androidPolice },
  { name: "Tom's Guide", url: 'https://www.tomsguide.com', logo: tomsGuide },
  { name: 'Android Central', url: 'https://www.androidcentral.com', logo: androidCentral },
  { name: 'TechRadar', url: 'https://www.techradar.com', logo: techRadar },
  { name: 'XDA', url: 'https://www.xda-developers.com', logo: xda },
  { name: 'Android Headlines', url: 'https://www.androidheadlines.com', logo: androidHeadlines },
  { name: 'Android Authority', url: 'https://www.androidauthority.com', logo: androidAuthority },
  { name: 'SamMobile', url: 'https://www.sammobile.com', logo: samMobile },
  { name: 'SlashGear', url: 'https://www.slashgear.com', logo: slashGear },
  { name: 'Futurism', url: 'https://futurism.com', logo: futurism },
  { name: 'MobileSyrup', url: 'https://mobilesyrup.com', logo: mobileSyrup },
  { name: 'BGR', url: 'https://www.bgr.com', logo: bgr },
]

const TOP = OUTLETS.slice(0, 8)
const BOTTOM = OUTLETS.slice(8)

const Logo = ({ outlet }: { outlet: Outlet }) => (
  <span
    aria-hidden
    className="media-logo"
    style={
      {
        '--media-logo': `url('${outlet.logo.src}')`,
        '--media-logo-ratio': outlet.logo.width / outlet.logo.height,
      } as CSSProperties
    }
  />
)

const Mark = ({ outlet, focusable = true }: { outlet: Outlet; focusable?: boolean }) => (
  <a
    href={outlet.url}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={outlet.name}
    title={outlet.name}
    tabIndex={focusable ? undefined : -1}
    className="text-on-surface hover:text-primary motion-effects-default focus-ring flex shrink-0 items-center justify-center transition-colors"
  >
    <Logo outlet={outlet} />
  </a>
)

const Row = ({ outlets, focusable }: { outlets: Outlet[]; focusable: boolean }) => (
  <div className="flex shrink-0 items-center gap-12 pr-12 md:gap-16 md:pr-16">
    {outlets.map((outlet) => (
      <Mark key={outlet.name} outlet={outlet} focusable={focusable} />
    ))}
  </div>
)

/**
 * Three copies move together, so `-100%` loops without a seam. The duplicates
 * stay clickable but leave the tab order and the accessibility tree.
 */
const Track = ({ outlets, reverse, paused }: { outlets: Outlet[]; reverse?: boolean; paused: boolean }) => (
  <div className="mask-fade-sides-20% flex overflow-hidden">
    {[0, 1, 2].map((copy) => (
      <div
        key={copy}
        aria-hidden={copy > 0 ? true : undefined}
        className={reverse ? 'animate-press-ribbon-reverse flex' : 'animate-press-ribbon flex'}
        style={{ animationPlayState: paused ? 'paused' : 'running' }}
      >
        <Row outlets={outlets} focusable={copy === 0} />
      </div>
    ))}
  </div>
)

export const PressRibbon = ({ attribution }: { attribution?: ReactNode }) => {
  const [paused, setPaused] = useState(false)

  return (
    <>
      <Container className="hidden motion-reduce:block">
        <div className="flex flex-wrap items-center gap-x-12 gap-y-8 md:gap-x-16">
          {OUTLETS.map((outlet) => (
            <Mark key={outlet.name} outlet={outlet} />
          ))}
        </div>
        {attribution && <div className="mt-10 flex justify-end md:mt-12">{attribution}</div>}
      </Container>

      <div className="motion-reduce:hidden">
        <div className="flex flex-col gap-8 md:gap-10">
          <Track outlets={TOP} paused={paused} />
          <Track outlets={BOTTOM} reverse paused={paused} />
        </div>

        <Container className="mt-6 flex items-center justify-between gap-4">
          <button
            type="button"
            aria-pressed={paused}
            onClick={() => setPaused((value) => !value)}
            className={cn(
              'motion-effects-default focus-ring inline-flex min-h-10 items-center gap-2 border pr-4 pl-3 text-sm font-medium transition-[color,background-color,border-color,border-radius]',
              paused
                ? 'bg-secondary-container text-on-secondary-container hover:bg-secondary-container/80 rounded-lg border-transparent active:rounded-sm'
                : 'border-outline-variant text-on-surface-variant hover:bg-surface-container hover:text-on-surface rounded-[1.25rem] active:rounded-md',
            )}
          >
            <MaterialSymbol name={paused ? 'play_arrow' : 'pause'} className="text-lg" />
            {paused ? 'Resume' : 'Pause'}
          </button>
          {attribution}
        </Container>
      </div>
    </>
  )
}
