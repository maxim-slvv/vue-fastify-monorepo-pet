<script setup lang="ts">
defineOptions({ name: 'UiButton' })

const props = defineProps<{
  label?: string
  variant?: 'primary' | 'secondary' | 'ghost'
}>()

const baseClasses = 'text-sm font-medium rounded-full px-4 py-2 cursor-pointer'
const variants: Record<string, string> = {
  primary: 'bg-blue-600 hover:bg-blue-700 text-white',
  secondary: 'bg-gray-100 hover:bg-gray-200 text-gray-800',
  ghost: 'bg-transparent hover:bg-gray-100 text-gray-800',
}
</script>

<template>
  <button :class="[baseClasses, variants[props.variant ?? 'primary']]">
    <slot>{{ props.label }}</slot>
  </button>
</template>
