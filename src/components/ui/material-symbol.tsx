import { cn } from '@/lib/utils'
import { StyleableProps } from '@/types/component'

interface MaterialSymbolProps {
  name: string
  fill?: boolean
  'aria-label'?: string
}

export const MaterialSymbol = ({
  name,
  className,
  fill = false,
  'aria-label': ariaLabel,
  ...props
}: StyleableProps<MaterialSymbolProps>) => {
  return (
    <span
      aria-hidden={ariaLabel ? undefined : true}
      aria-label={ariaLabel}
      role={ariaLabel ? 'img' : undefined}
      className={cn(
        'material-symbols-rounded text-2xl select-none',
        fill ? 'symbol-fill-1' : 'symbol-fill-0',
        className,
      )}
      {...props}
    >
      {name}
    </span>
  )
}
