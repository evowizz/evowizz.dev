import Image from 'next/image'
import { Label } from '@/components/ui/typography'
import { Reveal } from '@/components/ui/reveal'

export type CaseStudyMeta = {
  title: string
  overview: string
  stack: string[]
  role?: string
  image?: string
}

type CaseStudyHeaderProps = {
  meta: CaseStudyMeta
}

export function CaseStudyHeader({ meta }: CaseStudyHeaderProps) {
  return (
    <header className="prose-bleed not-prose mb-12 flex flex-col gap-10 md:mb-16">
      <Reveal immediate stagger y={24} className="flex flex-col items-start gap-5">
        <h1 className="variation-sans text-on-surface text-[clamp(2.5rem,7vw,5rem)] leading-[1.02] font-semibold tracking-tight text-balance">
          {meta.title}
        </h1>

        <p className="text-on-surface-variant max-w-176 text-lg leading-relaxed text-pretty md:text-xl">
          {meta.overview}
        </p>

        <div className="flex flex-wrap gap-x-14 gap-y-4 pt-2">
          {meta.role && (
            <div className="flex flex-col gap-1.5">
              <Label>Role</Label>
              <span className="text-on-surface text-base font-medium">{meta.role}</span>
            </div>
          )}
          <div className="flex flex-col gap-1.5">
            <Label>Stack</Label>
            <span className="text-on-surface-variant font-mono text-sm leading-relaxed">{meta.stack.join(' / ')}</span>
          </div>
        </div>
      </Reveal>

      {meta.image && (
        <Reveal>
          <figure>
            <div className="border-outline-variant relative aspect-2/1 overflow-hidden rounded-xl border md:aspect-21/9 md:rounded-none md:border-x-0">
              <Image src={meta.image} alt={meta.title} fill priority sizes="100vw" className="object-cover" />
            </div>
          </figure>
        </Reveal>
      )}
    </header>
  )
}
