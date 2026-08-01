'use client'

import { useParisClock } from '@/hooks/use-paris-clock'

/** Reserves the line height, so the clock arriving shifts nothing below it. */
export const LocalTime = () => {
  const clock = useParisClock()

  return (
    <>
      <span className="variation-sans block min-h-[1em] text-[clamp(2.25rem,5vw,3.75rem)] leading-none font-bold tracking-tight tabular-nums">
        {clock?.time}
      </span>
      <p className="text-base leading-snug font-medium md:text-lg">
        local time{clock ? `, ${clock.zone}` : ''}. Happy to work remote.
      </p>
    </>
  )
}
