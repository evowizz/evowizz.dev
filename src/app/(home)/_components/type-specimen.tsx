'use client'

import { type CSSProperties } from 'react'
import { cn } from '@/lib/utils'
import { MaterialSymbol } from '@/components/material-symbol'

/**
 * The axes Google Sans Flex is loaded with. Width stops at 120 rather than the
 * font's own 151 so the longest line of the name still clears the column at
 * every weight. Slant counts up so every ruler runs the same way, then gets
 * negated like `-variation-slant-*`.
 */
export const AXES = [
  { id: 'wdth', tag: 'wdth', label: 'Width', min: 25, max: 120 },
  { id: 'wght', tag: 'wght', label: 'Weight', min: 100, max: 1000 },
  { id: 'rond', tag: 'ROND', label: 'Round', min: 0, max: 100 },
  { id: 'slnt', tag: 'slnt', label: 'Slant', min: 0, max: 10 },
] as const

export type Axes = Record<(typeof AXES)[number]['id'], number>

export const REST: Axes = { wdth: 100, wght: 600, rond: 0, slnt: 0 }

/**
 * Axes carry fractions: a tween through whole numbers steps visibly, and slant
 * only has eleven of them to step through. Two decimals is far below what the
 * eye can catch and keeps the style attribute readable.
 */
const precise = (value: number) => Math.round(value * 100) / 100

/** `wght` is a plain font-weight; the rest feed what `variation-sans` reads. */
export const axesToStyle = (axes: Axes) =>
  ({
    '--font-wdth': precise(axes.wdth),
    '--font-rond': precise(axes.rond),
    '--font-slnt': precise(-axes.slnt),
    fontWeight: precise(axes.wght),
  }) as CSSProperties

type TypeSpecimenProps = {
  axes: Axes
  onChange: (axes: Axes) => void
  onReset: () => void
  /** Spins the icon while the rulers walk back. */
  resetting: boolean
}

/** The colophon for the typeface the site is set in, wired to the name itself. */
export const TypeSpecimen = ({ axes, onChange, onReset, resetting }: TypeSpecimenProps) => (
  <div className="flex flex-col gap-5">
    <div className="border-outline-variant text-outline flex items-center justify-between border-b pb-3 font-mono text-[0.625rem] tracking-[0.2em] uppercase">
      <span>Google Sans Flex</span>
      <button
        type="button"
        onClick={onReset}
        className="text-on-surface-variant hover:text-primary motion-effects-default focus-ring inline-flex items-center gap-1.5 tracking-[0.2em] uppercase transition-colors"
      >
        Reset
        <MaterialSymbol name="refresh" className={cn('text-sm', resetting && 'animate-spin')} />
      </button>
    </div>

    <div className="flex flex-col gap-4">
      {AXES.map((axis) => (
        <label key={axis.id} className="flex flex-col gap-1.5">
          <span className="flex items-baseline justify-between font-mono text-[0.625rem] tracking-[0.2em] uppercase">
            <span className="text-on-surface-variant">
              {axis.label} <span className="text-outline">{axis.tag}</span>
            </span>
            <span className="text-on-surface tabular-nums">{Math.round(axes[axis.id])}</span>
          </span>
          {/* `any` lets the thumb sit between whole numbers while a tween runs
              through it. Arrow keys then step by a hundredth of the range. */}
          <input
            type="range"
            aria-label={`${axis.label} axis`}
            min={axis.min}
            max={axis.max}
            step="any"
            value={axes[axis.id]}
            onChange={(event) => onChange({ ...axes, [axis.id]: Number(event.target.value) })}
            className="reader-slider focus-ring w-full cursor-pointer"
          />
        </label>
      ))}
    </div>

    <p className="border-outline-variant text-outline flex items-baseline justify-between border-t pt-3 font-mono text-[0.625rem] tracking-[0.2em] uppercase">
      <span>Drag to reshape the name</span> <span className="text-primary">Have some fun</span>
    </p>
  </div>
)
