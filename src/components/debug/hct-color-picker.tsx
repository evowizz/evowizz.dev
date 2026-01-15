'use client'

import { useMaterialTheme } from '../material-theme-context'
import { Hct } from '@/lib/material'

export function HctColorPicker() {
  const { hct, setHct, currentSeedColor } = useMaterialTheme()

  const handleHueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHct(Hct.from(parseFloat(e.target.value), hct.chroma, hct.tone))
  }

  const handleChromaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHct(Hct.from(hct.hue, parseFloat(e.target.value), hct.tone))
  }

  const handleToneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHct(Hct.from(hct.hue, hct.chroma, parseFloat(e.target.value)))
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-3">
        <div
          className="border-outline-variant h-12 w-12 shrink-0 rounded-md border"
          style={{ backgroundColor: currentSeedColor }}
        />
        <div className="flex flex-col">
          <span className="text-sm font-medium">Seed Color</span>
          <span className="font-mono text-xs opacity-60">{currentSeedColor.toUpperCase()}</span>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        {/* Hue slider */}
        <div className="flex flex-col gap-1">
          <div className="flex justify-between text-xs">
            <span>Hue</span>
            <span className="font-mono">{Math.round(hct.hue)}</span>
          </div>
          <input
            type="range"
            min="0"
            max="360"
            step="1"
            value={hct.hue}
            onChange={handleHueChange}
            className="h-2 w-full cursor-pointer appearance-none rounded-full"
            style={{
              background: `linear-gradient(to right,
                hsl(0, 100%, 50%),
                hsl(60, 100%, 50%),
                hsl(120, 100%, 50%),
                hsl(180, 100%, 50%),
                hsl(240, 100%, 50%),
                hsl(300, 100%, 50%),
                hsl(360, 100%, 50%)
              )`,
            }}
          />
        </div>

        {/* Chroma slider */}
        <div className="flex flex-col gap-1">
          <div className="flex justify-between text-xs">
            <span>Chroma</span>
            <span className="font-mono">{Math.round(hct.chroma)}</span>
          </div>
          <input
            type="range"
            min="0"
            max="150"
            step="1"
            value={hct.chroma}
            onChange={handleChromaChange}
            className="bg-surface-container-high h-2 w-full cursor-pointer appearance-none rounded-full"
          />
        </div>

        {/* Tone slider */}
        <div className="flex flex-col gap-1">
          <div className="flex justify-between text-xs">
            <span>Tone</span>
            <span className="font-mono">{Math.round(hct.tone)}</span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            step="1"
            value={hct.tone}
            onChange={handleToneChange}
            className="h-2 w-full cursor-pointer appearance-none rounded-full"
            style={{
              background: 'linear-gradient(to right, #000, #fff)',
            }}
          />
        </div>
      </div>
    </div>
  )
}
