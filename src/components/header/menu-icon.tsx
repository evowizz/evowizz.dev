import { cn } from '@/lib/utils'
import { MaterialSymbol } from '@/components/material-symbol'

interface MenuIconProps {
  isOpen: boolean
  className?: string
}

export const MenuIcon = ({ isOpen, className }: MenuIconProps) => {
  const commonClasses = 'motion-effects-slow absolute'

  return (
    <div className={cn('relative flex h-6 w-6 items-center justify-center', className)}>
      <MaterialSymbol
        name="drag_handle"
        className={cn(commonClasses, !isOpen ? 'rotate-0 opacity-100' : 'rotate-90 opacity-0')}
      />
      <MaterialSymbol
        name="close"
        className={cn(commonClasses, isOpen ? 'rotate-0 opacity-100' : '-rotate-90 opacity-0')}
      />
    </div>
  )
}
