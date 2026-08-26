import { db } from '@/db'
import { tweets } from '@/db/schema'
import { eq } from 'drizzle-orm'

export const readTweet = async (id: string) => {
  const row = await db.query.tweets.findFirst({ where: eq(tweets.id, id) })
  return row?.data
}
