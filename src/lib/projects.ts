export type Project = {
  title: string
  description: string
  image: string // Path to project image
  techStack: string[]
  openSource: boolean
  deprecated?: boolean
  links: {
    github?: string
    demo?: string
    playStore?: string
  }
}

export const projects: Project[] = [
  {
    title: 'Inware',
    description: 'Get to know the hardware and software specifications of your device. A comprehensive Android application that provides detailed information about device hardware and software specifications, including Android version, display, CPU, RAM, camera, battery, and network details.',
    image: '/api/placeholder/400/300',
    techStack: ['Kotlin', 'Jetpack Compose', 'Android'],
    openSource: false,
    links: {
      playStore: 'https://play.google.com/store/apps/details?id=com.evo.inware'
    }
  },
  {
    title: 'Personal Website',
    description: 'Redesign of my personal portfolio website, built with Next.js and featuring modern web technologies.',
    image: '/api/placeholder/400/300',
    techStack: ['Next.js', 'TypeScript', 'Tailwind CSS'],
    openSource: true,
    links: {
      github: 'https://github.com/evowizz/evowizz.dev',
      demo: 'https://evowizz.dev'
    }
  },
  {
    title: 'Cosmose',
    description: 'A simple Jetpack Compose demo gallery showcasing various UI components and animations.',
    image: '/api/placeholder/400/300',
    techStack: ['Kotlin', 'Jetpack Compose', 'Android'],
    openSource: true,
    links: {
      github: 'https://github.com/evowizz/cosmose'
    }
  },
  {
    title: 'Common',
    description: 'A Kotlin library providing common utilities and extensions for Android development, including helpers for views, networking, and data processing.',
    image: '/api/placeholder/400/300',
    techStack: ['Kotlin', 'Android'],
    openSource: true,
    links: {
      github: 'https://github.com/evowizz/common'
    }
  },
  {
    title: 'De-Gmojify',
    description: 'A Chrome extension that replaces Google emojis with standard system emojis for a more consistent browsing experience.',
    image: '/api/placeholder/400/300',
    techStack: ['JavaScript', 'Chrome Extension'],
    openSource: true,
    links: {
      github: 'https://github.com/evowizz/De-Gmojify'
    }
  },
  {
    title: 'Actio',
    description: 'A small Figma plugin for resizing frames and rectangles based on aspect ratios with the purpose of eliminating manual dimension calculations.',
    image: '/api/placeholder/400/300',
    techStack: ['TypeScript', 'Figma Plugin API'],
    openSource: false,
    links: {}
  },
  {
    title: 'Compose to Edge',
    description: 'Edge-to-edge display implementation for Android apps using Jetpack Compose, providing a modern full-screen experience.',
    image: '/api/placeholder/400/300',
    techStack: ['Kotlin', 'Jetpack Compose', 'Android'],
    openSource: true,
    deprecated: true,
    links: {
      github: 'https://github.com/evowizz/compose-to-edge'
    }
  }
]