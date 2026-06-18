import { ImageResponse } from 'next/og';

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export const alt = 'Nexusutils';

// صورة المشاركة الاجتماعية (OpenGraph)
export default function OG() {
  return new ImageResponse(
    (
      <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg,#0a2540,#0b5394)', color: '#fff' }}>
        <div style={{ fontSize: 96, fontWeight: 800 }}>Nexusutils</div>
        <div style={{ fontSize: 36, marginTop: 16, color: '#64b5f6' }}>أخبار ونتائج المباريات — كأس العالم 2026</div>
      </div>
    ),
    size
  );
}
