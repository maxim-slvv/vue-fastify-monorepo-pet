<script setup lang="ts">
import { defineComponent, computed } from 'vue'
import UiDataTable from '@/shared/ui/DataTable/UiDataTable.vue'
import { useCryptoTicker } from '@/entities/Crypto/lib/useCryptoTicker'
import type { CryptoListResponse } from '@/entities/Crypto/types'
import { createCryptoColumns } from '@/entities/Crypto/lib/columns'

defineComponent({ name: 'CryptoPage' })

const { rows, isLoading } = useCryptoTicker()

const skeletonRows = computed<CryptoListResponse>(
  () =>
    Array.from({ length: 10 }, (_, i) => ({
      rank: i + 1,
      name: '',
      symbol: `__skeleton_${i}__`,
      image: '',
      price: '',
      ch24h: '',
      ch24h_direction: 'up',
      ch7d: '',
      ch7d_direction: 'up',
      marketCap: '',
      volume24h: '',
      spark: [],
    })) as unknown as CryptoListResponse,
)

const rowsToShow = computed(() => (isLoading.value ? skeletonRows.value : rows.value))
const columns = createCryptoColumns(isLoading)
</script>

<template>
  <UiDataTable :rows="rowsToShow" :columns="columns" rowKey="symbol" :loading="isLoading">
  </UiDataTable>
</template>
