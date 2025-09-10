import { computed, ref, type Ref } from 'vue'
import { useUrlSearchParams } from '@vueuse/core'
import { parseUrlNumber } from '@/shared/lib/nuqs'
import { DEFAULT_PAGE_SIZE } from './constants'

export interface PaginationOptions {
  defaultPageSize?: number
  pageSizeOptions?: number[]
  totalRecords?: Ref<number>
  enableOnlyWhenNeeded?: boolean
}

export interface PaginationState {
  page: Ref<number>
  pageSize: Ref<number>
  first: Ref<number>
  showPagination: Ref<boolean>
  setPage: (page: number) => void
  setPageSize: (size: number) => void
  onPageChange: (event: { first: number; rows: number; page: number }) => void
}

export function usePagination(options: PaginationOptions = {}): PaginationState {
  const {
    defaultPageSize = DEFAULT_PAGE_SIZE,
    totalRecords,
    enableOnlyWhenNeeded = false,
  } = options

  const params = useUrlSearchParams('history', { removeNullishValues: true })

  const page = computed({
    get: () => parseUrlNumber(params.page as string, 1),
    set: (value: number) => {
      if (value === 1) {
        delete params.page
      } else {
        params.page = String(value)
      }
    },
  })

  const pageSize = ref(defaultPageSize)

  const first = computed(() => (page.value - 1) * pageSize.value)

  const showPagination = computed(() => {
    if (!enableOnlyWhenNeeded) return true
    if (!totalRecords) return false
    return totalRecords.value > pageSize.value
  })

  const setPage = (newPage: number) => {
    page.value = newPage
  }

  const setPageSize = (newSize: number) => {
    pageSize.value = newSize
    page.value = 1
  }

  const onPageChange = (event: { first: number; rows: number; page: number }) => {
    const newPage = event.page + 1

    if (event.rows !== pageSize.value) {
      setPageSize(event.rows)
    } else if (newPage !== page.value) {
      setPage(newPage)
    }
  }

  return {
    page,
    pageSize,
    first,
    showPagination,
    setPage,
    setPageSize,
    onPageChange,
  }
}
