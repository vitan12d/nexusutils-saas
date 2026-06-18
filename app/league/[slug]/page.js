import { getStandings } from '../../../lib/api';
import { leagueBySlug, currentSeason, FEATURED_LEAGUES } from '../../../lib/leagues';
import { SITE } from '../../../lib/site';
import Breadcrumbs from '../../../components/Breadcrumbs';
import { JsonLd } from '../../../lib/schema';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export const revalidate = 3600;

export function generateStaticParams() {
  return FEATURED_LEAGUES.map((l) => ({ slug: l.slug }));
}

export function generateMetadata({ params }) {
  const league = leagueBySlug(params.slug);
  if (!league) return {};
  const title = `${league.name} — جدول الترتيب والنتائج والمواعيد`;
  const description = `تابع ${league.name}: جدول الترتيب المحدّث، النتائج، الهدافين، ومواعيد المباريات لحظة بلحظة على ${SITE.name}.`;
  return {
    title, description,
    alternates: { canonical: `/league/${league.slug}` },
    openGraph: { title, description }
  };
}

export default async function LeaguePage({ params }) {
  const league = leagueBySlug(params.slug);
  if (!league) notFound();
  const season = currentSeason();
  let standings = [];
  let error = null;
  try {
    const res = await getStandings(league.id, season);
    standings = res?.[0]?.league?.standings?.[0] || [];
  } catch (e) { error = e.message; }

  const faq = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: `من المتصدر في ${league.name}؟`,
        acceptedAnswer: { '@type': 'Answer', text: standings[0] ? `يتصدر ${standings[0].team.name} جدول ${league.name} برصيد ${standings[0].points} نقطة.` : `تابع ترتيب ${league.name} محدّثاً على ${SITE.name}.` }
      },
      {
        '@type': 'Question',
        name: `أين أتابع نتائج ${league.name}؟`,
        acceptedAnswer: { '@type': 'Answer', text: `يمكنك متابعة نتائج ومواعيد ${league.name} مباشرة على ${SITE.name}.` }
      }
    ]
  };

  return (
    <article className="prose">
      <JsonLd data={faq} />
      <Breadcrumbs crumbs={[{ name: 'الرئيسية', path: '/' }, { name: 'الدوريات', path: '/sections' }, { name: league.name, path: `/league/${league.slug}` }]} />
      <h1 className="section-title">{league.name}</h1>
      <p>تابع كل ما يخص <strong>{league.name}</strong>: جدول الترتيب المحدّث، النتائج، ومواعيد المباريات. تتحدّث البيانات تلقائياً.</p>

      {error && <div className="error">تعذر جلب الترتيب: {error}</div>}
      {standings.length > 0 && (
        <div className="table-wrap">
          <div className="table-head">ترتيب {league.name} — موسم {season}</div>
          <table>
            <thead><tr><th>#</th><th>الفريق</th><th>لعب</th><th>فاز</th><th>تعادل</th><th>خسر</th><th>الفارق</th><th>النقاط</th></tr></thead>
            <tbody>
              {standings.map((row) => (
                <tr key={row.team.id}>
                  <td>{row.rank}</td>
                  <td className="team-cell"><img src={row.team.logo} alt={row.team.name} />{row.team.name}</td>
                  <td>{row.all.played}</td><td>{row.all.win}</td><td>{row.all.draw}</td><td>{row.all.lose}</td><td>{row.goalsDiff}</td><td><strong>{row.points}</strong></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <h2 className="section-title">دوريات أخرى</h2>
      <div className="tabs">
        {FEATURED_LEAGUES.filter((l) => l.slug !== league.slug).map((l) => (
          <Link key={l.id} href={`/league/${l.slug}`} className="tab">{l.name}</Link>
        ))}
      </div>
    </article>
  );
}
