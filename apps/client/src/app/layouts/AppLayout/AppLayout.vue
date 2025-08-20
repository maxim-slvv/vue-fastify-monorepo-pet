<script setup lang="ts">
import { defineComponent } from 'vue'

import AppHeader from './AppHeader.vue'
import AppNavbar from './AppNavbar.vue'
import AppAside from './AppAside.vue'
import PageContentWrapper from '../PageLayout/PageContentWrapper.vue'
import { outerLayoutStyles } from '@/shared/styles/in-js-styles'

defineComponent({
  name: 'AppLayout',
})
</script>
<template>
  <div :style="{ ...outerLayoutStyles }" class="flex flex-col h-screen w-screen">
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
