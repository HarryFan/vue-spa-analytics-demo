import { createRouter, createWebHistory } from 'vue-router'
import { trackPageView } from '../utils/analytics'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue'),
      meta: {
        title: '首頁 | GA Router Demo'
      }
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
      meta: {
        title: '關於我們 | GA Router Demo'
      }
    },
    {
      path: '/contact',
      name: 'contact',
      component: () => import('../views/ContactView.vue'),
      meta: {
        title: '聯絡我們 | GA Router Demo'
      }
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else if (to.hash) {
      return { el: to.hash }
    } else {
      return { top: 0 }
    }
  }
})

// 動態設定標題與追蹤頁面瀏覽
router.afterEach((to) => {
  // Google Analytics 頁面追蹤
  trackPageView(to.fullPath)
  
  // 設定頁面標題
  document.title = to.meta?.title || 'GA Router Demo'
})

export default router
