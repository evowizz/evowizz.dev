import { Hero, About, Work, Press, Skills, Contact } from './_components/sections'

export default function Home() {
  return (
    <main className="relative isolate">
      <div className="sticky top-16 z-0 motion-reduce:static">
        <Hero />
      </div>
      <div className="relative z-10">
        <About />
        <Work />
        <Press />
        <Skills />
        <Contact />
      </div>
    </main>
  )
}
