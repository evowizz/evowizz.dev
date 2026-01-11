import { publicFileExists } from '@/lib/server/utils'
import { Video } from '@/components/ui/video'
import { StyleableProps } from '@/types/component'
import { cn } from '@/lib/utils'

type LocalVideoProps = {
  controls?: boolean
  loop?: boolean
  autoPlay?: boolean
  src: string
}

const VIDEO_PATH = '/content/posts/videos/'
const THUMBNAIL_PATH = '/content/posts/videos/thumbnails/'

export function LocalVideo({
  src,
  controls = true,
  loop = false,
  autoPlay = false,
  className,
  ...props
}: StyleableProps<LocalVideoProps>) {
  // Find extension from src by splitting at the dot and taking the last element
  const splitSrc = src.split('.')
  const extension = splitSrc.pop() ?? ''

  // Check if the extension is valid
  if (!['mp4', 'webm'].includes(extension)) {
    throw new Error(`Invalid video extension for src: ${src}. Only mp4 and webm are supported.`)
  }

  // Combine remaining elements to get the filename
  const filename = splitSrc.join('.')

  // Check if a thumbnail exists. No thumbnail is shown if it doesn't exist.
  const poster = ['.jpg', '.webp', '.png']
    .map((ext) => `${THUMBNAIL_PATH}${filename}${ext}`)
    .find((file) => publicFileExists(file))

  return (
    <Video
      className={cn('w-full', className)}
      src={VIDEO_PATH + src}
      poster={poster}
      controls={controls}
      loop={loop}
      autoPlay={autoPlay}
      {...props}
    />
  )
}
