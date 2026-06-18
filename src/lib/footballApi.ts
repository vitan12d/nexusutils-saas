/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Match, GroupData, GroupTeam, PlayerStats } from '../types';

// Map of common national team names from English to Arabic
export const ENGLISH_TO_ARABIC_TEAMS: Record<string, string> = {
  'Morocco': 'المغرب',
  'Argentina': 'الأرجنتين',
  'Poland': 'بولندا',
  'Canada': 'كندا',
  'Egypt': 'مصر',
  'Uruguay': 'الأوروغواي',
  'South Korea': 'كوريا الجنوبية',
  'Nigeria': 'نيجيريا',
  'Germany': 'ألمانيا',
  'Saudi Arabia': 'السعودية',
  'Switzerland': 'سويسرا',
  'Cameroon': 'الكاميرون',
  'France': 'فرنسا',
  'Japan': 'اليابان',
  'Australia': 'أستراليا',
  'Ecuador': 'الإكوادور',
  'Brazil': 'البرازيل',
  'Croatia': 'كرواتيا',
  'Tunisia': 'تونس',
  'Costa Rica': 'كوستاريكا',
  'Belgium': 'بلجيكا',
  'Spain': 'إسبانيا',
  'USA': 'الولايات المتحدة',
  'United States': 'الولايات المتحدة',
  'Portugal': 'البرتغال',
  'Algeria': 'الجزائر',
  'England': 'إنجلترا',
  'Senegal': 'السنغال',
  'Qatar': 'قطر',
  'Mexico': 'المكسيك',
  'Netherlands': 'هولندا',
  'Wales': 'ويلز',
  'Iran': 'إيران',
  'Denmark': 'الدانمارك',
  'Ghana': 'غانا',
  'Serbia': 'صربيا',
};

// Map Arabic keys back to English if someone needs it
export const ARABIC_TO_ENGLISH_TEAMS = Object.entries(ENGLISH_TO_ARABIC_TEAMS).reduce((acc, [key, value]) => {
  acc[value] = key;
  return acc;
}, {} as Record<string, string>);

/**
 * Returns country flag emoji based on 2-letter ISO country code.
 */
export function getFlagEmojiByCode(countryCode: string | null): string {
  if (!countryCode || countryCode.length !== 2) return "⚽";
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt(0));
  return String.fromCodePoint(...codePoints);
}

/**
 * Fallback mapping for teams that don't return an ISO code
 */
const TEAM_CODE_FALLBACKS: Record<string, string> = {
  'Morocco': 'MA',
  'Argentina': 'AR',
  'Poland': 'PL',
  'Canada': 'CA',
  'Egypt': 'EG',
  'Uruguay': 'UY',
  'South Korea': 'KR',
  'Nigeria': 'NG',
  'Germany': 'DE',
  'Saudi Arabia': 'SA',
  'Switzerland': 'CH',
  'Cameroon': 'CM',
  'France': 'FR',
  'Japan': 'JP',
  'Australia': 'AU',
  'Ecuador': 'EC',
  'Brazil': 'BR',
  'Croatia': 'HR',
  'Tunisia': 'TN',
  'Costa Rica': 'CR',
  'Belgium': 'BE',
  'Spain': 'ES',
  'USA': 'US',
  'United States': 'US',
  'Portugal': 'PT',
  'Algeria': 'DZ',
  'England': 'GB',
  'Senegal': 'SN',
};

export function getFlagForTeamName(teamName: string, teamCode?: string | null): string {
  if (teamCode) {
    return getFlagEmojiByCode(teamCode);
  }
  const fallbackCode = TEAM_CODE_FALLBACKS[teamName] || 
                      Object.keys(TEAM_CODE_FALLBACKS).find(k => teamName.toLowerCase().includes(k.toLowerCase())) 
                      ? TEAM_CODE_FALLBACKS[Object.keys(TEAM_CODE_FALLBACKS).find(k => teamName.toLowerCase().includes(k.toLowerCase()))!]
                      : null;
  if (fallbackCode) {
    return getFlagEmojiByCode(fallbackCode);
  }
  return "🏳️";
}

export function translateTeamName(name: string, toAr: boolean): string {
  if (toAr) {
    return ENGLISH_TO_ARABIC_TEAMS[name] || name;
  } else {
    return ARABIC_TO_ENGLISH_TEAMS[name] || name;
  }
}

export interface ApiConfigStatus {
  hasFootballApiKey: boolean;
  message: string;
}

/**
 * Checks if the server has FOOTBALL_API_KEY loaded
 */
export async function fetchApiConfig(): Promise<ApiConfigStatus> {
  try {
    const res = await fetch('/api/config');
    if (!res.ok) throw new Error('Failed to load API configuration status');
    return await res.json();
  } catch (error) {
    return { hasFootballApiKey: false, message: 'Offline proxy mode' };
  }
}

/**
 * Converts dynamic API-Football Standings response to GroupData[]
 */
export function mapStandings(apiResponse: any, language: 'ar' | 'en'): GroupData[] {
  const isEn = language === 'en';
  if (!apiResponse || !apiResponse.response || apiResponse.response.length === 0) {
    return [];
  }

  const leagueData = apiResponse.response[0].league;
  const rawGroups = leagueData.standings; // Array of arrays

  if (!rawGroups || !Array.isArray(rawGroups)) return [];

  return rawGroups.map((groupList: any[], idx: number) => {
    // Get group name (e.g. "Group A" -> map to "المجموعة الأولى (A)")
    const firstRow = groupList[0];
    const rawGroupName = firstRow?.group || `Group ${String.fromCharCode(65 + idx)}`;
    
    // Friendly localized group name
    let friendlyName = rawGroupName;
    if (!isEn) {
      // Map Group A, B, C etc to Arabic structures
      const grLetter = rawGroupName.split(' ').pop() || '';
      const lettersMap: Record<string, string> = {
        'A': 'الأولى (A)', 'B': 'الثانية (B)', 'C': 'الثالثة (C)', 'D': 'الرابعة (D)',
        'E': 'الخامسة (E)', 'F': 'السادسة (F)', 'G': 'السابعة (G)', 'H': 'الثامنة (H)'
      };
      friendlyName = `المجموعة ${lettersMap[grLetter] || rawGroupName}`;
    }

    const teams: GroupTeam[] = groupList.map((item: any) => {
      const apiTeamName = item.team.name;
      const finalTeamName = translateTeamName(apiTeamName, !isEn);
      const flag = getFlagForTeamName(apiTeamName, item.team.code);

      return {
        teamName: finalTeamName,
        teamFlag: flag,
        played: item.all.played || 0,
        won: item.all.win || 0,
        drawn: item.all.draw || 0,
        lost: item.all.lose || 0,
        gf: item.all.goals.for || 0,
        ga: item.all.goals.against || 0,
        points: item.points || 0
      };
    }).sort((a, b) => b.points - a.points || (b.gf - b.ga) - (a.gf - a.ga));

    return {
      name: friendlyName,
      teams
    };
  });
}

/**
 * Converts API-Football Fixtures response to Match[]
 */
export function mapFixtures(apiResponse: any, language: 'ar' | 'en'): Match[] {
  const isEn = language === 'en';
  if (!apiResponse || !apiResponse.response || !Array.isArray(apiResponse.response)) {
    return [];
  }

  return apiResponse.response.map((entry: any) => {
    const fixture = entry.fixture;
    const teams = entry.teams;
    const goals = entry.goals;

    const teamHomeName = translateTeamName(teams.home.name, !isEn);
    const teamHomeFlag = getFlagForTeamName(teams.home.name, teams.home.code);

    const teamAwayName = translateTeamName(teams.away.name, !isEn);
    const teamAwayFlag = getFlagForTeamName(teams.away.name, teams.away.code);

    // Determine status: 'live' | 'upcoming' | 'finished'
    let status: 'live' | 'upcoming' | 'finished' = 'upcoming';
    const shortStatus = fixture.status.short;
    if (['1H', 'HT', '2H', 'ET', 'P', 'BT'].includes(shortStatus)) {
      status = 'live';
    } else if (['FT', 'AET', 'PEN'].includes(shortStatus)) {
      status = 'finished';
    }

    // Live elapsed status or formatted kickoff date
    let timeLabel = '';
    if (status === 'live') {
      timeLabel = `${fixture.status.elapsed}'`;
    } else if (status === 'finished') {
      timeLabel = isEn ? 'FT' : 'انتهت';
    } else {
      // Upcoming, format custom short time
      try {
        const rawDate = new Date(fixture.date);
        const hours = String(rawDate.getHours()).padStart(2, '0');
        const minutes = String(rawDate.getMinutes()).padStart(2, '0');
        timeLabel = `${hours}:${minutes}`;
      } catch (e) {
        timeLabel = fixture.status.long || 'VS';
      }
    }

    // Format date string as YYYY-MM-DD
    let dateStr = '';
    try {
      dateStr = new Date(fixture.date).toISOString().split('T')[0];
    } catch (e) {
      dateStr = fixture.date;
    }

    // Parse group/round name
    let grName = entry.league.round || 'Group Stage';
    if (!isEn) {
      if (grName.includes('Group Stage - Group')) {
        const letter = grName.split(' ').pop() || '';
        const arabicLetters: Record<string, string> = {
          'A': 'الأولى', 'B': 'الثانية', 'C': 'الثالثة', 'D': 'الرابعة',
          'E': 'الخامسة', 'F': 'السادسة', 'G': 'السابعة', 'H': 'الثامنة'
        };
        grName = `المجموعة ${arabicLetters[letter] || letter}`;
      }
    } else {
      if (grName.includes('Group Stage - Group')) {
        const letter = grName.split(' ').pop() || '';
        grName = `Group ${letter}`;
      }
    }

    // Create Match structure
    const mapped: Match = {
      id: String(fixture.id),
      teamHome: teamHomeName,
      teamAway: teamAwayName,
      teamHomeFlag,
      teamAwayFlag,
      scoreHome: goals.home ?? 0,
      scoreAway: goals.away ?? 0,
      time: timeLabel,
      date: dateStr,
      status,
      group: grName,
      stadium: translateStadiumName(fixture.venue.name || 'Stadium', !isEn),
      liveMinute: fixture.status.elapsed || undefined,
    };

    return mapped;
  });
}

function translateStadiumName(stadium: string, toAr: boolean): string {
  if (toAr) {
    if (stadium.toLowerCase().includes('metlife')) return 'ملعب ميتلايف، نيويورك';
    if (stadium.toLowerCase().includes('rose bowl')) return 'ملعب روز بول، لوس أنجلوس';
    if (stadium.toLowerCase().includes('hard rock')) return 'ملعب هارد روك، ميامي';
    if (stadium.toLowerCase().includes('mercedes-benz')) return 'ملعب مرسيدس بنز، أتلانتا';
    if (stadium.toLowerCase().includes('stadium')) return 'ملعب واستاد كأس العالم';
    return stadium;
  }
  return stadium;
}

/**
 * Async API-Football Fetch helper
 */
export async function fetchFromFootballApi(endpoint: string, queryParams: Record<string, string> = {}): Promise<any> {
  const queryStr = new URLSearchParams(queryParams).toString();
  const url = `/api/football/${endpoint}${queryStr ? '?' + queryStr : ''}`;
  const response = await fetch(url);
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || `Proxy error response: ${response.status}`);
  }
  return await response.json();
}

/**
 * Maps API-Football scorers response to PlayerStats[]
 */
export function mapTopScorers(apiResponse: any, language: 'ar' | 'en'): PlayerStats[] {
  const isEn = language === 'en';
  if (!apiResponse || !apiResponse.response || !Array.isArray(apiResponse.response)) {
    return [];
  }

  return apiResponse.response.slice(0, 15).map((entry: any, index: number) => {
    const player = entry.player;
    const stats = entry.statistics && entry.statistics[0];
    
    const rawTeamName = stats?.team?.name || 'Unknown';
    const finalTeamName = translateTeamName(rawTeamName, !isEn);
    const flag = getFlagForTeamName(rawTeamName, stats?.team?.code);

    const shotsTotal = stats?.shots?.total || 0;
    const shotsOn = stats?.shots?.on || 0;
    const shotsOnTargetPercent = shotsTotal > 0 ? Math.round((shotsOn / shotsTotal) * 100) : 0;

    return {
      rank: index + 1,
      name: player.name || player.lastname || 'Player',
      team: finalTeamName,
      teamFlag: flag,
      goals: stats?.goals?.total || 0,
      assists: stats?.goals?.assists || 0,
      matchesPlayed: stats?.games?.appearences || 0,
      shotsOnTargetPercent: shotsOnTargetPercent || 45,
    };
  });
}
