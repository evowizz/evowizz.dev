'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { MaterialSymbol } from '@/components/material-symbol'

const buttonClass = cn(
  'group text-on-surface hover:bg-surface-container motion-effects-fast flex size-11 shrink-0 items-center justify-center rounded-full transition-colors',
  'aria-[pressed=true]:bg-secondary-container aria-[pressed=true]:text-on-secondary-container focus-ring',
)

const SCALES = [
  { label: 'Default', attr: null },
  { label: 'Large', attr: 'lg' },
  { label: 'Largest', attr: 'xl' },
] as const

const cascadeIn = (index: number) => ({
  initial: { opacity: 0, y: 4 },
  animate: { opacity: 1, y: 0 },
  transition: { delay: 0.08 + index * 0.05, duration: 0.2 },
})

/**
 * Reader preferences live as attributes on <html> so plain CSS in globals.css
 * can respond to them. Reading mode resets when leaving the article; the text
 * scale persists across client-side navigation.
 */
export function ReaderToolbar() {
  const [expanded, setExpanded] = useState(false)
  const [readingMode, setReadingMode] = useState(false)
  const [sectionsOpen, setSectionsOpen] = useState(false)
  const [scale, setScale] = useState(0)

  useEffect(() => {
    const attr = document.documentElement.getAttribute('data-reading-scale')
    const index = SCALES.findIndex((entry) => entry.attr === attr)
    if (index > 0) setScale(index)
  }, [])

  useEffect(() => {
    const root = document.documentElement
    if (sectionsOpen) root.setAttribute('data-ruler-overlay', 'true')
    else root.removeAttribute('data-ruler-overlay')
    return () => root.removeAttribute('data-ruler-overlay')
  }, [sectionsOpen])

  useEffect(() => {
    const close = () => setSectionsOpen(false)
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') close()
    }
    window.addEventListener('press-close-ruler-overlay', close)
    window.addEventListener('keydown', onKeyDown)
    return () => {
      window.removeEventListener('press-close-ruler-overlay', close)
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [])

  useEffect(() => {
    const root = document.documentElement
    if (readingMode) root.setAttribute('data-reading-mode', 'true')
    else root.removeAttribute('data-reading-mode')
    return () => root.removeAttribute('data-reading-mode')
  }, [readingMode])

  useEffect(() => {
    const root = document.documentElement
    const attr = SCALES[scale]?.attr
    if (attr) root.setAttribute('data-reading-scale', attr)
    else root.removeAttribute('data-reading-scale')
  }, [scale])

  return (
    <div className="-mr-2 flex items-center justify-end">
      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            key="controls"
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 'auto', opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 400, damping: 34 }}
            className="flex items-center overflow-x-clip"
          >
            <div className="border-outline-variant bg-surface-container-lowest dark:bg-surface-container-low mr-2 flex items-center gap-1 rounded-full border p-1 pl-4 shadow-[0px_1px_2px_0px_rgba(0,0,0,0.10)] dark:shadow-none">
              <motion.div {...cascadeIn(0)} className="group/slider relative flex items-center gap-2 pr-3">
                <MaterialSymbol name="format_size" className="text-on-surface-variant text-xl" />
                <div className="relative flex items-center">
                  <input
                    type="range"
                    min={0}
                    max={SCALES.length - 1}
                    step={1}
                    value={scale}
                    onChange={(event) => setScale(Number(event.target.value))}
                    onPointerUp={(event) => event.currentTarget.blur()}
                    aria-label="Text size"
                    aria-valuetext={SCALES[scale].label}
                    className="reader-slider focus-ring w-24 cursor-pointer"
                  />
                  <span
                    aria-hidden
                    style={{ left: `${(scale / (SCALES.length - 1)) * 100}%` }}
                    className="border-outline-variant bg-surface-container-lowest text-on-surface-variant pointer-events-none absolute -top-8 z-10 -translate-x-1/2 rounded-sm border px-1.5 py-0.5 font-mono text-[0.625rem] tracking-[0.08em] whitespace-nowrap uppercase opacity-0 shadow-[0px_1px_2px_0px_rgba(0,0,0,0.10)] transition-opacity duration-150 group-focus-within/slider:opacity-100 group-hover/slider:opacity-100"
                  >
                    {SCALES[scale].label}
                  </span>
                </div>
              </motion.div>
              <motion.div {...cascadeIn(1)} className="flex">
                <button
                  type="button"
                  aria-label="Reading mode"
                  aria-pressed={readingMode}
                  onClick={() => setReadingMode((value) => !value)}
                  className={cn(buttonClass, 'size-9')}
                >
                  <MaterialSymbol name="eyeglasses" className="group-hover:symbol-weight-700 text-lg" />
                </button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <button
        type="button"
        aria-label={sectionsOpen ? 'Hide sections' : 'Sections'}
        aria-expanded={sectionsOpen}
        onClick={() => setSectionsOpen((value) => !value)}
        className={cn(buttonClass, 'xl:hidden')}
      >
        <MaterialSymbol
          name={sectionsOpen ? 'close' : 'straighten'}
          className="group-hover:symbol-weight-700 rotate-90 text-xl"
        />
      </button>
      <button
        type="button"
        aria-label={expanded ? 'Hide reader settings' : 'Reader settings'}
        aria-expanded={expanded}
        onClick={() => setExpanded((value) => !value)}
        className={buttonClass}
      >
        <motion.span
          animate={{ rotate: expanded ? 90 : 0 }}
          transition={{ type: 'spring', stiffness: 400, damping: 30 }}
          className="flex items-center justify-center"
        >
          <MaterialSymbol name={expanded ? 'close' : 'tune'} className="group-hover:symbol-weight-700 text-xl" />
        </motion.span>
      </button>
    </div>
  )
}
