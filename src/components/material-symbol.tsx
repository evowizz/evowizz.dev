import { cn } from '@/lib/utils'
import { StyleableProps } from '@/types/component'

interface MaterialSymbolProps {
  name: string
  fill?: boolean
}

export const MaterialSymbol = ({
  name,
  className,
  fill = false,
  ...props
}: StyleableProps<MaterialSymbolProps>) => {
  return (
    <span
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
