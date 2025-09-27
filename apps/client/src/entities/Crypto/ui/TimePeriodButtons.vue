<script setup lang="ts">
import { ref } from 'vue'
import UiButton from '@/shared/ui/Button/Button.vue'
import { CRYPTO_TIME_DEFAULT, CRYPTO_TIME_PERIODS } from '../constants'
import type { CryptoTimePeriod } from '../types'
import UITypography from '@/shared/ui/Typography/UITypography.vue'

defineOptions({ name: 'TimePeriodButtons' })

const activePeriod = ref<CryptoTimePeriod>(CRYPTO_TIME_DEFAULT)

const selectPeriod = (period: CryptoTimePeriod) => {
  activePeriod.value = period
}
</script>

<template>
  <div class="flex gap-1">
    <UiButton
      v-for="period in CRYPTO_TIME_PERIODS"
      :key="period.queryParam"
      size="small"
      :variant="activePeriod === period.queryParam ? 'primary' : 'ghost'"
      @click="selectPeriod(period.queryParam)"
    >
      <UITypography variant="text-s">{{ period.label }}</UITypography>
    </UiButton>
  </div>
</template>
