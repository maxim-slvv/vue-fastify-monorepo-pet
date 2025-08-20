import Fastify from 'fastify'
import fastifyStatic from '@fastify/static'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const app = Fastify({ logger: true })

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

await app.register(fastifyStatic, {
  root: join(__dirname, '..', 'public', 'cdn'),
  prefix: '/cdn/',
  list: false,
  decorateReply: false,
})

app.get('/health', async () => ({ status: 'ok' }))

const port = Number(process.env.PORT || 3000)
const host = process.env.HOST || '0.0.0.0'

app
  .listen({ port, host })
  .then((address) => {
    app.log.info(`server listening on ${address}`)
  })
  .catch((err) => {
    app.log.error(err)
    process.exit(1)
  })
