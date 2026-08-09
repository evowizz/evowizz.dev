'use client'

import { type ReactNode, useRef, useState } from 'react'
import Link from 'next/link'
import { useTheme } from 'next-themes'
import { cn } from '@/lib/utils'
import { useIsSSR } from '@/lib/use-is-ssr'
import { Container } from '@/components/elements'
import { MaterialSymbol } from '@/components/material-symbol'
import { MenuIcon } from './menu-icon'
import { Drawer } from './drawer'

const controlClass =
  'group text-on-surface hover:bg-surface-container motion-effects-fast flex size-11 items-center justify-center rounded-full transition-colors focus-ring'

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

export const SiteNavigation = ({ wordmark }: { wordmark: ReactNode }) => {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const headerRef = useRef<HTMLElement>(null)

  return (
    // Keeping the drawer here preserves one unblurred wordmark and menu button.
    // The inner backdrop prevents it from containing the fixed drawer.
    <header ref={headerRef} className="reading-hide sticky top-0 z-40">
      {/* The bar turns transparent while the drawer opens, avoiding a strip over its wash. */}
      <div
        className={cn(
          'motion-effects-slow relative z-10 transition-[background-color,backdrop-filter]',
          drawerOpen ? 'bg-surface/0 backdrop-blur-[0px]' : 'bg-surface/85 backdrop-blur-md',
        )}
      >
        <Container className="flex h-16 items-center justify-between">
          <Link
            href="/"
            aria-label="evowizz, home"
            onClick={() => setDrawerOpen(false)}
            className="text-on-surface focus-ring"
          >
            {wordmark}
          </Link>
          <div className="-mr-2 flex items-center">
            <ThemeButton />
            <button
              type="button"
              aria-label={drawerOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={drawerOpen}
              aria-controls="site-drawer"
              aria-haspopup="dialog"
              onClick={() => setDrawerOpen((value) => !value)}
              className={controlClass}
            >
              <MenuIcon isOpen={drawerOpen} className="group-hover:symbol-weight-700" />
            </button>
          </div>
        </Container>
      </div>

      <Drawer open={drawerOpen} onClose={() => setDrawerOpen(false)} scopeRef={headerRef} />
    </header>
  )
}
