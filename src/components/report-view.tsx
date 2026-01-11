'use client'

import { increment } from '@/app/db/actions'
import { useEffect, useRef } from 'react'

type ReportViewProps = {
  slug: string
}

export const ReportView = ({ slug }: ReportViewProps) => {
  const lastReportedSlug = useRef<string | null>(null)

  useEffect(() => {
    if (lastReportedSlug.current !== slug) {
      lastReportedSlug.current = slug
      void increment(slug).catch(() => {})
    }
  }, [slug])

  return null
}
