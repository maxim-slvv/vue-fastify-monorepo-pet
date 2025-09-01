import { appSchema, AppConfig } from './types.ts'

export function loadConfig(env: NodeJS.ProcessEnv = process.env): AppConfig {
  const parsed = appSchema.safeParse(env)
  if (!parsed.success) {
    console.error('Invalid environment:', parsed.error.flatten().fieldErrors)
    throw new Error('ENV validation failed')
  }
  const cfg = parsed.data
  const whitelist = cfg.CORS_ORIGINS ?? ['*']
  if (cfg.NODE_ENV === 'production' && whitelist.includes('*')) {
    throw new Error('CORS_ORIGINS cannot contain * in production')
  }
  const corsOrigins = (origin: string) => {
    if (!origin) return true
    if (whitelist.includes('*')) return true
    return whitelist.includes(origin)
  }
  return { ...cfg, corsOrigins }
}
