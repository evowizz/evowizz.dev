'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { useScrollLock } from '@/hooks/use-scroll-lock'
import { useWidthBreath } from '@/hooks/use-width-breath'
import { destinations } from '@/lib/destinations'
import { EMAIL, SOCIALS } from '@/lib/contact'
import { Container } from '@/components/elements'

const LOCATION = 'Nantes, France'

type DrawerBandProps = {
  label: string
  path: string
  index: number
  open: boolean
  active: boolean
  onClose: () => void
}

const DrawerBand = ({ label, path, index, open, active, onClose }: DrawerBandProps) => {
  const ref = useWidthBreath<HTMLSpanElement>({
    from: 70,
    duration: 0.7,
    delay: 0.3 + index * 0.09,
    play: open,
  })

  return (
    // The staggered entrance lives on the li so its transition-delay never
    // bleeds into the hover transition on the band below.
    <li
      className={cn(
        'motion-spatial-default flex flex-1 transition-[opacity,translate]',
        open ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0',
      )}
      style={{ transitionDelay: open ? `${250 + index * 90}ms` : '0ms' }}
    >
      <Link
        href={path}
        onClick={onClose}
        aria-current={active ? 'page' : undefined}
        className="hover:bg-surface-container-low motion-effects-fast focus-ring flex flex-1 items-center justify-center transition-colors"
      >
        <span
          ref={ref}
          className={cn(
            'variation-sans motion-effects-fast text-[clamp(3rem,8vw,5.5rem)] font-semibold tracking-tight transition-colors',
            active ? 'text-primary' : 'text-on-surface',
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
  /** The header wrapping the drawer. The focus trap cycles through it. */
  scopeRef: React.RefObject<HTMLElement | null>
}

export const Drawer = ({ open, onClose, scopeRef }: DrawerProps) => {
  const pathname = usePathname() ?? ''
  const panelRef = useRef<HTMLDivElement>(null)

  useScrollLock(open)

  useEffect(() => {
    if (!open) return

    const previouslyFocused = document.activeElement as HTMLElement | null
    panelRef.current?.focus()

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

      const scope = scopeRef.current
      if (!scope) return

      const focusable = scope.querySelectorAll<HTMLElement>(
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
  }, [open, onClose, scopeRef])

  return (
    <div
      id="site-drawer"
      ref={panelRef}
      role="dialog"
      aria-modal="true"
      aria-label="Menu"
      tabIndex={-1}
      inert={!open}
      className={cn(
        // Bottom is inset by the dev bar: fixed elements ignore the body padding
        // it reserves, so without this the imprint sits behind it. Zero in production.
        'fixed inset-x-0 top-0 bottom-(--devbar-h) isolate flex flex-col overflow-y-auto overscroll-contain',
        !open && 'pointer-events-none',
      )}
    >
      {/* The wash lives on its own empty layer so the compositor can cache
          the blurred backdrop while the nav animates above it. Its radius is
          transitioned instead of opacity: opacity would isolate the
          backdrop-filter from the page behind it. */}
      <div
        aria-hidden
        className={cn(
          'motion-effects-slow fixed inset-0 -z-10 transition-[background-color,backdrop-filter]',
          open ? 'bg-surface/85 backdrop-blur-xl' : 'bg-surface/0 backdrop-blur-[0px]',
        )}
      />

      {/* The band hairlines live inside this fading wrapper so they never
          show through the closed drawer. */}
      <div
        className={cn(
          'motion-effects-slow flex flex-1 flex-col pt-16 transition-opacity',
          open ? 'opacity-100' : 'opacity-0',
        )}
        style={{ transitionDelay: open ? '150ms' : '0ms' }}
      >
        <nav aria-label="Site" className="flex flex-1 flex-col">
          <ul className="divide-outline-variant border-outline-variant flex flex-1 flex-col divide-y border-y">
            {destinations.map((destination, index) => (
              <DrawerBand
                key={destination.path}
                label={destination.label}
                path={destination.path}
                index={index}
                open={open}
                active={destination.path === '/' ? pathname === '/' : pathname.startsWith(destination.path)}
                onClose={onClose}
              />
            ))}
          </ul>
        </nav>
      </div>

      <div
        className={cn('motion-effects-slow shrink-0 transition-opacity', open ? 'opacity-100' : 'opacity-0')}
        style={{ transitionDelay: open ? '650ms' : '0ms' }}
      >
        <Container className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2 py-6 text-sm">
          <a
            href={`mailto:${EMAIL}`}
            className="text-on-surface hover:text-primary motion-effects-default focus-ring font-medium transition-colors"
          >
            {EMAIL}
          </a>
          <ul className="text-on-surface-variant flex flex-wrap gap-x-4 gap-y-1">
            {SOCIALS.map((social) => (
              <li key={social.href}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-primary motion-effects-default focus-ring transition-colors"
                >
                  {social.label}
                </a>
              </li>
            ))}
          </ul>
          <p className="text-on-surface-variant">{LOCATION}</p>
        </Container>
      </div>
    </div>
  )
}
