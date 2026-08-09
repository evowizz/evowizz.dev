import { cn } from '@/lib/utils'
import { MaterialSymbol } from '@/components/material-symbol'
import { MicroLabel } from './micro-label'
import { OVERLAYS, type Overlay } from './overlays'
import { type Tool } from './use-tools'

type ToolsMenuProps = {
  tools: Tool[]
  pinned: string[]
  onTogglePin: (id: string) => void
  overlay: Overlay
  onOverlayChange: (overlay: Overlay) => void
}

export function ToolsMenu({ tools, pinned, onTogglePin, overlay, onOverlayChange }: ToolsMenuProps) {
  return (
    <div className="divide-outline-variant text-on-surface flex flex-col divide-y">
      <div className="px-4 py-3">
        <MicroLabel>Tools</MicroLabel>
      </div>

      {tools.map((tool) => {
        const isPinned = pinned.includes(tool.id)

        return (
          <div
            key={tool.id}
            className={cn(
              'group/row motion-effects-fast flex items-stretch transition-colors',
              tool.active
                ? 'bg-surface-container-low text-primary'
                : 'text-on-surface-variant hover:bg-surface-container-low',
            )}
          >
            <button
              type="button"
              onClick={tool.toggle}
              aria-pressed={tool.active}
              className="focus-ring flex flex-1 items-center justify-between gap-3 py-2.5 pl-4 text-left text-xs font-medium"
            >
              <span>{tool.label}</span>
              {tool.hint && <span className="font-mono text-[10px] opacity-70">{tool.hint}</span>}
            </button>

            <button
              type="button"
              onClick={() => onTogglePin(tool.id)}
              aria-pressed={isPinned}
              title={isPinned ? `Unpin ${tool.label}` : `Pin ${tool.label} to the bar`}
              className={cn(
                'motion-effects-fast focus-ring flex w-9 shrink-0 items-center justify-center transition-[color,opacity]',
                isPinned
                  ? 'text-primary'
                  : 'text-outline-variant hover:text-on-surface opacity-0 group-hover/row:opacity-100 focus-visible:opacity-100',
              )}
            >
              <MaterialSymbol name="keep" className={cn('text-sm', isPinned && 'symbol-fill-1')} />
            </button>
          </div>
        )
      })}

      <div className="flex flex-col gap-2 px-4 py-3">
        <MicroLabel>Overlays</MicroLabel>
        <div className="divide-outline-variant border-outline-variant grid grid-cols-3 divide-x border">
          {OVERLAYS.map((option) => (
            <button
              key={option.id}
              type="button"
              onClick={() => onOverlayChange(option.id)}
              aria-pressed={overlay === option.id}
              className={cn(
                'motion-effects-fast focus-ring px-2 py-2 text-xs font-medium transition-colors',
                overlay === option.id
                  ? 'bg-surface-container-low text-primary'
                  : 'text-on-surface-variant hover:bg-surface-container-low',
              )}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
