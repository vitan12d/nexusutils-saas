/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { Match } from '../types';
import { Play, Tv, Users, Send, Volume2, ShieldAlert, Award, RefreshCw, BarChart2, MessageSquare } from 'lucide-react';

interface MatchDetailsProps {
  match: Match;
  onBack: () => void;
}

const LIVE_COMMENTS = [
  { username: 'أبو أحمد', text: 'يا رب الفوز للملكي الليلة ⚪💪', team: 'home' },
  { username: 'هلالي ملكي', text: 'الهلال يسيطر بالطول والعرض! 😍', team: 'home' },
  { username: 'سيد اللعبة', text: 'الحكم متحيز جداً ضدنا الليلة! 😡', team: 'away' },
  { username: 'خالد العنزي', text: 'مباراة تكسير عظام وجماهير أسطورية 🔥', team: 'neutral' },
  { username: 'فارس الرياض', text: 'تمريرة مرعبة من سالم الدوسري!', team: 'home' },
  { username: 'Youssef_7', text: 'جوووووووووووووول جول جول أول!! 🤩⚽', team: 'home' },
  { username: 'كريس الدون', text: 'رونالدو يستعد للتسجيل ثقوا بي 🐐', team: 'away' },
  { username: 'صقر قرطبة', text: 'دفاع ريال مدريد يعاني أمام سرعة السيتي', team: 'away' },
  { username: 'ابن الرافدين', text: 'من يدير الإستوديو التحليلي؟ الصوت يقطع شوية', team: 'neutral' },
  { username: 'مدريدي الوفاء', text: 'الحمد لله، حارسنا اليوم بطل المونديال! 🧤', team: 'home' }
];

export default function MatchDetails({ match, onBack }: MatchDetailsProps) {
  const [activeServer, setActiveServer] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isLoadingStream, setIsLoadingStream] = useState(false);
  const [chatMessages, setChatMessages] = useState<{ id: string; user: string; text: string; team?: string }[]>([
    { id: '1', user: 'مشرف Nexus', text: '🚨 مرحباً بكم في دردشة مباراة القمة وبث نكسس كورة الحصري.' },
    { id: '2', user: 'سامر الرويلي', text: 'بالتوفيق للفريق الأفضل بالتاريخ!' }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [simulatedScore, setSimulatedScore] = useState(match.score || { home: 0, away: 0 });
  const [simulatedMinute, setSimulatedMinute] = useState(match.currentMinute || 45);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Switch Servers simulation animation
  const handleServerChange = (index: number) => {
    setIsLoadingStream(true);
    setActiveServer(index);
    const timer = setTimeout(() => {
      setIsLoadingStream(false);
    }, 700);
    return () => clearTimeout(timer);
  };

  // Live minute progress & Score simulation
  useEffect(() => {
    if (match.status !== 'live') return;

    const interval = setInterval(() => {
      setSimulatedMinute((prev) => {
        if (prev >= 90) {
          clearInterval(interval);
          return 90;
        }
        return prev + 1;
      });

      // Simple random event (1 in 20 chance a goalie fails)
      if (Math.random() < 0.04) {
        const isHome = Math.random() > 0.5;
        setSimulatedScore((prev) => {
          const newScore = isHome
            ? { ...prev, home: prev.home + 1 }
            : { ...prev, away: prev.away + 1 };
          
          // Inject a goals notice in Chat!
          const ScoredTeam = isHome ? match.homeTeam : match.awayTeam;
          setChatMessages((prevMsg) => [
            ...prevMsg,
            {
              id: Math.random().toString(),
              user: '⚽ شبكة الأهداف',
              text: `ججججججججوك! هدف لصالح ${ScoredTeam}! النتيجة الآن ${newScore.home} - ${newScore.away}`
            }
          ]);
          return newScore;
        });
      }
    }, 15000);

    return () => clearInterval(interval);
  }, [match.status]);

  // Chat message generation loop
  useEffect(() => {
    const interval = setInterval(() => {
      const randomComment = LIVE_COMMENTS[Math.floor(Math.random() * LIVE_COMMENTS.length)];
      setChatMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString() + Math.random(),
          user: randomComment.username,
          text: randomComment.text,
          team: randomComment.team
        }
      ].slice(-50)); // Limit to last 50 messages
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  // Auto-scroll chat to bottom
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    setChatMessages((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        user: 'أنا (مشجع)',
        text: inputMessage,
        team: 'home'
      }
    ]);
    setInputMessage('');
  };

  return (
    <div className="space-y-4" dir="rtl">
      {/* Top Breadcrumb Header */}
      <div className="bg-[#0f111a] border border-[#1e2230] p-4 flex justify-between items-center rounded-2xl shadow-xl">
        <div className="flex items-center gap-2">
          <span className="text-primary text-xs font-bold font-mono bg-[#121522] border border-primary/20 px-3 py-1.5 rounded-lg">
            {match.competition}
          </span>
          {match.status === 'live' && (
            <span className="flex items-center gap-1.5 bg-red-600 text-white text-[11px] font-bold px-3 py-1 rounded-full animate-pulse shadow-[0_0_12px_rgba(239,68,68,0.4)]">
              <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
              مباشر الآن
            </span>
          )}
        </div>
        <button
          onClick={onBack}
          className="text-primary bg-[#07080b] hover:bg-primary hover:text-black border border-primary/30 transition-all px-4 py-2 rounded-xl font-bold text-xs cursor-pointer"
        >
          الرجوع للمباريات ↩
        </button>
      </div>

      {/* Main Grid: Stream on Left, Chat/Sidebar on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* stream box (2 columns) */}
        <div className="lg:col-span-2 space-y-4">
          
          {/* Match Scoreboard Indicator block */}
          <div className="bg-[#0f111a] border border-[#1e2230] rounded-2xl p-5 text-center space-y-4 shadow-xl">
            <p className="text-xs text-[#00ff66] font-bold">{match.competition}</p>
            
            <div className="flex items-center justify-center gap-6 md:gap-12">
              {/* Home */}
              <div className="flex flex-col items-center space-y-1.5 w-24">
                <span className="text-3xl md:text-4xl drop-shadow-[0_4px_10px_rgba(255,255,255,0.05)]">{match.homeLogo}</span>
                <span className="font-bold text-xs text-slate-100 line-clamp-1">{match.homeTeam}</span>
              </div>

              {/* Score or VS */}
              <div className="flex flex-col items-center justify-center">
                {match.status === 'upcoming' ? (
                  <div className="bg-[#07080b] border border-[#1e2230] px-4 py-2 font-black font-mono text-primary rounded-xl min-w-[70px]">
                    {match.time}
                  </div>
                ) : (
                  <div className="flex flex-col items-center">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-2xl md:text-3xl font-black text-white px-3 py-1 bg-[#07080b] border border-[#1e2230] rounded-xl shadow-lg">
                        {simulatedScore.home}
                      </span>
                      <span className="font-mono text-sm text-slate-500 font-bold">:</span>
                      <span className="font-mono text-2xl md:text-3xl font-black text-white px-3 py-1 bg-[#07080b] border border-[#1e2230] rounded-xl shadow-lg">
                        {simulatedScore.away}
                      </span>
                    </div>
                    {match.status === 'live' && (
                      <span className="text-[11px] bg-red-950/40 text-red-500 font-bold px-3 py-1 rounded-full mt-2.5 animate-pulse border border-red-900/30">
                        الدقيقة {simulatedMinute}'
                      </span>
                    )}
                  </div>
                )}
              </div>

              {/* Away */}
              <div className="flex flex-col items-center space-y-1.5 w-24">
                <span className="text-3xl md:text-4xl drop-shadow-[0_4px_10px_rgba(255,255,255,0.05)]">{match.awayLogo}</span>
                <span className="font-bold text-xs text-slate-100 line-clamp-1">{match.awayTeam}</span>
              </div>
            </div>

            {/* Extra Metadata */}
            <div className="grid grid-cols-2 gap-3 text-[11px] text-slate-400 pt-3.5 border-t border-[#1e2230]">
              <div className="flex items-center justify-center gap-1 border-l border-[#1e2230]">
                <span className="text-amber-500 font-bold">🎙️ المعلق : </span>
                <span className="font-bold text-slate-200">{match.commentator}</span>
              </div>
              <div className="flex items-center justify-center gap-1 items-center">
                <span className="text-primary font-bold">📡 القناة الناقلة : </span>
                <span className="font-bold text-slate-200">{match.channel}</span>
              </div>
            </div>
          </div>

          {/* Interactive Player Screen */}
          <div className="relative bg-[#07080b] rounded-2xl aspect-video w-full overflow-hidden border border-[#1e2230] group">
            {/* Live Video Player Simulator */}
            {isPlaying && match.status !== 'upcoming' && !isLoadingStream ? (
              <div className="absolute inset-0 w-full h-full bg-[#0a0c15] flex flex-col justify-between p-4">
                {/* Simulated Game Stream (Sleek Visual Animation) */}
                <div className="absolute inset-0 bg-radial from-[#123824]/40 to-[#07080b] opacity-50"></div>
                
                {/* Soccer Field View mockup */}
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <div className="w-5/6 h-2/3 border border-dashed border-slate-800/80 rounded flex items-center justify-center relative">
                    <div className="w-32 h-32 rounded-full border border-dashed border-slate-800/50 flex items-center justify-center">
                      <div className="w-32 h-0.5 bg-dashed bg-slate-800/50 absolute left-0 right-0"></div>
                    </div>
                    
                    {/* Pulsing ball */}
                    <div className="absolute left-[45%] top-[55%] flex flex-col items-center justify-center animate-bounce duration-1000">
                      <div className="text-2xl mt-[-10px]">⚽</div>
                      <div className="w-6 h-1 w-full bg-black/40 blur-xs rounded-full mt-1 scale-x-50"></div>
                    </div>

                    {/* Team Players tags */}
                    <div className="absolute right-4 top-1/4 bg-[#14231b] border border-primary/20 text-white text-[9px] font-mono px-2.5 py-1 rounded-lg flex items-center gap-1">
                      <span>👕 {match.homeTeam}</span>
                      <span className="text-[#00ff66] font-bold">4-3-3</span>
                    </div>
                    <div className="absolute left-4 bottom-1/4 bg-slate-900 border border-[#1e2230] text-white text-[9px] font-mono px-2.5 py-1 rounded-lg flex items-center gap-1">
                      <span>👕 {match.awayTeam}</span>
                      <span className="text-[#00ff66] font-bold">4-2-3-1</span>
                    </div>

                    <div className="absolute bottom-2 text-center text-[#00ff66] font-mono text-[10px] bg-black/75 px-3 py-1 rounded-lg border border-primary/20">
                      مستمر في البث المباشر (تلقائي التشغيل) ... {match.streamServers[activeServer]?.quality || '1080p'}
                    </div>
                  </div>
                </div>

                {/* Score badge at the top during stream */}
                <div className="relative flex justify-between items-center z-10">
                  <div className="bg-black/80 px-3 py-1.5 text-white text-xs font-mono font-bold rounded-xl border border-[#1e2230] flex items-center gap-2">
                    <span className="w-2 h-2 bg-red-600 rounded-full animate-ping"></span>
                    <span>{match.homeTeam} {simulatedScore.home} - {simulatedScore.away} {match.awayTeam}</span>
                    <span className="text-[#00ff66]">({simulatedMinute}')</span>
                  </div>
                  <div className="bg-black/70 hover:bg-black/95 transition border border-[#1e2230] px-3 py-1.5 text-slate-200 text-[10px] rounded-xl cursor-pointer flex items-center gap-1">
                    <Volume2 className="w-3.5 h-3.5 text-primary" />
                    <span>صوت معلق المباراة (قيد التشغيل)</span>
                  </div>
                </div>

                {/* Stream Quality overlays */}
                <div className="relative flex justify-between items-end z-10 mt-auto">
                  <div className="text-[10px] text-slate-400 bg-black/60 px-2.5 py-1.5 rounded-lg border border-[#1e2230]">
                    تغذية الإشارة: {match.streamServers[activeServer]?.name || 'بي إن الرئيسية'}
                  </div>
                  <div className="flex gap-2 text-[10px] font-mono bg-primary text-black font-extrabold px-3 py-1.5 rounded-lg shadow-lg">
                    <span>{match.streamServers[activeServer]?.quality || 'Full HD'}</span>
                    <span>•</span>
                    <span>RTL-PLAYER v2.4</span>
                  </div>
                </div>

              </div>
            ) : isLoadingStream ? (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#07080b] text-white gap-3">
                <RefreshCw className="w-8 h-8 text-primary animate-spin" />
                <span className="text-sm font-bold text-gray-300 font-sans">جاري التوصيل بخادم البث الآمن... الرجاء الانتظار</span>
              </div>
            ) : match.status === 'upcoming' ? (
              // Match has not started yet
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#0f111a] text-center p-6 space-y-4">
                <div className="w-16 h-16 bg-[#07080b] border border-[#1e2230] rounded-2xl flex items-center justify-center text-3xl shadow-inner">🗓️</div>
                <div className="space-y-1">
                  <h3 className="text-white font-bold text-md">البث لم يبدأ بعد</h3>
                  <p className="text-slate-400 text-xs text-center max-w-sm">
                    سيبدأ هذا البث المباشر الخاص بمباراة <strong className="text-primary">{match.homeTeam} ضد {match.awayTeam}</strong> بشكل تلقائي فور انطلاق صافرة الحكم في تمام الساعة {match.time} بتوقيت مكة المكرمة.
                  </p>
                </div>
                <button
                  onClick={() => alert(`سيتم تنبيهك فور توفر البث لمباراة ${match.homeTeam}`)}
                  className="bg-primary hover:bg-[#00e056] text-black font-extrabold px-5 py-2 rounded-xl text-xs transition-transform transform active:scale-95 shadow-[0_0_15px_rgba(0,255,102,0.35)] cursor-pointer"
                >
                  🔔 نبهني عند بدء الاستوديو
                </button>
              </div>
            ) : (
              // General placeholder / Pause
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#07080b] text-center p-4">
                <Play
                  onClick={() => setIsPlaying(true)}
                  className="w-16 h-16 text-primary hover:scale-110 transition-transform cursor-pointer drop-shadow-[0_0_15px_rgba(0,255,102,0.2)]"
                />
                <p className="text-slate-400 text-xs mt-3">انقر على زر التشغيل لبث المباراة بجودة تلقائية قابلة للتعديل</p>
              </div>
            )}
          </div>

          {/* Servers selection tab grid */}
          <div className="bg-[#0f111a] border border-[#1e2230] rounded-2xl p-4 space-y-3 shadow-xl">
            <span className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
              <Tv className="w-3.5 h-3.5 text-primary" />
              اختر خادم بث بديل في حال انقطاع الصورة أو تغيّر الإشارة:
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {match.streamServers && match.streamServers.length > 0 ? (
                match.streamServers.map((server, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleServerChange(idx)}
                    className={`py-2 px-3 text-xs font-bold text-right rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                      activeServer === idx
                        ? 'bg-primary border-primary text-black shadow-[0_0_12px_rgba(0,255,102,0.2)]'
                        : 'bg-[#07080b] border-[#1e2230] hover:bg-[#121522] text-slate-300'
                    }`}
                  >
                    <span className="truncate">{server.name}</span>
                    <span className="text-[10px] opacity-70 font-mono bg-black/10 px-1 rounded">{server.quality}</span>
                  </button>
                ))
              ) : (
                <div className="col-span-3 text-center text-slate-500 py-2">
                  لا يتوفر خوادم بث بديلة حالياً لهذه المباراة.
                </div>
              )}
            </div>
          </div>

          {/* 🛡️ Strict Safety Clearance Zone - Keeps Ad banners at safe distance of video controls to avoid accidental clicks */}
          <div className="py-6 my-6 border-t border-b border-[#1e2230] text-center relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#0a0d17] to-[#07080b] p-5 shadow-2xl">
            <div className="absolute top-1.5 left-1.5 bg-[#00ff66]/10 text-primary font-mono text-[9px] px-2 py-0.5 rounded font-bold uppercase tracking-wider">
              ممر عزل آمن لتجنب النقرات غير المقصودة
            </div>
            <div className="space-y-2.5 max-w-lg mx-auto">
              <div className="text-slate-300 text-xs font-bold font-sans flex items-center justify-center gap-2">
                <ShieldAlert className="w-4 h-4 text-[#00ff66] animate-bounce" />
                <span>مساحة إعلانات مدمجة (Native Ad Slot - AdSense / Adsterra / Clickadilla)</span>
              </div>
              <p className="text-[10px] text-slate-400 font-sans leading-relaxed">
                تم عزل هذه المساحة بمسافة أمان تزيد عن هيدر الأمان بمقدار (44+ بكسل) لعزل أزرار التحكم بالمشغل وسيرفرات البث، للالتزام السليم بشروط AdSense وإخلاء مسؤولية النقرات العشوائية غير المرغوبة.
              </p>
              <div className="text-[11px] font-mono text-primary font-black py-3 bg-black/55 rounded-xl border border-primary/20">
                [Ad Placeholder ID: match_player_bottom_safe_anchored]
              </div>
            </div>
          </div>

          {/* Detailed Statistics Grid Mockup */}
          <div className="bg-[#0f111a] border border-[#1e2230] rounded-2xl p-5 space-y-4 shadow-xl">
            <h3 className="text-xs font-bold text-white border-b border-[#1e2230] pb-3 flex items-center gap-1.5">
              <BarChart2 className="w-4 h-4 text-primary" />
              إحصائيات المباراة المباشرة والتحليل الفني لموقع نكسس كورة
            </h3>
            
            <div className="space-y-3 font-sans text-xs">
              {/* Possession */}
              <div className="space-y-1">
                <div className="flex justify-between font-bold text-slate-300">
                  <span>{match.homeTeam} (55%)</span>
                  <span>الاستحواذ</span>
                  <span>{match.awayTeam} (45%)</span>
                </div>
                <div className="h-2 w-full bg-[#07080b] rounded-full overflow-hidden flex">
                  <div className="bg-primary h-full" style={{ width: '55%' }}></div>
                  <div className="bg-blue-600 h-full" style={{ width: '45%' }}></div>
                </div>
              </div>

              {/* Shots on target */}
              <div className="space-y-1 pt-1">
                <div className="flex justify-between font-bold text-slate-300">
                  <span>7 تسديدات</span>
                  <span>التسديدات على المرمى</span>
                  <span>4 تسديدات</span>
                </div>
                <div className="h-2 w-full bg-[#07080b] rounded-full overflow-hidden flex">
                  <div className="bg-primary h-full" style={{ width: '63%' }}></div>
                  <div className="bg-blue-600 h-full" style={{ width: '37%' }}></div>
                </div>
              </div>

              {/* Fouls & Warnings */}
              <div className="grid grid-cols-3 gap-3 pt-2 text-center text-[11px] text-slate-400 font-bold">
                <div className="bg-[#07080b] border border-[#1e2230] p-3 rounded-xl">
                  <div className="text-sm text-slate-100 font-mono font-bold">12</div>
                  <div>أخطاء مرتكبة</div>
                </div>
                <div className="bg-[#07080b] border border-[#1e2230] p-3 rounded-xl">
                  <div className="text-sm text-red-500 font-mono font-bold">0</div>
                  <div>بطاقات حمراء</div>
                </div>
                <div className="bg-[#07080b] border border-[#1e2230] p-3 rounded-xl">
                  <div className="text-sm text-yellow-500 font-mono font-bold">2</div>
                  <div>بطاقات صفراء</div>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Live Chat column on Desktop (Right side) */}
        <div className="lg:col-span-1 flex flex-col h-[520px] lg:h-[620px] bg-[#0f111a] border border-[#1e2230] rounded-2xl overflow-hidden shadow-2xl">
          {/* Chat Header */}
          <div className="bg-[#07080b] p-3 text-white flex justify-between items-center border-b border-[#1e2230]">
            <span className="font-bold text-xs flex items-center gap-1.5 text-primary">
              <MessageSquare className="w-4 h-4" />
              دردشة البث المباشر (منتدى نكسس كورة)
            </span>
            <span className="text-[10px] bg-red-650 px-2.5 py-1 rounded-lg font-mono font-bold animate-pulse text-white flex items-center gap-1">
              <Users className="w-3.5 h-3.5 text-red-200" />
              4,180 متصل
            </span>
          </div>

          {/* Chat message body scrollable area */}
          <div className="flex-1 p-3 overflow-y-auto bg-[#07080b]/40 space-y-3">
            {chatMessages.map((msg) => (
              <div key={msg.id} className="text-xs leading-relaxed">
                <span className={`font-bold px-1.5 py-0.5 rounded-md mr-1 ${
                  msg.user.includes('⚠️') || msg.user.includes('🚨') || msg.user.includes('⚽')
                    ? 'bg-rose-950/40 text-rose-400 border border-rose-900/40'
                    : msg.user === 'أنا (مشجع)'
                    ? 'bg-primary/10 text-primary border border-primary/20'
                    : msg.team === 'home'
                    ? 'bg-blue-950/40 text-blue-400 border border-blue-900/40'
                    : 'bg-emerald-950/40 text-[#00ff66] border border-[#00ff66]/20'
                }`}>
                  {msg.user}
                </span>
                <span className="text-slate-200 font-sans break-words mr-1.5">{msg.text}</span>
              </div>
            ))}
            <div ref={chatEndRef}></div>
          </div>

          {/* Chat Form panel */}
          <form onSubmit={handleSendMessage} className="p-3 bg-[#0a0c14] border-t border-[#1e2230] flex gap-2">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="اكتب تعليقك هنا وانضم للمشجعين..."
              maxLength={150}
              className="flex-1 px-3 py-2 text-xs bg-[#07080b] border border-[#1e2230] text-slate-100 rounded-xl focus:outline-none focus:ring-1 focus:ring-primary font-sans text-right"
            />
            <button
              type="submit"
              className="bg-primary text-black px-4 py-2 rounded-xl font-extrabold text-xs hover:bg-[#00e056] transition cursor-pointer flex items-center justify-center shadow-lg"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}
