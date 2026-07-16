'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useTheme } from 'next-themes'
import { cn } from '@/lib/utils'
import { useIsSSR } from '@/lib/use-is-ssr'
import { Container, focusRing } from '@/components/elements'
import { Wordmark } from '@/components/wordmark'
import { MaterialSymbol } from '@/components/material-symbol'
import { MenuIcon } from './menu-icon'
import { Drawer } from './drawer'

const controlClass = cn(
  'group text-on-surface hover:bg-surface-container motion-effects-fast flex size-11 items-center justify-center rounded-full transition-colors',
  focusRing,
)

const ThemeButton = () => {
  const { resolvedTheme, setTheme } = useTheme()
  const isSSR = useIsSSR()
  const isDark = !isSSR && resolvedTheme === 'dark'
  const label = isDark ? 'Switch to light theme' : 'Switch to dark theme'

  return (
    <button
      type="button"
      aria-label={label}
      aria-pressed={isDark}
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className={controlClass}
    >
      <MaterialSymbol name="asterisk" className="group-hover:symbol-weight-700" />
    </button>
  )
}

export const Header = () => {
  const [drawerOpen, setDrawerOpen] = useState(false)

  return (
    <>
      <header className="reading-hide bg-surface/85 sticky top-0 z-40 backdrop-blur-md">
        <Container className="flex h-16 items-center justify-between">
          <Link
            href="/"
            aria-label="evowizz, home"
            className={cn('text-on-surface', focusRing)}
          >
            <Wordmark />
          </Link>
          <div className="-mr-2 flex items-center">
            <ThemeButton />
            <button
              type="button"
              aria-label="Open menu"
              aria-expanded={drawerOpen}
              aria-controls="site-drawer"
              aria-haspopup="dialog"
              onClick={() => setDrawerOpen(true)}
              className={controlClass}
            >
              <MenuIcon isOpen={drawerOpen} className="group-hover:symbol-weight-700" />
            </button>
          </div>
        </Container>
      </header>

      <Drawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </>
  )
}
