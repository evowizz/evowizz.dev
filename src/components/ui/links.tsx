import type { ComponentProps, ReactNode } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { MaterialSymbol } from './material-symbol'

export function SmartLink({ href = '', ...props }: ComponentProps<'a'>) {
  if (href.startsWith('/')) return <Link href={href} {...props} />
  if (href.startsWith('#')) return <a href={href} {...props} />
  return <a href={href} target="_blank" rel="noopener noreferrer" {...props} />
}

export function TextLink({ className, ...props }: ComponentProps<'a'>) {
  return (
    <SmartLink {...props} className={cn('text-primary focus-ring underline-offset-4 hover:underline', className)} />
  )
}

export function RowLink({ href, className, children }: { href?: string; className?: string; children: ReactNode }) {
  return href ? (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn('hover:bg-surface-container motion-effects-fast focus-ring transition-colors', className)}
    >
      {children}
    </a>
  ) : (
    <div className={className}>{children}</div>
  )
}

export function ActionLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-on-surface hover:text-primary motion-effects-default focus-ring inline-flex items-center gap-1.5 text-sm font-semibold transition-colors"
    >
      {children}
      <MaterialSymbol name="arrow_outward" className="text-base" />
    </a>
  )
}
