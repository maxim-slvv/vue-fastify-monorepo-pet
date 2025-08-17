<script setup lang="ts">
import Button from 'primevue/button'
import { ref } from 'vue'

const isVisibleText = ref(true)

function handleChangeVisibilityText() {
  isVisibleText.value = !isVisibleText.value
}
</script>

<template>
  <div class="min-h-screen bg-gray-100 p-8">
    <div class="max-w-4xl mx-auto">
      <div class="bg-white rounded-lg shadow-lg p-6">
        <div class="flex flex-wrap gap-4">
          <Button label="Primary" class="p-button-primary" @click="handleChangeVisibilityText" />
          <Button label="Secondary" class="p-button-secondary" />
          <Button label="Success" class="p-button-success" />
          <Button label="Warning" class="p-button-warning" />
          <Button label="Danger" class="p-button-danger" />
        </div>

        <div v-if="isVisibleText" class="mt-4">Visible Text</div>
      </div>
    </div>
  </div>
</template>
