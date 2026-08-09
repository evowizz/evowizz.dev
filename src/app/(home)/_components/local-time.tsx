'use client'

import { useEffect, useState } from 'react'
import { useParisClock } from '@/hooks/use-paris-clock'
import { cn } from '@/lib/utils'
import { MaterialSymbol } from '@/components/material-symbol'

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

export function SignatureTime() {
  const clock = useParisClock()
  const [localTime, setLocalTime] = useState<string | null>(null)

  useEffect(() => {
    const readLocalTime = () =>
      setLocalTime(
        new Intl.DateTimeFormat('en-GB', {
          hour: '2-digit',
          minute: '2-digit',
          hourCycle: 'h23',
        }).format(new Date()),
      )

    readLocalTime()
    const id = setInterval(readLocalTime, 30000)
    return () => clearInterval(id)
  }, [])

  const parisTime = clock?.time ?? '\u00a0'
  const parisZone = clock?.zone ?? ''
  const shortZone = parisZone.replace(/\s+\(.*\)$/, '')
  const zoneOffset = parisZone.slice(shortZone.length)
  const visitorTime = localTime ?? parisTime
  const canRevealLocalTime = Boolean(
    clock && localTime && (process.env.NODE_ENV !== 'production' || localTime !== clock.time),
  )

  const parisLabel = (
    <>
      {parisTime} {shortZone}
      {zoneOffset && <span className="hidden sm:inline">{zoneOffset}</span>}
    </>
  )

  if (!canRevealLocalTime) {
    return (
      <span className="text-on-surface flex min-h-11 items-center gap-2 px-3 leading-none font-medium whitespace-nowrap tabular-nums">
        <MaterialSymbol className="text-primary text-lg leading-none" name="schedule" />
        <span>{parisLabel}</span>
      </span>
    )
  }

  return (
    <button
      type="button"
      aria-label={`Paris time ${parisTime} ${parisZone}. Your local time ${visitorTime}.`}
      className="group/time text-on-surface focus-ring flex min-h-11 cursor-default items-center gap-2 rounded-full px-3 leading-none font-medium whitespace-nowrap tabular-nums"
    >
      <MaterialSymbol
        className="text-on-surface-variant group-hover/time:text-primary group-focus-visible/time:text-primary motion-effects-fast text-lg leading-none transition-colors"
        name="schedule"
      />
      <span aria-hidden className="relative grid overflow-hidden py-1">
        <span className="motion-effects-default col-start-1 row-start-1 transition-[translate,opacity] group-hover/time:-translate-y-1.5 group-hover/time:opacity-0 group-focus-visible/time:-translate-y-1.5 group-focus-visible/time:opacity-0 motion-reduce:translate-y-0 motion-reduce:transition-none">
          {parisLabel}
        </span>
        <span className="text-primary motion-effects-default col-start-1 row-start-1 translate-y-1.5 text-left opacity-0 transition-[translate,opacity] group-hover/time:translate-y-0 group-hover/time:opacity-100 group-focus-visible/time:translate-y-0 group-focus-visible/time:opacity-100 motion-reduce:translate-y-0 motion-reduce:transition-none">
          {visitorTime} Your time
        </span>
      </span>
    </button>
  )
}
