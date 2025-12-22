import { Skill } from '@/lib/skills'
import Link from 'next/link'
import { allLogos } from './svg'
import { cn } from '@/lib/utils'

type SkillsGridProps = {
  skills: Skill[]
  className?: string
}

export const SkillsGrid = ({ skills }: SkillsGridProps) => {
  const skillsByKind = skills.reduce((acc, skill) => {
    if (!acc[skill.kind]) {
      acc[skill.kind] = []
    }
    acc[skill.kind].push(skill)
    return acc
  }, {} as Record<string, Skill[]>)

  return (
    <>
      {Object.keys(skillsByKind).map((kind) => (
        <div key={kind} className="flex flex-wrap gap-4">
          {skillsByKind[kind].map((skill, index) => (
            <SkillChip key={index} skill={skill} />
          ))}
        </div>
      ))}
    </>
  )
}

type SkillChipProps = {
  skill: Skill
  className?: string
}

const SkillChip = ({ skill, className }: SkillChipProps) => {
  const SkillLogo = allLogos[skill.logo]
  return (
    <Link href={skill.url} rel="noopener noreferrer" target="_blank" className="group">
      <div
        className={cn(
          'flex items-center border-2 select-none rounded-md py-1 px-2',
          'border-outline-variant bg-surface-container',
          'transition-all duration-300 ease-slow-in shadow-2xs group-hover:shadow-[4px_4px_0px]',
          'group-hover:shadow-on-surface',
          'group-hover:-translate-x-1 group-hover:-translate-y-1',
          'group-active:translate-x-0 group-active:translate-y-0 group-active:shadow-none',
          className,
        )}
      >
        <SkillLogo className="w-4 h-4 mr-2" />
        <span className="pr-1">{skill.name}</span>
      </div>
    </Link>
  )
}
