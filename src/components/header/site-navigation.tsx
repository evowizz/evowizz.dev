'use client'

import { type ComponentProps, type ReactNode, useRef, useState } from 'react'
import Link from 'next/link'
import { useTheme } from 'next-themes'
import { cn } from '@/lib/utils'
import { useIsSSR } from '@/hooks/use-is-ssr'
import { Container } from '@/components/ui/container'
import { MaterialSymbol } from '@/components/ui/material-symbol'
import { MenuIcon } from './menu-icon'
import { Drawer } from './drawer'

function NavigationControl({ className, ...props }: ComponentProps<'button'>) {
  return (
    <button
      type="button"
      className={cn(
        'group text-on-surface hover:bg-surface-container motion-effects-fast focus-ring flex size-11 items-center justify-center rounded-full transition-colors',
        className,
      )}
      {...props}
    />
  )
}

const ThemeButton = () => {
  const { resolvedTheme, setTheme } = useTheme()
  const isSSR = useIsSSR()
  const isDark = !isSSR && resolvedTheme === 'dark'
  const label = isDark ? 'Switch to light theme' : 'Switch to dark theme'

  return (
    <NavigationControl aria-label={label} aria-pressed={isDark} onClick={() => setTheme(isDark ? 'light' : 'dark')}>
      <MaterialSymbol name="asterisk" className="group-hover:symbol-weight-700" />
    </NavigationControl>
  )
}

export const SiteNavigation = ({ wordmark }: { wordmark: ReactNode }) => {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const headerRef = useRef<HTMLElement>(null)

  return (
    // Keeps `backdrop-filter` off the header so it cannot contain the fixed drawer.
    <header ref={headerRef} className="reading-hide sticky top-0 z-40">
      {/* Clears the bar backdrop so it cannot stripe the drawer wash. */}
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
            <NavigationControl
              aria-label={drawerOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={drawerOpen}
              aria-controls="site-drawer"
              aria-haspopup="dialog"
              onClick={() => setDrawerOpen((value) => !value)}
            >
              <MenuIcon isOpen={drawerOpen} className="group-hover:symbol-weight-700" />
            </NavigationControl>
          </div>
        </Container>
      </div>

      <Drawer open={drawerOpen} onClose={() => setDrawerOpen(false)} scopeRef={headerRef} />
    </header>
  )
}
