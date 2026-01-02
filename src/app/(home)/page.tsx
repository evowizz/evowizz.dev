import { Hero, About, Skills, Projects } from './_components/sections'
import { BoxBlock } from '@/components/lego/box-block'

export default function Home() {
  return (
    <main>
      <section className="relative flex min-h-svh flex-col justify-center overflow-hidden">
        <BoxBlock className="z-10 py-24 md:py-32">
          <Hero />
        </BoxBlock>
      </section>

      <section id="about" className="bg-surface-container-highest relative py-24 md:py-32">
        <BoxBlock>
          <About />
        </BoxBlock>
      </section>

      <section id="skills" className="relative py-24 md:py-32">
        <Skills />
      </section>

      <section id="projects" className="bg-surface-container-low relative py-24 md:py-32">
        <Projects />
      </section>
    </main>
  )
}
