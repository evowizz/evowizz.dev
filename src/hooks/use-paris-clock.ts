'use client'

import { useEffect, useState } from 'react'

const PARIS = 'Europe/Paris'

/** CET in winter, CEST in summer, so name and offset are read off the zone. */
const readParisClock = () => {
  const now = new Date()

  const time = new Intl.DateTimeFormat('en-GB', {
    timeZone: PARIS,
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
  }).format(now)

  const zoneName = (style: 'short' | 'shortOffset') =>
    new Intl.DateTimeFormat('en-GB', { timeZone: PARIS, timeZoneName: style })
      .formatToParts(now)
      .find((part) => part.type === 'timeZoneName')?.value ?? ''

  const offset = zoneName('shortOffset').replace('GMT', 'UTC')
  const name = zoneName('short')

  return { time, zone: name && !name.startsWith('GMT') ? `${name} (${offset})` : offset }
}

/** Null until mounted: the page is static, so a server clock would be build time. */
export const useParisClock = () => {
  const [clock, setClock] = useState<{ time: string; zone: string } | null>(null)

  useEffect(() => {
    const tick = () => setClock(readParisClock())
    tick()
    const id = setInterval(tick, 30000)
    return () => clearInterval(id)
  }, [])

  return clock
}
