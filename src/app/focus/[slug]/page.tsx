import { notFound } from 'next/navigation'
import { allFoci, Focus } from '@/content'
import MDXContent from '@/components/mdx/mdx-content'
import { ArticleWithRuler } from '@/components/article/article-with-ruler'
import { FocusHeader } from './_components/focus-header'
import { ThemeOverride } from '@/theme/material-theme'
import { EditOnGitHub } from '@/components/article/edit-on-github'
import { BackButton } from '@/components/article/article-navigation'
import { Container } from '@/components/ui/container'
import { ArticleControls } from '@/components/article/article-controls'

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
    <main className="min-h-viewport overflow-x-clip pt-10 pb-24 md:pt-16">
      <ThemeOverride color={item.themeColor} variant={item.themeVariant} />
      <Container>
        <div className="mb-3 flex items-center justify-between gap-4">
          <BackButton href="/focus" className="mb-0">
            All Focus
          </BackButton>
          <ArticleControls />
        </div>

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
      </Container>
    </main>
  )
}
