import { SkillsGrid } from '@/app/(home)/_components/skill'
import { skills } from '@/lib/skills'

export const Skills = () => {
  return (
    <div className="flex flex-col gap-12">
      <div className="flex flex-col gap-3">
        <span className="text-primary text-xs font-medium tracking-[0.2em] uppercase">
          Expertise
        </span>
        <h2 className="text-3xl font-semibold tracking-tight">Tools & Technologies</h2>
      </div>

      <div className="relative w-full">
        <SkillsGrid skills={skills} />
      </div>
    </div>
  )
}
