'use client'

import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'
import { MaterialSymbol } from '@/components/material-symbol'

const buttonClass = cn(
  'group text-on-surface hover:bg-surface-container hover:text-primary focus-visible:bg-surface-container motion-effects-fast flex size-11 shrink-0 items-center justify-center rounded-full transition-colors focus-ring',
  'aria-[expanded=true]:text-primary aria-[pressed=true]:text-primary',
)

/** Stores reader preferences on `<html>` for plain CSS selectors. */
export function ArticleControls() {
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
    <div className="flex items-center justify-end">
      <button
        type="button"
        aria-label="Reading mode"
        aria-pressed={readingMode}
        onClick={() => setReadingMode((value) => !value)}
        className={buttonClass}
      >
        <MaterialSymbol name="expand_content" className="group-hover:symbol-weight-700 text-xl" />
      </button>
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
    </div>
  )
}
