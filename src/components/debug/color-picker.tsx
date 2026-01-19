'use client'

import {
  argbFromHex,
  argbFromRgb,
  hexFromArgb,
  redFromArgb,
  greenFromArgb,
  blueFromArgb,
} from '@/lib/material'
import { useMaterialTheme } from '../material-theme-context'

export function ColorPicker() {
  const { hct, seedColor, setSeedColor } = useMaterialTheme()

  // Parse RGB from seedColor using material color utilities
  const argb = argbFromHex(seedColor)
  const r = redFromArgb(argb)
  const g = greenFromArgb(argb)
  const b = blueFromArgb(argb)

  const updateFromRgb = (newR: number, newG: number, newB: number) => {
    setSeedColor(hexFromArgb(argbFromRgb(newR, newG, newB)))
  }

  const handleRedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateFromRgb(parseInt(e.target.value), g, b)
  }

  const handleGreenChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateFromRgb(r, parseInt(e.target.value), b)
  }

  const handleBlueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateFromRgb(r, g, parseInt(e.target.value))
  }

  const handleHexChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const hex = e.target.value
    if (/^#[0-9A-Fa-f]{6}$/.test(hex)) {
      setSeedColor(hex)
    }
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Seed color display */}
      <div className="flex items-center gap-3">
        <div
          className="border-outline-variant h-12 w-12 shrink-0 rounded-md border"
          style={{ backgroundColor: seedColor }}
        />
        <div className="flex flex-1 flex-col">
          <span className="text-sm font-medium">Seed Color</span>
          <input
            type="text"
            value={seedColor.toUpperCase()}
            onChange={handleHexChange}
            className="w-full border-none bg-transparent font-mono text-xs opacity-60 outline-none"
            pattern="^#[0-9A-Fa-f]{6}$"
          />
        </div>
      </div>

      {/* HCT values (read-only) */}
      <div className="bg-surface-container-high text-on-surface-variant rounded-md px-3 py-2 font-mono text-xs">
        hct({Math.round(hct.hue)}, {Math.round(hct.chroma)}, {Math.round(hct.tone)})
      </div>

      {/* RGB sliders */}
      <div className="flex flex-col gap-3">
        {/* Red slider */}
        <div className="flex flex-col gap-1">
          <div className="flex justify-between text-xs">
            <span>Red</span>
            <span className="font-mono">{r}</span>
          </div>
          <input
            type="range"
            min="0"
            max="255"
            step="1"
            value={r}
            onChange={handleRedChange}
            className="h-2 w-full cursor-pointer appearance-none rounded-full"
            style={{
              background: `linear-gradient(to right, rgb(0, ${g}, ${b}), rgb(255, ${g}, ${b}))`,
            }}
          />
        </div>

        {/* Green slider */}
        <div className="flex flex-col gap-1">
          <div className="flex justify-between text-xs">
            <span>Green</span>
            <span className="font-mono">{g}</span>
          </div>
          <input
            type="range"
            min="0"
            max="255"
            step="1"
            value={g}
            onChange={handleGreenChange}
            className="h-2 w-full cursor-pointer appearance-none rounded-full"
            style={{
              background: `linear-gradient(to right, rgb(${r}, 0, ${b}), rgb(${r}, 255, ${b}))`,
            }}
          />
        </div>

        {/* Blue slider */}
        <div className="flex flex-col gap-1">
          <div className="flex justify-between text-xs">
            <span>Blue</span>
            <span className="font-mono">{b}</span>
          </div>
          <input
            type="range"
            min="0"
            max="255"
            step="1"
            value={b}
            onChange={handleBlueChange}
            className="h-2 w-full cursor-pointer appearance-none rounded-full"
            style={{
              background: `linear-gradient(to right, rgb(${r}, ${g}, 0), rgb(${r}, ${g}, 255))`,
            }}
          />
        </div>
      </div>
    </div>
  )
}
