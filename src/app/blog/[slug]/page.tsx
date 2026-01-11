import { allPosts, Post } from '@/content'
import Balancer from 'react-wrap-balancer'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import MDXContent from '@/components/mdx/mdx-content'
import EnhancedArticle from '@/components/enhanced-article'
import { ViewCounter } from '@/components/view-counter'
import { MaterialSymbol } from '@/components/material-symbol'
import { getViewsCount } from '@/app/db/queries'
import { increment } from '@/app/db/actions'
import dayjs from 'dayjs'
import Image from 'next/image'
import { Suspense, cache } from 'react'

export async function generateStaticParams() {
  return allPosts.map((post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = allPosts.find((post: Post) => post.slug === slug)
  if (!post) return

  return {
    title: post.title,
    description: post.summary,
    openGraph: {
      title: post.title,
      description: post.summary,
      type: 'article',
      publishedTime: post.publishedAt,
      url: `https://evowizz.dev/blog/${slug}`,
      images: [
        {
          url: `/api/og?text=${encodeURIComponent(post.title)}`,
        },
      ],
    },
  }
}

const incrementViews = cache(increment)

async function Views({ slug }: { slug: string }) {
  const views = await getViewsCount().catch((error) => {
    console.error('DB Error:', error)
    return null
  })

  if (views === null) return null

  incrementViews(slug)
  return <ViewCounter allViews={views} slug={slug} className="text-on-surface-variant text-sm" />
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = allPosts.find((post: Post) => post.slug === slug)

  if (!post) {
    notFound()
  }

  return (
    <main className="min-h-screen pt-24 pb-12">
      <div className="container mx-auto max-w-4xl px-4">
        <EnhancedArticle className="w-full">
          <header className="mb-12 flex flex-col gap-2">
            <Link
              href="/blog"
              className="group text-inverse-on-surface bg-inverse-surface motion-spatial-default variation-sans hover:variation-width-120 hover:font-700 mb-4 flex w-fit items-center gap-1 rounded-full py-2 pr-4 pl-3 text-sm font-medium transition-all"
            >
              <MaterialSymbol
                name="arrow_back"
                className="motion-spatial-default group-hover:symbol-weight-700 text-base transition-all"
              />
              All posts
            </Link>
            <h1 className="text-4xl font-bold md:text-5xl">
              <Balancer>{post.title}</Balancer>
            </h1>
            <p className="text-on-surface-variant text-xl leading-relaxed">
              <Balancer>{post.summary}</Balancer>
            </p>
            <div className="text-on-surface-variant flex items-center gap-1">
              <time dateTime={post.publishedAt}>
                {dayjs(post.publishedAt).format('MMMM DD, YYYY')}
              </time>
              <Suspense>
                <span>•</span>
                <Views slug={post.slug} />
              </Suspense>
            </div>
          </header>

          {post.image && (
            <div className="border-outline-variant relative mb-12 aspect-video w-full overflow-hidden rounded-3xl border">
              <Image src={post.image} alt={post.title} fill className="object-cover" priority />
            </div>
          )}

          <MDXContent code={post.mdx} />
        </EnhancedArticle>
      </div>
    </main>
  )
}
