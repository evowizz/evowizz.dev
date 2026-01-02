import { Hero, About, Skills, Projects } from '@/components/sections'
import { BoxBlock } from '@/components/lego/box-block'

export default function Home() {
  return (
    <main>
      <section className="relative min-h-svh flex flex-col justify-center overflow-hidden">
        <BoxBlock className="py-24 md:py-32 z-10">
          <Hero />
        </BoxBlock>
      </section>

      <section id="about" className="relative py-24 md:py-32 bg-surface-container-highest">
        <BoxBlock>
          <About />
        </BoxBlock>
      </section>

      <section id="skills" className="relative py-24 md:py-32">
        <Skills />
      </section>

      <section id="projects" className="relative py-24 md:py-32 bg-surface-container-low">
        <Projects />
      </section>
    </main>
  )
}
