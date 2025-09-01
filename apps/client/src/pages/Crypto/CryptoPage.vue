<script setup lang="ts">
import { defineComponent } from 'vue'
import UiDataTable, { type ColumnDef } from '@/shared/ui/DataTable/UiDataTable.vue'
import Sparkline from '@/shared/ui/Sparkline/Sparkline.vue'
import Typography from '@/shared/ui/Typography/Typography.vue'
import UiPopover from '@/shared/ui/Popover/Popover.vue'
import { useCryptoTicker } from '@/pages/Crypto/useCryptoTicker'
import type { CryptoTableRow } from '@/pages/Crypto/types'
import { API_URL } from '@/shared/config/api'

defineComponent({ name: 'CryptoPage' })

const { rows } = useCryptoTicker()

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
  },
  { field: 'price', header: 'Price', align: 'right', width: '120px', bodyClass: 'font-medium' },
  { field: 'ch24h', header: '24h %', align: 'right', width: '96px', bodyClass: 'font-medium' },
  { field: 'ch7d', header: '7d %', align: 'right', width: '96px', bodyClass: 'font-medium' },
  {
    field: 'marketCap',
    header: 'Market Cap',
    align: 'right',
    width: '180px',
    bodyClass: 'font-medium',
  },
  {
    field: 'volume24h',
    header: 'Volume(24h)',
    align: 'right',
    width: '180px',
    bodyClass: 'font-medium',
  },
  {
    field: 'spark',
    header: 'Last 7 Days',
    align: 'right',
    width: '140px',
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

    <template #body-name="{ data }">
      <div class="flex items-center gap-2">
        <img
          :src="`${API_URL}${data.image}`"
          :alt="data.symbol"
          class="w-5 h-5 rounded-sm"
          loading="lazy"
        />
        <Typography class="text-m-bold">{{ `${data.name} ${data.symbol}` }}</Typography>
      </div>
    </template>

    <template #body-spark="{ data }">
      <UiPopover :width="500" :height="300">
        <div :style="{ width: '120px', height: '32px' }">
          <Sparkline :data="data.spark" :direction="data.ch7d_direction" />
        </div>
        <template #popover>
          <Sparkline
            :data="data.spark"
            :direction="data.ch7d_direction"
            :width="500"
            :height="300"
            :strokeWidth="3"
          />
        </template>
      </UiPopover>
    </template>
    <template #body-ch24h="{ data }">
      <Typography :color="data.ch24h_direction === 'up' ? 'green' : 'red'" class="text-m-bold">{{
        data.ch24h
      }}</Typography>
    </template>
    <template #body-ch7d="{ data }">
      <Typography :color="data.ch7d_direction === 'up' ? 'green' : 'red'" class="text-m-bold">{{
        data.ch7d
      }}</Typography>
    </template>
  </UiDataTable>
</template>
