import React, { useState } from 'react';
import { Match, League, NewsArticle } from '../types';
import { LEAGUES } from '../data/mockData';
import AdContainer from './AdContainer';
import { Radio, CalendarDays, Search, MapPin, ChevronRight, Newspaper, Tv, Award } from 'lucide-react';
import { getBasePath, navigateTo } from '../App';
import { generateSlug } from '../utils/slug';
import NotificationBanner from './NotificationBanner';

interface DashboardProps {
  matches: Match[];
  searchQuery: string;
  newsArticles: NewsArticle[];
}

export default function Dashboard({ matches, searchQuery, newsArticles }: DashboardProps) {
  const [selectedDay, setSelectedDay] = useState<'yesterday' | 'today' | 'tomorrow'>('today');
  const [selectedLeagueId, setSelectedLeagueId] = useState<string>('all');

  // Convert day string to relative index Offset (Yesterday = -1, Today = 0, Tomorrow = 1)
  const getOffsetForSelectedDay = () => {
    if (selectedDay === 'yesterday') return -1;
    if (selectedDay === 'tomorrow') return 1;
    return 0;
  };

  // Filter matches based on search query, day offset, and league selection
  const dayOffset = getOffsetForSelectedDay();
  
  // Calculate relative match date string
  const getSubTabDateString = (offset: number) => {
    const d = new Date('2026-06-11T12:00:00-07:00'); // Baseline matches mock
    d.setDate(d.getDate() + offset);
    return d.toISOString().split('T')[0];
  };

  const targetDateStr = getSubTabDateString(dayOffset);

  // Filter by Date
  let filteredMatches = matches.filter(m => m.date === targetDateStr);

  // Filter by League
  if (selectedLeagueId !== 'all') {
    filteredMatches = filteredMatches.filter(m => m.leagueId === selectedLeagueId);
  }

  // Filter by Search Query
  if (searchQuery.trim() !== '') {
    const q = searchQuery.toLowerCase();
    filteredMatches = filteredMatches.filter(m => 
      m.homeTeam.name.toLowerCase().includes(q) ||
      m.awayTeam.name.toLowerCase().includes(q) ||
      LEAGUES[m.leagueId]?.name.toLowerCase().includes(q) ||
      m.stadium.toLowerCase().includes(q) ||
      m.commentator.toLowerCase().includes(q)
    );
  }

  // Filter News Articles by Search Query
  const filteredNews = newsArticles.filter(article => {
    if (searchQuery.trim() === '') return true;
    const q = searchQuery.toLowerCase();
    return (
      article.title.toLowerCase().includes(q) ||
      article.summary.toLowerCase().includes(q) ||
      article.content.join(' ').toLowerCase().includes(q) ||
      article.category.toLowerCase().includes(q)
    );
  });

  // Group filtered matches by League ID
  const matchesByLeague: Record<string, Match[]> = {};
  filteredMatches.forEach(m => {
    if (!matchesByLeague[m.leagueId]) {
      matchesByLeague[m.leagueId] = [];
    }
    matchesByLeague[m.leagueId].push(m);
  });

  // Get active leagues list for headers (ordered by priority)
  const activeLeagueIds = Object.keys(matchesByLeague).sort((a, b) => {
    const priorityA = LEAGUES[a]?.priority || 99;
    const priorityB = LEAGUES[b]?.priority || 99;
    return priorityA - priorityB;
  });

  const rendersWorldCupHub = () => {
    return (
      <div className="bg-gradient-to-r from-amber-600/20 via-[#16191E] to-amber-700/10 border border-slate-700/40 rounded-xl p-5 space-y-4 shadow-lg text-left">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800/85 pb-4">
          <div>
            <span className="text-[10px] font-mono tracking-widest text-amber-400 bg-amber-400/10 px-2.5 py-1 rounded border border-amber-400/20 font-extrabold uppercase animate-pulse">
              FIFA World Cup Category Hub
            </span>
            <h2 className="text-xl font-extrabold text-white mt-1.5 flex items-center gap-1.5 font-sans">
              Mondial Soccer - Group & Playoff Stages <span className="text-amber-400">🏆</span>
            </h2>
            <p className="text-xs text-slate-400 mt-1 max-w-md">
              Welcome to the specialized World Cup section on Nexus Kora. Track live statistics, interactive standings, and real-time playoff developments.
            </p>
          </div>
          <div className="flex gap-2">
            <div className="bg-slate-950/60 border border-slate-800 px-3 py-2 rounded text-center min-w-[70px]">
              <span className="text-lg block">🇲🇦</span>
              <span className="text-[9px] font-mono text-slate-400 select-none">Morocco</span>
              <span className="text-[10px] font-mono text-emerald-400 font-bold block">Historic Runs</span>
            </div>
            <div className="bg-slate-950/60 border border-slate-800 px-3 py-2 rounded text-center min-w-[70px]">
              <span className="text-lg block">🇦🇷</span>
              <span className="text-[9px] font-mono text-slate-400 select-none">Argentina</span>
              <span className="text-[10px] font-mono text-amber-400 font-bold block">Defending Champ</span>
            </div>
          </div>
        </div>

        {/* Group stage tables */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Group A */}
          <div className="bg-slate-950/45 border border-slate-800 rounded-lg p-3">
            <div className="flex justify-between items-center border-b border-slate-900 pb-1.5 mb-1.5 text-xs font-bold text-amber-400 font-mono">
              <span>Group A Standing</span>
              <div className="flex gap-3">
                <span>W-D-L</span>
                <span>PTS</span>
              </div>
            </div>
            <div className="space-y-1.5 text-xs text-slate-300">
              <div className="flex justify-between items-center py-0.5 font-semibold text-white">
                <span className="flex items-center gap-1.5"><span>1.</span> 🇦🇷 Argentina</span>
                <div className="flex gap-4 font-mono">
                  <span className="text-slate-500">3-0-0</span>
                  <span>9</span>
                </div>
              </div>
              <div className="flex justify-between items-center py-0.5">
                <span className="flex items-center gap-1.5"><span>2.</span> 🇫🇷 France</span>
                <div className="flex gap-4 font-mono">
                  <span className="text-slate-500">2-0-1</span>
                  <span>6</span>
                </div>
              </div>
              <div className="flex justify-between items-center py-0.5 text-slate-500">
                <span className="flex items-center gap-1.5"><span>3.</span> 🇩🇿 Algeria</span>
                <div className="flex gap-4 font-mono">
                  <span className="text-slate-600">0-0-3</span>
                  <span>0</span>
                </div>
              </div>
            </div>
          </div>

          {/* Group B */}
          <div className="bg-slate-950/45 border border-slate-800 rounded-lg p-3">
            <div className="flex justify-between items-center border-b border-slate-900 pb-1.5 mb-1.5 text-xs font-bold text-emerald-400 font-mono">
              <span>Group B Standing</span>
              <div className="flex gap-3">
                <span>W-D-L</span>
                <span>PTS</span>
              </div>
            </div>
            <div className="space-y-1.5 text-xs text-slate-300">
              <div className="flex justify-between items-center py-0.5 font-semibold text-white">
                <span className="flex items-center gap-1.5"><span>1.</span> 🇲🇦 Morocco</span>
                <div className="flex gap-4 font-mono">
                  <span className="text-slate-500">2-1-0</span>
                  <span>7</span>
                </div>
              </div>
              <div className="flex justify-between items-center py-0.5">
                <span className="flex items-center gap-1.5"><span>2.</span> 🇪🇸 Spain</span>
                <div className="flex gap-4 font-mono">
                  <span className="text-slate-500">1-1-1</span>
                  <span>4</span>
                </div>
              </div>
              <div className="flex justify-between items-center py-0.5 text-slate-500">
                <span className="flex items-center gap-1.5"><span>3.</span> 🇯🇵 Japan</span>
                <div className="flex gap-4 font-mono">
                  <span className="text-slate-600">0-1-2</span>
                  <span>1</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const rendersEplHub = () => {
    return (
      <div className="bg-gradient-to-r from-blue-900/10 via-[#16191E] to-blue-950/10 border border-slate-800 rounded-xl p-4 text-left space-y-3 shadow-md">
        <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
          <div>
            <span className="text-[10px] font-mono text-emerald-400 uppercase font-bold tracking-widest">
              Premier League Category
            </span>
            <h3 className="font-extrabold text-white text-base mt-0.5">EPL England Standings & News</h3>
          </div>
          <span className="text-[10px] bg-slate-950 border border-slate-800 text-slate-400 font-mono px-2 py-0.5 rounded">
            Season 2025/2026
          </span>
        </div>
        <div className="bg-slate-950/45 border border-slate-800 rounded-lg p-3">
          <div className="space-y-1.5 text-xs">
            <div className="flex justify-between items-center text-slate-500 border-b border-slate-900 pb-1 font-mono uppercase text-[9px] font-bold">
              <span>Club Name</span>
              <div className="flex gap-4 min-w-[90px] justify-end">
                <span>Record</span>
                <span>PTS</span>
              </div>
            </div>
            <div className="flex justify-between items-center py-0.5">
              <span className="font-bold text-white flex items-center gap-1"><span>1.</span> 🔴 Arsenal</span>
              <div className="flex gap-4 min-w-[90px] justify-end font-mono">
                <span>24-6-3</span>
                <span className="font-bold text-emerald-400">78</span>
              </div>
            </div>
            <div className="flex justify-between items-center py-0.5">
              <span className="text-slate-300 flex items-center gap-1"><span>2.</span> 🔵 Manchester City</span>
              <div className="flex gap-4 min-w-[90px] justify-end font-mono">
                <span>23-6-4</span>
                <span>75</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <main className="max-w-7xl mx-auto px-4 py-6 space-y-6" id="main-content">
      {/* 1. Header Leaderboard Ad (728x90 layout placeholder) */}
      <AdContainer id="top-banner" type="leaderboard" className="mx-auto" />

      {/* Grid Layout: Main Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left / Center Column: Live Scores & League Filters (Occupies 2 columns on lg) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Chronological sub-tabs & League Badges bar */}
          <div className="bg-[#16191E] border border-slate-800 rounded-xl p-4 shadow-sm space-y-4">
            <div className="flex flex-wrap justify-between items-center gap-4 border-b border-slate-800 pb-3">
              {/* Yesterday, Today, Tomorrow Sub-tabs */}
              <div className="flex bg-[#0F1115] p-1 rounded-lg border border-slate-800/80">
                {(['yesterday', 'today', 'tomorrow'] as const).map((day) => (
                  <button
                    key={day}
                    onClick={() => setSelectedDay(day)}
                    className={`px-4 py-2 text-xs font-bold font-mono uppercase tracking-wider rounded-md transition-all ${
                      selectedDay === day
                        ? 'bg-emerald-500 text-slate-955 shadow-md shadow-emerald-500/10'
                        : 'text-slate-400 hover:text-slate-100'
                    }`}
                  >
                    {day}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-1 text-xs font-mono text-slate-400 bg-slate-950/40 px-2.5 py-1.5 rounded border border-slate-800/60">
                <CalendarDays className="w-4 h-4 text-emerald-400" />
                <span className="uppercase">Matchday Tracker</span>
              </div>
            </div>

            {/* Quick league selectors */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-thin">
              <button
                onClick={() => setSelectedLeagueId('all')}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                  selectedLeagueId === 'all'
                    ? 'bg-slate-800 text-emerald-400 border border-emerald-500/20'
                    : 'bg-[#0F1115] text-slate-400 hover:text-slate-205 border border-transparent'
                }`}
              >
                All Leagues
              </button>
              {Object.values(LEAGUES).map((lg) => (
                <button
                  key={lg.id}
                  onClick={() => setSelectedLeagueId(lg.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all flex items-center gap-1.5 ${
                    selectedLeagueId === lg.id
                      ? 'bg-slate-800 text-emerald-400 border border-emerald-500/20'
                      : 'bg-[#0F1115] text-slate-400 hover:text-slate-201 border border-transparent'
                  }`}
                >
                  <span>{lg.logo}</span>
                  <span>{lg.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Scores Listing Section */}
          <div className="space-y-4">
            {selectedLeagueId === 'worldcup' && rendersWorldCupHub()}
            {selectedLeagueId === 'epl' && rendersEplHub()}
            {selectedLeagueId === 'all' && (
              <div className="bg-[#16191E] border border-slate-800 rounded-xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm text-left relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-full blur-2xl pointer-events-none"></div>
                <div className="space-y-1 z-10">
                  <span className="text-[9px] font-mono font-bold text-amber-400 bg-amber-400/10 px-2.5 py-0.5 rounded border border-amber-500/20 uppercase">Featured Tournament</span>
                  <h3 className="font-extrabold text-sm text-slate-100 flex items-center gap-1.5 font-sans mt-1">
                    FIFA World Cup Qatar Mondial <span className="animate-pulse">🏆</span>
                  </h3>
                  <p className="text-xs text-slate-400 leading-normal max-w-md">
                    Explore group standings, historic details, and live playoff runs. Visit our dedicated World Cup category view on Nexus Kora!
                  </p>
                </div>
                <button
                  onClick={() => setSelectedLeagueId('worldcup')}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-755 hover:bg-slate-700 text-emerald-400 font-bold text-xs rounded-lg border border-emerald-500/20 whitespace-nowrap transition-all z-10"
                >
                  Enter World Cup Category Hub →
                </button>
              </div>
            )}
            {activeLeagueIds.length === 0 ? (
              <div className="p-12 text-center bg-[#16191E] border border-slate-800 rounded-xl">
                <p className="text-slate-400">No scheduled matches match your active filters.</p>
                <button 
                  onClick={() => { setSelectedLeagueId('all'); setSelectedDay('today'); }}
                  className="mt-4 px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold rounded"
                >
                  Reset Active Filters
                </button>
              </div>
            ) : (
              activeLeagueIds.map((leagueId, leagueIdx) => {
                const league = LEAGUES[leagueId];
                const leagueMatches = matchesByLeague[leagueId];

                return (
                  <div key={leagueId} className="bg-[#16191E] border border-slate-800 rounded-xl overflow-hidden shadow-sm">
                    {/* League Header bar */}
                    <div className="bg-slate-950/40 px-4 py-3 flex items-center justify-between border-b border-slate-800/80">
                      <div className="flex items-center gap-2">
                        <span className="text-xl">{league?.logo}</span>
                        <div>
                          <h3 className="font-extrabold text-xs text-slate-100 uppercase tracking-wider font-mono">
                            {league?.name}
                          </h3>
                          <span className="text-[10px] text-slate-500 font-mono tracking-tight uppercase">
                            {league?.country}
                          </span>
                        </div>
                      </div>
                      <span className="text-[10px] text-emerald-400 bg-emerald-500/10 border border-emerald-500/10 px-2 py-0.5 rounded font-mono uppercase">
                        Verified Fixtures
                      </span>
                    </div>

                    {/* League Match Rows */}
                    <div className="divide-y divide-slate-800/50">
                      {leagueMatches.map((m, mIdx) => (
                        <a
                          key={m.id}
                          href={`${getBasePath() || ''}/match/${m.id}-${generateSlug(m.homeTeam.name + ' vs ' + m.awayTeam.name)}`}
                          onClick={(e) => navigateTo(`${getBasePath() || ''}/match/${m.id}-${generateSlug(m.homeTeam.name + ' vs ' + m.awayTeam.name)}`, e)}
                          className="flex flex-col sm:flex-row items-stretch justify-between p-4 hover:bg-slate-850/30 transition-colors gap-4"
                          id={`match-row-${m.id}`}
                        >
                          {/* Left: Timestamp / Live minute indicator */}
                          <div className="flex items-center sm:justify-center sm:w-24 shrink-0 font-mono text-xs">
                            {m.status === 'LIVE' ? (
                              <div className="flex flex-row sm:flex-col items-center gap-2 bg-emerald-950 text-emerald-400 border border-emerald-500/10 px-2.5 py-1 rounded w-full justify-center">
                                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                                <span className="font-extrabold">{m.minute}' min</span>
                              </div>
                            ) : m.status === 'FINISHED' ? (
                              <span className="text-slate-500 uppercase tracking-widest text-[10px] bg-slate-950 border border-slate-800 px-2 py-1 rounded font-bold w-full text-center block">
                                FT
                              </span>
                            ) : (
                              <div className="flex flex-row sm:flex-col items-center sm:text-center w-full">
                                <span className="text-emerald-400 font-bold block sm:w-full">{m.displayTime}</span>
                                <span className="text-[10px] text-slate-500 block sm:w-full">Upcoming</span>
                              </div>
                            )}
                          </div>

                          {/* Center: Home vs Away content area */}
                          <div className="flex-1 grid grid-cols-3 items-center gap-1 sm:gap-4 select-none">
                            {/* Home Team */}
                            <div className="text-right flex items-center justify-end gap-2.5">
                              <span className="text-xs sm:text-sm font-semibold text-slate-200 truncate">
                                {m.homeTeam.name}
                              </span>
                              {m.homeTeam.logo.startsWith('http') || m.homeTeam.logo.includes('/') ? (
                                <img
                                  referrerPolicy="no-referrer"
                                  src={m.homeTeam.logo}
                                  alt={m.homeTeam.name}
                                  className="w-8 h-8 object-contain rounded-lg shadow border border-white/5 bg-slate-900/60 p-1"
                                />
                              ) : (
                                <div className={`w-8 h-8 ${m.homeTeam.logo} flex items-center justify-center rounded-lg shadow border border-white/5`}>
                                  <span className="text-[10px] font-mono text-slate-100 font-bold uppercase">{m.homeTeam.code}</span>
                                </div>
                              )}
                            </div>

                            {/* Center Scorebox */}
                            <div className="text-center font-mono py-1">
                              {m.status !== 'UPCOMING' ? (
                                <div className="inline-flex items-center bg-slate-950 px-3 py-1.5 rounded-lg border border-slate-800 font-extrabold text-base tracking-widest gap-2">
                                  <span className={m.status === 'LIVE' ? 'text-emerald-400' : 'text-slate-310'}>
                                    {m.homeScore}
                                  </span>
                                  <span className="text-slate-650">:</span>
                                  <span className={m.status === 'LIVE' ? 'text-emerald-400' : 'text-slate-310'}>
                                    {m.awayScore}
                                  </span>
                                </div>
                              ) : (
                                <span className="text-slate-500 font-bold text-xs bg-slate-950 border border-slate-800/60 px-2.5 py-1 rounded">
                                  VS
                                </span>
                              )}
                            </div>

                            {/* Away Team */}
                            <div className="text-left flex items-center justify-start gap-2.5">
                              {m.awayTeam.logo.startsWith('http') || m.awayTeam.logo.includes('/') ? (
                                <img
                                  referrerPolicy="no-referrer"
                                  src={m.awayTeam.logo}
                                  alt={m.awayTeam.name}
                                  className="w-8 h-8 object-contain rounded-lg shadow border border-white/5 bg-slate-900/60 p-1"
                                />
                              ) : (
                                <div className={`w-8 h-8 ${m.awayTeam.logo} flex items-center justify-center rounded-lg shadow border border-white/5`}>
                                  <span className="text-[10px] font-mono text-slate-100 font-bold uppercase">{m.awayTeam.code}</span>
                                </div>
                              )}
                              <span className="text-xs sm:text-sm font-semibold text-slate-200 truncate">
                                {m.awayTeam.name}
                              </span>
                            </div>
                          </div>

                          {/* Right: Info link anchor info */}
                          <div className="flex items-center justify-end sm:w-20 font-mono text-[11px] text-slate-500 shrink-0">
                            <span className="group-hover:text-emerald-400 transition-colors flex items-center gap-0.5">
                              Details <ChevronRight className="w-3.5 h-3.5" />
                            </span>
                          </div>
                        </a>
                      ))}
                    </div>
                  </div>
                );
              })
            )}

            {/* 2. Mid-page programmatic ad container placed dynamically below main scores lists */}
            <AdContainer id="mid-list-ad" type="in-feed" className="my-6" />
          </div>
        </div>

        {/* Right Column: News Articles & Editorial Columns */}
        <div className="space-y-6">
          <div className="bg-[#16191E] border border-slate-800 rounded-xl p-4 shadow-sm space-y-4">
            <h3 className="font-extrabold text-sm text-slate-100 uppercase tracking-wider font-mono flex items-center gap-2 border-b border-slate-850 pb-3">
              <Newspaper className="w-4 h-4 text-emerald-400" />
              Latest Football News
            </h3>

            {filteredNews.length === 0 ? (
              <p className="text-slate-500 text-xs italic p-4 text-center">No editorial matches found.</p>
            ) : (
              <div className="space-y-4">
                {filteredNews.map((art) => (
                  <a
                    key={art.id}
                    href={`${getBasePath() || ''}/news/${art.id}-${generateSlug(art.title)}`}
                    onClick={(e) => navigateTo(`${getBasePath() || ''}/news/${art.id}-${generateSlug(art.title)}`, e)}
                    className="block group bg-slate-950 hover:bg-slate-850 border border-slate-800 rounded-lg overflow-hidden transition-all duration-300"
                    id={`news-card-${art.id}`}
                  >
                    <div className="relative h-32 bg-slate-900 overflow-hidden">
                      <img
                        src={art.imageUrl}
                        alt={art.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80"
                      />
                      <span className="absolute top-2 left-2 bg-emerald-500 text-slate-950 font-mono text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded">
                        {art.category}
                      </span>
                    </div>

                    <div className="p-3.5 space-y-2">
                      <h4 className="text-xs sm:text-sm font-bold text-slate-200 group-hover:text-emerald-400 transition-colors line-clamp-2">
                        {art.title}
                      </h4>
                      <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">
                        {art.summary}
                      </p>
                      <div className="flex items-center justify-between pt-2 border-t border-slate-900 text-[10px] font-mono text-slate-500">
                        <span>Sports Desk</span>
                        <span>{art.date}</span>
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Core App Engagement Goal Alerts subscription */}
          <NotificationBanner />

          {/* AdSense Native Side Slot */}
          <AdContainer id="right-side-native" type="native" />

          {/* Core Web Vitals Optimization / Info Panel */}
          <div className="bg-[#16191E] border border-slate-800 rounded-xl p-4 shadow-sm text-left">
            <h4 className="font-extrabold text-xs text-slate-300 uppercase font-mono tracking-widest flex items-center gap-1.5 border-b border-slate-850 pb-2 mb-2">
              <Tv className="w-3.5 h-3.5 text-emerald-400" /> Authorized Streaming Info
            </h4>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              We monitor direct satellite licensing. Live score stream commentators and pitch analytics are powered in real-time. For broadcast rights, please consult your national carrier.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
