'use client'

import { useState } from 'react'
import { DebugMenu } from './debug-menu'
import { cn } from '@/lib/utils'
import { MaterialSymbol } from '../material-symbol'

export function DebugPanel() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="scrollbar-stable fixed right-4 bottom-4 z-50">
      {/* Panel */}
      <div
        id="debug-panel"
        inert={!isOpen}
        className={cn(
          'absolute right-0 bottom-14 max-h-[70vh] w-80 overflow-hidden',
          'bg-surface-container border-outline-variant rounded-3xl border shadow-xl',
          'motion-spatial-fast origin-bottom-right transition-[transform,opacity]',
          isOpen
            ? 'translate-y-0 scale-100 opacity-100'
            : 'pointer-events-none translate-y-3 scale-90 opacity-0',
        )}
      >
        <div className="max-h-[70vh] overflow-y-auto">
          <DebugMenu />
        </div>
      </div>

      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          'flex h-12 w-12 items-center justify-center rounded-[24px]',
          'bg-primary text-on-primary motion-spatial-fast shadow-lg transition-[transform,border-radius,box-shadow]',
          'hover:scale-110 hover:rounded-2xl hover:shadow-xl active:scale-90',
          isOpen && 'rounded-2xl',
        )}
        title="Toggle Debug Menu"
        aria-label="Toggle Debug Menu"
        aria-expanded={isOpen}
        aria-controls="debug-panel"
      >
        <MaterialSymbol
          name="shapes"
          className={cn('motion-spatial-fast transition-transform', isOpen && 'rotate-90')}
        />
      </button>
    </div>
  )
}
