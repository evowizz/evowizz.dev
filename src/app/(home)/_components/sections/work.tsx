import Image from 'next/image'
import { projects, type Project } from '@/lib/projects'
import { ActionLink, Container, Label } from '@/components/elements'
import { SectionTitle } from '@/components/section-title'
import { CountUp, Reveal } from '@/components/reveal'

// One honest sentence per project. Facts come from src/lib/projects.ts.
const SENTENCES: Record<string, string> = {
  Inware:
    'The hardware inspector I have been building since 2018, made to answer one question: what is actually inside your phone?',
  'Personal Website':
    'The page you are reading, built with Next.js and open source from front to back.',
  Cosmose: 'A small demo gallery of Jetpack Compose components and animations.',
  Common: 'A Kotlin library of the utilities and extensions I kept rewriting for Android.',
  'De-Gmojify':
    'A Chrome extension that swaps Google emojis for the ones your system already ships.',
  Actio:
    'A Figma plugin that resizes frames to an aspect ratio, so nobody does the math by hand.',
}

// Stat captions (the 4.7 comes from about 2,000 reviews).
const STAT_LABELS: Record<string, string> = {
  downloads: 'Downloads',
  rating: 'Rating, about 2,000 reviews',
}

const lead = projects.find((project) => project.spotlight)
const rest = projects.filter((project) => !project.spotlight && !project.deprecated)

// Mono is reserved for genuinely technical metadata: the stack lines.
const StackLine = ({ project }: { project: Project }) => (
  <span className="text-on-surface-variant font-mono text-sm">
    {project.techStack.join(' / ')}
  </span>
)

// Renders "500k+" as a CountUp and leaves non-integer values (like "4.7/5") static.
const StatValue = ({ value }: { value: string }) => {
  const match = /^(\d+)(\D*)$/.exec(value)
  if (!match) return <>{value}</>
  return <CountUp to={parseInt(match[1], 10)} suffix={match[2]} />
}

// The lead entry runs vertically: title, description, stats, stack and the
// store action, then the image last.
const WorkLead = ({ project }: { project: Project }) => {
  const link = project.links[0]

  return (
    <article className="flex flex-col items-start gap-6 md:gap-8">
      <h3 className="variation-sans text-on-surface text-[clamp(3.25rem,12vw,9rem)] leading-[0.95] font-medium tracking-[-0.03em]">
        {project.title}
      </h3>

      <p className="text-on-surface-variant max-w-[44rem] text-lg leading-relaxed md:text-xl">
        {SENTENCES[project.title] ?? project.description}
      </p>

      {project.spotlightStats && (
        <div className="flex flex-wrap gap-x-14 gap-y-4">
          {project.spotlightStats.map((stat) => (
            <div key={stat.label} className="flex flex-col gap-1.5">
              <Label>{STAT_LABELS[stat.label] ?? stat.label}</Label>
              <span className="variation-sans text-on-surface text-3xl leading-none font-medium tracking-tight tabular-nums md:text-4xl">
                <StatValue value={stat.label === 'rating' ? `${stat.value}/5` : stat.value} />
              </span>
            </div>
          ))}
        </div>
      )}

      <div className="flex flex-wrap items-center gap-x-8 gap-y-2">
        <StackLine project={project} />
        {link && <ActionLink href={link.url}>{link.label}</ActionLink>}
      </div>

      <div className="border-outline-variant relative aspect-16/10 w-full overflow-hidden rounded-xl border md:aspect-2/1">
        <Image
          src={project.image}
          alt={`Screens from ${project.title}`}
          fill
          sizes="(max-width: 72rem) 100vw, 72rem"
          className="object-cover"
        />
      </div>
    </article>
  )
}

const ProjectRow = ({ project }: { project: Project }) => {
  const link = project.links[0]

  return (
    <article className="flex flex-col items-start gap-6">
      <h3 className="variation-sans text-on-surface text-[clamp(2.75rem,9vw,6.5rem)] leading-[0.95] font-medium tracking-[-0.03em]">
        {project.title}
      </h3>

      <p className="text-on-surface-variant max-w-[44rem] text-lg leading-relaxed md:text-xl">
        {SENTENCES[project.title] ?? project.description}
      </p>

      <div className="flex w-full flex-wrap items-center justify-between gap-x-8 gap-y-3">
        <StackLine project={project} />
        {link && <ActionLink href={link.url}>{link.label}</ActionLink>}
      </div>
    </article>
  )
}

export const Work = () => (
  <section id="work" className="scroll-mt-20 py-28 md:py-40">
    <Container className="flex flex-col gap-12 md:gap-16">
      <div className="flex flex-col gap-4">
        <SectionTitle>Work</SectionTitle>
        <Reveal>
          <p className="text-on-surface-variant max-w-[36rem] text-lg md:text-xl">
            Ten years of shipping. Everything here is mine, built end to end.
          </p>
        </Reveal>
      </div>

      <div className="flex flex-col gap-24 md:gap-36">
        {lead && (
          <Reveal>
            <WorkLead project={lead} />
          </Reveal>
        )}
        {rest.map((project) => (
          <Reveal key={project.title}>
            <ProjectRow project={project} />
          </Reveal>
        ))}
      </div>

      <Reveal>
        <ActionLink href="https://github.com/evowizz">Everything else lives on GitHub</ActionLink>
      </Reveal>
    </Container>
  </section>
)
