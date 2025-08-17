<script setup lang="ts">
import { defineComponent } from 'vue'

import AppHeader from './AppHeader.vue'
import AppNavbar from './AppNavbar.vue'
import AppAside from './AppAside.vue'

defineComponent({
  name: 'AppLayout',
})
</script>
<template>
  <div class="flex flex-col h-screen w-screen">
    <AppHeader />
    <div class="flex flex-1">
      <AppNavbar />
      <div class="flex flex-1 p-6 pb-0">
        <div class="border border-gray-200 rounded-lg p-4 w-full bg-white">
          <slot />
        </div>
      </div>
      <AppAside />
    </div>
  </div>
</template>
