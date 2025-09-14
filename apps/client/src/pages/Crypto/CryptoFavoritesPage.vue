<script setup lang="ts">
import { defineComponent } from 'vue'
import UiDataTable from '@/shared/ui/DataTable/UiDataTable.vue'
import { useCryptoFavorite } from '@/entities/Crypto/lib/useCryptoFavorite'
import { createCryptoColumns } from '@/entities/Crypto/lib/columns'

defineComponent({ name: 'CryptoFavoritesPage' })

const { rows, meta, isLoading, toggleFavorite } = useCryptoFavorite()
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
    emptyStateEmoji="⭐"
    emptyStateText="Нет избранных криптовалют"
    @row-click="(row, features) => features.router.push(`/crypto/${row.symbol.toLowerCase()}`)"
  />
</template>
