import type { FastifyInstance } from 'fastify'
import { registerStatic } from './static.ts'
import { registerCors } from './cors.ts'
import { registerHelmet } from './helmet.ts'
import { registerRateLimit } from './rateLimit.ts'
import { registerSwagger } from './swagger.ts'

export { registerStatic } from './static.ts'
export { registerCors } from './cors.ts'
export { registerHelmet } from './helmet.ts'
export { registerRateLimit } from './rateLimit.ts'

export async function registerPlugins(app: FastifyInstance): Promise<void> {
  await registerStatic(app)
  await registerCors(app)
  await registerHelmet(app)
  await registerRateLimit(app)
  await registerSwagger(app)
}
