import { cn } from '@/lib/utils'

type BarButtonProps = {
  onClick: () => void
  title: string
  active?: boolean
  children: React.ReactNode
}

export const BarButton = ({ onClick, title, active, children }: BarButtonProps) => (
  <button
    type="button"
    onClick={onClick}
    title={title}
    aria-label={title}
    aria-pressed={active}
    className={cn(
      'motion-effects-fast focus-ring flex h-5.5 min-w-6 items-center justify-center gap-1 rounded-md px-1.5 leading-none transition-colors',
      active
        ? 'bg-primary text-on-primary'
        : 'text-on-surface-variant hover:bg-surface-container-highest hover:text-on-surface',
    )}
  >
    {children}
  </button>
)

export const Divider = () => (
  <span aria-hidden className="text-outline-variant px-1 select-none">
    |
  </span>
)
