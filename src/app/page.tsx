import { HeroText } from '@/components/hero'
import { BoxBlock } from '@/components/lego/box-block'
import { StarShape } from '@/components/svg'
import avatar from './avatar.png'
import Image from 'next/image'
import Link from 'next/link'
import { SkillsGrid } from '@/components/skill'
import { skills } from '@/lib/skills'

export default function Home() {
  return (
    <main>
      <section className="relative h-dvh flex flex-col justify-end overflow-hidden">
        <BoxBlock className="flex flex-col md:flex-row md:items-end justify-between md:pb-24 z-10 motion-reduce:animate-hero-opacity">
          <div className="flex flex-col justify-center items-start shrink-0 pb-16 md:pb-0">
            <div className="flex flex-row items-center justify-center gap-4 pb-9 motion-safe:animate-hero-opacity">
              <StarShape className="w-24 h-24 motion-safe:animate-spin-slow" variant="dodeca" />
              <StarShape
                className="w-24 h-24 motion-safe:animate-spin-slow motion-safe:[animation-direction:reverse]"
                variant="quad"
              />
            </div>
            <HeroText />
          </div>
        </BoxBlock>
      </section>
      <section id="about">
        <BoxBlock className="flex flex-col justify-center items-center">
          <div className="flex flex-col md:flex-row py-24 gap-4 max-w-screen-xl w-full">
            <div className="flex flex-row gap-4 flex-1 shrink-0">
              <div>
                <Image
                  src={avatar}
                  alt="Wordmark &ldquo;evo&rdquo;"
                  width={80}
                  height={80}
                  className="rounded-full aspect-square select-none"
                />
              </div>
              <StarShape variant="quad" className="w-20 h-20" />
            </div>
            <div className="flex-1 shrink-0">
              <h1 className="text-4xl font-800 mb-3">About</h1>
              <p className="text-lg">
                Non elit deserunt aliqua deserunt ipsum ullamco dolore duis cupidatat cillum.
                Laboris laborum in cillum mollit deserunt. Tempor amet consequat culpa enim dolore
                nisi. Aliquip eu consectetur eiusmod veniam. Esse proident sunt tempor ea irure
                aliquip ea ipsum tempor minim ea deserunt cupidatat elit.
              </p>
            </div>
          </div>
        </BoxBlock>
        <BoxBlock className="flex flex-col justify-center items-center">
          <div className="flex flex-col py-24 gap-4 max-w-screen-xl w-full">
            <div className="flex flex-col gap-4">
              <StarShape variant="asterisk" className="w-20 h-20" />
              <h1 className="text-4xl font-800 mb-3">Skills</h1>
            </div>
            <SkillsGrid skills={skills} />
          </div>
        </BoxBlock>
      </section>
    </main>
  )
}
