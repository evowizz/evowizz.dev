'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { MaterialSymbol } from '@/components/material-symbol'

const buttonClass = cn(
  'group text-on-surface hover:bg-surface-container motion-effects-fast flex size-11 shrink-0 items-center justify-center rounded-full transition-colors',
  'aria-[pressed=true]:bg-secondary-container aria-[pressed=true]:text-on-secondary-container focus-ring',
)

const cascadeIn = (index: number) => ({
  initial: { opacity: 0, y: 4 },
  animate: { opacity: 1, y: 0 },
  transition: { delay: 0.08 + index * 0.05, duration: 0.2 },
})

/** Stores reader preferences on `<html>` for plain CSS selectors. */
export function ReaderToolbar() {
  const [expanded, setExpanded] = useState(false)
  const [readingMode, setReadingMode] = useState(false)
  const [sectionsOpen, setSectionsOpen] = useState(false)

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
            <div className="border-outline-variant bg-surface-container-lowest dark:bg-surface-container-low mr-2 flex items-center rounded-full border p-1 shadow-[0px_1px_2px_0px_rgba(0,0,0,0.10)] dark:shadow-none">
              <motion.div {...cascadeIn(0)} className="flex">
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
