export {
  makeResource,
  registerListRoute,
  registerActionRoute,
  type ResourceConfig,
  type MethodName,
  type RouteRegister,
  type ListRouteOptions,
  type ActionRouteOptions,
  type FastifyApp,
} from './builder/index.ts'

export {
  paginationParamsSchema,
  createPaginatedResponseSchema,
  createPaginationMeta,
  applyPagination,
  applySorting,
  isPaginationRequested,
  type PaginationParams,
  type PaginatedResponse,
  type PaginationMeta,
  PaginatedService,
  type PaginatedRepository,
} from './pagination/index.ts'
