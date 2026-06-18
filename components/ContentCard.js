import Link from 'next/link';

export default function ContentCard({ item, base }) {
  return (
    <Link href={`/${base}/${item.slug}`} className="match-card">
      <div className="match-league">{item.date} — {item.author || ''}</div>
      <h3 className="card-title">{item.title}</h3>
      <p className="card-excerpt">{item.excerpt}</p>
      <div className="match-status"><span style={{ color: 'var(--blue-700)', fontWeight: 700 }}>اقرأ المزيد ←</span></div>
    </Link>
  );
}
