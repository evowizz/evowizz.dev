import { About, Contact, Hero, Press, Skills, Work } from './_components/sections'

export default function Home() {
  return (
    <main id="main-content" tabIndex={-1} className="isolate overflow-clip">
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
