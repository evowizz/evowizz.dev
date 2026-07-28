export type FocusLink = {
  slug: string
  label: string
}

export type ProjectLink = {
  url: string
  label: string
}

// Link helper functions
const githubLink = (repo: string): ProjectLink => ({
  url: `https://github.com/${repo}`,
  label: 'See on GitHub',
})

const playStoreLink = (packageName: string): ProjectLink => ({
  url: `https://play.google.com/store/apps/details?id=${packageName}`,
  label: 'Google Play',
})

export type SpotlightStat = {
  value: string
  label: string
}

export type Project = {
  title: string
  description: string
  image: string // Path to project image
  techStack: string[]
  openSource: boolean
  featured?: boolean
  spotlight?: boolean // Rendered as the oversized lead block in Selected Work
  spotlightStats?: SpotlightStat[]
  deprecated?: boolean
  focus?: FocusLink[]
  links: ProjectLink[]
}

export const projects: Project[] = [
  {
    title: 'Inware',
    description:
      "An Android app I've been building since 2018 to answer one question: what is actually inside your phone? It digs into the hardware and software (CPU, display, sensors, camera, battery) and themes itself to your wallpaper with Material You.",
    image: '/api/placeholder/1200/750',
    techStack: ['Kotlin', 'Jetpack Compose', 'Android'],
    openSource: false,
    featured: true,
    spotlight: true,
    spotlightStats: [
      { value: '500k+', label: 'downloads' },
      { value: '4.7', label: 'rating' },
    ],
    focus: [{ slug: 'inware', label: 'Read More' }],
    links: [playStoreLink('com.evo.inware')],
  },
  {
    title: 'Personal Website',
    description: "You're looking at it! Built with Next.js and Tailwind CSS.",
    image: '/api/placeholder/1200/750',
    techStack: ['Next.js', 'TypeScript', 'Tailwind CSS'],
    openSource: true,
    featured: false,
    links: [githubLink('evowizz/evowizz.dev')],
  },
  {
    title: 'Cosmose',
    description: 'A simple Jetpack Compose demo gallery showcasing various UI components and animations.',
    image: '/api/placeholder/1200/750',
    techStack: ['Kotlin', 'Jetpack Compose', 'Android'],
    openSource: true,
    links: [githubLink('evowizz/cosmose')],
  },
  {
    title: 'Common',
    description:
      'A Kotlin library providing common utilities and extensions for Android development, including helpers for views, networking, and data processing.',
    image: '/api/placeholder/1200/750',
    techStack: ['Kotlin', 'Android'],
    openSource: true,
    links: [githubLink('evowizz/common')],
  },
  {
    title: 'De-Gmojify',
    description:
      'A Chrome extension that replaces Google emojis with standard system emojis for a more consistent browsing experience.',
    image: '/api/placeholder/1200/750',
    techStack: ['JavaScript', 'Chrome Extension'],
    openSource: true,
    links: [githubLink('evowizz/De-Gmojify')],
  },
  {
    title: 'Actio',
    description:
      'A small Figma plugin for resizing frames and rectangles based on aspect ratios with the purpose of eliminating manual dimension calculations.',
    image: '/api/placeholder/1200/750',
    techStack: ['TypeScript', 'Figma Plugin API'],
    openSource: false,
    links: [],
  },
  {
    title: 'Compose to Edge',
    description:
      'Edge-to-edge display implementation for Android apps using Jetpack Compose, providing a modern full-screen experience.',
    image: '/api/placeholder/1200/750',
    techStack: ['Kotlin', 'Jetpack Compose', 'Android'],
    openSource: true,
    deprecated: true,
    links: [githubLink('evowizz/compose-to-edge')],
  },
]
