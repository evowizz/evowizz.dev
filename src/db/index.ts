import * as schema from './schema'
import { drizzle } from 'drizzle-orm/neon-http'
import { neon } from '@neondatabase/serverless'

const sql = neon(process.env.DRIZZLE_DATABASE_URL!)
export const db = drizzle(sql, {
  schema: { ...schema },
})
