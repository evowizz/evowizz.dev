import 'server-only'

import { z } from 'zod'

const serverEnvSchema = z.object({
  DRIZZLE_DATABASE_URL: z.string().min(1, 'DRIZZLE_DATABASE_URL env is missing'),
})

export const serverEnv = serverEnvSchema.parse({
  DRIZZLE_DATABASE_URL: process.env.DRIZZLE_DATABASE_URL,
})
