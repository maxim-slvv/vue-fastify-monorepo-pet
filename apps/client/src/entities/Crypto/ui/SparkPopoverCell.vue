<script setup lang="ts">
import UiPopover from '@/shared/ui/Popover/Popover.vue'
import SparklineCell from '@/entities/Crypto/ui/SparklineCell.vue'
import CoinCard from '@/entities/Crypto/ui/CoinCard.vue'

defineOptions({ name: 'SparkPopoverCell' })

const props = withDefaults(
  defineProps<{
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    row?: any
    loading?: boolean
    width?: number
    height?: number
  }>(),
  {
    width: 140,
    height: 32,
  },
)
</script>

<template>
  <div class="flex justify-end">
    <SparklineCell
      v-if="props.loading"
      :loading="true"
      :width="props.width"
      :height="props.height"
      :showPercent="false"
      :data="[]"
      :direction="'up'"
    />
    <UiPopover v-else :width="500" :height="300">
      <SparklineCell
        :data="props.row?.spark"
        :direction="props.row?.ch7d_direction"
        :width="props.width"
        :height="props.height"
      />
      <template #popover>
        <CoinCard :key="props.row?.symbol" :row="props.row" />
      </template>
    </UiPopover>
  </div>
</template>
