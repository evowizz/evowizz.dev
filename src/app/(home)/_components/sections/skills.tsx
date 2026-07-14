import { cn } from '@/lib/utils'
import { skills } from '@/lib/skills'
import { Container, focusRing, Label } from '@/components/elements'
import { SectionTitle } from '@/components/section-title'
import { Reveal } from '@/components/reveal'

const SKILL_GROUPS = [
  { label: 'Languages', kinds: ['language'] },
  { label: 'Frameworks', kinds: ['framework'] },
  { label: 'Tools and more', kinds: ['tool', 'other'] },
].map((group) => ({
  label: group.label,
  items: skills.filter((skill) => group.kinds.includes(skill.kind)),
}))

export const Skills = () => (
  <section id="skills" className="scroll-mt-20 py-28 md:py-40">
    <Container className="flex flex-col gap-12 md:gap-16">
      <div className="flex flex-col gap-4">
        <SectionTitle>Skills</SectionTitle>
        <Reveal>
          <p className="text-on-surface-variant max-w-[36rem] text-lg md:text-xl">
            The languages, frameworks, and tools I reach for every day.
          </p>
        </Reveal>
      </div>

      <Reveal stagger className="grid grid-cols-1 gap-12 sm:grid-cols-2 md:grid-cols-3 md:gap-8">
        {SKILL_GROUPS.map((group) => (
          <div key={group.label} className="flex flex-col gap-5">
            <Label>{group.label}</Label>
            <ul className="flex flex-col gap-2.5">
              {group.items.map((skill) => (
                <li key={skill.name}>
                  <a
                    href={skill.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                      'variation-sans text-on-surface hover:text-primary motion-effects-fast w-fit text-xl font-medium tracking-tight transition-colors md:text-2xl',
                      focusRing,
                    )}
                  >
                    {skill.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </Reveal>
    </Container>
  </section>
)
