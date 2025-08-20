import { createApp } from 'vue'
import App from './app/App.vue'
import PrimeVue from 'primevue/config'
import Aura from '@primevue/themes/aura'
import 'primeicons/primeicons.css'
import './shared/styles/index.css'
import { useTheme } from '@/shared/lib/theme/useTheme'

const app = createApp(App)

app.use(PrimeVue, {
  theme: {
    preset: Aura,
    options: { darkModeSelector: 'html.dark' },
  },
})

useTheme().init()

app.mount('#app')
