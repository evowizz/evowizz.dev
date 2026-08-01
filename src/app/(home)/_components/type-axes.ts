import { type CSSProperties } from 'react'

/**
 * The axes Google Sans Flex is loaded with.
 *
 * Width stops at 120, not the font's own 151, so the longest line of the name clears
 * its column at every weight. Slant counts up like every other ruler, and `axesToStyle`
 * negates it.
 */
export const AXES = [
  { id: 'wdth', tag: 'wdth', label: 'Width', min: 25, max: 120 },
  { id: 'wght', tag: 'wght', label: 'Weight', min: 100, max: 1000 },
  { id: 'rond', tag: 'ROND', label: 'Round', min: 0, max: 100 },
  { id: 'slnt', tag: 'slnt', label: 'Slant', min: 0, max: 10 },
] as const

export type Axes = Record<(typeof AXES)[number]['id'], number>

export const REST: Axes = { wdth: 100, wght: 600, rond: 0, slnt: 0 }

/** Rounds to two decimals. Whole numbers would make a tween step visibly. */
const precise = (value: number) => Math.round(value * 100) / 100

/** `wght` is a plain font-weight. The rest feed the properties `variation-sans` reads. */
export const axesToStyle = (axes: Axes) =>
  ({
    '--font-wdth': precise(axes.wdth),
    '--font-rond': precise(axes.rond),
    '--font-slnt': precise(-axes.slnt),
    fontWeight: precise(axes.wght),
  }) as CSSProperties
