'use server'

import { db } from '@/db'
import { views } from '@/db/schema'
import { eq } from 'drizzle-orm'
import { unstable_noStore as noStore } from 'next/cache'

export const getViewsBySlug = async (slug: string) => {
  noStore()
  return db.query.views.findMany({ where: eq(views.slug, slug), limit: 1 })
}

export const getViewsCount = async () => {
  noStore()
  return db.select({ slug: views.slug, count: views.count }).from(views)
}
