import { AndroidStudio } from './logos/skills/androidstudio'
import { Compose } from './logos/skills/compose'
import { Dart } from './logos/skills/dart'
import { Figma } from './logos/skills/figma'
import { Flutter } from './logos/skills/flutter'
import { IntellijIdea } from './logos/skills/intellijidea'
import { Java } from './logos/skills/java'
import { JavaScript } from './logos/skills/javascript'
import { Kotlin } from './logos/skills/kotlin'
import { MaterialDesign } from './logos/skills/materialdesign'
import { NextJS } from './logos/skills/nextjs'
import { Python } from './logos/skills/python'
import { React } from './logos/skills/react'
import { TailwindCSS } from './logos/skills/tailwindcss'
import { TypeScript } from './logos/skills/typescript'
import { VLang } from './logos/skills/vlang'
import { VSCode } from './logos/skills/vscode'

export const skillLogos = {
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

export type SkillLogos = keyof typeof skillLogos
