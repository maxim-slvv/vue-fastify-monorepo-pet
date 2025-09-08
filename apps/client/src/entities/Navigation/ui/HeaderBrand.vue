<script setup lang="ts">
import UITypography from '@/shared/ui/Typography/UITypography.vue'
import ThemeSwitcher from '@/shared/ui/ThemeSwitcher/ThemeSwitcher.vue'
import { cn } from '@/shared/lib/tailwind/cn'

defineOptions({ name: 'HeaderBrand' })

const props = withDefaults(
  defineProps<{
    title?: string
    class?: string
    icon?: string
    width?: string
  }>(),
  {
    title: 'Crypto Market',
    class: '',
    icon: 'pi-th-large',
    width: '',
  },
)
</script>

<template>
  <div :class="cn(props.class, 'flex items-center gap-2 p-2')" :style="{ width: props.width }">
    <i :class="['pi', props.icon]" style="color: var(--fg)" />
    <UITypography variant="text-l-bold">{{ props.title }}</UITypography>
    <ThemeSwitcher class="mt-1" />
  </div>
</template>
