<script setup lang="ts">
import { defineComponent } from 'vue'

defineComponent({
  name: 'AppAside',
})
</script>
<template>
  <div
    class="w-100"
    :style="{
      backgroundColor: 'var(--surface)',
      borderLeft: '1px solid var(--border)',
      color: 'var(--fg)',
    }"
  >
    <div class="p-4 flex flex-col">
      <Typography class="text-m-bold">Courses</Typography>
      <Typography class="text-xs">Current courses</Typography>
    </div>
  </div>
</template>
