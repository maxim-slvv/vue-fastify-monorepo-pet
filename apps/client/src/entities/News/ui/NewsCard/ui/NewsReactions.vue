<script setup lang="ts">
import { defineProps } from 'vue'
import UiPicture from '@/shared/ui/Picture/UiPicture.vue'
import UITypography from '@/shared/ui/Typography/UITypography.vue'

type Reaction = { type: 'LIKE' | 'GOOD' | 'FIRE' | 'BULL' | 'CELEBRATION' | 'FOMO'; count: number }

const props = defineProps<{ reactions?: Reaction[] }>()

const borderClassByType: Record<Reaction['type'], string> = {
  LIKE: 'border-red-500',
  GOOD: 'border-emerald-500',
  FIRE: 'border-orange-500',
  BULL: 'border-green-500',
  CELEBRATION: 'border-gold-500',
  FOMO: 'border-blue-500',
}
</script>

<template>
  <div v-if="props.reactions?.length" class="flex items-center gap-1.5 flex-wrap select-none">
    <template v-for="r in props.reactions" :key="r.type">
      <span
        class="inline-flex items-center gap-1 rounded-full px-2 border"
        :class="borderClassByType[r.type]"
      >
        <UiPicture
          :src="`/cdn/svg/${r.type}.svg`"
          width="1rem"
          height="1rem"
          fit="contain"
          class="cursor-pointer"
        />
        <UITypography variant="text-xs-bold" tag="span">{{ r.count }}</UITypography>
      </span>
    </template>
  </div>
</template>
