import { getLiveFixtures } from '../../lib/api';
import MatchCard from '../../components/MatchCard';

export const revalidate = 30;

export default async function LivePage() {
  let live = [];
  let error = null;
  try {
    live = await getLiveFixtures();
  } catch (e) {
    error = e.message;
  }

  return (
    <>
      <h1 className="section-title">المباريات المباشرة</h1>
      {error && <div className="error">تعذر جلب البيانات: {error}</div>}
      {!error && live.length === 0 && <div className="empty">لا توجد مباريات مباشرة حالياً.</div>}
      <div className="grid">
        {live.map((f) => <MatchCard key={f.fixture.id} fixture={f} />)}
      </div>
    </>
  );
}
