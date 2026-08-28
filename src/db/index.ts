import 'server-only'
import * as schema from './schema'
import { drizzle } from 'drizzle-orm/neon-http'
import { neon } from '@neondatabase/serverless'
import { serverEnv } from '@/config/env'

const sql = neon(serverEnv.DRIZZLE_DATABASE_URL)
export const db = drizzle(sql, {
  schema: { ...schema },
})
