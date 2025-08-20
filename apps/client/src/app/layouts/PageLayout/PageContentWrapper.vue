<script setup lang="ts">
import { blockLayoutStyles } from '@/shared/styles/in-js-styles'

defineOptions({ name: 'PageContentWrapper' })
</script>

<template>
  <div class="flex flex-col flex-1 p-6 pb-0">
    <!-- Крошки -->
    <div
      :style="{ ...blockLayoutStyles({ border: 'all' }) }"
      class="rounded-lg w-full h-full overflow-hidden"
    >
      <slot />
    </div>
  </div>
</template>
