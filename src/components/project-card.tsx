import { Project } from '@/lib/projects'
import Link from 'next/link'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import { ArrowRight } from './svg/arrow-right'
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
        'bg-surface-container border border-outline-variant',
        'transition-all duration-500',
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
          <span className="px-3 py-1 text-xs font-semibold tracking-wide rounded-full bg-surface-container/90 backdrop-blur-md text-primary border border-primary/20 shadow-sm">
            Open Source
          </span>
        )}
      </div>
    </div>
  )

  return (
    <article
      className={cn(
        'flex flex-col gap-8 items-center lg:gap-16',
        isReversed ? 'lg:flex-row-reverse' : 'lg:flex-row',
        className,
      )}
    >
      {/* Visual / Image Side */}
      <div className="flex-1 w-full">
        {primaryLink ? (
          <Link
            href={primaryLink}
            target="_blank"
            rel="noopener noreferrer"
            className="block group"
          >
            {imageContent}
          </Link>
        ) : (
          <div className="block">{imageContent}</div>
        )}
      </div>

      {/* Content Side */}
      <div className="flex-1 w-full flex flex-col items-start gap-4">
        {/* Title & Link */}
        <div className="flex flex-col gap-2">
          <h3 className="font-bold tracking-tight text-3xl">{project.title}</h3>
          {/* Tech Stack - Top */}
          <div className="flex flex-wrap gap-2">
            {project.techStack.map((tech, techIndex) => (
              <span
                key={techIndex}
                className="text-xs font-medium text-primary uppercase tracking-wider"
              >
                {tech}
                {techIndex < project.techStack.length - 1 && (
                  <span className="text-outline-variant mx-1">•</span>
                )}
              </span>
            ))}
          </div>
        </div>

        <p className="text-on-surface/70 leading-relaxed text-lg">{project.description}</p>

        {hasLinks && primaryLink && (
          <div className="pt-4">
            <Link
              href={primaryLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-semibold text-on-surface hover:text-primary transition-colors duration-200 group/link"
            >
              View Project
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/link:translate-x-1" />
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
        'bg-surface-container border border-outline-variant',
        'transition-all duration-500',
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
          <span className="px-3 py-1 text-xs font-semibold tracking-wide rounded-full bg-surface-container/90 backdrop-blur-md text-primary border border-primary/20 shadow-sm">
            Open Source
          </span>
        )}
      </div>
    </div>
  )

  return (
    <article className={cn('flex flex-col gap-6 items-center h-full', className)}>
      {/* Visual / Image Side */}
      <div className="flex-1 w-full">
        {primaryLink ? (
          <Link
            href={primaryLink}
            target="_blank"
            rel="noopener noreferrer"
            className="block group"
          >
            {imageContent}
          </Link>
        ) : (
          <div className="block">{imageContent}</div>
        )}
      </div>

      {/* Content Side */}
      <div className="flex-1 w-full flex flex-col items-start gap-4">
        {/* Title & Link */}
        <div className="flex flex-col gap-2">
          <h3 className="font-bold tracking-tight text-2xl">{project.title}</h3>
          {/* Tech Stack - Top */}
          <div className="flex flex-wrap gap-2">
            {project.techStack.map((tech, techIndex) => (
              <span
                key={techIndex}
                className="text-xs font-medium text-primary uppercase tracking-wider"
              >
                {tech}
                {techIndex < project.techStack.length - 1 && (
                  <span className="text-outline-variant mx-1">•</span>
                )}
              </span>
            ))}
          </div>
        </div>

        <p className="text-on-surface/70 leading-relaxed text-base">{project.description}</p>

        {hasLinks && primaryLink && (
          <div className="pt-4 mt-auto">
            <Link
              href={primaryLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-semibold text-on-surface hover:text-primary transition-colors duration-200 group/link"
            >
              View Project
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/link:translate-x-1" />
            </Link>
          </div>
        )}
      </div>
    </article>
  )
}
