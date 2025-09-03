<script setup lang="ts">
import { defineComponent } from 'vue'
import { blockLayoutStyles } from '@/shared/styles/in-js-styles'

defineComponent({
  name: 'AppAside',
})
</script>
<template>
  <div
    class="w-100"
    :style="{
      ...blockLayoutStyles({ border: 'left' }),
    }"
  >
    <div class="p-4 flex flex-col">
      <Typography class="text-m-bold">Courses</Typography>
      <Typography class="text-xs">Current courses</Typography>
    </div>
  </div>
</template>
