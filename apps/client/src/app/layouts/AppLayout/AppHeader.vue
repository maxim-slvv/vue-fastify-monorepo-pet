<script setup lang="ts">
import { defineComponent } from 'vue'
import Button from '@/shared/ui/Button/Button.vue'
import HeaderNavLink from '@/shared/ui/nav/HeaderNavLink.vue'
import ThemeSwitcher from '@/shared/components/ThemeSwitcher.vue'

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
  <header :style="{ backgroundColor: 'var(--surface)', borderBottom: '1px solid var(--border)' }">
    <div class="mx-auto flex items-center justify-between px-6 py-3">
      <div class="flex items-center gap-4">
        <div class="flex items-center gap-2 w-[226px] p-2">
          <i class="pi pi-th-large" style="color: var(--fg)" />
          <!-- TODO Нужно весь текст на странице обернуть в типографику для того что бы использовать цвета и размеры -->
          <span class="font-medium" :style="{ color: 'var(--fg)' }">Crypto Market</span>
        </div>

        <nav class="hidden md:flex items-center gap-5 text-sm" :style="{ color: 'var(--fg)' }">
          <HeaderNavLink v-for="link in navLinks" :key="link" :label="link" />
        </nav>
      </div>
      <ThemeSwitcher />
      <div class="flex items-center gap-4">
        <Button label="Wallet" />
        <i class="pi pi-search text-gray-600" />
        <i class="pi pi-bell text-gray-600" />
        <i class="pi pi-cog text-gray-600" />
      </div>
    </div>
  </header>
</template>
