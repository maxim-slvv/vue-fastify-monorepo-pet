<script setup lang="ts">
import SectionTabs from '@/entities/Navigation/ui/SectionTabs.vue'
import LayoutBlock from '@/shared/ui/Block/LayoutBlock.vue'
defineOptions({ name: 'PageContentWrapper' })
</script>

<template>
  <div class="flex flex-col flex-1 p-3 min-w-0">
    <LayoutBlock border="all" class="overflow-x-auto">
      <SectionTabs>
        <slot />
      </SectionTabs>
    </LayoutBlock>
  </div>
</template>
