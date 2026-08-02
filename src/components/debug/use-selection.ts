import { useEffect, useRef, useState } from 'react'
import {
  cssPath,
  isDevtoolNode,
  topContainedElements,
  topElementAtCenter,
  type RegionBounds,
  type Selection,
} from './selection'
import {
  createBoxOverlay,
  createMarqueeOverlay,
  createOutlineOverlay,
  placeBoxOverlay,
  placeRect,
} from './selection-overlays'

/**
 * Element and region picking for the dev bar. While `picking`, hovering shows
 * a box model highlight, a click selects the element under the cursor, and a
 * drag selects a region along with the topmost elements it contains. The
 * selection stays highlighted until a click away, Escape, or setSelected(null).
 */
export const useSelection = (active: boolean) => {
  const [picking, setPicking] = useState(false)
  const [selected, setSelected] = useState<Selection | null>(null)
  // A marquee release fires a trailing click after the picking listeners are
  // gone and the click-away listener is up. This ref bridges the two effects
  // so that click neither activates the page nor clears the new selection.
  const suppressClick = useRef(false)

  useEffect(() => {
    if (!active || !picking) return

    const hover = createBoxOverlay(false)
    const marquee = createMarqueeOverlay()
    const cursor = document.createElement('style')
    cursor.textContent = '*, *::before, *::after { cursor: crosshair !important; }'
    document.head.appendChild(cursor)

    let dragStart: { x: number; y: number } | null = null
    let dragging = false

    const pickable = (target: EventTarget | null): Element | null => {
      if (!(target instanceof Element)) return null
      if (isDevtoolNode(target)) return null
      if (target === document.documentElement || target === document.body) return null
      return target
    }

    const marqueeBounds = (event: MouseEvent): RegionBounds => {
      const x = event.clientX + window.scrollX
      const y = event.clientY + window.scrollY
      return {
        x: Math.min(dragStart!.x, x),
        y: Math.min(dragStart!.y, y),
        width: Math.abs(x - dragStart!.x),
        height: Math.abs(y - dragStart!.y),
      }
    }

    const handleDown = (event: MouseEvent) => {
      if (event.button !== 0) return
      if (event.target instanceof Element && isDevtoolNode(event.target)) return
      event.preventDefault()
      dragStart = { x: event.clientX + window.scrollX, y: event.clientY + window.scrollY }
    }

    const handleMove = (event: MouseEvent) => {
      if (dragStart) {
        const bounds = marqueeBounds(event)
        if (dragging || Math.max(bounds.width, bounds.height) > 4) {
          dragging = true
          hover.root.style.display = 'none'
          placeRect(marquee, bounds.x - window.scrollX, bounds.y - window.scrollY, bounds.width, bounds.height)
          return
        }
      }
      const element = pickable(event.target)
      if (element) placeBoxOverlay(hover, element)
      else hover.root.style.display = 'none'
    }

    const handleUp = (event: MouseEvent) => {
      if (!dragStart) return
      const bounds = marqueeBounds(event)
      const wasDragging = dragging
      dragStart = null
      dragging = false
      if (!wasDragging) return

      suppressClick.current = true
      window.setTimeout(() => {
        suppressClick.current = false
      }, 50)
      const contained = topContainedElements(bounds)
      const elements = (contained.length ? contained : topElementAtCenter(bounds))
        .slice(0, 30)
        .map((element) => ({ element, selector: cssPath(element) }))
      const size = `${Math.round(bounds.width)}x${Math.round(bounds.height)}`
      console.log(`[devbar] selected ${size} region\n${elements.map((entry) => entry.selector).join('\n')}`)
      setSelected({ kind: 'region', ...bounds, elements })
      setPicking(false)
    }

    const handleClick = (event: MouseEvent) => {
      if (suppressClick.current) {
        event.preventDefault()
        event.stopPropagation()
        return
      }
      const element = pickable(event.target)
      if (!element) return
      event.preventDefault()
      event.stopPropagation()
      const selector = cssPath(element)
      console.log(`[devbar] selected ${selector}`)
      setSelected({ kind: 'element', element, selector })
      setPicking(false)
    }

    const handleKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setPicking(false)
    }

    document.addEventListener('mousedown', handleDown, true)
    document.addEventListener('mousemove', handleMove, true)
    document.addEventListener('mouseup', handleUp, true)
    document.addEventListener('click', handleClick, true)
    document.addEventListener('keydown', handleKey, true)
    return () => {
      hover.root.remove()
      marquee.remove()
      cursor.remove()
      document.removeEventListener('mousedown', handleDown, true)
      document.removeEventListener('mousemove', handleMove, true)
      document.removeEventListener('mouseup', handleUp, true)
      document.removeEventListener('click', handleClick, true)
      document.removeEventListener('keydown', handleKey, true)
    }
  }, [active, picking])

  useEffect(() => {
    if (!active || !selected) return

    const overlays: HTMLDivElement[] = []
    let update: () => void

    if (selected.kind === 'element') {
      const box = createBoxOverlay(true)
      overlays.push(box.root)
      update = () => {
        if (!document.contains(selected.element)) {
          setSelected(null)
          return
        }
        placeBoxOverlay(box, selected.element)
      }
    } else {
      const marquee = createMarqueeOverlay()
      const outlines = selected.elements.map(() => createOutlineOverlay())
      overlays.push(marquee, ...outlines)
      update = () => {
        placeRect(marquee, selected.x - window.scrollX, selected.y - window.scrollY, selected.width, selected.height)
        selected.elements.forEach((entry, index) => {
          if (!document.contains(entry.element)) {
            outlines[index].style.display = 'none'
            return
          }
          const rect = entry.element.getBoundingClientRect()
          placeRect(outlines[index], rect.left, rect.top, rect.width, rect.height)
        })
      }
    }

    update()
    window.addEventListener('scroll', update, true)
    window.addEventListener('resize', update)
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setSelected(null)
    }
    const handleClickAway = (event: MouseEvent) => {
      if (suppressClick.current) return
      if (event.target instanceof Element && isDevtoolNode(event.target)) return
      setSelected(null)
    }
    document.addEventListener('keydown', handleKey)
    document.addEventListener('click', handleClickAway, true)
    return () => {
      overlays.forEach((overlay) => overlay.remove())
      window.removeEventListener('scroll', update, true)
      window.removeEventListener('resize', update)
      document.removeEventListener('keydown', handleKey)
      document.removeEventListener('click', handleClickAway, true)
    }
  }, [active, selected])

  return { picking, setPicking, selected, setSelected }
}
