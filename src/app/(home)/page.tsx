import { Hero, About, Skills, Projects } from './_components/sections'

export default function Home() {
  return (
    <main className="flex flex-col gap-8">
      <section className="bg-surface-container border-outline-variant relative mx-4 mt-4 flex min-h-svh flex-col justify-center overflow-hidden rounded-4xl border px-6 md:mx-8 md:px-12">
        <Hero />
      </section>

      <section id="about" className="bg-surface-container-highest relative px-8 py-24">
        <About />
      </section>

      <section id="skills" className="relative px-8 py-24 md:px-12">
        <Skills />
      </section>

      <section id="projects" className="bg-surface-container-low relative py-24">
        <Projects />
      </section>
    </main>
  )
}
