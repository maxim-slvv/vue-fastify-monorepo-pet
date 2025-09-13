export type {
  ResourceConfig,
  MethodName,
  RouteRegister,
  ListRouteOptions,
  ActionRouteOptions,
  MutationRouteOptions,
  SingleRouteOptions,
  FastifyApp,
} from './types.ts'
export { makeResource } from './resource-factory.ts'
export { registerListRoute } from './register-list-route.ts'
export { registerActionRoute } from './register-action-route.ts'
export { registerMutationRoute } from './register-mutation-route.ts'
export { registerSingleRoute } from './register-single-route.ts'
