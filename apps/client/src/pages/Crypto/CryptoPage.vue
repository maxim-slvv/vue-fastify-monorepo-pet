<script setup lang="ts">
import { defineComponent } from 'vue'
import UiDataTable, { type ColumnDef } from '@/shared/ui/DataTable/UiDataTable.vue'
import UiSparkline from '@/shared/ui/Sparkline/Sparkline.vue'
import UiTypography from '@/shared/ui/Typography/Typography.vue'
import UiPopover from '@/shared/ui/Popover/Popover.vue'

defineComponent({ name: 'CryptoPage' })

type CryptoTableRow = {
  rank: number
  name: string
  symbol: string
  price: string
  ch24h: string
  ch24h_direction: 'up' | 'down'
  ch7d: string
  ch7d_direction: 'up' | 'down'
  marketCap: string
  volume24h: string
  spark: number[]
}

const rows: CryptoTableRow[] = [
  {
    rank: 1,
    name: 'Bitcoin',
    symbol: 'BTC',
    price: '$50,355.21',
    ch24h: '6.49%',
    ch24h_direction: 'up',
    ch7d: '22.53%',
    ch7d_direction: 'up',
    marketCap: '$766,432,564,346',
    volume24h: '$38,544,965,954',
    spark: [
      101, 102, 120, 101, 28, 100, 100, 150, 120, 125, 150, 145, 140, 220, 150, 120, 125, 150, 145,
      140, 220,
    ],
  },
  {
    rank: 2,
    name: 'Ethereum',
    symbol: 'ETH',
    price: '$2,584.55',
    ch24h: '2.49%',
    ch24h_direction: 'up',
    ch7d: '22.53%',
    ch7d_direction: 'down',
    marketCap: '$285,843,885,844',
    volume24h: '$24,954,954,953',
    spark: [
      200, 180, 170, 150, 140, 160, 155, 101, 102, 120, 125, 130, 220, 120, 125, 130, 190, 10, 101,
      102, 103,
    ],
  },
  {
    rank: 3,
    name: 'Tether',
    symbol: 'USDT',
    price: '$1.00',
    ch24h: '0.13%',
    ch24h_direction: 'down',
    ch7d: '22.53%',
    ch7d_direction: 'down',
    marketCap: '$62,453,345,112',
    volume24h: '$59,953,234,065',
    spark: [
      100, 98, 230, 101, 28, 100, 100, 150, 120, 125, 150, 145, 140, 220, 150, 120, 125, 150, 145,
      140, 220,
    ],
  },
  {
    rank: 4,
    name: 'Binance',
    symbol: 'BNB',
    price: '$374.20',
    ch24h: '8.49%',
    ch24h_direction: 'up',
    ch7d: '22.53%',
    ch7d_direction: 'up',
    marketCap: '$56,954,543,543',
    volume24h: '$1,594,356,995',
    spark: [
      150, 120, 125, 150, 145, 140, 220, 150, 120, 125, 150, 145, 140, 220, 101, 28, 100, 100, 150,
      90, 50,
    ],
  },
]

const columns: ColumnDef<CryptoTableRow>[] = [
  {
    field: 'rank',
    header: '#',
    align: 'center',
    bodyClass: 'text-gray-500 font-medium',
  },
  {
    field: 'name',
    header: 'Name',
    render: (row) => `${row.name} ${row.symbol}`,
    bodyClass: 'font-medium',
  },
  { field: 'price', header: 'Price', align: 'right', bodyClass: 'font-medium' },
  { field: 'ch24h', header: '24h %', align: 'right', bodyClass: 'font-medium' },
  { field: 'ch7d', header: '7d %', align: 'right', bodyClass: 'font-medium' },
  { field: 'marketCap', header: 'Market Cap', align: 'right', bodyClass: 'font-medium' },
  { field: 'volume24h', header: 'Volume(24h)', align: 'right', bodyClass: 'font-medium' },
  {
    field: 'spark',
    header: 'Last 7 Days',
    align: 'right',
    bodyClass: 'font-medium',
  },
]
</script>

<template>
  <UiDataTable :rows="rows" :columns="columns">
    <!-- Печально что обертки вокруг колонок нужно описывать отдельно от columns конфига -->
    <!-- Может есть какой то вариант - что бы в пропсах прокидывать обертку в которую хотим положить значение колонки -->
    <!-- Тоесть вопрос в том как в теге script использовать vue компоненты (если это вообще возможно)-->
    <!-- Типо сделать что то на подобие: -->
    <!-- {render: (rowData)=> <Popover item={rowData.description}>rowData.text</Popover>} -->

    <template #body-spark="{ data }">
      <UiPopover :width="500" :height="300">
        <div :style="{ width: '120px', height: '32px' }">
          <UiSparkline :data="data.spark" />
        </div>
        <template #popover>
          <UiSparkline :data="data.spark" :width="500" :height="300" :strokeWidth="3" />
        </template>
      </UiPopover>
    </template>
    <template #body-ch24h="{ data }">
      <UiTypography :color="data.ch24h_direction === 'up' ? 'green' : 'red'">{{
        data.ch24h
      }}</UiTypography>
    </template>
    <template #body-ch7d="{ data }">
      <UiTypography :color="data.ch7d_direction === 'up' ? 'green' : 'red'">{{
        data.ch7d
      }}</UiTypography>
    </template>
  </UiDataTable>
</template>
