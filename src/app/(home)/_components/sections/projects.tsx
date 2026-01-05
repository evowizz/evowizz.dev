import { ProjectGrid } from '@/app/(home)/_components/project-grid'
import { CompactProject } from '@/app/(home)/_components/project-card'
import { projects } from '@/lib/projects'
import { Carousel, CarouselItem, CarouselContent, CarouselButtons } from '@/components/carousel'

export const Projects = () => {
  return (
    <div className="flex flex-col gap-24 md:gap-32">
      <div className="flex flex-col gap-12 px-8 md:px-12">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="flex flex-col gap-3">
            <span className="text-primary text-xs font-medium tracking-[0.2em] uppercase">
              Portfolio
            </span>
            <h2 className="text-3xl font-semibold tracking-tight">
              Selected Work
            </h2>
          </div>
        </div>

        <ProjectGrid projects={projects.filter((p) => p.featured)} />
      </div>

      <Carousel>
        <div className="flex flex-col gap-6">
          <div className='px-8 md:px-12'>
            <h3 className="text-2xl font-semibold tracking-tight">Other Projects</h3>
          </div>

          <CarouselContent>
            {projects
              .filter((p) => !p.featured && !p.deprecated)
              .map((project) => (
                <CarouselItem key={project.title}>
                  <CompactProject project={project} />
                </CarouselItem>
              ))}
          </CarouselContent>

          <div className='px-8 md:px-12'>
            <CarouselButtons className="w-full justify-between" />
          </div>
        </div>
      </Carousel>
    </div>
  )
}
