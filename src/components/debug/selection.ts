export type SelectedEntry = {
  element: Element
  selector: string
}

/** Region in page coordinates, so it stays anchored while the page scrolls. */
export type RegionBounds = {
  x: number
  y: number
  width: number
  height: number
}

export type Selection =
  | ({ kind: 'element' } & SelectedEntry)
  | ({ kind: 'region'; elements: SelectedEntry[] } & RegionBounds)

export const isDevtoolNode = (element: Element) =>
  element.closest('[data-devbar]') !== null ||
  element.closest('#react-scan-root') !== null ||
  element.closest('nextjs-portal') !== null

/** Unique CSS selector that querySelector (or an AI driving one) resolves back to the element. */
export const cssPath = (element: Element): string => {
  const parts: string[] = []
  let node: Element | null = element
  while (node && node !== document.body && node !== document.documentElement) {
    const current: Element = node
    if (current.id) {
      parts.unshift(`#${CSS.escape(current.id)}`)
      return parts.join(' > ')
    }
    const parent = current.parentElement
    let part = current.tagName.toLowerCase()
    if (parent) {
      const sameTag = Array.from(parent.children).filter(
        (child) => child.tagName === current.tagName,
      )
      if (sameTag.length > 1) part += `:nth-of-type(${sameTag.indexOf(current) + 1})`
    }
    parts.unshift(part)
    node = parent
  }
  return parts.join(' > ')
}

/** Topmost elements fully contained in the region: kept when their parent is not. */
export const topContainedElements = (bounds: RegionBounds): Element[] => {
  const within = (rect: DOMRect) =>
    rect.width > 0 &&
    rect.height > 0 &&
    rect.left + window.scrollX >= bounds.x &&
    rect.top + window.scrollY >= bounds.y &&
    rect.right + window.scrollX <= bounds.x + bounds.width &&
    rect.bottom + window.scrollY <= bounds.y + bounds.height
  const intersects = (rect: DOMRect) =>
    rect.right + window.scrollX > bounds.x &&
    rect.left + window.scrollX < bounds.x + bounds.width &&
    rect.bottom + window.scrollY > bounds.y &&
    rect.top + window.scrollY < bounds.y + bounds.height

  const found: Element[] = []
  const walk = (parent: Element) => {
    for (const child of parent.children) {
      if (isDevtoolNode(child)) continue
      const rect = child.getBoundingClientRect()
      if (within(rect)) found.push(child)
      else if (intersects(rect)) walk(child)
    }
  }
  walk(document.body)
  return found
}

/** Fallback for regions containing nothing: the top element under the region's center. */
export const topElementAtCenter = (bounds: RegionBounds): Element[] => {
  const element = document
    .elementsFromPoint(
      bounds.x - window.scrollX + bounds.width / 2,
      bounds.y - window.scrollY + bounds.height / 2,
    )
    .find(
      (candidate) =>
        !isDevtoolNode(candidate) &&
        candidate !== document.documentElement &&
        candidate !== document.body,
    )
  return element ? [element] : []
}

export const cropRegion = (canvas: HTMLCanvasElement, bounds: RegionBounds): Promise<Blob> => {
  const scale = window.devicePixelRatio
  const bodyRect = document.body.getBoundingClientRect()
  const originX = (bounds.x - (bodyRect.left + window.scrollX)) * scale
  const originY = (bounds.y - (bodyRect.top + window.scrollY)) * scale
  const out = document.createElement('canvas')
  out.width = Math.max(1, Math.round(bounds.width * scale))
  out.height = Math.max(1, Math.round(bounds.height * scale))
  out
    .getContext('2d')!
    .drawImage(canvas, originX, originY, out.width, out.height, 0, 0, out.width, out.height)
  return new Promise((resolve, reject) => {
    out.toBlob((blob) => (blob ? resolve(blob) : reject(new Error('empty capture'))), 'image/png')
  })
}
