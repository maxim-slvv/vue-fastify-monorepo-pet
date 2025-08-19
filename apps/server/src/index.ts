import Fastify from 'fastify'

const app = Fastify({ logger: true })

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
