'use client'

import { increment } from '@/db/views/actions'
import { useEffect, useRef } from 'react'

type ViewReporterProps = {
  slug: string
}

export const ViewReporter = ({ slug }: ViewReporterProps) => {
  const lastReportedSlug = useRef<string | null>(null)

  useEffect(() => {
    if (lastReportedSlug.current !== slug) {
      lastReportedSlug.current = slug
      void increment(slug).catch(() => {})
    }
  }, [slug])

  return null
}
