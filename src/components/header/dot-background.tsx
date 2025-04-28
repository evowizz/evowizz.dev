import DotCanvas from './dot-canvas'
import { cn } from '@/lib/utils'
import { ComponentProps, forwardRef } from 'react'

// Shape should be taken from the "shape" prop of the "DotCanvas" component
type DotBackgroundProps = React.HTMLAttributes<HTMLDivElement> & {
  shape?: ComponentProps<typeof DotCanvas>['shape']
}

const DotBackground = forwardRef<HTMLDivElement, DotBackgroundProps>(
  ({ shape = 'circle', className, children, ...props }, ref) => {
    return (
      <div className={cn(className, 'relative')} ref={ref} {...props}>
        <DotCanvas
          shape={shape}
          color='50% 0 0 / 0.5'
          className="absolute top-0 left-0 w-full h-full"
        />
        <div className="relative">{children}</div>
      </div>
    )
  }
)

DotBackground.displayName = 'DotBackground'

export { DotBackground }
