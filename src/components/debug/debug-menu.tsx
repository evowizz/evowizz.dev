'use client'

import { useState, useCallback } from 'react'
import { useTheme } from 'next-themes'
import { ColorPicker } from './color-picker'
import { ColorTokenPreview } from './color-token-preview'
import { MotionPreview } from './motion-preview'
import { useMaterialTheme } from '../material-theme-context'
import { Variant } from '@/lib/material'
import { cn } from '@/lib/utils'
import { useIsSSR } from '@/lib/use-is-ssr'
import { MicroLabel } from './micro-label'

const VARIANT_NAMES: Record<Variant, string> = {
  [Variant.MONOCHROME]: 'Monochrome',
  [Variant.NEUTRAL]: 'Neutral',
  [Variant.TONAL_SPOT]: 'Tonal Spot',
  [Variant.VIBRANT]: 'Vibrant',
  [Variant.EXPRESSIVE]: 'Expressive',
  [Variant.FIDELITY]: 'Fidelity',
  [Variant.CONTENT]: 'Content',
  [Variant.RAINBOW]: 'Rainbow',
  [Variant.FRUIT_SALAD]: 'Fruit Salad',
  [Variant.CMF]: 'CMF',
}

const COLOR_TOKENS = [
  'primary',
  'on-primary',
  'primary-container',
  'on-primary-container',
  'inverse-primary',
  'secondary',
  'on-secondary',
  'secondary-container',
  'on-secondary-container',
  'tertiary',
  'on-tertiary',
  'tertiary-container',
  'on-tertiary-container',
  'error',
  'on-error',
  'error-container',
  'on-error-container',
  'background',
  'on-background',
  'surface',
  'on-surface',
  'surface-variant',
  'on-surface-variant',
  'surface-dim',
  'surface-bright',
  'surface-container-lowest',
  'surface-container-low',
  'surface-container',
  'surface-container-high',
  'surface-container-highest',
  'outline',
  'outline-variant',
  'shadow',
  'scrim',
  'inverse-surface',
  'inverse-on-surface',
  'surface-tint',
  'primary-fixed',
  'primary-fixed-dim',
  'on-primary-fixed',
  'on-primary-fixed-variant',
  'secondary-fixed',
  'secondary-fixed-dim',
  'on-secondary-fixed',
  'on-secondary-fixed-variant',
  'tertiary-fixed',
  'tertiary-fixed-dim',
  'on-tertiary-fixed',
  'on-tertiary-fixed-variant',
]

const MODES = [
  { id: 'light', label: 'Light' },
  { id: 'dark', label: 'Dark' },
  { id: 'system', label: 'System' },
] as const

const TABS = [
  { id: 'picker', label: 'Seed' },
  { id: 'tokens', label: 'Tokens' },
  { id: 'motion', label: 'Motion' },
] as const

type Tab = (typeof TABS)[number]['id']

export function DebugMenu() {
  const [activeTab, setActiveTab] = useState<Tab>('picker')
  const [copied, setCopied] = useState(false)
  const { theme, setTheme } = useTheme()
  const { variant, setVariant } = useMaterialTheme()
  const isSSR = useIsSSR()

  const copyCSS = useCallback(() => {
    const styles = getComputedStyle(document.documentElement)

    const lightCSS = COLOR_TOKENS.map((token) => {
      const value = styles.getPropertyValue(`--md-sys-color-${token}-light`).trim()
      return `--md-sys-color-${token}-light: ${value};`
    }).join('\n')

    const darkCSS = COLOR_TOKENS.map((token) => {
      const value = styles.getPropertyValue(`--md-sys-color-${token}-dark`).trim()
      return `--md-sys-color-${token}-dark: ${value};`
    }).join('\n')

    const css = `/* Light mode tokens */\n${lightCSS}\n\n/* Dark mode tokens */\n${darkCSS}`

    navigator.clipboard.writeText(css).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }, [])

  return (
    <div className="divide-outline-variant text-on-surface flex flex-col divide-y">
      <div className="flex items-baseline justify-between px-4 py-3">
        <MicroLabel>Theme</MicroLabel>
        <span className="text-outline-variant text-[10px] font-medium tracking-[0.08em] uppercase">
          {VARIANT_NAMES[variant]}
        </span>
      </div>

      <div className="divide-outline-variant grid grid-cols-3 divide-x">
        {MODES.map((mode) => (
          <button
            key={mode.id}
            onClick={() => setTheme(mode.id)}
            className={cn(
              'motion-effects-fast focus-ring px-3 py-2.5 text-xs font-medium transition-colors',
              !isSSR && theme === mode.id
                ? 'bg-surface-container-low text-primary'
                : 'text-on-surface-variant hover:bg-surface-container-low',
            )}
          >
            {mode.label}
          </button>
        ))}
      </div>

      <label className="flex items-center justify-between gap-3 px-4 py-2.5">
        <MicroLabel>Variant</MicroLabel>
        <select
          value={variant}
          onChange={(e) => setVariant(Number(e.target.value) as Variant)}
          className="text-on-surface focus-ring cursor-pointer appearance-none bg-transparent text-right text-xs font-medium"
        >
          {Object.entries(VARIANT_NAMES).map(([value, name]) => (
            <option key={value} value={value}>
              {name}
            </option>
          ))}
        </select>
      </label>

      <button
        onClick={copyCSS}
        className={cn(
          'motion-effects-fast focus-ring px-4 py-2.5 text-left text-xs font-medium transition-colors',
          copied ? 'text-primary' : 'text-on-surface-variant hover:bg-surface-container-low',
        )}
      >
        {copied ? 'Copied to clipboard' : 'Copy CSS variables'}
      </button>

      <div className="divide-outline-variant grid grid-cols-3 divide-x">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              'motion-effects-fast focus-ring px-3 py-2.5 text-xs font-medium transition-colors',
              activeTab === tab.id
                ? 'bg-surface-container-low text-primary'
                : 'text-on-surface-variant hover:bg-surface-container-low',
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="p-4">
        {activeTab === 'picker' && <ColorPicker />}
        {activeTab === 'tokens' && <ColorTokenPreview />}
        {activeTab === 'motion' && <MotionPreview />}
      </div>
    </div>
  )
}
