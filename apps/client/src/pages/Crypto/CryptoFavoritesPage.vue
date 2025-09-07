<script setup lang="ts">
import { defineComponent, computed } from 'vue'
import UiDataTable from '@/shared/ui/DataTable/UiDataTable.vue'
import type { CryptoFavoriteResponse } from '@/entities/Crypto/types'
import { useCryptoFavorite } from '@/entities/Crypto/lib/useCryptoFavorite'
import { createCryptoColumns } from '@/entities/Crypto/lib/columns'

defineComponent({ name: 'CryptoFavoritesPage' })

const { rows, isLoading } = useCryptoFavorite()

const skeletonRows = computed<CryptoFavoriteResponse[]>(
  () =>
    Array.from({ length: 10 }, (_, i) => ({
      rank: i + 1,
      name: '',
      symbol: `__skeleton_${i}__`,
      image: '',
      price: '',
      ch24h: '',
      ch24h_direction: '' as 'up' | 'down',
      ch7d: '',
      ch7d_direction: '' as 'up' | 'down',
      marketCap: '',
      volume24h: '',
      spark: [],
    })) as unknown as CryptoFavoriteResponse[],
)

const rowsToShow = computed(() => (isLoading.value ? skeletonRows.value : rows.value))
const columns = createCryptoColumns(isLoading)
</script>

<template>
  <UiDataTable :rows="rowsToShow" :columns="columns" rowKey="symbol" :loading="isLoading">
  </UiDataTable>
</template>
