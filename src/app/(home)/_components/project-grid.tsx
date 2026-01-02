import { Project } from '@/lib/projects'
import { FeaturedProject } from './project-card'

type ProjectGridProps = {
  projects: Project[]
}

export const ProjectGrid = ({ projects }: ProjectGridProps) => {
  return (
    <div className="flex flex-col gap-24 md:gap-32">
      {projects.map((project, index) => (
        <FeaturedProject key={project.title} project={project} index={index} />
      ))}
    </div>
  )
}
