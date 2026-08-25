import { allPosts } from '@/content'
import { buildOgImage, OG_IMAGE_SIZE } from '@/lib/og/og-image'

export const size = OG_IMAGE_SIZE
export const contentType = 'image/png'

export default async function OpengraphImage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = allPosts.find((post) => post.slug === slug)

  return buildOgImage({ title: post?.title ?? null, description: post?.summary })
}
