<script setup lang="ts">
import { defineComponent, computed } from 'vue'
import UiDataTable, { type ColumnDef } from '@/shared/ui/DataTable/UiDataTable.vue'
import CoinCard from '@/entities/Crypto/ui/CoinCard.vue'
import SparklineCell from '@/shared/ui/Sparkline/SparklineCell.vue'
import Typography from '@/shared/ui/Typography/Typography.vue'
import CoinMainInfo from '@/entities/Crypto/ui/CoinMainInfo.vue'
import UiPopover from '@/shared/ui/Popover/Popover.vue'
import { useCryptoTicker } from '@/pages/Crypto/useCryptoTicker'
import type { CryptoTableRow } from '@/pages/Crypto/types'
import UiSkeleton from '@/shared/ui/Skeleton/UiSkeleton.vue'

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
  {
    field: 'price',
    header: 'Price',
    align: 'right',
    width: '120px',
    bodyClass: 'font-medium',
    skeletonClass: 'h-5 w-full',
  },
  { field: 'ch24h', header: '24h %', align: 'right', width: '96px', bodyClass: 'font-medium' },
  { field: 'ch7d', header: '7d %', align: 'right', width: '96px', bodyClass: 'font-medium' },
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
  },
]
</script>

<template>
  <UiDataTable :rows="rowsToShow" :columns="columns" rowKey="symbol" :loading="isLoading">
    <!-- Печально что обертки вокруг колонок нужно описывать отдельно от columns конфига -->
    <!-- Может есть какой то вариант - что бы в пропсах прокидывать обертку в которую хотим положить значение колонки -->
    <!-- Тоесть вопрос в том как в теге script использовать vue компоненты (если это вообще возможно)-->
    <!-- Типо сделать что то на подобие: -->
    <!-- {render: (rowData)=> <Popover item={rowData.description}>rowData.text</Popover>} -->

    <template #body-name="{ data }">
      <CoinMainInfo
        :name="data.name"
        :symbol="data.symbol"
        :image="data.image"
        size="sm"
        variant="inlineWithCoinTag"
        :loading="isLoading"
      />
    </template>

    <template #body-spark="{ data }">
      <template v-if="isLoading">
        <SparklineCell
          :loading="true"
          :width="140"
          :height="32"
          :showPercent="false"
          :data="[]"
          :direction="'up'"
        />
      </template>
      <UiPopover v-else :width="500" :height="300">
        <SparklineCell
          :data="data.spark"
          :direction="data.ch7d_direction"
          :width="140"
          :height="32"
        />
        <template #popover>
          <CoinCard :key="data.symbol" :row="data" />
        </template>
      </UiPopover>
    </template>
    <template #body-ch24h="{ data }">
      <template v-if="isLoading">
        <UiSkeleton class="h-5 w-full" />
      </template>
      <Typography
        v-else
        :color="data.ch24h_direction === 'up' ? 'green' : 'red'"
        class="text-m-bold"
      >
        {{ data.ch24h }}
      </Typography>
    </template>
    <template #body-ch7d="{ data }">
      <template v-if="isLoading">
        <UiSkeleton class="h-5 w-full" />
      </template>
      <Typography
        v-else
        :color="data.ch7d_direction === 'up' ? 'green' : 'red'"
        class="text-m-bold"
      >
        {{ data.ch7d }}
      </Typography>
    </template>
  </UiDataTable>
</template>
