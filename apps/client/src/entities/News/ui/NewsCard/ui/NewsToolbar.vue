<script setup lang="ts">
import { computed, defineProps } from 'vue'
import UiPicture from '@/shared/ui/Picture/UiPicture.vue'
import UITypography from '@/shared/ui/Typography/UITypography.vue'

type Toolbar = { views?: string | number; comments?: number; reposts?: number; smiles?: number }

const props = defineProps<{ toolbar?: Toolbar }>()

const items = computed(() => [
  { icon: 'VIEW.svg', value: props.toolbar?.views },
  { icon: 'MESSAGE.svg', value: props.toolbar?.comments ?? 0 },
  { icon: 'REPOST.svg', value: props.toolbar?.reposts ?? 0 },
  { icon: 'SMILE.svg', value: props.toolbar?.smiles ?? 0 },
])
</script>

<template>
  <div v-if="props.toolbar" class="flex items-center gap-5 justify-between select-none">
    <span v-for="(it, idx) in items" :key="idx" class="inline-flex items-center gap-1">
      <UiPicture
        :src="`/cdn/svg/${it.icon}`"
        width="1rem"
        height="1rem"
        fit="contain"
        class="cursor-pointer"
      />
      <UITypography tag="span" class="text-m">{{ it.value }}</UITypography>
    </span>
  </div>
</template>
