import { allFoci, Focus } from '@/content'
import { notFound } from 'next/navigation'
import MDXContent from '@/components/mdx/mdx-content'
import EnhancedArticle from '@/components/enhanced-article'
import { BackButton } from '@/components/link-button'
import { FocusHeader } from '@/app/focus/_components/focus-header'
import { ThemeOverride } from '@/components/material-theme-context'
import { EditOnGitHub } from '@/components/edit-on-github'

export async function generateStaticParams() {
  return allFoci.map((item) => ({
    slug: item.slug,
  }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
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

export default async function FocusPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const item = allFoci.find((f: Focus) => f.slug === slug)

  if (!item) {
    notFound()
  }

  return (
    <main className="min-h-screen pt-24 pb-12">
      <ThemeOverride color={item.themeColor} variant={item.themeVariant} />
      <div className="container mx-auto max-w-4xl px-4">
        <BackButton href="/focus">All Focus</BackButton>

        <EnhancedArticle className="prose prose-quoteless dark:prose-invert w-full max-w-none">
          <FocusHeader
            meta={{
              title: item.title,
              overview: item.overview,
              stack: item.stack,
              role: item.role,
              image: item.image,
            }}
          />

          <MDXContent code={item.mdx} />
        </EnhancedArticle>

        <EditOnGitHub filePath={`content/focus/${slug}.mdx`} />
      </div>
    </main>
  )
}
