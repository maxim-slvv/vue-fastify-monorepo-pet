<script setup lang="ts">
import SectionTabs from '@/entities/Navigation/ui/SectionTabs.vue'
import LayoutBlock from '@/shared/ui/Block/LayoutBlock.vue'
defineOptions({ name: 'PageContentWrapper' })
</script>

<template>
  <div class="flex flex-col flex-1 p-4 pb-0">
    <LayoutBlock border="all" class="rounded-lg w-full h-full overflow-hidden">
      <SectionTabs>
        <slot />
      </SectionTabs>
    </LayoutBlock>
  </div>
</template>
