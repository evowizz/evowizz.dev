'use client'

import { motion, useScroll, useSpring } from 'framer-motion'
import { useRef } from 'react'

export default function EnhancedArticle(props: React.HTMLAttributes<HTMLElement>) {
  const articleRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: articleRef,
  })

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 150,
    damping: 30,
    restDelta: 0.0001,
  })

  return (
    <>
      <motion.div
        className="bg-tertiary fixed top-0 right-0 left-0 z-5000 h-1 origin-left"
        style={{ scaleX }}
      />
      <article ref={articleRef} {...props} />
    </>
  )
}
