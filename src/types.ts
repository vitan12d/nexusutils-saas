export interface Team {
  id: string;
  name: string;
  logo: string; // Tailwinds colors/initials or simple CSS badges
  code: string;
}

export interface League {
  id: string;
  name: string;
  country: string;
  logo: string;
  priority: number;
}

export interface Player {
  number: number;
  name: string;
  position: 'GK' | 'DEF' | 'MID' | 'FWD';
  rating?: number;
}

export interface MatchLineups {
  home: Player[];
  away: Player[];
}

export interface MatchStat {
  label: string;
  homeVal: string | number;
  awayVal: string | number;
  homePct: number; // For visualization
  awayPct: number;
}

export interface H2H {
  date: string;
  homeTeam: string;
  awayTeam: string;
  score: string;
}

export interface Match {
  id: string;
  leagueId: string;
  homeTeam: Team;
  awayTeam: Team;
  status: 'LIVE' | 'FINISHED' | 'UPCOMING';
  homeScore?: number;
  awayScore?: number;
  minute?: number; // e.g. 74
  date: string; // ISO String format or Date simple
  displayTime: string; // e.g. "19:45"
  stadium: string;
  referee: string;
  tvChannel: string;
  commentator: string;
  lineups: MatchLineups;
  stats: MatchStat[];
  headToHead: H2H[];
  reportTitle: string;
  reportArticle: string;
  embedUrl?: string; // Real-time serverless database stream or analytics embed URL
}

export interface NewsArticle {
  id: string;
  title: string;
  summary: string;
  content: string[]; // split by paragraphs for native ad placement
  date: string;
  category: string;
  imageUrl: string;
  matchId?: string; // Cross link to match details if relevant
}
