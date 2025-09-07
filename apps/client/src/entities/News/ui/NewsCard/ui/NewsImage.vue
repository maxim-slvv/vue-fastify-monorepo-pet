<script setup lang="ts">
import { defineProps } from 'vue'
import UiPicture from '@/shared/ui/Picture/UiPicture.vue'

const props = defineProps<{ src?: string }>()
</script>

<template>
  <div
    class="w-full h-40 overflow-hidden rounded-md border"
    :style="{ borderColor: 'var(--border)' }"
  >
    <UiPicture :src="props.src" class="w-full h-full" fit="cover" />
  </div>
</template>
