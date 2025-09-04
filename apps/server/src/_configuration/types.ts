import { z } from 'zod'

export const appSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  PORT: z.string().optional().default('3000'),
  HOST: z.string().optional().default('0.0.0.0'),
  CORS_ORIGINS: z
    .string()
    .optional()
    .transform((v) => (v ? v.split(',').map((s) => s.trim()) : ['*'])),
  HELMET_CORP: z
    .enum(['same-origin', 'same-site', 'cross-origin'])
    .optional()
    .default('cross-origin'),
  RATE_LIMIT_MAX: z.string().optional().default('100'),
  RATE_LIMIT_WINDOW: z.string().optional().default('1 minute'),
})

export type AppConfig = z.infer<typeof appSchema> & {
  corsOrigins: (origin: string) => boolean
}
