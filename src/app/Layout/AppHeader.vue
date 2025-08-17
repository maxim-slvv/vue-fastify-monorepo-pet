<script setup lang="ts">
import { defineComponent } from 'vue'
import Button from '@/shared/ui/Button/Button.vue'

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
  <header class="bg-white border-b border-gray-200">
    <div class="mx-auto flex items-center justify-between px-6 py-3">
      <div class="flex items-center gap-4">
        <div class="flex items-center gap-2 w-[226px] p-2">
          <i class="pi pi-th-large text-gray-500" />
          <span class="text-gray-800 font-medium">Crypto Market</span>
        </div>

        <nav class="hidden md:flex items-center gap-5 text-sm text-gray-600">
          <a
            v-for="link in navLinks"
            :key="link"
            href="#"
            class="hover:text-gray-900 flex items-center gap-1"
          >
            {{ link }}
          </a>
        </nav>
      </div>

      <div class="flex items-center gap-4">
        <Button label="Wallet" />
        <i class="pi pi-search text-gray-600" />
        <i class="pi pi-bell text-gray-600" />
        <i class="pi pi-cog text-gray-600" />
      </div>
    </div>
  </header>
</template>
