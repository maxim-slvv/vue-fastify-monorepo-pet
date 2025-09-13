<script setup lang="ts">
import { defineComponent, computed } from 'vue'
import UiDataTable from '@/shared/ui/DataTable/UiDataTable.vue'
import type { ICryptoServerRow } from '@/entities/Crypto/types'
import { useCryptoFavorite } from '@/entities/Crypto/lib/useCryptoFavorite'
import { createCryptoColumns } from '@/entities/Crypto/lib/columns'
import { usePagination } from '@/shared/api/pagination'

defineComponent({ name: 'CryptoFavoritesPage' })

const { rows, meta, isLoading, toggleFavorite } = useCryptoFavorite()
const columns = createCryptoColumns(isLoading, toggleFavorite)

const skeletonRows = computed<ICryptoServerRow[]>(() =>
  Array.from({ length: 10 }, (_, i) => ({
    rank: i + 1,
    name: '',
    symbol: `__skeleton_${i}__`,
    image: '',
    price: '',
    ch24h: '',
    ch24h_direction: 'up' as const,
    ch7d: '',
    ch7d_direction: 'up' as const,
    marketCap: '',
    volume24h: '',
    spark: [],
  })),
)

const totalRecords = computed(() => meta.value?.total ?? 0)
const pagination = usePagination({
  totalRecords,
})

const rowsToShow = computed(() => (isLoading.value ? skeletonRows.value : rows.value))
</script>

<template>
  <UiDataTable
    :rows="rowsToShow"
    :columns="columns"
    rowKey="symbol"
    :loading="isLoading"
    :pagination="pagination"
    :totalRecords="totalRecords"
    :searchable="true"
    emptyStateEmoji="⭐"
    emptyStateText="Нет избранных криптовалют"
  />
</template>
