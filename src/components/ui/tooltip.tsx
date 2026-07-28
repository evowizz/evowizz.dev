import { ReactNode } from 'react'
import { cn } from '@/lib/utils'

type TooltipProps = {
  content: string | ReactNode
  children: ReactNode
  className?: string
}

export function Tooltip({ content, children, className }: TooltipProps) {
  return (
    <span className={cn('group relative inline-block', className)}>
      <span className="border-b border-dashed border-current">{children}</span>
      <span
        role="tooltip"
        className="bg-surface-bright text-on-surface border-outline group-mobile-hover:block absolute top-full left-0 z-50 hidden w-max max-w-xs rounded-lg border p-3 text-sm shadow-sm"
      >
        {content}
      </span>
    </span>
  )
}
