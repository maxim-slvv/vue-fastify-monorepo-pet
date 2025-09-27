<script setup lang="ts">
import UITypography from '@/shared/ui/Typography/UITypography.vue'
import { formatPrice } from '@/shared/utils'

defineOptions({ name: 'PriceMinMaxDisplay' })

export interface IPriceMinMaxProps {
  min?: string | number
  max?: string | number
}

const { min, max } = defineProps<IPriceMinMaxProps>()
</script>

<template>
  <div class="flex items-center gap-4">
    <div class="flex items-center gap-1">
      <div class="w-2 h-2 rounded-full bg-red-500"></div>
      <UITypography variant="text-s" class="text-gray-600"> Min: </UITypography>
      <UITypography variant="text-s" class="font-medium">
        {{ formatPrice(min) }}
      </UITypography>
    </div>

    <div class="flex items-center gap-1">
      <div class="w-2 h-2 rounded-full bg-green-500"></div>
      <UITypography variant="text-s" class="text-gray-600"> Max: </UITypography>
      <UITypography variant="text-s" class="font-medium">
        {{ formatPrice(max) }}
      </UITypography>
    </div>
  </div>
</template>
