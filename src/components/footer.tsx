import { cn } from '@/lib/utils'
import { StyleableProps } from '@/types/component'

const year = new Date().getFullYear()

export function Footer({ className }: StyleableProps) {
  return (
    <footer
      className={cn(
        'bg-secondary-container text-on-secondary-container flex h-24 flex-col items-center justify-center px-8 text-center',
        className,
      )}
    >
      <span>© {year} Dylan Roussel.</span>
      <span>Made with caffeine, crafted with care.</span>
    </footer>
  )
}
