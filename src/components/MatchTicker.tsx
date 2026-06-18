/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Match } from '../types';
import { Calendar, Play, Clock, ChevronLeft, ChevronRight, BarChart3, Star, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';

interface MatchTickerProps {
  matches: Match[];
  onTriggerSimulation?: () => void;
  onSelectMatch: (match: Match) => void;
  isAdmin?: boolean;
  onEditMatch?: (match: Match) => void;
  onDeleteMatch?: (id: string) => void;
}

export default function MatchTicker({ 
  matches, 
  onTriggerSimulation = () => {}, 
  onSelectMatch,
  isAdmin,
  onEditMatch,
  onDeleteMatch
}: MatchTickerProps) {
  const { language, t } = useLanguage();
  const [filter, setFilter] = useState<'all' | 'live' | 'upcoming' | 'finished'>('all');
  const [selectedMatch, setSelectedMatch] = useState<Match | null>(null);

  const filteredMatches = matches.filter((m) => {
    if (filter === 'all') return true;
    return m.status === filter;
  });

  const handleCardClick = (match: Match) => {
    setSelectedMatch(match);
    onSelectMatch(match);
  };

  const liveCount = matches.filter((m) => m.status === 'live').length;
  const isEn = language === 'en';

  return (
    <div className="w-full bg-white border-b border-gray-200 py-3 shadow-xs" id="match-ticker-section">
      <div className="max-w-7xl mx-auto px-4">
        {/* Ticker Header & Filters */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3 border-b border-gray-100 pb-2">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 bg-blue-600 rounded-full"></span>
            <h2 className="text-[13px] md:text-sm font-extrabold text-gray-900">{t('fixtures.title')}</h2>
            {liveCount > 0 && (
              <span className="flex items-center gap-1 bg-red-100 text-red-600 text-[10px] font-bold px-2 py-0.5 rounded-full animate-pulse">
                <span>●</span>
                <span>{liveCount} {t('match.live')}</span>
              </span>
            )}
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar scroll-smooth">
            <button
              onClick={() => setFilter('all')}
              className={`text-[11px] font-bold px-3 py-1 rounded-full transition-all ${
                filter === 'all'
                  ? 'bg-gray-900 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {isEn ? 'All' : 'الكل'} ({matches.length})
            </button>
            <button
              onClick={() => setFilter('live')}
              className={`text-[11px] font-bold px-3 py-1 rounded-full transition-all flex items-center gap-1 ${
                filter === 'live'
                  ? 'bg-red-600 text-white'
                  : 'bg-red-50 text-red-600 hover:bg-red-100'
              }`}
            >
              {t('match.live')} ({matches.filter((m) => m.status === 'live').length})
            </button>
            <button
              onClick={() => setFilter('upcoming')}
              className={`text-[11px] font-bold px-3 py-1 rounded-full transition-all ${
                filter === 'upcoming'
                  ? 'bg-blue-600 text-white'
                  : 'bg-blue-50 text-blue-600 hover:bg-blue-100'
              }`}
            >
              {isEn ? 'Upcoming' : 'قريباً'} ({matches.filter((m) => m.status === 'upcoming').length})
            </button>
            <button
              onClick={() => setFilter('finished')}
              className={`text-[11px] font-bold px-3 py-1 rounded-full transition-all ${
                filter === 'finished'
                  ? 'bg-emerald-600 text-white'
                  : 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100'
              }`}
            >
              {t('match.finished')} ({matches.filter((m) => m.status === 'finished').length})
            </button>

            {/* Simulated Live Match Event Trigger removed */}
          </div>
        </div>

        {/* Ticker Row */}
        <div className="relative">
          <div className="flex gap-3 overflow-x-auto pb-2 scroll-smooth-touch scroll-smooth-x no-scrollbar">
            <AnimatePresence mode="popLayout">
              {filteredMatches.length === 0 ? (
                <div className="w-full text-center py-4 text-xs text-gray-500 flex items-center justify-center gap-2">
                  <AlertCircle className="w-4 h-4" />
                  <span>{isEn ? "No matches found in this category." : "لا توجد مباريات تلوح في نطاق هذا البحث حالياً."}</span>
                </div>
              ) : (
                filteredMatches.map((match) => (
                  <motion.div
                    key={match.id}
                    layoutId={`match-card-${match.id}`}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    onClick={() => handleCardClick(match)}
                    className={`shrink-0 w-[240px] md:w-[260px] p-3 rounded-lg border cursor-pointer hover:shadow-md transition-all duration-200 relative ${
                      match.status === 'live'
                        ? 'border-red-200 bg-red-50/5 hover:bg-red-50/15'
                        : selectedMatch?.id === match.id
                        ? 'border-blue-500 bg-blue-50/10'
                        : 'border-gray-200 bg-white hover:border-gray-300'
                    }`}
                  >
                    {/* Card Top Block */}
                    <div className="flex justify-between items-center mb-2.5">
                      <span className="text-[10px] font-bold text-gray-500 bg-gray-100 px-1.5 py-0.5 rounded-sm">
                        {t(match.group)}
                      </span>
                      {match.status === 'live' ? (
                        <div className="flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-pulse"></span>
                          <span className="text-[10px] font-black text-red-600 font-mono tracking-wider">
                            {t('match.live')} {match.time}
                          </span>
                        </div>
                      ) : match.status === 'finished' ? (
                        <span className="text-[10px] font-bold text-gray-600 bg-gray-100 px-1.5 py-0.5 rounded-xs">
                          {t('match.finished')}
                        </span>
                      ) : (
                        <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded-xs">
                          {isEn ? match.time.replace('اليوم', 'Today').replace('غداً', 'Tomorrow') : match.time}
                        </span>
                      )}
                    </div>

                    {/* Team 1 Panel */}
                    <div className="flex items-center justify-between text-xs font-semibold mb-2 text-gray-900">
                      <div className="flex items-center gap-2">
                        <span className="text-xl leading-none" role="img" aria-label={match.teamHome}>
                          {match.teamHomeFlag}
                        </span>
                        <span className="truncate max-w-[130px]">{t(match.teamHome)}</span>
                      </div>
                      <span className={`font-mono text-sm font-black ${match.status === 'upcoming' ? 'text-gray-300' : 'text-gray-800'}`}>
                        {match.status === 'upcoming' ? '-' : match.scoreHome}
                      </span>
                    </div>

                    {/* Team 2 Panel */}
                    <div className="flex items-center justify-between text-xs font-semibold text-gray-900">
                      <div className="flex items-center gap-2">
                        <span className="text-xl leading-none" role="img" aria-label={match.teamAway}>
                          {match.teamAwayFlag}
                        </span>
                        <span className="truncate max-w-[130px]">{t(match.teamAway)}</span>
                      </div>
                      <span className={`font-mono text-sm font-black ${match.status === 'upcoming' ? 'text-gray-300' : 'text-gray-800'}`}>
                        {match.status === 'upcoming' ? '-' : match.scoreAway}
                      </span>
                    </div>

                    {/* Bottom Status bar */}
                    <div className="mt-2.5 pt-2 border-t border-dotted border-gray-100 flex justify-between items-center text-[10px] text-gray-500">
                      <span className="truncate max-w-[150px]" title={t(match.stadium)}>
                        {t(match.stadium)}
                      </span>
                      <BarChart3 className="w-3.5 h-3.5 text-gray-400 group-hover:text-blue-500" />
                    </div>
                  </motion.div>
                ))
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Selected Match Expanded Stats Overlay Widget */}
        <AnimatePresence>
          {selectedMatch && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="mt-4 bg-gray-50 rounded-lg p-4 border border-gray-200 overflow-hidden"
              id="match-expanded-details-pane"
            >
              <div className="flex justify-between items-center pb-3 border-b border-gray-200 mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-extrabold text-[#111827]">
                    {isEn ? "Live Match Stats & Events:" : "تفاصيل إحصائيات المباراة الحية:"}
                  </span>
                  <span className="text-[#3b82f6] text-[11px] font-bold bg-[#eff6ff] px-2 py-0.5 rounded-full">
                    {t(selectedMatch.stadium)}
                  </span>
                </div>
                <button
                  onClick={() => setSelectedMatch(null)}
                  className="text-gray-400 hover:text-gray-900 font-extrabold text-sm px-2 py-0.5 bg-gray-200 rounded-full hover:bg-gray-300 pointer"
                >
                  {isEn ? "Close Report ×" : "إغلاق التقرير ×"}
                </button>
              </div>

              {selectedMatch.status === 'upcoming' ? (
                <div className="text-center py-6">
                  <Calendar className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                  <p className="text-xs font-bold text-gray-700">{isEn ? "Match hasn't started yet." : "لم تبدأ المباراة بعد."}</p>
                  <p className="text-[11px] text-gray-500 mt-1">
                    {isEn ? `Kickoff: ${selectedMatch.date} at ${selectedMatch.time}` : `تاريخ الانطلاق: ${selectedMatch.date} بتمام ${selectedMatch.time}`}
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {/* Visual Stats Column */}
                  <div className="flex flex-col gap-3 justify-center">
                    {/* Header Scoreline */}
                    <div className="flex items-center justify-around bg-white p-3 rounded-lg border border-gray-200 shadow-xs mb-1">
                      <div className="text-center">
                        <span className="text-3xl font-bold leading-none">{selectedMatch.teamHomeFlag}</span>
                        <p className="text-xs font-extrabold mt-1">{t(selectedMatch.teamHome)}</p>
                      </div>
                      <div className="text-center px-4">
                        <span className="text-xl md:text-2xl font-black font-mono bg-gray-950 text-white px-3 py-1 rounded-md">
                          {selectedMatch.scoreHome} - {selectedMatch.scoreAway}
                        </span>
                        <p className="text-[10px] text-red-500 font-bold mt-1.5 flex items-center justify-center gap-1">
                          {selectedMatch.status === 'live' ? (
                            <>
                              <span className="w-1.5 h-1.5 bg-red-600 rounded-full animate-ping"></span>
                              <span>{isEn ? `2nd Half ${selectedMatch.time}` : `الشوط الثاني ${selectedMatch.time}`}</span>
                            </>
                          ) : (
                            <span className="text-gray-500 font-medium">{isEn ? "Full Time" : "نهاية اللقاء"}</span>
                          )}
                        </p>
                      </div>
                      <div className="text-center">
                        <span className="text-3xl font-bold leading-none">{selectedMatch.teamAwayFlag}</span>
                        <p className="text-xs font-extrabold mt-1">{t(selectedMatch.teamAway)}</p>
                      </div>
                    </div>

                    {/* Possession bar */}
                    <div>
                      <div className="flex justify-between text-[11px] font-bold text-gray-600 mb-1">
                        <span>{isEn ? "Possession" : "الاستحواذ"} {selectedMatch.possessionHome || 50}%</span>
                        <span>{selectedMatch.possessionAway || 50}% {isEn ? "Possession" : "الاستحواذ"}</span>
                      </div>
                      <div className="w-full h-2.5 bg-gray-200 rounded-full flex overflow-hidden">
                        <div
                          className="bg-blue-600 h-full border-l border-white"
                          style={{ width: `${selectedMatch.possessionHome || 50}%` }}
                        ></div>
                        <div
                          className="bg-[#22c55e] h-full"
                          style={{ width: `${selectedMatch.possessionAway || 50}%` }}
                        ></div>
                      </div>
                    </div>

                    {/* Shots Stats line */}
                    <div className="flex justify-between items-center text-[11px] font-bold text-gray-600 bg-white px-3 py-2 border border-gray-200 rounded-md">
                      <span>{isEn ? "Total Shots" : "إجمالي التسديدات"} {selectedMatch.shotsHome || 0}</span>
                      <span className="text-[10px] bg-slate-100 font-extrabold text-slate-500 px-2 py-0.5 rounded-sm">{t('match.shots')}</span>
                      <span>{isEn ? "Total Shots" : "إجمالي التسديدات"} {selectedMatch.shotsAway || 0}</span>
                    </div>
                  </div>

                  {/* Events timeline column */}
                  <div className="bg-white p-3.5 rounded-lg border border-gray-200">
                    <h3 className="text-xs font-black text-gray-800 border-b border-gray-100 pb-2 mb-2 flex items-center gap-1.5">
                      <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                      <span>{isEn ? "Interactive Timeline Report" : "تقرير ومجريات المباراة التفاعلي"}</span>
                    </h3>
                    <div className="flex flex-col gap-2 max-h-[170px] overflow-y-auto pr-1">
                      {selectedMatch.events && selectedMatch.events.length > 0 ? (
                        selectedMatch.events.map((ev, i) => (
                          <div
                            key={i}
                            className={`flex items-center gap-3.5 text-[11px] py-1.5 px-2 rounded-xs ${
                              ev.team === 'home' ? 'bg-blue-50/20 text-blue-900 border-r-3 border-blue-600' : 'bg-emerald-50/20 text-emerald-900 border-r-3 border-emerald-600'
                            }`}
                          >
                            <span className="font-mono font-bold bg-slate-100 text-slate-700 px-1.5 py-0.5 rounded-sm shrink-0">
                              {ev.minute}'
                            </span>
                            <div className="flex items-center gap-1 shrink-0">
                              {ev.type === 'goal' && <span className="text-xs">⚽</span>}
                              {ev.type === 'yellow' && <span className="w-2 h-3 bg-amber-400 rounded-xs inline-block" title="Yellow Card"></span>}
                              {ev.type === 'red' && <span className="w-2 h-3 bg-red-600 rounded-xs inline-block" title="Red Card"></span>}
                            </div>
                            <span className="font-bold">
                              {/* If player's name is in Arabic but system is in English, keep it as is or show nicely */}
                              {ev.player}
                            </span>
                            <span className="text-[10px] text-gray-400 mr-auto">
                              ({ev.type === 'goal' ? (isEn ? 'Goal' : 'هدف') : ev.type === 'yellow' ? (isEn ? 'Yellow' : 'إنذار') : (isEn ? 'Red' : 'طرد')})
                            </span>
                          </div>
                        ))
                      ) : (
                        <p className="text-[11px] text-gray-400 py-4 text-center">{isEn ? "No notable milestones yet." : "لا توجد حوادث بارزة مسجلة في هذا اللقاء بعد."}</p>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
