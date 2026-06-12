/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Match {
  id: string;
  competition: string; // e.g., دوري أبطال أوروبا
  competitionLogo?: string;
  homeTeam: string;
  homeLogo: string;
  awayTeam: string;
  awayLogo: string;
  status: 'live' | 'upcoming' | 'finished';
  time: string; // e.g., 22:00
  date: string; // YYYY-MM-DD
  score?: { home: number; away: number };
  currentMinute?: number;
  channel: string; // e.g., beIN Sports 1
  commentator: string; // e.g., حفيظ دراجي
  streamServers: { name: string; url: string; quality: string }[];
}

export interface NewsItem {
  id: string;
  title: string;
  summary: string;
  image?: string;
  date: string;
  category: string;
  views: number;
}

export interface AdsConfig {
  headerAdCode: string;
  sidebarAdCode: string;
  midFeedAdCode: string;
  popunderAdCode: string; // Adsterra / Clickadilla script
  stickyFooterAdCode: string;
  isDemoMode: boolean;
}
