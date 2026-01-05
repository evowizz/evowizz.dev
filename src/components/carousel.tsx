'use client'

import React, { createContext, useContext, useRef } from 'react'
import { ArrowRight } from './svg/arrow-right'
import { cn } from '@/lib/utils'
import { StyleablePropsWithChildren, StyleableProps } from '@/types/component'

type CarouselContextType = {
  scrollContainerRef: React.RefObject<HTMLDivElement | null>
  scrollLeft: () => void
  scrollRight: () => void
  canScrollLeft: boolean
  canScrollRight: boolean
}

const CarouselContext = createContext<CarouselContextType | null>(null)

export const useCarousel = () => {
  const context = useContext(CarouselContext)
  if (!context) {
    throw new Error('useCarousel must be used within a Carousel')
  }
  return context
}

const VISIBILITY_THRESHOLD = 0.95

const getScrollBehavior = (): ScrollBehavior => {
  if (typeof window === 'undefined') return 'smooth'
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'
}

export const Carousel = ({ children, className }: StyleablePropsWithChildren) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = React.useState(false)
  const [canScrollRight, setCanScrollRight] = React.useState(false)

  const visibleIndices = useRef<Set<number>>(new Set())
  const nodeToIndex = useRef<Map<Element, number>>(new Map())
  const observerRef = useRef<IntersectionObserver | null>(null)

  const updateScrollStateFromPosition = React.useCallback(() => {
    const container = scrollContainerRef.current
    if (!container) return

    const { scrollLeft, scrollWidth, clientWidth } = container
    setCanScrollLeft(scrollLeft > 1)
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1)
  }, [])

  const updateScrollState = React.useCallback(() => {
    const container = scrollContainerRef.current
    if (!container) return

    const indices = Array.from(visibleIndices.current).sort((a, b) => a - b)
    const totalItems = container.children.length

    if (indices.length > 0) {
      const firstVisible = indices[0]
      const lastVisible = indices[indices.length - 1]
      setCanScrollLeft(firstVisible > 0)
      setCanScrollRight(lastVisible < totalItems - 1)
    } else {
      updateScrollStateFromPosition()
    }
  }, [updateScrollStateFromPosition])

  const setupObserver = React.useCallback(() => {
    const container = scrollContainerRef.current
    if (!container) return

    observerRef.current?.disconnect()
    visibleIndices.current.clear()
    nodeToIndex.current.clear()

    const children = Array.from(container.children)
    children.forEach((child, i) => nodeToIndex.current.set(child, i))

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = nodeToIndex.current.get(entry.target)
          if (index === undefined) return

          if (entry.intersectionRatio >= VISIBILITY_THRESHOLD) {
            visibleIndices.current.add(index)
          } else {
            visibleIndices.current.delete(index)
          }
        })
        updateScrollState()
      },
      {
        root: container,
        threshold: VISIBILITY_THRESHOLD,
      },
    )

    children.forEach((child) => observerRef.current?.observe(child))

    updateScrollStateFromPosition()
  }, [updateScrollState, updateScrollStateFromPosition])

  React.useEffect(() => {
    const container = scrollContainerRef.current
    if (!container) return

    setupObserver()

    const handleScroll = () => updateScrollState()
    container.addEventListener('scroll', handleScroll, { passive: true })

    const handleResize = () => {
      setupObserver()
    }
    window.addEventListener('resize', handleResize)

    const mutationObserver = new MutationObserver(() => {
      setupObserver()
    })
    mutationObserver.observe(container, { childList: true })

    return () => {
      observerRef.current?.disconnect()
      mutationObserver.disconnect()
      container.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleResize)
    }
  }, [setupObserver, updateScrollState])

  const scrollLeft = React.useCallback(() => {
    const container = scrollContainerRef.current
    if (!container) return

    const indices = Array.from(visibleIndices.current).sort((a, b) => a - b)
    const targetIndex = indices.length > 0 ? Math.max(0, indices[0] - 1) : 0

    const target = container.children[targetIndex]
    if (target) {
      target.scrollIntoView({ behavior: getScrollBehavior(), block: 'nearest', inline: 'end' })
    }
  }, [])

  const scrollRight = React.useCallback(() => {
    const container = scrollContainerRef.current
    if (!container) return

    const indices = Array.from(visibleIndices.current).sort((a, b) => a - b)
    const lastIndex = container.children.length - 1
    const targetIndex =
      indices.length > 0 ? Math.min(lastIndex, indices[indices.length - 1] + 1) : lastIndex

    const target = container.children[targetIndex]
    if (target) {
      target.scrollIntoView({ behavior: getScrollBehavior(), block: 'nearest', inline: 'start' })
    }
  }, [])

  return (
    <CarouselContext.Provider
      value={{
        scrollContainerRef,
        scrollLeft,
        scrollRight,
        canScrollLeft,
        canScrollRight,
      }}
    >
      <div className={cn('relative', className)}>{children}</div>
    </CarouselContext.Provider>
  )
}

export const CarouselContent = ({ children, className }: StyleablePropsWithChildren) => {
  const { scrollContainerRef } = useCarousel()

  return (
    <div
      ref={scrollContainerRef}
      className={cn(
        'hide-scrollbar flex snap-x snap-mandatory gap-6 overflow-x-auto px-8 scroll-px-8 pb-8',
        className,
      )}
    >
      {children}
    </div>
  )
}

export const CarouselButtons = ({ className }: StyleableProps) => {
  const { scrollLeft, scrollRight, canScrollLeft, canScrollRight } = useCarousel()

  if (!canScrollLeft && !canScrollRight) {
    return null
  }

  return (
    <div className={cn('flex gap-2', className)}>
      <CarouselButton onClick={scrollLeft} aria-label="Scroll left" disabled={!canScrollLeft}>
        <ArrowRight className="h-5 w-5 rotate-180" />
      </CarouselButton>
      <CarouselButton onClick={scrollRight} aria-label="Scroll right" disabled={!canScrollRight}>
        <ArrowRight className="h-5 w-5" />
      </CarouselButton>
    </div>
  )
}

const CarouselButton = ({ className, ...props }: React.ComponentProps<'button'>) => {
  return (
    <button
      className={cn(
        'bg-secondary-fixed text-on-secondary-fixed rounded-full px-6 py-3 transition',
        'hover:enabled:bg-secondary-fixed-dim disabled:opacity-50',
        className,
      )}
      {...props}
    />
  )
}

export const CarouselItem = ({ children, className }: StyleablePropsWithChildren) => {
  return <div className={cn('w-[85vw] flex-none snap-start md:w-112.5', className)}>{children}</div>
}
