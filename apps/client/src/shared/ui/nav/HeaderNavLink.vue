<script setup lang="ts">
defineOptions({ name: 'HeaderNavLink' })

const {
  label,
  href = '#',
  active = false,
} = defineProps<{
  label: string
  href?: string
  active?: boolean
}>()
</script>

<template>
  <a
    :href="href"
    class="flex items-center gap-1 text-sm transition-colors"
    :class="active ? 'text-gray-900 font-medium' : 'text-gray-600 hover:text-gray-900'"
  >
    {{ label }}
  </a>
</template>
