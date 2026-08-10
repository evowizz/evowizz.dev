import type { ReactNode, Ref } from 'react'
import { cn } from '@/lib/utils'

export function Label({ children }: { children: ReactNode }) {
  return <span className="text-on-surface-variant text-sm font-medium">{children}</span>
}

export function PageTitle({
  ref,
  className,
  children,
}: {
  ref?: Ref<HTMLHeadingElement>
  className?: string
  children: ReactNode
}) {
  return (
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
}
