import Image from 'next/image'
import { projects, type Project } from '@/app/(home)/_data/projects'
import { cn } from '@/lib/utils'
import { Container } from '@/components/ui/container'
import { ActionLink, RowLink } from '@/components/ui/links'
import { MaterialSymbol } from '@/components/ui/material-symbol'
import { SectionTitle } from '../section-title'
import { Reveal } from '@/components/ui/reveal'
import { CountUp } from '../count-up'

const SENTENCES: Record<string, string> = {
  Inware: 'An Android app I have been building since 2018 to answer one question: what is actually inside your phone?',
  'Personal Website': 'The page you are reading, built with Next.js and open source from front to back.',
  Cosmose: 'A small demo gallery of Jetpack Compose components and animations.',
  Common: 'A Kotlin library of the utilities and extensions I kept rewriting for Android.',
  'De-Gmojify': 'A Chrome extension that swaps Google emojis for the ones your system already ships.',
  Actio: 'A Figma plugin that resizes frames to an aspect ratio, so nobody does the math by hand.',
}

const STAT_LABELS: Record<string, string> = {
  downloads: 'Downloads',
  rating: 'Rating, about 2,000 reviews',
}

const lead = projects.find((project) => project.spotlight)
const rest = projects.filter((project) => !project.spotlight && !project.deprecated)

const sentenceFor = (project: Project) => SENTENCES[project.title] ?? project.description

const statValue = (stat: { value: string; label: string }) => (stat.label === 'rating' ? `${stat.value}/5` : stat.value)

/** Counts "500k+" up. Leaves non-integer values like "4.7/5" static. */
const StatValue = ({ value }: { value: string }) => {
  const match = /^(\d+)(\D*)$/.exec(value)
  if (!match) return <>{value}</>
  return <CountUp to={parseInt(match[1], 10)} suffix={match[2]} />
}

/** Weights the scrim where the type sits, so white clears 11.4:1 over any shot. */
const Lead = ({ project }: { project: Project }) => (
  <article className="relative isolate overflow-hidden rounded-4xl text-white">
    <Image
      src={project.image}
      alt={`Screens from ${project.title}`}
      fill
      sizes="(max-width: 72rem) 100vw, 72rem"
      className="-z-10 object-cover"
    />
    <div className="from-scrim/95 via-scrim/80 to-scrim/10 absolute inset-0 -z-10 bg-linear-to-t via-50%" />

    <div className="flex flex-col gap-9 p-6 pt-48 md:p-8 md:pt-64 lg:p-10 lg:pt-72">
      <h3 className="variation-sans text-[clamp(3rem,7vw,5.5rem)] leading-[0.95] font-medium tracking-[-0.03em]">
        {project.title}
      </h3>

      <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between lg:gap-16">
        <div className="flex flex-col items-start gap-5 lg:flex-1">
          <p className="max-w-xl text-lg leading-relaxed opacity-80 md:text-xl">{sentenceFor(project)}</p>

          <div className="flex flex-wrap items-center gap-x-8 gap-y-3">
            {project.links[0] && (
              // Not `ActionLink`: its `primary` hover is wrong over a picture.
              <a
                href={project.links[0].url}
                target="_blank"
                rel="noopener noreferrer"
                className="group focus-ring motion-effects-default inline-flex items-center gap-1.5 text-sm font-semibold underline-offset-4 hover:underline"
              >
                {project.links[0].label}
                <MaterialSymbol
                  name="arrow_outward"
                  className="motion-spatial-fast text-base transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </a>
            )}
            <span className="font-mono text-sm opacity-75">{project.techStack.join(' / ')}</span>
          </div>
        </div>

        {/* flex-col-reverse keeps a valid dt-then-dd order with the figure on top. */}
        <dl className="flex flex-wrap gap-x-10 gap-y-5 lg:shrink-0">
          {project.spotlightStats?.map((stat) => (
            <div key={stat.label} className="flex flex-col-reverse gap-1.5">
              <dt className="text-sm font-medium opacity-80">{STAT_LABELS[stat.label] ?? stat.label}</dt>
              <dd className="variation-sans text-[clamp(2.5rem,4.5vw,3.25rem)] leading-none font-bold tracking-tight tabular-nums">
                <StatValue value={statValue(stat)} />
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  </article>
)

const Row = ({ project }: { project: Project }) => {
  const link = project.links[0]

  return (
    <RowLink
      href={link?.url}
      className="group flex flex-col gap-2 px-5 py-5 md:flex-row md:items-baseline md:gap-8 md:px-6 md:py-6"
    >
      {/* w-56, not w-48: "Personal Website" measures 181px and would wrap. */}
      <h3 className="variation-sans text-on-surface shrink-0 text-xl font-medium tracking-tight md:w-56 md:text-2xl">
        {project.title}
      </h3>
      <p className="text-on-surface-variant flex-1 text-base leading-relaxed">{sentenceFor(project)}</p>
      {link ? (
        <MaterialSymbol
          name="arrow_outward"
          className="text-on-surface-variant group-hover:text-primary motion-effects-default hidden shrink-0 self-center text-base transition-colors md:block"
        />
      ) : (
        // Keeps the sentence column ending on the same edge as the linked rows.
        <span aria-hidden className="hidden shrink-0 text-base md:block md:w-4" />
      )}
    </RowLink>
  )
}

export const Work = () => (
  <section id="work" className="bg-surface text-on-surface scroll-mt-20 py-20 md:py-28">
    <Container className="flex flex-col gap-10 md:gap-12">
      <div className="flex flex-col gap-4">
        <SectionTitle>Work</SectionTitle>
        <Reveal>
          <p className="text-on-surface-variant max-w-xl text-lg md:text-xl">
            Ten years of shipping. Everything here is mine, built end to end.
          </p>
        </Reveal>
      </div>

      <div className="flex flex-col gap-12 md:gap-16">
        {lead && (
          <Reveal>
            <Lead project={lead} />
          </Reveal>
        )}

        <Reveal>
          <ul className="border-outline-variant divide-outline-variant divide-y overflow-hidden rounded-2xl border">
            {rest.map((project) => (
              <li key={project.title}>
                <Row project={project} />
              </li>
            ))}

            <li className="flex flex-wrap items-center justify-between gap-x-8 gap-y-3 px-5 py-5 md:px-6 md:py-6">
              <p className="text-on-surface-variant text-base leading-relaxed">Libraries, experiments and more.</p>
              <ActionLink href="https://github.com/evowizz">Everything else lives on GitHub</ActionLink>
            </li>
          </ul>
        </Reveal>
      </div>
    </Container>
  </section>
)
