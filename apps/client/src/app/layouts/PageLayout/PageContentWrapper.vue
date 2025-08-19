<script setup lang="ts">
defineOptions({ name: 'PageContentWrapper' })
</script>

<template>
  <div class="flex flex-col flex-1 p-6 pb-0">
    <!-- Крошки -->
    <div
      class="rounded-lg w-full h-full overflow-hidden"
      :style="{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)' }"
    >
      <slot />
    </div>
  </div>
</template>
