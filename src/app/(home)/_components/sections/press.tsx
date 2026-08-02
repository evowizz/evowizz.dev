import { Container, TextLink } from '@/components/elements'
import { SectionTitle } from '@/components/section-title'
import { Reveal } from '@/components/reveal'
import { PressRibbon } from '../press-ribbon'

export const Press = () => (
  <section
    id="press"
    className="bg-surface-container-lowest text-on-surface border-outline-variant scroll-mt-20 border-y py-20 md:py-28"
  >
    <Container className="flex flex-col gap-10 md:gap-12">
      <div className="flex flex-col gap-4">
        <SectionTitle>Press</SectionTitle>
        <Reveal>
          <p className="text-on-surface-variant max-w-xl text-lg leading-relaxed md:text-xl">
            Some of the outlets my apps, my security research, and the occasional Android scoop have run in since 2017.
          </p>
        </Reveal>
      </div>
    </Container>

    {/* Larger than the gap between the two rows, so the pair reads as one block. */}
    <div className="mt-16 md:mt-20">
      <PressRibbon />
    </div>

    <Container className="mt-10 md:mt-12">
      <p className="text-on-surface-variant variation-sans -variation-slant-10 text-right text-xs">
        Section inspired by{' '}
        <TextLink href="https://thatjoshguy.me" className="underline-offset-2">
          ThatJoshGuy
        </TextLink>
      </p>
    </Container>
  </section>
)
