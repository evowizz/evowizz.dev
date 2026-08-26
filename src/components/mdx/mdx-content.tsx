import { MDXContent as BaseMDXContent } from '@content-collections/mdx/react'
import { Children, isValidElement } from 'react'
import Image, { type ImageProps } from 'next/image'
import Pre from './pre'
import { LocalVideo } from './local-video'
import { NoteCard } from './note-card'
import { Resources } from './resources'
import { Tweet } from './tweet'
import { SmartLink } from '@/components/ui/links'
import { Tooltip } from '@/components/ui/tooltip'

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

// Markdown images (`![alt](src "caption")`) compile to a plain `<img>` with
// the title text in the `title` attribute. When present, we pair it with a
// `<figcaption>` so case studies can caption a screenshot from markdown
// alone. The `prose-bleed` utility styles the resulting figure. Without a
// title the image renders exactly as before.
const CustomMarkdownImage = ({ alt = '', title, ...props }: React.ComponentProps<'img'>) => {
  const image = <img alt={alt} {...props} />

  if (!title) return image

  return (
    <figure>
      {image}
      <figcaption>{title}</figcaption>
    </figure>
  )
}

// A markdown image on its own line compiles to a lone `<img>` inside a `<p>`.
// When it has a caption, CustomMarkdownImage wraps it in a `<figure>`, which
// is block content and cannot legally sit inside a `<p>` - the browser would
// auto-close the paragraph, disagreeing with the tree React hydrates.
// Unwrap the paragraph in that one case so both trees match.
const CustomParagraph = ({ children, ...props }: React.ComponentProps<'p'>) => {
  const kids = Children.toArray(children)
  const onlyChild = kids.length === 1 ? kids[0] : null

  if (
    isValidElement<{ title?: string }>(onlyChild) &&
    onlyChild.type === CustomMarkdownImage &&
    onlyChild.props.title
  ) {
    return <>{children}</>
  }

  return <p {...props}>{children}</p>
}

const CustomTopLevelHeading = (props: React.ComponentProps<'h1'>) => <h2 {...props} />

const components = {
  Image: CustomImage,
  img: CustomMarkdownImage,
  p: CustomParagraph,
  h1: CustomTopLevelHeading,
  a: SmartLink,
  pre: Pre,
  LocalVideo,
  NoteCard,
  Resources,
  Tooltip,
  Tweet,
}

export default function MDXContent({ code }: { code: string }) {
  return <BaseMDXContent code={code} components={components} />
}
