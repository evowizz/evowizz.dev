import { Suspense } from 'react'
import Image from 'next/image'
import dayjs from 'dayjs'
import { notFound } from 'next/navigation'
import { allPosts, Post } from '@/content'
import MDXContent from '@/components/mdx/mdx-content'
import EnhancedArticle from '@/components/enhanced-article'
import { ViewCounter } from '@/components/view-counter'
import { ReportView } from '@/components/report-view'
import { BackButton } from '@/components/link-button'
import { ThemeOverride } from '@/components/material-theme-context'
import { EditOnGitHub } from '@/components/edit-on-github'
import { Container } from '@/components/elements'
import { Reveal } from '@/components/reveal'
import { getViewsBySlug } from '@/app/db/queries'

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

async function Views({ slug }: { slug: string }) {
  const view = await getViewsBySlug(slug)
  const count = view?.count ?? 0

  return (
    <>
      <ReportView slug={slug} />
      {count > 0 && (
        <>
          <span aria-hidden className="text-outline-variant">
            /
          </span>
          <ViewCounter count={count} className="tabular-nums" />
        </>
      )}
    </>
  )
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = allPosts.find((post: Post) => post.slug === slug)

  if (!post) {
    notFound()
  }

  return (
    <main className="min-h-screen pt-10 pb-24 md:pt-16">
      <ThemeOverride color={post.themeColor} variant={post.themeVariant} />
      <Container>
        <BackButton href="/blog">All posts</BackButton>

        <EnhancedArticle className="prose prose-quoteless dark:prose-invert w-full max-w-none">
          <Reveal immediate stagger y={24} className="not-prose flex flex-col items-start gap-5">
            <p className="text-on-surface-variant flex flex-wrap items-center gap-x-2 gap-y-1 text-sm font-medium">
              <time dateTime={post.publishedAt} className="tabular-nums">
                {dayjs(post.publishedAt).format('MMMM DD, YYYY')}
              </time>
              <Suspense>
                <Views slug={post.slug} />
              </Suspense>
            </p>

            <h1 className="variation-sans text-on-surface text-[clamp(2.5rem,7vw,5rem)] leading-[1.02] font-semibold tracking-tight text-balance">
              {post.title}
            </h1>

            <p className="text-on-surface-variant text-lg leading-relaxed md:text-xl">
              {post.summary}
            </p>
          </Reveal>

          {post.image && (
            <Reveal>
              <figure className="not-prose mt-12 md:mt-14">
                <div className="border-outline-variant relative aspect-video w-full overflow-hidden rounded-xl border">
                  <Image src={post.image} alt={post.title} fill className="object-cover" priority />
                </div>
              </figure>
            </Reveal>
          )}

          <div className="mt-12 md:mt-14">
            <MDXContent code={post.mdx} />
          </div>
        </EnhancedArticle>

        <footer className="mt-16 md:mt-24">
          <EditOnGitHub filePath={`content/posts/${slug}.mdx`} />
        </footer>
      </Container>
    </main>
  )
}
