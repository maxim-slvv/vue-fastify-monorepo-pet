import { computed } from 'vue'
import { useNewsBrief as useNewsBriefQuery } from '../api'
import type { NewsBriefRequest } from '../types'

export function useNewsBrief(params?: NewsBriefRequest) {
  const { data, isLoading, error, refetch } = useNewsBriefQuery({
    params,
  })

  const rows = computed(() => data.value || [])

  return {
    rows,
    isLoading,
    error,
    reload: refetch,
  }
}
