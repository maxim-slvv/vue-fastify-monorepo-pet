import type { FastifyApp, MutationRouteOptions, RouteRegister } from './types.ts'

export function registerMutationRoute(app: FastifyApp, opts: MutationRouteOptions): void {
  const schema: Record<string, unknown> = {}
  if (opts.paramsSchema) {
    schema.params = opts.paramsSchema
  }
  if (opts.bodySchema) {
    schema.body = opts.bodySchema
  }
  if (opts.responseSchema) {
    schema.response = { 200: opts.responseSchema }
  }

  let register: RouteRegister
  if (typeof opts.method === 'function') {
    register = opts.method
  } else {
    const methodName = opts.method.toLowerCase()
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    register = (app as any)[methodName].bind(app) as RouteRegister
  }

  register(opts.path, { schema }, opts.handler)
}
