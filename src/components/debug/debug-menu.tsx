'use client'

import { useState, useEffect, useCallback } from 'react'
import { useTheme } from 'next-themes'
import { HctColorPicker } from './hct-color-picker'
import { RgbColorPicker } from './rgb-color-picker'
import { ColorTokenPreview } from './color-token-preview'
import { useMaterialTheme } from '../material-theme-context'
import { Variant } from '@/lib/material'
import { cn } from '@/lib/utils'

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

type Tab = 'picker' | 'tokens'
type PickerMode = 'hct' | 'rgb'

export function DebugMenu() {
  const [activeTab, setActiveTab] = useState<Tab>('picker')
  const [pickerMode, setPickerMode] = useState<PickerMode>('hct')
  const [mounted, setMounted] = useState(false)
  const [copied, setCopied] = useState(false)
  const { theme, setTheme } = useTheme()
  const { variant, setVariant } = useMaterialTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  const copyCSS = useCallback(() => {
    const styles = getComputedStyle(document.documentElement)
    const css = COLOR_TOKENS.map((token) => {
      const value = styles.getPropertyValue(`--md-sys-color-${token}`).trim()
      return `--md-sys-color-${token}: ${value};`
    }).join('\n')

    navigator.clipboard.writeText(css).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }, [])

  return (
    <div className="text-on-surface flex flex-col gap-4 p-4">
      <h3 className="text-sm font-semibold tracking-wider uppercase opacity-60">Theme Debug</h3>

      {/* Theme Toggle */}
      <div className="flex flex-col gap-2">
        <span className="text-xs opacity-60">Theme</span>
        <div className="flex gap-1">
          <button
            onClick={() => setTheme('light')}
            className={cn(
              'flex-1 rounded-md border px-3 py-2 text-xs font-medium transition-colors',
              mounted && theme === 'light'
                ? 'bg-primary text-on-primary border-primary'
                : 'bg-surface-container border-outline-variant hover:bg-surface-container-high',
            )}
          >
            Light
          </button>
          <button
            onClick={() => setTheme('dark')}
            className={cn(
              'flex-1 rounded-md border px-3 py-2 text-xs font-medium transition-colors',
              mounted && theme === 'dark'
                ? 'bg-primary text-on-primary border-primary'
                : 'bg-surface-container border-outline-variant hover:bg-surface-container-high',
            )}
          >
            Dark
          </button>
          <button
            onClick={() => setTheme('system')}
            className={cn(
              'flex-1 rounded-md border px-3 py-2 text-xs font-medium transition-colors',
              mounted && theme === 'system'
                ? 'bg-primary text-on-primary border-primary'
                : 'bg-surface-container border-outline-variant hover:bg-surface-container-high',
            )}
          >
            System
          </button>
        </div>
      </div>

      {/* Variant Selector */}
      <div className="flex flex-col gap-2">
        <span className="text-xs opacity-60">Variant</span>
        <select
          value={variant}
          onChange={(e) => setVariant(Number(e.target.value) as Variant)}
          className="border-outline-variant bg-surface-container text-on-surface cursor-pointer appearance-none rounded-md border px-3 py-2 text-xs font-medium"
        >
          {Object.entries(VARIANT_NAMES).map(([value, name]) => (
            <option key={value} value={value}>
              {name}
            </option>
          ))}
        </select>
      </div>

      {/* Copy CSS Button */}
      <button
        onClick={copyCSS}
        className={cn(
          'rounded-md border px-3 py-2 text-xs font-medium transition-colors',
          copied
            ? 'bg-primary text-on-primary border-primary'
            : 'bg-surface-container border-outline-variant hover:bg-surface-container-high',
        )}
      >
        {copied ? 'Copied!' : 'Copy CSS Variables'}
      </button>

      {/* Tabs */}
      <div className="border-outline-variant flex gap-1 border-b">
        <button
          onClick={() => setActiveTab('picker')}
          className={cn(
            '-mb-px border-b-2 px-3 py-2 text-xs font-medium transition-colors',
            activeTab === 'picker'
              ? 'border-primary text-primary'
              : 'border-transparent opacity-60 hover:opacity-100',
          )}
        >
          Color Picker
        </button>
        <button
          onClick={() => setActiveTab('tokens')}
          className={cn(
            '-mb-px border-b-2 px-3 py-2 text-xs font-medium transition-colors',
            activeTab === 'tokens'
              ? 'border-primary text-primary'
              : 'border-transparent opacity-60 hover:opacity-100',
          )}
        >
          Color Tokens
        </button>
      </div>

      {/* Tab Content */}
      <div className="pt-2">
        {activeTab === 'picker' && (
          <div className="flex flex-col gap-4">
            {/* Picker Mode Toggle */}
            <div className="flex gap-1">
              <button
                onClick={() => setPickerMode('hct')}
                className={cn(
                  'flex-1 rounded-md border px-3 py-1.5 text-xs font-medium transition-colors',
                  pickerMode === 'hct'
                    ? 'bg-primary text-on-primary border-primary'
                    : 'bg-surface-container border-outline-variant hover:bg-surface-container-high',
                )}
              >
                HCT
              </button>
              <button
                onClick={() => setPickerMode('rgb')}
                className={cn(
                  'flex-1 rounded-md border px-3 py-1.5 text-xs font-medium transition-colors',
                  pickerMode === 'rgb'
                    ? 'bg-primary text-on-primary border-primary'
                    : 'bg-surface-container border-outline-variant hover:bg-surface-container-high',
                )}
              >
                RGB
              </button>
            </div>
            {pickerMode === 'hct' && <HctColorPicker />}
            {pickerMode === 'rgb' && <RgbColorPicker />}
          </div>
        )}
        {activeTab === 'tokens' && <ColorTokenPreview />}
      </div>
    </div>
  )
}
