'use server'

import { db } from '@/db'
import { views } from '@/db/schema'
import { sql } from 'drizzle-orm'
import { unstable_noStore as noStore } from 'next/cache'

export async function increment(slug: string) {
  noStore()
  await db
    .insert(views)
    .values({ slug, count: 0 })
    .onConflictDoUpdate({
      target: views.slug,
      set: { count: sql`views.count + 1` },
    })
    .execute()
}
