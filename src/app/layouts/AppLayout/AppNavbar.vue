<script setup lang="ts">
import { defineComponent, ref } from 'vue'
import NavbarLink from '@/shared/ui/nav/NavbarLink.vue'

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
      <NavbarLink
        v-for="link in links"
        :key="link.to"
        :label="link.label"
        :icon="link.icon"
        :active="link.active"
        @select="setActive(link)"
      />
    </nav>
  </aside>
</template>
