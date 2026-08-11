import { Suspense } from 'react'
import { notFound } from 'next/navigation'
import { allFoci, Focus } from '@/content'
import MDXContent from '@/components/mdx/mdx-content'
import { ArticleWithRuler } from '@/components/article/article-with-ruler'
import { ArticleLoadingShell, ArticlePageShell } from '@/components/article/article-page-shell'
import { FocusHeader } from './_components/focus-header'
import { ThemeOverride } from '@/theme/material-theme'
import { EditOnGitHub } from '@/components/article/edit-on-github'

export const prefetch = 'partial'

type FocusPageProps = {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return allFoci.map((item) => ({
    slug: item.slug,
  }))
}

export async function generateMetadata({ params }: FocusPageProps) {
  'use cache'

  const { slug } = await params
  const item = allFoci.find((f: Focus) => f.slug === slug)
  if (!item) return

  return {
    title: item.title,
    description: item.overview,
    openGraph: {
      title: item.title,
      description: item.overview,
      type: 'article',
      url: `https://evowizz.dev/focus/${slug}`,
      images: [
        {
          url: `/api/og?text=${encodeURIComponent(item.title)}`,
        },
      ],
    },
  }
}

export default function FocusPage({ params }: FocusPageProps) {
  return (
    <ArticlePageShell backHref="/focus" backLabel="All Focus">
      <Suspense fallback={<ArticleLoadingShell />}>
        <FocusContent params={params} />
      </Suspense>
    </ArticlePageShell>
  )
}

async function FocusContent({ params }: FocusPageProps) {
  const { slug } = await params
  const item = allFoci.find((f: Focus) => f.slug === slug)

  if (!item) {
    notFound()
  }

  return (
    <>
      <ThemeOverride color={item.themeColor} variant={item.themeVariant} />
      <ArticleWithRuler className="paper w-full">
        <FocusHeader
          meta={{
            title: item.title,
            overview: item.overview,
            stack: item.stack,
            role: item.role,
            image: item.image,
          }}
        />

        <div className="prose prose-quoteless prose-bleed dark:prose-invert w-full max-w-none">
          <MDXContent code={item.mdx} />
        </div>
      </ArticleWithRuler>

      <footer className="mt-4">
        <EditOnGitHub filePath={`content/focus/${slug}.mdx`} />
      </footer>
    </>
  )
}
