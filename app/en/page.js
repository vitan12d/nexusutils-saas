import { getFixturesByDate, getLiveFixtures } from '../../lib/api';
import MatchCard from '../../components/MatchCard';

export const metadata = { title: 'Nexusutils | Live Scores, Standings & World Cup 2026' };
export const revalidate = 60;

export default async function EnHome() {
  let live = [];
  let today = [];
  let error = null;
  try {
    [live, today] = await Promise.all([getLiveFixtures(), getFixturesByDate()]);
  } catch (e) {
    error = e.message;
  }

  return (
    <div dir="ltr">
      <h1 className="section-title" style={{ borderRight: 'none', borderLeft: '4px solid var(--blue-500)', paddingRight: 0, paddingLeft: 12 }}>Live Now</h1>
      {error && <div className="error">Failed to load data: {error}</div>}
      {!error && live.length === 0 && <div className="empty">No live matches right now.</div>}
      <div className="grid">{live.map((f) => <MatchCard key={f.fixture.id} fixture={f} />)}</div>
      <h2 className="section-title" style={{ borderRight: 'none', borderLeft: '4px solid var(--blue-500)', paddingRight: 0, paddingLeft: 12 }}>Today's Matches</h2>
      <div className="grid">{today.slice(0, 30).map((f) => <MatchCard key={f.fixture.id} fixture={f} />)}</div>
    </div>
  );
}
