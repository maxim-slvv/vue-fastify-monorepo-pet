<script setup lang="ts">
import { defineComponent } from 'vue'
import Button from '@/shared/ui/Button/Button.vue'
import HeaderNavLink from '@/shared/ui/nav/HeaderNavLink.vue'
import ThemeSwitcher from '@/shared/ui/ThemeSwitcher/ThemeSwitcher.vue'
import { blockLayoutStyles } from '@/shared/styles/in-js-styles'

defineComponent({
  name: 'AppHeader',
})

const navLinks: string[] = [
  'Cryptocurrencies',
  'Markets',
  'Trade',
  'NFT',
  'Derivatives',
  'Finance',
  'Calendars',
]
</script>
<template>
  <header :style="{ ...blockLayoutStyles({ border: 'bottom' }) }">
    <div class="mx-auto flex items-center justify-between px-6 py-3">
      <div class="flex items-center">
        <div class="flex items-center gap-2 w-[260px] p-2">
          <i class="pi pi-th-large" style="color: var(--fg)" />
          <Typography class="text-l-bold">Crypto Market</Typography>
          <ThemeSwitcher class="mt-1" />
        </div>
        <nav class="hidden md:flex items-center gap-5">
          <HeaderNavLink v-for="link in navLinks" :key="link" :label="link" />
        </nav>
      </div>
      <div class="flex items-center gap-4">
        <Button label="Wallet" />
        <i class="pi pi-search text-gray-600" style="color: var(--fg)" />
        <i class="pi pi-bell text-gray-600" style="color: var(--fg)" />
        <i class="pi pi-cog text-gray-600" style="color: var(--fg)" />
      </div>
    </div>
  </header>
</template>
