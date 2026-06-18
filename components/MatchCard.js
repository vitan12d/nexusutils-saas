import Link from 'next/link';

const LIVE_STATES = ['1H', '2H', 'HT', 'ET', 'P', 'LIVE'];

export default function MatchCard({ fixture, stream }) {
  const { teams, goals, league, fixture: fx } = fixture;
  const status = fx.status.short;
  const isLive = LIVE_STATES.includes(status);
  const kickoff = new Date(fx.date).toLocaleString('ar', {
    hour: '2-digit', minute: '2-digit', day: '2-digit', month: '2-digit'
  });

  return (
    <div className="match-card-wrap">
      <Link href={`/match/${fx.id}`} className="match-card">
        <div className="match-league">{league.name}</div>
        <div className="match-teams">
          <div className="team-row">
            <span className="team-name">
              <img src={teams.home.logo} alt={teams.home.name} />
              {teams.home.name}
            </span>
            <span className="score">{goals.home ?? '-'}</span>
          </div>
          <div className="team-row">
            <span className="team-name">
              <img src={teams.away.logo} alt={teams.away.name} />
              {teams.away.name}
            </span>
            <span className="score">{goals.away ?? '-'}</span>
          </div>
        </div>
        <div className="match-status">
          {isLive
            ? <span className="badge-live">مباشر {fx.status.elapsed ? `${fx.status.elapsed}'` : ''}</span>
            : <span>{status === 'FT' ? 'انتهت' : kickoff}</span>}
          <span>{fx.venue?.name || ''}</span>
        </div>
      </Link>
      {stream && (
        <a href={stream.url} target="_blank" rel="noopener noreferrer nofollow" className="stream-mini">
          ▶ شاهد عبر {stream.channel}
        </a>
      )}
    </div>
  );
}
