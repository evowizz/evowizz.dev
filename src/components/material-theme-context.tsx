'use client'

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
  useEffect,
  type ReactNode,
} from 'react'
import { useTheme } from 'next-themes'
import { Variant, Hct, argbFromHex, hexFromArgb, createScheme, applyScheme } from '@/lib/material'
import { useIsSSR } from '@/lib/use-is-ssr'

const DEFAULT_SEED_COLOR = '#33CC7A' // Inware ref :)
const DEFAULT_VARIANT = Variant.EXPRESSIVE

type MaterialThemeContextValue = {
  currentSeedColor: string
  setSeedColor: (color: string) => void
  reset: () => void
  hct: Hct
  setHct: (hct: Hct) => void
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
  seedColor = DEFAULT_SEED_COLOR,
}: MaterialThemeProviderProps) {
  const [hct, setHctState] = useState<Hct>(() => Hct.fromInt(argbFromHex(seedColor)))
  const [variant, setVariant] = useState<Variant>(DEFAULT_VARIANT)
  const { resolvedTheme } = useTheme()
  const isSSR = useIsSSR()
  const hasResolvedTheme = resolvedTheme !== undefined

  // currentSeedColor is derived from HCT (HCT is the source of truth)
  const currentSeedColor = useMemo(() => {
    return hexFromArgb(hct.toInt())
  }, [hct])

  const setHct = useCallback((newHct: Hct) => {
    setHctState(newHct)
  }, [])

  const setSeedColor = useCallback((color: string) => {
    try {
      setHctState(Hct.fromInt(argbFromHex(color)))
    } catch {
      // Keep current HCT if conversion fails
    }
  }, [])

  const reset = useCallback(() => setSeedColor(seedColor), [seedColor, setSeedColor])

  // Apply Material theme scheme
  const isDark = resolvedTheme === 'dark'

  useEffect(() => {
    if (isSSR || !hasResolvedTheme) return
    try {
      const scheme = createScheme({
        sourceColorHct: hct,
        variant,
        isDark,
        contrastLevel: 0,
      })
      applyScheme(scheme)
    } catch {
      // Scheme application failed
    }
  }, [hct, isDark, variant, hasResolvedTheme, isSSR])

  const value = useMemo(
    () => ({
      currentSeedColor,
      setSeedColor,
      reset,
      hct,
      setHct,
      variant,
      setVariant,
    }),
    [currentSeedColor, setSeedColor, reset, hct, setHct, variant, setVariant],
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

export function ThemeOverride({ color }: { color?: string }) {
  const { setSeedColor, reset } = useMaterialTheme()

  useEffect(() => {
    if (color) {
      setSeedColor(color)
    }
    return () => reset()
  }, [color, setSeedColor, reset])

  return null
}
