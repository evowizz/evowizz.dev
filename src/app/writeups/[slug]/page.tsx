import { allWriteups, Writeup } from '@/content'
import { notFound } from 'next/navigation'
import MDXContent from '@/components/mdx/mdx-content'
import EnhancedArticle from '@/components/enhanced-article'
import { BackButton } from '@/components/link-button'
import { WriteupHeader } from '@/app/writeups/_components/writeup-header'
import { ThemeOverride } from '@/components/material-theme-context'

export async function generateStaticParams() {
  return allWriteups.map((writeup) => ({
    slug: writeup.slug,
  }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const writeup = allWriteups.find((w: Writeup) => w.slug === slug)
  if (!writeup) return

  return {
    title: writeup.title,
    description: writeup.overview,
    openGraph: {
      title: writeup.title,
      description: writeup.overview,
      type: 'article',
      url: `https://evowizz.dev/writeups/${slug}`,
      images: [
        {
          url: `/api/og?text=${encodeURIComponent(writeup.title)}`,
        },
      ],
    },
  }
}

export default async function WriteupPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const writeup = allWriteups.find((w: Writeup) => w.slug === slug)

  if (!writeup) {
    notFound()
  }

  return (
    <main className="min-h-screen pt-24 pb-12">
      <ThemeOverride color={writeup.themeColor} variant={writeup.themeVariant} />
      <div className="container mx-auto max-w-4xl px-4">
        <BackButton href="/writeups">All Writeups</BackButton>

        <EnhancedArticle className="prose prose-quoteless dark:prose-invert w-full max-w-none">
          <WriteupHeader
            meta={{
              title: writeup.title,
              overview: writeup.overview,
              stack: writeup.stack,
              role: writeup.role,
              image: writeup.image,
            }}
          />

          <MDXContent code={writeup.mdx} />
        </EnhancedArticle>
      </div>
    </main>
  )
}
