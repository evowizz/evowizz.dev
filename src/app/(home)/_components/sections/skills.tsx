import { BoxBlock } from '@/components/lego/box-block'
import { SkillsGrid } from '@/app/(home)/_components/skill'
import { skills } from '@/lib/skills'

export const Skills = () => {
  return (
    <div className="flex flex-col gap-12">
      <BoxBlock>
        <div className="flex flex-col gap-3">
          <span className="text-primary text-xs font-medium tracking-[0.2em] uppercase">
            Expertise
          </span>
          <h2 className="text-3xl font-semibold tracking-tight md:text-4xl lg:text-5xl">
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
