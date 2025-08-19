<script setup lang="ts">
import { defineComponent } from 'vue'

import AppHeader from './AppHeader.vue'
import AppNavbar from './AppNavbar.vue'
import AppAside from './AppAside.vue'
import PageContentWrapper from '../PageLayout/PageContentWrapper.vue'

defineComponent({
  name: 'AppLayout',
})
</script>
<template>
  <div
    class="flex flex-col h-screen w-screen"
    :style="{ backgroundColor: 'var(--bg)', color: 'var(--fg)' }"
  >
    <AppHeader />
    <div class="flex flex-1">
      <AppNavbar />
      <PageContentWrapper>
        <slot />
      </PageContentWrapper>
      <AppAside />
    </div>
  </div>
</template>
