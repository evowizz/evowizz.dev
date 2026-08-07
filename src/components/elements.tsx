import { type ComponentProps, type Ref, type ReactNode } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { MaterialSymbol } from '@/components/material-symbol'

export const Container = ({ className, children }: { className?: string; children: ReactNode }) => (
  <div className={cn('mx-auto w-full max-w-6xl px-5 md:px-8', className)}>{children}</div>
)

export const Label = ({ children }: { children: ReactNode }) => (
  <span className="text-on-surface-variant text-sm font-medium">{children}</span>
)

/**
 * Routes an anchor by its `href`.
 *
 * A relative href routes, a hash stays on the page, anything else opens off-site in a new tab.
 */
export const SmartLink = ({ href = '', ...props }: ComponentProps<'a'>) => {
  if (href.startsWith('/')) return <Link href={href} {...props} />
  if (href.startsWith('#')) return <a href={href} {...props} />
  return <a href={href} target="_blank" rel="noopener noreferrer" {...props} />
}

/** An inline link in body copy. `SmartLink` handles the routing. */
export const TextLink = ({ className, ...props }: ComponentProps<'a'>) => (
  <SmartLink {...props} className={cn('text-primary focus-ring underline-offset-4 hover:underline', className)} />
)

/** The page-level h1, holding the display scale in one place. */
export const PageTitle = ({
  ref,
  className,
  children,
}: {
  ref?: Ref<HTMLHeadingElement>
  className?: string
  children: ReactNode
}) => (
  <h1
    ref={ref}
    className={cn(
      'variation-sans text-on-surface text-[clamp(3.25rem,var(--page-title-fluid,11vw),var(--page-title-max,8.5rem))] leading-none font-semibold tracking-[-0.03em]',
      className,
    )}
  >
    {children}
  </h1>
)

/** A row in a ruled card, carrying the hover state layer. Without an `href` it renders a plain div. */
export const RowLink = ({ href, className, children }: { href?: string; className?: string; children: ReactNode }) =>
  href ? (
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

export const ActionLink = ({ href, children }: { href: string; children: ReactNode }) => (
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
