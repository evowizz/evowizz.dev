'use server'

import { db } from '@/db'
import { views } from '@/db/schema'
import { eq } from 'drizzle-orm'
import { cacheLife } from 'next/cache'

export const getViewsBySlug = async (slug: string) => {
  'use cache'
  cacheLife('seconds')
  return db.query.views.findFirst({
    where: eq(views.slug, slug),
    columns: { count: true },
  })
}

export const getViewsCount = async () => {
  'use cache'
  cacheLife('seconds')
  return db.select({ slug: views.slug, count: views.count }).from(views)
}
