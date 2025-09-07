<script setup lang="ts">
import UiPopover from '@/shared/ui/Popover/Popover.vue'
import SparklineCell from '@/entities/Crypto/ui/SparklineCell.vue'
import CoinCard from '@/entities/Crypto/ui/CoinCard.vue'
import type { ICryptoServerRow } from '@/entities/Crypto/types'

defineOptions({ name: 'SparkPopoverCell' })

export interface ISparkPopoverCellProps {
  row?: ICryptoServerRow
  loading?: boolean
  width?: number
  height?: number
}

const props = withDefaults(defineProps<ISparkPopoverCellProps>(), {
  width: 140,
  height: 32,
})
</script>

<template>
  <div class="flex justify-start">
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
        :data="props.row?.spark ?? []"
        :direction="props.row?.ch7d_direction ?? 'up'"
        :width="props.width"
        :height="props.height"
      />
      <template #popover>
        <CoinCard v-if="props.row" :key="props.row.symbol" :row="props.row" />
      </template>
    </UiPopover>
  </div>
</template>
