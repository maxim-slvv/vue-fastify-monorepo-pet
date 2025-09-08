import type {
  QueryFunctionContext,
  UseMutationReturnType,
  UseQueryOptions,
  useQuery,
} from '@tanstack/vue-query'
import type { AxiosResponse } from 'axios'
import type { ComputedRef, MaybeRefOrGetter } from 'vue'

import type { ApiError } from '@/shared/api/types'

// ----------------------------- For Mutations

export type MutationCallback<R, T = unknown> = (data: AxiosResponse<R>, variables: T) => void

export type MutationHook<T, R> = (
  params: MutationHookParams<T, R>,
) => UseMutationReturnType<AxiosResponse<R>, ApiError, T, unknown>

export interface MutationHookParams<T, R> {
  onSuccess?: MutationCallback<R, T>
  onError?: (error: ApiError, variables: T, context: unknown) => void
  onSettled?: (
    data: AxiosResponse<R> | undefined,
    error: ApiError | null,
    variables: T,
    context: unknown,
  ) => void
}

export type MutationFunction<T, R> = (variables: T) => Promise<AxiosResponse<R>>

export interface QueryCache<T> {
  items: T[]
}

// ---------------------------- For Query
export interface QueryHookParams<T, R, D = R> {
  params?: MaybeRefOrGetter<T | undefined>
  select?: (data: R) => D
  options?: Omit<UseQueryOptions<R, ApiError, D>, 'queryKey' | 'queryFn'>
  initialData?: R
  enabled?: MaybeRefOrGetter<boolean>
}

export type QueryFunction<T, R> = (params?: T, context?: QueryFunctionContext) => Promise<R>

export type QueryHook<T, R, D = R> = (
  hookParams: QueryHookParams<T, R, D>,
) => ReturnType<typeof useQuery<R, ApiError, D>>

export interface QueryResult<T> {
  data: ComputedRef<T | undefined>
  isLoading: ComputedRef<boolean>
  isFetching: ComputedRef<boolean>
  isError: ComputedRef<boolean>
  error: ComputedRef<ApiError>
  refetch: () => void
}
