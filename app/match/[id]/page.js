import { getFixtureById } from '../../../lib/api';
import { findStreamForMatch } from '../../../lib/db';
import StreamLink from '../../../components/StreamLink';

export const revalidate = 30;

export default async function MatchPage({ params }) {
  let data = null;
  let stream = null;
  let error = null;
  try {
    const res = await getFixtureById(params.id);
    data = res?.[0] || null;
    if (data) {
      stream = await findStreamForMatch({
        home: data.teams?.home?.name,
        away: data.teams?.away?.name
      });
    }
  } catch (e) {
    error = e.message;
  }

  if (error) return <div className="error">تعذر جلب المباراة: {error}</div>;
  if (!data) return <div className="empty">لم يتم العثور على المباراة.</div>;

  const { teams, goals, league, fixture, events = [] } = data;

  return (
    <>
      <h1 className="section-title">{league.name}</h1>
      <div className="table-wrap">
        <div className="table-head" style={{ textAlign: 'center', fontSize: '1.1rem' }}>
          {teams.home.name} {goals.home ?? '-'} : {goals.away ?? '-'} {teams.away.name}
        </div>
        <div style={{ padding: '14px', textAlign: 'center', color: 'var(--muted)' }}>
          {fixture.status.long} {fixture.status.elapsed ? `— ${fixture.status.elapsed}'` : ''}
          <br />{fixture.venue?.name} {fixture.venue?.city ? `— ${fixture.venue.city}` : ''}
        </div>
      </div>

      {stream && (
        <div style={{ margin: '0 0 20px' }}>
          <StreamLink stream={stream} />
        </div>
      )}

      <h2 className="section-title">أحداث المباراة</h2>
      {events.length === 0 && <div className="empty">لا توجد أحداث بعد.</div>}
      <div className="table-wrap">
        {events.map((ev, i) => (
          <div key={i} style={{ padding: '10px 14px', borderBottom: '1px solid var(--border)' }}>
            <strong>{ev.time.elapsed}'</strong> — {ev.type} {ev.detail ? `(${ev.detail})` : ''} — {ev.player?.name} <span style={{ color: 'var(--muted)' }}>[{ev.team?.name}]</span>
          </div>
        ))}
      </div>
    </>
  );
}
