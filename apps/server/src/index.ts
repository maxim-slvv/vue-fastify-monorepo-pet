import Fastify from 'fastify'
import { initializeRoutes } from './routes.ts'
import { initializeSockets } from './_configuration/initializeSockets.ts'
import { registerPlugins } from './_configuration/plugins/index.ts'
import { startServer } from './_configuration/startServer.ts'

const app = Fastify({ logger: true })

await registerPlugins(app)
await initializeRoutes(app)

initializeSockets(app)
startServer(app)
