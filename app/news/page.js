import { getNews } from '../../lib/content';
import ContentCard from '../../components/ContentCard';

export const metadata = { title: 'أخبار كرة القدم' };
export const revalidate = 60;

export default async function NewsPage() {
  const items = await getNews('ar');
  return (
    <>
      <h1 className="section-title">أحدث الأخبار</h1>
      {items.length === 0 && <div className="empty">لا توجد أخبار بعد.</div>}
      <div className="grid">
        {items.map((i) => <ContentCard key={i.slug} item={i} base="news" />)}
      </div>
    </>
  );
}
