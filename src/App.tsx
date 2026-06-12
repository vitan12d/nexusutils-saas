/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { MOCK_MATCHES, MOCK_NEWS, DEFAULT_ADS_CONFIG, getRelativeDate } from './data';
import { Match, NewsItem, AdsConfig } from './types';
import MatchDetails from './components/MatchDetails';
import AdminAdsConfig from './components/AdminAdsConfig';
import AiAnalyst from './components/AiAnalyst';
import LegalPages from './components/LegalPages';
import { injectAdScript } from './utils/ads';
import {
  Calendar,
  Search,
  Settings,
  Shield,
  Clock,
  ExternalLink,
  ChevronLeft,
  Tv,
  Eye,
  Volume2,
  Award,
  Flame,
  Globe,
  Bell,
  Sparkles,
  HelpCircle,
  Newspaper
} from 'lucide-react';

export default function App() {
  // State variables for matches and news
  const [matches, setMatches] = useState<Match[]>([]);
  const [news, setNews] = useState<NewsItem[]>([]);
  
  // Selected views state
  const [selectedMatch, setSelectedMatch] = useState<Match | null>(null);
  const [activeNews, setActiveNews] = useState<NewsItem | null>(null);
  const [currentLegalPage, setCurrentLegalPage] = useState<'privacy' | 'terms' | 'cookies' | null>(null);
  const [showAdminSettings, setShowAdminSettings] = useState(false);

  // Filters state
  const [dateTab, setDateTab] = useState<'today' | 'yesterday' | 'tomorrow' | 'live'>('today');
  const [leagueFilter, setLeagueFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('الكل');

  // Ads scripts configuration
  const [adsConfig, setAdsConfig] = useState<AdsConfig>(DEFAULT_ADS_CONFIG);

  // Load matches, news, and ads on mount
  useEffect(() => {
    setMatches(MOCK_MATCHES());
    setNews(MOCK_NEWS());

    // Fetch Ads configs from server API or fallback to localstorage if any
    const fetchAdsConfig = async () => {
      try {
        const resp = await fetch('/api/ads');
        const data = await resp.json();
        if (data && data.headerAdCode) {
          setAdsConfig(data);
        } else {
          const stored = localStorage.getItem('nexus_korra_ads_config');
          if (stored) setAdsConfig(JSON.parse(stored));
        }
      } catch (err) {
        console.warn('API Ads error, using defaults or local storage');
        const stored = localStorage.getItem('nexus_korra_ads_config');
        if (stored) setAdsConfig(JSON.parse(stored));
      }
    };
    fetchAdsConfig();
  }, []);

  // Handle saving new Ad configuration
  const handleSaveAds = (newConfig: AdsConfig) => {
    setAdsConfig(newConfig);
    localStorage.setItem('nexus_korra_ads_config', JSON.stringify(newConfig));
  };

  // Inject Popunder Script dynamically on change or mount (Adsterra / Clickadilla integration)
  useEffect(() => {
    if (adsConfig.popunderAdCode) {
      injectAdScript(adsConfig.popunderAdCode, 'popunder-injection-slot');
    }
  }, [adsConfig.popunderAdCode]);

  // Lazy render the static top, side, and mid banners on change
  useEffect(() => {
    if (adsConfig.headerAdCode) {
      injectAdScript(adsConfig.headerAdCode, 'header-banner-ad-container');
    }
  }, [adsConfig.headerAdCode]);

  useEffect(() => {
    if (adsConfig.sidebarAdCode) {
      injectAdScript(adsConfig.sidebarAdCode, 'sidebar-banner-ad-container');
    }
  }, [adsConfig.sidebarAdCode, currentLegalPage, selectedMatch]);

  useEffect(() => {
    if (adsConfig.midFeedAdCode) {
      injectAdScript(adsConfig.midFeedAdCode, 'mid-feed-banner-ad-container');
    }
  }, [adsConfig.midFeedAdCode, dateTab, selectedMatch]);

  useEffect(() => {
    if (adsConfig.stickyFooterAdCode) {
      injectAdScript(adsConfig.stickyFooterAdCode, 'sticky-footer-banner-ad-container');
    }
  }, [adsConfig.stickyFooterAdCode]);

  // Filtering matches based on date, league, search and country
  const filteredMatches = matches.filter((m) => {
    // 1st: Date filter
    const targetDate =
      dateTab === 'today'
        ? getRelativeDate(0)
        : dateTab === 'yesterday'
        ? getRelativeDate(-1)
        : getRelativeDate(1);

    if (dateTab !== 'live' && m.date !== targetDate) return false;
    if (dateTab === 'live' && m.status !== 'live') return false;

    // 2nd: League filter
    if (leagueFilter !== 'all') {
      const matchCompLower = m.competition.toLowerCase();
      if (leagueFilter === 'champions' && !matchCompLower.includes('أبطال')) return false;
      if (leagueFilter === 'saudi' && !matchCompLower.includes('سعودي')) return false;
      if (leagueFilter === 'egypt' && !matchCompLower.includes('مصري')) return false;
      if (leagueFilter === 'laliga' && !matchCompLower.includes('إسباني')) return false;
      if (leagueFilter === 'premier' && !matchCompLower.includes('إنجليزي')) return false;
    }

    // 3rd: Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const inHome = m.homeTeam.toLowerCase().includes(q);
      const inAway = m.awayTeam.toLowerCase().includes(q);
      const inComp = m.competition.toLowerCase().includes(q);
      const inComm = m.commentator.toLowerCase().includes(q);
      if (!inHome && !inAway && !inComp && !inComm) return false;
    }

    // 4th: Country quick select filter mockup
    if (selectedCountry !== 'الكل') {
      const matchCompLower = m.competition.toLowerCase();
      if (selectedCountry === 'مصر' && !matchCompLower.includes('مصري')) return false;
      if (selectedCountry === 'السعودية' && !matchCompLower.includes('سعودي')) return false;
      if (selectedCountry === 'أوروبا' && !matchCompLower.includes('أبطال') && !matchCompLower.includes('إسباني') && !matchCompLower.includes('إنجليزي') && !matchCompLower.includes('فرنسي')) return false;
    }

    return true;
  });

  return (
    <div className="min-h-screen bg-[#07080b] text-[#f1f5f9] font-sans antialiased text-right flex flex-col selection:bg-primary selection:text-slate-950" dir="rtl" id="applet-viewport">
      
      {/* Popunder script container placeholder (Runs on body clicks) */}
      <div id="popunder-injection-slot" className="hidden"></div>
      
      {/* Sticky Main Header for Kooora */}
      <header className="bg-[#0f111a] border-b border-[#1e2230] sticky top-0 z-30 shadow-2xl">
        
        {/* Top Info Bar (Header-top styling) */}
        <div className="bg-[#07080b] text-white text-[12px] font-bold py-2.5 px-6 flex justify-between items-center border-b border-[#1e2230]">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-2 text-[#00ff66]">
              <span className="w-2.5 h-2.5 bg-[#00ff66] rounded-full animate-pulse shadow-[0_0_10px__#00ff66]"></span>
              9 مباريات بث حية نشطة حالياً
            </span>
            <span className="text-slate-400 font-mono opacity-80">📅 {new Date().toLocaleDateString('ar-EG', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
          </div>
          <div className="flex items-center gap-4">
            {/* Country Selector Switcher as described in design */}
            <div className="flex items-center gap-2 text-[11px] text-slate-300">
              <Globe className="w-3.5 h-3.5 text-primary" />
              <span>البلد المفضل:</span>
              <select
                value={selectedCountry}
                onChange={(e) => setSelectedCountry(e.target.value)}
                className="bg-[#07080b] text-white text-[11px] font-bold rounded-md border border-[#1e2230] px-2.5 py-1 focus:outline-none focus:ring-1 focus:ring-primary cursor-pointer"
              >
                <option value="الكل">الكل (العالمي)</option>
                <option value="مصر">مصر 🇪🇬</option>
                <option value="السعودية">المملكة العربية السعودية 🇸🇦</option>
                <option value="أوروبا">الدوريات الأوروبية 🇪🇺</option>
              </select>
            </div>
            
            {/* Sponsor Admin Toggle Key */}
            <button
              onClick={() => setShowAdminSettings(!showAdminSettings)}
              className="bg-[#07080b] hover:bg-[#121420] border border-[#1e2230] text-primary hover:text-white font-bold px-3.5 py-1.5 rounded-lg text-[11px] flex items-center gap-1.5 cursor-pointer select-none transition-all shadow-[0_0_12px_rgba(0,255,102,0.05)] hover:border-primary"
              title="لوحة تحكم إعلانات أدسينس وأدستيرا"
            >
              <Settings className="w-3.5 h-3.5 animate-spin duration-300 text-primary" />
              <span>إدارة الإعلانات (Sponsor Panel)</span>
            </button>
          </div>
        </div>

        {/* Brand Banner & Search Section */}
        <div className="max-w-7xl mx-auto px-6 py-4.5 flex flex-col md:flex-row justify-between items-center gap-4">
          
          {/* Main Logo */}
          <div 
            onClick={() => {
              setSelectedMatch(null); 
              setActiveNews(null); 
              setCurrentLegalPage(null);
            }}
            className="flex items-center gap-3 cursor-pointer select-none group"
          >
            <div className="bg-[#00ff66] p-2.5 rounded-xl text-black font-black text-xl tracking-tight leading-none flex items-center gap-2 shadow-[0_0_20px_rgba(0,255,102,0.3)] group-hover:scale-103 transition-transform">
              <span>⚽</span>
              <span className="font-sans" style={{ fontFamily: 'Cairo, sans-serif' }}>NEXUS KORRA</span>
            </div>
            <div className="border-r border-[#1e2230] pr-3 mr-1">
              <span className="text-sm text-slate-100 font-bold block">موقع الرياضة العربي الأول</span>
              <span className="text-[10px] text-primary font-bold tracking-wider uppercase font-mono block">NEXUSKORRA.COM</span>
            </div>
          </div>

          {/* Matches & News Custom Search Bar */}
          <div className="relative w-full md:w-85">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="ابحث عن اسم فريق، بطولة، معلق في نكسس كورة..."
              className="w-full pl-9 pr-4 py-2.5 text-xs bg-[#07080b] border border-[#1e2230] text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary font-sans placeholder-slate-500"
            />
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
          </div>

        </div>

        {/* Global Nav Categories Section (Header-main and active class styling) */}
        <nav className="bg-[#0a0c14] border-t border-[#1e2230]">
          <div className="max-w-7xl mx-auto px-6 flex overflow-x-auto gap-1 scrollbar-none text-sm font-bold">
            
            <button
              onClick={() => {
                setSelectedMatch(null);
                setActiveNews(null);
                setCurrentLegalPage(null);
                setLeagueFilter('all');
              }}
              className={`px-4 py-3.5 text-xs sm:text-sm font-bold whitespace-nowrap transition cursor-pointer ${
                leagueFilter === 'all' && !selectedMatch && !activeNews && !currentLegalPage
                  ? 'text-primary border-b-3 border-primary bg-[#0f111a]'
                  : 'text-slate-300 hover:text-primary hover:bg-[#0f111a]'
              }`}
            >
              الرئيسية
            </button>

            <button
              onClick={() => {
                setLeagueFilter('champions');
                setSelectedMatch(null);
                setActiveNews(null);
                setCurrentLegalPage(null);
              }}
              className={`px-4 py-3.5 text-xs sm:text-sm font-bold whitespace-nowrap transition cursor-pointer ${
                leagueFilter === 'champions'
                  ? 'text-primary border-b-3 border-primary bg-[#0f111a]'
                  : 'text-slate-300 hover:text-primary hover:bg-[#0f111a]'
              }`}
            >
              دوري أبطال أوروبا
            </button>

            <button
              onClick={() => {
                setLeagueFilter('saudi');
                setSelectedMatch(null);
                setActiveNews(null);
                setCurrentLegalPage(null);
              }}
              className={`px-4 py-3.5 text-xs sm:text-sm font-bold whitespace-nowrap transition cursor-pointer ${
                leagueFilter === 'saudi'
                  ? 'text-primary border-b-3 border-primary bg-[#0f111a]'
                  : 'text-slate-300 hover:text-primary hover:bg-[#0f111a]'
              }`}
            >
              الدوري السعودي للمحترفين
            </button>

            <button
              onClick={() => {
                setLeagueFilter('egypt');
                setSelectedMatch(null);
                setActiveNews(null);
                setCurrentLegalPage(null);
              }}
              className={`px-4 py-3.5 text-xs sm:text-sm font-bold whitespace-nowrap transition cursor-pointer ${
                leagueFilter === 'egypt'
                  ? 'text-primary border-b-3 border-primary bg-[#0f111a]'
                  : 'text-slate-300 hover:text-primary hover:bg-[#0f111a]'
              }`}
            >
              الدوري المصري الممتاز
            </button>

            <button
              onClick={() => {
                setLeagueFilter('laliga');
                setSelectedMatch(null);
                setActiveNews(null);
                setCurrentLegalPage(null);
              }}
              className={`px-4 py-3.5 text-xs sm:text-sm font-bold whitespace-nowrap transition cursor-pointer ${
                leagueFilter === 'laliga'
                  ? 'text-primary border-b-3 border-primary bg-[#0f111a]'
                  : 'text-slate-300 hover:text-primary hover:bg-[#0f111a]'
              }`}
            >
              الدوري الإسباني (LaLiga)
            </button>

            <button
              onClick={() => {
                setLeagueFilter('premier');
                setSelectedMatch(null);
                setActiveNews(null);
                setCurrentLegalPage(null);
              }}
              className={`px-4 py-3.5 text-xs sm:text-sm font-bold whitespace-nowrap transition cursor-pointer ${
                leagueFilter === 'premier'
                  ? 'text-primary border-b-3 border-primary bg-[#0f111a]'
                  : 'text-slate-300 hover:text-primary hover:bg-[#0f111a]'
              }`}
            >
              الدوري الإنجليزي (Premier League)
            </button>

            {/* Quick Link Pages */}
            <button
              onClick={() => {
                setCurrentLegalPage('privacy');
                setSelectedMatch(null);
                setActiveNews(null);
              }}
              className="px-4 py-3.5 text-slate-400 hover:text-primary whitespace-nowrap transition cursor-pointer text-xs sm:text-sm font-bold mr-auto"
            >
              سياسة الخصوصية
            </button>
            
          </div>
        </nav>

      </header>

      {/* Main Container Wrapper */}
      <main className="max-w-7xl w-full mx-auto px-6 py-6 flex-1 space-y-4">

        {/* 📣 Ad Billboard Section (Google AdSense 728x90 Billboard Banner) */}
        <div id="header-banner-ad-container" className="flex justify-center overflow-hidden">
          {/* Static fallbacks are rendered dynamically in case no custom code is provided */}
          {adsConfig.isDemoMode && (
            <div className="w-full bg-[#0f111a] border border-[#1e2230] rounded-2xl text-slate-300 text-xs font-mono p-5 flex flex-col items-center justify-center gap-2 shadow-xl">
              <div className="font-bold flex items-center gap-1.5 text-[#00ff66]">
                <span className="inline-block w-2.5 h-2.5 rounded-full bg-primary animate-ping"></span>
                📣 مساحة إعلانية مدمجة - بنر علوي مميز (728x90 Billboard)
              </div>
              <p className="text-slate-400 font-sans text-center text-xs">يمكنك تبديل هذا الرمز ليعرض إعلانات Google AdSense مباشرة بوضع شفرة إعلانك في لوحة التحكم الإعلانية</p>
              <div className="px-3 py-1 bg-[#121522] border border-primary/20 text-primary rounded-lg font-sans font-bold select-none text-[10px]">إعلان تجريبي نشط</div>
            </div>
          )}
        </div>

        {/* Administration Settings Toggle Drawer overlay */}
        {showAdminSettings && (
          <div className="bg-[#0f111a] border-2 border-primary rounded-2xl p-4 mb-2 shadow-[0_0_25px_rgba(0,255,102,0.15)]">
            <AdminAdsConfig
              currentConfig={adsConfig}
              onSave={handleSaveAds}
              onClose={() => setShowAdminSettings(false)}
            />
          </div>
        )}

        {/* Router Render Logic splits either: Legal pages OR Selected Match Player OR Standard Stream Grid */}
        
        {currentLegalPage ? (
          // LEGAL/POLICIES VIEW COMPONENT
          <LegalPages
            currentPage={currentLegalPage}
            onBack={() => setCurrentLegalPage(null)}
          />
        ) : selectedMatch ? (
          // PASS TO MATCH DETAILS (LIVE STREAM PLAYER & LIVE CHAT SIMULATOR)
          <div className="space-y-4">
            <MatchDetails
              match={selectedMatch}
              onBack={() => setSelectedMatch(null)}
            />
            {/* AI Assistant analyst loaded at the bottom of the stream */}
            <AiAnalyst selectedMatch={selectedMatch} />
          </div>
        ) : (
          // STANDARD HOMEPAGE GRID LISTINGS
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            
            {/* Matches Schedules block (3 Columns on desktop for high density) */}
            <div className="lg:col-span-3 space-y-4">
              
              {/* Match day filter tabs strip inside a rectangular box */}
              <div className="bg-[#0f111a] border border-[#1e2230] rounded-2xl p-3 flex flex-col sm:flex-row justify-between items-center gap-3 shadow-xl">
                
                {/* Segment tabs */}
                <div className="flex gap-1.5 w-full sm:w-auto">
                  <button
                    onClick={() => { setDateTab('today'); setSelectedMatch(null); }}
                    className={`flex-1 sm:flex-none py-2 px-4 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      dateTab === 'today' ? 'bg-primary text-slate-950 font-black shadow-[0_0_15px_rgba(0,255,102,0.3)]' : 'bg-[#07080b] text-slate-300 border border-[#1e2230] hover:bg-slate-900'
                    }`}
                  >
                    ⚽ اليوم ({getRelativeDate(0)})
                  </button>
                  <button
                    onClick={() => { setDateTab('yesterday'); setSelectedMatch(null); }}
                    className={`flex-1 sm:flex-none py-2 px-4 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      dateTab === 'yesterday' ? 'bg-primary text-slate-950 font-black shadow-[0_0_15px_rgba(0,255,102,0.3)]' : 'bg-[#07080b] text-slate-300 border border-[#1e2230] hover:bg-slate-900'
                    }`}
                  >
                    ⏮️ مباريات الأمس
                  </button>
                  <button
                    onClick={() => { setDateTab('tomorrow'); setSelectedMatch(null); }}
                    className={`flex-1 sm:flex-none py-2 px-4 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      dateTab === 'tomorrow' ? 'bg-primary text-slate-950 font-black shadow-[0_0_15px_rgba(0,255,102,0.3)]' : 'bg-[#07080b] text-slate-300 border border-[#1e2230] hover:bg-slate-900'
                    }`}
                  >
                    ⏭️ مباريات الغد
                  </button>
                </div>

                {/* Live indicators block button */}
                <button
                  onClick={() => { setDateTab('live'); setSelectedMatch(null); }}
                  className={`py-2 px-5 rounded-xl text-xs font-bold flex items-center gap-2 cursor-pointer select-none transition-all ${
                    dateTab === 'live'
                      ? 'bg-red-650 text-white font-black animate-pulse shadow-[0_0_15px_rgba(239,68,68,0.3)]'
                      : 'bg-[#1a0b0d] text-red-400 border border-red-900/45 hover:bg-red-950/40'
                  }`}
                >
                  <span className="w-2.5 h-2.5 bg-red-500 border border-white rounded-full animate-ping"></span>
                  <span>المباشر الآن ({matches.filter(m => m.status === 'live').length})</span>
                </button>

              </div>

              {/* Active Leauge Header title or empty info */}
              <div className="bg-[#0f111a] border border-[#1e2230] border-r-4 border-r-primary rounded-2xl shadow-lg px-4.5 py-3.5 text-xs font-bold text-slate-200 flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-primary" />
                  <span>جدول مباريات:</span>
                  <span className="text-primary font-bold underline decoration-primary/40 decoration-2 underline-offset-4">
                    {leagueFilter === 'all' ? 'جميع المسابقات والدوريات العالمية' : leagueFilter}
                  </span>
                </span>
                <span className="text-slate-400 font-mono text-[10px]">المطابقة: {filteredMatches.length} مباريات في الجدول</span>
              </div>

              {/* Matches list view */}
              <div className="space-y-4">
                {filteredMatches.length > 0 ? (
                  filteredMatches.map((m) => (
                    <div
                      key={m.id}
                      onClick={() => setSelectedMatch(m)}
                      className={`h-auto bg-[#0f111a] border border-[#1e2230] rounded-2xl p-4 md:p-5 text-xs flex flex-col md:flex-row justify-between items-center gap-4 transition-all duration-300 cursor-pointer group hover:border-[#00ff66] hover:translate-y-[-3px] hover:shadow-[0_8px_25px_rgba(0,255,102,0.1)] ${
                        m.status === 'live' ? 'border-r-4 border-r-primary bg-gradient-to-r from-[#0f111a] to-[#14231b]' : ''
                      }`}
                    >
                      {/* Left Block: League Information & Channel details */}
                      <div className="flex items-center gap-3.5 md:w-1/4">
                        <span className="text-xl bg-[#07080b] border border-[#1e2230] p-2 rounded-xl shadow-inner">🏆</span>
                        <div>
                          <p className="font-bold text-slate-100 group-hover:text-primary transition-colors line-clamp-1 text-sm">{m.competition}</p>
                          <span className="text-[10px] text-slate-400 font-medium">{m.channel} • {m.commentator}</span>
                        </div>
                      </div>

                      {/* Middle Block: Fixture Teams Comparison */}
                      <div className="flex-1 flex justify-center items-center gap-2 md:gap-4 md:w-1/2">
                        {/* Team A */}
                        <div className="flex items-center gap-2.5 justify-end w-28 text-left">
                          <span className="font-extrabold text-slate-200 truncate max-w-[95px] text-right inline-block w-full">{m.homeTeam}</span>
                          <span className="text-3xl drop-shadow-[0_2px_8px_rgba(255,255,255,0.08)]">{m.homeLogo}</span>
                        </div>

                        {/* Event score or VS representation */}
                        <div className="flex flex-col items-center justify-center min-w-[75px]">
                          {m.status === 'upcoming' ? (
                            <span className="bg-[#07080b] text-slate-300 font-bold font-mono px-3.5 py-1.5 rounded-xl border border-[#1e2230] text-[11px]">
                              {m.time}
                            </span>
                          ) : (
                            <div className="flex flex-col items-center">
                              <span className="bg-[#07080b] text-white border border-[#1e2230] font-mono font-black text-sm px-3.5 py-1 rounded-xl flex gap-1 items-center shadow-lg group-hover:border-primary/45">
                                <span className={m.score?.home !== undefined ? "text-primary" : ""}>{m.score?.home}</span>
                                <span className="text-slate-600 font-bold">:</span>
                                <span className={m.score?.away !== undefined ? "text-primary" : ""}>{m.score?.away}</span>
                              </span>
                              {m.status === 'live' && (
                                <span className="text-[9px] bg-[#1a0b0d] text-red-500 px-2 py-0.5 rounded-lg mt-1.5 animate-pulse font-bold border border-red-900/40">
                                  د {m.currentMinute}'
                                </span>
                              )}
                              {m.status === 'finished' && (
                                <span className="text-[9px] bg-slate-900 text-slate-400 px-2 py-0.5 rounded-lg mt-1.5 font-bold border border-[#1e2230]">
                                  انتهت
                                </span>
                              )}
                            </div>
                          )}
                        </div>

                        {/* Team B */}
                        <div className="flex items-center gap-2.5 justify-start w-28 text-right">
                          <span className="text-3xl drop-shadow-[0_2px_8px_rgba(255,255,255,0.08)]">{m.awayLogo}</span>
                          <span className="font-extrabold text-slate-200 truncate max-w-[95px] text-left inline-block w-full">{m.awayTeam}</span>
                        </div>
                      </div>

                      {/* Right Block: Live stream Status Link */}
                      <div className="flex items-center gap-2.5 md:w-1/4 justify-end">
                        {m.status === 'live' ? (
                          <span className="bg-[#00ff66] text-black text-[10px] font-extrabold py-1.5 px-3.5 rounded-lg flex items-center gap-1.5 shadow-[0_0_12px_rgba(0,255,102,0.3)]">
                            <span className="w-1.5 h-1.5 bg-black rounded-full animate-ping"></span>
                            شاهد البث مباشر
                          </span>
                        ) : m.status === 'finished' ? (
                          <span className="bg-[#07080b] text-slate-300 text-[10px] font-bold py-1.5 px-3.5 rounded-lg border border-[#1e2230] flex items-center gap-1">
                            ملخص وأهداف
                          </span>
                        ) : (
                          <span className="bg-[#121420] text-primary border border-primary/25 text-[10px] font-bold py-1.5 px-3.5 rounded-lg flex items-center gap-1">
                            موعد المباراة
                          </span>
                        )}
                        <ChevronLeft className="w-4 h-4 text-slate-500 group-hover:translate-x-[-4px] group-hover:text-primary transition-all" />
                      </div>

                    </div>
                  ))
                ) : (
                  <div className="bg-[#0f111a] border border-[#1e2230] rounded-2xl p-8 text-center text-slate-400 text-xs shadow-inner">
                    📂 لا توجد مباريات حية حالياً تطابق معايير الفلترة المحددة.
                  </div>
                )}
              </div>

              {/* 📣 Inside Grid Feed Ad (Between the listings) */}
              <div id="mid-feed-banner-ad-container" className="pt-2">
                {adsConfig.isDemoMode && (
                  <div className="w-full bg-gradient-to-r from-[#0f111a] to-[#07080b] rounded-2xl border border-[#1e2230] text-slate-200 text-xs font-mono p-5 flex flex-col items-center justify-center gap-2 shadow-2xl">
                    <div className="font-bold text-xs text-center text-primary flex items-center gap-1.5">
                      <span className="inline-block w-2 h-2 rounded-full bg-primary"></span>
                      📣 إعلان ممول في جدول اليوم (Native Mid-Feed Banner)
                    </div>
                    <p className="text-slate-400 font-sans text-center text-[11px]">أضف كود إعلانك لكي يظهر للمستخدمين بين جداول البث المباشر للأحداث الرياضية</p>
                  </div>
                )}
              </div>

              {/* AI Sports prediction analyst loaded inline on homepage */}
              <div className="space-y-2 pt-2">
                <span className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-primary" />
                  تحليلات الذكاء الاصطناعي لنكسس كورة:
                </span>
                <AiAnalyst />
              </div>

            </div>

            {/* Right Sidebar Columns (1 Column) */}
            <div className="lg:col-span-1 space-y-4">
              
              {/* 📣 Sidebar Ad Slot (Google AdSense 300x250 Sidebar Banner) */}
              <div id="sidebar-banner-ad-container" className="flex justify-center overflow-hidden">
                {adsConfig.isDemoMode && (
                  <div className="w-full h-64 bg-[#0f111a] border border-[#1e2230] rounded-2xl text-slate-300 text-xs font-mono p-5 flex flex-col items-center justify-center gap-2 shadow-xl">
                    <div className="font-bold flex items-center gap-1.5 text-primary">📣 إعلان جانبي مميز (300x250)</div>
                    <p className="text-slate-400 font-sans text-center text-[11px]">مكان ممتاز ومقترح لوضع شفرة Adsterra أو Google AdSense الجانبية</p>
                    <div className="px-3 py-1 bg-[#121522] border border-primary/20 text-[#00ff66] rounded-lg font-sans font-bold select-none text-[10px]">إعلان تجريبي نشط</div>
                  </div>
                )}
              </div>

              {/* High density News feed section */}
              <div className="bg-[#0f111a] border border-[#1e2230] rounded-2xl overflow-hidden shadow-2xl">
                <div className="section-header flex justify-between items-center py-3 px-4">
                  <span className="flex items-center gap-2 font-bold text-white text-sm">
                    <Newspaper className="w-4 h-4 text-primary" />
                    أخبار الرياضة الأكثر قراءة
                  </span>
                  <span className="text-[10px] bg-red-600 text-white font-extrabold px-2 py-0.5 rounded-lg animate-pulse shadow-sm">عاجل</span>
                </div>

                <div className="divide-y divide-[#1e2230]">
                  {news.map((n) => (
                    <div
                      key={n.id}
                      onClick={() => setActiveNews(n)}
                      className="p-4 bg-[#0f111a] hover:bg-[#121522] transition cursor-pointer space-y-2 group border-b border-[#1e2230]"
                    >
                      <div className="flex justify-between items-start">
                        <span className="text-[10px] text-primary font-bold bg-[#121522] px-2 py-0.5 rounded-md border border-primary/10">
                          {n.category}
                        </span>
                        <span className="text-[10px] text-slate-400 font-mono">👀 {n.views.toLocaleString()} مشاهدة</span>
                      </div>
                      <h4 className="text-xs font-bold text-slate-200 group-hover:text-primary transition-colors line-clamp-2">
                        {n.title}
                      </h4>
                    </div>
                  ))}
                </div>
              </div>

            </div>

          </div>
        )}

      </main>

      {/* Pop-up News Modal drawer */}
      {activeNews && (
        <div className="fixed inset-0 bg-black/85 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in" dir="rtl">
          <div className="bg-[#0f111a] border border-[#1e2230] rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-2xl border-t-4 border-primary text-right text-white">
            <div className="flex justify-between items-center">
              <span className="text-xs text-primary font-bold bg-[#121522] border border-primary/20 px-2.5 py-1 rounded-md">{activeNews.category}</span>
              <button
                onClick={() => setActiveNews(null)}
                className="text-slate-400 hover:text-white text-xs font-bold p-1 cursor-pointer transition-colors"
              >
                ✕ إغلاق
              </button>
            </div>
            
            <h3 className="text-md font-bold text-slate-100 leading-snug">{activeNews.title}</h3>
            
            <div className="bg-[#07080b] border-r-3 border-primary p-4 rounded-xl">
              <p className="text-xs text-slate-300 leading-relaxed font-sans">{activeNews.summary}</p>
            </div>

            <div className="text-[11px] text-slate-400 flex justify-between items-center bg-[#07080b] border border-[#1e2230] p-3 rounded-xl">
              <span>تاريخ النشر: {activeNews.date}</span>
              <span className="font-bold text-primary">منتدى نكسس كورة الفني</span>
            </div>
            
            <div className="flex justify-end pt-2">
              <button
                onClick={() => setActiveNews(null)}
                className="bg-primary hover:bg-[#00e55b] text-black font-extrabold px-5 py-2 rounded-xl text-xs cursor-pointer shadow-lg active:scale-95 transition-all"
              >
                العودة للجدول الرئيسي
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Sticky Anchor Box placeholder (Sticky Adsterra/AdSense) */}
      <div id="sticky-footer-banner-container-parent" className="sticky bottom-0 z-40 bg-[#0f111a] border-t border-[#1e2230] shadow-2xl">
        <div id="sticky-footer-banner-ad-container" className="flex justify-center">
          {adsConfig.isDemoMode && (
            <div className="w-full bg-[#0a0c14] border-t border-[#1e2230] text-slate-300 text-xs font-mono py-2.5 px-6 flex items-center justify-between">
              <span className="font-bold text-[#00ff66] flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-primary animate-ping"></span>
                📣 إعلان سفلي لاصق (Sticky Anchor Banner AD)
              </span>
              <span className="text-slate-400 font-sans text-[11px] hidden sm:inline">هذا البانر مثبت في أسفل الموقع ويمكن التحكم بنصه أو تغييره بشفرة AdSense أو Adsterra</span>
            </div>
          )}
        </div>
      </div>

      {/* Elegant Dense Footer */}
      <footer className="bg-[#07080b] text-slate-400 text-xs py-10 border-t border-[#1e2230] mt-12 font-sans">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <div className="space-y-3">
            <h4 className="text-white font-extrabold text-md flex items-center gap-1.5 text-primary">⚽ نكسس كورة - Nexus Korra</h4>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              تغطية تامة وجداول حية لمباريات اليوم، الغد، والأمس بأسلوب فني تكتيكي متطور. بث حي عبر الأقمار بجودة فائقة قابلة للتكيف على الدومين Nexusutils.
            </p>
          </div>

          <div className="space-y-3">
            <h4 className="text-white font-bold">📖 صفحات قانونية وسيو (SEO Legal Pages)</h4>
            <div className="flex flex-col gap-2 text-[11px]">
              <button
                onClick={() => { setCurrentLegalPage('privacy'); setSelectedMatch(null); }}
                className="text-right hover:text-primary text-slate-400 flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                🔒 سياسة الخصوصية (Privacy Policy)
              </button>
              <button
                onClick={() => { setCurrentLegalPage('terms'); setSelectedMatch(null); }}
                className="text-right hover:text-primary text-slate-400 flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                ⚖️ شروط الاستخدام والخدمة (Terms of Service)
              </button>
              <button
                onClick={() => { setCurrentLegalPage('cookies'); setSelectedMatch(null); }}
                className="text-right hover:text-primary text-slate-400 flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                🍪 سياسة ملفات تعريف الارتباط (Cookies Policy)
              </button>
            </div>
          </div>

          <div className="space-y-3 text-[11px] leading-relaxed">
            <h4 className="text-white font-bold text-sm">⛔ إخلاء المسؤولية القانوني لموقع نكسس كورة</h4>
            <p className="text-slate-400">
              جميع حقوق صور المباريات وحقوق البث الحية ملك لأصحابها ولا يستضيف الموقع أي بث على خوادمه الخاصة. جميع المواد المنشورة حماية بالكامل للأطراف المعنية.
            </p>
            <span className="block text-slate-500 text-[10px] mt-2 font-mono">© 2026 nexusutils.com - All Rights Reserved. Designed by Gemini.</span>
          </div>

        </div>
      </footer>

    </div>
  );
}
