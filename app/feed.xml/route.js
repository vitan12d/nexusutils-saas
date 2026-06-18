import { getNews, getArticles } from '../../lib/content';
import { SITE } from '../../lib/site';

// RSS feed يساعد على الأرشفة السريعة وتوزيع المحتوى
export const revalidate = 300;

function esc(s) {
  return String(s || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

export async function GET() {
  const [news, articles] = await Promise.all([getNews('ar'), getArticles('ar')]);
  const items = [
    ...news.map((i) => ({ ...i, base: 'news' })),
    ...articles.map((i) => ({ ...i, base: 'articles' }))
  ].sort((a, b) => new Date(b.date || 0) - new Date(a.date || 0)).slice(0, 30);

  const body = items.map((i) => `
    <item>
      <title>${esc(i.title)}</title>
      <link>${SITE.url}/${i.base}/${i.slug}</link>
      <guid>${SITE.url}/${i.base}/${i.slug}</guid>
      <pubDate>${new Date(i.date || Date.now()).toUTCString()}</pubDate>
      <description>${esc(i.excerpt)}</description>
    </item>`).join('');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0"><channel>
  <title>${esc(SITE.name)}</title>
  <link>${SITE.url}</link>
  <description>${esc(SITE.descriptionAr)}</description>
  <language>ar</language>${body}
</channel></rss>`;

  return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
}
