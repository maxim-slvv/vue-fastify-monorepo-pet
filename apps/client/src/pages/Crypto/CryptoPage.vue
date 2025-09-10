<script setup lang="ts">
import { defineComponent, computed } from 'vue'
import UiDataTable from '@/shared/ui/DataTable/UiDataTable.vue'
import { useCryptoTicker } from '@/entities/Crypto/lib/useCryptoTicker'
import type { ICryptoServerRow } from '@/entities/Crypto/types'
import { createCryptoColumns } from '@/entities/Crypto/lib/columns'
import { usePagination } from '@/shared/lib/pagination'

defineComponent({ name: 'CryptoPage' })

const { rows, isLoading, toggleFavorite } = useCryptoTicker()
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

const totalRecords = computed(() => rows.value?.length || 0)
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
    emptyStateEmoji="📊"
    emptyStateText="Нет данных о криптовалютах"
  />
</template>
