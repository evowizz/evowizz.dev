'use server'

import { db } from '@/db'
import { views } from '@/db/schema'
import { sql } from 'drizzle-orm'
import { cacheLife, cacheTag } from 'next/cache'

export async function increment(slug: string) {
  'use cache'
  cacheLife('minutes')
  cacheTag(`view-count-${slug}`)

  await db
    .insert(views)
    .values({ slug, count: 0 })
    .onConflictDoUpdate({
      target: views.slug,
      set: { count: sql`views.count + 1` },
    })
    .execute()
}
