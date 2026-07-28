import Link from 'next/link'
import { allFoci } from '@/content'
import { Container, PageTitle } from '@/components/elements'

export const metadata = {
  title: 'Focus',
  description: 'The design decisions and development process behind my projects.',
}

export default function FocusPage() {
  const focus = allFoci.filter((item) => !item.hidden)

  return (
    <main className="min-h-viewport py-28 md:py-40">
      <Container className="flex flex-col gap-12 md:gap-16">
        <div className="flex flex-col gap-4">
          <PageTitle>Focus</PageTitle>
          <p className="text-on-surface-variant max-w-[38rem] text-lg md:text-xl">
            One project at a time, in depth: the design decisions and the development process behind my work.
          </p>
          <p className="text-on-surface-variant flex flex-wrap items-center gap-x-2 gap-y-1 pt-2 font-mono text-xs tracking-[0.08em] uppercase">
            <span>
              {focus.length} {focus.length === 1 ? 'project' : 'projects'}
            </span>
          </p>
        </div>

        <ul className="divide-outline-variant -mx-4 flex flex-col divide-y md:-mx-6">
          {focus.map((item) => (
            <li key={item.slug}>
              <FocusRow item={item} />
            </li>
          ))}
        </ul>
      </Container>
    </main>
  )
}

type FocusEntry = (typeof allFoci)[number]

const FocusRow = ({ item }: { item: FocusEntry }) => (
  <Link
    href={`/focus/${item.slug}`}
    className="group hover:bg-surface-container-low focus-visible:bg-surface-container-low motion-effects-fast focus-ring block px-4 py-5 transition-colors md:px-6 md:py-7"
  >
    <article className="flex flex-col items-start gap-2.5">
      <p className="text-on-surface-variant font-mono text-xs tracking-[0.08em] uppercase">{item.stack.join(' / ')}</p>

      <h2 className="variation-sans text-on-surface text-2xl leading-snug font-semibold tracking-tight text-balance md:text-3xl">
        {item.title}
      </h2>

      <p className="text-on-surface-variant max-w-[44rem] leading-relaxed md:text-lg">{item.overview}</p>
    </article>
  </Link>
)
