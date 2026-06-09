import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const GoPage: React.FC = () => {
  const [countdown, setCountdown] = useState(10);
  const navigate = useNavigate();

 useEffect(() => {
    // 1. العداد التنازلي (10 ثوانٍ) ثم فتح الإعلان والتوجيه
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          
          // فتح رابط Adsterra Smartlink في نافذة جديدة عند انتهاء الوقت
          window.open('https://www.effectivecpmnetwork.com/hcak2ak7?key=61ce18b1365bd02ec50882ca14064338', '_blank');
          
          // توجيه الزائر في الصفحة الحالية إلى موقعك الرئيسي
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

    return () => {
      clearInterval(timer);
    };
  }, [navigate]);
