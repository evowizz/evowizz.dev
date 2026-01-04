import { ArrowRight } from './arrow-right'
import { Close } from './close'
import { AndroidStudio } from './logos/androidstudio'
import { Compose } from './logos/compose'
import { Dart } from './logos/dart'
import { Figma } from './logos/figma'
import { Flutter } from './logos/flutter'
import { IntellijIdea } from './logos/intellijidea'
import { Java } from './logos/java'
import { JavaScript } from './logos/javascript'
import { Kotlin } from './logos/kotlin'
import { MaterialDesign } from './logos/materialdesign'
import { NextJS } from './logos/nextjs'
import { Python } from './logos/python'
import { React } from './logos/react'
import { TailwindCSS } from './logos/tailwindcss'
import { TypeScript } from './logos/typescript'
import { VLang } from './logos/vlang'
import { VSCode } from './logos/vscode'
import { Menu } from './menu'
import { MiddleDot } from './middle-dot'

// Icons
export * from './arrow-right'
export * from './close'
export * from './menu'
export * from './middle-dot'
export * from './star-shape'

// Logos
export * from './logos/kotlin'

// All icons except StarShape (special case)
export const allIcons = {
  'arrow-right': ArrowRight,
  close: Close,
  menu: Menu,
  'middle-dot': MiddleDot,
} as const

export type Icons = keyof typeof allIcons

// All logos
export const allLogos = {
  androidstudio: AndroidStudio,
  compose: Compose,
  dart: Dart,
  figma: Figma,
  flutter: Flutter,
  intellijidea: IntellijIdea,
  java: Java,
  javascript: JavaScript,
  kotlin: Kotlin,
  materialdesign: MaterialDesign,
  nextjs: NextJS,
  python: Python,
  react: React,
  tailwindcss: TailwindCSS,
  typescript: TypeScript,
  vlang: VLang,
  vscode: VSCode,
} as const

export type Logos = keyof typeof allLogos
