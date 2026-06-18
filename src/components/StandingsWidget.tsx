/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { GroupData } from '../types';
import { Search, Trophy, HelpCircle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface StandingsWidgetProps {
  groups: GroupData[];
}

export default function StandingsWidget({ groups }: StandingsWidgetProps) {
  const { language, t } = useLanguage();
  const [activeGroupIndex, setActiveGroupIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');

  const isEn = language === 'en';

  if (!groups || groups.length === 0) {
    return (
      <div className="w-full py-12 bg-white border border-gray-200 rounded-xl shadow-xs text-center text-gray-500 font-semibold text-xs" id="msn-standings-hub">
        {isEn ? "No standings data available at the moment." : "لا تتوفر بيانات الترتيب في هذه اللحظة."}
      </div>
    );
  }

  const activeGroup = groups[activeGroupIndex] || groups[0];

  // Search through all groups if search query is active
  const isSearching = searchQuery.trim().length > 0;
  
  // Find search results with respect to translated names
  const searchResults = isSearching
    ? groups.map(g => ({
        ...g,
        teams: g.teams.filter(tItem => {
          const translatedName = t(tItem.teamName).toLowerCase();
          const query = searchQuery.trim().toLowerCase();
          return tItem.teamName.toLowerCase().includes(query) || translatedName.includes(query);
        })
      })).filter(g => g.teams.length > 0)
    : [];

  return (
    <div className="w-full py-6 bg-white border border-gray-200 rounded-xl shadow-xs animate-fade-in" id="msn-standings-hub">
      <div className="px-4 md:px-6">
        
        {/* Title and search bar */}
        <div className={`flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-100 pb-4 mb-4 ${isEn ? 'md:flex-row-reverse' : ''}`}>
          <div className={`flex items-center gap-2 ${isEn ? 'flex-row-reverse' : ''}`}>
            <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
              <Trophy className="w-5 h-5" />
            </div>
            <div className={isEn ? 'text-left' : 'text-right'}>
              <h3 className="text-base font-black text-gray-950">{t('standings.title')}</h3>
              <p className="text-xs text-gray-400 font-semibold">{t('standings.subtitle')}</p>
            </div>
          </div>

          <div className="relative w-full md:w-64 shrink-0">
            <input
              type="text"
              placeholder={isEn ? "Search for a team..." : "البحث عن منتخب..."}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3.5 py-1.5 bg-gray-50 border border-gray-300 rounded-lg text-xs font-semibold text-gray-900 focus:outline-hidden focus:ring-1 focus:ring-blue-600 focus:border-blue-600 placeholder-gray-400 transition-all"
            />
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2" />
          </div>
        </div>

        {/* Group Tabs Nav (only if not searching) */}
        {!isSearching && (
          <div className={`flex items-center gap-1 overflow-x-auto pb-3 mb-4 no-scrollbar border-b border-gray-100 ${isEn ? 'flex-row-reverse' : ''}`}>
            {groups.map((group, idx) => {
              const groupLabel = isEn ? `Group ${group.name.replace('المجموعة ', '').replace('الأولى ', 'A').replace('الثانية ', 'B').replace('الثالثة ', 'C').replace('الرابعة ', 'D').replace('الخامسة ', 'E').replace('السادسة ', 'F')}` : group.name.split(' ')[0] + ' ' + group.name.split(' ')[1];
              return (
                <button
                  key={idx}
                  onClick={() => setActiveGroupIndex(idx)}
                  className={`px-3.5 py-1.5 text-xs font-extrabold rounded-lg whitespace-nowrap transition-all ${
                    activeGroupIndex === idx
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {groupLabel}
                </button>
              );
            })}
          </div>
        )}

        {/* Standings Table Rendering */}
        <div className="overflow-x-auto w-full no-scrollbar">
          <table className={`w-full border-collapse text-xs md:text-sm ${isEn ? 'text-left' : 'text-right'}`}>
            <thead>
              <tr className="border-b border-gray-200 text-gray-400 font-bold">
                <th className={`py-2.5 px-3 font-extrabold text-gray-700 w-12 ${isEn ? 'text-left' : 'text-right'}`}>#</th>
                <th className={`py-2.5 px-3 font-extrabold text-[#111827] ${isEn ? 'text-left' : 'text-right'}`}>{t('standings.th.team')}</th>
                <th className="py-2.5 px-2 font-extrabold text-center">{t('standings.th.played')}</th>
                <th className="py-2.5 px-2 font-extrabold text-center">{t('standings.th.won')}</th>
                <th className="py-2.5 px-2 font-extrabold text-center">{t('standings.th.drawn')}</th>
                <th className="py-2.5 px-2 font-extrabold text-center">{t('standings.th.lost')}</th>
                <th className="py-2.5 px-2 font-extrabold text-center">{isEn ? 'GF-GA' : 'له/عليه'}</th>
                <th className="py-2.5 px-3 font-extrabold text-center bg-gray-50 text-blue-600 rounded-t-lg">{t('standings.th.points')}</th>
              </tr>
            </thead>
            <tbody>
              {!isSearching ? (
                /* Regular group view rendering */
                activeGroup.teams.map((team, tIdx) => {
                  const isQualifyingZone = tIdx < 2;
                  return (
                    <tr
                      key={team.teamName}
                      className={`border-b border-gray-100 transition-colors hover:bg-slate-50/60 ${
                        isQualifyingZone ? 'bg-emerald-500/2 font-semibold' : ''
                      }`}
                    >
                      <td className="py-3 px-3">
                        <div className={`flex items-center gap-1.5 ${isEn ? 'flex-row' : ''}`}>
                          {isQualifyingZone ? (
                            <div className="w-1.5 h-1.5 rounded-full bg-blue-500" title={isEn ? "Direct qualification" : "مركز تأهل مباشر"}></div>
                          ) : (
                            <div className="w-1.5 h-1.5 rounded-full bg-gray-300"></div>
                          )}
                          <span className="font-mono font-bold text-gray-500">{tIdx + 1}</span>
                        </div>
                      </td>
                      <td className="py-3 px-3">
                        <div className={`flex items-center gap-2 ${isEn ? 'flex-row' : ''}`}>
                          <span className="text-xl leading-none">{team.teamFlag}</span>
                          <span className="text-gray-950 font-extrabold">{t(team.teamName)}</span>
                          {isQualifyingZone && (
                            <span className="hidden sm:inline-flex text-[10px] text-blue-600 font-extrabold bg-blue-50 px-1 py-0.5 rounded-xs">
                              {isEn ? "Q" : "تأهل"}
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="py-3 px-2 text-center font-mono font-medium text-gray-600">{team.played}</td>
                      <td className="py-3 px-2 text-center font-mono font-medium text-emerald-600 bg-emerald-50/5">{team.won}</td>
                      <td className="py-3 px-2 text-center font-mono font-medium text-gray-500">{team.drawn}</td>
                      <td className="py-3 px-2 text-center font-mono font-medium text-red-500 bg-red-50/5">{team.lost}</td>
                      <td className="py-3 px-2 text-center font-mono text-xs text-gray-400" dir="ltr">
                        {team.gf} - {team.ga}
                      </td>
                      <td className="py-3 px-3 text-center font-black font-mono text-gray-900 bg-slate-50/80 rounded-b-lg">
                        {team.points}
                      </td>
                    </tr>
                  );
                })
              ) : (
                /* Search Results Rendering */
                searchResults.flatMap((group) => 
                  group.teams.map((team, tIdx) => (
                    <tr
                      key={`${group.name}-${team.teamName}`}
                      className="border-b border-gray-100 transition-colors hover:bg-slate-50/60"
                    >
                      <td className={`py-3 px-3 text-gray-400 text-xs font-bold ${isEn ? 'text-left' : 'text-right'}`} colSpan={1}>
                        {isEn ? group.name.replace('المجموعة ', 'Group ').substring(0, 7) : group.name.split(' ')[0]}
                      </td>
                      <td className="py-3 px-3 font-semibold">
                        <div className={`flex items-center gap-2 ${isEn ? 'flex-row' : ''}`}>
                          <span className="text-xl leading-none">{team.teamFlag}</span>
                          <span className="text-gray-950 font-extrabold">{t(team.teamName)}</span>
                        </div>
                      </td>
                      <td className="py-3 px-2 text-center font-mono text-gray-600">{team.played}</td>
                      <td className="py-3 px-2 text-center font-mono text-emerald-600">{team.won}</td>
                      <td className="py-3 px-2 text-center font-mono text-gray-500">{team.drawn}</td>
                      <td className="py-3 px-2 text-center font-mono text-red-500">{team.lost}</td>
                      <td className="py-3 px-2 text-center font-mono text-gray-400" dir="ltr">
                        {team.gf} - {team.ga}
                      </td>
                      <td className="py-3 px-3 text-center font-black font-mono text-gray-900 bg-gray-50">
                        {team.points}
                      </td>
                    </tr>
                  ))
                )
              )}

              {isSearching && searchResults.length === 0 && (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-gray-400 font-bold text-xs">
                    {isEn ? `No teams match keyword "${searchQuery}"` : `لم نجد أي منتخبات تطابق كلمة البحث "${searchQuery}"`}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Qualifiers legend info footer */}
        <div className={`mt-4 pt-3.5 border-t border-gray-100 flex flex-wrap items-center justify-between gap-3 text-[11px] text-gray-500 ${isEn ? 'flex-row-reverse' : ''}`}>
          <div className={`flex items-center gap-1.5 flex-wrap ${isEn ? 'flex-row-reverse' : ''}`}>
            <span className={`flex items-center gap-1 ${isEn ? 'flex-row-reverse' : ''}`}>
              <span className="w-2.5 h-2.5 rounded-full bg-blue-500 inline-block"></span>
              <span className="font-bold text-gray-600 text-[10px]">{isEn ? "Qualify to Round of 16" : "تأهل لدور الـ 16"}</span>
            </span>
            <span className="text-gray-300">|</span>
            <span className={`flex items-center gap-1 ${isEn ? 'flex-row-reverse' : ''}`}>
              <span className="w-2.5 h-2.5 rounded-full bg-gray-300 inline-block"></span>
              <span className="font-bold text-gray-600 text-[10px]">{isEn ? "Eliminated in GS" : "خروج من دور المجموعات"}</span>
            </span>
          </div>

          <div className={`flex items-center gap-1 text-[10px] text-slate-400 ${isEn ? 'flex-row-reverse' : ''}`}>
            <HelpCircle className="w-3.5 h-3.5" />
            <span>{isEn ? "Positions update instantly when goals are scored in active simulator matches." : "يتم تحديث الترتيب تلقائياً فور تسجيل الأهداف بالمباريات الدائرة."}</span>
          </div>
        </div>

      </div>
    </div>
  );
}
