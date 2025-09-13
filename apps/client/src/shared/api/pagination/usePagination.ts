import { computed, type Ref } from 'vue'
import { DEFAULT_PAGE_SIZE } from '../../api/pagination/constants'
import { useSearchSort } from '@/shared/api/search/useSearchSort'

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

  const { page: searchPage, limit: searchLimit } = useSearchSort()

  const page = computed({
    get: () => searchPage.value,
    set: (value: number) => {
      searchPage.value = value
    },
  })

  const pageSize = computed({
    get: () => searchLimit.value || defaultPageSize,
    set: (value: number) => {
      searchLimit.value = value
    },
  })

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
