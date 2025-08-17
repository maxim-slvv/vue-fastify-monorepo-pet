<script setup lang="ts">
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import { useSlots } from 'vue'

defineOptions({ name: 'UiDataTable' })

type Align = 'left' | 'center' | 'right'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface ColumnDef<Row = any> {
  field: string
  header: string
  align?: Align
  headerClass?: string
  bodyClass?: string
  /** Пользовательский рендер ячейки */
  render?: (row: Row) => unknown
}

const props = defineProps<{
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  rows: any[]
  columns: ColumnDef[]
  tableClass?: string
}>()

const slots = useSlots()

function alignToClass(align?: Align): string | undefined {
  if (align === 'center') return 'text-center'
  if (align === 'right') return 'text-right'
  return undefined
}
</script>

<template>
  <DataTable
    :value="props.rows"
    rowHover
    class="w-full bg-white"
    :pt="{ table: { class: props.tableClass }, bodyRow: { class: 'group' } }"
  >
    <Column
      v-for="col in props.columns"
      :key="col.field"
      :field="col.field"
      :header="col.header"
      :pt="{
        headerCell: { class: ['bg-white', col.headerClass] },
        bodyCell: {
          class: ['bg-white', 'group-hover:bg-sky-50', alignToClass(col.align), col.bodyClass],
        },
      }"
    >
      <template #body="slotProps">
        <component
          v-if="slots[`body-${col.field}`]"
          :is="slots[`body-${col.field}`]"
          v-bind="slotProps"
        />
        <span v-else-if="col.render">
          {{ col.render(slotProps.data) as any }}
        </span>
        <span v-else>{{ slotProps.data[col.field] }}</span>
      </template>
    </Column>
  </DataTable>
</template>
