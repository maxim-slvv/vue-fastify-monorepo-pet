<script setup lang="ts">
import { cva } from 'class-variance-authority'
import { cn } from '@/shared/lib/tailwind/cn'

defineOptions({ name: 'UiTypography' })

const props = withDefaults(
  defineProps<{
    as?: string
    variant?: 'default'
    color?: 'green' | 'red' | 'default'
    class?: string
  }>(),
  { as: 'span', variant: 'default' },
)

const typography = cva('', {
  variants: {
    variant: {
      default: '',
    },
    color: {
      default: '',
      green: 'text-[var(--color-rise)]',
      red: 'text-[var(--color-fall)]',
    },
  },
  defaultVariants: { variant: 'default' },
})
</script>

<template>
  <component :is="props.as" :class="cn(typography({ color: props.color }), props.class)">
    <slot />
  </component>
</template>
