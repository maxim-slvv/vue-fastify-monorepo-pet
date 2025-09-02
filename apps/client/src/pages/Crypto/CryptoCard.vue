<script setup lang="ts">
import { ref, onMounted } from 'vue'
import Typography from '@/shared/ui/Typography/Typography.vue'
import type { CryptoTableRow } from '@/pages/Crypto/types'
import { API_URL } from '@/shared/config/api'

const props = defineProps<{
  row: CryptoTableRow
}>()

const isLoading = ref(true)

onMounted(() => {
  setTimeout(() => {
    isLoading.value = false
  }, 300)
})
</script>

<template>
  <div
    class="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-4 w-full max-w-[680px]"
  >
    <!-- Скелетоны -->
    <div v-if="isLoading" class="animate-pulse">
      <div class="flex items-center justify-between gap-3">
        <div class="flex items-center gap-3 min-w-0">
          <div class="w-10 h-10 rounded bg-slate-200 dark:bg-slate-700"></div>
          <div class="min-w-0">
            <div class="flex items-center gap-2 min-w-0">
              <div class="h-6 w-32 bg-slate-200 dark:bg-slate-700 rounded"></div>
              <div class="h-5 w-16 bg-slate-200 dark:bg-slate-700 rounded"></div>
            </div>
          </div>
        </div>
        <div class="text-right">
          <div class="h-6 w-24 bg-slate-200 dark:bg-slate-700 rounded mb-1"></div>
          <div class="h-5 w-20 bg-slate-200 dark:bg-slate-700 rounded"></div>
        </div>
      </div>
      <div class="mt-4 h-64 bg-slate-200 dark:bg-slate-700 rounded-md"></div>
      <div class="mt-3 flex items-center justify-between">
        <div class="h-3 w-12 bg-slate-200 dark:bg-slate-700 rounded"></div>
        <div class="h-3 w-12 bg-slate-200 dark:bg-slate-700 rounded"></div>
        <div class="h-3 w-12 bg-slate-200 dark:bg-slate-700 rounded"></div>
        <div class="h-3 w-12 bg-slate-200 dark:bg-slate-700 rounded"></div>
        <div class="h-3 w-12 bg-slate-200 dark:bg-slate-700 rounded"></div>
        <div class="h-3 w-12 bg-slate-200 dark:bg-slate-700 rounded"></div>
      </div>
    </div>

    <div v-else>
      <div class="flex items-center justify-between gap-3">
        <div class="flex items-center gap-3 min-w-0">
          <img
            :src="`${API_URL}${props.row.image}`"
            :alt="props.row.symbol"
            class="w-10 h-10 rounded"
          />
          <div class="min-w-0">
            <div class="flex items-center gap-2 min-w-0">
              <Typography class="text-l-bold truncate">{{ props.row.name }}</Typography>
              <span
                class="px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 text-xs dark:bg-slate-800 dark:text-slate-300"
              >
                {{ props.row.symbol }}
              </span>
            </div>
          </div>
        </div>
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

    <template v-if="!isLoading">
      <div class="mt-4 rounded-md bg-slate-100 dark:bg-slate-800 w-full" style="height: 260px">
        <!-- TODO: Вставить график позже (ApexCharts/Recharts/Chart.js/SVG) -->
      </div>

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
