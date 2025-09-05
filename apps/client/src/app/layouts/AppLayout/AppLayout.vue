<script setup lang="ts">
import { defineComponent } from 'vue'

import AppNavbar from '@/entities/Navigation/ui/AppNavbar.vue'
import AppHeader from './AppHeader.vue'
import AppAside from './AppAside.vue'
import PageContentWrapper from '../PageLayout/PageContentWrapper.vue'

defineComponent({
  name: 'AppLayout',
})
</script>
<template>
  <div
    :style="{ backgroundColor: 'var(--bg)', color: 'var(--fg)' }"
    class="flex flex-col h-screen w-screen"
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
