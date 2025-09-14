<script setup lang="ts">
import { defineComponent } from 'vue'
import UiDataTable from '@/shared/ui/DataTable/UiDataTable.vue'
import { useCryptoTop } from '@/entities/Crypto/lib/useCryptoTop'
import { createCryptoColumns } from '@/entities/Crypto/lib/columns'

defineComponent({ name: 'CryptoPage' })

const { rows, meta, isLoading, toggleFavorite } = useCryptoTop()
const columns = createCryptoColumns(isLoading, toggleFavorite)
</script>

<template>
  <UiDataTable
    rowKey="symbol"
    :rows="rows"
    :columns="columns"
    :meta="meta"
    :loading="isLoading"
    :skeletonLength="10"
    :searchable="true"
    emptyStateEmoji="📊"
    emptyStateText="Нет данных о криптовалютах"
    @row-click="(row, features) => features.router.push(`/crypto/${row.symbol.toLowerCase()}`)"
  />
</template>
