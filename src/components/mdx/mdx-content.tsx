import { MDXContent as BaseMDXContent } from '@content-collections/mdx/react'
import Image, { type ImageProps } from 'next/image'
import Link from 'next/link'
import Pre from './pre'
import { LocalVideo } from './local-video'
import { NoteCard } from './note-card'
import { Tooltip } from '@/components/ui/tooltip'

const CustomLink = ({ href = '', ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => {
  if (href.startsWith('/')) {
    return (
      <Link href={href} {...props}>
        {props.children}
      </Link>
    )
  }

  if (href.startsWith('#')) {
    return <a {...props} />
  }

  return <a href={href} target="_blank" rel="noopener noreferrer" {...props} />
}

const CustomImage = ({ alt = '', ...props }: Omit<ImageProps, 'width' | 'height'>) => {
  return (
    <Image
      alt={alt}
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      className="h-auto w-full rounded-xl"
      width={800}
      height={400}
      {...props}
    />
  )
}

const components = {
  Image: CustomImage,
  a: CustomLink,
  pre: Pre,
  LocalVideo,
  NoteCard,
  Tooltip,
}

export default function MDXContent({ code }: { code: string }) {
  return <BaseMDXContent code={code} components={components} />
}
