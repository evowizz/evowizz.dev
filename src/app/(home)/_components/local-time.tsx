'use client'

import { useParisClock } from '@/hooks/use-paris-clock'
import { cn } from '@/lib/utils'

/** Reserves the line height, so the clock arriving shifts nothing below it. */
export const LocalTime = ({ timeClassName, zoneClassName }: { timeClassName?: string; zoneClassName?: string }) => {
  const clock = useParisClock()

  return (
    <>
      <span
        className={cn(
          'variation-sans block min-h-[1em] text-[clamp(2.25rem,5vw,3.75rem)] leading-none font-bold tracking-tight tabular-nums',
          timeClassName,
        )}
      >
        {clock?.time}
      </span>
      <p className={cn('min-h-[1lh] text-sm font-medium opacity-80 md:text-base', zoneClassName)}>{clock?.zone}</p>
    </>
  )
}
