<script setup lang="ts">
import Sparkline from '@/shared/ui/Sparkline/Sparkline.vue'
import UITypography from '@/shared/ui/Typography/UITypography.vue'
import UiSkeleton from '@/shared/ui/Skeleton/UiSkeleton.vue'
import { RichSparkline } from '../types'

const props = withDefaults(
  defineProps<{
    data: number[] | RichSparkline
    direction: 'up' | 'down'
    percent?: string
    showPercent?: boolean
    width?: number
    height?: number
    loading?: boolean
  }>(),
  { showPercent: true, width: 120, height: 32 },
)
</script>

<template>
  <div :style="{ width: `${props.width}px` }" class="flex flex-col">
    <div :style="{ height: `${props.height}px` }">
      <UiSkeleton v-if="props.loading" class="w-full h-full" rounded="md" />
      <Sparkline v-else :data="props.data" :direction="props.direction" />
    </div>
    <div
      v-if="props.showPercent && props.percent"
      class="flex items-center justify-end gap-1 mb-[-8px]"
    >
      <span
        :style="{ color: props.direction === 'up' ? 'var(--color-green)' : 'var(--color-red)' }"
      >
        {{ props.direction === 'up' ? '▲' : '▼' }}
      </span>
      <UITypography variant="text-xs" :color="props.direction === 'up' ? 'green' : 'red'">
        {{ props.percent }}
      </UITypography>
    </div>
  </div>
</template>
