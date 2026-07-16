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
        'bg-tertiary-container text-on-tertiary-container my-8 flex flex-col gap-4 rounded-3xl p-6',
        className,
      )}
      {...props}
    >
      <div className="flex items-center gap-2">
        <MaterialSymbol name={icon} className="symbol-weight-500" />
        <span className="text-xl font-medium">{title}</span>
      </div>
      <div className="text-base *:first:mt-0 *:last:mb-0">{children}</div>
    </aside>
  )
}
