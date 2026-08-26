import { db } from '@/db'
import { tweets } from '@/db/schema'
import { eq } from 'drizzle-orm'
import type { Tweet } from 'react-tweet/api'

export const saveTweet = async (id: string, data: Tweet) => {
  await db
    .insert(tweets)
    .values({ id, data, updatedAt: new Date() })
    .onConflictDoUpdate({ target: tweets.id, set: { data, updatedAt: new Date() } })
}

export const deleteTweet = async (id: string) => {
  await db.delete(tweets).where(eq(tweets.id, id))
}
