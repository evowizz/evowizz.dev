import { cn } from '@/lib/utils'

type BlobBackgroundProps = {
  className?: string
}

export const BlobBackground = (props: BlobBackgroundProps) => {
  return (
    <>
      <div className={cn('fixed inset-0 blur-[100px]', props.className)}>
        {/* Blob one */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 -rotate-45">
          <div className="w-[clamp(100px,40vw,800px)] h-[clamp(100px,30vw,600px)] bg-red-600/30 rounded-full -z-10 animate-slower-spin" />
        </div>
        {/* Blob two */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-[10%] -translate-y-1/2 -rotate-90">
          <div className="w-[clamp(100px,40vw,800px)] h-[clamp(100px,20vw,400px)] bg-background rounded-full -z-10 animate-slow-spin" />
        </div>
      </div>
      {/* Noise */}
      <div className="absolute inset-0 overlay-noise dark:invert" />
    </>
  )
}
