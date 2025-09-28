<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import UiButton from '@/shared/ui/Button/Button.vue'
import { CRYPTO_TIME_DEFAULT, CRYPTO_TIME_PERIODS } from '../constants'
import type { CryptoTimePeriod } from '../types'

defineOptions({ name: 'TimePeriodButtons' })

const route = useRoute()
const router = useRouter()

const activePeriod = computed({
  get: () => (route.query.period as CryptoTimePeriod) || CRYPTO_TIME_DEFAULT,
  set: (period: CryptoTimePeriod) => {
    router.push({
      query: {
        ...route.query,
        period: period !== CRYPTO_TIME_DEFAULT ? period : undefined,
      },
    })
  },
})

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
      :variant="activePeriod === period.queryParam ? 'primary' : 'secondary'"
      @click="selectPeriod(period.queryParam)"
    >
      {{ period.label }}
    </UiButton>
  </div>
</template>
