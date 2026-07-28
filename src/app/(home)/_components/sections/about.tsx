import Link from 'next/link'
import { Container } from '@/components/elements'
import { SectionTitle } from '@/components/section-title'
import { CountUp, Reveal } from '@/components/reveal'

const textLink = 'text-primary underline-offset-4 hover:underline focus-ring'

export const About = () => (
  <section id="about" className="scroll-mt-20 py-28 md:py-40">
    <Container className="flex flex-col gap-12 md:gap-16">
      <SectionTitle>About</SectionTitle>

      <Reveal className="flex max-w-[44rem] flex-col gap-6 text-lg leading-relaxed md:text-xl">
        <p className="text-on-surface">
          Hi, I&apos;m{' '}
          <span className="variation-sans variation-roundness-100 variation-grade-150 text-primary font-medium">
            Dy
          </span>
          ,
        </p>
        <p className="text-on-surface">
          I&apos;m a self-taught developer and designer in Nantes, France, building for Android
          since 2016. In 2018 I released Inware, an app that shows you exactly what your device is
          made of. It was the first app on the Play Store to support Material You dynamic color,
          before the feature was even documented, and has since passed 500,000 downloads while
          holding a 4.7 rating.
        </p>
        <p className="text-on-surface-variant">
          Since 2016, I&apos;ve been spotting Android features before they&apos;re announced:{' '}
          <a
            href="https://9to5google.com/2019/06/29/google-android-fast-share/"
            target="_blank"
            rel="noopener noreferrer"
            className={textLink}
          >
            Fast Share
          </a>
          , which you now know as Quick Share, and the rename of{' '}
          <a
            href="https://9to5google.com/2024/02/01/google-bard-rename-gemini/"
            target="_blank"
            rel="noopener noreferrer"
            className={textLink}
          >
            Bard to Gemini
          </a>
          , days before it was official. That&apos;s how I ended up contributing to 9to5Google,
          where I also wrote a few pieces of my own.
        </p>
        <p className="text-on-surface-variant">
          In 2024 I joined Beeper, where I was both a designer and a developer on their Android app.
          Among other things, I rewrote the app&apos;s navigation and rebuilt its color system
          around Material 3.
        </p>
        <p className="text-on-surface-variant">
          I sometimes dig into other people&apos;s software too. Back in 2022, I reported a flaw in{' '}
          <Link href="/blog/huawei-appgallery-vulnerability" className={textLink}>
            Huawei&apos;s AppGallery
          </Link>{' '}
          that let anyone download paid apps for free. A year later I looked into Nothing Chats,
          which was built on a service called Sunbird, and what I found{' '}
          <a
            href="https://techcrunch.com/2023/11/22/sunbird-pauses-its-efforts-to-bring-imessage-to-android-amid-security-worries/"
            target="_blank"
            rel="noopener noreferrer"
            className={textLink}
          >
            got the app shut down
          </a>
          .
        </p>
      </Reveal>

      <Reveal className="flex flex-col gap-3">
        <CountUp
          to={630000}
          group
          className="variation-sans text-on-surface text-[clamp(3.5rem,11vw,8.5rem)] leading-[0.85] font-bold tracking-tight tabular-nums"
        />
        <p className="text-on-surface text-xl leading-snug font-semibold md:text-2xl">
          private files exposed by the breach I uncovered.
        </p>
      </Reveal>
    </Container>
  </section>
)
