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
    direction?: 'up' | 'down'
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
const color = computed(() => {
  if (props.direction) return props.direction === 'up' ? props.upColor : props.downColor
  return props.data[props.data.length - 1] >= props.data[0] ? props.upColor : props.downColor
})

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
  <svg
    class="block"
    width="100%"
    height="100%"
    :viewBox="`0 0 ${props.width} ${props.height}`"
    preserveAspectRatio="none"
  >
    <path :d="path" fill="none" :stroke="color" :stroke-width="props.strokeWidth" />
  </svg>
</template>
