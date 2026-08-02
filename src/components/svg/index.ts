import NineToFiveGoogle from './logos/media/9to5google'
import AndroidAuthority from './logos/media/android_authority'
import AndroidCentral from './logos/media/android_central'
import AndroidHeadlines from './logos/media/android_headlines'
import AndroidPolice from './logos/media/android_police'
import { AndroidStudio } from './logos/skills/androidstudio'
import Bbc from './logos/media/bbc'
import Bgr from './logos/media/bgr'
import { Compose } from './logos/skills/compose'
import { Dart } from './logos/skills/dart'
import Engadget from './logos/media/engadget'
import { Figma } from './logos/skills/figma'
import { Flutter } from './logos/skills/flutter'
import Futurism from './logos/media/futurism'
import { IntellijIdea } from './logos/skills/intellijidea'
import { Java } from './logos/skills/java'
import { JavaScript } from './logos/skills/javascript'
import { Kotlin } from './logos/skills/kotlin'
import { MaterialDesign } from './logos/skills/materialdesign'
import MobileSyrup from './logos/media/mobilesyrup'
import { NextJS } from './logos/skills/nextjs'
import { Python } from './logos/skills/python'
import { React } from './logos/skills/react'
import SamMobile from './logos/media/sammobile'
import SlashGear from './logos/media/slashgear'
import { TailwindCSS } from './logos/skills/tailwindcss'
import TechCrunch from './logos/media/techcrunch'
import TechRadar from './logos/media/techradar'
import TheVerge from './logos/media/theverge'
import TomsGuide from './logos/media/toms_guide'
import { TypeScript } from './logos/skills/typescript'
import { VLang } from './logos/skills/vlang'
import { VSCode } from './logos/skills/vscode'
import XDADevelopers from './logos/media/xda'

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

// Media logos
export const mediaLogos = {
  '9to5google': NineToFiveGoogle,
  android_authority: AndroidAuthority,
  android_central: AndroidCentral,
  android_headlines: AndroidHeadlines,
  android_police: AndroidPolice,
  bbc: Bbc,
  bgr: Bgr,
  engadget: Engadget,
  futurism: Futurism,
  mobilesyrup: MobileSyrup,
  sammobile: SamMobile,
  slashgear: SlashGear,
  techcrunch: TechCrunch,
  techradar: TechRadar,
  theverge: TheVerge,
  toms_guide: TomsGuide,
  xda: XDADevelopers,
} as const

export type SkillLogos = keyof typeof skillLogos
export type MediaLogos = keyof typeof mediaLogos
