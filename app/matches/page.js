import { getFixturesByDate } from '../../lib/api';
import MatchCard from '../../components/MatchCard';

export const revalidate = 60;

export default async function MatchesPage({ searchParams }) {
  const date = searchParams?.date || new Date().toISOString().slice(0, 10);
  let fixtures = [];
  let error = null;
  try {
    fixtures = await getFixturesByDate(date);
  } catch (e) {
    error = e.message;
  }

  return (
    <>
      <h1 className="section-title">مباريات بتاريخ {date}</h1>
      <form className="tabs" method="get">
        <input type="date" name="date" defaultValue={date} className="tab" />
        <button className="tab active" type="submit">عرض</button>
      </form>
      {error && <div className="error">تعذر جلب البيانات: {error}</div>}
      {!error && fixtures.length === 0 && <div className="empty">لا توجد مباريات في هذا التاريخ.</div>}
      <div className="grid">
        {fixtures.map((f) => <MatchCard key={f.fixture.id} fixture={f} />)}
      </div>
    </>
  );
}
