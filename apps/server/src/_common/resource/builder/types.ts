import type { FastifyInstance } from 'fastify'
import { z } from 'zod'
import type { PaginationParams } from '../pagination/index.ts'

export interface ResourceConfig<
  RowShape extends z.ZodRawShape,
  Row extends z.infer<z.ZodObject<RowShape>>,
> {
  entity: string
  rowSchema: z.ZodObject<RowShape>
  fieldExamples: { [K in keyof Row]-?: Row[K] }
  presets: Record<string, Partial<Record<keyof Row, boolean>>>
}

export type MethodName = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' | 'HEAD' | 'OPTIONS'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type RouteRegister = (path: string, options: any, handler: any) => void

export interface ListRouteOptions<
  RowShape extends z.ZodRawShape,
  Row extends z.infer<z.ZodObject<RowShape>>,
> {
  path: string
  resource: ReturnType<typeof import('./resource-factory.ts').makeResource<RowShape, Row>>
  preset: string
  handler: (params?: PaginationParams) => Promise<Row[]>
  method: MethodName | RouteRegister
}

export interface ActionRouteOptions {
  path: string
  paramsSchema?: z.ZodTypeAny
  bodySchema?: z.ZodTypeAny
  responseSchema?: z.ZodTypeAny
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handler: (req: any) => unknown | Promise<unknown>
  method: MethodName | RouteRegister
}

export interface MutationRouteOptions {
  path: string
  paramsSchema?: z.ZodTypeAny
  bodySchema?: z.ZodTypeAny
  responseSchema?: z.ZodTypeAny
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handler: (req: any) => unknown | Promise<unknown>
  method: MethodName | RouteRegister
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type FastifyApp = FastifyInstance<any, any, any, any, any>
