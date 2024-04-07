import { cn } from "@/lib/utils"

export const HeroText: React.FC<{
  className?: string
}> = ({ className }) => {
  return (
    <span className={cn('text-[calc(42px+38*(100vw-768px)/1024)] leading-tight font-600 select-none', className)}>
      <Line className="motion-safe:animation-delay-200">
        Crafting software,
      </Line>
      <Line className="motion-safe:animation-delay-400">
        Shaping components &amp;
      </Line>
      <Line className="motion-safe:animation-delay-600">
        Discovering hidden features
      </Line>
    </span>
  )
}

const Line = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) => (
  <div>
    <p
      {...props}
      className={cn(
        'inline-block',
        'motion-safe:opacity-0 motion-safe:animate-hero-appear',
        'duration-300 ease-slow-in transition-colors',
        className,
      )}
    />
  </div>
)