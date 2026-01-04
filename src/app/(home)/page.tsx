import { Hero, About, Skills, Projects } from './_components/sections'
import { BoxBlock } from '@/components/lego/box-block'

export default function Home() {
  return (
    <main className="flex flex-col gap-8">
      <section className="bg-surface-container border border-outline-variant relative mx-4 mt-4 flex min-h-svh flex-col justify-center overflow-hidden rounded-4xl px-6 md:mx-6 md:px-12">
        <BoxBlock className="py-24 md:py-32">
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
