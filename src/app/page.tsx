import { HeroText } from '@/components/hero'
import { BoxBlock } from '@/components/lego/box-block'
import { StarShape } from '@/components/svg/star-shape'

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
    </main>
  )
}
