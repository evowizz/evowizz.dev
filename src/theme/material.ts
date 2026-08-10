import {
  argbFromHex,
  argbFromRgb,
  hexFromArgb,
  redFromArgb,
  greenFromArgb,
  blueFromArgb,
  Hct,
  DynamicScheme,
  Variant,
} from '@evowizz/material-color-utilities-canary'

export { Hct, Variant, argbFromHex, argbFromRgb, hexFromArgb, redFromArgb, greenFromArgb, blueFromArgb }

export type SpecVersion = '2021' | '2025'

export type Theme = {
  source: number
  schemes: {
    light: DynamicScheme
    dark: DynamicScheme
  }
}

export type ThemeOptions = {
  variant?: Variant
  contrastLevel?: number
  specVersion?: SpecVersion
}

export function createTheme(sourceColorHex: string, options: ThemeOptions = {}): Theme {
  const { variant = Variant.TONAL_SPOT, contrastLevel = 0, specVersion = '2025' } = options
  const source = argbFromHex(sourceColorHex)
  const sourceColorHct = Hct.fromInt(source)

  return {
    source,
    schemes: {
      light: new DynamicScheme({
        sourceColorHct,
        variant,
        contrastLevel,
        specVersion,
        isDark: false,
      }),
      dark: new DynamicScheme({
        sourceColorHct,
        variant,
        contrastLevel,
        specVersion,
        isDark: true,
      }),
    },
  }
}

/** Writes both schemes onto the target as `-light` and `-dark` suffixed properties. */
export function applyTheme(theme: Theme, target: HTMLElement = document.documentElement): void {
  setSchemeProperties(target, theme.schemes.light, '-light')
  setSchemeProperties(target, theme.schemes.dark, '-dark')
}

// All Material Design 3 color tokens available on DynamicScheme
const COLOR_TOKENS = [
  'primary',
  'onPrimary',
  'primaryContainer',
  'onPrimaryContainer',
  'inversePrimary',
  'secondary',
  'onSecondary',
  'secondaryContainer',
  'onSecondaryContainer',
  'tertiary',
  'onTertiary',
  'tertiaryContainer',
  'onTertiaryContainer',
  'error',
  'onError',
  'errorContainer',
  'onErrorContainer',
  'background',
  'onBackground',
  'surface',
  'onSurface',
  'surfaceVariant',
  'onSurfaceVariant',
  'surfaceDim',
  'surfaceBright',
  'surfaceContainerLowest',
  'surfaceContainerLow',
  'surfaceContainer',
  'surfaceContainerHigh',
  'surfaceContainerHighest',
  'outline',
  'outlineVariant',
  'shadow',
  'scrim',
  'inverseSurface',
  'inverseOnSurface',
  'surfaceTint',
  'primaryFixed',
  'primaryFixedDim',
  'onPrimaryFixed',
  'onPrimaryFixedVariant',
  'secondaryFixed',
  'secondaryFixedDim',
  'onSecondaryFixed',
  'onSecondaryFixedVariant',
  'tertiaryFixed',
  'tertiaryFixedDim',
  'onTertiaryFixed',
  'onTertiaryFixedVariant',
] as const

function setSchemeProperties(target: HTMLElement, scheme: DynamicScheme, suffix: string = ''): void {
  for (const key of COLOR_TOKENS) {
    const value = scheme[key]
    const token = key.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase()
    target.style.setProperty(`--md-sys-color-${token}${suffix}`, hexFromArgb(value))
  }
}
