<script setup lang="ts">
import DataTable from 'primevue/datatable'
import type { DataTableMethods, DataTableSortEvent } from 'primevue/datatable'
import Column from 'primevue/column'
import { ref, useSlots, computed } from 'vue'
import { useRouter } from 'vue-router'
import UITypography from '@/shared/ui/Typography/UITypography.vue'
import UiSkeleton from '@/shared/ui/Skeleton/UiSkeleton.vue'
import type { PaginationState } from '@/shared/api/pagination'
import { PAGE_SIZE_OPTIONS } from '@/shared/api/pagination'

type Align = 'left' | 'center' | 'right'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface ColumnDef<Row = any, ComponentProps = Record<string, unknown>> {
  field: string
  header: string
  align?: Align
  headerClass?: string
  bodyClass?: string
  width?: string
  render?: (row: Row) => unknown
  skeletonClass?: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  component?: any
  componentProps?: (row: Row) => ComponentProps | Record<string, unknown>
  sortable?: boolean
}

const props = defineProps<{
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  rows: any[]
  columns: ColumnDef[]
  tableClass?: string
  rowKey?: string
  loading?: boolean
  scrollable?: boolean
  scrollHeight?: string
  minTableWidth?: string
  scrollDirection?: 'vertical' | 'horizontal' | 'both'
  pagination?: PaginationState
  totalRecords?: number
  emptyStateEmoji?: string
  emptyStateText?: string
  sortField?: string
  sortOrder?: 'asc' | 'desc'
}>()

interface TableFeatures {
  router: ReturnType<typeof useRouter>
}

const emit = defineEmits<{
  'update:sortField': [value: string]
  'update:sortOrder': [value: 'asc' | 'desc']
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  rowClick: [row: any, features: TableFeatures]
}>()

const slots = useSlots()
const router = useRouter()

const features: TableFeatures = {
  router,
}

const paginationEnabled = computed(() => Boolean(props.pagination?.showPagination.value))
const paginationRows = computed(() => props.pagination?.pageSize.value || 20)
const paginationFirst = computed(() => props.pagination?.first.value || 0)
const paginationTotal = computed(() => props.totalRecords ?? props.rows.length)

const isEmpty = computed(() => !props.loading && props.rows.length === 0)
const showEmptyState = computed(
  () => isEmpty.value && (props.emptyStateEmoji || props.emptyStateText),
)

function alignToClass(align?: Align): string | undefined {
  if (align === 'center') return 'text-center'
  if (align === 'right') return 'text-right'
  return undefined
}

const dt = ref<DataTableMethods | null>(null)
function exportCSV(): void {
  dt.value?.exportCSV()
}

function onPageChange(event: { first: number; rows: number; page: number }): void {
  props.pagination?.onPageChange(event)
}

function onSort(event: DataTableSortEvent): void {
  const field = typeof event.sortField === 'string' ? event.sortField : undefined
  const order = event.sortOrder === 1 ? 'asc' : 'desc'

  if (field) {
    emit('update:sortField', field)
    emit('update:sortOrder', order)
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function onRowClick(event: { data: any }): void {
  if (props.loading || (event.data.symbol && event.data.symbol.startsWith('__skeleton_'))) {
    return
  }

  emit('rowClick', event.data, features)
}

defineExpose({ exportCSV })
</script>

<template>
  <div class="space-y-4">
    <div
      v-if="showEmptyState"
      class="flex flex-col items-center justify-center text-center min-h-[50vh]"
    >
      <div v-if="props.emptyStateEmoji" class="text-6xl mb-4">
        {{ props.emptyStateEmoji }}
      </div>
      <UITypography v-if="props.emptyStateText" variant="text-l" class="text-fg opacity-70">
        {{ props.emptyStateText }}
      </UITypography>
    </div>

    <DataTable
      v-else
      ref="dt"
      :value="props.rows"
      :dataKey="props.rowKey"
      rowHover
      :lazy="true"
      :scrollable="props.scrollable"
      :scrollHeight="props.scrollHeight"
      :scrollDirection="props.scrollDirection ?? 'both'"
      :sortField="props.sortField"
      :sortOrder="props.sortOrder === 'asc' ? 1 : props.sortOrder === 'desc' ? -1 : undefined"
      class="w-full"
      :paginator="paginationEnabled"
      :rows="paginationRows"
      :first="paginationFirst"
      :totalRecords="paginationTotal"
      :rowsPerPageOptions="PAGE_SIZE_OPTIONS"
      paginatorTemplate="RowsPerPageDropdown CurrentPageReport FirstPageLink PrevPageLink NextPageLink LastPageLink "
      currentPageReportTemplate="{first} to {last} of {totalRecords}"
      @page="onPageChange"
      @sort="onSort"
      @row-click="onRowClick"
      :pt="{
        table: {
          class: [props.tableClass],
          style: props.minTableWidth ? { minWidth: props.minTableWidth } : undefined,
        },
        bodyRow: { class: ['group'] },
      }"
    >
      <Column
        v-for="col in props.columns"
        :key="col.field"
        :field="col.field"
        :header="col.header"
        :sortable="col.sortable"
        :pt="{
          headerCell: {
            class: [col.headerClass],
            style: col.width ? { width: col.width } : undefined,
          },
          bodyCell: {
            class: [
              'transition-colors',
              'whitespace-nowrap',
              'text-ellipsis',
              alignToClass(col.align),
              col.bodyClass,
            ],
            style: col.width ? { width: col.width } : undefined,
          },
        }"
      >
        <template #body="slotProps">
          <component
            v-if="slots[`body-${col.field}`]"
            :is="slots[`body-${col.field}`]"
            :key="`${slotProps.data.symbol ?? slotProps.index}-${col.field}`"
            v-bind="slotProps"
          />
          <UITypography variant="text-m-bold" v-else-if="col.render && !props.loading">
            {{ col.render(slotProps.data) as any }}
          </UITypography>
          <component
            v-else-if="col.component && !props.loading"
            :is="col.component"
            v-bind="col.componentProps ? col.componentProps(slotProps.data) : {}"
          />
          <UiSkeleton v-else-if="props.loading" :class="col.skeletonClass ?? 'h-5 w-full'" />
          <UITypography variant="text-m-bold" v-else>{{ slotProps.data[col.field] }}</UITypography>
        </template>
      </Column>
    </DataTable>
  </div>
</template>
