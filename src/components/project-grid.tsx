import { Project } from '@/lib/projects'
import { ProjectCard } from './project-card'

type ProjectGridProps = {
  projects: Project[]
}

export const ProjectGrid = ({ projects }: ProjectGridProps) => {
  return (
    <div className="relative">
      {/* Grid container */}
      <div className="grid grid-cols-1 lg:grid-cols-3 border border-outline-variant">
        {projects.map((project, index) => (
          <ProjectCard
            key={project.title}
            project={project}
            index={index}
            total={projects.length}
          />
        ))}
      </div>

      {/* Fading plus decorations at corners */}
      {/* Top Left */}
      <div className="absolute top-0 left-0 pointer-events-none">
        <div className="absolute top-0 -left-4 w-4 h-[1px] bg-gradient-to-r from-transparent to-on-surface" />
        <div className="absolute -top-4 left-0 w-[1px] h-4 bg-gradient-to-b from-transparent to-on-surface" />
      </div>

      {/* Top Right */}
      <div className="absolute top-0 right-0 pointer-events-none">
        <div className="absolute top-0 -right-4 w-4 h-[1px] bg-gradient-to-l from-transparent to-on-surface" />
        <div className="absolute -top-4 right-0 w-[1px] h-4 bg-gradient-to-b from-transparent to-on-surface" />
      </div>

      {/* Bottom Left */}
      <div className="absolute bottom-0 left-0 pointer-events-none">
        <div className="absolute bottom-0 -left-4 w-4 h-[1px] bg-gradient-to-r from-transparent to-on-surface" />
        <div className="absolute -bottom-4 left-0 w-[1px] h-4 bg-gradient-to-t from-transparent to-on-surface" />
      </div>

      {/* Bottom Right */}
      <div className="absolute bottom-0 right-0 pointer-events-none">
        <div className="absolute bottom-0 -right-4 w-4 h-[1px] bg-gradient-to-l from-transparent to-on-surface" />
        <div className="absolute -bottom-4 right-0 w-[1px] h-4 bg-gradient-to-t from-transparent to-on-surface" />
      </div>
    </div>
  )
}
