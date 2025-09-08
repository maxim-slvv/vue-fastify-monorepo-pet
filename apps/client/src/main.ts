import { createApp } from 'vue'
import { VueQueryPlugin } from '@tanstack/vue-query'
import App from './app/App.vue'
import PrimeVue from 'primevue/config'
import Aura from '@primevue/themes/aura'
import 'primeicons/primeicons.css'
import './shared/styles/index.css'
import { useTheme } from '@/shared/lib/theme/useTheme'
import router from '@/app/router'
import { queryClient } from '@/shared/api'

const app = createApp(App)

app.use(VueQueryPlugin, { queryClient })
app.use(PrimeVue, {
  theme: {
    preset: Aura,
    options: { darkModeSelector: 'html.dark' },
  },
})

app.use(router)

useTheme().init()

app.mount('#app')
