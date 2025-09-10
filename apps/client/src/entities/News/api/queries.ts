import { keepPreviousData, useQuery } from '@tanstack/vue-query'
import type { QueryHook } from '@/shared/lib/query/vue-query-types'
import { api, invalidateQueries } from '@/shared/api'
import type {
  NewsListRequest,
  NewsListResponse,
  NewsBriefRequest,
  NewsBriefResponse,
  NewsRow,
} from '../types'

const NEWS_QUERY_KEYS = {
  list: ['news', 'list'],
  brief: ['news', 'brief'],
} as const

export const useNewsList: QueryHook<NewsListRequest, NewsRow[]> = ({
  params,
  options,
  enabled = true,
}) => {
  return useQuery({
    queryKey: [...NEWS_QUERY_KEYS.list, params],
    queryFn: async ({ signal }) => {
      const response = await api.get<NewsListResponse>('/api/news', {
        signal,
        params,
      })

      return response.data.data
    },
    placeholderData: keepPreviousData,
    enabled,
    ...options,
  })
}

export const useNewsBrief: QueryHook<NewsBriefRequest, NewsRow[]> = ({
  params,
  options,
  enabled = true,
}) => {
  return useQuery({
    queryKey: [...NEWS_QUERY_KEYS.brief, params],
    queryFn: async ({ signal }) => {
      const response = await api.get<NewsBriefResponse>('/api/news/brief', {
        signal,
        params,
      })
      return response.data.data
    },
    placeholderData: keepPreviousData,
    enabled,
    ...options,
  })
}

export const invalidateNewsList = () => {
  invalidateQueries(NEWS_QUERY_KEYS.list)
}

export const invalidateNewsBrief = () => {
  invalidateQueries(NEWS_QUERY_KEYS.brief)
}
