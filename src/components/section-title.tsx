'use client'

import { type ReactNode } from 'react'
import { Reveal } from '@/components/reveal'
import { useWidthBreath } from '@/hooks/use-width-breath'

/** Page-level h1 at hero scale: breathes in on load like the home hero. */
export const PageTitle = ({ children }: { children: ReactNode }) => {
  const ref = useWidthBreath<HTMLHeadingElement>({ from: 74, duration: 1.4, delay: 0.15 })

  return (
    <Reveal immediate>
      <h1
        ref={ref}
        className="variation-sans text-on-surface text-[clamp(3.25rem,11vw,8.5rem)] leading-none font-semibold tracking-[-0.03em]"
      >
        {children}
      </h1>
    </Reveal>
  )
}

/** Section heading that slightly stands out and settles its width on reveal. */
export const SectionTitle = ({ children }: { children: ReactNode }) => {
  const ref = useWidthBreath<HTMLHeadingElement>({ from: 84, duration: 0.9, scroll: true })

  return (
    <Reveal>
      <h2
        ref={ref}
        className="variation-sans text-on-surface text-4xl font-bold tracking-tight md:text-5xl"
      >
        {children}
      </h2>
    </Reveal>
  )
}
