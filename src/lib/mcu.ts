import { argbFromHex, hexFromArgb, themeFromSourceColor } from '@evowizz/material-color-utilities-canary'

const TARGETS = ['primary', 'secondary', 'tertiary', 'neutral', 'neutralVariant', 'error'] as const
const COLOR_REGEX = /^#?([0-9a-f]{3}|[0-9a-f]{6}|[0-9a-f]{8})$/i

const STANDARD_TONES = [5, 10, 20, 30, 40, 50, 60, 70, 80, 90, 95]

export type TonalPaletteName = (typeof TARGETS)[number]

export type PaletteRequest = {
  base: string
  target: TonalPaletteName
  invert: boolean
  full: boolean
}

export type PaletteResponse = Record<number, string>

const isValidTarget = (target: string): target is TonalPaletteName => {
  return (TARGETS as readonly string[]).includes(target)
}

export function parsePaletteRequest(params: URLSearchParams): PaletteRequest | null {
  const color = params.get('c')
  const target = params.get('target') ?? 'primary'

  if (!color || !COLOR_REGEX.test(color) || !isValidTarget(target)) return null

  return {
    base: color,
    target,
    invert: params.has('invert'),
    full: params.has('full'),
  }
}

export function requestPalette({ base, target, invert, full }: PaletteRequest): PaletteResponse {
  const palette = themeFromSourceColor(argbFromHex(base)).palettes[target]
  const toneHex = (tone: number) => hexFromArgb(palette.tone(tone))

  const tones = full ? [...Array(101).keys()] : STANDARD_TONES
  return Object.fromEntries(tones.map((tone) => [tone * 10, toneHex(invert ? 100 - tone : tone)]))
}
