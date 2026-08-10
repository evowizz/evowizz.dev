import { argbFromHex, argbFromRgb, hexFromArgb, redFromArgb, greenFromArgb, blueFromArgb } from '@/theme/material'
import { useMaterialTheme } from '@/theme/material-theme'
import { MicroLabel } from './micro-label'

const CHANNELS = ['Red', 'Green', 'Blue'] as const

export function ColorPicker() {
  const { hct, seedColor, setSeedColor } = useMaterialTheme()

  const argb = argbFromHex(seedColor)
  const rgb: [number, number, number] = [redFromArgb(argb), greenFromArgb(argb), blueFromArgb(argb)]

  const setChannel = (index: number, value: number) => {
    const next = [...rgb] as [number, number, number]
    next[index] = value
    setSeedColor(hexFromArgb(argbFromRgb(...next)))
  }

  const handleHexChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const hex = e.target.value
    if (/^#[0-9A-Fa-f]{6}$/.test(hex)) setSeedColor(hex)
  }

  const [r, g, b] = rgb
  const trackFor = (index: number) => {
    const to = (value: number) =>
      `rgb(${index === 0 ? value : r}, ${index === 1 ? value : g}, ${index === 2 ? value : b})`
    return `linear-gradient(to right, ${to(0)}, ${to(255)})`
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-3">
        <div
          className="border-outline-variant size-11 shrink-0 rounded-sm border"
          style={{ backgroundColor: seedColor }}
        />
        <div className="flex min-w-0 flex-1 flex-col gap-1">
          <MicroLabel>Seed</MicroLabel>
          <input
            type="text"
            value={seedColor.toUpperCase()}
            onChange={handleHexChange}
            pattern="^#[0-9A-Fa-f]{6}$"
            className="text-on-surface focus-ring w-full bg-transparent font-mono text-xs outline-none"
          />
        </div>
      </div>

      <p className="text-on-surface-variant border-outline-variant border-y py-2 font-mono text-[11px]">
        hct({Math.round(hct.hue)}, {Math.round(hct.chroma)}, {Math.round(hct.tone)})
      </p>

      <div className="flex flex-col gap-3">
        {CHANNELS.map((channel, index) => (
          <div key={channel} className="flex flex-col gap-1.5">
            <div className="flex items-baseline justify-between">
              <MicroLabel>{channel}</MicroLabel>
              <span className="text-on-surface font-mono text-[10px]">{rgb[index]}</span>
            </div>
            <input
              type="range"
              min="0"
              max="255"
              step="1"
              value={rgb[index]}
              onChange={(e) => setChannel(index, Number(e.target.value))}
              aria-label={channel}
              className="channel-slider focus-ring w-full cursor-pointer"
              style={{ background: trackFor(index) }}
            />
          </div>
        ))}
      </div>
    </div>
  )
}
