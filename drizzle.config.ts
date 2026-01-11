import { defineConfig } from 'drizzle-kit'
import 'dotenv/config'

if (!process.env.DRIZZLE_DATABASE_URL) {
  throw new Error('DRIZZLE_DATABASE_URL env is missing')
}

export default defineConfig({
  schema: './src/db/schema.ts',
  out: './src/db/migrations',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DRIZZLE_DATABASE_URL,
  },
})
