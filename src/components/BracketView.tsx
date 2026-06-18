/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Trophy, RotateCcw, Sparkles } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface PlayoffMatch {
  id: string;
  teamA: string;
  teamB: string;
  flagA: string;
  flagB: string;
  scoreA: string;
  scoreB: string;
  date: string;
}

export default function BracketView() {
  const { language, t } = useLanguage();
  const isEn = language === 'en';

  // Setup interactive play-off state
  const [r16, setR16] = useState<PlayoffMatch[]>([
    { id: 'm1', teamA: 'المغرب', teamB: 'كرواتيا', flagA: '🇲🇦', flagB: '🇭🇷', scoreA: '', scoreB: '', date: '20 يونيو' },
    { id: 'm2', teamA: 'فرنسا', teamB: 'أوروغواي', flagA: '🇫🇷', flagB: '🇺🇾', scoreA: '', scoreB: '', date: '21 يونيو' },
    { id: 'm3', teamA: 'ألمانيا', teamB: 'اليابان', flagA: '🇩🇪', flagB: '🇯🇵', scoreA: '', scoreB: '', date: '21 يونيو' },
    { id: 'm4', teamA: 'البرازيل', teamB: 'الأرجنتين', flagA: '🇧🇷', flagB: '🇦🇷', scoreA: '', scoreB: '', date: '22 يونيو' },
  ]);

  const handleScoreChange = (matchId: string, team: 'A' | 'B', val: string) => {
    // Only accept numbers
    if (val !== '' && !/^\d+$/.test(val)) return;

    setR16(prev =>
      prev.map(m => (m.id === matchId ? { ...m, [team === 'A' ? 'scoreA' : 'scoreB']: val } : m))
    );
  };

  const resetPredictions = () => {
    setR16(prev => prev.map(m => ({ ...m, scoreA: '', scoreB: '' })));
    setQfScores({ qf1A: '', qf1B: '', qf2A: '', qf2B: '' });
    setSfScore({ sfA: '', sfB: '' });
  };

  // Derive advanced teams based on input scores
  const getWinner = (match: PlayoffMatch): { name: string; flag: string } => {
    const sA = parseInt(match.scoreA);
    const sB = parseInt(match.scoreB);
    const tbdLabel = isEn ? 'TBD' : 'لم يحدد';
    if (isNaN(sA) || isNaN(sB)) return { name: tbdLabel, flag: '❓' };
    if (sA > sB) return { name: match.teamA, flag: match.flagA };
    if (sB > sA) return { name: match.teamB, flag: match.flagB };
    return { name: `${match.teamA} (PK)`, flag: match.flagA }; // Draw PK shootout fallback
  };

  const qf1 = getWinner(r16[0]);
  const qf2 = getWinner(r16[1]);
  const qf3 = getWinner(r16[2]);
  const qf4 = getWinner(r16[3]);

  // Derived states for Semi-Finalists
  const [qfScores, setQfScores] = useState({ qf1A: '', qf1B: '', qf2A: '', qf2B: '' });
  const [sfScore, setSfScore] = useState({ sfA: '', sfB: '' });

  const tbdLabel = isEn ? 'TBD' : 'لم يحدد';

  const getQfWinner1 = () => {
    const sA = parseInt(qfScores.qf1A);
    const sB = parseInt(qfScores.qf1B);
    if (isNaN(sA) || isNaN(sB) || qf1.name === tbdLabel || qf2.name === tbdLabel) return { name: tbdLabel, flag: '❓' };
    return sA > sB ? qf1 : qf2;
  };

  const getQfWinner2 = () => {
    const sA = parseInt(qfScores.qf2A);
    const sB = parseInt(qfScores.qf2B);
    if (isNaN(sA) || isNaN(sB) || qf3.name === tbdLabel || qf4.name === tbdLabel) return { name: tbdLabel, flag: '❓' };
    return sA > sB ? qf3 : qf4;
  };

  const sf1 = getQfWinner1();
  const sf2 = getQfWinner2();

  const getChampion = () => {
    const sA = parseInt(sfScore.sfA);
    const sB = parseInt(sfScore.sfB);
    if (isNaN(sA) || isNaN(sB) || sf1.name === tbdLabel || sf2.name === tbdLabel) return null;
    return sA > sB ? sf1 : sf2;
  };

  const champion = getChampion();

  return (
    <div className="w-full bg-white border border-gray-200 rounded-xl p-5 md:p-6 shadow-xs" id="playoff-bracket-prediction-hub">
      <div className={`flex flex-col sm:flex-row sm:items-center justify-between border-b border-gray-100 pb-4 mb-6 gap-3 ${isEn ? 'flex-row-reverse' : ''}`}>
        <div className={`flex items-center gap-2.5 ${isEn ? 'flex-row-reverse' : ''}`}>
          <div className="p-2 bg-amber-50 text-amber-600 rounded-lg shrink-0">
            <Trophy className="w-5 h-5 fill-amber-500" />
          </div>
          <div className={isEn ? 'text-left' : 'text-right'}>
            <h3 className="text-sm md:text-base font-black text-gray-900">
              {isEn ? "Interactive Playoff Bracket Predictor" : "شجرة تفاعلية وتوقع الأدوار الإقصائية"}
            </h3>
            <p className="text-xs text-gray-400 font-semibold">
              {isEn ? "Predict match scores and see who advances to lift the trophy" : "توقع نتائج المباريات وشاهد من يتأهل ويحمل الكأس الغالية"}
            </p>
          </div>
        </div>

        <button
          onClick={resetPredictions}
          className="text-xs font-bold text-gray-500 bg-gray-50 hover:bg-gray-100 border border-gray-200 px-3 py-1.5 rounded-lg flex items-center gap-1 cursor-pointer transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>{isEn ? "Reset Predictions" : "إعادة تعيين التوقعات"}</span>
        </button>
      </div>

      {/* Bracket Tree Layout Container */}
      <div className="w-full overflow-x-auto no-scrollbar pb-4" dir={isEn ? "ltr" : "rtl"}>
        <div className="min-w-[850px] grid grid-cols-4 gap-4 px-2">
          
          {/* Column 1: Round of 16 */}
          <div className="flex flex-col justify-around gap-6 py-2">
            <div className="text-center font-black text-xs text-slate-400 border-b border-slate-150 pb-1.5 mb-2 uppercase tracking-wider">
              {isEn ? "Round of 16" : "دور الـ 16"}
            </div>
            
            {r16.map((match) => (
              <div key={match.id} className="bg-slate-50 border border-gray-200 rounded-lg p-3 shadow-xs space-y-2">
                <div className={`text-[10px] text-gray-400 font-bold flex justify-between ${isEn ? 'flex-row-reverse' : ''}`}>
                  <span>{isEn ? match.date.replace('يونيو', 'June') : match.date}</span>
                  <span className="text-blue-600">{isEn ? "OFFICIAL" : "رسمي"}</span>
                </div>

                {/* Team A Item */}
                <div className="flex items-center justify-between text-xs font-semibold text-gray-900">
                  <div className="flex items-center gap-1.5">
                    <span className="text-lg leading-none">{match.flagA}</span>
                    <span className="font-extrabold">{t(match.teamA)}</span>
                  </div>
                  <input
                    type="text"
                    value={match.scoreA}
                    onChange={(e) => handleScoreChange(match.id, 'A', e.target.value)}
                    placeholder="-"
                    className="w-8 h-7 bg-white border border-gray-300 text-center font-bold font-mono rounded-md text-amber-600 focus:outline-hidden focus:ring-1 focus:ring-blue-500"
                  />
                </div>

                {/* Team B Item */}
                <div className="flex items-center justify-between text-xs font-semibold text-gray-900">
                  <div className="flex items-center gap-1.5">
                    <span className="text-lg leading-none">{match.flagB}</span>
                    <span className="font-extrabold">{t(match.teamB)}</span>
                  </div>
                  <input
                    type="text"
                    value={match.scoreB}
                    onChange={(e) => handleScoreChange(match.id, 'B', e.target.value)}
                    placeholder="-"
                    className="w-8 h-7 bg-white border border-gray-300 text-center font-bold font-mono rounded-md text-amber-600 focus:outline-hidden focus:ring-1 focus:ring-blue-500"
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Column 2: Quarter Finals */}
          <div className="flex flex-col justify-around gap-12 py-2">
            <div className="text-center font-black text-xs text-slate-400 border-b border-slate-150 pb-1.5 mb-2 uppercase tracking-wider">
              {isEn ? "Quarter Finals" : "ربع النهائي"}
            </div>

            {/* QF 1 */}
            <div className="bg-blue-50/20 border border-blue-100 rounded-lg p-3 space-y-2 relative shadow-xs">
              <div className="text-[9px] text-blue-500 font-extrabold uppercase">
                {isEn ? "QUARTER GAME 1" : "مباراة ربع 1"}
              </div>
              {/* Derived Team A */}
              <div className="flex items-center justify-between text-xs font-semibold text-gray-900">
                <div className="flex items-center gap-1.5">
                  <span className="text-lg leading-none">{qf1.flag}</span>
                  <span className={`font-extrabold ${qf1.name === tbdLabel ? 'text-gray-400 font-medium italic' : 'text-gray-950'}`}>
                    {qf1.name === tbdLabel ? tbdLabel : t(qf1.name)}
                  </span>
                </div>
                <input
                  type="text"
                  disabled={qf1.name === tbdLabel || qf2.name === tbdLabel}
                  value={qfScores.qf1A}
                  onChange={(e) => setQfScores(p => ({ ...p, qf1A: e.target.value }))}
                  placeholder="-"
                  className="w-8 h-7 bg-white border border-gray-300 text-center font-bold font-mono rounded-md disabled:bg-gray-100 disabled:text-gray-300"
                />
              </div>

              {/* Derived Team B */}
              <div className="flex items-center justify-between text-xs font-semibold text-gray-900">
                <div className="flex items-center gap-1.5">
                  <span className="text-lg leading-none">{qf2.flag}</span>
                  <span className={`font-extrabold ${qf2.name === tbdLabel ? 'text-gray-400 font-medium italic' : 'text-gray-950'}`}>
                    {qf2.name === tbdLabel ? tbdLabel : t(qf2.name)}
                  </span>
                </div>
                <input
                  type="text"
                  disabled={qf1.name === tbdLabel || qf2.name === tbdLabel}
                  value={qfScores.qf1B}
                  onChange={(e) => setQfScores(p => ({ ...p, qf1B: e.target.value }))}
                  placeholder="-"
                  className="w-8 h-7 bg-white border border-gray-300 text-center font-bold font-mono rounded-md disabled:bg-gray-100 disabled:text-gray-300"
                />
              </div>
            </div>

            {/* QF 2 */}
            <div className="bg-blue-50/20 border border-blue-100 rounded-lg p-3 space-y-2 relative shadow-xs">
              <div className="text-[9px] text-blue-500 font-extrabold uppercase">
                {isEn ? "QUARTER GAME 2" : "مباراة ربع 2"}
              </div>
              {/* Derived Team A */}
              <div className="flex items-center justify-between text-xs font-semibold text-gray-900">
                <div className="flex items-center gap-1.5">
                  <span className="text-lg leading-none">{qf3.flag}</span>
                  <span className={`font-extrabold ${qf3.name === tbdLabel ? 'text-gray-400 font-medium italic' : 'text-gray-950'}`}>
                    {qf3.name === tbdLabel ? tbdLabel : t(qf3.name)}
                  </span>
                </div>
                <input
                  type="text"
                  disabled={qf3.name === tbdLabel || qf4.name === tbdLabel}
                  value={qfScores.qf2A}
                  onChange={(e) => setQfScores(p => ({ ...p, qf2A: e.target.value }))}
                  placeholder="-"
                  className="w-8 h-7 bg-white border border-gray-300 text-center font-bold font-mono rounded-md disabled:bg-gray-100 disabled:text-gray-300"
                />
              </div>

              {/* Derived Team B */}
              <div className="flex items-center justify-between text-xs font-semibold text-gray-900">
                <div className="flex items-center gap-1.5">
                  <span className="text-lg leading-none">{qf4.flag}</span>
                  <span className={`font-extrabold ${qf4.name === tbdLabel ? 'text-gray-400 font-medium italic' : 'text-gray-950'}`}>
                    {qf4.name === tbdLabel ? tbdLabel : t(qf4.name)}
                  </span>
                </div>
                <input
                  type="text"
                  disabled={qf3.name === tbdLabel || qf4.name === tbdLabel}
                  value={qfScores.qf2B}
                  onChange={(e) => setQfScores(p => ({ ...p, qf2B: e.target.value }))}
                  placeholder="-"
                  className="w-8 h-7 bg-white border border-gray-300 text-center font-bold font-mono rounded-md disabled:bg-gray-100 disabled:text-gray-300"
                />
              </div>
            </div>
          </div>

          {/* Column 3: Semi Finals */}
          <div className="flex flex-col justify-center gap-16 py-2">
            <div className="text-center font-black text-xs text-slate-400 border-b border-slate-150 pb-1.5 mb-2 uppercase tracking-wider relative top-[-60px]">
              {isEn ? "Semi Finals" : "نصف النهائي"}
            </div>

            <div className="bg-amber-500/5 border border-amber-200 rounded-lg p-4 space-y-3 shadow-xs">
              <div className="text-[9px] text-amber-600 font-extrabold uppercase">
                {isEn ? "SEMI FINAL CLASH" : "مباراة نصف النهائي"}
              </div>
              
              {/* Semi-finalist A */}
              <div className="flex items-center justify-between text-xs font-semibold text-gray-900">
                <div className="flex items-center gap-1.5">
                  <span className="text-lg leading-none">{sf1.flag}</span>
                  <span className={`font-extrabold ${sf1.name === tbdLabel ? 'text-gray-400 font-medium italic' : 'text-gray-950'}`}>
                    {sf1.name === tbdLabel ? tbdLabel : t(sf1.name)}
                  </span>
                </div>
                <input
                  type="text"
                  disabled={sf1.name === tbdLabel || sf2.name === tbdLabel}
                  value={sfScore.sfA}
                  onChange={(e) => setSfScore(p => ({ ...p, sfA: e.target.value }))}
                  placeholder="-"
                  className="w-8 h-7 bg-white border border-gray-300 text-center font-bold font-mono rounded-md disabled:bg-gray-100 disabled:text-gray-300"
                />
              </div>

              {/* Semi-finalist B */}
              <div className="flex items-center justify-between text-xs font-semibold text-gray-900">
                <div className="flex items-center gap-1.5">
                  <span className="text-lg leading-none">{sf2.flag}</span>
                  <span className={`font-extrabold ${sf2.name === tbdLabel ? 'text-gray-400 font-medium italic' : 'text-gray-950'}`}>
                    {sf2.name === tbdLabel ? tbdLabel : t(sf2.name)}
                  </span>
                </div>
                <input
                  type="text"
                  disabled={sf1.name === tbdLabel || sf2.name === tbdLabel}
                  value={sfScore.sfB}
                  onChange={(e) => setSfScore(p => ({ ...p, sfB: e.target.value }))}
                  placeholder="-"
                  className="w-8 h-7 bg-white border border-gray-300 text-center font-bold font-mono rounded-md disabled:bg-gray-100 disabled:text-gray-300"
                />
              </div>
            </div>
          </div>

          {/* Column 4: Champion Box */}
          <div className="flex flex-col justify-center items-center py-2">
            <div className="text-center font-black text-xs text-slate-400 border-b border-slate-150 pb-1.5 mb-2 uppercase tracking-wider relative top-[-100px] w-full">
              {isEn ? "Ultimate Champion" : "بطل المونديال الكوني"}
            </div>

            <div className="bg-linear-to-b from-amber-50 to-yellow-100 border-2 border-amber-400 rounded-xl p-5 text-center shadow-lg max-w-[190px] w-full flex flex-col items-center gap-2 relative">
              <div className="absolute top-[-20px] bg-amber-400 text-amber-950 text-[10px] font-black px-3 py-0.5 rounded-full uppercase shadow-md flex items-center gap-1">
                <Sparkles className="w-3 h-3 fill-amber-950" />
                <span>CHAMPION</span>
              </div>

              <span className="text-4xl py-2" role="img" aria-label="Winner flag">
                {champion ? champion.flag : '🏆'}
              </span>

              <h4 className="text-sm font-black text-amber-950 mt-1 truncate w-full">
                {champion ? t(champion.name) : (isEn ? "Your Champion" : "الفائز المونديالي")}
              </h4>
              <p className="text-[10px] text-amber-700 font-bold leading-normal">
                {champion 
                  ? (isEn ? "Congratulations on your prediction!" : "توقع كأس العالم الخاص بك!") 
                  : (isEn ? "Predict all matches in order to reveal your tournament champion!" : "املأ التوقعات بالترتيب لمعرفة بطل كأستك الخاصة")}
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
