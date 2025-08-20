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
  <a :href="href" class="flex items-center gap-1 text-sm transition-colors">
    <Typography
      :color="active ? 'green' : 'default'"
      class="text-m-bold border-b-1 border-transparent hover:border-white"
    >
      {{ label }}
    </Typography>
  </a>
</template>
