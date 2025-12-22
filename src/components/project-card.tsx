import { Project } from '@/lib/projects'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { ArrowRight } from './svg/arrow-right'

type ProjectCardProps = {
  project: Project
  className?: string
  index?: number
  total?: number
}

export const ProjectCard = ({ project, className, index = 0, total = 0 }: ProjectCardProps) => {
  const hasLinks = project.links.github || project.links.demo || project.links.playStore
  const primaryLink = project.links.demo || project.links.github || project.links.playStore

  // Calculate if this is in the last row or last column
  const isLastColumn = (index + 1) % 3 === 0
  const isLastRow = index >= total - (total % 3 || 3)

  return (
    <article
      className={cn(
        'group relative h-full flex flex-col p-8 md:p-10',
        'border-outline-variant',
        'transition-all duration-300 ease-out',
        'hover:bg-on-surface/5',
        'overflow-hidden',
        'min-h-80',
        {
          'lg:border-r': !isLastColumn,
          'border-b': !isLastRow,
        },
        className,
      )}
    >
      {/* Corner marks on hover */}
      {/* This is the top left corner */}
      <span className="absolute top-0 left-0 h-3 w-0.5 origin-top bg-primary scale-0 group-hover:scale-100 transition-all duration-300"/>
      <span className="absolute top-0 left-0 h-0.5 w-3 origin-left bg-primary scale-0 group-hover:scale-100 transition-all duration-300" />

      {/* This is the top right corner */}
      <span className="absolute top-0 right-0 h-3 w-0.5 origin-top bg-primary scale-0 group-hover:scale-100 transition-all duration-300"/>
      <span className="absolute top-0 right-0 h-0.5 w-3 origin-right bg-primary scale-0 group-hover:scale-100 transition-all duration-300" />

      {/* This is the bottom left corner */}
      <span className="absolute bottom-0 left-0 h-3 w-0.5 origin-bottom bg-primary scale-0 group-hover:scale-100 transition-all duration-300"/>
      <span className="absolute bottom-0 left-0 h-0.5 w-3 origin-left bg-primary scale-0 group-hover:scale-100 transition-all duration-300" />

      {/* This is the bottom right corner */}
      <span className="absolute bottom-0 right-0 h-3 w-0.5 origin-bottom bg-primary scale-0 group-hover:scale-100 transition-all duration-300"/>
      <span className="absolute bottom-0 right-0 h-0.5 w-3 origin-right bg-primary scale-0 group-hover:scale-100 transition-all duration-300" />
    

      {/* Top metadata row */}
      <div className="flex items-start justify-between mb-8">
        {/* Status Badges */}
        <div className="flex gap-2 flex-wrap">
          {project.openSource && (
            <span className="px-3 py-1.5 text-xs font-600 bg-primary/10 text-primary border border-primary/20">
              Open Source
            </span>
          )}
          {project.deprecated && (
            <span className="px-3 py-1.5 text-xs font-600 bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 border border-yellow-500/20">
              Deprecated
            </span>
          )}
        </div>

        {/* Arrow Link */}
        {hasLinks && primaryLink && (
          <Link
            href={primaryLink}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 -m-2 rounded-md hover:bg-primary/10 transition-all duration-300 group/link"
            aria-label="View project"
          >
            <ArrowRight className="w-6 h-6 text-on-surface group-hover/link:text-primary -rotate-45 transition-all duration-300 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
          </Link>
        )}
      </div>
      {/* Content */}
      <div className="flex-1 flex flex-col gap-4">
        <h3 className="text-2xl md:text-3xl font-800 group-hover:text-primary transition-colors duration-300">
          {project.title}
        </h3>

        <p className="text-base text-on-surface leading-relaxed line-clamp-3">
          {project.description}
        </p>

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-2 mt-auto pt-4">
          {project.techStack.slice(0, 4).map((tech, techIndex) => (
            <span
              key={techIndex}
              className="text-xs px-3 py-1.5 border border-outline-variant text-on-surface font-500 hover:border-primary hover:text-primary transition-colors duration-300"
            >
              {tech}
            </span>
          ))}
          {project.techStack.length > 4 && (
            <span className="text-xs px-3 py-1.5 text-on-surface font-500">
              +{project.techStack.length - 4} more
            </span>
          )}
        </div>
      </div>
    </article>
  )
}
