import Image from 'next/image'
import Link from 'next/link'
import { allFoci } from '@/content'
import { Container, focusRing, Label } from '@/components/elements'
import { PageTitle } from '@/components/section-title'
import { Reveal } from '@/components/reveal'
import { cn } from '@/lib/utils'

export const metadata = {
  title: 'Focus',
  description: 'The design decisions and development process behind my projects.',
}

export default function FocusPage() {
  const focus = allFoci.filter((item) => !item.hidden)

  return (
    <main className="min-h-screen pt-16 pb-28 md:pt-24 md:pb-40">
      <Container className="flex flex-col gap-16 md:gap-24">
        <div className="flex flex-col gap-4">
          <PageTitle>Focus</PageTitle>
          <Reveal immediate delay={0.2}>
            <p className="text-on-surface-variant max-w-[38rem] text-lg md:text-xl">
              One project at a time, in depth: the design decisions and the development
              process behind my work.
            </p>
          </Reveal>
        </div>

        <ul className="flex flex-col gap-16 md:gap-24">
          {focus.map((item) => (
            <li key={item.slug}>
              <Reveal>
                <article className="flex flex-col items-start gap-3">
                  {item.image && (
                    <Link
                      href={`/focus/${item.slug}`}
                      aria-hidden
                      tabIndex={-1}
                      className="block w-full"
                    >
                      <div className="border-outline-variant relative aspect-2/1 w-full overflow-hidden rounded-xl border">
                        <Image
                          src={item.image}
                          alt=""
                          fill
                          sizes="(max-width: 72rem) 100vw, 72rem"
                          className="object-cover"
                        />
                      </div>
                    </Link>
                  )}

                  {item.role && <Label>{item.role}</Label>}

                  <h2>
                    <Link
                      href={`/focus/${item.slug}`}
                      className={cn(
                        'variation-sans text-on-surface hover:text-primary motion-effects-fast block w-fit text-3xl leading-[1.05] font-semibold tracking-tight transition-colors text-balance md:text-5xl',
                        focusRing,
                      )}
                    >
                      {item.title}
                    </Link>
                  </h2>

                  <p className="text-on-surface-variant line-clamp-2 max-w-[44rem] text-lg leading-relaxed">
                    {item.overview}
                  </p>

                  <span className="text-on-surface-variant font-mono text-sm">
                    {item.stack.join(' / ')}
                  </span>
                </article>
              </Reveal>
            </li>
          ))}
        </ul>
      </Container>
    </main>
  )
}
