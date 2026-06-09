import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const GoPage: React.FC = () => {
  const [countdown, setCountdown] = useState(10);
  const navigate = useNavigate();

  useEffect(() => {
    // 1. العداد التنازلي لـ 10 ثوانٍ
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          // الانتقال الآمن والناعم لصفحة الموقع الرئيسية بدون إعادة تحميل الموارد
          navigate('/'); 
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    // 2. استدعاء الماستر كود (Master Code) لـ Clickadilla فور تحميل الصفحة
    const container = document.getElementById('bridge-ads-container');
    if (container) {
      container.innerHTML = ''; // تنظيف الحاوية لمنع تكرار الإعلان عند الـ Re-render
      
      const script = document.createElement('script');
      script.async = true;
      script.src = 'https://js.wpadmngr.com/static/adManager.js';
      script.setAttribute('data-admpid', '444122'); // رقم الـ Master ID الخاص بك في Clickadilla
      container.appendChild(script);
    }

    return () => clearInterval(timer);
  }, [navigate]);

  return (
    <div style={{
      margin: 0,
      fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, sans-serif',
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
        boxShadow: '0 10px 25px -5px rgba(0,0,0,0.3)',
      }}>
        <h2 style={{ fontSize: '24px', marginBottom: '10px', fontWeight: 600 }}>NexusUtils is loading...</h2>
        <p style={{ color: '#94a3b8', marginBottom: '20px', fontSize: '14px' }}>
          Please wait while we prepare your developer tools suite.
        </p>

        {/* الصندوق الإعلاني - سيتم حقن الفيديو والبنرات بداخله */}
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
          {/* سكريبت adManager سيقوم بوضع الإعلان هنا تلقائياً */}
        </div>

        {/* العداد الرقمي المضيء */}
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
