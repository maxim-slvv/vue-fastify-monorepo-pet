<script setup lang="ts">
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import { useSlots } from 'vue'
import Typography from '@/shared/ui/Typography/Typography.vue'

defineOptions({ name: 'UiDataTable' })

type Align = 'left' | 'center' | 'right'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface ColumnDef<Row = any> {
  field: string
  header: string
  align?: Align
  headerClass?: string
  bodyClass?: string
  width?: string
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
    :pt="{ table: { class: [props.tableClass, 'table-fixed'] }, bodyRow: { class: 'group' } }"
  >
    <Column
      v-for="col in props.columns"
      :key="col.field"
      :field="col.field"
      :header="col.header"
      :pt="{
        headerCell: {
          class: ['bg-white', col.headerClass],
          style: col.width ? { width: col.width } : undefined,
        },
        bodyCell: {
          class: [
            'bg-white',
            'group-hover:bg-sky-50',
            'whitespace-nowrap',
            'overflow-hidden',
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
          v-bind="slotProps"
        />
        <Typography class="text-m-bold" v-else-if="col.render">
          {{ col.render(slotProps.data) as any }}
        </Typography>
        <Typography class="text-m-bold" v-else>{{ slotProps.data[col.field] }}</Typography>
      </template>
    </Column>
  </DataTable>
</template>
