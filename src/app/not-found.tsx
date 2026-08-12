import type { Metadata } from 'next'
import { LinkButton } from '@/components/article/article-navigation'
import { Container } from '@/components/ui/container'

export const metadata: Metadata = {
  title: 'Page not found',
}

export default function NotFound() {
  return (
    <main className="bg-surface text-on-surface flex flex-1">
      <Container className="flex items-center justify-center py-24 md:py-32">
        <section className="group/not-found flex w-full max-w-4xl flex-col items-center text-center">
          <p className="flex max-w-full items-center justify-center overflow-hidden font-mono text-sm whitespace-nowrap sm:text-lg">
            <span>evowizz.dev/</span>
            <span className="not-found-backspace-segment text-tertiary inline-block overflow-hidden">this-page</span>
            <span aria-hidden className="bg-tertiary ml-1 inline-block h-7 w-1" />
          </p>

          <div className="mt-8 flex flex-col items-center gap-4">
            <h1 className="variation-sans text-4xl leading-tight font-semibold tracking-tight text-balance md:text-6xl">
              Congrats! You found nothing.
            </h1>
            <p className="text-on-surface-variant text-xl">Go back, or else...</p>
          </div>

          <div className="mt-8">
            <LinkButton href="/" direction="back" variant="primary">
              Go back
            </LinkButton>
          </div>
        </section>
      </Container>
    </main>
  )
}
