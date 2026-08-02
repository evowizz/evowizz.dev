'use client'

import { useCallback, useEffect, useState } from 'react'
import { useRootFlag } from './use-root-flag'
import { clearContrastAudit, runContrastAudit } from './contrast'

const PINNED_KEY = 'devbar-pinned'

export type Tool = {
  id: string
  label: string
  icon: string
  active: boolean
  hint?: string
  toggle: () => void
}

type ToolsInput = {
  picking: boolean
  onTogglePicking: () => void
  scanning: boolean
  onToggleScanning: () => void
}

const readPinned = () => {
  try {
    const raw = localStorage.getItem(PINNED_KEY)
    return raw ? (JSON.parse(raw) as string[]) : []
  } catch {
    return []
  }
}

export const useTools = ({
  picking,
  onTogglePicking,
  scanning,
  onToggleScanning,
}: ToolsInput): { tools: Tool[]; pinned: string[]; togglePin: (id: string) => void } => {
  const [borders, setBorders] = useRootFlag('data-devbar-borders')
  const [contrast, setContrast] = useRootFlag('data-devbar-contrast')
  const [failures, setFailures] = useState(0)
  const [pinned, setPinned] = useState<string[]>([])

  // eslint-disable-next-line react-hooks/set-state-in-effect -- storage is only readable after hydration
  useEffect(() => setPinned(readPinned()), [])
  useEffect(() => () => clearContrastAudit(), [])

  const togglePin = useCallback((id: string) => {
    setPinned((current) => {
      const next = current.includes(id) ? current.filter((item) => item !== id) : [...current, id]
      try {
        localStorage.setItem(PINNED_KEY, JSON.stringify(next))
      } catch {
        // Storage is a convenience here, so a failure just means it will not persist.
      }
      return next
    })
  }, [])

  const toggleContrast = () => {
    if (contrast) {
      clearContrastAudit()
      setFailures(0)
      setContrast(false)
      return
    }
    setFailures(runContrastAudit())
    setContrast(true)
  }

  const tools: Tool[] = [
    {
      id: 'select',
      label: 'Select element',
      icon: 'point_scan',
      active: picking,
      toggle: onTogglePicking,
    },
    {
      id: 'scan',
      label: 'React Scan',
      icon: 'radar',
      active: scanning,
      toggle: onToggleScanning,
    },
    {
      id: 'borders',
      label: 'Element borders',
      icon: 'border_all',
      active: borders,
      toggle: () => setBorders((value) => !value),
    },
    {
      id: 'contrast',
      label: 'Contrast audit',
      icon: 'contrast',
      active: contrast,
      hint: contrast ? `${failures} issues` : undefined,
      toggle: toggleContrast,
    },
  ]

  return { tools, pinned, togglePin }
}
