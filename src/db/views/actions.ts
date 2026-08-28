'use server'

import { db } from '@/db'
import { views } from '@/db/schema'
import { allPosts } from '@/content'
import { sql } from 'drizzle-orm'
import { cacheLife, cacheTag } from 'next/cache'

const POST_SLUGS = new Set(allPosts.map((post) => post.slug))

export async function increment(slug: unknown) {
  'use cache'

  if (typeof slug !== 'string' || !POST_SLUGS.has(slug)) return

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
