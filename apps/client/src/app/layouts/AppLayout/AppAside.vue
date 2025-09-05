<script setup lang="ts">
import { defineComponent } from 'vue'
import LayoutBlock from '@/shared/ui/Block/LayoutBlock.vue'

defineComponent({ name: 'AppAside' })
</script>
<template>
  <LayoutBlock border="left" class="w-100">
    <div class="p-4 flex flex-col">
      <Typography class="text-m-bold">Courses</Typography>
      <Typography class="text-xs">Current courses</Typography>
    </div>
  </LayoutBlock>
</template>
