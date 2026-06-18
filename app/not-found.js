import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="empty">
      <h1 className="section-title" style={{ display: 'inline-block' }}>404 — الصفحة غير موجودة</h1>
      <p><Link href="/" style={{ color: 'var(--blue-700)', fontWeight: 700 }}>العودة للرئيسية</Link></p>
    </div>
  );
}
