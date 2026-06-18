import { getStandings } from '../../lib/api';
import { FEATURED_LEAGUES, currentSeason } from '../../lib/leagues';
import Link from 'next/link';

export const revalidate = 3600;

export default async function StandingsPage({ searchParams }) {
  const leagueId = Number(searchParams?.league) || FEATURED_LEAGUES[0].id;
  const season = currentSeason();
  let standings = [];
  let error = null;

  try {
    const res = await getStandings(leagueId, season);
    standings = res?.[0]?.league?.standings?.[0] || [];
  } catch (e) {
    error = e.message;
  }

  return (
    <>
      <h1 className="section-title">جداول الترتيب</h1>
      <div className="tabs">
        {FEATURED_LEAGUES.map((l) => (
          <Link
            key={l.id}
            href={`/standings?league=${l.id}`}
            className={`tab ${l.id === leagueId ? 'active' : ''}`}
          >{l.name}</Link>
        ))}
      </div>

      {error && <div className="error">تعذر جلب الترتيب: {error}</div>}
      {!error && standings.length === 0 && <div className="empty">لا يوجد ترتيب متاح لهذا الموسم.</div>}

      {standings.length > 0 && (
        <div className="table-wrap">
          <div className="table-head">ترتيب الفرق — موسم {season}</div>
          <table>
            <thead>
              <tr>
                <th>#</th><th>الفريق</th><th>لعب</th><th>فاز</th>
                <th>تعادل</th><th>خسر</th><th>الفارق</th><th>النقاط</th>
              </tr>
            </thead>
            <tbody>
              {standings.map((row) => (
                <tr key={row.team.id}>
                  <td>{row.rank}</td>
                  <td className="team-cell">
                    <img src={row.team.logo} alt={row.team.name} />{row.team.name}
                  </td>
                  <td>{row.all.played}</td>
                  <td>{row.all.win}</td>
                  <td>{row.all.draw}</td>
                  <td>{row.all.lose}</td>
                  <td>{row.goalsDiff}</td>
                  <td><strong>{row.points}</strong></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
