'use client'

import { type ComponentProps, useEffect, useState } from 'react'
import { cva, type VariantProps } from 'cva'
import { MaterialSymbol } from '@/components/material-symbol'

const articleControlVariants = cva(
  'group text-on-surface hover:bg-surface-container hover:text-primary focus-visible:bg-surface-container motion-effects-fast flex size-11 shrink-0 items-center justify-center rounded-full transition-colors focus-ring aria-[expanded=true]:text-primary aria-[pressed=true]:text-primary',
  {
    variants: {
      visibility: {
        always: '',
        beforeDesktop: 'xl:hidden',
      },
    },
    defaultVariants: {
      visibility: 'always',
    },
  },
)

type ArticleControlButtonProps = ComponentProps<'button'> & VariantProps<typeof articleControlVariants>

function ArticleControlButton({ visibility, className, ...props }: ArticleControlButtonProps) {
  return <button type="button" className={articleControlVariants({ visibility, className })} {...props} />
}

/** Stores article control state on `<html>` for plain CSS selectors. */
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
      <ArticleControlButton
        aria-label="Reading mode"
        aria-pressed={readingMode}
        onClick={() => setReadingMode((value) => !value)}
      >
        <MaterialSymbol name="expand_content" className="group-hover:symbol-weight-700 text-xl" />
      </ArticleControlButton>
      <ArticleControlButton
        visibility="beforeDesktop"
        aria-label={sectionsOpen ? 'Hide sections' : 'Sections'}
        aria-expanded={sectionsOpen}
        onClick={() => setSectionsOpen((value) => !value)}
      >
        <MaterialSymbol
          name={sectionsOpen ? 'close' : 'straighten'}
          className="group-hover:symbol-weight-700 rotate-90 text-xl"
        />
      </ArticleControlButton>
    </div>
  )
}
