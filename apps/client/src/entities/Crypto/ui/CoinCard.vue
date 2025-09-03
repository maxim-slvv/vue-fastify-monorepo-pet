<script setup lang="ts">
import { ref, onMounted } from 'vue'
import Typography from '@/shared/ui/Typography/Typography.vue'
import UiSkeleton from '@/shared/ui/Skeleton/UiSkeleton.vue'
import CoinMainInfo from '@/entities/Crypto/ui/CoinMainInfo.vue'
import type { CryptoTableRow } from '@/pages/Crypto/types'

const props = defineProps<{
  row: CryptoTableRow
}>()

const isLoading = ref(true)

onMounted(() => {
  setTimeout(() => {
    isLoading.value = false
  }, 300) // TODO: Убрать задержку
})
</script>

<template>
  <div
    class="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-4 w-full max-w-[680px]"
  >
    <!-- Скелетоны -->
    <div v-if="isLoading" class="animate-pulse">
      <div class="flex items-center justify-between gap-3 h-[56px]">
        <CoinMainInfo size="lg" variant="inlineWithCoinTag" :loading="true" />

        <div class="text-right">
          <UiSkeleton class="h-6 w-24 mb-1" />
          <UiSkeleton class="h-5 w-24" />
        </div>
      </div>
      <div class="mt-4"></div>
      <UiSkeleton class="h-65 w-full" rounded="lg" />
      <div class="mt-3 flex items-center justify-between">
        <UiSkeleton class="h-3 w-12" />
        <UiSkeleton class="h-3 w-12" />
        <UiSkeleton class="h-3 w-12" />
        <UiSkeleton class="h-3 w-12" />
        <UiSkeleton class="h-3 w-12" />
        <UiSkeleton class="h-3 w-12" />
      </div>
    </div>

    <div v-else>
      <div class="flex items-center justify-between gap-3">
        <CoinMainInfo
          :name="props.row.name"
          :symbol="props.row.symbol"
          :image="props.row.image"
          size="lg"
          variant="inlineWithCoinTag"
          class="min-w-0"
        />
        <div class="text-right">
          <Typography class="text-l-bold">{{ props.row.price }}</Typography>
          <div class="flex items-center justify-end gap-1">
            <span :class="props.row.ch24h_direction === 'up' ? 'text-green-600' : 'text-red-500'">
              {{ props.row.ch24h_direction === 'up' ? '▲' : '▼' }}
            </span>
            <Typography
              :color="props.row.ch24h_direction === 'up' ? 'green' : 'red'"
              class="text-s-bold"
            >
              {{ props.row.ch24h }}
            </Typography>
          </div>
        </div>
      </div>
    </div>

    <div class="mt-4"></div>
    <!-- Скелетоны -->
    <template v-if="!isLoading">
      <UiSkeleton class="h-65 w-full" rounded="lg" />
      <!-- TODO: Вставить график (ApexCharts/Recharts/Chart.js/SVG) -->

      <div class="mt-3 flex items-center justify-between text-xs text-slate-500">
        <span>12. Jun</span>
        <span>13. Jun</span>
        <span>14. Jun</span>
        <span>15. Jun</span>
        <span>16. Jun</span>
        <span>12:00</span>
      </div>
    </template>
  </div>
</template>
