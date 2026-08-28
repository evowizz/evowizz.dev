type CaseStudyLink = {
  slug: string
  label: string
}

type ProjectLink = {
  url: string
  label: string
}

const githubLink = (repo: string): ProjectLink => ({
  url: `https://github.com/${repo}`,
  label: 'See on GitHub',
})

const playStoreLink = (packageName: string): ProjectLink => ({
  url: `https://play.google.com/store/apps/details?id=${packageName}`,
  label: 'Google Play',
})

type SpotlightStat = {
  value: string
  label: string
}

type ProjectImage = {
  path: string
  alt: string
}

export type Project = {
  title: string
  description: string
  image?: ProjectImage
  techStack: string[]
  spotlight?: boolean // Rendered as the oversized lead block in Selected Work
  spotlightStats?: SpotlightStat[]
  deprecated?: boolean
  caseStudies?: CaseStudyLink[]
  links: ProjectLink[]
}

export const projects: Project[] = [
  {
    title: 'Inware',
    description:
      'An Android app I have been building since 2018 to answer one question: what is actually inside your phone?',
    image: {
      path: '/content/projects/inware-promo.png',
      alt: 'Screens from the Inware app on Android',
    },
    techStack: ['Kotlin', 'Jetpack Compose', 'Android'],
    spotlight: true,
    spotlightStats: [
      { value: '500k+', label: 'Downloads' },
      { value: '4.7/5', label: 'Rating, about 2,000 reviews' },
    ],
    caseStudies: [{ slug: 'inware', label: 'Case Study' }],
    links: [playStoreLink('com.evo.inware')],
  },
  {
    title: 'Personal Website',
    description: "You're looking at it! Built with Next.js and Tailwind CSS.",
    techStack: ['Next.js', 'TypeScript', 'Tailwind CSS'],
    links: [githubLink('evowizz/evowizz.dev')],
  },
  {
    title: 'Cosmose',
    description: 'A small demo gallery of Jetpack Compose components and animations.',
    techStack: ['Kotlin', 'Jetpack Compose', 'Android'],
    links: [githubLink('evowizz/cosmose')],
  },
  {
    title: 'Common',
    description: 'A Kotlin library of the utilities and extensions I kept rewriting for Android.',
    techStack: ['Kotlin', 'Android'],
    links: [githubLink('evowizz/common')],
  },
  {
    title: 'De-Gmojify',
    description: 'A Chrome extension that removes the emoji reaction button in Gmail™.',
    techStack: ['JavaScript', 'Chrome Extension'],
    links: [githubLink('evowizz/De-Gmojify')],
  },
  {
    title: 'Actio',
    description: 'A Figma plugin that resizes frames to an aspect ratio, so nobody does the math by hand.',
    techStack: ['TypeScript', 'Figma Plugin API'],
    links: [],
  },
  {
    title: 'Compose to Edge',
    description:
      'Edge-to-edge display implementation for Android apps using Jetpack Compose, providing a modern full-screen experience.',
    techStack: ['Kotlin', 'Jetpack Compose', 'Android'],
    deprecated: true,
    links: [githubLink('evowizz/compose-to-edge')],
  },
]
