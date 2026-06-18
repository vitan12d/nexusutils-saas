'use client';
import { useEffect, useState } from 'react';

// شريط يعرض روابط البث النشطة فقط، ويختفي تلقائياً عند انتهاء الوقت
export default function StreamBanner() {
  const [streams, setStreams] = useState([]);

  useEffect(() => {
    let active = true;
    const fetchStreams = async () => {
      try {
        const res = await fetch('/api/streams');
        const data = await res.json();
        if (active) setStreams(data.streams || []);
      } catch (_) { /* تجاهل */ }
    };
    fetchStreams();
    const id = setInterval(fetchStreams, 60000); // تحديث كل دقيقة
    return () => { active = false; clearInterval(id); };
  }, []);

  if (streams.length === 0) return null;

  return (
    <div className="stream-banner">
      {streams.map((s) => (
        <a key={s.id} href={s.url} target="_blank" rel="noopener noreferrer nofollow" className="stream-item">
          <span className="badge-live">مباشر</span>
          <span className="stream-title">{s.title}</span>
          <span className="stream-channel">عبر {s.channel} ←</span>
        </a>
      ))}
    </div>
  );
}
