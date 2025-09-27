<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter, type RouteRecordNormalized } from 'vue-router'
import Subnav from '@/entities/Navigation/ui/Subnav.vue'

defineOptions({ name: 'SectionTabs' })

type NavMeta = { nav?: { group?: string; label?: string; icon?: string } }
type GroupMeta = { tabsGroup?: string }

const route = useRoute()
const router = useRouter()

const currentGroup = computed<string | null>(() => {
  const match = route.matched
    .slice()
    .reverse()
    .find((r) => (r.meta as GroupMeta).tabsGroup)
  return (match?.meta as GroupMeta)?.tabsGroup ?? null
})

const tabRoutes = computed<RouteRecordNormalized[]>(() => {
  const group = currentGroup.value
  if (!group) return []
  return router.getRoutes().filter((r) => (r.meta as NavMeta).nav?.group === group)
})

const items = computed(() =>
  tabRoutes.value.map((r) => ({
    key: r.name as string,
    label: (r.meta as NavMeta).nav?.label as string,
    icon: (r.meta as NavMeta).nav?.icon as string,
  })),
)

const active = computed({
  get: () => (route.name as string) ?? '',
  set: (name: string) => router.push({ name }),
})

const showBackButton = computed(() => {
  const standardPages = tabRoutes.value.map((r) => r.path.split('/').pop()).filter(Boolean)
  const currentPage = route.path.split('/').pop() || ''

  return /^\/crypto\/[^\/]+$/.test(route.path) && !standardPages.includes(currentPage)
})

const backButtonItems = computed(() => [
  {
    key: 'back',
    label: 'Back',
    icon: 'pi pi-arrow-left',
  },
])

const backActive = computed({
  get: () => (showBackButton.value ? 'back' : ''),
  set: (key: string) => {
    if (key === 'back') {
      router.back()
    }
  },
})
</script>

<template>
  <div class="flex gap-4 p-4">
    <Subnav v-if="showBackButton" v-model="backActive" :items="backButtonItems" />
    <Subnav v-if="currentGroup && items.length" v-model="active" :items="items" />
  </div>
  <slot />
</template>
