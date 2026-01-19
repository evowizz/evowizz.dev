'use client'

import { cn } from '@/lib/utils'

type ColorToken = {
  token: string
  bgClass: string
  textClass?: string
}

const COLOR_GROUPS: Record<string, ColorToken[]> = {
  Primary: [
    { token: 'primary', bgClass: 'bg-primary', textClass: 'text-on-primary' },
    { token: 'on-primary', bgClass: 'bg-on-primary', textClass: 'text-primary' },
    { token: 'primary-container', bgClass: 'bg-primary-container', textClass: 'text-on-primary-container' },
    { token: 'on-primary-container', bgClass: 'bg-on-primary-container', textClass: 'text-primary-container' },
    { token: 'inverse-primary', bgClass: 'bg-inverse-primary' },
  ],
  Secondary: [
    { token: 'secondary', bgClass: 'bg-secondary', textClass: 'text-on-secondary' },
    { token: 'on-secondary', bgClass: 'bg-on-secondary', textClass: 'text-secondary' },
    { token: 'secondary-container', bgClass: 'bg-secondary-container', textClass: 'text-on-secondary-container' },
    { token: 'on-secondary-container', bgClass: 'bg-on-secondary-container', textClass: 'text-secondary-container' },
  ],
  Tertiary: [
    { token: 'tertiary', bgClass: 'bg-tertiary', textClass: 'text-on-tertiary' },
    { token: 'on-tertiary', bgClass: 'bg-on-tertiary', textClass: 'text-tertiary' },
    { token: 'tertiary-container', bgClass: 'bg-tertiary-container', textClass: 'text-on-tertiary-container' },
    { token: 'on-tertiary-container', bgClass: 'bg-on-tertiary-container', textClass: 'text-tertiary-container' },
  ],
  Error: [
    { token: 'error', bgClass: 'bg-error', textClass: 'text-on-error' },
    { token: 'on-error', bgClass: 'bg-on-error', textClass: 'text-error' },
    { token: 'error-container', bgClass: 'bg-error-container', textClass: 'text-on-error-container' },
    { token: 'on-error-container', bgClass: 'bg-on-error-container', textClass: 'text-error-container' },
  ],
  Surface: [
    { token: 'surface', bgClass: 'bg-surface', textClass: 'text-on-surface' },
    { token: 'on-surface', bgClass: 'bg-on-surface', textClass: 'text-surface' },
    { token: 'surface-variant', bgClass: 'bg-surface-variant', textClass: 'text-on-surface-variant' },
    { token: 'on-surface-variant', bgClass: 'bg-on-surface-variant', textClass: 'text-surface-variant' },
    { token: 'surface-dim', bgClass: 'bg-surface-dim' },
    { token: 'surface-bright', bgClass: 'bg-surface-bright' },
    { token: 'inverse-surface', bgClass: 'bg-inverse-surface', textClass: 'text-inverse-on-surface' },
    { token: 'inverse-on-surface', bgClass: 'bg-inverse-on-surface', textClass: 'text-inverse-surface' },
  ],
  'Surface Container': [
    { token: 'surface-container-lowest', bgClass: 'bg-surface-container-lowest' },
    { token: 'surface-container-low', bgClass: 'bg-surface-container-low' },
    { token: 'surface-container', bgClass: 'bg-surface-container' },
    { token: 'surface-container-high', bgClass: 'bg-surface-container-high' },
    { token: 'surface-container-highest', bgClass: 'bg-surface-container-highest' },
  ],
  Outline: [
    { token: 'outline', bgClass: 'bg-outline' },
    { token: 'outline-variant', bgClass: 'bg-outline-variant' },
  ],
  Fixed: [
    { token: 'primary-fixed', bgClass: 'bg-primary-fixed', textClass: 'text-on-primary-fixed' },
    { token: 'on-primary-fixed', bgClass: 'bg-on-primary-fixed', textClass: 'text-primary-fixed' },
    { token: 'primary-fixed-dim', bgClass: 'bg-primary-fixed-dim', textClass: 'text-on-primary-fixed-variant' },
    { token: 'on-primary-fixed-variant', bgClass: 'bg-on-primary-fixed-variant', textClass: 'text-primary-fixed-dim' },
    { token: 'secondary-fixed', bgClass: 'bg-secondary-fixed', textClass: 'text-on-secondary-fixed' },
    { token: 'on-secondary-fixed', bgClass: 'bg-on-secondary-fixed', textClass: 'text-secondary-fixed' },
    { token: 'secondary-fixed-dim', bgClass: 'bg-secondary-fixed-dim', textClass: 'text-on-secondary-fixed-variant' },
    { token: 'on-secondary-fixed-variant', bgClass: 'bg-on-secondary-fixed-variant', textClass: 'text-secondary-fixed-dim' },
    { token: 'tertiary-fixed', bgClass: 'bg-tertiary-fixed', textClass: 'text-on-tertiary-fixed' },
    { token: 'on-tertiary-fixed', bgClass: 'bg-on-tertiary-fixed', textClass: 'text-tertiary-fixed' },
    { token: 'tertiary-fixed-dim', bgClass: 'bg-tertiary-fixed-dim', textClass: 'text-on-tertiary-fixed-variant' },
    { token: 'on-tertiary-fixed-variant', bgClass: 'bg-on-tertiary-fixed-variant', textClass: 'text-tertiary-fixed-dim' },
  ],
  Other: [
    { token: 'background', bgClass: 'bg-background', textClass: 'text-on-background' },
    { token: 'on-background', bgClass: 'bg-on-background', textClass: 'text-background' },
    { token: 'surface-tint', bgClass: 'bg-surface-tint' },
    { token: 'scrim', bgClass: 'bg-scrim' },
    { token: 'shadow', bgClass: 'bg-shadow' },
  ],
}

type ColorSwatchProps = {
  token: string
  bgClass: string
  textClass?: string
}

function ColorSwatch({ token, bgClass, textClass }: ColorSwatchProps) {
  return (
    <div
      className={cn(
        'border-outline-variant/30 group relative h-20 overflow-hidden rounded-md border',
        bgClass,
      )}
      title={token}
    >
      <div className="absolute inset-0 flex items-center justify-center">
        {textClass && <span className={cn('text-sm font-medium', textClass)}>Aa</span>}
      </div>
      <div className="absolute right-0 bottom-0 left-0 bg-black/75 px-2 py-1.5 backdrop-blur-sm">
        <span className="block truncate text-[8px] text-white">{token}</span>
      </div>
    </div>
  )
}

export function ColorTokenPreview() {
  return (
    <div className="flex max-h-[60vh] flex-col gap-4 overflow-y-auto pr-2">
      {Object.entries(COLOR_GROUPS).map(([groupName, colors]) => (
        <div key={groupName} className="flex flex-col gap-2">
          <h4 className="text-xs font-semibold tracking-wider uppercase opacity-60">{groupName}</h4>
          <div className="grid grid-cols-3 gap-1.5">
            {colors.map((color) => (
              <ColorSwatch
                key={color.token}
                token={color.token}
                bgClass={color.bgClass}
                textClass={color.textClass}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
