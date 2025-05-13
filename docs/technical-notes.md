# 🔍【實戰筆記】Vue SPA 下正確實作 GA4/Ads！從追蹤頁面到降低跳出率，一次搞懂！

> 分享如何在 Vue SPA 中實作一個模組化、穩定、支援 GA4 + Google Ads 的追蹤架構。

## 🎯 為什麼需要特別處理？

在 SPA（Single Page Application）架構下，頁面切換不會重新載入整個網頁，這導致兩個關鍵問題：

1. **頁面追蹤失效**：GA 預設在頁面重新載入時才發送 pageview，但 SPA 不重載
2. **跳出率計算不準**：由於只有首頁被追蹤，其他頁面都被忽略，導致跳出率異常高

## ✨ 解決方案：完整的 GA4 + Ads 追蹤模組

我們開發了一個完整的追蹤模組，提供以下功能：

- 自動頁面追蹤
- 事件追蹤
- 轉換追蹤
- 跳出率優化
- 開發/正式環境切換

### 1️⃣ 核心追蹤模組設計

```javascript
// src/utils/analytics.js
export const initGoogleAnalytics = () => {
  const isProd = import.meta.env.PROD
  const gaId = import.meta.env.VITE_GA_MEASUREMENT_ID
  const adsId = import.meta.env.VITE_ADS_ID

  if (isProd && gaId) {
    // 動態載入 GA 腳本
    const script = document.createElement('script')
    script.async = true
    script.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`
    document.head.appendChild(script)

    // 初始化 gtag
    window.dataLayer = window.dataLayer || []
    function gtag(){window.dataLayer.push(arguments)}
    window.gtag = gtag

    // 配置 GA4
    gtag('js', new Date())
    gtag('config', gaId, {
      send_page_view: false  // 停用自動頁面追蹤
    })

    // 配置 Google Ads（如果有）
    if (adsId) {
      gtag('config', adsId)
    }

    // 優化跳出率：追蹤使用者互動
    setTimeout(() => {
      document.addEventListener('click', () => {
        trackEvent('user_engagement', {
          event_category: 'engagement',
          event_label: 'click'
        })
      }, { once: true })
    }, 2000)
  }
}

// 頁面追蹤
export const trackPageView = (path, title) => {
  if (window.gtag && import.meta.env.PROD) {
    window.gtag('event', 'page_view', {
      page_path: path,
      page_title: title || document.title,
      page_location: window.location.href
    })
  }
}

// 事件追蹤
export const trackEvent = (name, params = {}) => {
  if (window.gtag && import.meta.env.PROD) {
    window.gtag('event', name, params)
  }
}

// 轉換追蹤
export const trackConversion = (name, params = {}) => {
  if (window.gtag && import.meta.env.PROD) {
    const adsId = import.meta.env.VITE_ADS_ID
    if (adsId) {
      window.gtag('event', 'conversion', {
        send_to: `${adsId}/${name}`,
        ...params
      })
    }
  }
}
```

### 2️⃣ 路由追蹤整合

```javascript
// src/router/index.js
import { trackPageView } from '@/utils/analytics'

const router = createRouter({
  // 路由配置...
})

router.afterEach((to, from) => {
  // 每次路由變化時追蹤頁面
  trackPageView(to.path, to.meta.title)
})

export default router
```

### 3️⃣ 在元件中使用

```javascript
// 任何 Vue 元件中
import { trackEvent, trackConversion } from '@/utils/analytics'

export default {
  setup() {
    const handleSubmit = async () => {
      // 追蹤表單提交事件
      await trackEvent('form_submit', {
        form_name: 'contact',
        form_type: 'inquiry'
      })

      // 追蹤 Google Ads 轉換
      await trackConversion('contact_form', {
        value: 100,
        currency: 'TWD'
      })
    }

    return { handleSubmit }
  }
}
```

## 💡 技術重點整理

| 功能 | 實作重點 | 效果 |
|------|---------|------|
| 動態載入 | 只在正式環境載入 GA 腳本 | 避免開發環境污染數據 |
| 自動頁面追蹤 | 使用 router.afterEach | 確保每個頁面都被追蹤 |
| 跳出率優化 | 追蹤點擊等互動事件 | 更準確的使用者行為分析 |
| 轉換追蹤 | 整合 Google Ads | 支援廣告效果分析 |

## 🚀 最佳實踐建議

1. **環境變數管理**
   ```env
   # .env.production
   VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX
   VITE_ADS_ID=AW-XXXXXXXXXX
   ```

2. **追蹤重要事件**
   - 頁面瀏覽
   - 按鈕點擊
   - 表單提交
   - 重要互動
   - 轉換目標

3. **效能優化**
   - 使用 async/defer 載入 GA 腳本
   - 實作事件節流
   - 避免重複追蹤

4. **除錯技巧**
   - 使用 Chrome GA Debug 擴充功能
   - 檢查 Network 面板中的 collect 請求
   - 在 GA4 DebugView 中即時驗證

## 🎉 總結

這套追蹤架構已在多個專案中驗證，能有效解決 SPA 的追蹤問題。關鍵成功因素：

1. 模組化設計，易於整合
2. 自動追蹤頁面瀏覽
3. 完整支援 GA4 和 Ads
4. 優化跳出率計算
5. 彈性的事件追蹤

## 📚 延伸閱讀

- [Google Analytics 4 官方文件](https://developers.google.com/analytics/devguides/collection/ga4)
- [Vue Router 官方文件](https://router.vuejs.org/)
- [Google Ads 轉換追蹤指南](https://support.google.com/google-ads/answer/6095821)

## 🔜 未來展望

- Nuxt 3 版本的實作指南
- React 版本的實作方式
- GA4 進階事件設計指南
- 自動化測試的整合方案

#Vue #SPA #GA4 #GoogleAnalytics #GoogleAds #前端開發 #技術筆記
