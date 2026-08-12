import { Suspense } from 'react'
import { notFound } from 'next/navigation'
import { allCaseStudies, CaseStudy } from '@/content'
import MDXContent from '@/components/mdx/mdx-content'
import { ArticleWithRuler } from '@/components/article/article-with-ruler'
import { ArticleLoadingShell, ArticlePageShell } from '@/components/article/article-page-shell'
import { CaseStudyHeader } from './_components/case-study-header'
import { ThemeOverride } from '@/theme/material-theme'
import { EditOnGitHub } from '@/components/article/edit-on-github'

export const prefetch = 'partial'

type CaseStudyPageProps = {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return allCaseStudies.map((item) => ({
    slug: item.slug,
  }))
}

export async function generateMetadata({ params }: CaseStudyPageProps) {
  'use cache'

  const { slug } = await params
  const item = allCaseStudies.find((caseStudy: CaseStudy) => caseStudy.slug === slug)
  if (!item) return

  return {
    title: item.title,
    description: item.overview,
    openGraph: {
      title: item.title,
      description: item.overview,
      type: 'article',
      url: `https://evowizz.dev/case-studies/${slug}`,
      images: [
        {
          url: `/api/og?text=${encodeURIComponent(item.title)}`,
        },
      ],
    },
  }
}

export default function CaseStudyPage({ params }: CaseStudyPageProps) {
  return (
    <ArticlePageShell backHref="/case-studies" backLabel="All Case Studies">
      <Suspense fallback={<ArticleLoadingShell />}>
        <CaseStudyContent params={params} />
      </Suspense>
    </ArticlePageShell>
  )
}

async function CaseStudyContent({ params }: CaseStudyPageProps) {
  const { slug } = await params
  const item = allCaseStudies.find((caseStudy: CaseStudy) => caseStudy.slug === slug)

  if (!item) {
    notFound()
  }

  return (
    <>
      <ThemeOverride color={item.themeColor} variant={item.themeVariant} />
      <ArticleWithRuler className="paper w-full">
        <CaseStudyHeader
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
        <EditOnGitHub filePath={`content/case-studies/${slug}.mdx`} />
      </footer>
    </>
  )
}
