import type { AxiosError } from 'axios'

interface ApiErrorData<T = object> {
  message: string | null
  data: T | null
}

export type ApiError<T = object> = AxiosError<ApiErrorData<T>> | null | undefined
