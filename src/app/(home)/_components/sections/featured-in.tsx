'use client'

import { mediaLogos } from '@/components/svg'
import { StyleableProps } from '@/types/component'
import { motion } from 'framer-motion'
import React from 'react'
import { cn } from '@/lib/utils'

export const FeaturedIn = ({className}: StyleableProps) => {
  return (
    <section className={cn("relative flex w-full flex-col", className)}>
      <h2 className="text-on-surface-variant text-sm font-medium tracking-widest px-8 md:px-12">
        Featured in
      </h2>
      <div className="flex overflow-hidden mask-fade-sides-20% mt-8">
        <TranslateWrapper>
          <LogoItemsTop />
        </TranslateWrapper>
        <TranslateWrapper>
          <LogoItemsTop />
        </TranslateWrapper>
        <TranslateWrapper>
          <LogoItemsTop />
        </TranslateWrapper>
      </div>
      <div className="flex overflow-hidden mask-fade-sides-20% mt-4">
        <TranslateWrapper reverse>
          <LogoItemsBottom />
        </TranslateWrapper>
        <TranslateWrapper reverse>
          <LogoItemsBottom />
        </TranslateWrapper>
        <TranslateWrapper reverse>
          <LogoItemsBottom />
        </TranslateWrapper>
      </div>
    </section>
  )
}

const TranslateWrapper = ({
  children,
  reverse,
}: {
  children: React.ReactNode
  reverse?: boolean
}) => {
  return (
    <motion.div
      initial={{ translateX: reverse ? '-100%' : '0%' }}
      animate={{ translateX: reverse ? '0%' : '-100%' }}
      transition={{ duration: 50, repeat: Infinity, ease: 'linear' }}
      className="flex gap-12 px-6"
    >
      {children}
    </motion.div>
  )
}

const LogoItem = ({ Icon, name, url }: { Icon: React.ElementType; name: string; url: string }) => {
  return (
    <a
      href={url}
      rel="noopener noreferrer"
      target="_blank"
      className="text-on-surface-variant hover:text-primary flex h-12 w-32 shrink-0 items-center justify-center transition-all"
      aria-label={`Featured in ${name}`}
    >
      <Icon className="h-full w-full fill-current object-contain" />
    </a>
  )
}

const LogoItemsTop = () => (
  <>
    <LogoItem Icon={mediaLogos['9to5google']} name="9to5Google" url="https://9to5google.com" />
    <LogoItem Icon={mediaLogos.theverge} name="The Verge" url="https://www.theverge.com" />
    <LogoItem Icon={mediaLogos.bbc} name="BBC" url="https://www.bbc.com" />
    <LogoItem
      Icon={mediaLogos.android_police}
      name="Android Police"
      url="https://www.androidpolice.com"
    />
    <LogoItem Icon={mediaLogos.techcrunch} name="TechCrunch" url="https://techcrunch.com" />
    <LogoItem Icon={mediaLogos.toms_guide} name="Tom's Guide" url="https://www.tomsguide.com" />
    <LogoItem
      Icon={mediaLogos.android_central}
      name="Android Central"
      url="https://www.androidcentral.com"
    />
    <LogoItem Icon={mediaLogos.techradar} name="TechRadar" url="https://www.techradar.com" />
  </>
)

const LogoItemsBottom = () => (
  <>
    <LogoItem Icon={mediaLogos.xda} name="XDA Developers" url="https://www.xda-developers.com" />
    <LogoItem
      Icon={mediaLogos.android_headlines}
      name="Android Headlines"
      url="https://www.androidheadlines.com"
    />
    <LogoItem Icon={mediaLogos.engadget} name="Engadget" url="https://www.engadget.com" />
    <LogoItem
      Icon={mediaLogos.android_authority}
      name="Android Authority"
      url="https://www.androidauthority.com"
    />
    <LogoItem Icon={mediaLogos.sammobile} name="SamMobile" url="https://www.sammobile.com" />
    <LogoItem Icon={mediaLogos.slashgear} name="SlashGear" url="https://www.slashgear.com" />
    <LogoItem Icon={mediaLogos.futurism} name="Futurism" url="https://futurism.com" />
    <LogoItem Icon={mediaLogos.mobilesyrup} name="MobileSyrup" url="https://mobilesyrup.com" />
    <LogoItem Icon={mediaLogos.bgr} name="BGR" url="https://www.bgr.com" />
  </>
)
