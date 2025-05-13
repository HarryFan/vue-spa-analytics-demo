<template>
  <div class="contact">
    <h1>聯絡我們 - GA4/Ads 追蹤諮詢</h1>
    <p>
      如果您對於在 Vue SPA 中實作 Google Analytics 4 或 Google Ads 追蹤有任何疑問，<br>
      或是想進一步了解我們的解決方案，歡迎隨時與我們聯繫。
    </p>
    <div class="contact-form-container">
      <h2>提交您的問題：</h2>
      <form @submit.prevent="handleSubmit">
        <div>
          <label for="name">姓名：</label>
          <input type="text" id="name" v-model="form.name" required>
        </div>
        <div>
          <label for="email">電子郵件：</label>
          <input type="email" id="email" v-model="form.email" required>
        </div>
        <div>
          <label for="message">訊息：</label>
          <textarea id="message" v-model="form.message" rows="4" required></textarea>
        </div>
        <button type="submit">送出表單</button>
      </form>
    </div>
    <p v-if="submitted" class="submission-success">感謝您的提交！我們會盡快與您聯繫。</p>
    <div class="contact-info">
      <h2>示範聯絡資訊：</h2>
      <p><strong>Email:</strong> demo.ga.tracking@example.com</p>
      <p><strong>電話:</strong> +886 2 1234 5678</p>
      <p><strong>地址:</strong> 台灣台北市信義區範例路一段123號</p>
    </div>
    <p>
      <em>請注意：此為示範頁面，上述聯絡資訊與表單功能僅為展示用途。</em>
    </p>
    <p>
      這個應用程式展示了如何在 Vue Router 環境下，正確設定頁面瀏覽追蹤與自訂事件。
      當您提交表單時，將會觸發一個名為 'contact_form_submit' 的 GA4 轉換事件。
      您可以檢查 GA Debugger 或瀏覽器開發者工具的 Network tab (搜尋 "collect") 來觀察 GA4 事件的傳送。
    </p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { trackConversion } from '../utils/analytics'

const form = ref({
  name: '',
  email: '',
  message: ''
})
const submitted = ref(false)

const handleSubmit = () => {
  // 實際應用中，這裡會處理表單提交邏輯，例如發送 API 請求
  console.log('表單已提交:', form.value)

  trackConversion('contact_form_submit', {
    value: 1, // 可以根據表單的重要性給予不同的價值
    form_id: 'contact_inquiry_form',
    user_email: form.value.email // 可選：傳送非 PII 的表單數據
  })

  submitted.value = true
  // 清空表單
  form.value.name = ''
  form.value.email = ''
  form.value.message = ''

  // 可以選擇在一段時間後隱藏成功訊息
  setTimeout(() => {
    submitted.value = false
  }, 5000)
}
</script>

<style scoped>
.contact {
  padding: 20px;
  text-align: center;
  max-width: 700px;
  margin: 0 auto;
}
.contact-form-container {
  margin-top: 20px;
  margin-bottom: 30px;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #f9f9f9;
}
.contact-form-container h2 {
  margin-top: 0;
  margin-bottom: 15px;
}
form div {
  margin-bottom: 15px;
  text-align: left;
}
form label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}
form input[type="text"],
form input[type="email"],
form textarea {
  width: calc(100% - 22px); /* Adjust for padding and border */
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}
form button {
  background-color: #42b983;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
}
form button:hover {
  background-color: #36a372;
}
.submission-success {
  color: green;
  margin-top: 15px;
  font-weight: bold;
}
.contact-info {
  margin-top: 30px;
  padding: 20px;
  border: 1px solid #eee;
  border-radius: 8px;
  display: inline-block;
  text-align: left;
  background-color: #f9f9f9;
}
.contact-info h2 {
  margin-top: 0;
}
em {
  color: #777;
  font-size: 0.9em;
}
</style>
