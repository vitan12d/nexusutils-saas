import { SITE } from '../lib/site';
import { allContentSlugs } from '../lib/content';

export default async function sitemap() {
  const base = SITE.url;
  const now = new Date();
  const leagueSlugs = ['premier-league', 'la-liga', 'serie-a', 'bundesliga', 'ligue-1', 'saudi-league', 'champions-league'];
  const staticPaths = [
    '', '/live', '/matches', '/standings', '/news', '/articles', '/sections', '/search',
    '/videos', '/entertainment', '/world-cup-2026',
    '/about', '/contact', '/privacy', '/terms', '/brand', '/help', '/en',
    ...leagueSlugs.map((s) => `/league/${s}`)
  ];
  let news = [], articles = [];
  try {
    const slugs = await allContentSlugs();
    news = slugs.news; articles = slugs.articles;
  } catch (_) { /* تجاهل */ }
  const dynamic = [
    ...news.map((s) => `/news/${s}`),
    ...articles.map((s) => `/articles/${s}`)
  ];
  return [...staticPaths, ...dynamic].map((p) => ({
    url: `${base}${p}`,
    lastModified: now,
    changeFrequency: p === '' ? 'hourly' : 'daily',
    priority: p === '' ? 1 : 0.7
  }));
}
