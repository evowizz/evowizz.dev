import { pgTable, varchar, integer, jsonb, timestamp } from 'drizzle-orm/pg-core'
import type { Tweet } from 'react-tweet/api'

export const views = pgTable('views', {
  slug: varchar('slug', { length: 255 }).notNull().primaryKey(),
  count: integer('count').notNull(),
})

export const tweets = pgTable('tweets', {
  id: varchar('id', { length: 32 }).notNull().primaryKey(),
  data: jsonb('data').$type<Tweet>().notNull(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
})
