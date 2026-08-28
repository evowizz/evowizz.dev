import Link from 'next/link'
import { allCaseStudies } from '@/content'
import { Container } from '@/components/ui/container'
import { PageTitle } from '@/components/ui/typography'
import { TWITTER_HANDLE } from '@/config/site'
import type { Metadata } from 'next'

export const title = 'Case Studies'
export const description = 'The decisions I made, and the ones I deleted.'

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    type: 'website',
    url: '/case-studies',
    title,
    description,
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    creator: TWITTER_HANDLE,
  },
}

export default function CaseStudiesPage() {
  const caseStudies = allCaseStudies.filter((item) => !item.hidden)

  return (
    <main id="main-content" tabIndex={-1} className="min-h-viewport py-28 md:py-40">
      <Container className="flex flex-col gap-12 md:gap-16">
        <div className="flex flex-col gap-4">
          <PageTitle>{title}</PageTitle>
          <p className="text-on-surface-variant max-w-152 text-lg md:text-xl">{description}</p>
          <p className="text-on-surface-variant flex flex-wrap items-center gap-x-2 gap-y-1 pt-2 font-mono text-xs tracking-[0.08em] uppercase">
            <span>
              {caseStudies.length} {caseStudies.length === 1 ? 'case study' : 'case studies'}
            </span>
          </p>
        </div>

        <ul className="divide-outline-variant -mx-4 flex flex-col divide-y md:-mx-6">
          {caseStudies.map((item) => (
            <li key={item.slug}>
              <CaseStudyRow item={item} />
            </li>
          ))}
        </ul>
      </Container>
    </main>
  )
}

type CaseStudyEntry = (typeof allCaseStudies)[number]

const CaseStudyRow = ({ item }: { item: CaseStudyEntry }) => (
  <Link
    href={`/case-studies/${item.slug}`}
    className="group hover:bg-surface-container-low focus-visible:bg-surface-container-low motion-effects-fast focus-ring block px-4 py-5 transition-colors md:px-6 md:py-7"
  >
    <article className="flex flex-col items-start gap-2.5">
      <p className="text-on-surface-variant font-mono text-xs tracking-[0.08em] uppercase">{item.stack.join(' / ')}</p>

      <h2 className="variation-sans text-on-surface text-2xl leading-snug font-semibold tracking-tight text-balance md:text-3xl">
        {item.title}
      </h2>

      <p className="text-on-surface-variant max-w-176 leading-relaxed md:text-lg">{item.overview}</p>
    </article>
  </Link>
)
