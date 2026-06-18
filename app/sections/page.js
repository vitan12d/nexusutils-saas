import Link from 'next/link';
import { FEATURED_LEAGUES } from '../../lib/leagues';

export const metadata = {
  title: 'أقسام الموقع — دليل التصفح',
  description: 'تصفح جميع أقسام Nexusutils: الدوريات، الأخبار، المقالات، وكأس العالم 2026.'
};

export default function SectionsPage() {
  return (
    <>
      <h1 className="section-title">أقسام الموقع</h1>
      <div className="grid">
        <Link href="/live" className="match-card"><h3 className="card-title">المباريات المباشرة</h3><p className="card-excerpt">نتائج حية لحظة بلحظة.</p></Link>
        <Link href="/matches" className="match-card"><h3 className="card-title">جدول المباريات</h3><p className="card-excerpt">مباريات اليوم والأيام الأخرى.</p></Link>
        <Link href="/world-cup-2026" className="match-card"><h3 className="card-title">كأس العالم 2026</h3><p className="card-excerpt">تغطية شاملة للبطولة.</p></Link>
        <Link href="/news" className="match-card"><h3 className="card-title">الأخبار</h3><p className="card-excerpt">آخر أخبار كرة القدم.</p></Link>
        <Link href="/articles" className="match-card"><h3 className="card-title">المقالات</h3><p className="card-excerpt">تحليلات وتكتيك.</p></Link>
        <Link href="/videos" className="match-card"><h3 className="card-title">فيديو</h3><p className="card-excerpt">مقاطع مختارة.</p></Link>
      </div>

      <h2 className="section-title">ترتيب الدوريات</h2>
      <div className="grid">
        {FEATURED_LEAGUES.map((l) => (
          <Link key={l.id} href={`/standings?league=${l.id}`} className="match-card">
            <h3 className="card-title">{l.name}</h3>
            <p className="card-excerpt">جدول الترتيب والنتائج.</p>
          </Link>
        ))}
      </div>
    </>
  );
}
