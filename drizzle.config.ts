import { defineConfig } from 'drizzle-kit'
import { loadEnvConfig } from '@next/env'
import { z } from 'zod'

loadEnvConfig(process.cwd())

const { DRIZZLE_DATABASE_URL } = z
  .object({ DRIZZLE_DATABASE_URL: z.string().min(1, 'DRIZZLE_DATABASE_URL env is missing') })
  .parse(process.env)

export default defineConfig({
  schema: './src/db/schema.ts',
  out: './src/db/migrations',
  dialect: 'postgresql',
  dbCredentials: {
    url: DRIZZLE_DATABASE_URL,
  },
})
