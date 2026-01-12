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
        className={cn(
          'absolute right-0 bottom-14 max-h-[70vh] w-80 overflow-hidden',
          'bg-surface-container border-outline-variant rounded-2xl border shadow-xl',
          'motion-effects-default origin-bottom-right transition-all',
          isOpen
            ? 'translate-y-0 scale-100 opacity-100'
            : 'pointer-events-none translate-y-2 scale-95 opacity-0',
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
          'flex h-12 w-12 items-center justify-center rounded-full',
          'bg-primary text-on-primary shadow-lg transition-all',
          'motion-effects-default hover:scale-105 hover:shadow-xl active:scale-95',
        )}
        title="Toggle Debug Menu"
      >
        <MaterialSymbol name="shapes" />
      </button>
    </div>
  )
}
