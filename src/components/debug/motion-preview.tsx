import { cn } from '@/lib/utils'

import { StyleableProps } from '@/types/component'
import { MicroLabel } from './micro-label'

const SPATIAL = [
  { name: 'Default', className: 'motion-spatial-default' },
  { name: 'Fast', className: 'motion-spatial-fast' },
  { name: 'Slow', className: 'motion-spatial-slow' },
]

const EFFECTS = [
  { name: 'Default', className: 'motion-effects-default' },
  { name: 'Fast', className: 'motion-effects-fast' },
  { name: 'Slow', className: 'motion-effects-slow' },
]

export const MotionPreview = () => {
  return (
    <div className="divide-outline-variant -my-4 flex flex-col divide-y">
      <section className="flex flex-col gap-2.5 py-4">
        <MicroLabel>Spatial</MicroLabel>
        <div className="divide-outline-variant flex flex-col divide-y">
          {SPATIAL.map((item) => (
            <SpatialItemPreview key={item.name} name={item.name} className={item.className} />
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-2.5 py-4">
        <MicroLabel>Effects</MicroLabel>
        <div className="divide-outline-variant flex flex-col divide-y">
          {EFFECTS.map((item) => (
            <EffectItemPreview key={item.name} name={item.name} className={item.className} />
          ))}
        </div>
      </section>

      <p className="text-outline-variant py-4 text-xs">Hover a tile to preview</p>
    </div>
  )
}

type MotionItemPreviewProps = { name: string }

const SpatialItemPreview = ({ name, className }: StyleableProps<MotionItemPreviewProps>) => (
  <div className="flex items-center gap-3 py-2">
    <span className="text-on-surface-variant w-14 shrink-0 text-xs font-medium">{name}</span>
    <div className="group bg-surface-container border-outline-variant relative h-6 flex-1 overflow-hidden rounded-sm border">
      <div className={cn('bg-primary h-full w-6', 'transition-[width]', className, 'group-hover:w-full')} />
    </div>
  </div>
)

const EffectItemPreview = ({ name, className }: StyleableProps<MotionItemPreviewProps>) => (
  <div className="flex items-center gap-3 py-2">
    <span className="text-on-surface-variant w-14 shrink-0 text-xs font-medium">{name}</span>
    <div className="group bg-surface-container border-outline-variant relative h-6 flex-1 overflow-hidden rounded-sm border">
      <div
        className={cn(
          'bg-primary h-full w-full',
          'opacity-30 transition-opacity',
          className,
          'group-hover:opacity-100',
        )}
      />
    </div>
  </div>
)
