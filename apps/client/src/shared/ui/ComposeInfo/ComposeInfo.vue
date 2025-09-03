<script setup lang="ts">
import { cva } from 'class-variance-authority'
import { cn } from '@/shared/lib/tailwind/cn'
import Typography from '@/shared/ui/Typography/Typography.vue'
import Logo from '@/shared/ui/ComposeInfo/ui/Logo.vue'
import Name from '@/shared/ui/ComposeInfo/ui/Name.vue'
import SymbolTag from '@/shared/ui/ComposeInfo/ui/SymbolTag.vue'

defineOptions({ name: 'ComposeInfo' })

type Variant = 'inline' | 'inlineWithCoinTag' | 'stacked'

const props = withDefaults(
  defineProps<{
    name?: string
    symbol?: string
    image?: string
    size?: 'sm' | 'md' | 'lg'
    variant?: Variant
    class?: string
    loading?: boolean
  }>(),
  {
    size: 'md',
    variant: 'inline',
  },
)

const wrapper = cva('min-w-0', {
  variants: {
    variant: {
      inline: 'flex items-center gap-2',
      inlineWithCoinTag: 'flex items-center gap-3',
      stacked: 'flex items-start gap-3',
    },
  },
  defaultVariants: { variant: 'inline' },
})
</script>

<template>
  <div :class="cn(wrapper({ variant: props.variant }), props.class)">
    <Logo :image="props.image" :alt="props.symbol" :size="props.size" :loading="props.loading" />

    <div v-if="props.variant === 'inline'" class="min-w-0">
      <Name :text="props.name" :loading="props.loading" :truncate="true" />
      <Typography v-if="!props.loading" class="text-m-bold" withOutVariants>{{
        ` ${props.symbol}`
      }}</Typography>
    </div>

    <div v-else-if="props.variant === 'inlineWithCoinTag'" class="min-w-0 flex items-center gap-2">
      <Name :text="props.name" :loading="props.loading" :truncate="true" />
      <SymbolTag :text="props.symbol" :loading="props.loading" />
    </div>

    <div v-else class="min-w-0 flex flex-col gap-1">
      <Name :text="props.name" :loading="props.loading" :truncate="true" />
      <Typography v-if="!props.loading" class="text-s text-gray-500" withOutVariants>{{
        props.symbol
      }}</Typography>
    </div>
  </div>
</template>
