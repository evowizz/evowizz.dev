import { Project } from '@/lib/projects'
import Link from 'next/link'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import { ArrowRight } from '@/components/svg/arrow-right'
import { StyleableProps } from '@/types/component'

type ProjectProps = StyleableProps<{
  project: Project
  index?: number // Optional for CompactProject, required used for FeaturedProject
}>

// Default placeholder for projects without images
const DEFAULT_PLACEHOLDER = '/api/placeholder/1200/750'

export const FeaturedProject = ({ project, index = 0, className }: ProjectProps) => {
  const isReversed = index % 2 === 1
  const hasLinks = project.links.github || project.links.demo || project.links.playStore
  const primaryLink = project.links.demo || project.links.github || project.links.playStore

  const imageContent = (
    <div
      className={cn(
        'relative aspect-16/10 w-full overflow-hidden rounded-3xl',
        'bg-surface-container border-outline-variant border',
        'motion-effects-default transition-all',
        hasLinks && 'group-hover:border-primary',
      )}
    >
      <Image
        src={project.image || DEFAULT_PLACEHOLDER}
        alt={project.title}
        fill
        className="object-cover"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 50vw"
      />

      {/* Badges */}
      <div className="absolute top-4 left-4 flex gap-2">
        {project.openSource && (
          <span className="bg-surface-container/90 text-primary border-primary/20 rounded-full border px-3 py-1 text-xs font-semibold tracking-wide shadow-sm backdrop-blur-md">
            Open Source
          </span>
        )}
      </div>
    </div>
  )

  return (
    <article
      className={cn(
        'flex flex-col items-center gap-8 lg:gap-16',
        isReversed ? 'lg:flex-row-reverse' : 'lg:flex-row',
        className,
      )}
    >
      {/* Visual / Image Side */}
      <div className="w-full flex-1">
        {primaryLink ? (
          <Link
            href={primaryLink}
            target="_blank"
            rel="noopener noreferrer"
            className="group block"
          >
            {imageContent}
          </Link>
        ) : (
          <div className="block">{imageContent}</div>
        )}
      </div>

      {/* Content Side */}
      <div className="flex w-full flex-1 flex-col items-start gap-4">
        {/* Title & Link */}
        <div className="flex flex-col gap-2">
          <h3 className="text-3xl font-bold tracking-tight">{project.title}</h3>
          {/* Tech Stack - Top */}
          <div className="flex flex-wrap gap-2">
            {project.techStack.map((tech, techIndex) => (
              <span
                key={techIndex}
                className="text-primary text-xs font-medium tracking-wider uppercase"
              >
                {tech}
                {techIndex < project.techStack.length - 1 && (
                  <span className="text-outline-variant mx-1">•</span>
                )}
              </span>
            ))}
          </div>
        </div>

        <p className="text-on-surface/70 text-lg leading-relaxed">{project.description}</p>

        {hasLinks && primaryLink && (
          <div className="pt-4">
            <Link
              href={primaryLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-on-surface hover:text-primary group/link motion-effects-default inline-flex items-center gap-2 text-sm font-semibold transition-colors"
            >
              View Project
              <ArrowRight className="motion-spatial-default h-4 w-4 transition-transform group-hover/link:translate-x-1" />
            </Link>
          </div>
        )}
      </div>
    </article>
  )
}

export const CompactProject = ({ project, className }: ProjectProps) => {
  const hasLinks = project.links.github || project.links.demo || project.links.playStore
  const primaryLink = project.links.demo || project.links.github || project.links.playStore

  const imageContent = (
    <div
      className={cn(
        'relative aspect-16/10 w-full overflow-hidden rounded-3xl',
        'bg-surface-container border-outline-variant border',
        'motion-effects-default transition-all',
        hasLinks && 'group-hover:border-primary',
      )}
    >
      <Image
        src={project.image || DEFAULT_PLACEHOLDER}
        alt={project.title}
        fill
        className="object-cover"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />

      {/* Badges */}
      <div className="absolute top-4 left-4 flex gap-2">
        {project.openSource && (
          <span className="bg-surface-container/90 text-primary border-primary/20 rounded-full border px-3 py-1 text-xs font-semibold tracking-wide shadow-sm backdrop-blur-md">
            Open Source
          </span>
        )}
      </div>
    </div>
  )

  return (
    <article className={cn('flex h-full flex-col items-center gap-6', className)}>
      {/* Visual / Image Side */}
      <div className="w-full flex-1">
        {primaryLink ? (
          <Link
            href={primaryLink}
            target="_blank"
            rel="noopener noreferrer"
            className="group block"
          >
            {imageContent}
          </Link>
        ) : (
          <div className="block">{imageContent}</div>
        )}
      </div>

      {/* Content Side */}
      <div className="flex w-full flex-1 flex-col items-start gap-4">
        {/* Title & Link */}
        <div className="flex flex-col gap-2">
          <h3 className="text-2xl font-bold tracking-tight">{project.title}</h3>
          {/* Tech Stack - Top */}
          <div className="flex flex-wrap gap-2">
            {project.techStack.map((tech, techIndex) => (
              <span
                key={techIndex}
                className="text-primary text-xs font-medium tracking-wider uppercase"
              >
                {tech}
                {techIndex < project.techStack.length - 1 && (
                  <span className="text-outline-variant mx-1">•</span>
                )}
              </span>
            ))}
          </div>
        </div>

        <p className="text-on-surface/70 text-base leading-relaxed">{project.description}</p>

        {hasLinks && primaryLink && (
          <div className="mt-auto pt-4">
            <Link
              href={primaryLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-on-surface hover:text-primary group/link motion-effects-default inline-flex items-center gap-2 text-sm font-semibold transition-colors"
            >
              View Project
              <ArrowRight className="motion-spatial-default h-4 w-4 transition-transform group-hover/link:translate-x-1" />
            </Link>
          </div>
        )}
      </div>
    </article>
  )
}
