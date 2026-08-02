import Link from 'next/link'
import { cva, type VariantProps } from 'cva'
import { MaterialSymbol } from '@/components/material-symbol'
import { cn } from '@/lib/utils'

const linkButtonVariants = cva(
  'group inline-flex w-fit items-center gap-1 rounded-full text-sm font-medium transition-[font-variation-settings,font-weight,background-color,border-color,transform] motion-spatial-default variation-sans hover:variation-width-120 hover:font-700 active:scale-95 focus-ring',
  {
    variants: {
      variant: {
        primary: 'bg-inverse-surface text-inverse-on-surface',
        outline: 'border border-outline-variant hover:bg-surface-bright hover:border-transparent',
      },
      direction: {
        back: 'py-2 pr-4 pl-3',
        forward: 'py-2 pl-4 pr-3',
      },
    },
    compoundVariants: [
      {
        variant: 'outline',
        direction: 'back',
        className: 'px-4 py-2',
      },
      {
        variant: 'outline',
        direction: 'forward',
        className: 'px-4 py-2',
      },
    ],
    defaultVariants: {
      variant: 'primary',
      direction: 'back',
    },
  },
)

type LinkButtonProps = VariantProps<typeof linkButtonVariants> & {
  href: string
  children: React.ReactNode
  className?: string
  external?: boolean
}

export function LinkButton({ href, children, variant, direction, className, external }: LinkButtonProps) {
  const isBack = direction === 'back'
  const iconName = isBack ? 'arrow_back' : 'arrow_forward'

  return (
    <Link
      href={href}
      className={cn(linkButtonVariants({ variant, direction }), className)}
      {...(external && { target: '_blank', rel: 'noopener noreferrer' })}
    >
      {isBack && (
        <MaterialSymbol
          name={iconName}
          className="motion-spatial-default group-hover:symbol-weight-700 text-base transition-[font-variation-settings]"
        />
      )}
      {children}
      {!isBack && (
        <MaterialSymbol
          name={iconName}
          className="motion-spatial-default group-hover:symbol-weight-700 text-base transition-[font-variation-settings]"
        />
      )}
    </Link>
  )
}

export function BackButton({
  href,
  children,
  className,
}: {
  href: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <LinkButton href={href} direction="back" variant="primary" className={cn('mb-6', className)}>
      {children}
    </LinkButton>
  )
}
