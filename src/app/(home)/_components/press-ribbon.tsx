'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { mediaLogos, type MediaLogos } from '@/components/svg'
import { Container } from '@/components/elements'

type Outlet = { name: string; url: string; logo: MediaLogos }

/** A selection, not the total, so no count is stated anywhere. */
const OUTLETS: Outlet[] = [
  { name: '9to5Google', url: 'https://9to5google.com', logo: '9to5google' },
  { name: 'The Verge', url: 'https://www.theverge.com', logo: 'theverge' },
  { name: 'BBC', url: 'https://www.bbc.com', logo: 'bbc' },
  { name: 'TechCrunch', url: 'https://techcrunch.com', logo: 'techcrunch' },
  { name: 'Engadget', url: 'https://www.engadget.com', logo: 'engadget' },
  { name: 'Android Police', url: 'https://www.androidpolice.com', logo: 'android_police' },
  { name: "Tom's Guide", url: 'https://www.tomsguide.com', logo: 'toms_guide' },
  { name: 'Android Central', url: 'https://www.androidcentral.com', logo: 'android_central' },
  { name: 'TechRadar', url: 'https://www.techradar.com', logo: 'techradar' },
  { name: 'XDA', url: 'https://www.xda-developers.com', logo: 'xda' },
  { name: 'Android Headlines', url: 'https://www.androidheadlines.com', logo: 'android_headlines' },
  { name: 'Android Authority', url: 'https://www.androidauthority.com', logo: 'android_authority' },
  { name: 'SamMobile', url: 'https://www.sammobile.com', logo: 'sammobile' },
  { name: 'SlashGear', url: 'https://www.slashgear.com', logo: 'slashgear' },
  { name: 'Futurism', url: 'https://futurism.com', logo: 'futurism' },
  { name: 'MobileSyrup', url: 'https://mobilesyrup.com', logo: 'mobilesyrup' },
  { name: 'BGR', url: 'https://www.bgr.com', logo: 'bgr' },
]

// The better-known mastheads lead the top row.
const TOP = OUTLETS.slice(0, 8)
const BOTTOM = OUTLETS.slice(8)

/** Caps the width too: these wordmarks run 2.4:1 to 9.4:1, so one height ragged them. */
const Mark = ({ outlet }: { outlet: Outlet }) => {
  const Logo = mediaLogos[outlet.logo]
  return (
    <a
      href={outlet.url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={outlet.name}
      title={outlet.name}
      className="text-on-surface hover:text-primary motion-effects-default focus-ring flex shrink-0 items-center justify-center transition-colors"
    >
      <Logo aria-hidden className="h-7 w-auto max-w-32" />
    </a>
  )
}

const Row = ({ outlets }: { outlets: Outlet[] }) => (
  <div className="flex shrink-0 items-center gap-12 pr-12 md:gap-16 md:pr-16">
    {outlets.map((outlet) => (
      <Mark key={outlet.name} outlet={outlet} />
    ))}
  </div>
)

/** Three copies slide as one, so `-100%` loops with no visible seam. */
const Track = ({ outlets, reverse }: { outlets: Outlet[]; reverse?: boolean }) => (
  <div className="mask-fade-sides-20% flex overflow-hidden">
    {[0, 1, 2].map((copy) => (
      <motion.div
        key={copy}
        initial={{ translateX: reverse ? '-100%' : '0%' }}
        animate={{ translateX: reverse ? '0%' : '-100%' }}
        transition={{ duration: 50, repeat: Infinity, ease: 'linear' }}
        className="flex"
      >
        <Row outlets={outlets} />
      </motion.div>
    ))}
  </div>
)

/**
 * Runs two rows in opposite directions behind a side fade.
 *
 * Both start still, since the preference is only readable on the client and must
 * not decide the first paint. Reduced motion keeps the still set, wrapped.
 */
export const PressRibbon = () => {
  const [animate, setAnimate] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const sync = () => setAnimate(!mq.matches)
    sync()
    mq.addEventListener('change', sync)
    return () => mq.removeEventListener('change', sync)
  }, [])

  if (!animate) {
    return (
      <Container>
        <div className="flex flex-wrap items-center gap-x-12 gap-y-8 md:gap-x-16">
          {OUTLETS.map((outlet) => (
            <Mark key={outlet.name} outlet={outlet} />
          ))}
        </div>
      </Container>
    )
  }

  return (
    <div className="flex flex-col gap-8 md:gap-10">
      <Track outlets={TOP} />
      <Track outlets={BOTTOM} reverse />
    </div>
  )
}
