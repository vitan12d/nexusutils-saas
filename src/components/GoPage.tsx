import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const GoPage: React.FC = () => {
  const [countdown, setCountdown] = useState(10);
  const navigate = useNavigate();

useEffect(() => {
    // 1. العداد التنازلي (10 ثوانٍ)
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          navigate('/'); 
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    // 2. تشغيل سكريبت إعلانات Clickadilla فوراً
    const adsContainer = document.getElementById('bridge-ads-container');
    if (adsContainer) {
      adsContainer.innerHTML = ''; 
      const adScript = document.createElement('script');
      adScript.async = true;
      adScript.src = 'https://js.wpadmngr.com/static/adManager.js';
      adScript.setAttribute('data-admpid', '444122');
      adsContainer.appendChild(adScript);
    }

    // 3. حقن كود إشعارات WP-Stock Push بدقة طبقاً للسكريبت الخاص بك
    // نقوم بتعريف المتغير بالطريقة التي يتوقعها السكريبت تماماً
    (window as any).WPStockPushConfig = {
      siteKey: "sk_2adb7d8680a2f7c7bb07d18fb8232947",
      apiBase: "https://api.wp-stock.com",
      promptDelay: 2200
    };

    // إنشاء وحقن سكريبت الـ SDK الخاص بالمنصة
    const pushScript = document.createElement('script');
    pushScript.async = true;
    pushScript.src = 'https://api.wp-stock.com/blogger-sdk.js?v=1';
    pushScript.id = 'wp-stock-push-sdk';
    
    document.body.appendChild(pushScript);

    // تنظيف السكريبت عند خروج الزائر من الصفحة للحفاظ على أداء الموقع
    return () => {
      clearInterval(timer);
      const el = document.getElementById('wp-stock-push-sdk');
      if (el) el.remove();
      // تنظيف المتغير من الذاكرة عند مغادرة الصفحة
      delete (window as any).WPStockPushConfig;
    };
  }, [navigate]);
