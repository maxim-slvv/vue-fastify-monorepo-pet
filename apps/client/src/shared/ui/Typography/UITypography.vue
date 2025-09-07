<script setup lang="ts">
import { computed } from 'vue'
import { cva } from 'class-variance-authority'
import { cn } from '@/shared/lib/tailwind/cn'

defineOptions({ name: 'UITypography' })

type TypographyTag = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'p' | 'span' | 'nav'

const variants = {
  'text-h1': ['text-h2', 'lg:text-h1'],
  'text-h2': ['text-h3', 'lg:text-h2'],
  'text-h3': ['text-h4', 'lg:text-h3'],
  'text-h4': ['text-h5', 'lg:text-h4'],
  'text-h5': ['text-m-bold', 'lg:text-h5'],
  'text-subtitle1': ['text-subtitle2', 'lg:text-subtitle1'],
  'text-subtitle2': ['text-subtitle3', 'lg:text-subtitle2'],
  'text-subtitle3': ['text-subtitle4', 'lg:text-subtitle3'],
  'text-subtitle4': ['text-l', 'lg:text-subtitle4'],
  'text-l': ['text-m', 'lg:text-l'],
  'text-l-bold': ['text-m-bold', 'lg:text-l-bold'],
  'text-m': ['text-s', 'lg:text-m'],
  'text-m-bold': ['text-s-bold', 'lg:text-m-bold'],
  'text-s': ['text-xs', 'lg:text-s'],
  'text-s-bold': ['text-xs-bold', 'lg:text-s-bold'],
  'text-xs': ['text-caption', 'lg:text-xs'],
  'text-xs-bold': ['text-caption-bold', 'lg:text-xs-bold'],
  'text-caption': ['text-caption'],
} as const

type Variant = keyof typeof variants

const props = withDefaults(
  defineProps<{
    as?: TypographyTag
    variant?: Variant
    color?: 'green' | 'green-light' | 'red' | 'red-light' | 'gray' | 'blue'
    class?: string
    withOutVariants?: boolean
  }>(),
  {
    variant: 'text-m',
    withOutVariants: false,
  },
)

const typography = cva('', {
  variants: {
    variant: Object.fromEntries(
      Object.entries(variants).map(([key, value]) => [key, value.join(' ')]),
    ),
  },
  defaultVariants: {
    variant: 'text-m',
  },
})

const computedTag = computed((): TypographyTag => {
  if (props.as) return props.as

  if (props.variant?.includes('text-h1')) return 'h1'
  if (props.variant?.includes('text-h2')) return 'h2'
  if (props.variant?.includes('text-h3')) return 'h3'
  if (props.variant?.includes('text-h4')) return 'h4'
  if (props.variant?.includes('text-h5')) return 'h5'
  if (props.variant?.includes('text-subtitle')) return 'p'

  return 'span'
})

const computedClasses = computed(() => {
  if (props.withOutVariants) {
    return cn(props.class)
  }

  return cn(
    typography({
      variant: props.variant,
    }),
    props.class,
  )
})

const computedStyle = computed(() => {
  if (props.color === 'green') return { color: 'var(--color-green)' }
  if (props.color === 'green-light') return { color: 'var(--color-green-light)' }
  if (props.color === 'red') return { color: 'var(--color-red)' }
  if (props.color === 'red-light') return { color: 'var(--color-red-light)' }
  if (props.color === 'gray') return { color: 'var(--color-gray)' }
  if (props.color === 'blue') return { color: 'var(--color-blue)' }
  return { color: 'var(--fg)' }
})
</script>

<template>
  <component :is="computedTag" :class="computedClasses" :style="computedStyle">
    <slot />
  </component>
</template>
