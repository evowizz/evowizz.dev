import { Fragment } from 'react'
import { cn } from '@/lib/utils'
import { Container, focusRing } from '@/components/elements'
import { SectionTitle } from '@/components/section-title'
import { Reveal } from '@/components/reveal'

const OUTLETS = [
  { name: '9to5Google', url: 'https://9to5google.com' },
  { name: 'The Verge', url: 'https://www.theverge.com' },
  { name: 'BBC', url: 'https://www.bbc.com' },
  { name: 'TechCrunch', url: 'https://techcrunch.com' },
  { name: 'Engadget', url: 'https://www.engadget.com' },
  { name: 'Android Police', url: 'https://www.androidpolice.com' },
  { name: "Tom's Guide", url: 'https://www.tomsguide.com' },
  { name: 'Android Central', url: 'https://www.androidcentral.com' },
  { name: 'TechRadar', url: 'https://www.techradar.com' },
  { name: 'XDA', url: 'https://www.xda-developers.com' },
  { name: 'Android Headlines', url: 'https://www.androidheadlines.com' },
  { name: 'Android Authority', url: 'https://www.androidauthority.com' },
  { name: 'SamMobile', url: 'https://www.sammobile.com' },
  { name: 'SlashGear', url: 'https://www.slashgear.com' },
  { name: 'Futurism', url: 'https://futurism.com' },
  { name: 'MobileSyrup', url: 'https://mobilesyrup.com' },
  { name: 'BGR', url: 'https://www.bgr.com' },
]

export const Press = () => (
  <section id="press" className="scroll-mt-20 py-28 md:py-40">
    <Container className="flex flex-col gap-10 md:gap-12">
      <SectionTitle>Press</SectionTitle>

      <Reveal>
        <p className="text-on-surface-variant max-w-[40rem] text-lg leading-relaxed md:text-xl">
          My apps, my security research, and the occasional Android scoop have been covered
          by:
        </p>
      </Reveal>

      <Reveal>
        <p className="max-w-[64rem] text-2xl leading-[1.55] font-medium tracking-tight md:text-3xl">
          {OUTLETS.map((outlet, index) => (
            <Fragment key={outlet.name}>
              {index > 0 && (
                <span aria-hidden className="text-outline-variant">
                  {', '}
                </span>
              )}
              <a
                href={outlet.url}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  'variation-sans motion-spatial-fast text-on-surface hover:variation-width-104 hover:text-primary whitespace-nowrap transition-[font-variation-settings,color]',
                  focusRing,
                )}
              >
                {outlet.name}
              </a>
            </Fragment>
          ))}
          <span aria-hidden className="text-outline-variant">
            .
          </span>
        </p>
      </Reveal>
    </Container>
  </section>
)
