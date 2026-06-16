import Image from 'next/image'

export type FocusMeta = {
  title: string
  overview: string
  stack: string[]
  role?: string
  image?: string
}

type FocusHeaderProps = {
  meta: FocusMeta
}

export function FocusHeader({ meta }: FocusHeaderProps) {
  return (
    <header className="not-prose border-outline-variant mb-16 border-b pb-8">
      <div className="mb-8 flex flex-col gap-4">
        <h1 className="variation-sans variation-roundness-25 text-5xl font-bold md:text-7xl">
          {meta.title}
        </h1>
        <p className="text-on-surface-variant text-xl leading-relaxed md:text-2xl">
          {meta.overview}
        </p>
      </div>

      {meta.image && (
        <div className="bg-surface-container -mx-4 mb-8 md:-mx-8 lg:-mx-16">
          <div className="relative aspect-2/1 w-full overflow-hidden md:aspect-21/9">
            <Image src={meta.image} alt={meta.title} fill className="object-cover" priority />
          </div>
        </div>
      )}

      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        {meta.role && (
          <p className="text-on-surface-variant text-sm font-medium tracking-wider uppercase">
            {meta.role}
          </p>
        )}

        <div className="flex flex-wrap gap-2">
          {meta.stack.map((tech) => (
            <span
              key={tech}
              className="bg-primary-container text-on-primary-container rounded-full px-3 py-1 text-xs font-medium"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </header>
  )
}
