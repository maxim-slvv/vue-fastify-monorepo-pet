<script setup lang="ts">
import { cva } from 'class-variance-authority'
import { cn } from '@/shared/lib/tailwind/cn'

defineOptions({ name: 'UiSkeleton' })

const props = withDefaults(
  defineProps<{
    class?: string
    rounded?: 'none' | 'sm' | 'md' | 'lg' | 'full'
  }>(),
  { rounded: 'md' },
)

const base = cva('animate-pulse', {
  variants: {
    rounded: {
      none: 'rounded-none',
      sm: 'rounded-sm',
      md: 'rounded',
      lg: 'rounded-lg',
      full: 'rounded-full',
    },
  },
  defaultVariants: { rounded: 'md' },
})
</script>

<template>
  <div
    :class="cn(props.class, base({ rounded: props.rounded }))"
    :style="{ backgroundColor: 'var(--skeleton-bg)' }"
  />
</template>
