<script setup lang="ts">
import { ref } from 'vue'
import UiButton from '@/shared/ui/Button/Button.vue'
import UiDialog from '@/shared/ui/Dialog/UiDialog.vue'
import InnerTable from '@/shared/ui/DataTable/InnerTable.vue'
import Typography from '@/shared/ui/Typography/Typography.vue'

defineOptions({ name: 'UiDataTable' })

// re-export ColumnDef type from InnerTable for consumers
export type { ColumnDef } from '@/shared/ui/DataTable/InnerTable.vue'

const props = defineProps<{
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  rows: any[]
  columns: import('@/shared/ui/DataTable/InnerTable.vue').ColumnDef[]
  tableClass?: string
  rowKey?: string
  loading?: boolean
  fullscreen?: boolean
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

    <InnerTable
      ref="innerRef"
      :rows="props.rows"
      :columns="props.columns"
      :tableClass="props.tableClass"
      :rowKey="props.rowKey"
      :loading="props.loading"
    />

    <UiDialog v-model="dialogVisible" width="90vw" height="70vh" fullscreen>
      <template #header>
        <!-- TODO Название -->
        <Typography class="text-l-bold">Fullscreen Table</Typography>
      </template>
      <InnerTable
        :rows="props.rows"
        :columns="props.columns"
        :tableClass="props.tableClass"
        :rowKey="props.rowKey"
        :loading="props.loading"
        scrollable
        scrollHeight="flex"
        minTableWidth="64rem"
      />
    </UiDialog>
  </div>
</template>
