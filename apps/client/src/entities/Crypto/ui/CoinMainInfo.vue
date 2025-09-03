<script setup lang="ts">
import ComposeInfo from '@/shared/ui/ComposeInfo/ComposeInfo.vue'

defineOptions({ name: 'CoinMainInfoEntity' })

type Variant = 'inline' | 'inlineWithCoinTag' | 'stacked'

const props = withDefaults(
  defineProps<{
    name?: string
    symbol?: string
    image?: string
    size?: 'sm' | 'md' | 'lg'
    variant?: Variant
    class?: string
  }>(),
  {
    size: 'md',
    variant: 'inline',
  },
)
</script>

<template>
  <ComposeInfo v-bind="props" />
</template>
