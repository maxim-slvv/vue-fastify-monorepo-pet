<script setup lang="ts">
import { computed } from 'vue'

defineOptions({ name: 'LayoutBlock' })

const props = withDefaults(
  defineProps<{
    border?: 'all' | 'bottom' | 'right' | 'left' | 'top'
    tag?: string
  }>(),
  { tag: 'div' },
)

const asTag = computed(() => props.tag ?? 'div')

const style = computed(() => {
  const base: Record<string, string> = { backgroundColor: 'var(--surface)' }
  const borderStyle = '1px solid var(--border)'
  if (props.border === 'all') base.border = borderStyle
  if (props.border === 'right') base.borderRight = borderStyle
  if (props.border === 'left') base.borderLeft = borderStyle
  if (props.border === 'top') base.borderTop = borderStyle
  if (props.border === 'bottom') base.borderBottom = borderStyle
  return base
})
</script>

<template>
  <component :is="asTag" :style="style">
    <slot />
  </component>
</template>
