// Google Analytics & Google Ads 配置
export const initGoogleAnalytics = () => {
  const isProd = import.meta.env.PROD
  const gaId = import.meta.env.VITE_GA_MEASUREMENT_ID
  const adsId = import.meta.env.VITE_GA_ADS_ID

  if (isProd && gaId) {
    const script = document.createElement('script')
    script.async = true
    script.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`
    document.head.appendChild(script)
    window.dataLayer = window.dataLayer || []
    function gtag(){window.dataLayer.push(arguments)}
    window.gtag = gtag
    gtag('js', new Date())
    
    // SPA 網站配置，添加頁面路徑
    gtag('config', gaId, {
      'send_page_view': true,
      'page_path': window.location.pathname
    })
    
    if (adsId) {
      gtag('config', adsId) // Google Ads 轉換追蹤
    }
    
    // 添加基本互動事件追蹤（降低跳出率）
    setTimeout(() => {
      document.addEventListener('click', () => {
        gtag('event', 'user_engagement', {
          'event_category': 'engagement',
          'event_label': 'click'
        })
      }, { once: true }) // 只觸發一次
    }, 2000) // 延遲確保頁面完全載入
  }
}

// 頁面瀏覽追蹤函數
export const trackPageView = (path) => {
  if (window.gtag && import.meta.env.PROD) {
    window.gtag('event', 'page_view', {
      page_path: path,
      page_title: document.title
    })
  }
}

// 自定義事件追蹤
export const trackEvent = (eventName, eventParams = {}) => {
  if (window.gtag && import.meta.env.PROD) {
    window.gtag('event', eventName, eventParams)
  }
}

// 轉換追蹤
export const trackConversion = (conversionName, conversionParams = {}) => {
  if (window.gtag && import.meta.env.PROD) {
    const adsId = import.meta.env.VITE_GA_ADS_ID
    if (adsId) {
      window.gtag('event', 'conversion', {
        'send_to': `${adsId}/${conversionName}`,
        ...conversionParams
      })
    }
  }
}
