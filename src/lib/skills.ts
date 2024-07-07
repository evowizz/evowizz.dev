import { Logos } from "@/components/svg"

export type Skill = {
  name: string
  logo: Logos
  url: string
  kind: 'language' | 'framework' | 'tool' | 'other'
}

export const skills: Skill[] = [
  {
    name: 'Kotlin',
    logo: 'kotlin',
    url: 'https://kotlinlang.org/',
    kind: 'language',
  },
  {
    name: 'Java',
    logo: 'java',
    url: 'https://www.java.com/',
    kind: 'language',
  },
  {
    name: 'Dart',
    logo: 'dart',
    url: 'https://dart.dev/',
    kind: 'language',
  },
  {
    name: 'TypeScript',
    logo: 'typescript',
    url: 'https://www.typescriptlang.org/',
    kind: 'language',
  },
  {
    name: 'JavaScript',
    logo: 'javascript',
    url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript',
    kind: 'language',
  },
  {
    name: 'Python',
    logo: 'python',
    url: 'https://www.python.org/',
    kind: 'language',
  },
  {
    name: 'V lang',
    logo: 'vlang',
    url: 'https://vlang.io/',
    kind: 'language',
  },
  {
    name: 'Jetpack Compose',
    logo: 'compose',
    url: 'https://developer.android.com/jetpack/compose',
    kind: 'framework',
  },
  {
    name: 'Flutter',
    logo: 'flutter',
    url: 'https://flutter.dev/',
    kind: 'framework',
  },
  {
    name: 'React',
    logo: 'react',
    url: 'https://react.dev/',
    kind: 'framework',
  },
  {
    name: 'Next.js',
    logo: 'nextjs',
    url: 'https://nextjs.org/',
    kind: 'framework',
  },
  {
    name: 'Tailwind CSS',
    logo: 'tailwindcss',
    url: 'https://tailwindcss.com/',
    kind: 'framework',
  },
  {
    name: 'Figma',
    logo: 'figma',
    url: 'https://www.figma.com/',
    kind: 'tool',
  },
  {
    name: 'Android Studio',
    logo: 'androidstudio',
    url: 'https://developer.android.com/studio',
    kind: 'tool',
  },
  {
    name: 'Visual Studio Code',
    logo: 'vscode',
    url: 'https://code.visualstudio.com/',
    kind: 'tool',
  },
  {
    name: 'IntelliJ IDEA',
    logo: 'intellijidea',
    url: 'https://www.jetbrains.com/idea/',
    kind: 'tool',
  },
  {
    name: 'Material Design',
    logo: 'materialdesign',
    url: 'https://material.io/',
    kind: 'other',
  },
]