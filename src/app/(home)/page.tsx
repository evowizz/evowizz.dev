import { Hero, About, Skills, Projects, FeaturedIn } from './_components/sections'

export default function Home() {
  return (
    <main className="flex flex-col">
      <section className="bg-surface-container border-outline-variant relative mx-4 mt-4 flex min-h-svh flex-col justify-center overflow-hidden rounded-4xl border px-6 md:mx-8 md:px-12">
        <Hero />
      </section>

      <section id="about" className="relative px-8 py-24">
        <About />
      </section>

      <section id="featured-in" className="relative pb-16">
        <FeaturedIn />
      </section>

      <section id="skills" className="bg-surface-container relative px-8 py-24 md:px-12">
        <Skills />
      </section>

      <section id="projects" className="bg-surface-container-high relative py-24">
        <Projects />
      </section>
    </main>
  )
}
