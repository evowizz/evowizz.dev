import { isDevtoolNode } from './selection'

type Rgba = [number, number, number, number]

const FAIL_ATTRIBUTE = 'data-contrast-fail'

let context: CanvasRenderingContext2D | null = null

const paint = (color: string, backdrop: string): [number, number, number] => {
  if (!context) {
    const canvas = document.createElement('canvas')
    canvas.width = canvas.height = 1
    context = canvas.getContext('2d', { willReadFrequently: true })
  }
  const ctx = context!
  ctx.fillStyle = backdrop
  ctx.fillRect(0, 0, 1, 1)
  ctx.fillStyle = color
  ctx.fillRect(0, 0, 1, 1)
  const [r, g, b] = ctx.getImageData(0, 0, 1, 1).data
  return [r, g, b]
}

/**
 * Recovers a color's alpha and true channels by painting it over black and white.
 *
 * Computed colors arrive as rgb(), oklab() from color-mix(), or a token, and comparing the two
 * paints avoids parsing any of those syntaxes.
 */
const resolve = (color: string): Rgba => {
  if (!color || color === 'transparent') return [0, 0, 0, 0]

  const overBlack = paint(color, '#000000')
  const overWhite = paint(color, '#ffffff')

  const alpha = 1 - (overWhite[0] - overBlack[0] + (overWhite[1] - overBlack[1])) / 510
  if (alpha <= 0.001) return [0, 0, 0, 0]

  return [overBlack[0] / alpha, overBlack[1] / alpha, overBlack[2] / alpha, alpha]
}

const over = (top: Rgba, bottom: Rgba): Rgba => [
  top[0] * top[3] + bottom[0] * (1 - top[3]),
  top[1] * top[3] + bottom[1] * (1 - top[3]),
  top[2] * top[3] + bottom[2] * (1 - top[3]),
  1,
]

const backgroundBehind = (element: Element): Rgba => {
  const layers: Rgba[] = []
  let node: Element | null = element

  while (node) {
    const color = resolve(getComputedStyle(node).backgroundColor)
    if (color[3] > 0) layers.push(color)
    if (color[3] >= 1) break
    node = node.parentElement
  }

  let base: Rgba = layers.length ? layers[layers.length - 1] : [255, 255, 255, 1]
  for (let index = layers.length - 2; index >= 0; index -= 1) base = over(layers[index], base)
  return base
}

const luminance = ([r, g, b]: Rgba) => {
  const channel = (value: number) => {
    const v = value / 255
    return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4
  }
  return 0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b)
}

const ratio = (a: Rgba, b: Rgba) => {
  const [high, low] = [luminance(a), luminance(b)].sort((x, y) => y - x)
  return (high + 0.05) / (low + 0.05)
}

const hasOwnText = (element: Element) =>
  Array.from(element.childNodes).some((node) => node.nodeType === Node.TEXT_NODE && node.textContent?.trim())

/** WCAG AA: 3:1 for large text, 4.5:1 otherwise. */
const thresholdFor = (styles: CSSStyleDeclaration) => {
  const size = parseFloat(styles.fontSize)
  const weight = Number(styles.fontWeight) || 400
  const large = size >= 24 || (size >= 18.66 && weight >= 700)
  return large ? 3 : 4.5
}

export const clearContrastAudit = () => {
  document.querySelectorAll(`[${FAIL_ATTRIBUTE}]`).forEach((element) => {
    element.removeAttribute(FAIL_ATTRIBUTE)
  })
}

export const runContrastAudit = () => {
  clearContrastAudit()
  let failures = 0

  document.querySelectorAll('body *').forEach((element) => {
    if (isDevtoolNode(element) || !hasOwnText(element)) return

    const styles = getComputedStyle(element)
    if (styles.visibility === 'hidden' || styles.display === 'none') return
    if (Number(styles.opacity) === 0) return

    const rect = element.getBoundingClientRect()
    if (!rect.width || !rect.height) return

    const text = resolve(styles.color)
    if (text[3] <= 0) return

    const background = backgroundBehind(element)
    const value = ratio(over(text, background), background)

    if (value < thresholdFor(styles)) {
      element.setAttribute(FAIL_ATTRIBUTE, value.toFixed(2))
      failures += 1
    }
  })

  return failures
}
