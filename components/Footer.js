import Link from 'next/link';
import { SITE } from '../lib/site';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="site-footer">
      <div className="footer-links">
        <Link href="/about">من نحن</Link>
        <Link href="/contact">اتصل بنا</Link>
        <Link href="/privacy">سياسة الخصوصية</Link>
        <Link href="/terms">شروط الاستخدام</Link>
        <Link href="/brand">العلامة التجارية</Link>
        <Link href="/help">مساعدة ودعم</Link>
        <Link href="/sections">أقسام الموقع</Link>
      </div>
      <p>© {year} {SITE.name} — جميع الحقوق محفوظة.</p>
      <p>البيانات مقدمة عبر API-Football. موقع إخباري رياضي مستقل.</p>
    </footer>
  );
}
