import { allWriteups } from '@/content'
import Link from 'next/link'
import Image from 'next/image'

export const metadata = {
  title: 'Writeups',
  description: "In-depth looks at projects I've designed and built.",
}

export default function WriteupsPage() {
  const writeups = allWriteups.filter((writeup) => !writeup.hidden)

  return (
    <main className="flex min-h-screen flex-col">
      <section className="px-6 py-24 md:px-12 md:py-32">
        <div className="mx-auto flex w-full max-w-5xl flex-col gap-6">
          <span className="text-primary text-xs font-medium tracking-[0.2em] uppercase">
            Writeups
          </span>
          <h1 className="text-4xl font-semibold tracking-tight text-balance md:text-6xl">
            Writeups on projects I&apos;ve <br className="hidden md:block" />
            designed and built.
          </h1>
          <p className="text-on-surface-variant max-w-2xl text-lg leading-relaxed text-balance md:text-xl">
            Deep dives into the process, challenges, and solutions behind my work.
          </p>
        </div>
      </section>

      <section className="px-6 pb-24 md:px-12">
        <div className="mx-auto flex w-full max-w-5xl flex-col">
          {writeups.map((writeup) => (
            <Link
              key={writeup.slug}
              href={`/writeups/${writeup.slug}`}
              className="group hover:bg-surface-container-highest motion-effects-slow flex flex-col gap-4 rounded-4xl p-2 transition-colors md:flex-row md:items-center"
            >
              {writeup.image && (
                <div className="relative aspect-4/3 w-full shrink-0 overflow-hidden rounded-3xl md:w-48">
                  <Image
                    src={writeup.image}
                    alt={writeup.title}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              <div className="flex flex-col gap-2">
                <div className="flex flex-col gap-1 md:items-baseline md:justify-between">
                  {writeup.role && (
                    <span className="text-on-surface-variant text-sm opacity-75 transition-opacity group-hover:opacity-100">
                      {writeup.role}
                    </span>
                  )}
                  <h2 className="group-hover:text-primary text-xl font-medium transition-colors md:text-2xl">
                    {writeup.title}
                  </h2>
                </div>

                <p className="text-on-surface-variant line-clamp-2 text-base md:w-11/12">
                  {writeup.overview}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  )
}
