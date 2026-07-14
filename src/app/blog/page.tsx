import { Suspense } from 'react'
import Link from 'next/link'
import dayjs from 'dayjs'
import { allPosts } from '@/content'
import { getViewsCount } from '@/app/db/queries'
import { ViewCounter } from '@/components/view-counter'
import { Container, focusRing } from '@/components/elements'
import { PageTitle } from '@/components/section-title'
import { Reveal } from '@/components/reveal'
import { cn } from '@/lib/utils'

export const metadata = {
  title: 'Blog',
  description: 'Thoughts and tutorials on development and design.',
}

export default function BlogPage() {
  const posts = allPosts
    .filter((post) => !post.hidden)
    .sort((a, b) => dayjs(b.publishedAt).unix() - dayjs(a.publishedAt).unix())

  return (
    <main className="min-h-screen pt-16 pb-28 md:pt-24 md:pb-40">
      <Container className="flex flex-col gap-16 md:gap-24">
        <div className="flex flex-col gap-4">
          <PageTitle>Blog</PageTitle>
          <Reveal immediate delay={0.2}>
            <p className="text-on-surface-variant max-w-[36rem] text-lg md:text-xl">
              Notes on Android, web development, and design.
            </p>
          </Reveal>
        </div>

        <ul className="flex flex-col gap-16 md:gap-24">
          {posts.map((post) => (
            <li key={post.slug}>
              <Reveal>
                <article className="flex flex-col items-start gap-3">
                  <p className="text-on-surface-variant flex flex-wrap items-center gap-x-2 gap-y-1 text-sm font-medium">
                    <time dateTime={post.publishedAt} className="tabular-nums">
                      {dayjs(post.publishedAt).format('MMMM DD, YYYY')}
                    </time>
                    <Suspense>
                      <Views slug={post.slug} />
                    </Suspense>
                  </p>

                  <h2>
                    <Link
                      href={`/blog/${post.slug}`}
                      className={cn(
                        'variation-sans text-on-surface hover:text-primary motion-effects-fast block w-fit text-3xl leading-[1.05] font-semibold tracking-tight transition-colors text-balance md:text-5xl',
                        focusRing,
                      )}
                    >
                      {post.title}
                    </Link>
                  </h2>

                  <p className="text-on-surface-variant line-clamp-2 max-w-[44rem] text-lg leading-relaxed">
                    {post.summary}
                  </p>
                </article>
              </Reveal>
            </li>
          ))}
        </ul>
      </Container>
    </main>
  )
}

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
      <ViewCounter count={count} className="tabular-nums" />
    </>
  )
}
