'use client'

import { type ReactNode } from 'react'
import { Reveal } from '@/components/reveal'
import { useWidthBreath } from '@/hooks/use-width-breath'

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
