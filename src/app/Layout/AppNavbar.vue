<script setup lang="ts">
import { defineComponent, ref } from 'vue'

defineComponent({
  name: 'AppNavbar',
})
const links = ref([
  { label: 'Main Page', to: '/', icon: 'pi pi-home', active: true },
  { label: 'Portfolio', to: '/portfolio', icon: 'pi pi-briefcase', active: false },
  { label: 'Trade', to: '/trade', icon: 'pi pi-refresh', active: false },
  { label: 'News Person', to: '/news', icon: 'pi pi-th-large', active: false },
  { label: 'Notifications', to: '/notifications', icon: 'pi pi-bell', active: false },
  { label: 'Awards Center', to: '/awards', icon: 'pi pi-thumbs-up', active: false },
  { label: 'Job Center', to: '/jobs', icon: 'pi pi-clipboard', active: false },
  { label: 'Referral Link', to: '/ref', icon: 'pi pi-user-plus', active: false },
  { label: 'Development', to: '/dev', icon: 'pi pi-cog', active: false },
])

function setActive(selected: { label: string; to: string; icon: string; active: boolean }): void {
  links.value.forEach((link) => {
    link.active = link === selected
  })
}
</script>
<template>
  <aside class="w-64 bg-white/80 border-r border-gray-200">
    <nav class="p-4 space-y-2">
      <a
        v-for="link in links"
        :key="link.to"
        href="#"
        @click.prevent="setActive(link)"
        class="flex items-center gap-3 px-4 py-3 rounded-lg transition-colors hover:bg-gray-100"
      >
        <i :class="[link.icon, link.active ? 'text-blue-600' : 'text-gray-400']" class="text-xl" />
        <span :class="link.active ? 'text-blue-700 font-semibold' : 'text-gray-600 font-medium'">
          {{ link.label }}
        </span>
        <i class="pi pi-angle-right text-gray-300 ml-auto" />
      </a>
    </nav>
  </aside>
</template>
