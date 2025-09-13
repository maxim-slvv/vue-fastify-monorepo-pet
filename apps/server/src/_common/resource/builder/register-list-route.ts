import { z } from 'zod'
import {
  paginationParamsSchema,
  createPaginationMeta,
  applyPagination,
  applySorting,
  applySearch,
  type PaginationParams,
  type PaginatedResponse,
} from '../pagination/index.ts'
import type { FastifyApp, ListRouteOptions, RouteRegister } from './types.ts'

export function registerListRoute<
  RowShape extends z.ZodRawShape,
  Row extends z.infer<z.ZodObject<RowShape>>,
>(app: FastifyApp, opts: ListRouteOptions<RowShape, Row>): void {
  const paginatedSchema = opts.resource.paginatedSchemaByPreset(opts.preset)
  const paginatedExamples = [opts.resource.paginatedExamplesByPreset(opts.preset, 2)]

  const routeOptions = {
    schema: {
      querystring: paginationParamsSchema,
      response: {
        200: paginatedSchema,
      },
      examples: paginatedExamples,
    },
  }

  let register: RouteRegister
  if (typeof opts.method === 'function') {
    register = opts.method
  } else {
    const methodName = opts.method.toLowerCase()
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    register = (app as any)[methodName].bind(app) as RouteRegister
  }

  //------------------------------------------------------------------------------------------------

  const wrappedHandler = async (req: {
    query: PaginationParams
  }): Promise<PaginatedResponse<Row[]>> => {
    const paginationParams = paginationParamsSchema.parse(req.query || {})

    const allData = await opts.handler(paginationParams)

    const searchedData = applySearch(
      allData as Record<string, string | number | boolean | Date>[],
      paginationParams,
    ) as Row[]

    const sortedData = applySorting(
      searchedData as Record<string, string | number | boolean | Date>[],
      paginationParams,
    ) as Row[]

    const { items, total } = applyPagination(sortedData, paginationParams)

    const meta = createPaginationMeta(paginationParams, total)

    return {
      data: items,
      meta,
    }
  }

  register(opts.path, routeOptions, wrappedHandler)
}
