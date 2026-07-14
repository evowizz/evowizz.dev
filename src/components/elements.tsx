import { type ReactNode } from 'react'
import { cn } from '@/lib/utils'
import { MaterialSymbol } from '@/components/material-symbol'

export const focusRing =
  'focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary'

export const Container = ({
  className,
  children,
}: {
  className?: string
  children: ReactNode
}) => <div className={cn('mx-auto w-full max-w-6xl px-5 md:px-8', className)}>{children}</div>

export const Label = ({ children }: { children: ReactNode }) => (
  <span className="text-on-surface-variant text-sm font-medium">{children}</span>
)

export const ActionLink = ({ href, children }: { href: string; children: ReactNode }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className={cn(
      'text-on-surface hover:text-primary motion-effects-default inline-flex items-center gap-1.5 text-sm font-semibold transition-colors',
      focusRing,
    )}
  >
    {children}
    <MaterialSymbol name="arrow_outward" className="text-base" />
  </a>
)
