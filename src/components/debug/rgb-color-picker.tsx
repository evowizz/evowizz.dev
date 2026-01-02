'use client'

import { useMaterialTheme } from '../material-theme-context'
import { Hct, argbFromHex } from '@/lib/material'

export function RgbColorPicker() {
  const { hct, setHct, seedColor } = useMaterialTheme()

  // Convert HCT to RGB
  const argb = hct.toInt()
  const r = (argb >> 16) & 0xff
  const g = (argb >> 8) & 0xff
  const b = argb & 0xff

  const handleRedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newR = parseInt(e.target.value)
    const newArgb = (0xff << 24) | (newR << 16) | (g << 8) | b
    setHct(Hct.fromInt(newArgb))
  }

  const handleGreenChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newG = parseInt(e.target.value)
    const newArgb = (0xff << 24) | (r << 16) | (newG << 8) | b
    setHct(Hct.fromInt(newArgb))
  }

  const handleBlueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newB = parseInt(e.target.value)
    const newArgb = (0xff << 24) | (r << 16) | (g << 8) | newB
    setHct(Hct.fromInt(newArgb))
  }

  const handleHexChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const hex = e.target.value
    if (/^#[0-9A-Fa-f]{6}$/.test(hex)) {
      try {
        setHct(Hct.fromInt(argbFromHex(hex)))
      } catch {
        // Invalid hex, ignore
      }
    }
  }

  return (
    <div className="flex flex-col gap-4">
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
