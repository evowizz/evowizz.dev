import { BoxBlock } from '@/components/lego/box-block'
import { SkillsGrid } from '@/components/skill'
import { skills } from '@/lib/skills'

export const Skills = () => {
  return (
    <div className="flex flex-col gap-12">
      <BoxBlock>
        <div className="flex flex-col gap-3">
          <span className="text-xs font-medium tracking-[0.2em] uppercase text-primary">
            Expertise
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight">
            Tools & Technologies
          </h2>
        </div>
      </BoxBlock>

      <div className="relative w-full">
        <BoxBlock>
          <SkillsGrid skills={skills} />
        </BoxBlock>
      </div>
    </div>
  )
}
