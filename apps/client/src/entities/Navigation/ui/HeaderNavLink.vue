<script setup lang="ts">
import UITypography from '@/shared/ui/Typography/UITypography.vue'

defineOptions({ name: 'HeaderNavLink' })

const { label, href = '#' } = defineProps<{
  label: string
  href?: string
}>()
</script>

<template>
  <a :href="href" class="flex items-center gap-1 transition-colors">
    <UITypography
      variant="text-m-bold"
      class="border-b border-transparent hover:border-current"
      :style="{ color: 'var(--nav-link-fg)' }"
    >
      {{ label }}
    </UITypography>
  </a>
</template>
