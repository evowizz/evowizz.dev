import { ProjectGrid } from '@/components/project-grid'
import { CompactProject } from '@/components/project-card'
import { projects } from '@/lib/projects'
import { Carousel, CarouselItem, CarouselContent, CarouselButtons } from '@/components/carousel'
import { BoxBlock } from '@/components/lego/box-block'

export const Projects = () => {
  return (
    <div className="flex flex-col gap-24 md:gap-32">
      <BoxBlock className="flex flex-col gap-12">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="flex flex-col gap-3">
            <span className="text-primary text-xs font-medium tracking-[0.2em] uppercase">
              Portfolio
            </span>
            <h2 className="text-3xl font-semibold tracking-tight md:text-4xl lg:text-5xl">
              Selected Work
            </h2>
          </div>
        </div>

        <ProjectGrid projects={projects.filter((p) => p.featured)} />
      </BoxBlock>

      <Carousel>
        <div className="flex flex-col gap-6">
          <BoxBlock>
            <h3 className="text-2xl font-semibold tracking-tight md:text-3xl">Other Projects</h3>
          </BoxBlock>

          <CarouselContent>
            {projects
              .filter((p) => !p.featured && !p.deprecated)
              .map((project) => (
                <CarouselItem key={project.title}>
                  <CompactProject project={project} />
                </CarouselItem>
              ))}
          </CarouselContent>

          <BoxBlock>
            <CarouselButtons className="w-full justify-between" />
          </BoxBlock>
        </div>
      </Carousel>
    </div>
  )
}
