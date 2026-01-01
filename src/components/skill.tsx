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
    if (!acc[skill.kind]) acc[skill.kind] = []
    acc[skill.kind].push(skill)
    return acc
  }, {} as Record<string, Skill[]>)

  return (
    <div className='flex flex-col gap-4'>
      {Object.keys(skillsByKind).map((kind) => (
        <div key={kind} className="flex flex-wrap gap-4">
          {skillsByKind[kind].map((skill, index) => (
            <SkillChip key={index} skill={skill} />
          ))}
        </div>
      ))}
    </div>
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
          'flex items-center border select-none rounded-2xl py-1.5 px-3',
          'border-outline-variant bg-surface-container',
          'transition-all duration-300 ease-slow-in',
          'group-hover:bg-tertiary-container group-hover:border-tertiary-fixed-dim',
          'group-hover:text-on-tertiary-container group-hover:rounded-lg',
          className,
        )}
      >
        <SkillLogo className="w-4 h-4 mr-2" />
        <span className="pr-1">{skill.name}</span>
      </div>
    </Link>
  )
}
