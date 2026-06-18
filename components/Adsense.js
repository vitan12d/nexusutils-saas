'use client';
import { useEffect } from 'react';
import { SITE } from '../lib/site';

// وحدة إعلان AdSense — تظهر فقط بعد ضبط معرّف الناشر
export default function Adsense({ slot }) {
  useEffect(() => {
    if (!SITE.adsenseClient) return;
    try { (window.adsbygoogle = window.adsbygoogle || []).push({}); } catch (_) {}
  }, []);

  if (!SITE.adsenseClient) return null;
  return (
    <ins className="adsbygoogle"
      style={{ display: 'block', margin: '20px 0' }}
      data-ad-client={SITE.adsenseClient}
      data-ad-slot={slot}
      data-ad-format="auto"
      data-full-width-responsive="true" />
  );
}
