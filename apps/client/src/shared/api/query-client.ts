import { QueryClient } from '@tanstack/vue-query'

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 60 * 60 * 1000,
      retry: false,
    },
    mutations: {
      retry: false,
    },
  },
})

export const invalidateQueries = (queryKey: readonly string[]) => {
  queryClient.invalidateQueries({ queryKey })
}

export const clearCache = () => {
  queryClient.clear()
}

export const removeQueries = (queryKey: readonly string[]) => {
  queryClient.removeQueries({ queryKey })
}
