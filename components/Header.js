import Link from 'next/link';

export default function Header() {
  return (
    <header className="site-header">
      <div className="inner">
        <Link href="/" className="logo">Nexus<span>utils</span></Link>
        <nav className="nav">
          <Link href="/">الرئيسية</Link>
          <Link href="/live">مباشر</Link>
          <Link href="/matches">المباريات</Link>
          <Link href="/standings">الترتيب</Link>
          <Link href="/world-cup-2026">كأس العالم 2026</Link>
          <Link href="/news">أخبار</Link>
          <Link href="/articles">مقالات</Link>
          <Link href="/videos">فيديو</Link>
          <Link href="/entertainment">منوعات</Link>
          <Link href="/search" aria-label="بحث">🔍</Link>
          <Link href="/en" className="lang-switch">EN</Link>
        </nav>
      </div>
    </header>
  );
}
