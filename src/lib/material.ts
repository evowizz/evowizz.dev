import {
  argbFromHex,
  hexFromArgb,
  Hct,
  DynamicScheme,
  TonalPalette,
  Variant,
} from '@evowizz/material-color-utilities-canary'

export { TonalPalette, Hct, Variant, argbFromHex, hexFromArgb }

export type SchemeOptions = ConstructorParameters<typeof DynamicScheme>[0]

export function createScheme(options: SchemeOptions): DynamicScheme {
  return new DynamicScheme(options)
}

export function createSchemeFromHex(
  sourceColorHex: string,
  isDark: boolean,
  variant: Variant = Variant.TONAL_SPOT,
  contrastLevel: number = 0
): DynamicScheme {
  return new DynamicScheme({
    sourceColorHct: Hct.fromInt(argbFromHex(sourceColorHex)),
    variant,
    contrastLevel,
    isDark,
    specVersion: "2025"
  })
}

export function applyScheme(scheme: DynamicScheme, target: HTMLElement = document.documentElement): void {
  const colors: Record<string, number> = {
    'primary': scheme.primary,
    'on-primary': scheme.onPrimary,
    'primary-container': scheme.primaryContainer,
    'on-primary-container': scheme.onPrimaryContainer,
    'inverse-primary': scheme.inversePrimary,
    'secondary': scheme.secondary,
    'on-secondary': scheme.onSecondary,
    'secondary-container': scheme.secondaryContainer,
    'on-secondary-container': scheme.onSecondaryContainer,
    'tertiary': scheme.tertiary,
    'on-tertiary': scheme.onTertiary,
    'tertiary-container': scheme.tertiaryContainer,
    'on-tertiary-container': scheme.onTertiaryContainer,
    'error': scheme.error,
    'on-error': scheme.onError,
    'error-container': scheme.errorContainer,
    'on-error-container': scheme.onErrorContainer,
    'background': scheme.background,
    'on-background': scheme.onBackground,
    'surface': scheme.surface,
    'on-surface': scheme.onSurface,
    'surface-variant': scheme.surfaceVariant,
    'on-surface-variant': scheme.onSurfaceVariant,
    'surface-dim': scheme.surfaceDim,
    'surface-bright': scheme.surfaceBright,
    'surface-container-lowest': scheme.surfaceContainerLowest,
    'surface-container-low': scheme.surfaceContainerLow,
    'surface-container': scheme.surfaceContainer,
    'surface-container-high': scheme.surfaceContainerHigh,
    'surface-container-highest': scheme.surfaceContainerHighest,
    'outline': scheme.outline,
    'outline-variant': scheme.outlineVariant,
    'shadow': scheme.shadow,
    'scrim': scheme.scrim,
    'inverse-surface': scheme.inverseSurface,
    'inverse-on-surface': scheme.inverseOnSurface,
    'surface-tint': scheme.surfaceTint,
    'primary-fixed': scheme.primaryFixed,
    'primary-fixed-dim': scheme.primaryFixedDim,
    'on-primary-fixed': scheme.onPrimaryFixed,
    'on-primary-fixed-variant': scheme.onPrimaryFixedVariant,
    'secondary-fixed': scheme.secondaryFixed,
    'secondary-fixed-dim': scheme.secondaryFixedDim,
    'on-secondary-fixed': scheme.onSecondaryFixed,
    'on-secondary-fixed-variant': scheme.onSecondaryFixedVariant,
    'tertiary-fixed': scheme.tertiaryFixed,
    'tertiary-fixed-dim': scheme.tertiaryFixedDim,
    'on-tertiary-fixed': scheme.onTertiaryFixed,
    'on-tertiary-fixed-variant': scheme.onTertiaryFixedVariant,
  }

  for (const [key, value] of Object.entries(colors)) {
    target.style.setProperty(`--md-sys-color-${key}`, hexFromArgb(value))
  }
}
