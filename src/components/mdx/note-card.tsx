import { StyleablePropsWithChildren } from '@/types/component'
import { cn } from '@/lib/utils'
import { MaterialSymbol } from '@/components/material-symbol'

type NoteCardProps = {
  icon?: string
  title?: string
}

export function NoteCard({
  icon = 'info',
  title = 'Note',
  children,
  className,
  ...props
}: StyleablePropsWithChildren<NoteCardProps>) {
  return (
    <aside
      className={cn(
        'bg-surface-container my-8 flex flex-col gap-3 rounded-xl p-5 md:p-6',
        className,
      )}
      {...props}
    >
      <div className="flex items-center gap-2">
        <MaterialSymbol name={icon} className="symbol-weight-500 text-primary text-xl" />
        <span className="text-on-surface text-sm font-semibold">{title}</span>
      </div>
      <div className="text-on-surface-variant text-base *:first:mt-0 *:last:mb-0">{children}</div>
    </aside>
  )
}
