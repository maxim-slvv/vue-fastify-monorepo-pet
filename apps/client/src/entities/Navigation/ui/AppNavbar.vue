<script setup lang="ts">
import { defineComponent, ref } from 'vue'
import { useRouter, useRoute, type RouteRecordNormalized } from 'vue-router'
import NavbarLink from '@/entities/Navigation/ui/NavbarLink.vue'
import LayoutBlock from '@/shared/ui/Block/LayoutBlock.vue'

defineComponent({ name: 'AppNavbar' })

const router = useRouter()
const route = useRoute()

type SidebarMeta = { sidebar?: { label?: string; icon?: string; order?: number } }

const links = ref(
  router
    .getRoutes()
    .filter((r: RouteRecordNormalized) => (r.meta as SidebarMeta).sidebar)
    .sort((a, b) => {
      const oa = (a.meta as SidebarMeta).sidebar?.order ?? Number.POSITIVE_INFINITY
      const ob = (b.meta as SidebarMeta).sidebar?.order ?? Number.POSITIVE_INFINITY
      return oa - ob
    })
    .map((r) => ({
      label: (r.meta as SidebarMeta).sidebar?.label ?? r.path,
      to: r.path,
      icon: (r.meta as SidebarMeta).sidebar?.icon ?? 'pi pi-angle-right',
    })),
)

const isActive = (to: string): boolean => route.path.startsWith(to)

function navigate(to: string): void {
  router.push(to)
}
</script>
<template>
  <LayoutBlock tag="aside" border="right" class="w-64 overflow-y-auto">
    <nav class="p-4 space-y-2">
      <NavbarLink
        v-for="link in links"
        :key="link.to"
        :label="link.label"
        :icon="link.icon"
        :active="isActive(link.to)"
        @select="navigate(link.to)"
      />
    </nav>
  </LayoutBlock>
</template>
