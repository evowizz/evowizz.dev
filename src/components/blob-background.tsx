import { cn } from '@/lib/utils'

type BlobBackgroundProps = {
  className?: string
}

export const BlobBackground = (props: BlobBackgroundProps) => {
  return <div className="absolute inset-0 overlay-noise -z-[9999]" />
}
