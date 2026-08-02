'use client'

import { createContext, useContext, useState, useCallback, useMemo, useEffect, type ReactNode, useRef } from 'react'
import { Variant, Hct, argbFromHex, createTheme, applyTheme } from '@/lib/material'
import { useIsSSR } from '@/lib/use-is-ssr'

const DEFAULT_SEED_COLOR = '#33CC7A' // Inware ref :)
const DEFAULT_VARIANT = Variant.RAINBOW

type MaterialThemeContextValue = {
  seedColor: string
  setSeedColor: (color: string) => void
  reset: () => void
  hct: Hct // Read-only, for display purposes
  variant: Variant
  setVariant: (variant: Variant) => void
}

const MaterialThemeContext = createContext<MaterialThemeContextValue | null>(null)

type MaterialThemeProviderProps = {
  children: ReactNode
  seedColor?: string
}

export function MaterialThemeProvider({
  children,
  seedColor: defaultSeedColor = DEFAULT_SEED_COLOR,
}: MaterialThemeProviderProps) {
  const [seedColor, setSeedColorState] = useState(defaultSeedColor)
  const [variant, setVariant] = useState<Variant>(DEFAULT_VARIANT)
  const isSSR = useIsSSR()
  const isFirstMount = useRef(true)

  // Falls back to the default seed, since the picker can hold a half-typed hex.
  const hct = useMemo(() => {
    try {
      return Hct.fromInt(argbFromHex(seedColor))
    } catch {
      return Hct.fromInt(argbFromHex(defaultSeedColor))
    }
  }, [seedColor, defaultSeedColor])

  const setSeedColor = useCallback((color: string) => setSeedColorState(color), [])

  const reset = useCallback(() => {
    setSeedColorState(defaultSeedColor)
    setVariant(DEFAULT_VARIANT)
  }, [defaultSeedColor])

  useEffect(() => {
    if (isSSR) return

    // Only the very first application may be skipped: the CSS already ships
    // the default values. The flag must never be re-armed afterwards, or
    // resetting back to the default seed (leaving a ThemeOverride page) gets
    // skipped too and the article color leaks onto the rest of the site.
    if (isFirstMount.current) {
      isFirstMount.current = false
      if (seedColor === defaultSeedColor && variant === DEFAULT_VARIANT) return
    }

    try {
      const theme = createTheme(seedColor, { variant })
      applyTheme(theme)
    } catch {
      // A bad seed leaves the previous theme applied, which beats an unstyled page.
    }
  }, [seedColor, variant, isSSR, defaultSeedColor])

  const value = useMemo(
    () => ({
      seedColor,
      setSeedColor,
      reset,
      hct,
      variant,
      setVariant,
    }),
    [seedColor, setSeedColor, reset, hct, variant],
  )

  return <MaterialThemeContext.Provider value={value}>{children}</MaterialThemeContext.Provider>
}

export function useMaterialTheme() {
  const context = useContext(MaterialThemeContext)
  if (!context) {
    throw new Error('useMaterialTheme must be used within a MaterialThemeProvider')
  }
  return context
}

export function ThemeOverride({ color, variant }: { color?: string; variant?: Variant }) {
  const { setSeedColor, setVariant, reset } = useMaterialTheme()

  useEffect(() => {
    if (color) setSeedColor(color)
    if (variant !== undefined) setVariant(variant)
    return () => reset()
  }, [color, variant, setSeedColor, setVariant, reset])

  return null
}
