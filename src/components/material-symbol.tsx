import { cn } from '@/lib/utils'

interface MaterialSymbolProps {
  name: string
  className?: string
  fill?: boolean
}

export const MaterialSymbol = ({ name, className, fill = false }: MaterialSymbolProps) => {
  return (
    <span
      className={cn(
        'material-symbols-rounded',
        fill ? 'symbol-fill-1' : 'symbol-fill-0',
        className,
      )}
    >
      {name}
    </span>
  )
}
