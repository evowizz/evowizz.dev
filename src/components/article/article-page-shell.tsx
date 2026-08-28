import type { ReactNode } from 'react'
import { BackButton } from '@/components/article/article-navigation'
import { ArticleControls } from '@/components/article/article-controls'
import { ArticleWithRuler } from '@/components/article/article-with-ruler'
import { Container } from '@/components/ui/container'

type ArticlePageShellProps = {
  backHref: string
  backLabel: string
  children: ReactNode
}

export function ArticlePageShell({ backHref, backLabel, children }: ArticlePageShellProps) {
  return (
    <main id="main-content" tabIndex={-1} className="min-h-viewport overflow-x-clip pt-10 pb-24 md:pt-16">
      <Container>
        <div className="mb-3 flex items-center justify-between gap-4">
          <BackButton href={backHref} className="mb-0">
            {backLabel}
          </BackButton>
          <ArticleControls />
        </div>
        {children}
      </Container>
    </main>
  )
}

export function ArticleLoadingShell() {
  return (
    <ArticleWithRuler
      aria-busy="true"
      aria-label="Loading article"
      className="paper flex w-full flex-col gap-10 motion-safe:animate-pulse"
    >
      <div className="flex flex-col gap-5">
        <div className="bg-surface-container-high h-3 w-36 rounded-full" />
        <div className="flex max-w-3xl flex-col gap-3">
          <div className="bg-surface-container-high h-12 w-full rounded-lg md:h-16" />
          <div className="bg-surface-container-high h-12 w-4/5 rounded-lg md:h-16" />
        </div>
        <div className="bg-surface-container h-5 w-3/5 rounded-full" />
      </div>

      <div className="flex max-w-4xl flex-col gap-4">
        <div className="bg-surface-container h-4 w-full rounded-full" />
        <div className="bg-surface-container h-4 w-11/12 rounded-full" />
        <div className="bg-surface-container h-4 w-4/5 rounded-full" />
      </div>
    </ArticleWithRuler>
  )
}
