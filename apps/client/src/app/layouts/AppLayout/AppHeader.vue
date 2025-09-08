<script setup lang="ts">
import { defineComponent } from 'vue'
import Button from '@/shared/ui/Button/Button.vue'
import HeaderBrand from '@/entities/Navigation/ui/HeaderBrand.vue'

import HeaderNavigation from '@/entities/Navigation/ui/HeaderNavigation.vue'
import HeaderIcon from '@/entities/Navigation/ui/HeaderIcon.vue'
import UiBadge from '@/shared/ui/Badge/UiBadge.vue'
import GroupAvatar from '@/shared/ui/ComposeInfo/GroupAvatar.vue'

defineComponent({
  name: 'AppHeader',
})

const users = [
  { outerUrlImage: 'https://primefaces.org/cdn/primevue/images/organization/walter.jpg' },
  { outerUrlImage: 'https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png' },
  { outerUrlImage: 'https://primefaces.org/cdn/primevue/images/avatar/asiyajavayant.png' },
  { outerUrlImage: 'https://primefaces.org/cdn/primevue/images/avatar/onyamalimba.png' },
  { outerUrlImage: 'https://primefaces.org/cdn/primevue/images/avatar/ionibowcher.png' },
]
</script>
<template>
  <header
    class="select-none"
    :style="{ backgroundColor: 'var(--surface)', borderBottom: '1px solid var(--border)' }"
  >
    <div class="mx-auto flex items-center justify-between px-6">
      <div class="flex items-center">
        <HeaderBrand width="240px" />
        <Button label="Wallet" class="mr-4" size="small" variant="primary" />
        <HeaderNavigation />
      </div>

      <div class="flex items-center gap-4">
        <GroupAvatar :users="users" :max-visible="4" size="md" />

        <HeaderIcon icon="pi-search" />
        <UiBadge dot overlay severity="danger">
          <HeaderIcon icon="pi-bell" />
        </UiBadge>
        <HeaderIcon icon="pi-cog" />
      </div>
    </div>
  </header>
</template>
