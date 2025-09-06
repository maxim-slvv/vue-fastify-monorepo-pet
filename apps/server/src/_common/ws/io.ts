import type { Server as HTTPServer } from 'node:http'
import { Server as SocketIOServer, type ServerOptions, type Namespace } from 'socket.io'

let ioInstance: SocketIOServer | null = null

export function getIO(): SocketIOServer {
  if (!ioInstance) throw new Error('Socket.IO is not initialized. Call initIO(server) first')
  return ioInstance
}

export function initIO(server: HTTPServer, options?: Partial<ServerOptions>): SocketIOServer {
  if (ioInstance) return ioInstance
  ioInstance = new SocketIOServer(server, {
    cors: {
      origin: true,
      credentials: true,
    },
    ...options,
  })
  return ioInstance
}

export function getNamespace(path: string): Namespace {
  return getIO().of(path)
}
