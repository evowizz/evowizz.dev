import { cva, type VariantProps } from 'cva'

import { MicroLabel } from './micro-label'

const SPATIAL = [
  { name: 'Default', speed: 'default' },
  { name: 'Fast', speed: 'fast' },
  { name: 'Slow', speed: 'slow' },
] as const

const EFFECTS = [
  { name: 'Default', speed: 'default' },
  { name: 'Fast', speed: 'fast' },
  { name: 'Slow', speed: 'slow' },
] as const

const spatialPreviewVariants = cva('bg-primary h-full w-6 transition-[width] group-hover:w-full', {
  variants: {
    speed: {
      default: 'motion-spatial-default',
      fast: 'motion-spatial-fast',
      slow: 'motion-spatial-slow',
    },
  },
})

const effectPreviewVariants = cva('bg-primary h-full w-full opacity-30 transition-opacity group-hover:opacity-100', {
  variants: {
    speed: {
      default: 'motion-effects-default',
      fast: 'motion-effects-fast',
      slow: 'motion-effects-slow',
    },
  },
})

type MotionPreviewProps = {
  name: string
  speed: NonNullable<VariantProps<typeof spatialPreviewVariants>['speed']>
}

export const MotionPreview = () => {
  return (
    <div className="divide-outline-variant -my-4 flex flex-col divide-y">
      <section className="flex flex-col gap-2.5 py-4">
        <MicroLabel>Spatial</MicroLabel>
        <div className="divide-outline-variant flex flex-col divide-y">
          {SPATIAL.map((item) => (
            <SpatialItemPreview key={item.name} name={item.name} speed={item.speed} />
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-2.5 py-4">
        <MicroLabel>Effects</MicroLabel>
        <div className="divide-outline-variant flex flex-col divide-y">
          {EFFECTS.map((item) => (
            <EffectItemPreview key={item.name} name={item.name} speed={item.speed} />
          ))}
        </div>
      </section>

      <p className="text-outline-variant py-4 text-xs">Hover a tile to preview</p>
    </div>
  )
}

const SpatialItemPreview = ({ name, speed }: MotionPreviewProps) => (
  <div className="flex items-center gap-3 py-2">
    <span className="text-on-surface-variant w-14 shrink-0 text-xs font-medium">{name}</span>
    <div className="group bg-surface-container border-outline-variant relative h-6 flex-1 overflow-hidden rounded-sm border">
      <div className={spatialPreviewVariants({ speed })} />
    </div>
  </div>
)

const EffectItemPreview = ({ name, speed }: MotionPreviewProps) => (
  <div className="flex items-center gap-3 py-2">
    <span className="text-on-surface-variant w-14 shrink-0 text-xs font-medium">{name}</span>
    <div className="group bg-surface-container border-outline-variant relative h-6 flex-1 overflow-hidden rounded-sm border">
      <div className={effectPreviewVariants({ speed })} />
    </div>
  </div>
)
