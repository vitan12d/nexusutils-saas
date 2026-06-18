import { getNewsBySlug } from '../../../lib/content';
import { notFound } from 'next/navigation';
import Breadcrumbs from '../../../components/Breadcrumbs';
import { articleSchema, JsonLd } from '../../../lib/schema';

export const revalidate = 60;

export async function generateMetadata({ params }) {
  const item = await getNewsBySlug(params.slug);
  if (!item) return {};
  return {
    title: item.title,
    description: item.excerpt,
    alternates: { canonical: `/news/${item.slug}` },
    openGraph: { type: 'article', title: item.title, description: item.excerpt, images: item.cover ? [item.cover] : [] }
  };
}

export default async function NewsArticle({ params }) {
  const item = await getNewsBySlug(params.slug);
  if (!item) notFound();
  const path = `/news/${item.slug}`;
  return (
    <article className="prose">
      <JsonLd data={articleSchema(item, path)} />
      <Breadcrumbs crumbs={[{ name: 'الرئيسية', path: '/' }, { name: 'أخبار', path: '/news' }, { name: item.title, path }]} />
      <h1 className="section-title">{item.title}</h1>
      <p className="meta">{item.date} — {item.author}</p>
      {item.cover && <img src={item.cover} alt={item.title} className="cover" />}
      <p style={{ whiteSpace: 'pre-line' }}>{item.body}</p>
    </article>
  );
}
