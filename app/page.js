import { getFixturesByDate, getLiveFixtures } from '../lib/api';
import MatchCard from '../components/MatchCard';

export const revalidate = 60;

export default async function HomePage() {
  let live = [];
  let today = [];
  let error = null;

  try {
    [live, today] = await Promise.all([getLiveFixtures(), getFixturesByDate()]);
  } catch (e) {
    error = e.message;
  }

  return (
    <>
      <h1 className="section-title">مباريات مباشرة الآن</h1>
      {error && <div className="error">تعذر جلب البيانات: {error}</div>}
      {!error && live.length === 0 && <div className="empty">لا توجد مباريات مباشرة حالياً.</div>}
      <div className="grid">
        {live.map((f) => <MatchCard key={f.fixture.id} fixture={f} />)}
      </div>

      <h2 className="section-title">مباريات اليوم</h2>
      {!error && today.length === 0 && <div className="empty">لا توجد مباريات اليوم.</div>}
      <div className="grid">
        {today.slice(0, 30).map((f) => <MatchCard key={f.fixture.id} fixture={f} />)}
      </div>
    </>
  );
}
