import { mediaLogos, type MediaLogos } from '@/components/svg'
import { Container } from '@/components/ui/container'

type Outlet = { name: string; url: string; logo: MediaLogos }

/** A curated selection, so nothing on the page states a count. */
const OUTLETS: Outlet[] = [
  { name: '9to5Google', url: 'https://9to5google.com', logo: '9to5google' },
  { name: 'The Verge', url: 'https://www.theverge.com', logo: 'theverge' },
  { name: 'BBC', url: 'https://www.bbc.com', logo: 'bbc' },
  { name: 'TechCrunch', url: 'https://techcrunch.com', logo: 'techcrunch' },
  { name: 'Engadget', url: 'https://www.engadget.com', logo: 'engadget' },
  { name: 'Android Police', url: 'https://www.androidpolice.com', logo: 'android_police' },
  { name: "Tom's Guide", url: 'https://www.tomsguide.com', logo: 'toms_guide' },
  { name: 'Android Central', url: 'https://www.androidcentral.com', logo: 'android_central' },
  { name: 'TechRadar', url: 'https://www.techradar.com', logo: 'techradar' },
  { name: 'XDA', url: 'https://www.xda-developers.com', logo: 'xda' },
  { name: 'Android Headlines', url: 'https://www.androidheadlines.com', logo: 'android_headlines' },
  { name: 'Android Authority', url: 'https://www.androidauthority.com', logo: 'android_authority' },
  { name: 'SamMobile', url: 'https://www.sammobile.com', logo: 'sammobile' },
  { name: 'SlashGear', url: 'https://www.slashgear.com', logo: 'slashgear' },
  { name: 'Futurism', url: 'https://futurism.com', logo: 'futurism' },
  { name: 'MobileSyrup', url: 'https://mobilesyrup.com', logo: 'mobilesyrup' },
  { name: 'BGR', url: 'https://www.bgr.com', logo: 'bgr' },
]

const TOP = OUTLETS.slice(0, 8)
const BOTTOM = OUTLETS.slice(8)

/** Caps marks at 8rem because their aspect ratios range from 2.4:1 to 9.4:1. */
const Mark = ({ outlet }: { outlet: Outlet }) => {
  const Logo = mediaLogos[outlet.logo]
  return (
    <a
      href={outlet.url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={outlet.name}
      title={outlet.name}
      className="text-on-surface hover:text-primary motion-effects-default focus-ring flex shrink-0 items-center justify-center transition-colors"
    >
      <Logo aria-hidden className="h-7 w-auto max-w-32" />
    </a>
  )
}

const Row = ({ outlets }: { outlets: Outlet[] }) => (
  <div className="flex shrink-0 items-center gap-12 pr-12 md:gap-16 md:pr-16">
    {outlets.map((outlet) => (
      <Mark key={outlet.name} outlet={outlet} />
    ))}
  </div>
)

/** Three copies move together, so `-100%` loops without a seam. */
const Track = ({ outlets, reverse }: { outlets: Outlet[]; reverse?: boolean }) => (
  <div className="mask-fade-sides-20% flex overflow-hidden">
    {[0, 1, 2].map((copy) => (
      <div key={copy} className={reverse ? 'animate-press-ribbon-reverse flex' : 'animate-press-ribbon flex'}>
        <Row outlets={outlets} />
      </div>
    ))}
  </div>
)

export const PressRibbon = () => {
  return (
    <>
      <Container className="hidden motion-reduce:block">
        <div className="flex flex-wrap items-center gap-x-12 gap-y-8 md:gap-x-16">
          {OUTLETS.map((outlet) => (
            <Mark key={outlet.name} outlet={outlet} />
          ))}
        </div>
      </Container>
      <div className="flex flex-col gap-8 motion-reduce:hidden md:gap-10">
        <Track outlets={TOP} />
        <Track outlets={BOTTOM} reverse />
      </div>
    </>
  )
}
