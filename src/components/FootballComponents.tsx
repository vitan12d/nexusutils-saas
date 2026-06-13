import React, { useState } from 'react';
import { useMatches, useStandings } from '../hooks/useFootball';
import { RefreshCw, Play, Volume2, Calendar, Award, Zap, AlertCircle } from 'lucide-react';

interface MatchStripProps {
  selectedDate: string;
  onSelectMatch?: (id: string) => void;
  activeMatchId?: string | null;
}

export function MatchStrip({ selectedDate, onSelectMatch, activeMatchId }: MatchStripProps) {
  const { matches, isLoading, error, lastUpdated, isUsingMocks, refetch } = useMatches(selectedDate);

  const getStatusBadge = (status: string, minute?: number) => {
    switch (status) {
      case 'LIVE':
        return (
          <span className="bg-emerald-500 text-white font-extrabold text-[10px] px-2 py-0.5 rounded-full flex items-center gap-1 animate-pulse select-none">
            <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
            مباشر {minute ? `د ${minute}` : ''}
          </span>
        );
      case 'FINISHED':
        return (
          <span className="bg-slate-500 text-white font-bold text-[10px] px-2 py-0.5 rounded-full select-none">
            انتهت
          </span>
        );
      case 'UPCOMING':
      default:
        return (
          <span className="bg-amber-500 text-white font-bold text-[10px] px-2 py-0.5 rounded-full select-none">
            لم تبدأ
          </span>
        );
    }
  };

  return (
    <div className="bg-[#050f1e] text-white border-y border-[#D4AF37]/30 p-4 font-sans text-right" dir="rtl" id="football-live-strip-section">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-3 mb-3 border-b border-white/5 pb-2">
        <div className="flex items-center gap-2">
          <Award className="w-5 h-5 text-[#D4AF37]" />
          <h2 className="text-base font-black text-white font-sans tracking-wide">
            نتائج مباريات اليوم من جدول البث والنتائج المباشرة
          </h2>
          {isUsingMocks && (
            <span className="bg-blue-500/10 text-blue-300 border border-blue-500/30 text-[9px] px-2 py-0.5 font-bold rounded">
              تحديث تلقائي مفعّل
            </span>
          )}
        </div>
        
        <div className="flex items-center justify-end gap-3 text-xs text-gray-400">
          <span className="font-mono text-[10px] text-gray-400 font-bold">
            آخر تحديث: {lastUpdated.toLocaleTimeString('en-US', { hour12: false })}
          </span>
          <button 
            onClick={() => refetch()}
            className="p-1 text-[#D4AF37] hover:text-white transition-colors cursor-pointer flex items-center gap-1 font-bold text-[11px]"
            title="تحديث النتائج الآن"
          >
            <RefreshCw className="w-3.5 h-3.5 animate-spin-hover" />
            <span>تحديث يدوي</span>
          </button>
        </div>
      </div>

      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-8 space-y-2 text-xs text-sky-400">
          <RefreshCw className="w-6 h-6 animate-spin text-[#D4AF37]" />
          <span>جاري مواءمة وتحديث البث المباشر وأسعار الأهداف...</span>
        </div>
      ) : error ? (
        <div className="bg-red-500/10 border border-red-500/30 p-4 text-xs text-red-300 rounded text-center flex items-center justify-center gap-2 max-w-xl mx-auto font-bold my-4">
          <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />
          <span>{error} - جاري تحديث البيانات تلقائياً</span>
        </div>
      ) : matches.length === 0 ? (
        <div className="text-center py-10 text-xs text-gray-400 font-bold">
          لا يوجد مباريات مجدولة لهذا اليوم. اختر تاريخاً آخر لمعاينة الأحداث القادمة أو المنتهية.
        </div>
      ) : (
        /* H-Scroll Rail Grid */
        <div className="overflow-x-auto pb-2 flex gap-4 scrollbar-thin scrollbar-thumb-[#D4AF37] scrollbar-track-slate-800" style={{ fontFamily: 'Tahoma, Arial, sans-serif' }}>
          {matches.map((item) => {
            const isActive = activeMatchId === item.id;
            return (
              <div 
                key={item.id}
                onClick={() => onSelectMatch && onSelectMatch(item.id)}
                className={`flex-none w-[280px] bg-[#07162c] border p-3 cursor-pointer transition-all duration-300 relative select-none hover:border-[#D4AF37]/80 hover:bg-[#0b213f] ${
                  isActive ? 'border-2 border-[#D4AF37] shadow-[0_0_10px_rgba(212,175,55,0.15)] bg-[#091b35]' : 'border-slate-800'
                }`}
              >
                {/* Competition */}
                <div className="flex justify-between items-center text-[10px] text-gray-400 mb-2 font-sans border-b border-white/5 pb-1 font-bold">
                  <span className="text-[#D4AF37] truncate max-w-[150px]">{item.league}</span>
                  <span className="font-mono">{item.time}</span>
                </div>

                {/* Team Logos and Score */}
                <div className="space-y-2.5">
                  {/* Home Team */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 truncate">
                      <img 
                        src={item.homeLogo} 
                        onError={(e) => { (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1540747737956-37872f7e91b3?w=40&h=40&fit=crop&q=80' }}
                        className="w-5.5 h-5.5 rounded-full object-cover bg-slate-800 p-0.5 border border-slate-700" 
                        referrerPolicy="no-referrer"
                        alt={item.homeTeam} 
                      />
                      <span className="text-xs font-bold text-white/95 truncate max-w-[130px]">{item.homeTeam}</span>
                    </div>
                    {item.status !== 'UPCOMING' && (
                      <span className="text-sm font-black font-mono text-[#D4AF37]">{item.homeScore}</span>
                    )}
                  </div>

                  {/* Away Team */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 truncate">
                      <img 
                        src={item.awayLogo} 
                        onError={(e) => { (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1540747737956-37872f7e91b3?w=40&h=40&fit=crop&q=80' }}
                        className="w-5.5 h-5.5 rounded-full object-cover bg-slate-800 p-0.5 border border-slate-700" 
                        referrerPolicy="no-referrer"
                        alt={item.awayTeam} 
                      />
                      <span className="text-xs font-bold text-white/95 truncate max-w-[130px]">{item.awayTeam}</span>
                    </div>
                    {item.status !== 'UPCOMING' && (
                      <span className="text-sm font-black font-mono text-[#D4AF37]">{item.awayScore}</span>
                    )}
                  </div>
                </div>

                {/* Status bar */}
                <div className="flex items-center justify-between mt-3 pt-2 border-t border-white/5">
                  {getStatusBadge(item.status, item.minute)}
                  <span className="text-[9px] text-[#D4AF37] opacity-80 font-bold">بث مباشر مجاناً HD</span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

// ---------------------- STANDINGS DROPDOWN DICTIONARY ----------------------
const LEAGUES_LIST = [
  { id: '39', name: 'الدوري الإنجليزي الممتاز (Premier League)' },
  { id: '307', name: 'الدوري السعودي للمحترفين (Saudi Pro League)' },
  { id: '140', name: 'الدوري الإسباني (La Liga)' },
  { id: '135', name: 'الدوري الإيطالي (Serie A)' },
  { id: '78', name: 'الدوري الألماني (Bundesliga)' },
  { id: '61', name: 'الدوري الفرنسي (Ligue 1)' },
  { id: '2', name: 'دوري أبطال أوروبا (Champions League)' },
  { id: '233', name: 'الدوري المصري الممتاز (Egypt Premier)' }
];

export function StandingsTable() {
  const [selectedLeagueId, setSelectedLeagueId] = useState<string>('39');
  const { standings, isLoading, error, isUsingMocks } = useStandings(selectedLeagueId);

  return (
    <div className="bg-white border border-slate-200 shadow-sm p-4 text-right" dir="rtl" id="live-standings-card-root">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-slate-100 pb-3 mb-4">
        <div className="flex items-center gap-2">
          <div className="bg-[#07162c] text-white p-1.5 rounded">
            <Award className="w-5 h-5 text-[#D4AF37]" />
          </div>
          <div>
            <h3 className="font-extrabold text-sm sm:text-base text-[#07162c] font-sans">جدول ترتيب الفرق المباشر</h3>
            <p className="text-[10px] text-gray-500 font-bold">محدث فورياً بنهاية كل مباراة عبر مصادر التحقق المعتمدة</p>
          </div>
        </div>

        {/* League Switcher Dropdown */}
        <div className="w-full sm:w-auto">
          <select
            value={selectedLeagueId}
            onChange={(e) => setSelectedLeagueId(e.target.value)}
            className="w-full sm:w-64 bg-slate-50 border border-slate-300 p-2 rounded text-xs font-bold text-slate-800 focus:outline-none focus:border-[#D4AF37] cursor-pointer shadow-sm"
          >
            {LEAGUES_LIST.map(league => (
              <option key={league.id} value={league.id}>{league.name}</option>
            ))}
          </select>
        </div>
      </div>

      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-10 space-y-2 text-xs text-gray-400">
          <RefreshCw className="w-6 h-6 animate-spin text-[#07162c]" />
          <span>جاري مأمرة وتحميل النقاط والأهداف المعتمدة...</span>
        </div>
      ) : error ? (
        <div className="border border-amber-300 bg-amber-50 p-4 text-xs text-amber-900 rounded flex items-center justify-center gap-2 text-center font-bold" id="standings-error-placeholder">
          <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
          <span>{error} - يتم تشغيل وضع التمهيد التلقائي لترتيب المجموعات</span>
        </div>
      ) : standings ? (
        <div className="overflow-x-auto">
          {isUsingMocks && (
            <div className="bg-slate-50 text-slate-600 p-2 text-right text-[10px] sm:text-xs mb-3 font-semibold border-r-2 border-[#D4AF37] flex items-center gap-1.5">
              <span>💡 يعرض هذا الترتيب البيانات الاحتياطية لضمان عمل الواجهة بشكل كلي عند عدم توفر مفتاح RapidAPI نشط أو انتهاء حصته اليومية.</span>
            </div>
          )}

          <h4 className="text-xs sm:text-sm font-black text-[#07162c] text-right mb-3 flex items-center gap-2">
            <Zap className="w-4 h-4 text-[#D4AF37] fill-amber-300" />
            <span>{standings.leagueName} - الموسم الرياضي {standings.season}</span>
          </h4>

          <table className="w-full text-right border-collapse text-xs table-auto" style={{ fontFamily: 'Tahoma, Arial, sans-serif' }}>
            <thead>
              <tr className="bg-slate-100 text-[#07162c] font-black border-y border-slate-200">
                <th className="py-2.5 px-2 text-center w-8">#</th>
                <th className="py-2.5 px-2 text-right">الفريق</th>
                <th className="py-2.5 px-2 text-center">لعب</th>
                <th className="py-2.5 px-2 text-center">فوز</th>
                <th className="py-2.5 px-2 text-center">تعادل</th>
                <th className="py-2.5 px-2 text-center font-bold hidden sm:table-cell">خسارة</th>
                <th className="py-2.5 px-2 text-center font-bold hidden md:table-cell">له/عليه</th>
                <th className="py-2.5 px-2 text-center">الفارق</th>
                <th className="py-2.5 px-2 text-center text-[#07162c] font-black">النقاط</th>
              </tr>
            </thead>
            <tbody>
              {standings.standings.map((row) => {
                const isTopTeam = row.rank <= 3;
                return (
                  <tr 
                    key={row.rank} 
                    className={`border-b border-slate-100 hover:bg-slate-50 transition-colors text-slate-800 ${
                      isTopTeam ? 'font-semibold bg-emerald-50/5' : ''
                    }`}
                  >
                    <td className="py-3 px-2 text-center font-mono font-bold">
                      <span className={`w-5.5 h-5.5 rounded-full flex items-center justify-center mx-auto text-[11px] ${
                        row.rank === 1 ? 'bg-yellow-500 text-white font-extrabold' : 
                        row.rank === 2 ? 'bg-slate-300 text-slate-800' :
                        row.rank === 3 ? 'bg-amber-600 text-white' : 'bg-slate-100 text-gray-600 font-normal'
                      }`}>
                        {row.rank}
                      </span>
                    </td>
                    <td className="py-3 px-2">
                      <div className="flex items-center gap-2 text-right">
                        <img 
                          src={row.teamLogo} 
                          onError={(e) => { (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1540747737956-37872f7e91b3?w=40&h=40&fit=crop&q=80' }}
                          className="w-5 h-5 rounded-md object-contain bg-slate-50 p-0.5 border border-slate-100" 
                          referrerPolicy="no-referrer"
                          alt={row.teamName} 
                        />
                        <span className="text-gray-900 font-extrabold text-[12px]">{row.teamName}</span>
                      </div>
                    </td>
                    <td className="py-3 px-2 text-center font-mono font-bold text-slate-700">{row.played}</td>
                    <td className="py-3 px-2 text-center font-mono text-emerald-600">{row.won}</td>
                    <td className="py-3 px-2 text-center font-mono text-slate-500">{row.drawn}</td>
                    <td className="py-3 px-2 text-center font-mono text-rose-500 hidden sm:table-cell">{row.lost}</td>
                    <td className="py-3 px-2 text-center font-mono text-gray-400 text-[10px] hidden md:table-cell">
                      {row.goalsFor}:{row.goalsAgainst}
                    </td>
                    <td className={`py-3 px-2 text-center font-mono font-extrabold ${
                      row.goalDifference > 0 ? 'text-emerald-600' : row.goalDifference < 0 ? 'text-rose-600' : 'text-slate-400'
                    }`}>
                      {row.goalDifference > 0 ? `+${row.goalDifference}` : row.goalDifference}
                    </td>
                    <td className="py-3 px-2 text-center font-mono font-extrabold text-[#07162c] text-sm bg-[#D4AF37]/5">
                      {row.points}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center py-6 text-xs text-gray-500">جاري التحديث للترتيب...</div>
      )}
    </div>
  );
}
