'use client'

import { useInView } from 'framer-motion'
import { useCallback, useEffect, useRef, useState } from 'react'

type DotCanvasProps = React.HTMLAttributes<HTMLCanvasElement> & {
  color?: string
  shape?: 'circle' | 'triangle' | 'cross' | 'hexagon'
}

const DOT_SIZE = 2
const DOT_SPACE = 14
const DOT_PADDING = 0
const ADDTIONAL_SIZE = 2
const MIN_DISTANCE = 50
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

    let d: ShapedDot[] = []
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

  const updateMousePosition = useCallback((e: MouseEvent) => {
    const canvas = canvasRef.current
    if (!canvas) return

    const canvasRect = canvas.getBoundingClientRect()
    const mouseX = e.clientX - canvasRect.left
    const mouseY = e.clientY - canvasRect.top

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
    }, 100)
  }, [])

  const updateAndDraw = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const draw = () => {
      ctx.clearRect(0, 0, size.width, size.height)
      dots.forEach((dot) => {
        dot.update(
          mouseMovedRef.current,
          mousePositionRef.current.x,
          mousePositionRef.current.y,
        )

        dot.draw(ctx)
      })

      requestAnimationFrame(draw)
    }

    requestAnimationFrame(draw)
  }, [size, dots, mouseMovedRef, mousePositionRef])

  useEffect(() => {
    if (size.width === 0 || size.height === 0) {
      updateCanvasSize()
    }

    if (!isInView) return

    updateAndDraw()

    window.addEventListener('mousemove', updateMousePosition)
    window.addEventListener('resize', updateCanvasSize)

    return () => {
      window.removeEventListener('mousemove', updateMousePosition)
      window.removeEventListener('resize', updateCanvasSize)
    }
  }, [
    size,
    dots,
    isInView,
    updateMousePosition,
    updateCanvasSize,
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
    let distance = Math.sqrt(dx * dx + dy * dy)

    if (mouseMoved && distance < MIN_DISTANCE) {
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
