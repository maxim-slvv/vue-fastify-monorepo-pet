<script setup lang="ts">
import { blockLayoutStyles } from '@/shared/styles/in-js-styles'
import SectionTabs from '@/entities/Navigation/ui/SectionTabs.vue'
defineOptions({ name: 'PageContentWrapper' })
</script>

<template>
  <div class="flex flex-col flex-1 p-4 pb-0">
    <div
      :style="{ ...blockLayoutStyles({ border: 'all' }) }"
      class="rounded-lg w-full h-full overflow-hidden"
    >
      <SectionTabs>
        <slot />
      </SectionTabs>
    </div>
  </div>
</template>
