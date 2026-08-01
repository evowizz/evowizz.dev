import { Suspense } from 'react'
import dayjs from 'dayjs'
import { notFound } from 'next/navigation'
import { allPosts, Post } from '@/content'
import MDXContent from '@/components/mdx/mdx-content'
import EnhancedArticle from '@/components/enhanced-article'
import { ReportView } from '@/components/report-view'
import { MaterialSymbol } from '@/components/material-symbol'
import { BackButton } from '@/components/link-button'
import { ThemeOverride } from '@/components/material-theme-context'
import { EditOnGitHub } from '@/components/edit-on-github'
import { Container } from '@/components/elements'
import { Reveal } from '@/components/reveal'
import { ReaderToolbar } from '@/components/reader-toolbar'
import { getViewsBySlug } from '@/app/db/queries'
import { countWords, formatWords } from '@/lib/words'

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
          <span className="inline-flex items-center gap-1.5" suppressHydrationWarning>
            <MaterialSymbol name="visibility" className="text-base" />
            {count.toLocaleString()}
            <span className="sr-only">views</span>
          </span>
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
    <main className="min-h-viewport pt-10 pb-24 md:pt-16">
      <ThemeOverride color={post.themeColor} variant={post.themeVariant} />
      <Container>
        <div className="mb-3 flex items-center justify-between gap-4">
          <BackButton href="/blog" className="mb-0">
            All posts
          </BackButton>
          <ReaderToolbar />
        </div>

        <EnhancedArticle className="paper prose prose-quoteless dark:prose-invert w-full max-w-none">
          <Reveal immediate stagger y={24} className="not-prose flex flex-col items-start gap-5">
            <p className="text-on-surface-variant flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-xs tracking-[0.08em] uppercase">
              <time dateTime={post.publishedAt}>{dayjs(post.publishedAt).format('MMMM DD, YYYY')}</time>
              <span aria-hidden className="text-outline-variant">
                /
              </span>
              <span className="inline-flex items-center gap-1.5">
                <MaterialSymbol name="match_word" className="text-base" />
                {formatWords(countWords(post.content))}
                <span className="sr-only">words</span>
              </span>
              <Suspense>
                <Views slug={post.slug} />
              </Suspense>
            </p>

            <h1 className="variation-sans text-on-surface text-[clamp(2.5rem,7vw,5rem)] leading-[1.02] font-semibold tracking-tight text-balance">
              {post.title}
            </h1>

            <p className="text-on-surface-variant max-w-176 text-lg leading-relaxed md:text-xl">{post.summary}</p>
          </Reveal>

          <p
            aria-hidden
            className="not-prose text-outline-variant mt-10 text-center font-mono text-sm select-none md:mt-12"
          >
            ----
          </p>

          <div className="mt-10 md:mt-12">
            <MDXContent code={post.mdx} />
          </div>
        </EnhancedArticle>

        <footer className="mt-4">
          <EditOnGitHub filePath={`content/posts/${slug}.mdx`} />
        </footer>
      </Container>
    </main>
  )
}
