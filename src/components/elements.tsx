import { type CSSProperties, type Ref, type ReactNode } from 'react'
import { cn } from '@/lib/utils'
import { MaterialSymbol } from '@/components/material-symbol'

export const Container = ({ className, children }: { className?: string; children: ReactNode }) => (
  <div className={cn('mx-auto w-full max-w-6xl px-5 md:px-8', className)}>{children}</div>
)

export const Label = ({ children }: { children: ReactNode }) => (
  <span className="text-on-surface-variant text-sm font-medium">{children}</span>
)

/** Page-level h1. The home hero renders it too, so the display scale has one home. */
export const PageTitle = ({
  ref,
  className,
  style,
  children,
}: {
  ref?: Ref<HTMLHeadingElement>
  className?: string
  /** The hero passes live font-variation values through here. */
  style?: CSSProperties
  children: ReactNode
}) => (
  <h1
    ref={ref}
    style={style}
    className={cn(
      'variation-sans text-on-surface text-[clamp(3.25rem,11vw,8.5rem)] leading-none font-semibold tracking-[-0.03em]',
      className,
    )}
  >
    {children}
  </h1>
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
