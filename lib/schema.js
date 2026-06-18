// مولّدات البيانات المنظمة (JSON-LD) لتحسين ظهور النتائج في Google
import { SITE } from './site';

export function articleSchema(item, path) {
  return {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: item.title,
    description: item.excerpt,
    image: item.cover ? [item.cover] : undefined,
    datePublished: item.date,
    dateModified: item.date,
    author: { '@type': 'Organization', name: item.author || SITE.name },
    publisher: { '@type': 'Organization', name: SITE.name },
    mainEntityOfPage: { '@type': 'WebPage', '@id': `${SITE.url}${path}` }
  };
}

export function breadcrumbSchema(crumbs) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.name,
      item: `${SITE.url}${c.path}`
    }))
  };
}

export function sportsEventSchema(fixture) {
  const f = fixture.fixture;
  const t = fixture.teams;
  return {
    '@context': 'https://schema.org',
    '@type': 'SportsEvent',
    name: `${t.home.name} vs ${t.away.name}`,
    startDate: f.date,
    eventStatus: 'https://schema.org/EventScheduled',
    location: f.venue?.name ? { '@type': 'Place', name: f.venue.name } : undefined,
    competitor: [
      { '@type': 'SportsTeam', name: t.home.name },
      { '@type': 'SportsTeam', name: t.away.name }
    ]
  };
}

export function JsonLd({ data }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}
