import Fastify from 'fastify'
import { initializeRoutes } from './routes/index.ts'
import { initializeSockets } from './sockets/index.ts'
import { registerPlugins } from './config/plugins.ts'
import { startServer } from './config/startServer.ts'

const app = Fastify({ logger: true })

await registerPlugins(app)
await initializeRoutes(app)

initializeSockets(app)
startServer(app)
