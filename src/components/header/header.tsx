'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useScroll, useMotionValueEvent } from 'framer-motion'
import { useTheme } from 'next-themes'
import { cn } from '@/lib/utils'
import { useIsSSR } from '@/lib/use-is-ssr'
import { Wordmark } from '../wordmark'
import { Drawer } from './drawer'
import { destinations } from '@/lib/destinations'
import { ControlGroup } from './control-group'

export const Header = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const toggleDrawer = () => setIsDrawerOpen((prev) => !prev)
  const closeDrawer = () => setIsDrawerOpen(false)
  const { resolvedTheme, setTheme } = useTheme()
  const isSSR = useIsSSR()
  const isDark = !isSSR && resolvedTheme === 'dark'
  const [isScrolled, setIsScrolled] = useState(false)

  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, 'change', (latest) => {
    const shouldBeScrolled = latest > 20
    setIsScrolled((prev) => (prev === shouldBeScrolled ? prev : shouldBeScrolled))
  })

  return (
    <>
      <header className="pointer-events-none fixed top-0 z-10 flex h-24 w-full items-center justify-center">
        <div className="flex h-full w-full flex-row items-center justify-between px-10 md:px-18">
          <Link
            href="/"
            aria-label="Home"
            className={cn(
              'motion-effects-default pointer-events-auto',
              isScrolled ? 'opacity-0' : 'opacity-100',
            )}
          >
            <Wordmark />
          </Link>
        </div>
      </header>

      <div className="pointer-events-none fixed top-0 right-0 z-60 flex h-24 items-center justify-end pr-10 md:pr-18">
        <div
          className={cn(
            'motion-spatial-default pointer-events-auto flex items-center rounded-full transition-all',
            isScrolled || isDrawerOpen
              ? 'bg-surface-container-high border-outline-variant -mr-3 border px-3 py-2'
              : 'mr-0 border border-transparent bg-transparent p-0',
          )}
        >
          <ControlGroup
            toggleDrawer={toggleDrawer}
            toggleTheme={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
            isScrolled={isScrolled}
            isDrawerOpen={isDrawerOpen}
            isDark={isDark}
          />
        </div>
      </div>

      <Drawer destinations={destinations} isOpen={isDrawerOpen} closeDrawer={closeDrawer} />
    </>
  )
}
