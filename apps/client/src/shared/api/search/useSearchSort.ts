import { computed, ref, watch, onBeforeUnmount, type Ref } from 'vue'
import { useUrlSearchParams } from '@vueuse/core'
import { useRoute } from 'vue-router'

export interface SearchSortOptions {
  debounceMs?: number
}

export interface SearchSortState {
  searchInput: Ref<string>
  searchValue: Ref<string>
  sortField: Ref<string | undefined>
  sortOrder: Ref<'asc' | 'desc' | undefined>
  page: Ref<number>
  limit: Ref<number>
  clearSearch: () => void
  clearSort: () => void
}

let searchSortInstance: SearchSortState | null = null
let currentRoute: string | null = null

export function useSearchSort(options: SearchSortOptions = {}): SearchSortState {
  const route = useRoute()

  if (currentRoute !== route.path) {
    searchSortInstance = null
    currentRoute = route.path
  }

  if (searchSortInstance) {
    return searchSortInstance
  }
  const { debounceMs = 300 } = options

  const params = useUrlSearchParams('history', { removeNullishValues: true })

  const searchValue = computed({
    get: () => {
      const value = (params.search as string) || ''
      return value
    },
    set: (value: string) => {
      if (!value || value.trim() === '') {
        delete params.search
      } else {
        params.search = value.trim()
      }
    },
  })

  const searchInput = ref(searchValue.value)

  watch(
    searchValue,
    (newValue) => {
      if (searchInput.value !== newValue) {
        searchInput.value = newValue
      }
    },
    { immediate: true },
  )

  const sortField = computed({
    get: () => {
      const value = (params.sort as string) || undefined
      return value
    },
    set: (value: string | undefined) => {
      if (!value || value.trim() === '') {
        delete params.sort
      } else {
        params.sort = value.trim()
      }
    },
  })

  const sortOrder = computed({
    get: () => {
      const order = params.order as string
      const value = order === 'asc' || order === 'desc' ? order : undefined
      return value
    },
    set: (value: 'asc' | 'desc' | undefined) => {
      if (!value) {
        delete params.order
      } else {
        params.order = value
      }
    },
  })

  const page = computed({
    get: () => {
      const value = parseInt(params.page as string) || 1
      return value
    },
    set: (value: number) => {
      if (value <= 1) {
        delete params.page
      } else {
        params.page = value.toString()
      }
    },
  })

  const limit = computed({
    get: () => {
      const value = parseInt(params.limit as string) || 10
      return value
    },
    set: (value: number) => {
      if (value === 10) {
        delete params.limit
      } else {
        params.limit = value.toString()
      }
    },
  })

  let debounceTimer: number | null = null

  const updateSearchValue = () => {
    if (debounceTimer) {
      clearTimeout(debounceTimer)
    }
    debounceTimer = setTimeout(() => {
      searchValue.value = searchInput.value
    }, debounceMs)
  }

  const stopWatcher = watch(searchInput, updateSearchValue, { immediate: false })

  const clearSearch = () => {
    searchInput.value = ''
    searchValue.value = ''
  }

  const clearSort = () => {
    sortField.value = undefined
    sortOrder.value = undefined
  }

  onBeforeUnmount(() => {
    if (debounceTimer) {
      clearTimeout(debounceTimer)
    }
    stopWatcher()
  })

  searchSortInstance = {
    searchInput,
    searchValue,
    sortField,
    sortOrder,
    page,
    limit,
    clearSearch,
    clearSort,
  }

  return searchSortInstance
}
