<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/img/logo.webp" style="width: 100px; height: auto; margin-bottom: 20px;">
    <h1>Vue SPA GA4/Ads 追蹤展示</h1>
    <p>
      歡迎來到我們的 Vue 單頁應用程式 (SPA) 展示！<br>
      這個應用程式旨在示範如何在 Vue SPA 中有效地實作 Google Analytics 4 (GA4) 和 Google Ads 追蹤。
    </p>
    <p>
      在 SPA 中，傳統的頁面追蹤方式可能會失效，因為頁面不會完整重新載入。我們將展示如何：
    </p>
    <ul>
      <li>自動追蹤路由變化 (虛擬頁面瀏覽)</li>
      <li>精確記錄使用者互動事件</li>
      <li>優化跳出率的計算</li>
      <li>以及更多 GA4 與 Ads 整合的最佳實踐</li>
    </ul>
    <p>
      請在應用程式中導航，並觀察開發者工具中的網路請求 (過濾 "collect") 或使用 GA Debug Chrome 擴充功能來查看追蹤事件的發送情況。
    </p>
    <div class="event-test-section">
      <h2>測試自訂事件追蹤：</h2>
      <p>點擊下方按鈕，將會觸發一個名為 'button_click' 的 GA4 事件，並帶有相關參數。</p>
      <button @click="handleClick">點我測試事件追蹤</button>
    </div>
    <p>
      想要了解更多或有任何疑問？請前往我們的 <router-link to="/contact">聯絡我們</router-link> 頁面，或查看 <router-link to="/about">關於我們</router-link> 了解專案詳情。
    </p>
  </div>
</template>

<script setup>
import { trackEvent } from '../utils/analytics'

const handleClick = () => {
  trackEvent('button_click', {
    button_name: 'home_test_button',
    page_location: '/',
    action_description: 'User clicked the test event button on the homepage'
  })
  alert('已觸發 "button_click" 事件！請檢查您的 GA4 DebugView 或瀏覽器開發者工具。')
}
</script>

<style scoped>
.home {
  text-align: center;
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
}
ul {
  list-style-type: none;
  padding: 0;
  margin-bottom: 20px;
}
li {
  margin: 10px 0;
  line-height: 1.6;
}
a {
  color: #42b983;
  text-decoration: none;
}
a:hover {
  text-decoration: underline;
}
p {
  line-height: 1.6;
  margin-bottom: 15px;
}
.event-test-section {
  margin-top: 30px;
  margin-bottom: 30px;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #f9f9f9;
}
.event-test-section h2 {
  margin-top: 0;
}
button {
  background-color: #42b983;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s ease;
}
button:hover {
  background-color: #36a372;
}
</style>
