<script setup lang="ts">
import UITypography, { type Variant } from '@/shared/ui/Typography/UITypography.vue'
import UiSkeleton from '@/shared/ui/Skeleton/UiSkeleton.vue'
import { formatPrice } from '@/shared/utils'

defineOptions({ name: 'PriceCell' })

export interface IPriceCellProps {
  value?: string | number
  loading?: boolean
  variant?: Variant
}

const props = withDefaults(defineProps<IPriceCellProps>(), {
  variant: 'text-l-bold',
})
</script>

<template>
  <UiSkeleton v-if="props.loading" class="h-5 w-full" />
  <UITypography v-else :variant="props.variant">{{ formatPrice(props.value) }}</UITypography>
</template>
