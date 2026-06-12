import { Match, League, NewsArticle, Player, MatchStat, H2H } from '../types';

export const LEAGUES: Record<string, League> = {
  'epl': {
    id: 'epl',
    name: 'Premier League',
    country: 'England',
    logo: '🇬🇧',
    priority: 1,
  },
  'laliga': {
    id: 'laliga',
    name: 'La Liga',
    country: 'Spain',
    logo: '🇪🇸',
    priority: 2,
  },
  'ucl': {
    id: 'ucl',
    name: 'UEFA Champions League',
    country: 'Europe',
    logo: '🇪🇺',
    priority: 3,
  },
  'caf': {
    id: 'caf',
    name: 'CAF Champions League',
    country: 'Africa',
    logo: '🌍',
    priority: 4,
  },
  'seriea': {
    id: 'seriea',
    name: 'Serie A',
    country: 'Italy',
    logo: '🇮🇹',
    priority: 5,
  }
};

// Standard lineups generators to save code space but maintain professional depth
const generateLineup = (teamType: 'A' | 'B'): Player[] => {
  if (teamType === 'A') {
    return [
      { number: 1, name: 'Thibaut Courtois', position: 'GK', rating: 8.2 },
      { number: 2, name: 'Dani Carvajal', position: 'DEF', rating: 7.4 },
      { number: 3, name: 'Eder Militão', position: 'DEF', rating: 7.1 },
      { number: 22, name: 'Antonio Rüdiger', position: 'DEF', rating: 7.8 },
      { number: 23, name: 'Ferland Mendy', position: 'DEF', rating: 6.9 },
      { number: 5, name: 'Jude Bellingham', position: 'MID', rating: 8.9 },
      { number: 8, name: 'Federico Valverde', position: 'MID', rating: 7.6 },
      { number: 14, name: 'Aurelien Tchouameni', position: 'MID', rating: 7.2 },
      { number: 7, name: 'Vinícius Júnior', position: 'FWD', rating: 9.1 },
      { number: 11, name: 'Rodrygo Goes', position: 'FWD', rating: 8.0 },
      { number: 9, name: 'Kylian Mbappé', position: 'FWD', rating: 8.7 },
    ];
  } else {
    return [
      { number: 31, name: 'Ederson Moraes', position: 'GK', rating: 7.5 },
      { number: 2, name: 'Kyle Walker', position: 'DEF', rating: 7.2 },
      { number: 3, name: 'Rúben Dias', position: 'DEF', rating: 7.8 },
      { number: 25, name: 'Manuel Akanji', position: 'DEF', rating: 7.1 },
      { number: 24, name: 'Josko Gvardiol', position: 'DEF', rating: 7.4 },
      { number: 16, name: 'Rodrigo Hernandez (Rodri)', position: 'MID', rating: 8.5 },
      { number: 17, name: 'Kevin De Bruyne', position: 'MID', rating: 9.0 },
      { number: 20, name: 'Bernardo Silva', position: 'MID', rating: 8.1 },
      { number: 47, name: 'Phil Foden', position: 'FWD', rating: 8.3 },
      { number: 10, name: 'Jack Grealish', position: 'FWD', rating: 7.3 },
      { number: 9, name: 'Erling Haaland', position: 'FWD', rating: 8.8 },
    ];
  }
};

const defaultStats = (): MatchStat[] => [
  { label: 'Ball Possession', homeVal: '58%', awayVal: '42%', homePct: 58, awayPct: 42 },
  { label: 'Total Shots', homeVal: 14, awayVal: 9, homePct: 61, awayPct: 39 },
  { label: 'Shots on Target', homeVal: 6, awayVal: 4, homePct: 60, awayPct: 40 },
  { label: 'Corner Kicks', homeVal: 5, awayVal: 3, homePct: 62, awayPct: 38 },
  { label: 'Offsides', homeVal: 2, awayVal: 4, homePct: 33, awayPct: 67 },
  { label: 'Fouls Committed', homeVal: 11, awayVal: 14, homePct: 44, awayPct: 56 },
  { label: 'Yellow Cards', homeVal: 1, awayVal: 3, homePct: 25, awayPct: 75 },
  { label: 'Goalkeeper Saves', homeVal: 3, awayVal: 5, homePct: 37, awayPct: 63 },
];

const generateH2H = (teamHome: string, teamAway: string): H2H[] => [
  { date: '2025-11-20', homeTeam: teamHome, awayTeam: teamAway, score: '2 - 1' },
  { date: '2025-04-12', homeTeam: teamAway, awayTeam: teamHome, score: '1 - 1' },
  { date: '2024-12-05', homeTeam: teamHome, awayTeam: teamAway, score: '3 - 0' },
  { date: '2024-03-30', homeTeam: teamAway, awayTeam: teamHome, score: '2 - 3' },
];

// Seed matches based relative to the physical date to keep Yesterday, Today, Tomorrow fully functional and automatic
export const getSimulationDate = (offsetDays: number): string => {
  const d = new Date('2026-06-11T12:00:00-07:00'); // Stable current local date from metadata
  d.setDate(d.getDate() + offsetDays);
  return d.toISOString().split('T')[0];
};

export const INITIAL_MATCHES: Match[] = [
  // ==================== TODAY (LIVE / PLAYING NOW) ====================
  {
    id: 'm-today-1',
    leagueId: 'ucl',
    homeTeam: { id: 'rmd', name: 'Real Madrid', code: 'RMA', logo: 'bg-yellow-600' },
    awayTeam: { id: 'mci', name: 'Manchester City', code: 'MCI', logo: 'bg-blue-600' },
    status: 'LIVE',
    homeScore: 2,
    awayScore: 2,
    minute: 74,
    date: getSimulationDate(0),
    displayTime: '19:45',
    stadium: 'Santiago Bernabéu, Madrid',
    referee: 'Szymon Marciniak (Poland)',
    tvChannel: 'beIN Sports HD 1 Premium / Sky Sports',
    commentator: 'Issam Chaouali / Peter Drury',
    lineups: {
      home: generateLineup('A'),
      away: generateLineup('B'),
    },
    stats: [
      { label: 'Ball Possession', homeVal: '44%', awayVal: '56%', homePct: 44, awayPct: 56 },
      { label: 'Total Shots', homeVal: 12, awayVal: 15, homePct: 44, awayPct: 56 },
      { label: 'Shots on Target', homeVal: 5, awayVal: 6, homePct: 45, awayPct: 55 },
      { label: 'Corner Kicks', homeVal: 3, awayVal: 8, homePct: 27, awayPct: 73 },
      { label: 'Fouls Committed', homeVal: 12, awayVal: 9, homePct: 57, awayPct: 43 },
      { label: 'Yellow Cards', homeVal: 2, awayVal: 1, homePct: 66, awayPct: 33 },
    ],
    headToHead: generateH2H('Real Madrid', 'Manchester City'),
    reportTitle: 'Real Madrid vs Manchester City Match analysis & tactical setup breakdown',
    reportArticle: 'The highly anticipated UEFA Champions League clash between Real Madrid and Manchester City is taking place today at the legendary Santiago Bernabéu. Fans are eager to know how to watch this historic football battle live. Both legendary managers have drafted high-quality squads. Our live score reporting feeds you with minute-by-minute live stats and live visual commentaries. In terms of live broadcasting TV channels, the game is streamed globally with world-class commentators including Peter Drury and Issam Chaouali. Analytical data highlights a heavy tactical duel in mid-field, centered on Jude Bellingham\'s high offensive transition and City\'s tactical back-line press structure led by Rodri Hernandez. Make sure to bookmark our page for realtime score stream alerts and legal statistics widgets.',
    embedUrl: 'https://www.youtube.com/embed/6_r6iL4wU44'
  },
  {
    id: 'm-today-2',
    leagueId: 'epl',
    homeTeam: { id: 'ars', name: 'Arsenal', code: 'ARS', logo: 'bg-red-600' },
    awayTeam: { id: 'che', name: 'Chelsea', code: 'CHE', logo: 'bg-blue-800' },
    status: 'LIVE',
    homeScore: 1,
    awayScore: 0,
    minute: 38,
    date: getSimulationDate(0),
    displayTime: '15:00',
    stadium: 'Emirates Stadium, London',
    referee: 'Anthony Taylor',
    tvChannel: 'USA Network / Canal+ Sport',
    commentator: 'Martin Tyler',
    lineups: {
      home: generateLineup('A'),
      away: generateLineup('B'),
    },
    stats: [
      { label: 'Ball Possession', homeVal: '61%', awayVal: '39%', homePct: 61, awayPct: 39 },
      { label: 'Total Shots', homeVal: 8, awayVal: 3, homePct: 72, awayPct: 28 },
      { label: 'Shots on Target', homeVal: 3, awayVal: 0, homePct: 100, awayPct: 0 },
      { label: 'Corner Kicks', homeVal: 4, awayVal: 1, homePct: 80, awayPct: 20 },
      { label: 'Yellow Cards', homeVal: 0, awayVal: 2, homePct: 0, awayPct: 100 },
    ],
    headToHead: generateH2H('Arsenal', 'Chelsea'),
    reportTitle: 'Arsenal vs Chelsea Derby: Live Broadcast Channels & Lineups Report',
    reportArticle: 'This classic London derby brings outstanding football passion to the forefront. Viewers seeking how to watch Arsenal vs Chelsea live stream can consult the official satellite providers such as USA Network or Canal+. Tactical analyst data emphasizes Chelsea\'s deep structure blocks countered by Arsenal\'s progressive ball-carrying wings. The lineups feature premium choices from both managers, which have been verified via official league listings. In-article SEO reviews denote that this premier league match score is vital to the qualification run for European championships next season. Review the full interactive lineups and player positional heatmaps above.'
  },
  {
    id: 'm-today-3',
    leagueId: 'caf',
    homeTeam: { id: 'ahl', name: 'Al Ahly SC', code: 'AHL', logo: 'bg-red-700' },
    awayTeam: { id: 'est', name: 'Espérance de Tunis', code: 'EST', logo: 'bg-amber-500' },
    status: 'LIVE',
    homeScore: 0,
    awayScore: 0,
    minute: 12,
    date: getSimulationDate(0),
    displayTime: '18:00',
    stadium: 'Cairo International Stadium, Cairo',
    referee: 'Mustapha Ghorbal',
    tvChannel: 'beIN Sports HD 4 / National TV 1',
    commentator: 'Khalil Al-Balushi',
    lineups: {
      home: generateLineup('A'),
      away: generateLineup('B'),
    },
    stats: [
      { label: 'Ball Possession', homeVal: '52%', awayVal: '48%', homePct: 52, awayPct: 48 },
      { label: 'Total Shots', homeVal: 2, awayVal: 1, homePct: 66, awayPct: 34 },
      { label: 'Shots on Target', homeVal: 0, awayVal: 0, homePct: 50, awayPct: 50 },
      { label: 'Corner Kicks', homeVal: 1, awayVal: 1, homePct: 50, awayPct: 50 },
    ],
    headToHead: generateH2H('Al Ahly SC', 'Espérance de Tunis'),
    reportTitle: 'Al Ahly vs Espérance de Tunis African Champions League Analysis',
    reportArticle: 'The definitive classic of African football. Al Ahly hosts Espérance at the Cairo International Stadium in a high-octane battle. Both teams enter full of tactics with a rigid defensive mid-field pivot. For the live stream commentary in Arabic, fans are tuning in to beIN Sports 4 with Khalil Al-Balushi leading the microphone description. Check out player profiles, previous head to head scores, and yellow card records within our advanced sports analytics dashboard. This platform contains verified real-time scores, keeping sports fans updated throughout the tournament.'
  },
  {
    id: 'm-today-4',
    leagueId: 'laliga',
    homeTeam: { id: 'bar', name: 'Barcelona', code: 'FCB', logo: 'bg-blue-900' },
    awayTeam: { id: 'atp', name: 'Atlético Madrid', code: 'ATM', logo: 'bg-red-800' },
    status: 'UPCOMING',
    date: getSimulationDate(0),
    displayTime: '21:00',
    stadium: 'Montjuïc Olympic Stadium, Barcelona',
    referee: 'Jesús Gil Manzano',
    tvChannel: 'ESPN+ / DAZN LaLiga',
    commentator: 'Hafid Derradji / Derek Rae',
    lineups: {
      home: generateLineup('A'),
      away: generateLineup('B'),
    },
    stats: defaultStats(),
    headToHead: generateH2H('Barcelona', 'Atlético Madrid'),
    reportTitle: 'Barcelona vs Atlético Madrid - La Liga Title Race Preview & Match Time',
    reportArticle: 'An absolute highlight in the Spanish football calendar. Barcelona vs Atlético Madrid is scheduled for kickoff today at 21:00 Local Match Time. Sports broadcasting giant ESPN+ is handling the USA stream, while DAZN covers domestic Spanish feeds. The commentator roster features the legendary Hafid Derradji for Arabic coverage. Key elements highlight a highly aggressive tactician setup from Diego Simeone against a possessive style implemented by Barcelona\'s tactical unit. Read the full statistical previews, pre-match press reports, and prospective starting lineups here.'
  },

  // ==================== YESTERDAY (FINISHED) ====================
  {
    id: 'm-yesterday-1',
    leagueId: 'epl',
    homeTeam: { id: 'liv', name: 'Liverpool', code: 'LIV', logo: 'bg-red-600' },
    awayTeam: { id: 'mun', name: 'Manchester United', code: 'MUN', logo: 'bg-red-800' },
    status: 'FINISHED',
    homeScore: 3,
    awayScore: 1,
    date: getSimulationDate(-1),
    displayTime: '16:00',
    stadium: 'Anfield, Liverpool',
    referee: 'Michael Oliver',
    tvChannel: 'Sky Sports / Peacock Premium',
    commentator: 'Martin Tyler / Gary Neville',
    lineups: {
      home: generateLineup('A'),
      away: generateLineup('B'),
    },
    stats: [
      { label: 'Ball Possession', homeVal: '64%', awayVal: '36%', homePct: 64, awayPct: 36 },
      { label: 'Total Shots', homeVal: 18, awayVal: 8, homePct: 69, awayPct: 31 },
      { label: 'Shots on Target', homeVal: 8, awayVal: 2, homePct: 80, awayPct: 20 },
      { label: 'Corner Kicks', homeVal: 9, awayVal: 2, homePct: 81, awayPct: 19 },
      { label: 'Fouls Committed', homeVal: 9, awayVal: 15, homePct: 37, awayPct: 63 },
      { label: 'Yellow Cards', homeVal: 1, awayVal: 4, homePct: 20, awayPct: 80 },
    ],
    headToHead: generateH2H('Liverpool', 'Manchester United'),
    reportTitle: 'Liverpool vs Manchester United 3-1 Match Report & Full Scoring Breakdown',
    reportArticle: 'A glorious victory for Liverpool as they secured a 3-1 triumph against Manchester United at a packed Anfield stadium. Goals from starting forwards in both halves assured the victory. Fans who missed the direct match now search how to watch the highlights stream. The commentary structure was top-notch with analysis from Sky Sports pundits. Key metrics displayed extensive superiority for the home side with 18 total shots vs just 8 for the visiting squad, showing how tactical spacing won the day.'
  },
  {
    id: 'm-yesterday-2',
    leagueId: 'laliga',
    homeTeam: { id: 'rma', name: 'Real Madrid', code: 'RMA', logo: 'bg-yellow-600' },
    awayTeam: { id: 'sev', name: 'Sevilla', code: 'SEV', logo: 'bg-stone-100' },
    status: 'FINISHED',
    homeScore: 2,
    awayScore: 0,
    date: getSimulationDate(-1),
    displayTime: '20:00',
    stadium: 'Santiago Bernabéu, Madrid',
    referee: 'Mateu Lahoz',
    tvChannel: 'ESPN+ / DAZN España',
    commentator: 'Issam Chaouali',
    lineups: {
      home: generateLineup('A'),
      away: generateLineup('B'),
    },
    stats: defaultStats(),
    headToHead: generateH2H('Real Madrid', 'Sevilla'),
    reportTitle: 'Real Madrid 2-0 Sevilla Match Report: Dynamic Midfield Supremacy',
    reportArticle: 'Real Madrid claimed all three points with a mature, structured 2-0 performance against a resilient Sevilla side. Utilizing a high defensive block, the squad restricted Sevilla to minimal chances. Issam Chaouali narrated the evening with his characteristic passion on beIN Sports. This sports analytics summary provides high-quality coverage for the Spanish League.'
  },
  {
    id: 'm-yesterday-3',
    leagueId: 'seriea',
    homeTeam: { id: 'juv', name: 'Juventus', code: 'JUV', logo: 'bg-black' },
    awayTeam: { id: 'mil', name: 'AC Milan', code: 'MIL', logo: 'bg-red-950' },
    status: 'FINISHED',
    homeScore: 1,
    awayScore: 1,
    date: getSimulationDate(-1),
    displayTime: '19:45',
    stadium: 'Allianz Stadium, Turin',
    referee: 'Daniele Orsato',
    tvChannel: 'Paramount+ / CBS Sports',
    commentator: 'Marco Rossi',
    lineups: {
      home: generateLineup('A'),
      away: generateLineup('B'),
    },
    stats: defaultStats(),
    headToHead: generateH2H('Juventus', 'AC Milan'),
    reportTitle: 'Juventus vs AC Milan 1-1 Serie A Derby Standings and tactical details',
    reportArticle: 'A hard-fought tactical draw in Turin saw Juventus and AC Milan share spoils. The visitors scored an early header from a corner kick, but Juventus found an equalizer in the second half. Check out the latest live standings and referee analytics inside.'
  },

  // ==================== TOMORROW (UPCOMING) ====================
  {
    id: 'm-tomorrow-1',
    leagueId: 'ucl',
    homeTeam: { id: 'bay', name: 'Bayern Munich', code: 'FCB', logo: 'bg-red-600' },
    awayTeam: { id: 'par', name: 'Paris Saint-Germain', code: 'PSG', logo: 'bg-purple-950' },
    status: 'UPCOMING',
    date: getSimulationDate(1),
    displayTime: '20:00',
    stadium: 'Allianz Arena, Munich',
    referee: 'Danny Makkelie',
    tvChannel: 'TNT Sports / Paramount+ / Canal+',
    commentator: 'Peter Drury',
    lineups: {
      home: generateLineup('A'),
      away: generateLineup('B'),
    },
    stats: defaultStats(),
    headToHead: generateH2H('Bayern Munich', 'Paris Saint-Germain'),
    reportTitle: 'Bayern Munich vs Paris Saint-Germain: Match Time, Broadcast and Lineups',
    reportArticle: 'A block-buster Champions league night is scheduled for tomorrow at the Allianz Arena where Bayern Munich hosts PSG. This ultimate European showdown brings the highest standard of technical football. Stream channels include TNT Sports, Paramount+, and Canal+. Start time is set for 20:00 local time. Bookmark for live score updates.'
  },
  {
    id: 'm-tomorrow-2',
    leagueId: 'epl',
    homeTeam: { id: 'tot', name: 'Tottenham Hotspur', code: 'TOT', logo: 'bg-cyan-900' },
    awayTeam: { id: 'avl', name: 'Aston Villa', code: 'AVL', logo: 'bg-sky-950' },
    status: 'UPCOMING',
    date: getSimulationDate(1),
    displayTime: '14:30',
    stadium: 'Tottenham Hotspur Stadium, London',
    referee: 'Chris Kavanagh',
    tvChannel: 'Sky Sports Premier League / USA Network',
    commentator: 'Martin Tyler',
    lineups: {
      home: generateLineup('A'),
      away: generateLineup('B'),
    },
    stats: defaultStats(),
    headToHead: generateH2H('Tottenham Hotspur', 'Aston Villa'),
    reportTitle: 'Tottenham vs Aston Villa: How to watch, Match time prediction, Broadcast channels',
    reportArticle: 'An essential match in the fight for European football. Tottenham meets Unai Emery\'s Aston Villa in an intense tactical game. Lineup predictions show strong tactical variations on both sides. Live broadcast will start at 14:30. Follow this page for immediate scores and stats.'
  }
];

export const NEWS_ARTICLES: NewsArticle[] = [
  {
    id: 'n-1',
    title: 'How to Watch Champions League Live Streams: Ultimate TV Channels and Commentator Guide',
    summary: 'A complete breakdown of broadcast rights, satellite TV packages, and official high-definition streaming portals for football fans around the world.',
    content: [
      'The landscape of football broadcasting continues to evolve at a breakneck pace in 2026. Fans who want to keep up with their favorite matches demand reliable, premium quality feeds, with localized commentators expressing the vibrant emotion of every goal. This digital sports guide lists the official, legally approved satellite television channels and streaming portals offering full match coverage.',
      'In North America, Paramount+ and CBS Sports Network hold exclusive English-language rights, offering comprehensive analytics, multi-camera streams, and pundit reviews. Spanish-language viewers can access all games live on Univision and TUDN. For the United Kingdom, TNT Sports (formerly BT Sport) remains the go-to home for Champions League matches, providing detailed match times, stadium pitch reports, and live analytical metrics.',
      'For viewers in the Middle East and North Africa (MENA) region, beIN Sports is the undisputed premium destination. Offering matches across multiple HD channels, viewers are accompanied by world-renowned Arabic sports commentators like Issam Chaouali and Khalil Al-Balushi. The tactical depth of their pre-match studios makes beIN the ultimate AdSense-safe sports coverage of choice.',
      'Our sports score and analytics magazine remains completely committed to legal compatibility. We do not host or stream copyright-protected video streams on our servers. All statistics, lineup formations, and live referee ratings are sourced from legal public APIs, providing a compliant, premium resource for professional sports enthusiasts.'
    ],
    date: getSimulationDate(0),
    category: 'Broadcasting Guide',
    imageUrl: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=800&auto=format&fit=crop&q=60',
    matchId: 'm-today-1'
  },
  {
    id: 'n-2',
    title: 'The Modern Football Tactical Revolution: Inside High-Press Defensive Formations',
    summary: 'How tactical managers have modified standard 4-3-3 structures into active defensive traps, forcing quick turnovers and high-pressure recoveries.',
    content: [
      'Tactics in the world of modern association football have never been more rigorous. Gone are the days when a defensive line could sit passively in its penalty box, absorbing pressure for ninety minutes. Today first-class managers like Pep Guardiola and Carlo Ancelotti construct sophisticated high-pressing structures that start the moment they lose ball possession.',
      'In this detailed analytical tactical breakdown, we observe how conventional starting lineups are shifted dynamically into asymmetrical blocks. When defending, a winger transitions inside as an extra attacking midfielder, restricting passing lanes for the opposing backline. This forces the opponent to play risky long balls, turning the possession back to the pressing squad.',
      'Modern statistics packages like our live data visualizer showcase the impact of these setups, recording dramatic spikes in ball recovery metrics within the opposing third. Football index experts note that players with exceptional physical stamina and quick spatial decision-making are now valued higher in global football transfers than ever before.',
      'Stay tuned to our platform for high-resolution graphics, team rosters, live referee indexes, and programmatic match widgets. Review the chronological sub-tabs on our home page to see how these tactical configurations perform in actual match scores today.'
    ],
    date: getSimulationDate(-1),
    category: 'Tactical Analysis',
    imageUrl: 'https://images.unsplash.com/photo-1544698310-74ea9d1c8258?w=800&auto=format&fit=crop&q=60',
  },
  {
    id: 'n-3',
    title: 'FIFA Referee New Guidelines: Stricter Rules on Pitch Arguments & Protest Yellow Cards',
    summary: 'An depth look into the updated soccer refereeing instructions designed to reduce crowding on referees and standardise yellow card penalties.',
    content: [
      'Referees are finding themselves under intense scrutiny every weekend. To protect the integrity of the game, FIFA has rolled out its latest, absolute instructions to match officials across all elite global leagues including the Premier League, La Liga, and Serie A. The primary directive is simple: zero tolerance for dissent.',
      'Under the new framework, only the designated team captain is permitted to approach the referee to request clarifications on major decisions. Any other player who crowds, argues, or displays physical protest is immediately met with a yellow card penalty. The initial games implementing these rules have already seen a significant increase in total bookings, shifting game dynamics.',
      'Our live score platform monitors referee metrics closely across all leagues. In our dynamic Match Detail sub-tabs, you can find the live stadium data, referee profiles, total bookings, and official cards in real-time, providing immediate analytic support for journalists and sports bettors alike.',
      'As sports analytics and legal coverage pioneers, we stand by the highest sporting standards. Read our complete guide and yesterday match records to see historical yellow and red card distributions under different officiating teams.'
    ],
    date: getSimulationDate(-1),
    category: 'Referee Decisions',
    imageUrl: 'https://images.unsplash.com/photo-1518063319789-7217e6706b04?w=800&auto=format&fit=crop&q=60'
  }
];
