<script setup lang="ts">
import { computed } from 'vue'
import { RichSparkline } from '@/entities/Crypto/types'

defineOptions({ name: 'UiSparkline' })

const props = withDefaults(
  defineProps<{
    data: number[] | RichSparkline
    width?: number
    height?: number
    strokeWidth?: number
    upColor?: string
    downColor?: string
    direction?: 'up' | 'down'
  }>(),
  {
    width: 120,
    height: 32,
    strokeWidth: 2,
    upColor: 'var(--color-green-light)',
    downColor: 'var(--color-red-light)',
  },
)

const dataPoints = computed(() => {
  if (!props.data) return []

  if (typeof props.data === 'object' && 'points' in props.data) {
    return props.data.points || []
  }

  if (Array.isArray(props.data)) {
    return props.data
  }

  return []
})

const min = computed(() => {
  if (!dataPoints.value || dataPoints.value.length === 0) return 0
  return Math.min(...dataPoints.value)
})

const max = computed(() => {
  if (!dataPoints.value || dataPoints.value.length === 0) return 1
  return Math.max(...dataPoints.value)
})

const color = computed(() => {
  if (props.direction) return props.direction === 'up' ? props.upColor : props.downColor
  if (!dataPoints.value || dataPoints.value.length === 0) return props.upColor
  return dataPoints.value[dataPoints.value.length - 1] >= dataPoints.value[0]
    ? props.upColor
    : props.downColor
})

const path = computed(() => {
  if (!dataPoints.value || dataPoints.value.length === 0) return ''
  const len = dataPoints.value.length
  if (!len) return ''
  const range = max.value - min.value || 1
  const stepX = props.width / (len - 1 || 1)
  const points: string[] = []
  for (let i = 0; i < len; i += 1) {
    const x = i * stepX
    const norm = (dataPoints.value[i] - min.value) / range
    const y = props.height - norm * props.height
    points.push(`${i === 0 ? 'M' : 'L'}${x.toFixed(2)},${y.toFixed(2)}`)
  }
  return points.join(' ')
})
</script>

<template>
  <svg
    class="block"
    width="100%"
    height="100%"
    :viewBox="`0 0 ${props.width} ${props.height}`"
    preserveAspectRatio="none"
  >
    <path
      :d="path"
      fill="none"
      :style="{ stroke: color as string }"
      :stroke-width="props.strokeWidth"
    />
  </svg>
</template>
