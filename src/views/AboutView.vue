<template>
  <div class="about">
    <h1>關於我們 - Vue SPA GA4/Ads 追蹤方案</h1>
    <p>
      本專案旨在提供一個在 Vue 單頁應用程式 (SPA) 中實作 Google Analytics 4 (GA4) 和 Google Ads 追蹤的完整解決方案。
    </p>
    <p>
      我們了解在 SPA 環境下進行準確的網站分析與廣告成效追蹤所面臨的挑戰，例如：
    </p>
    <ul>
      <li>路由變化時，傳統追蹤碼無法自動觸發頁面瀏覽。</li>
      <li>需要手動設定虛擬頁面瀏覽 (Virtual Pageviews)。</li>
      <li>跳出率計算可能不準確。</li>
      <li>確保所有使用者互動都能被正確捕捉。</li>
    </ul>
    <h2>我們的解決方案特色：</h2>
    <ul>
      <li><strong>自動路由追蹤：</strong> 無縫整合 Vue Router，自動追蹤每一次路由變化。</li>
      <li><strong>精確數據收集：</strong> 確保 GA4 能夠準確記錄頁面瀏覽和使用者行為。</li>
      <li><strong>事件與轉換追蹤：</strong> 彈性的事件追蹤機制，支援自訂事件與 Google Ads 轉換。</li>
      <li><strong>開發環境優化：</strong> 在開發模式下自動禁用追蹤，避免污染正式數據。</li>
      <li><strong>易於整合：</strong> 提供清晰的指引和範例程式碼，方便快速導入現有專案。</li>
    </ul>
    <p>
      透過本示範應用，您可以實際體驗這些追蹤機制的運作方式。請留意瀏覽器開發者工具中的網路請求，或使用 GA Debug Chrome 擴充功能來觀察事件的發送。
    </p>
    <p>
      我們的目標是幫助開發者和行銷人員更輕鬆、更有效地在現代化的網頁應用中運用 GA4 和 Google Ads 的強大功能。
    </p>
  </div>
</template>

<style scoped>
.about {
  padding: 20px;
  text-align: left;
  max-width: 800px;
  margin: 0 auto;
}
.about h1 {
  text-align: center;
  margin-bottom: 20px;
}
.about h2 {
  margin-top: 30px;
  margin-bottom: 10px;
  color: #333;
}
ul {
  list-style-type: disc;
  margin-left: 20px;
}
li {
  margin-bottom: 8px;
  line-height: 1.6;
}
p {
  line-height: 1.6;
  margin-bottom: 15px;
}
</style>
