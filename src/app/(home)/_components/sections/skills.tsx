import { skills } from '@/app/(home)/_data/skills'
import { skillLogos } from '@/components/svg'
import { Container } from '@/components/ui/container'
import { RowLink } from '@/components/ui/links'
import { Label } from '@/components/ui/typography'
import { SectionTitle } from '../section-title'
import { Reveal } from '@/components/ui/reveal'

const SKILL_GROUPS = [
  { label: 'Languages', kinds: ['language'] },
  { label: 'Frameworks', kinds: ['framework'] },
  { label: 'Tools and more', kinds: ['tool', 'other'] },
].map((group) => ({
  label: group.label,
  items: skills.filter((skill) => group.kinds.includes(skill.kind)),
}))

export const Skills = () => (
  <section id="skills" className="bg-surface text-on-surface scroll-mt-20 py-20 md:py-28">
    <Container className="flex flex-col gap-10 md:gap-12">
      <div className="flex flex-col gap-4">
        <SectionTitle>Skills</SectionTitle>
        <Reveal>
          <p className="text-on-surface-variant max-w-xl text-lg md:text-xl">
            The languages, frameworks, and tools I reach for every day.
          </p>
        </Reveal>
      </div>

      <Reveal stagger className="grid gap-4 md:grid-cols-3 md:gap-5">
        {SKILL_GROUPS.map((group) => (
          <div
            key={group.label}
            className="border-outline-variant divide-outline-variant divide-y self-start overflow-hidden rounded-2xl border"
          >
            <div className="flex items-baseline justify-between gap-3 px-5 py-4">
              <Label>{group.label}</Label>
              <span className="text-on-surface-variant text-sm font-medium tabular-nums">{group.items.length}</span>
            </div>

            <ul className="divide-outline-variant divide-y">
              {group.items.map((skill) => {
                const Logo = skillLogos[skill.logo]
                return (
                  <li key={skill.name}>
                    <RowLink href={skill.url} className="flex items-center gap-3.5 px-5 py-3.5">
                      <span className="bg-secondary-container text-on-secondary-container flex size-9 shrink-0 items-center justify-center rounded-lg text-lg">
                        <Logo aria-hidden />
                      </span>
                      <span className="variation-sans text-on-surface text-base font-semibold tracking-tight md:text-lg">
                        {skill.name}
                      </span>
                    </RowLink>
                  </li>
                )
              })}
            </ul>
          </div>
        ))}
      </Reveal>
    </Container>
  </section>
)
