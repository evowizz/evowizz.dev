import Link from 'next/link'

export const About = () => {
  return (
    <div className="mx-auto max-w-3xl">
      <div className="mb-12">
        <span className="text-primary mb-3 block text-xs font-medium tracking-[0.2em] uppercase">
          About
        </span>
        <h2 className="text-4xl leading-tight font-semibold tracking-tight md:text-5xl">
          Hi, I&apos;m <span className="text-primary font-serif italic">Dy</span>.
        </h2>
      </div>

      <div className="text-on-surface/80 space-y-6 text-lg leading-relaxed md:text-xl">
        <p>
          I&apos;m a <strong>Software Engineer</strong> based in France. I wrote my first line of
          code in 2014 and released <strong>Inware</strong>, my first major Android app, in 2018.
          Since then, I&apos;ve been obsessed with creating innovative apps and designing intuitive
          components.
        </p>
        <p>
          In late 2023, I uncovered <strong>Nothing&apos;s biggest vulnerability to date</strong>,
          revealing that <strong>Nothing Chats</strong> (powered by Sunbird) was completely exposed,
          making over <strong>630,000 private media files</strong> and user data publicly
          accessible.
        </p>
        <p>
          In 2024, I joined{' '}
          <Link
            href="https://texts.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary font-semibold decoration-2 underline-offset-2 transition-all hover:underline"
          >
            Texts
          </Link>{' '}
          to work on their desktop app. I later moved to{' '}
          <Link
            href="https://beeper.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary font-semibold decoration-2 underline-offset-2 transition-all hover:underline"
          >
            Beeper
          </Link>{' '}
          to work on Android, eventually taking on a dual role as a{' '}
          <strong>Developer & Designer</strong>.
        </p>
        <p>
          As a contributor to{' '}
          <Link
            href="https://9to5google.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary font-semibold decoration-2 underline-offset-2 transition-all hover:underline"
          >
            9to5Google
          </Link>
          , I&apos;ve uncovered hundreds of hidden features in Android betas. I love crafting
          software that is both beautiful and functional, with a focus on{' '}
          <strong>Material Design</strong>.
        </p>
      </div>
      <div className="border-outline-variant/30 mt-10 flex gap-16 border-t pt-10">
        <div>
          <span className="text-primary block text-4xl font-bold tracking-tight">7+</span>
          <span className="text-on-surface/50 text-sm font-medium tracking-wider uppercase">
            Years
          </span>
        </div>
        <div>
          <span className="text-primary block text-4xl font-bold tracking-tight">20+</span>
          <span className="text-on-surface/50 text-sm font-medium tracking-wider uppercase">
            Projects
          </span>
        </div>
        <div>
          <span className="text-primary block text-4xl font-bold tracking-tight">400k+</span>
          <span className="text-on-surface/50 text-sm font-medium tracking-wider uppercase">
            Downloads
          </span>
        </div>
      </div>
    </div>
  )
}
