'use client'

import { debounce } from '@/lib/utils'
import { useInView } from 'framer-motion'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

type DotCanvasProps = React.HTMLAttributes<HTMLCanvasElement> & {
  color?: string
  shape?: 'circle' | 'triangle' | 'cross' | 'hexagon' | 'starburst'
}

const DOT_SIZE = 4
const DOT_SPACE = 20
const DOT_PADDING = 0
const ADDTIONAL_SIZE = 2
const MIN_DISTANCE = 50
const MIN_DISTANCE_SQ = MIN_DISTANCE * MIN_DISTANCE
const MIN_TRANSPARENCY = 0
const REDUCTION = 0.01

const DotCanvas = ({
  color = '0% 0 0',
  shape = 'circle',
  ...props
}: DotCanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  // Amount represents the amount of the element that must be visible before the callback is called.
  // So amount 'some' is equivalent to threshold 0, meaning the callback will be called as soon as any part of the element is visible.
  const isInView = useInView(canvasRef, { amount: 'some' })
  const [size, setSize] = useState<{ width: number; height: number }>({
    width: 0,
    height: 0,
  })
  const mousePositionRef = useRef<{ x: number; y: number }>({
    x: -1,
    y: -1,
  })
  const prevMousePositionRef = useRef<{ x: number; y: number }>({ x: -1, y: -1 })
  const mouseMovedRef = useRef<boolean>(false)
  const mouseTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const [dots, setDots] = useState<ShapedDot[]>([])

  const updateCanvasSize = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    setSize({ width: canvas.clientWidth, height: canvas.clientHeight })

    canvas.width = canvas.clientWidth
    canvas.height = canvas.clientHeight

    const dotsWidth = canvas.clientWidth - DOT_PADDING
    const dotsHeight = canvas.clientHeight - DOT_PADDING

    const d: ShapedDot[] = []
    for (let i = DOT_PADDING; i < dotsWidth; i += DOT_SPACE) {
      for (let j = DOT_PADDING; j < dotsHeight; j += DOT_SPACE) {
        const x = i + DOT_SPACE / 2
        const y = j + DOT_SPACE / 2

        let dot: ShapedDot
        switch (shape) {
          case 'triangle':
            dot = new TriangleDot(x, y, DOT_SIZE, color)
            break
          case 'cross':
            dot = new CrossDot(x, y, DOT_SIZE, color)
            break
          case 'hexagon':
            dot = new HexagonDot(x, y, DOT_SIZE, color)
            break
          case 'starburst':
            dot = new StarburstDot(x, y, DOT_SIZE, color)
            break
          case 'circle':
          default:
            dot = new CircleDot(x, y, DOT_SIZE, color)
            break
        }

        d.push(dot)
      }
    }

    setDots(d)
  }, [color, shape])

  const debouncedUpdateCanvasSize = useMemo(
    () => debounce(updateCanvasSize, 250),
    [updateCanvasSize]
  );

  const updateMousePosition = useCallback((e: MouseEvent) => {
    const canvas = canvasRef.current
    if (!canvas) return

    const canvasRect = canvas.getBoundingClientRect()
    const mouseX = e.clientX - canvasRect.left
    const mouseY = e.clientY - canvasRect.top

    prevMousePositionRef.current = mousePositionRef.current
    mouseMovedRef.current = true
    mousePositionRef.current = {
      x: mouseX,
      y: mouseY,
    }

    if (mouseTimeoutRef.current) {
      clearTimeout(mouseTimeoutRef.current)
    }

    mouseTimeoutRef.current = setTimeout(() => {
      mouseMovedRef.current = false
      prevMousePositionRef.current = { x: -1, y: -1 }
    }, 100)
  }, [])

  const updateAndDraw = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const draw = () => {
      ctx.clearRect(0, 0, size.width, size.height)
      if (mouseMovedRef.current) {
        // First, we retrieve the previous mouse position and the current mouse position
        const { x: x1, y: y1 } = prevMousePositionRef.current
        const { x: x2, y: y2 } = mousePositionRef.current

        if (x1 < 0 && y1 < 0) {
          // If the previous mouse position is outside the canvas,
          // we update all dots to the current mouse position
          // This can happen when the previous mouse position is -1, -1.
          dots.forEach(dot => dot.update(true, x2, y2))
        } else {
          // We calculate the distance between the two points
          const distance = Math.hypot(x2 - x1, y2 - y1)
          // We divide the distance by the number of lightened dots possible
          // divided by 2 (since it's lightened aroud the mouse position)
          const steps = Math.max(1, Math.floor(distance / (MIN_DISTANCE / 2)))
          
          // We update dots between the two points
          // We use a for loop to iterate over the number of steps
          // and calculate the position of each dot
          for (let i = 0; i <= steps; i++) {
            const t = i / steps
            const x = x1 + (x2 - x1) * t
            const y = y1 + (y2 - y1) * t
            dots.forEach(dot => dot.update(true, x, y))
          }
        }
      } else {
        dots.forEach(dot => dot.update(false, -1, -1))
      }
      dots.forEach(dot => dot.draw(ctx))
      requestAnimationFrame(draw)
    }

    requestAnimationFrame(draw)
  }, [size, dots, mouseMovedRef, mousePositionRef])

  useEffect(() => {
    if (size.width === 0 || size.height === 0) {
      updateCanvasSize()
    }

    if (!isInView) return

    const animationFrameId = requestAnimationFrame(updateAndDraw)

    window.addEventListener('mousemove', updateMousePosition)
    window.addEventListener('resize', debouncedUpdateCanvasSize)

    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener('mousemove', updateMousePosition)
      window.removeEventListener('resize', debouncedUpdateCanvasSize)
    }
  }, [
    size,
    dots,
    isInView,
    updateMousePosition,
    updateCanvasSize,
    debouncedUpdateCanvasSize,
    updateAndDraw,
  ])

  return <canvas ref={canvasRef} {...props} />
}

export default DotCanvas

class ShapedDot {
  x: number
  y: number
  size: number
  color: string
  transparency: number

  constructor(x: number, y: number, size: number, color: string) {
    this.x = x
    this.y = y
    this.size = size
    this.color = color
    this.transparency = MIN_TRANSPARENCY
  }

  update(mouseMoved: boolean, clientX: number, clientY: number) {
    const dx = clientX - this.x
    const dy = clientY - this.y

    // Rather than comparing the distance square root to the MIN_DISTANCE,
    // we compare the distance square to the MIN_DISTANCE_SQ. So we no longer
    // need to calculate the square root on every frame. :)
    const distanceSq = dx * dx + dy * dy

    if (mouseMoved && distanceSq < MIN_DISTANCE_SQ) {
      this.transparency = 1
      this.size = DOT_SIZE + ADDTIONAL_SIZE
    } else {
      this.transparency = Math.max(
        MIN_TRANSPARENCY,
        this.transparency - REDUCTION,
      )
      this.size = Math.max(DOT_SIZE, this.size - REDUCTION)
    }
  }

  getColor() {
    return `color-mix(in oklab, oklch(${this.color}) ${this.transparency * 100}%, transparent)`
  }

  draw(ctx: CanvasRenderingContext2D) {
    throw new Error('Method not implemented.')
  }
}

class CircleDot extends ShapedDot {
  draw(ctx: CanvasRenderingContext2D) {
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
    ctx.closePath()
    ctx.fillStyle = this.getColor()
    ctx.fill()
  }
}

class TriangleDot extends ShapedDot {
  draw(ctx: CanvasRenderingContext2D) {
    ctx.beginPath()
    ctx.moveTo(this.x, this.y)
    ctx.lineTo(this.x + this.size, this.y)
    ctx.lineTo(this.x + this.size, this.y + this.size)
    ctx.closePath()
    ctx.fillStyle = this.getColor()
    ctx.fill()
  }
}

class CrossDot extends ShapedDot {
  draw(ctx: CanvasRenderingContext2D) {
    ctx.beginPath()
    ctx.moveTo(this.x - this.size, this.y - this.size)
    ctx.lineTo(this.x + this.size, this.y + this.size)
    ctx.moveTo(this.x + this.size, this.y - this.size)
    ctx.lineTo(this.x - this.size, this.y + this.size)
    ctx.closePath()
    ctx.strokeStyle = this.getColor()
    ctx.stroke()
  }
}

class HexagonDot extends ShapedDot {
  draw(ctx: CanvasRenderingContext2D) {
    ctx.beginPath()
    ctx.moveTo(this.x, this.y - this.size)
    ctx.lineTo(this.x + this.size, this.y - this.size / 2)
    ctx.lineTo(this.x + this.size, this.y + this.size / 2)
    ctx.lineTo(this.x, this.y + this.size)
    ctx.lineTo(this.x - this.size, this.y + this.size / 2)
    ctx.lineTo(this.x - this.size, this.y - this.size / 2)

    ctx.closePath()
    ctx.fillStyle = this.getColor()
    ctx.fill()
  }
}

class StarburstDot extends ShapedDot {
  draw(ctx: CanvasRenderingContext2D) {
    const angleStep = (Math.PI * 2) / 8

    ctx.beginPath()
    for (let i = 0; i < 8; i++) {
      const angle = i * angleStep
      const dx = Math.cos(angle) * this.size
      const dy = Math.sin(angle) * this.size
      ctx.moveTo(this.x, this.y)
      ctx.lineTo(this.x + dx, this.y + dy)
    }
    ctx.closePath()
    ctx.strokeStyle = this.getColor()
    ctx.stroke()
  }
}
