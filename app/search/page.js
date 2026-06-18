import { getNews, getArticles } from '../../lib/content';
import ContentCard from '../../components/ContentCard';

export const metadata = { title: 'بحث' };
export const revalidate = 60;

export default async function SearchPage({ searchParams }) {
  const q = (searchParams?.q || '').trim().toLowerCase();
  let results = [];
  if (q) {
    const [news, articles] = await Promise.all([getNews('ar'), getArticles('ar')]);
    const pool = [
      ...news.map((i) => ({ ...i, base: 'news' })),
      ...articles.map((i) => ({ ...i, base: 'articles' }))
    ];
    results = pool.filter((i) =>
      `${i.title} ${i.excerpt} ${i.body || ''}`.toLowerCase().includes(q)
    );
  }

  return (
    <>
      <h1 className="section-title">بحث</h1>
      <form method="get" className="tabs">
        <input name="q" defaultValue={q} placeholder="ابحث عن خبر أو مقال..." className="admin-input" style={{ maxWidth: 320, marginBottom: 0 }} />
        <button className="tab active" type="submit">بحث</button>
      </form>
      {q && results.length === 0 && <div className="empty">لا توجد نتائج لـ “{q}”.</div>}
      <div className="grid">
        {results.map((i) => <ContentCard key={i.slug} item={i} base={i.base} />)}
      </div>
    </>
  );
}
