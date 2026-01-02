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

const DEFAULT_SEED_COLOR = '#33CC7A'
const DEFAULT_HCT = Hct.fromInt(argbFromHex(DEFAULT_SEED_COLOR))
const DEFAULT_VARIANT = Variant.TONAL_SPOT

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
  const [mounted, setMounted] = useState(false)
  const { resolvedTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

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
    if (!mounted) return
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
  }, [hct, isDark, variant, mounted])

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
