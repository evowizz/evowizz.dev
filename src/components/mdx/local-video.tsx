import 'server-only'

import * as fs from 'node:fs'
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

function publicFileExists(path: string) {
  return fs.existsSync(`${process.cwd()}/public${path}`)
}

export function LocalVideo({
  src,
  controls = true,
  loop = false,
  autoPlay = false,
  className,
  ...props
}: StyleableProps<LocalVideoProps>) {
  const splitSrc = src.split('.')
  const extension = splitSrc.pop() ?? ''

  if (!['mp4', 'webm'].includes(extension)) {
    throw new Error(`Invalid video extension for src: ${src}. Only mp4 and webm are supported.`)
  }

  const filename = splitSrc.join('.')

  // The first thumbnail that exists wins, and the video simply has no poster if none do.
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
