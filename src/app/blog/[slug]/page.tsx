import { Suspense } from 'react'
import Image from 'next/image'
import dayjs from 'dayjs'
import { notFound } from 'next/navigation'
import { connection } from 'next/server'
import { allPosts, Post } from '@/content'
import MDXContent from '@/components/mdx/mdx-content'
import { ArticleWithRuler } from '@/components/article/article-with-ruler'
import { ArticleLoadingShell, ArticlePageShell } from '@/components/article/article-page-shell'
import { ViewReporter } from './_components/view-reporter'
import { MaterialSymbol } from '@/components/ui/material-symbol'
import { ThemeOverride } from '@/theme/material-theme'
import { EditOnGitHub } from '@/components/article/edit-on-github'
import { Reveal } from '@/components/ui/reveal'
import { getViewsBySlug } from '@/db/views/queries'
import { countWords, formatWords } from '@/lib/words'
import { TWITTER_HANDLE } from '@/config/site'

export const prefetch = 'partial'

type BlogPostProps = {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return allPosts.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: BlogPostProps) {
  'use cache'

  const { slug } = await params
  const post = findPost(slug)
  if (!post) return

  const images = post.image ? [{ url: post.image }] : undefined

  return {
    title: post.title,
    description: post.summary,
    robots: post.hidden ? { index: false, follow: false } : undefined,
    openGraph: {
      title: post.title,
      description: post.summary,
      type: 'article',
      publishedTime: post.publishedAt,
      url: `https://evowizz.dev/blog/${slug}`,
      images,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.summary,
      creator: TWITTER_HANDLE,
      images,
    },
  }
}

async function Views({ slug }: { slug: string }) {
  await connection()

  const view = await getViewsBySlug(slug)
  const count = view?.count ?? 0

  return (
    <>
      <ViewReporter slug={slug} />
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

export default function BlogPost({ params }: BlogPostProps) {
  return (
    <ArticlePageShell backHref="/blog" backLabel="All posts">
      <Suspense fallback={<ArticleLoadingShell />}>
        <BlogPostContent params={params} />
      </Suspense>
    </ArticlePageShell>
  )
}

async function BlogPostContent({ params }: BlogPostProps) {
  const { slug } = await params
  const post = findPost(slug)

  if (!post) {
    notFound()
  }

  return (
    <>
      <ThemeOverride color={post.themeColor} variant={post.themeVariant} />
      <ArticleWithRuler className="paper prose prose-quoteless dark:prose-invert w-full max-w-none">
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

          {post.image && (
            <figure className="border-outline-variant relative aspect-2/1 w-full overflow-hidden rounded-xl border">
              <Image src={post.image} alt="" fill priority sizes="100vw" className="object-cover" />
            </figure>
          )}
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
      </ArticleWithRuler>

      <footer className="mt-4">
        <EditOnGitHub filePath={`content/posts/${slug}.mdx`} />
      </footer>
    </>
  )
}

function findPost(slug: string) {
  return allPosts.find((post: Post) => post.slug === slug)
}
