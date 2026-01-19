import { allPosts } from '@/content'
import Link from 'next/link'
import dayjs from 'dayjs'
import { getViewsCount } from '@/app/db/queries'
import { ViewCounter } from '@/components/view-counter'
import { Suspense } from 'react'

export const metadata = {
  title: 'Blog',
  description: 'Thoughts and tutorials on development and design.',
}

export default function BlogPage() {
  const posts = allPosts
    .filter((post) => !post.hidden)
    .sort((a, b) => dayjs(b.publishedAt).unix() - dayjs(a.publishedAt).unix())

  // Group posts by year for a nice structured list
  const postsByYear = posts.reduce(
    (acc, post) => {
      const year = dayjs(post.publishedAt).format('YYYY')
      if (!acc[year]) acc[year] = []
      acc[year].push(post)
      return acc
    },
    {} as Record<string, typeof posts>,
  )

  const years = Object.keys(postsByYear).sort((a, b) => Number(b) - Number(a))

  return (
    <main className="flex min-h-screen flex-col">
      <section className="px-6 py-24 md:px-12 md:py-32">
        <div className="mx-auto flex w-full max-w-5xl flex-col gap-6">
          <span className="text-primary text-xs font-medium tracking-[0.2em] uppercase">Blog</span>
          <h1 className="text-4xl font-semibold tracking-tight text-balance md:text-6xl">
            Thoughts, tutorials, <br className="hidden md:block" />
            and stories.
          </h1>
          <p className="text-on-surface-variant max-w-2xl text-lg leading-relaxed text-balance md:text-xl">
            Exploring the world of Android, web development, and design engineering.
          </p>
        </div>
      </section>

      <section className="px-6 pb-24 md:px-12">
        <div className="mx-auto flex w-full max-w-5xl flex-col gap-16">
          {years.map((year) => (
            <div
              key={year}
              className="border-outline-variant flex flex-col border-b pb-12 last:border-0 md:grid md:grid-cols-[8rem_1fr]"
            >
              <div className="mb-4 md:mt-6 md:mb-0">
                <span className="text-tertiary sticky top-24 text-2xl font-semibold">{year}</span>
              </div>

              <div className="flex w-full flex-col">
                {postsByYear[year].map((post) => (
                  <Link
                    key={post.slug}
                    href={`/blog/${post.slug}`}
                    className="group hover:bg-surface-container-low flex flex-col rounded-xl px-4 py-6 transition-colors"
                  >
                    <div className="flex flex-col gap-2">
                      <div className="flex flex-col gap-1 md:items-baseline md:justify-between">
                        <div className="text-on-surface-variant flex items-center gap-1 text-sm opacity-60 transition-opacity group-hover:opacity-100">
                          <time dateTime={post.publishedAt}>
                            {dayjs(post.publishedAt).format('MMM DD')}
                          </time>
                          <Suspense>
                            <span>•</span>
                            <Views slug={post.slug} />
                          </Suspense>
                        </div>
                        <h2 className="group-hover:text-primary motion-effects-default text-xl font-medium transition-colors md:text-2xl">
                          {post.title}
                        </h2>
                      </div>

                      <p className="text-on-surface-variant line-clamp-2 text-base md:w-11/12">
                        {post.summary}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}

async function Views({ slug }: { slug: string }) {
  // getViewsCount uses 'use cache' with cacheLife('seconds'), so parallel
  // calls from multiple Views components share the same cached result.
  const allViews = await getViewsCount()
  const view = allViews.find((v) => v.slug === slug)
  return <ViewCounter count={view?.count ?? 0} />
}
