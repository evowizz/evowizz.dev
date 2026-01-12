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
const DEFAULT_HCT = Hct.fromInt(argbFromHex(DEFAULT_SEED_COLOR))
const DEFAULT_VARIANT = Variant.EXPRESSIVE

type MaterialThemeContextValue = {
  seedColor: string
  setSeedColor: (color: string) => void
  hct: Hct
  setHct: (hct: Hct) => void
  variant: Variant
  setVariant: (variant: Variant) => void
}

const MaterialThemeContext = createContext<MaterialThemeContextValue | null>(null)

type MaterialThemeProviderProps = {
  children: ReactNode
}

export function MaterialThemeProvider({ children }: MaterialThemeProviderProps) {
  const [hct, setHctState] = useState<Hct>(DEFAULT_HCT)
  const [variant, setVariant] = useState<Variant>(DEFAULT_VARIANT)
  const { resolvedTheme } = useTheme()
  const isSSR = useIsSSR()
  const hasResolvedTheme = resolvedTheme !== undefined

  // seedColor is derived from HCT (HCT is the source of truth)
  const seedColor = useMemo(() => {
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
    () => ({ seedColor, setSeedColor, hct, setHct, variant, setVariant }),
    [seedColor, setSeedColor, hct, setHct, variant, setVariant],
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
