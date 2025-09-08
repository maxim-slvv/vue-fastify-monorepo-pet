<script setup lang="ts">
defineOptions({ name: 'HeaderIcon' })

const props = withDefaults(
  defineProps<{
    icon: string
    size?: string
    clickable?: boolean
  }>(),
  {
    size: '20px',
    clickable: true,
  },
)
</script>

<template>
  <i
    :class="['pi', props.icon, 'text-gray-600', { 'cursor-pointer': props.clickable }]"
    :style="{
      color: 'var(--fg)',
      fontSize: props.size,
    }"
  />
</template>
