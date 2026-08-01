'use client'

import { cn } from '@/lib/utils'
import { MaterialSymbol } from '@/components/material-symbol'
import { AXES, type Axes } from './type-axes'

type TypeSpecimenProps = {
  axes: Axes
  onChange: (axes: Axes) => void
  onReset: () => void
  /** Spins the icon while the rulers walk back. */
  resetting: boolean
  className?: string
}

/** The colophon for the typeface the site is set in, wired to the name itself. */
export const TypeSpecimen = ({ axes, onChange, onReset, resetting, className }: TypeSpecimenProps) => (
  <div
    className={cn('border-outline-variant flex flex-col justify-center gap-5 rounded-2xl border p-6 md:p-7', className)}
  >
    <div className="border-outline-variant flex items-center justify-between gap-3 border-b pb-3">
      <span className="text-on-surface min-w-0 truncate text-sm font-medium">Google Sans Flex</span>
      <button
        type="button"
        onClick={onReset}
        className="text-on-surface-variant hover:text-primary motion-effects-default focus-ring inline-flex shrink-0 items-center gap-1.5 text-sm font-medium transition-colors"
      >
        Reset
        <MaterialSymbol name="refresh" className={cn('text-base', resetting && 'animate-spin')} />
      </button>
    </div>

    <div className="flex flex-col gap-4">
      {AXES.map((axis) => (
        <label key={axis.id} className="flex flex-col gap-1.5">
          <span className="flex items-baseline justify-between gap-3">
            <span className="text-on-surface-variant min-w-0 truncate text-sm font-medium">{axis.label}</span>
            <span className="text-primary shrink-0 font-mono text-xs tabular-nums">{Math.round(axes[axis.id])}</span>
          </span>
          {/* `step="any"` lets the thumb sit between whole numbers while a tween runs. */}
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

    <p className="border-outline-variant text-on-surface-variant flex items-baseline justify-between gap-3 border-t pt-3 text-xs">
      <span className="min-w-0 truncate">Drag to reshape the name</span>
      <span className="text-primary shrink-0 font-medium">Have some fun</span>
    </p>
  </div>
)
