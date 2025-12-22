'use client'

type ColorToken = {
  token: string
  onToken?: string
}

const COLOR_GROUPS: Record<string, ColorToken[]> = {
  Primary: [
    { token: 'primary', onToken: 'on-primary' },
    { token: 'on-primary', onToken: 'primary' },
    { token: 'primary-container', onToken: 'on-primary-container' },
    { token: 'on-primary-container', onToken: 'primary-container' },
    { token: 'inverse-primary' },
  ],
  Secondary: [
    { token: 'secondary', onToken: 'on-secondary' },
    { token: 'on-secondary', onToken: 'secondary' },
    { token: 'secondary-container', onToken: 'on-secondary-container' },
    { token: 'on-secondary-container', onToken: 'secondary-container' },
  ],
  Tertiary: [
    { token: 'tertiary', onToken: 'on-tertiary' },
    { token: 'on-tertiary', onToken: 'tertiary' },
    { token: 'tertiary-container', onToken: 'on-tertiary-container' },
    { token: 'on-tertiary-container', onToken: 'tertiary-container' },
  ],
  Error: [
    { token: 'error', onToken: 'on-error' },
    { token: 'on-error', onToken: 'error' },
    { token: 'error-container', onToken: 'on-error-container' },
    { token: 'on-error-container', onToken: 'error-container' },
  ],
  Surface: [
    { token: 'surface', onToken: 'on-surface' },
    { token: 'on-surface', onToken: 'surface' },
    { token: 'surface-variant', onToken: 'on-surface-variant' },
    { token: 'on-surface-variant', onToken: 'surface-variant' },
    { token: 'surface-dim' },
    { token: 'surface-bright' },
    { token: 'inverse-surface', onToken: 'inverse-on-surface' },
    { token: 'inverse-on-surface', onToken: 'inverse-surface' },
  ],
  'Surface Container': [
    { token: 'surface-container-lowest' },
    { token: 'surface-container-low' },
    { token: 'surface-container' },
    { token: 'surface-container-high' },
    { token: 'surface-container-highest' },
  ],
  Outline: [
    { token: 'outline' },
    { token: 'outline-variant' },
  ],
  Fixed: [
    { token: 'primary-fixed', onToken: 'on-primary-fixed' },
    { token: 'on-primary-fixed', onToken: 'primary-fixed' },
    { token: 'primary-fixed-dim', onToken: 'on-primary-fixed-variant' },
    { token: 'on-primary-fixed-variant', onToken: 'primary-fixed-dim' },
    { token: 'secondary-fixed', onToken: 'on-secondary-fixed' },
    { token: 'on-secondary-fixed', onToken: 'secondary-fixed' },
    { token: 'secondary-fixed-dim', onToken: 'on-secondary-fixed-variant' },
    { token: 'on-secondary-fixed-variant', onToken: 'secondary-fixed-dim' },
    { token: 'tertiary-fixed', onToken: 'on-tertiary-fixed' },
    { token: 'on-tertiary-fixed', onToken: 'tertiary-fixed' },
    { token: 'tertiary-fixed-dim', onToken: 'on-tertiary-fixed-variant' },
    { token: 'on-tertiary-fixed-variant', onToken: 'tertiary-fixed-dim' },
  ],
  Other: [
    { token: 'background', onToken: 'on-background' },
    { token: 'on-background', onToken: 'background' },
    { token: 'surface-tint' },
    { token: 'scrim' },
    { token: 'shadow' },
  ],
}

type ColorSwatchProps = {
  token: string
  onToken?: string
}

function ColorSwatch({ token, onToken }: ColorSwatchProps) {
  return (
    <div
      className="rounded-md overflow-hidden border border-outline-variant/30 h-20 relative group"
      style={{ backgroundColor: `var(--md-sys-color-${token})` }}
      title={token}
    >
      <div className="absolute inset-0 flex items-center justify-center">
        {onToken && (
          <span
            className="text-sm font-medium"
            style={{ color: `var(--md-sys-color-${onToken})` }}
          >
            Aa
          </span>
        )}
      </div>
      <div className="absolute bottom-0 left-0 right-0 px-2 py-1.5 backdrop-blur-sm bg-black/75">
        <span className="text-[8px] truncate block text-white">
          {token}
        </span>
      </div>
    </div>
  )
}

export function ColorTokenPreview() {
  return (
    <div className="flex flex-col gap-4 max-h-[60vh] overflow-y-auto pr-2">
      {Object.entries(COLOR_GROUPS).map(([groupName, colors]) => (
        <div key={groupName} className="flex flex-col gap-2">
          <h4 className="text-xs font-semibold opacity-60 uppercase tracking-wider">
            {groupName}
          </h4>
          <div className="grid grid-cols-3 gap-1.5">
            {colors.map((color) => (
              <ColorSwatch key={color.token} token={color.token} onToken={color.onToken} />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
