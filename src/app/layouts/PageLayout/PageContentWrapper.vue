<script setup lang="ts">
defineOptions({ name: 'PageContentWrapper' })
</script>

<template>
  <div class="flex flex-col flex-1 p-6 pb-0">
    Крошки
    <div class="border border-gray-200 rounded-lg w-full h-full overflow-hidden bg-white">
      <slot />
    </div>
  </div>
</template>
