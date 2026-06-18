// دمج محتوى لوحة التحكم (Vercel KV) مع المحتوى الأولي (ملفات JSON)
// إذا كان KV مضبوطاً، تُعتمد بياناته أولاً
import seedNews from '../content/news.json';
import seedArticles from '../content/articles.json';
import seedVideos from '../content/videos.json';
import { listItems } from './db';

async function merged(type, seed) {
  let kvItems = [];
  try { kvItems = await listItems(type); } catch (_) { kvItems = []; }
  const all = [...kvItems, ...seed];
  // إزالة التكرار بالـ slug
  const seen = new Set();
  return all.filter((i) => {
    if (seen.has(i.slug)) return false;
    seen.add(i.slug); return true;
  });
}

function byLocale(items, locale) {
  return items
    .filter((i) => !locale || i.locale === locale)
    .sort((a, b) => new Date(b.date || 0) - new Date(a.date || 0));
}

export async function getNews(locale = 'ar') { return byLocale(await merged('news', seedNews), locale); }
export async function getArticles(locale = 'ar') { return byLocale(await merged('articles', seedArticles), locale); }
export async function getVideos(locale = 'ar') { return byLocale(await merged('videos', seedVideos), locale); }

export async function getNewsBySlug(slug) {
  return (await merged('news', seedNews)).find((i) => i.slug === slug) || null;
}
export async function getArticleBySlug(slug) {
  return (await merged('articles', seedArticles)).find((i) => i.slug === slug) || null;
}

export async function allContentSlugs() {
  const [n, a] = await Promise.all([merged('news', seedNews), merged('articles', seedArticles)]);
  return { news: n.map((i) => i.slug), articles: a.map((i) => i.slug) };
}
