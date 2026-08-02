import { Container, Label, TextLink } from '@/components/elements'
import { SectionTitle } from '@/components/section-title'
import { CountUp, Reveal } from '@/components/reveal'
import { ScrollDrift } from '@/components/scroll-drift'

const FACTS = [
  { term: 'Based', detail: 'Nantes, France' },
  { term: 'Speaks', detail: 'French, English' },
  { term: 'Building', detail: 'Since 2016' },
  { term: 'Previously', detail: 'Beeper' },
  { term: 'Bylines', detail: '9to5Google' },
]

export const About = () => (
  <section
    id="about"
    className="bg-surface text-on-surface border-outline-variant scroll-mt-20 border-y py-20 md:py-28"
  >
    <Container className="flex flex-col gap-10 md:gap-12">
      <SectionTitle>About</SectionTitle>

      <Reveal stagger className="grid gap-4 md:gap-5 lg:grid-cols-3">
        <article className="text-on-surface flex max-w-2xl flex-col gap-6 text-lg leading-relaxed md:text-xl lg:col-span-2">
          <p className="text-on-surface text-xl font-medium md:text-2xl">
            Hi, I&apos;m{' '}
            <span className="variation-sans variation-roundness-100 variation-grade-150 text-primary font-medium">
              Dy
            </span>
            ,
          </p>
          <p className="text-on-surface">
            Self-taught developer and designer, based in Nantes, France, and building for Android since 2016. In 2018 I
            released Inware, an app that shows you exactly what your device is made of. It was the first app on the Play
            Store to support Material You dynamic color, before the feature was even documented, and has since passed
            500,000 downloads while holding a 4.7 rating.
          </p>
          <p className="text-on-surface-variant">
            Since 2016, I&apos;ve been spotting Android features before they&apos;re announced:{' '}
            <TextLink href="https://9to5google.com/2019/06/29/google-android-fast-share/">Fast Share</TextLink>, which
            you now know as Quick Share, and the rename of{' '}
            <TextLink href="https://9to5google.com/2024/02/01/google-bard-rename-gemini/">Bard to Gemini</TextLink>,
            days before it was official. That&apos;s how I ended up contributing to 9to5Google, where I also wrote a few
            pieces of my own.
          </p>
          <p className="text-on-surface-variant">
            In 2024 I joined Beeper, where I was both a designer and a developer on their Android app. Among other
            things, I rewrote the app&apos;s navigation and rebuilt its color system around Material 3.
          </p>
          <p className="text-on-surface-variant">
            I sometimes dig into other people&apos;s software too. Back in 2022, I reported a flaw in{' '}
            <TextLink href="/blog/huawei-appgallery-vulnerability">Huawei&apos;s AppGallery</TextLink> that let anyone
            download paid apps for free. A year later I looked into Nothing Chats, which was built on a service called
            Sunbird, and what I found{' '}
            <TextLink href="https://techcrunch.com/2023/11/22/sunbird-pauses-its-efforts-to-bring-imessage-to-android-amid-security-worries/">
              got the app shut down
            </TextLink>
            .
          </p>
        </article>

        {/* Side by side as soon as there is room, stacked and content-sized at lg. */}
        <ScrollDrift className="flex flex-col gap-4 md:flex-row md:gap-5 lg:flex-col lg:gap-5 lg:self-start">
          <div className="bg-tertiary-container text-on-tertiary-container flex flex-1 flex-col justify-center gap-3 rounded-2xl p-6 md:p-7 lg:flex-none">
            <CountUp
              to={630000}
              group
              className="variation-sans text-[clamp(2.25rem,5vw,3.75rem)] leading-none font-bold tracking-tight tabular-nums"
            />
            <p className="text-base leading-snug font-medium md:text-lg">
              private files exposed by the Sunbird breach I uncovered.
            </p>
          </div>

          {/* Rows split the height only at md, where the two cards stretch to match. */}
          <dl className="border-outline-variant divide-outline-variant flex flex-1 flex-col divide-y overflow-hidden rounded-2xl border lg:flex-none">
            {FACTS.map((fact) => (
              <div key={fact.term} className="flex flex-1 items-center justify-between gap-4 px-5 py-3.5">
                <dt>
                  <Label>{fact.term}</Label>
                </dt>
                <dd className="text-on-surface text-sm font-semibold">{fact.detail}</dd>
              </div>
            ))}
          </dl>
        </ScrollDrift>
      </Reveal>
    </Container>
  </section>
)
