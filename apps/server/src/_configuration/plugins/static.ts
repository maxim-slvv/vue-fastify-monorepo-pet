import type { FastifyInstance } from 'fastify'
import fastifyStatic from '@fastify/static'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

export async function registerStatic(app: FastifyInstance): Promise<void> {
  const __filename = fileURLToPath(import.meta.url)
  const __dirname = dirname(__filename)

  await app.register(fastifyStatic, {
    root: join(__dirname, '..', '..', '..', 'public', 'cdn'),
    prefix: '/cdn/',
    list: false,
    decorateReply: false,
  })
}
