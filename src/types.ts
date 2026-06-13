export interface Match {
  id: string;
  homeTeam: string;
  awayTeam: string;
  homeLogo: string;
  awayLogo: string;
  homeScore: number;
  awayScore: number;
  status: 'LIVE' | 'UPCOMING' | 'FINISHED';
  minute?: number;
  league: string;
  date: string; // YYYY-MM-DD
  time: string; // HH:MM
  liveStreamUrl?: string;
  channel?: string;
  commentary?: string[];
}

export interface NewsArticle {
  id: string;
  title: string;
  summary: string;
  content: string;
  image: string;
  date: string;
  category: string;
  author: string;
  commentsCount: number;
  views: number;
}

export interface StandingRow {
  rank: number;
  teamName: string;
  teamLogo: string;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDifference: number;
  points: number;
}

export interface LeagueStandings {
  leagueName: string;
  season: string;
  standings: StandingRow[];
}
