import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { initGoogleAnalytics } from './utils/analytics'

const app = createApp(App)

// 僅在 production 環境初始化 GA
if (import.meta.env.PROD) {
  initGoogleAnalytics()
}

app.use(router)
app.mount('#app')
