'use client'

import { cn } from '@/lib/utils'
import { MicroLabel } from './micro-label'

/** Classes are written out in full: Tailwind only emits what it finds verbatim. */
type Swatch = [token: string, bg: string, fg?: string]

const COLOR_GROUPS: Record<string, Swatch[]> = {
  Primary: [
    ['primary', 'bg-primary', 'text-on-primary'],
    ['on-primary', 'bg-on-primary', 'text-primary'],
    ['primary-container', 'bg-primary-container', 'text-on-primary-container'],
    ['on-primary-container', 'bg-on-primary-container', 'text-primary-container'],
    ['inverse-primary', 'bg-inverse-primary'],
  ],
  Secondary: [
    ['secondary', 'bg-secondary', 'text-on-secondary'],
    ['on-secondary', 'bg-on-secondary', 'text-secondary'],
    ['secondary-container', 'bg-secondary-container', 'text-on-secondary-container'],
    ['on-secondary-container', 'bg-on-secondary-container', 'text-secondary-container'],
  ],
  Tertiary: [
    ['tertiary', 'bg-tertiary', 'text-on-tertiary'],
    ['on-tertiary', 'bg-on-tertiary', 'text-tertiary'],
    ['tertiary-container', 'bg-tertiary-container', 'text-on-tertiary-container'],
    ['on-tertiary-container', 'bg-on-tertiary-container', 'text-tertiary-container'],
  ],
  Error: [
    ['error', 'bg-error', 'text-on-error'],
    ['on-error', 'bg-on-error', 'text-error'],
    ['error-container', 'bg-error-container', 'text-on-error-container'],
    ['on-error-container', 'bg-on-error-container', 'text-error-container'],
  ],
  Surface: [
    ['surface', 'bg-surface', 'text-on-surface'],
    ['on-surface', 'bg-on-surface', 'text-surface'],
    ['surface-variant', 'bg-surface-variant', 'text-on-surface-variant'],
    ['on-surface-variant', 'bg-on-surface-variant', 'text-surface-variant'],
    ['surface-dim', 'bg-surface-dim'],
    ['surface-bright', 'bg-surface-bright'],
    ['inverse-surface', 'bg-inverse-surface', 'text-inverse-on-surface'],
    ['inverse-on-surface', 'bg-inverse-on-surface', 'text-inverse-surface'],
  ],
  'Surface Container': [
    ['surface-container-lowest', 'bg-surface-container-lowest'],
    ['surface-container-low', 'bg-surface-container-low'],
    ['surface-container', 'bg-surface-container'],
    ['surface-container-high', 'bg-surface-container-high'],
    ['surface-container-highest', 'bg-surface-container-highest'],
  ],
  Outline: [
    ['outline', 'bg-outline'],
    ['outline-variant', 'bg-outline-variant'],
  ],
  Fixed: [
    ['primary-fixed', 'bg-primary-fixed', 'text-on-primary-fixed'],
    ['on-primary-fixed', 'bg-on-primary-fixed', 'text-primary-fixed'],
    ['primary-fixed-dim', 'bg-primary-fixed-dim', 'text-on-primary-fixed-variant'],
    ['on-primary-fixed-variant', 'bg-on-primary-fixed-variant', 'text-primary-fixed-dim'],
    ['secondary-fixed', 'bg-secondary-fixed', 'text-on-secondary-fixed'],
    ['on-secondary-fixed', 'bg-on-secondary-fixed', 'text-secondary-fixed'],
    ['secondary-fixed-dim', 'bg-secondary-fixed-dim', 'text-on-secondary-fixed-variant'],
    ['on-secondary-fixed-variant', 'bg-on-secondary-fixed-variant', 'text-secondary-fixed-dim'],
    ['tertiary-fixed', 'bg-tertiary-fixed', 'text-on-tertiary-fixed'],
    ['on-tertiary-fixed', 'bg-on-tertiary-fixed', 'text-tertiary-fixed'],
    ['tertiary-fixed-dim', 'bg-tertiary-fixed-dim', 'text-on-tertiary-fixed-variant'],
    ['on-tertiary-fixed-variant', 'bg-on-tertiary-fixed-variant', 'text-tertiary-fixed-dim'],
  ],
  Other: [
    ['background', 'bg-background', 'text-on-background'],
    ['on-background', 'bg-on-background', 'text-background'],
    ['surface-tint', 'bg-surface-tint'],
    ['scrim', 'bg-scrim'],
    ['shadow', 'bg-shadow'],
  ],
}

const ColorSwatch = ({ token, bg, fg }: { token: string; bg: string; fg?: string }) => (
  <div className="flex flex-col gap-1">
    <div className={cn('border-outline-variant flex h-12 items-center justify-center rounded-sm border', bg)}>
      {fg && <span className={cn('text-xs font-medium', fg)}>Aa</span>}
    </div>
    <span className="text-on-surface-variant truncate font-mono text-[11px]" title={token}>
      {token}
    </span>
  </div>
)

export function ColorTokenPreview() {
  return (
    <div className="divide-outline-variant -my-4 flex max-h-[60vh] flex-col divide-y overflow-y-auto">
      {Object.entries(COLOR_GROUPS).map(([groupName, swatches]) => (
        <section key={groupName} className="flex flex-col gap-2.5 py-4">
          <MicroLabel>{groupName}</MicroLabel>
          <div className="grid grid-cols-3 gap-2">
            {swatches.map(([token, bg, fg]) => (
              <ColorSwatch key={token} token={token} bg={bg} fg={fg} />
            ))}
          </div>
        </section>
      ))}
    </div>
  )
}
