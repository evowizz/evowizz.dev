import { cn } from '@/lib/utils'
import { VariantProps, cva } from 'cva'
import { forwardRef } from 'react'

/**
 * BoxBlock is a simple wrapper component that adds padding and margin to its children.
 */
const boxBlockVariants = cva(undefined, {
  variants: {
    margin: {
      left: 'ml-[max(calc(100vw/24),1rem)]',
      right: 'mr-[max(calc(100vw/24),1rem)]',
      both: 'mx-[max(calc(100vw/24),1rem)]',
      none: '',
    },
    padding: {
      left: 'pl-[max(calc(100vw/24),1rem)]',
      right: 'pr-[max(calc(100vw/24),1rem)]',
      both: 'px-[max(calc(100vw/24),1rem)]',
      none: '',
    },
  },
  defaultVariants: {
    margin: 'both',
    padding: 'none',
  },
})

type BoxBlockProps = React.HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof boxBlockVariants>

const BoxBlock = forwardRef<HTMLDivElement, BoxBlockProps>(
  ({ className, margin, padding, ...props }, ref) => {
    return (
      <div
        className={cn(boxBlockVariants({ margin, padding, className }))}
        ref={ref}
        {...props}
      />
    )
  },
)

BoxBlock.displayName = 'BoxBlock'

export { BoxBlock }