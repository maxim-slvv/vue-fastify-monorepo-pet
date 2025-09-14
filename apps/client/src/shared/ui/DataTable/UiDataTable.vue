<script setup lang="ts">
import { ref, computed } from 'vue'
import InputText from 'primevue/inputtext'
import IconField from 'primevue/iconfield'
import InputIcon from 'primevue/inputicon'
import UiButton from '@/shared/ui/Button/Button.vue'
import UiDialog from '@/shared/ui/Dialog/UiDialog.vue'
import BaseDataTable from '@/shared/ui/DataTable/BaseDataTable.vue'
import UITypography from '@/shared/ui/Typography/UITypography.vue'
import type { PaginationState } from '@/shared/api/pagination'
import type { PaginationMeta } from '@/shared/api/pagination/types'
import { usePagination } from '@/shared/api/pagination'
import { useSearchSort } from '@/shared/api/search/useSearchSort'

defineOptions({ name: 'UiDataTable' })

export type { ColumnDef } from '@/shared/ui/DataTable/BaseDataTable.vue'

interface Props<T = unknown> {
  rows: T[]
  columns: import('@/shared/ui/DataTable/BaseDataTable.vue').ColumnDef[]
  tableClass?: string
  rowKey?: string
  loading?: boolean
  fullscreen?: boolean
  meta?: PaginationMeta | null
  totalRecords?: number
  emptyStateEmoji?: string
  emptyStateText?: string
  searchable?: boolean
  sortField?: string
  sortOrder?: 'asc' | 'desc'
  skeletonLength?: number
  pagination?: PaginationState
}

const props = defineProps<Props>()

interface TableFeatures {
  router: ReturnType<typeof import('vue-router').useRouter>
}

const emit = defineEmits<{
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  rowClick: [row: any, features: TableFeatures]
}>()

const innerRef = ref<{ exportCSV: () => void } | null>(null)
function onExport(): void {
  innerRef.value?.exportCSV()
}

const dialogVisible = ref(false)

const {
  searchInput,
  sortField: searchSortField,
  sortOrder: searchSortOrder,
  clearSearch,
  clearSort,
} = useSearchSort()

const skeletonRows = computed(() => {
  if (!props.loading || !props.skeletonLength) return []
  return Array.from({ length: props.skeletonLength }, (_, i) => ({
    symbol: `__skeleton_${i}__`,
  }))
})

const rowsToShow = computed(() => {
  if (props.loading && props.skeletonLength) {
    return skeletonRows.value
  }
  return props.rows
})

const totalRecords = computed(() => {
  if (props.meta?.total !== undefined) {
    return props.meta.total
  }
  return props.totalRecords ?? props.rows.length
})

const internalPagination = usePagination({ totalRecords })
const pagination = computed(() => props.pagination ?? internalPagination)

const hasInput = computed(() => searchInput.value.length > 0)

function clearSorting(): void {
  clearSort()
}
</script>

<template>
  <div>
    <div class="table-action-panel p-4 pt-0">
      <div class="table-action-panel-actions flex flex-col gap-4">
        <!-- Search Controls -->

        <!-- Action Buttons -->
        <div class="flex gap-2">
          <div
            v-if="searchable"
            class="flex flex-col sm:flex-row gap-4 items-start sm:items-center flex-1"
          >
            <!-- Search Input -->
            <div class="w-[400px]">
              <IconField iconPosition="left" class="w-full">
                <InputIcon class="pi pi-search" />
                <InputText
                  v-model="searchInput"
                  placeholder="Поиск..."
                  class="w-full"
                  :pt="{
                    root: 'w-full',
                  }"
                />
                <InputIcon
                  v-if="hasInput"
                  class="pi pi-times cursor-pointer hover:text-red-500 transition-colors"
                  @click="clearSearch"
                />
              </IconField>
            </div>
          </div>
          <UiButton
            title="Очистить сортировку"
            @click="clearSorting"
            variant="secondary"
            :disabled="!searchSortField"
          >
            <i class="pi pi-sort-amount-down"></i>
            <span>Reset Sort</span>
          </UiButton>

          <UiButton title="Export CSV" @click="onExport" variant="success">
            <i class="pi pi-file-excel"></i>
            <span>Export CSV</span>
          </UiButton>

          <UiButton title="Fullscreen" @click="() => (dialogVisible = true)" variant="primary">
            <i class="pi pi-window-maximize"></i>
            <span>Fullscreen</span>
          </UiButton>
        </div>
      </div>
    </div>
    <!-- TODO  scrollHeight="70vh" - observer -->
    <BaseDataTable
      ref="innerRef"
      :rows="rowsToShow"
      :columns="props.columns"
      :tableClass="props.tableClass"
      :rowKey="props.rowKey"
      :loading="props.loading"
      :pagination="pagination"
      :totalRecords="totalRecords"
      :emptyStateEmoji="props.emptyStateEmoji"
      :emptyStateText="props.emptyStateText"
      :sortField="searchSortField"
      :sortOrder="searchSortOrder"
      @update:sortField="(value) => (searchSortField = value)"
      @update:sortOrder="(value) => (searchSortOrder = value)"
      @row-click="(row, features) => emit('rowClick', row, features)"
      scrollable
      scrollHeight="70vh"
      minTableWidth="64rem"
      scrollDirection="both"
    />

    <UiDialog v-model="dialogVisible" width="90vw" height="70vh" fullscreen>
      <template #header>
        <!-- TODO Название -->
        <UITypography variant="text-l-bold">Fullscreen Table</UITypography>
      </template>
      <BaseDataTable
        :rows="rowsToShow"
        :columns="props.columns"
        :tableClass="props.tableClass"
        :rowKey="props.rowKey"
        :loading="props.loading"
        :pagination="pagination"
        :totalRecords="totalRecords"
        :emptyStateEmoji="props.emptyStateEmoji"
        :emptyStateText="props.emptyStateText"
        :sortField="searchSortField"
        :sortOrder="searchSortOrder"
        @update:sortField="(value) => (searchSortField = value)"
        @update:sortOrder="(value) => (searchSortOrder = value)"
        @row-click="(row, features) => emit('rowClick', row, features)"
        scrollable
        scrollHeight="flex"
        minTableWidth="64rem"
        scrollDirection="both"
      />
    </UiDialog>
  </div>
</template>
