<script setup lang="ts">
import { computed } from 'vue'

defineOptions({ name: 'UiSparkline' })

const props = withDefaults(
  defineProps<{
    data: number[]
    width?: number
    height?: number
    strokeWidth?: number
    upColor?: string
    downColor?: string
  }>(),
  {
    width: 120,
    height: 32,
    strokeWidth: 2,
    upColor: 'var(--color-rise)',
    downColor: 'var(--color-fall)',
  },
)

const min = computed(() => Math.min(...props.data))
const max = computed(() => Math.max(...props.data))
const color = computed(() =>
  props.data[props.data.length - 1] >= props.data[0] ? props.upColor : props.downColor,
)

const path = computed(() => {
  const len = props.data.length
  if (!len) return ''
  const range = max.value - min.value || 1
  const stepX = props.width / (len - 1 || 1)
  const points: string[] = []
  for (let i = 0; i < len; i += 1) {
    const x = i * stepX
    const norm = (props.data[i] - min.value) / range
    const y = props.height - norm * props.height
    points.push(`${i === 0 ? 'M' : 'L'}${x.toFixed(2)},${y.toFixed(2)}`)
  }
  return points.join(' ')
})
</script>

<template>
  <svg :width="props.width" :height="props.height" viewBox="0 0 120 32" preserveAspectRatio="none">
    <path :d="path" fill="none" :stroke="color" :stroke-width="props.strokeWidth" />
  </svg>
</template>
