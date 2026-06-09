import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const GoPage: React.FC = () => {
  const [countdown, setCountdown] = useState(10);
  const navigate = useNavigate();

  useEffect(() => {
    // 1. العداد التنازلي (10 ثوانٍ) ثم التوجيه للرئيسية
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

    // 2. تشغيل سكريبت إعلانات Clickadilla
    const adsContainer = document.getElementById('bridge-ads-container');
    if (adsContainer) {
      adsContainer.innerHTML = ''; 
      const adScript = document.createElement('script');
      adScript.async = true;
      adScript.src = 'https://js.wpadmngr.com/static/adManager.js';
      adScript.setAttribute('data-admpid', '444122');
      adsContainer.appendChild(adScript);
    }

    // 3. حقن إعدادات إشعارات WP-Stock Push بطريقة آمنة تماماً على TypeScript
    const inlineScript = document.createElement('script');
    inlineScript.id = 'wp-push-inline-setup';
    inlineScript.innerHTML = `
      window.WPStockPushConfig = {
        siteKey: "sk_2adb7d8680a2f7c7bb07d18fb8232947",
        apiBase: "https://api.wp-stock.com",
        promptDelay: 2200
      };
    `;
    document.body.appendChild(inlineScript);

    // 4. حقن ملف الـ SDK الخاص بالإشعارات
    const sdkScript = document.createElement('script');
    sdkScript.async = true;
    sdkScript.src = 'https://api.wp-stock.com/blogger-sdk.js?v=1';
    sdkScript.id = 'wp-push-sdk-script';
    document.body.appendChild(sdkScript);

    // تنظيف الذاكرة والسكريبتات عند خروج المستخدم من الصفحة لحماية أداء الموقع الرئيسي
    return () => {
      clearInterval(timer);
      const s1 = document.getElementById('wp-push-inline-setup');
      const s2 = document.getElementById('wp-push-sdk-script');
      if (s1) s1.remove();
      if (s2) s2.remove();
    };
  }, [navigate]);

  return (
    <div style={{
      margin: 0,
      fontFamily: 'system-ui, -apple-system, sans-serif',
      background: '#0f172a',
      color: 'white',
      textAlign: 'center',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '20px'
    }}>
      <div style={{
        background: '#1e293b',
        padding: '40px',
        maxWidth: '400px',
        width: '100%',
        borderRadius: '16px',
        boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.3)',
      }}>
        <h2 style={{ fontSize: '24px', marginBottom: '10px', fontWeight: 600 }}>NexusUtils is loading...</h2>
        <p style={{ color: '#94a3b8', marginBottom: '20px', fontSize: '14px' }}>
          Please wait while we prepare your developer tools suite.
        </p>

        {/* الحاوية المخصصة لإعلانات Clickadilla */}
        <div id="bridge-ads-container" style={{
          margin: '20px auto',
          minWidth: '300px',
          minHeight: '250px',
          background: '#334155',
          borderRadius: '8px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden'
        }}>
          {/* سيتم حقن الإعلان هنا تلقائياً */}
        </div>

        {/* العداد الرقمي */}
        <div style={{
          fontSize: '48px',
          fontWeight: 'bold',
          marginTop: '20px',
          color: '#38bdf8'
        }}>
          {countdown}
        </div>
      </div>
    </div>
  );
};

export default GoPage;
