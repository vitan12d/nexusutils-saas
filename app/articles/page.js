import { getArticles } from '../../lib/content';
import ContentCard from '../../components/ContentCard';

export const metadata = { title: 'مقالات تحليلية' };
export const revalidate = 60;

export default async function ArticlesPage() {
  const items = await getArticles('ar');
  return (
    <>
      <h1 className="section-title">أحدث المقالات</h1>
      {items.length === 0 && <div className="empty">لا توجد مقالات بعد.</div>}
      <div className="grid">
        {items.map((i) => <ContentCard key={i.slug} item={i} base="articles" />)}
      </div>
    </>
  );
}
