<script setup lang="ts">
import IconButton from '@/shared/ui/IconButton/IconButton.vue'

defineOptions({ name: 'ShareIcon' })

export interface IShareIconProps {
  symbol: string
}

const props = defineProps<IShareIconProps>()

const shareUrl = async () => {
  const url = `${window.location.origin}/crypto/${props.symbol.toLowerCase()}`
  const shareData = {
    title: `Криптовалюта ${props.symbol.toUpperCase()}`,
    text: `Посмотрите актуальную цену и данные по ${props.symbol.toUpperCase()}`,
    url: url,
  }

  try {
    if (navigator.share) {
      await navigator.share(shareData)
      return
    }

    if (navigator.clipboard) {
      await navigator.clipboard.writeText(url)
      alert('Ссылка скопирована в буфер обмена!')
    } else {
      const textArea = document.createElement('textarea')
      textArea.value = url
      document.body.appendChild(textArea)
      textArea.select()
      document.execCommand('copy')
      document.body.removeChild(textArea)
      alert('Ссылка скопирована в буфер обмена!')
    }
  } catch (error) {
    console.error('Ошибка при попытке поделиться:', error)
    prompt('Ссылка для копирования:', url)
  }
}

const handleToggle = () => {
  shareUrl()
}
</script>

<template>
  <IconButton @click="handleToggle" size="sm" class="-ml-[8px]"> 🔗 </IconButton>
</template>
