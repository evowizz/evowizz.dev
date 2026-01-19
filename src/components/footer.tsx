import { cn } from '@/lib/utils'
import { StyleableProps } from '@/types/component'

const year = new Date().getFullYear()

export function Footer({ className }: StyleableProps) {
  return (
    <footer
      className={cn('bg-secondary-container text-on-secondary-container flex h-24 items-center justify-center', className)}
    >
      © {year} Dylan Roussel. Made with caffeine, crafted with care.
    </footer>
  )
}
