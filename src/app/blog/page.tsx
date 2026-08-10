import { Suspense } from 'react'
import Link from 'next/link'
import dayjs from 'dayjs'
import { allPosts } from '@/content'
import { getViewsCount } from '@/db/views/queries'
import { Container } from '@/components/ui/container'
import { PageTitle } from '@/components/ui/typography'
import { MaterialSymbol } from '@/components/ui/material-symbol'

export const metadata = {
  title: 'Blog',
  description: 'Thoughts and tutorials on development and design.',
}

export default function BlogPage() {
  const posts = allPosts
    .filter((post) => !post.hidden)
    .sort((a, b) => dayjs(b.publishedAt).unix() - dayjs(a.publishedAt).unix())

  const years = posts.map((post) => dayjs(post.publishedAt).year())
  const firstYear = Math.min(...years)
  const lastYear = Math.max(...years)
  const span = firstYear === lastYear ? `${firstYear}` : `${firstYear}-${lastYear}`

  return (
    <main className="min-h-viewport py-28 md:py-40">
      <Container className="flex flex-col gap-12 md:gap-16">
        <div className="flex flex-col gap-4">
          <PageTitle>Blog</PageTitle>
          <p className="text-on-surface-variant max-w-xl text-lg md:text-xl">
            Notes on Android, web development, and design.
          </p>
          <p className="text-on-surface-variant flex flex-wrap items-center gap-x-2 gap-y-1 pt-2 font-mono text-xs tracking-[0.08em] uppercase">
            <span>
              {posts.length} {posts.length === 1 ? 'entry' : 'entries'}
            </span>
            <span aria-hidden className="text-outline-variant">
              /
            </span>
            <span>{span}</span>
          </p>
        </div>

        <ul className="divide-outline-variant -mx-4 flex flex-col divide-y md:-mx-6">
          {posts.map((post, index) => (
            <li key={post.slug}>
              <PostRow post={post} latest={index === 0} />
            </li>
          ))}
        </ul>
      </Container>
    </main>
  )
}

type PostEntry = (typeof allPosts)[number]

const PostMeta = ({ post, latest }: { post: PostEntry; latest?: boolean }) => (
  <p className="text-on-surface-variant flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-xs tracking-[0.08em] uppercase">
    {latest && (
      <>
        <span className="text-primary">Latest</span>
        <span aria-hidden className="text-outline-variant">
          /
        </span>
      </>
    )}
    <time dateTime={post.publishedAt}>{dayjs(post.publishedAt).format('MMMM DD, YYYY')}</time>
    <Suspense>
      <Views slug={post.slug} />
    </Suspense>
  </p>
)

const PostRow = ({ post, latest }: { post: PostEntry; latest?: boolean }) => (
  <Link
    href={`/blog/${post.slug}`}
    className="group hover:bg-surface-container-low focus-visible:bg-surface-container-low motion-effects-fast focus-ring block px-4 py-5 transition-colors md:px-6 md:py-7"
  >
    <article className="flex flex-col items-start gap-2.5">
      <PostMeta post={post} latest={latest} />

      <h2 className="variation-sans text-on-surface text-2xl leading-snug font-semibold tracking-tight text-balance md:text-3xl">
        {post.title}
      </h2>

      <p className="text-on-surface-variant max-w-[44rem] leading-relaxed md:text-lg">{post.summary}</p>
    </article>
  </Link>
)

async function Views({ slug }: { slug: string }) {
  // getViewsCount uses 'use cache' with cacheLife('seconds'), so parallel
  // calls from multiple Views components share the same cached result.
  const allViews = await getViewsCount()
  const count = allViews.find((v) => v.slug === slug)?.count ?? 0

  if (!count) return null

  return (
    <>
      <span aria-hidden className="text-outline-variant">
        /
      </span>
      <span className="inline-flex items-center gap-1.5">
        <MaterialSymbol name="visibility" className="text-base" />
        {count.toLocaleString()}
        <span className="sr-only">views</span>
      </span>
    </>
  )
}
