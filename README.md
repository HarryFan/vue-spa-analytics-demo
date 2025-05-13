# Vue SPA Analytics Demo 🎯

> 實用的 Vue SPA GA4/Ads 追蹤示範專案，從基礎到進階，一次完整展示！

[![Vue Version](https://img.shields.io/badge/Vue-3.x-brightgreen.svg)](https://vuejs.org/)
[![GA4 Ready](https://img.shields.io/badge/GA4-Ready-blue.svg)](https://analytics.google.com/)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/your-username/vue-spa-analytics-demo/blob/main/LICENSE)

在 Vue 單頁應用（SPA）中實作 Google Analytics 4 (GA4) 和 Google Ads 追蹤的最佳實踐。提供完整的程式碼範例、互動式展示和詳盡的技術文件。

## 🌟 為什麼需要特別處理？

SPA 應用面臨的追蹤挑戰：
- 頁面不重新載入，傳統追蹤碼失效
- 路由變化不會觸發 pageview
- 需要手動處理虛擬頁面瀏覽
- 跳出率計算不準確

## ✨ 解決方案特色

- 🚀 自動追蹤所有路由變化
- 📊 精確的頁面瀏覽數據
- 💡 智慧型事件追蹤
- ⚡️ 效能優化的非同步載入
- 🛡️ 開發環境自動禁用
- 📱 支援多平台轉換追蹤

## 📦 安裝

### 方法一：使用 npm
```bash
npm install vue-spa-analytics
```

### 方法二：直接使用範例專案
```bash
# 複製專案
git clone https://github.com/your-username/vue-spa-analytics.git
cd vue-spa-analytics

# 安裝依賴
npm install

# 啟動開發伺服器
npm run dev
```

## 🚀 範例展示

本專案包含三個互動式示範頁面：

1. **首頁**
   - 基本的頁面瀏覽追蹤
   - 事件追蹤示範按鈕
   - 跳出率優化展示

2. **關於我們**
   - 專案特色說明
   - 技術架構簡介
   - 最佳實踐建議

3. **聯絡我們**
   - 表單轉換追蹤示範
   - 互動事件追蹤
   - 完整的 GA4 整合

使用 Chrome 開發者工具或 GA Debug 擴充功能可以即時觀察追蹤效果。

##  配置與使用

### 1. 環境設定

在專案根目錄建立下列環境設定檔案：

**.env.production**
```env
# Google Analytics 4 設定
VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX

# Google Ads 設定（選用）
VITE_ADS_ID=AW-XXXXXXXXXX

# 其他追蹤設定（選用）
VITE_ENABLE_DEBUG=false
VITE_TRACK_OUTBOUND_LINKS=true
```

### 2. 引入追蹤模組

```javascript
// main.js
import { createApp } from 'vue'
import { initGoogleAnalytics } from 'vue-spa-analytics'

const app = createApp(App)

// 初始化 GA4
initGoogleAnalytics({
  app,                    // Vue 應用實例
  router,                 // Vue Router 實例
  debug: true,            // 開發模式下啟用診斷
  trackOutboundLinks: true // 追蹤外部連結點擊
})

app.mount('#app')
```

### 3. 使用追蹤功能

```javascript
// 在任何元件中使用
import { useAnalytics } from 'vue-spa-analytics'

export default {
  setup() {
    const { trackEvent, trackConversion } = useAnalytics()

    const handleClick = () => {
      trackEvent('button_click', {
        button_id: 'cta_button',
        button_text: '立即試用'
      })
    }

    const handleFormSubmit = () => {
      trackConversion('form_submit', {
        form_id: 'contact_form',
        form_type: 'contact'
      })
    }

    return {
      handleClick,
      handleFormSubmit
    }
  }
}
```

##  核心功能實作

### 1. 自動頁面追蹤
`router/index.js` 自動處理路由變化：
```javascript
router.afterEach((to) => {
  trackPageView(to.fullPath)
})
```

```javascript
// 在 router/index.js 中
import { useAnalytics } from 'vue-spa-analytics'

const router = createRouter({
  // 路由設定...
})

const { trackPageView } = useAnalytics()

// 自動追蹤頁面瀏覽
router.afterEach((to, from) => {
  trackPageView({
    path: to.path,
    title: to.meta.title,
    referrer: from.path,
    // 自訂維度
    page_category: to.meta.category,
    page_section: to.meta.section
  })
})
```

### 2. 互動事件追蹤

```javascript
// 在任何元件中
import { useAnalytics } from 'vue-spa-analytics'

export default {
  setup() {
    const { trackEvent } = useAnalytics()

    // 追蹤複雜互動
    const trackComplexInteraction = async () => {
      await trackEvent('user_interaction', {
        action_type: 'complex_action',
        interaction_time: Date.now(),
        user_state: 'logged_in',
        custom_metric: 42
      })
    }

    return { trackComplexInteraction }
  }
}
```

### 3. 高級轉換追蹤

```javascript
import { useAnalytics } from 'vue-spa-analytics'

export default {
  setup() {
    const { trackConversion } = useAnalytics()

    // 追蹤多階段轉換
    const trackMultiStepConversion = async (step) => {
      await trackConversion('multi_step_form', {
        step_number: step,
        form_id: 'registration',
        conversion_value: 100,
        currency: 'TWD',
        is_first_time: true
      })
    }

    return { trackMultiStepConversion }
  }
}
```

## 🔧 常見問題與解決方案

### 1. 追蹤不生效
- 確認 GA4 測量 ID 設定正確
- 檢查是否有啟用 Ad Blocker
- 使用 Chrome GA Debug 擴充功能鑑別問題

### 2. 路由變化不追蹤
- 確認 `router.afterEach` 配置正確
- 檢查 Vue Router 模式設定
- 確認頁面標題更新機制

### 3. 效能優化
- 使用事件節流
- 避免重複追蹤
- 最佳化自訂維度數量

## 🔍 追蹤效果驗證

### 1. 開發者工具

使用 Chrome DevTools 驗證追蹤資料發送：

1. 開啟 Chrome DevTools (F12)
2. 選擇 Network 頁籤
3. 篩選 `collect` 請求
4. 檢查請求參數與回應

### 2. GA4 DebugView

即時驗證追蹤效果：

1. 開啟 [GA4 DebugView](https://analytics.google.com/)
2. 在網站上啟用除錯模式
3. 即時觀察事件與轉換

### 3. Google Tag Assistant

使用 [Tag Assistant](https://chrome.google.com/webstore/detail/tag-assistant-legacy-by-g/kejbdjndbnbjgmefkgdddjlbokphdefk) 擴充功能：

1. 安裝擴充功能
2. 啟用記錄模式
3. 驗證標籤實作

## 💪 貢獻與支援

### 報告問題

1. 開啟 [Issues](https://github.com/your-username/vue-spa-analytics/issues) 頁面
2. 點擊 "New Issue"
3. 描述問題與重現步驟

### 提交貢獻

1. Fork 專案
2. 建立功能分支
3. 提交更改
4. 發起 Pull Request

## 📃 授權與講解

### MIT License

Copyright (c) 2024 vue-spa-analytics

本軟體已由 MIT 授權條款釋出。詳細資訊請參考 [LICENSE](LICENSE) 檔案。

### 免責聲明

本專案與 Google 無關，並非 Google 官方產品。Google Analytics、Google Ads 及相關商標為 Google LLC 所有。
```javascript
trackEvent('user_behavior', {
  action_type: 'scroll_depth',
  value: 100,  // 捲動達到頁面底部
  user_type: 'registered'
})
```

## 📊 最佳實踐建議

1. **效能優化**
   - 使用非同步載入
   - 延遲追蹤非關鍵事件
   - 批次處理多個事件

2. **資料品質**
   - 統一事件命名規則
   - 定期驗證追蹤資料
   - 建立事件追蹤清單

3. **維護管理**
   - 文件化所有追蹤事件
   - 定期檢查追蹤效果
   - 及時更新追蹤程式

## 🚨 常見問題排解

1. **事件沒有觸發**
   - 確認 GA ID 正確性
   - 檢查環境變數設定
   - 驗證 gtag 是否載入

2. **數據不準確**
   - 檢查重複觸發
   - 確認事件參數格式
   - 測試不同裝置環境

## 📚 參考資源

- [GA4 官方開發指南](https://developers.google.com/analytics/devguides/collection/ga4)
- [Google Ads 轉換追蹤](https://support.google.com/google-ads/answer/6095821)
- [Vue Router 官方文件](https://router.vuejs.org/)

## 🔄 更新日誌

### v1.0.0 (2025-05-13)
- 初始版本發布
- 完整 SPA 追蹤解決方案
- 支援 GA4 和 Google Ads

---

## 👨‍💻 技術支援

如有問題或建議，歡迎提交 Issue 或 PR！

---

Happy Tracking! 🎯✨
