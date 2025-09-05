<script setup lang="ts">
import Typography from '@/shared/ui/Typography/Typography.vue'

defineOptions({ name: 'HeaderNavLink' })

const { label, href = '#' } = defineProps<{
  label: string
  href?: string
}>()
</script>

<template>
  <a :href="href" class="flex items-center gap-1 text-sm transition-colors">
    <Typography
      class="text-m-bold border-b border-transparent hover:border-current"
      :style="{ color: 'var(--nav-link-fg)' }"
    >
      {{ label }}
    </Typography>
  </a>
</template>
