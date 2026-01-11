import { pgTable, varchar, integer } from 'drizzle-orm/pg-core'

export const views = pgTable('views', {
  slug: varchar('slug', { length: 255 }).notNull().primaryKey(),
  count: integer('count').notNull(),
})
