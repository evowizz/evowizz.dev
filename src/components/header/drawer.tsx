'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { useScrollLock } from '@/hooks/use-scroll-lock'
import { useWidthBreath } from '@/hooks/use-width-breath'
import { destinations } from '@/lib/destinations'
import { EMAIL } from '@/lib/contact'
import { Container, focusRing } from '@/components/elements'
import { Wordmark } from '@/components/wordmark'
import { MenuIcon } from './menu-icon'

type DrawerLinkProps = {
  label: string
  path: string
  index: number
  open: boolean
  active: boolean
  onClose: () => void
}

const DrawerLink = ({ label, path, index, open, active, onClose }: DrawerLinkProps) => {
  const ref = useWidthBreath<HTMLSpanElement>({
    from: 70,
    duration: 0.7,
    delay: 0.3 + index * 0.09,
    play: open,
  })

  return (
    // The staggered entrance lives on the li so its transition-delay never
    // bleeds into the hover color transition on the text below.
    <li
      className={cn(
        'motion-spatial-default transition-[opacity,translate]',
        open ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0',
      )}
      style={{ transitionDelay: open ? `${250 + index * 90}ms` : '0ms' }}
    >
      <Link
        href={path}
        onClick={onClose}
        aria-current={active ? 'page' : undefined}
        className={cn('block w-fit', focusRing)}
      >
        <span
          ref={ref}
          className={cn(
            'variation-sans motion-effects-fast block text-[clamp(3rem,11vw,7rem)] leading-[1.05] font-semibold tracking-tight transition-colors',
            active ? 'text-primary' : 'text-on-surface hover:text-primary',
          )}
        >
          {label}
        </span>
      </Link>
    </li>
  )
}

type DrawerProps = {
  open: boolean
  onClose: () => void
}

export const Drawer = ({ open, onClose }: DrawerProps) => {
  const pathname = usePathname() ?? ''
  const panelRef = useRef<HTMLDivElement>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)

  useScrollLock(open)

  useEffect(() => {
    if (!open) return

    const previouslyFocused = document.activeElement as HTMLElement | null
    closeButtonRef.current?.focus()

    return () => previouslyFocused?.focus()
  }, [open])

  useEffect(() => {
    if (!open) return

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
        return
      }

      if (event.key !== 'Tab') return

      const panel = panelRef.current
      if (!panel) return

      const focusable = panel.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      )
      if (focusable.length === 0) return

      const first = focusable[0]
      const last = focusable[focusable.length - 1]

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [open, onClose])

  return (
    <div
      id="site-drawer"
      ref={panelRef}
      role="dialog"
      aria-modal="true"
      aria-label="Menu"
      inert={!open}
      className={cn(
        'bg-surface-container motion-effects-slow fixed inset-0 z-50 flex flex-col overflow-y-auto overscroll-contain transition-opacity',
        open ? 'opacity-100' : 'pointer-events-none opacity-0',
      )}
    >
      <div className="flex h-16 shrink-0 items-center">
        <Container className="flex items-center justify-between">
          <Link
            href="/"
            onClick={onClose}
            aria-label="evowizz, home"
            className={cn(
              'text-on-surface hover:text-primary motion-effects-default transition-colors',
              focusRing,
            )}
          >
            <Wordmark />
          </Link>
          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            aria-label="Close menu"
            className={cn(
              'group text-on-surface hover:bg-surface-container-high motion-effects-fast -mr-2 flex size-11 items-center justify-center rounded-full transition-colors',
              focusRing,
            )}
          >
            <MenuIcon isOpen={open} className="group-hover:symbol-weight-700" />
          </button>
        </Container>
      </div>

      <div className="flex flex-1 items-center py-10">
        <Container>
          <nav aria-label="Site">
            <ul className="flex flex-col gap-1 md:gap-2">
              {destinations.map((destination, index) => {
                const active =
                  destination.path === '/'
                    ? pathname === '/'
                    : pathname.startsWith(destination.path)
                return (
                  <DrawerLink
                    key={destination.path}
                    label={destination.label}
                    path={destination.path}
                    index={index}
                    open={open}
                    active={active}
                    onClose={onClose}
                  />
                )
              })}
            </ul>
          </nav>
        </Container>
      </div>

      <div
        className={cn(
          'motion-effects-slow shrink-0 transition-opacity',
          open ? 'opacity-100' : 'opacity-0',
        )}
        style={{ transitionDelay: open ? '650ms' : '0ms' }}
      >
        <Container className="flex flex-wrap items-center justify-between gap-4 py-8">
          <p className="text-on-surface flex items-center gap-2 text-sm font-medium">
            <span aria-hidden className="bg-primary size-2 rounded-full" />
            Available for hire
          </p>
          <a
            href={`mailto:${EMAIL}`}
            className={cn(
              'text-on-surface hover:text-primary motion-effects-default text-sm font-medium transition-colors',
              focusRing,
            )}
          >
            {EMAIL}
          </a>
        </Container>
      </div>
    </div>
  )
}
