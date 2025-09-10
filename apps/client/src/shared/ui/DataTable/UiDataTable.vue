<script setup lang="ts">
import { ref } from 'vue'
import UiButton from '@/shared/ui/Button/Button.vue'
import UiDialog from '@/shared/ui/Dialog/UiDialog.vue'
import BaseDataTable from '@/shared/ui/DataTable/BaseDataTable.vue'
import UITypography from '@/shared/ui/Typography/UITypography.vue'
import type { PaginationState } from '@/shared/lib/pagination'

defineOptions({ name: 'UiDataTable' })

export type { ColumnDef } from '@/shared/ui/DataTable/BaseDataTable.vue'

const props = defineProps<{
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  rows: any[]
  columns: import('@/shared/ui/DataTable/BaseDataTable.vue').ColumnDef[]
  tableClass?: string
  rowKey?: string
  loading?: boolean
  fullscreen?: boolean
  pagination?: PaginationState
  totalRecords?: number
  emptyStateEmoji?: string
  emptyStateText?: string
}>()

const innerRef = ref<{ exportCSV: () => void } | null>(null)
function onExport(): void {
  innerRef.value?.exportCSV()
}

const dialogVisible = ref(false)
</script>

<template>
  <div>
    <div class="flex items-center justify-end gap-2 pb-3">
      <!-- //TODO Меню с кнопками -->
      <UiButton title="Export CSV" @click="onExport" variant="success">
        <div class="pi pi-file-excel"></div>
      </UiButton>
      <UiButton title="Fullscreen" @click="() => (dialogVisible = true)" variant="primary">
        <i class="pi pi-window-maximize" />
      </UiButton>
    </div>
    <!-- TODO  scrollHeight="70vh" - observer -->
    <BaseDataTable
      ref="innerRef"
      :rows="props.rows"
      :columns="props.columns"
      :tableClass="props.tableClass"
      :rowKey="props.rowKey"
      :loading="props.loading"
      :pagination="props.pagination"
      :totalRecords="props.totalRecords"
      :emptyStateEmoji="props.emptyStateEmoji"
      :emptyStateText="props.emptyStateText"
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
        :rows="props.rows"
        :columns="props.columns"
        :tableClass="props.tableClass"
        :rowKey="props.rowKey"
        :loading="props.loading"
        :pagination="props.pagination"
        :totalRecords="props.totalRecords"
        :emptyStateEmoji="props.emptyStateEmoji"
        :emptyStateText="props.emptyStateText"
        scrollable
        scrollHeight="flex"
        minTableWidth="64rem"
        scrollDirection="both"
      />
    </UiDialog>
  </div>
</template>
