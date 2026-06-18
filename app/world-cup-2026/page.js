import { getFixturesByDate } from '../../lib/api';
import { getActiveStreams } from '../../lib/db';
import MatchCard from '../../components/MatchCard';

export const metadata = {
  title: 'كأس العالم 2026 — بث مباشر ومواعيد المباريات',
  description: 'تغطية شاملة لكأس العالم 2026: المواعيد، المجموعات، والنتائج المباشرة.'
};

export const revalidate = 60;

function norm(str) { return String(str || '').toLowerCase().replace(/\s+/g, ' ').trim(); }

function matchStream(streams, f) {
  const h = norm(f.teams?.home?.name);
  const a = norm(f.teams?.away?.name);
  return streams.find((s) => {
    const title = norm(s.title);
    return (h && title.includes(h)) || (a && title.includes(a));
  }) || null;
}

export default async function WorldCupPage() {
  // معرّف دوري كأس العالم في API-Football = 1
  let fixtures = [];
  let streams = [];
  let error = null;
  try {
    const today = new Date().toISOString().slice(0, 10);
    const [all, active] = await Promise.all([getFixturesByDate(today), getActiveStreams()]);
    fixtures = all.filter((f) => f.league?.id === 1);
    streams = active;
  } catch (e) {
    error = e.message;
  }

  return (
    <article className="prose">
      <h1 className="section-title">كأس العالم 2026 — بث مباشر</h1>
      <p>
        تغطية كاملة لبطولة كأس العالم 2026 التي تستضيفها الولايات المتحدة وكندا والمكسيك،
        بمشاركة 48 منتخباً. تابع المواعيد، النتائج المباشرة، وروابط البث الرسمية أولاً بأول.
      </p>

      {streams.length > 0 && (
        <>
          <h2 className="section-title">روابط البث المباشر (الآن)</h2>
          <div className="stream-list">
            {streams.map((s) => (
              <a key={s.id} href={s.url} target="_blank" rel="noopener noreferrer nofollow" className="stream-box">
                <span className="badge-live">مباشر</span>
                <span className="stream-box-text">{s.title} — عبر <strong>{s.channel}</strong></span>
                <span className="stream-box-go">فتح الرابط ←</span>
              </a>
            ))}
          </div>
        </>
      )}

      <h2 className="section-title">مباريات اليوم</h2>
      {error && <div className="error">تعذر جلب البيانات: {error}</div>}
      {!error && fixtures.length === 0 && <div className="empty">لا توجد مباريات اليوم ضمن البطولة.</div>}
      <div className="grid">
        {fixtures.map((f) => <MatchCard key={f.fixture.id} fixture={f} stream={matchStream(streams, f)} />)}
      </div>
      <p className="note">ملاحظة: الموقع يعرض المواعيد والنتائج وروابط القنوات الرسمية فقط، ولا يبث أي محتوى مرئي على سيرفراته.</p>
    </article>
  );
}
