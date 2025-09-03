<script setup lang="ts">
import { defineComponent, computed } from 'vue'
import UiDataTable, { type ColumnDef } from '@/shared/ui/DataTable/UiDataTable.vue'
import SparkPopoverCell from '@/entities/Crypto/ui/SparkPopoverCell.vue'
import CoinMainInfo from '@/entities/Crypto/ui/CoinMainInfo.vue'
import { useCryptoTicker } from '@/pages/Crypto/useCryptoTicker'
import type { CryptoTableRow } from '@/pages/Crypto/types'

import PriceCell from '@/shared/ui/DataTable/cells/PriceCell.vue'
import PercentCell from '@/shared/ui/DataTable/cells/PercentCell.vue'

defineComponent({ name: 'CryptoPage' })

const { rows, isLoading } = useCryptoTicker()

const skeletonRows = computed<CryptoTableRow[]>(
  () =>
    Array.from({ length: 10 }, (_, i) => ({
      rank: i + 1,
      name: '',
      symbol: `__skeleton_${i}__`,
      image: '',
      price: '',
      ch24h: '',
      ch24h_direction: '',
      ch7d: '',
      ch7d_direction: '',
      marketCap: '',
      volume24h: '',
      spark: [],
    })) as unknown as CryptoTableRow[],
)

const rowsToShow = computed(() => (isLoading.value ? skeletonRows.value : rows.value))

// Печально что обертки вокруг данных колонок (CoinMainInfo, PriceCell и т.д.) нужно описывать отдельно от columns конфига
// Но зато это бьет по рукам - что каждый компонент должен быть таким - что бы его можно было использовать в разных местах
// Тоесть во Vue( в отличе от React) - в теге script мы не можем использовать Vue компоненты и разметку JSX
// Нереально сделать что то на подобие:
// {...render: (rowData)=> <Popover item={rowData.description}>rowData.text</Popover>}
// Поэтому мы используем component и componentProps

const columns: ColumnDef<CryptoTableRow>[] = [
  {
    field: 'rank',
    header: '#',
    align: 'center',
    width: '56px',
    bodyClass: 'text-gray-500 font-medium',
  },
  {
    field: 'name',
    header: 'Name',
    width: '220px',
    bodyClass: 'font-medium',
    component: CoinMainInfo,
    componentProps: (row) => ({
      name: row.name,
      symbol: row.symbol,
      image: row.image,
      size: 'sm',
      variant: 'inlineWithCoinTag',
      loading: isLoading.value,
    }),
  },
  {
    field: 'price',
    header: 'Price',
    align: 'right',
    width: '120px',
    bodyClass: 'font-medium',
    component: PriceCell,
    componentProps: (row) => ({ value: row.price, loading: isLoading.value }),
  },
  {
    field: 'ch24h',
    header: '24h %',
    align: 'right',
    width: '96px',
    bodyClass: 'font-medium',
    component: PercentCell,
    componentProps: (row) => ({
      value: row.ch24h,
      trend: row.ch24h_direction,
      loading: isLoading.value,
    }),
  },
  {
    field: 'ch7d',
    header: '7d %',
    align: 'right',
    width: '96px',
    bodyClass: 'font-medium',
    component: PercentCell,
    componentProps: (row) => ({
      value: row.ch7d,
      trend: row.ch7d_direction,
      loading: isLoading.value,
    }),
  },
  {
    field: 'marketCap',
    header: 'Market Cap',
    align: 'right',
    width: '180px',
    bodyClass: 'font-medium',
    skeletonClass: 'h-5 w-full',
  },
  {
    field: 'volume24h',
    header: 'Volume(24h)',
    align: 'right',
    width: '180px',
    bodyClass: 'font-medium',
    skeletonClass: 'h-5 w-full',
  },
  {
    field: 'spark',
    header: 'Last 7 Days',
    align: 'right',
    width: '140px',
    bodyClass: 'font-medium',
    component: SparkPopoverCell,
    componentProps: (row) => ({ row, loading: isLoading.value, width: 140, height: 32 }),
  },
]
</script>

<template>
  <UiDataTable :rows="rowsToShow" :columns="columns" rowKey="symbol" :loading="isLoading">
  </UiDataTable>
</template>
