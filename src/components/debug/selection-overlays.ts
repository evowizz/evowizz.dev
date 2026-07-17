const overlayBase = () => {
  const element = document.createElement('div')
  element.setAttribute('data-devbar', '')
  element.style.cssText =
    'position:fixed;z-index:90;pointer-events:none;display:none;box-sizing:border-box;'
  document.body.appendChild(element)
  return element
}

const BOX_COLORS = {
  margin: 'rgba(249, 156, 62, 0.35)',
  border: 'rgba(255, 229, 153, 0.4)',
  padding: 'rgba(122, 196, 125, 0.35)',
  content: 'rgba(111, 168, 220, 0.35)',
}

export type BoxOverlay = {
  root: HTMLDivElement
  border: HTMLDivElement
  padding: HTMLDivElement
}

/**
 * Chrome-style box model highlight: nested rings whose border widths mirror
 * the element's margins, borders, and paddings, so each area gets its color
 * without translucent layers stacking on each other.
 */
export const createBoxOverlay = (persistent: boolean): BoxOverlay => {
  const root = overlayBase()
  root.style.borderStyle = 'solid'
  root.style.borderColor = BOX_COLORS.margin
  if (persistent) root.style.outline = '1px solid var(--color-primary)'

  const ring = (color: string) => {
    const element = document.createElement('div')
    element.style.cssText = `box-sizing:border-box;width:100%;height:100%;border-style:solid;border-color:${color};`
    return element
  }

  const border = ring(BOX_COLORS.border)
  const padding = ring(BOX_COLORS.padding)
  const content = document.createElement('div')
  content.style.cssText = `box-sizing:border-box;width:100%;height:100%;background:${BOX_COLORS.content};`

  padding.appendChild(content)
  border.appendChild(padding)
  root.appendChild(border)
  return { root, border, padding }
}

export const placeBoxOverlay = (overlay: BoxOverlay, element: Element) => {
  const rect = element.getBoundingClientRect()
  const style = getComputedStyle(element)
  const margin = {
    top: Math.max(parseFloat(style.marginTop), 0),
    right: Math.max(parseFloat(style.marginRight), 0),
    bottom: Math.max(parseFloat(style.marginBottom), 0),
    left: Math.max(parseFloat(style.marginLeft), 0),
  }

  const { root, border, padding } = overlay
  root.style.display = 'block'
  root.style.top = `${rect.top - margin.top}px`
  root.style.left = `${rect.left - margin.left}px`
  root.style.width = `${rect.width + margin.left + margin.right}px`
  root.style.height = `${rect.height + margin.top + margin.bottom}px`
  root.style.borderWidth = `${margin.top}px ${margin.right}px ${margin.bottom}px ${margin.left}px`
  border.style.borderWidth = `${style.borderTopWidth} ${style.borderRightWidth} ${style.borderBottomWidth} ${style.borderLeftWidth}`
  padding.style.borderWidth = `${style.paddingTop} ${style.paddingRight} ${style.paddingBottom} ${style.paddingLeft}`
}

export const createMarqueeOverlay = () => {
  const element = overlayBase()
  element.style.border = '1px dashed var(--color-primary)'
  element.style.background = 'color-mix(in srgb, var(--color-primary) 8%, transparent)'
  return element
}

export const createOutlineOverlay = () => {
  const element = overlayBase()
  element.style.outline = '1px solid var(--color-primary)'
  return element
}

export const placeRect = (
  element: HTMLDivElement,
  x: number,
  y: number,
  width: number,
  height: number,
) => {
  element.style.display = 'block'
  element.style.top = `${y}px`
  element.style.left = `${x}px`
  element.style.width = `${width}px`
  element.style.height = `${height}px`
}
