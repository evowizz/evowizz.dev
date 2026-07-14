import { cn } from '@/lib/utils'

import { StyleableProps } from '@/types/component'

export const MotionPreview = () => {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-3">
        <h4 className="text-xs font-semibold tracking-wider uppercase opacity-60">Spatial</h4>
        <div className="flex flex-col gap-2">
          <SpatialItemPreview name="Default" className="motion-spatial-default" />
          <SpatialItemPreview name="Fast" className="motion-spatial-fast" />
          <SpatialItemPreview name="Slow" className="motion-spatial-slow" />
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <h4 className="text-xs font-semibold tracking-wider uppercase opacity-60">Effects</h4>
        <div className="flex flex-col gap-2">
          <EffectItemPreview name="Default" className="motion-effects-default" />
          <EffectItemPreview name="Fast" className="motion-effects-fast" />
          <EffectItemPreview name="Slow" className="motion-effects-slow" />
        </div>
      </div>

      <p className="text-on-surface-variant text-[10px] opacity-70">Hover a tile to preview.</p>
    </div>
  )
}

type MotionItemPreviewProps = { name: string }

const SpatialItemPreview = ({ name, className }: StyleableProps<MotionItemPreviewProps>) => {
  return (
    <div className="flex items-center gap-4">
      <div className="w-16 shrink-0 text-xs font-medium opacity-80">{name}</div>
      <div className="group bg-surface-container-high border-outline-variant relative h-8 flex-1 overflow-hidden rounded-md border">
        <div
          className={cn(
            'bg-primary h-full w-8 rounded-md',
            'transition-[width]',
            className,
            'group-hover:w-full',
          )}
        />
      </div>
    </div>
  )
}

const EffectItemPreview = ({ name, className }: StyleableProps<MotionItemPreviewProps>) => {
  return (
    <div className="flex items-center gap-4">
      <div className="w-16 shrink-0 text-xs font-medium opacity-80">{name}</div>
      <div className="group bg-surface-container-high border-outline-variant relative h-8 flex-1 overflow-hidden rounded-md border">
        <div
          className={cn(
            'bg-primary h-full w-full rounded-md',
            'opacity-30 transition-opacity',
            className,
            'group-hover:opacity-100',
          )}
        />
      </div>
    </div>
  )
}
