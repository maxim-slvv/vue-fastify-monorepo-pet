<script setup lang="ts">
import Sparkline from './Sparkline.vue'
import Typography from '@/shared/ui/Typography/Typography.vue'

const props = withDefaults(
  defineProps<{
    data: number[]
    direction: 'up' | 'down'
    percent?: string
    showPercent?: boolean
    width?: number
    height?: number
  }>(),
  { showPercent: true, width: 120, height: 32 },
)
</script>

<template>
  <div :style="{ width: `${props.width}px` }" class="flex flex-col">
    <div :style="{ height: `${props.height}px` }">
      <Sparkline :data="props.data" :direction="props.direction" />
    </div>
    <div
      v-if="props.showPercent && props.percent"
      class="flex items-center justify-end gap-1 text-xs mb-[-8px]"
    >
      <span :class="props.direction === 'up' ? 'text-green-600' : 'text-red-500'">
        {{ props.direction === 'up' ? '▲' : '▼' }}
      </span>
      <Typography :color="props.direction === 'up' ? 'green' : 'red'" class="text-xs">
        {{ props.percent }}
      </Typography>
    </div>
  </div>
</template>
