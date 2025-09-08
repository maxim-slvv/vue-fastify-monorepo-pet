<script setup lang="ts">
import HeaderNavLink from './HeaderNavLink.vue'
import { NAV_LINKS } from '../lib'

defineOptions({ name: 'HeaderNavigation' })
</script>

<template>
  <nav class="hidden md:flex items-center gap-5">
    <HeaderNavLink v-for="link in NAV_LINKS" :key="link" :label="link" />
  </nav>
</template>
