/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Match {
  id: string;
  teamHome: string;
  teamAway: string;
  teamHomeFlag: string;
  teamAwayFlag: string;
  scoreHome: number;
  scoreAway: number;
  time: string;
  date: string;
  status: 'live' | 'upcoming' | 'finished';
  group: string;
  stadium: string;
  liveMinute?: number;
  possessionHome?: number;
  possessionAway?: number;
  shotsHome?: number;
  shotsAway?: number;
  events?: { minute: number; player: string; type: 'goal' | 'yellow' | 'red' | 'sub'; team: 'home' | 'away' }[];
}

export interface Article {
  id: string;
  title: string;
  image: string;
  category: string;
  publisherName: string;
  publisherLogoColor: string;
  elapsed: string; // e.g. "ساعتين"
  commentsCount: number;
  likesCount: number;
  viewsCount: number;
  contentSummary: string;
}

export interface PlayerStats {
  rank: number;
  name: string;
  team: string;
  teamFlag: string;
  goals: number;
  assists: number;
  matchesPlayed: number;
  shotsOnTargetPercent: number;
}

export interface GroupTeam {
  teamName: string;
  teamFlag: string;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  gf: number;
  ga: number;
  points: number;
}

export interface GroupData {
  name: string; // e.g. "المجموعة الأولى"
  teams: GroupTeam[];
}

export interface UserComment {
  id: string;
  author: string;
  avatarColor: string;
  content: string;
  timestamp: string;
  likes: number;
}

export interface VideoItem {
  id: string;
  title: string;
  thumbnail: string;
  duration: string;
  viewsCount: number;
  publisherName: string;
  elapsed: string;
  videoUrl?: string;
}

