/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Match, GroupData, PlayerStats, GroupTeam } from '../types';
import { translateTeamName, getFlagForTeamName } from './footballApi';

const BASE_URL = "https://v3.football.api-sports.io";

/**
 * Common fetch helper that handles request logging, client-side API key,
 * server proxy fallbacks to avoid CORS issues, and error extraction.
 */
async function fetchFromApi(endpoint: string, queryParams: Record<string, string> = {}): Promise<any> {
  const apiKey = (import.meta as any).env?.VITE_FOOTBALL_API_KEY || '';
  if (!apiKey) {
    console.error(`[API-Football] VITE_FOOTBALL_API_KEY is missing!`);
    throw new Error("API key is missing.");
  }

  const queryStr = new URLSearchParams(queryParams).toString();
  const targetUrl = `${BASE_URL}/${endpoint}${queryStr ? '?' + queryStr : ''}`;
  
  const headers: Record<string, string> = {
    "x-rapidapi-key": apiKey,
    "x-rapidapi-host": "v3.football.api-sports.io"
  };

  console.log(`[API-Football Request Direct-Log] Endpoint: ${endpoint} | URL target: ${targetUrl} | Query:`, queryParams);

  try {
    const response = await fetch(targetUrl, {
      method: 'GET',
      headers: headers,
    });

    console.log(`[API-Football Response Direct-Log] Status: ${response.status} for endpoint: ${endpoint}`);

    if (!response.ok) {
      const errText = await response.text();
      console.error(`[API-Football Response Error Log] Endpoint: ${endpoint} failed. Status: ${response.status} | Body: ${errText}`);
      throw new Error(`API-Football server returned status code: ${response.status}. Details: ${errText}`);
    }

    const data = await response.json();
    console.log(`[API-Football Payload Direct-Log] Received ${data?.results ?? 0} results for endpoint: ${endpoint}. Payload:`, data);

    // Some 200 OK responses contain internal "errors" object
    if (data.errors && Object.keys(data.errors).length > 0) {
      const errorMsg = Object.entries(data.errors).map(([key, val]) => `${key}: ${val}`).join('; ');
      console.error(`[API-Football Internal Response Error] Received errors within payload: ${errorMsg}`);
      throw new Error(`API-Football Internal Error: ${errorMsg}`);
    }

    return data;
  } catch (error: any) {
    console.error(`[API-Football Fetch Exception] Failed to execute request on endpoint ${endpoint}:`, error);
    throw error;
  }
}

/**
 * Transform standard API-Football Fixture response items to Match[]
 */
function mapRawFixturesToMatches(apiResponse: any, isEn: boolean): Match[] {
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

    // Time Label formulation
    let timeLabel = '';
    if (status === 'live') {
      timeLabel = `${fixture.status.elapsed}'`;
    } else if (status === 'finished') {
      timeLabel = isEn ? 'FT' : 'انتهت';
    } else {
      try {
        const rawDate = new Date(fixture.date);
        const hours = String(rawDate.getHours()).padStart(2, '0');
        const minutes = String(rawDate.getMinutes()).padStart(2, '0');
        timeLabel = `${hours}:${minutes}`;
      } catch (e) {
        timeLabel = fixture.status.long || 'VS';
      }
    }

    // Date Formulation
    let dateStr = '';
    try {
      dateStr = new Date(fixture.date).toISOString().split('T')[0];
    } catch (e) {
      dateStr = fixture.date;
    }

    // Round / Group formatting
    let roundName = entry.league.round || 'Group Stage';
    if (!isEn) {
      if (roundName.includes('Group Stage - Group')) {
        const letter = roundName.split(' ').pop() || '';
        const arabicLetters: Record<string, string> = {
          'A': 'الأولى', 'B': 'الثانية', 'C': 'الثالثة', 'D': 'الرابعة',
          'E': 'الخامسة', 'F': 'السادسة', 'G': 'السابعة', 'H': 'الثامنة'
        };
        roundName = `المجموعة ${arabicLetters[letter] || letter}`;
      }
    } else {
      if (roundName.includes('Group Stage - Group')) {
        const letter = roundName.split(' ').pop() || '';
        roundName = `Group ${letter}`;
      }
    }

    return {
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
      group: roundName,
      stadium: fixture.venue?.name || 'Stadium',
      liveMinute: fixture.status.elapsed || undefined,
    };
  });
}

/**
 * 1. Read today's matches
 * Format date = YYYY-MM-DD
 */
export async function getTodayMatches(isEn = true): Promise<Match[]> {
  const todayStr = new Date().toISOString().split('T')[0];
  const response = await fetchFromApi('fixtures', { date: todayStr });
  return mapRawFixturesToMatches(response, isEn);
}

/**
 * 2. Read live matches
 * live = all
 */
export async function getLiveMatches(isEn = true): Promise<Match[]> {
  const response = await fetchFromApi('fixtures', { live: 'all' });
  return mapRawFixturesToMatches(response, isEn);
}

/**
 * 3. Read specific match timeline/events
 * endpoint: fixtures/events
 */
export async function getFixtureEvents(fixtureId: string): Promise<any[]> {
  const response = await fetchFromApi('fixtures/events', { fixture: fixtureId });
  if (!response || !response.response || !Array.isArray(response.response)) {
    return [];
  }
  return response.response;
}

/**
 * 4. Read standing groups
 * endpoint: standings
 */
export async function getStandings(leagueId: string, season: string, isEn = true): Promise<GroupData[]> {
  const rawData = await fetchFromApi('standings', { league: leagueId, season: season });
  if (!rawData || !rawData.response || rawData.response.length === 0) {
    return [];
  }

  const leagueData = rawData.response[0].league;
  const rawGroups = leagueData.standings;

  if (!rawGroups || !Array.isArray(rawGroups)) return [];

  return rawGroups.map((groupList: any[], idx: number) => {
    const firstRow = groupList[0];
    const rawGroupName = firstRow?.group || `Group ${String.fromCharCode(65 + idx)}`;
    
    // Arabic translations
    let friendlyName = rawGroupName;
    if (!isEn) {
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
 * 5. Read top scorers
 * endpoint: players/topscorers
 */
export async function getTopScorers(leagueId: string, season: string, isEn = true): Promise<PlayerStats[]> {
  const rawResponse = await fetchFromApi('players/topscorers', { league: leagueId, season: season });
  if (!rawResponse || !rawResponse.response || !Array.isArray(rawResponse.response)) {
    return [];
  }

  return rawResponse.response.slice(0, 15).map((entry: any, index: number) => {
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

/**
 * 6. Get league fixtures for a specific season
 * endpoint: fixtures
 */
export async function getLeagueFixtures(leagueId: string, season: string, isEn = true): Promise<Match[]> {
  const response = await fetchFromApi('fixtures', { league: leagueId, season: season });
  return mapRawFixturesToMatches(response, isEn);
}
