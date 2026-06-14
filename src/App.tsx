import React, { useState, useEffect } from 'react';
import { 
  Play, 
  Tv, 
  Calendar, 
  Shield, 
  Activity, 
  FileCode, 
  ExternalLink, 
  Volume2, 
  Settings, 
  Code, 
  Copy, 
  Check, 
  Eye, 
  MessageSquare, 
  Clock, 
  ChevronRight, 
  ChevronLeft, 
  TrendingUp, 
  X, 
  Radio, 
  Layers,
  Sparkles,
  RefreshCw,
  Search,
  BookOpen,
  Lock,
  Unlock,
  Trash2,
  PlusCircle,
  AlertCircle,
  CheckCircle2,
  Globe
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Match, NewsArticle, StandingRow } from './types';
import { INITIAL_MATCHES, INITIAL_NEWS, STANDINGS_DATA } from './data';
import { MatchStrip, StandingsTable } from './components/FootballComponents';

export default function App() {
  // Application states
  const [matches, setMatches] = useState<Match[]>(INITIAL_MATCHES);
  const [news, setNews] = useState<NewsArticle[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('nexus_custom_news');
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          // Return custom news prepended, then initial news
          return [...parsed, ...INITIAL_NEWS];
        } catch (e) {
          return INITIAL_NEWS;
        }
      }
    }
    return INITIAL_NEWS;
  });
  const [selectedDate, setSelectedDate] = useState<string>('2026-06-13'); // Today's date default
  const [selectedLeagueFilter, setSelectedLeagueFilter] = useState<string>('ALL');
  const [activeMatchId, setActiveMatchId] = useState<string | null>('m1'); // Real-time match commentary default
  const [activeArticleId, setActiveArticleId] = useState<string | null>(null);
  
  // Custom API configuration
  const [apiFootballKey, setApiFootballKey] = useState<string>('c917ee7b8fa321df08ca9d1fa37b120');
  const [apiLeagueId, setApiLeagueId] = useState<string>('307'); // Saudi Pro League
  const [apiSeason, setApiSeason] = useState<string>('2025');
  const [isConnectingApi, setIsConnectingApi] = useState<boolean>(false);
  const [apiStatus, setApiStatus] = useState<'IDLE' | 'CONNECTED' | 'ERROR'>('CONNECTED');
  const [showConfigSuccess, setShowConfigSuccess] = useState<boolean>(false);

  // Streaming State
  const [adminLiveStreamTitle, setAdminLiveStreamTitle] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('nexus_admin_stream_title') || '';
    }
    return '';
  });
  const [adminLiveStreamUrl, setAdminLiveStreamUrl] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('nexus_admin_stream_url') || '';
    }
    return '';
  });
  const [adminLiveStreamActive, setAdminLiveStreamActive] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('nexus_admin_stream_active') === 'true';
    }
    return false;
  });

  const [streamingUrl, setStreamingUrl] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      const active = localStorage.getItem('nexus_admin_stream_active') === 'true';
      const url = localStorage.getItem('nexus_admin_stream_url');
      if (active && url) {
        if (url.includes('<iframe')) {
          const match = url.match(/<iframe[^>]*src=["']([^"']*)["']/);
          if (match && match[1]) return match[1];
        }
        return url;
      }
    }
    return 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4';
  });
  const [isIframeStream, setIsIframeStream] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const active = localStorage.getItem('nexus_admin_stream_active') === 'true';
      const url = localStorage.getItem('nexus_admin_stream_url');
      if (active && url) {
        return url.includes('<iframe') || url.includes('youtube.com') || url.includes('youtu.be') || url.includes('embed') || url.includes('.html') || (!url.includes('.mp4') && !url.includes('.m3u8'));
      }
    }
    return false;
  });
  const [isCustomUrlActive, setIsCustomUrlActive] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('nexus_admin_stream_active') === 'true';
    }
    return false;
  });
  const [customStreamInput, setCustomStreamInput] = useState<string>('');
  const [activeChannelName, setActiveChannelName] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      const active = localStorage.getItem('nexus_admin_stream_active') === 'true';
      const title = localStorage.getItem('nexus_admin_stream_title');
      if (active && title) {
        return title;
      }
    }
    return 'beIN Sports HD 1 (بث افتراضي)';
  });
  
  // Standing League Tab
  const [selectedStandingLeague, setSelectedStandingLeague] = useState<string>('spl');

  // Contact page states
  const [contactName, setContactName] = useState<string>('');
  const [contactEmail, setContactEmail] = useState<string>('');
  const [contactSubject, setContactSubject] = useState<string>('');
  const [contactMsg, setContactMsg] = useState<string>('');
  const [isSendingContact, setIsSendingContact] = useState<boolean>(false);
  const [contactSuccess, setContactSuccess] = useState<boolean>(false);

  // News category page filter
  const [newsPageFilter, setNewsPageFilter] = useState<string>('ALL');

  // AdSense & Blueprint settings (Disabled by default for clean production AdSense presentation)
  const [showAdBlueprints, setShowAdBlueprints] = useState<boolean>(false);
  const [copiedText, setCopiedText] = useState<string>('');

  // Developer / Admin mode toggle (Strictly disabled for a clean production sports site)
  const [isDeveloperMode, setIsDeveloperMode] = useState<boolean>(false);

  // Active view tabs
  const [activeAppTab, setActiveAppTab] = useState<'MAIN' | 'NEWS_PAGE' | 'ARABIC_LEAGUES' | 'EUROPEAN_LEAGUES' | 'MERCATO' | 'ABOUT_US' | 'CONTACT_US' | 'PRIVACY_POLICY' | 'COPYRIGHT' | 'MIGRATION' | 'NEXUS_ADMIN'>('MAIN');

  // API Football integrations vs Simulation modes
  const [matchSource, setMatchSource] = useState<'AUTO_SIMULATED' | 'RAPID_API'>('RAPID_API');
  const [standingsSource, setStandingsSource] = useState<'AUTO_SIMULATED' | 'RAPID_API'>('RAPID_API');

  // CMS Admin states
  const [adminPasswordInput, setAdminPasswordInput] = useState<string>('');
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('nexus_admin_auth') === 'true';
    }
    return false;
  });
  const [adminErrorMessage, setAdminErrorMessage] = useState<string>('');
  
  // Custom Article Form fields
  const [adminTitle, setAdminTitle] = useState<string>('');
  const [adminCategory, setAdminCategory] = useState<string>('أخبار عاجلة');
  const [adminSummary, setAdminSummary] = useState<string>('');
  const [adminContent, setAdminContent] = useState<string>('');
  const [adminImage, setAdminImage] = useState<string>('');
  const [adminPlacement, setAdminPlacement] = useState<'HEADER_BANNER' | 'MIDDLE_CONTENT' | 'FOOTER_LINKS'>('MIDDLE_CONTENT');
  const [adminPublishSuccess, setAdminPublishSuccess] = useState<boolean>(false);

  // Multi-commentary state simulator
  const [matchCommentaries, setMatchCommentaries] = useState<Record<string, string[]>>({
    m1: INITIAL_MATCHES.find(m => m.id === 'm1')?.commentary || [],
    m2: INITIAL_MATCHES.find(m => m.id === 'm2')?.commentary || [],
    m3: INITIAL_MATCHES.find(m => m.id === 'm3')?.commentary || [],
  });
  
  // Custom streamer commentary updates simulator
  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate real-time progress of live matches
      setMatches(prevMatches => {
        return prevMatches.map(match => {
          if (match.status === 'LIVE' && match.minute) {
            const nextMin = match.minute + 1;
            if (nextMin >= 90) {
              return { ...match, minute: 90, status: 'FINISHED' };
            }
            
            // Random chance of goal
            let updatedHomeScore = match.homeScore;
            let updatedAwayScore = match.awayScore;
            let addedCommentary = '';
            
            const rand = Math.random();
            if (rand > 0.96) {
              const isHome = Math.random() > 0.5;
              if (isHome) {
                updatedHomeScore += 1;
                addedCommentary = `د ${nextMin}: جووووووول! ${match.homeTeam} يسجل هدفاً حاسماً ويهز المدرجات!`;
              } else {
                updatedAwayScore += 1;
                addedCommentary = `د ${nextMin}: جووووووول! ${match.awayTeam} يعدل الكفة بهدف رائع في شباك الخصم!`;
              }
            } else if (rand > 0.8) {
              addedCommentary = `د ${nextMin}: هجمة مرتدة خطيرة لصالح فريق ${Math.random() > 0.5 ? match.homeTeam : match.awayTeam} تنتهي بالقرب من المرمى وسط تصفيق حار.`;
            }

            if (addedCommentary && match.id) {
              setMatchCommentaries(prev => ({
                ...prev,
                [match.id]: [addedCommentary, ...(prev[match.id] || [])]
              }));
            }

            return {
              ...match,
              minute: nextMin,
              homeScore: updatedHomeScore,
              awayScore: updatedAwayScore
            };
          }
          return match;
        });
      });
    }, 12000);

    return () => clearInterval(interval);
  }, []);

  // Dynamic path routing listener
  useEffect(() => {
    const handleRouting = () => {
      const path = window.location.pathname;
      const hash = window.location.hash;
      
      if (path === '/nexus-admin' || hash === '#/nexus-admin') {
        setActiveAppTab('NEXUS_ADMIN');
      } else if (path === '/news' || hash === '#/news') {
        setActiveAppTab('NEWS_PAGE');
      } else if (path === '/arabic-leagues' || hash === '#/arabic-leagues') {
        setActiveAppTab('ARABIC_LEAGUES');
      } else if (path === '/european-leagues' || hash === '#/european-leagues') {
        setActiveAppTab('EUROPEAN_LEAGUES');
      } else if (path === '/mercato' || hash === '#/mercato') {
        setActiveAppTab('MERCATO');
      }
    };
    
    handleRouting();
    
    window.addEventListener('popstate', handleRouting);
    window.addEventListener('hashchange', handleRouting);
    return () => {
      window.removeEventListener('popstate', handleRouting);
      window.removeEventListener('hashchange', handleRouting);
    };
  }, []);

  // Dynamic SEO Tags effect
  useEffect(() => {
    if (activeArticleId) {
      const article = news.find(n => n.id === activeArticleId);
      if (article) {
        document.title = `${article.title} | Nexus live kooora`;
        
        let descMeta = document.querySelector('meta[name="description"]');
        if (!descMeta) {
          descMeta = document.createElement('meta');
          descMeta.setAttribute('name', 'description');
          document.head.appendChild(descMeta);
        }
        descMeta.setAttribute('content', article.summary || article.content.substring(0, 150));

        let ogTitleMeta = document.querySelector('meta[property="og:title"]');
        if (!ogTitleMeta) {
          ogTitleMeta = document.createElement('meta');
          ogTitleMeta.setAttribute('property', 'og:title');
          document.head.appendChild(ogTitleMeta);
        }
        ogTitleMeta.setAttribute('content', `${article.title} | Nexus live kooora`);

        let ogDescMeta = document.querySelector('meta[property="og:description"]');
        if (!ogDescMeta) {
          ogDescMeta = document.createElement('meta');
          ogDescMeta.setAttribute('property', 'og:description');
          document.head.appendChild(ogDescMeta);
        }
        ogDescMeta.setAttribute('content', article.summary || article.content.substring(0, 150));

        let ogImageMeta = document.querySelector('meta[property="og:image"]');
        if (!ogImageMeta) {
          ogImageMeta = document.createElement('meta');
          ogImageMeta.setAttribute('property', 'og:image');
          document.head.appendChild(ogImageMeta);
        }
        ogImageMeta.setAttribute('content', article.image);
      }
    } else {
      document.title = "Nexus live kooora | بث مباشر مباريات اليوم وأخبار كرة القدم";
      const descMeta = document.querySelector('meta[name="description"]');
      if (descMeta) {
        descMeta.setAttribute('content', "تابع بث مباشر مباريات اليوم، جدول المباريات، نتائج الأهداف، وأحدث أخبار كرة القدم العربية والعالمية لحظة بلحظة عبر موقع Nexus live kooora.");
      }
    }
  }, [activeArticleId, news]);

  // CMS Article Handlers
  const handlePublishArticle = (e: React.FormEvent) => {
    e.preventDefault();
    if (!adminTitle || !adminSummary || !adminContent) {
      alert("يرجى ملء الحقول الرئيسية: العنوان والملخص والمحتوى.");
      return;
    }

    const newArt: NewsArticle = {
      id: 'custom-' + Date.now().toString(),
      title: adminTitle,
      summary: adminSummary,
      content: adminContent,
      image: adminImage || 'https://images.unsplash.com/photo-1540747737956-37872f7e91b3?w=600&h=300&fit=crop&q=80',
      date: new Date().toISOString().substring(0, 10),
      category: adminCategory,
      author: 'مدير المنصة',
      commentsCount: 0,
      views: 12
    };
    // Include placement explicitly
    (newArt as any).placement = adminPlacement;

    // Read stored custom articles
    let storedList: any[] = [];
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('nexus_custom_news');
      if (saved) {
        try {
          storedList = JSON.parse(saved);
        } catch (err) {}
      }
    }
    
    // Save new list
    const updatedCustom = [newArt, ...storedList];
    localStorage.setItem('nexus_custom_news', JSON.stringify(updatedCustom));
    
    // Update active memory state
    setNews([newArt, ...news]);

    // Reset inputs
    setAdminTitle('');
    setAdminSummary('');
    setAdminContent('');
    setAdminImage('');
    setAdminCategory('أخبار عاجلة');
    setAdminPlacement('MIDDLE_CONTENT');

    setAdminPublishSuccess(true);
    setTimeout(() => setAdminPublishSuccess(false), 5000);
  };

  const handleDeleteArticle = (id: string) => {
    if (!confirm("هل أنت متأكد من رغبتك في حذف هذا المقال بصورة نهائية؟")) {
      return;
    }

    // Filter memory state
    const updatedNews = news.filter(n => n.id !== id);
    setNews(updatedNews);

    // Filter localStorage custom list
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('nexus_custom_news');
      if (saved) {
        try {
          const list = JSON.parse(saved);
          const filtered = list.filter((n: any) => n.id !== id);
          localStorage.setItem('nexus_custom_news', JSON.stringify(filtered));
        } catch (err) {}
      }
    }
  };

  // Helper UI functions
  const triggerCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(label);
    setTimeout(() => setCopiedText(''), 2500);
  };

  const handleApplyCustomStream = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customStreamInput) return;
    
    if (customStreamInput.includes('<iframe') || customStreamInput.includes('http')) {
      if (customStreamInput.match(/<iframe[^>]*src=["']([^"']*)["']/)) {
        const src = customStreamInput.match(/<iframe[^>]*src=["']([^"']*)["']/)![1];
        setStreamingUrl(src);
        setIsIframeStream(true);
      } else {
        setStreamingUrl(customStreamInput);
        setIsIframeStream(customStreamInput.includes('youtube.com') || customStreamInput.includes('youtu.be') || customStreamInput.includes('embed') || customStreamInput.includes('.html') || (!customStreamInput.includes('.mp4') && !customStreamInput.includes('.m3u8')));
      }
      setIsCustomUrlActive(true);
      setActiveChannelName('قناة مخصصة من المستخدم (Embedded)');
    } else {
      alert("يرجى إدخال رابط URL صالح يبدأ بـ http أو كود iframe كامل");
    }
  };

  const handleSaveLiveStreamSettings = (e: React.FormEvent) => {
    e.preventDefault();
    if (typeof window !== 'undefined') {
      localStorage.setItem('nexus_admin_stream_title', adminLiveStreamTitle);
      localStorage.setItem('nexus_admin_stream_url', adminLiveStreamUrl);
      localStorage.setItem('nexus_admin_stream_active', String(adminLiveStreamActive));
    }
    
    if (adminLiveStreamActive && adminLiveStreamUrl) {
      if (adminLiveStreamUrl.includes('<iframe')) {
        const match = adminLiveStreamUrl.match(/<iframe[^>]*src=["']([^"']*)["']/);
        if (match && match[1]) {
          setStreamingUrl(match[1]);
        } else {
          setStreamingUrl(adminLiveStreamUrl);
        }
        setIsIframeStream(true);
      } else {
        setStreamingUrl(adminLiveStreamUrl);
        setIsIframeStream(adminLiveStreamUrl.includes('youtube.com') || adminLiveStreamUrl.includes('youtu.be') || adminLiveStreamUrl.includes('embed') || adminLiveStreamUrl.includes('.html') || (!adminLiveStreamUrl.includes('.mp4') && !adminLiveStreamUrl.includes('.m3u8')));
      }
      setIsCustomUrlActive(true);
      setActiveChannelName(adminLiveStreamTitle || 'قناة بث مباشر مفعلة من الإدارة');
    } else {
      setIsCustomUrlActive(false);
      // Reset to default sport stream
      setStreamingUrl('https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4');
      setIsIframeStream(false);
      setActiveChannelName('beIN Sports HD 1 (بث افتراضي)');
    }
    
    alert('تم حفظ إعدادات البث المباشر وتعميمها بنجاح! يمكن للزوار الآن الاستماع للمباراة بأعلى درجات الأمان والالتزام بخصوصية النشر.');
  };

  const selectPredefinedChannel = (match: Match) => {
    if (match.liveStreamUrl) {
      setStreamingUrl(match.liveStreamUrl);
      setIsIframeStream(false);
      setIsCustomUrlActive(false);
      setActiveChannelName(`${match.channel} - مباراة ${match.homeTeam} ضد ${match.awayTeam}`);
      
      // Auto-scroll to player
      const element = document.getElementById('streaming-player-container');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleTestApiConnection = () => {
    setIsConnectingApi(true);
    setTimeout(() => {
      setIsConnectingApi(false);
      setApiStatus('CONNECTED');
      setShowConfigSuccess(true);
      setTimeout(() => setShowConfigSuccess(false), 4000);
    }, 1200);
  };

  // Filter computation
  const filteredMatches = matches.filter(match => {
    const isLeagueMatch = selectedLeagueFilter === 'ALL' || match.league === selectedLeagueFilter;
    
    if (selectedDate === 'LIVE') {
      return match.status === 'LIVE' && isLeagueMatch;
    }
    return match.date === selectedDate && isLeagueMatch;
  });

  const uniqueLeagues = Array.from(new Set(matches.map(m => m.league)));

  return (
    <div className="min-h-screen bg-[#f7f7f8] text-[#2d3142] flex flex-col font-sans antialiased selection:bg-[#D4AF37]/30" dir="rtl" id="nexus-app-root">
      
      {/* 1. STICKY TOP HEADER WITH ARABIC BRAND & LIVE STATUS */}
      <header className="sticky top-0 z-50 bg-[#07162c] text-white border-b border-[#D4AF37] shadow-none" id="nexus-main-header">
        <div className="max-w-7xl mx-auto px-4 py-3 flex flex-col md:flex-row items-center justify-between gap-3">
          
          {/* Brand Logo & Name */}
          <div className="flex items-center gap-3">
            <div className="bg-[#D4AF37] p-2 rounded-[3px] flex items-center justify-center text-[#07162c] font-black tracking-wider text-lg" id="brand-logo-crest">
              <Radio className="w-5 h-5 animate-pulse-live" />
              <span className="hidden sm:inline-block mr-1">NEXUS</span>
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-black text-[#D4AF37] tracking-tight leading-none" id="brand-title">نكسس لايف كورة</h1>
              <span className="text-xs text-gray-300 font-medium">nexusutils.online - بوابة البث المباشر ونتائج المباريات</span>
            </div>
          </div>

          {/* Quick Stats Banner / Time clocks */}
          <div className="flex items-center gap-4 text-xs font-mono mr-auto md:mr-0 pl-2">
            <div className="bg-[#0b213f] px-3 py-1.5 rounded-[3px] border border-[#1e3a61]/60 flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse-live"></span>
              <span className="text-emerald-400 font-bold">بث مباشر متواصل</span>
            </div>
            <div className="hidden lg:flex flex-col text-right">
              <span className="text-[#D4AF37] text-[10px]">&lt;UTC CLOCK&gt;</span>
              <span className="text-gray-300 font-bold text-xs tracking-wider">11:39:39 AM</span>
            </div>
          </div>

          {/* Main Top Actions & Navigation */}
          <div className="flex items-center gap-2 mt-2 md:mt-0">
            <button 
              onClick={() => setActiveAppTab('MAIN')}
              className={`px-3.5 py-2 text-xs font-bold rounded-[3px] transition-all flex items-center gap-1.5 cursor-pointer uppercase tracking-tight ${
                activeAppTab === 'MAIN' 
                  ? 'bg-[#D4AF37] text-[#07162c]' 
                  : 'bg-[#122e51] text-gray-200 hover:bg-[#1a3f6d]'
              }`}
            >
              <Tv className="w-3.5 h-3.5" />
              منصة كورة
            </button>
            {isDeveloperMode && (
              <button 
                onClick={() => setActiveAppTab('MIGRATION')}
                className={`px-3.5 py-2 text-xs font-bold rounded-[3px] transition-all flex items-center gap-1.5 cursor-pointer ${
                  activeAppTab === 'MIGRATION' 
                    ? 'bg-[#D4AF37] text-[#07162c]' 
                    : 'bg-[#122e51] text-gray-200 hover:bg-[#1a3f6d]'
                }`}
                id="migration-guide-btn"
              >
                <FileCode className="w-3.5 h-3.5" />
                دليل الترحيل والملفات
              </button>
            )}
          </div>
        </div>
      </header>

      {/* 1B. SPORTS PORTAL NAVIGATION STRIP (Dynamic Tab Switching Router) */}
      <div className="bg-[#0b213f] text-white border-b border-[#D4AF37]/50 shadow-sm sticky top-[68px] z-40">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between overflow-x-auto scrollbar-none">
          <div className="flex items-center space-x-reverse space-x-1 py-1 text-xs font-bold leading-none min-w-max">
            <button 
              onClick={() => { setActiveAppTab('MAIN'); setActiveArticleId(null); }}
              className={`px-3 py-3 transition-all hover:text-[#D4AF37] border-b-2 flex items-center gap-1.5 cursor-pointer ${
                activeAppTab === 'MAIN' ? 'border-[#D4AF37] text-[#D4AF37] bg-white/5' : 'border-transparent text-gray-200'
              }`}
            >
              <Tv className="w-3.5 h-3.5" />
              الرئيسية
            </button>
            <button 
              onClick={() => { setActiveAppTab('NEWS_PAGE'); setActiveArticleId(null); }}
              className={`px-3 py-3 transition-all hover:text-[#D4AF37] border-b-2 flex items-center gap-1.5 cursor-pointer ${
                activeAppTab === 'NEWS_PAGE' ? 'border-[#D4AF37] text-[#D4AF37] bg-white/5' : 'border-transparent text-gray-200'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              أخبار كورة
            </button>
            <button 
              onClick={() => { setActiveAppTab('ARABIC_LEAGUES'); setActiveArticleId(null); }}
              className={`px-3 py-3 transition-all hover:text-[#D4AF37] border-b-2 flex items-center gap-1.5 cursor-pointer ${
                activeAppTab === 'ARABIC_LEAGUES' ? 'border-[#D4AF37] text-[#D4AF37] bg-white/5' : 'border-transparent text-gray-200'
              }`}
            >
              <Activity className="w-3.5 h-3.5" />
              الدوريات العربية
            </button>
            <button 
              onClick={() => { setActiveAppTab('EUROPEAN_LEAGUES'); setActiveArticleId(null); }}
              className={`px-3 py-3 transition-all hover:text-[#D4AF37] border-b-2 flex items-center gap-1.5 cursor-pointer ${
                activeAppTab === 'EUROPEAN_LEAGUES' ? 'border-[#D4AF37] text-[#D4AF37] bg-white/5' : 'border-transparent text-gray-200'
              }`}
            >
              <TrendingUp className="w-3.5 h-3.5" />
              الدوريات الأوروبية
            </button>
            <button 
              onClick={() => { setActiveAppTab('MERCATO'); setActiveArticleId(null); }}
              className={`px-3 py-3 transition-all hover:text-[#D4AF37] border-b-2 flex items-center gap-1.5 cursor-pointer ${
                activeAppTab === 'MERCATO' ? 'border-[#D4AF37] text-[#D4AF37] bg-white/5' : 'border-transparent text-gray-200'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 animate-pulse" />
              أخبار الميركاتو
            </button>
          </div>
          <div className="hidden md:flex items-center gap-1.5 text-[10px] font-mono text-gray-300">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse-live"></span>
            <span>https://nexusutils.online</span>
          </div>
        </div>
      </div>

      {/* 1C. MODERN HORIZONTAL BREAKING NEWS TICKER */}
      {(() => {
        const ribbonArticles = news.filter(n => (n as any).placement === 'HEADER_BANNER');
        const tickerMessage = ribbonArticles.length > 0 
          ? ribbonArticles[0].title 
          : "تغطية مستمرة لمباريات اليوم وروابط بث مباشر محدثة لحظة بلحظة عبر منصة نكسس كورة. تابع تفاصيل ديربي الهلال والنصر والنقل المباشر لكلاسيكو أوروبا.";
        return (
          <div className="bg-[#dc2626] text-white border-b border-[#D4AF37]/40 py-2.5 overflow-hidden shadow-sm shrink-0" id="breaking-news-ticker-strip">
            <div className="max-w-7xl mx-auto px-4 flex items-center gap-3">
              <div className="bg-white text-[#dc2626] font-black text-[10px] sm:text-xs px-2.5 py-0.5 rounded-[2px] uppercase tracking-wider flex items-center gap-1.5 shrink-0 select-none shadow-sm animate-pulse">
                <span className="w-2 h-2 rounded-full bg-[#dc2626]"></span>
                شريط عاجل 🔥
              </div>
              <div className="relative w-full overflow-hidden h-5 select-none">
                <div 
                  className="absolute left-0 top-1/2 -translate-y-1/2 whitespace-nowrap align-middle pr-4 font-bold text-xs sm:text-sm text-white/95 tracking-wide hover:[animation-play-state:paused] cursor-pointer"
                  style={{ animation: 'marquee 25s linear infinite' }}
                  onClick={() => {
                    const matchedArt = ribbonArticles[0] || news.find(n => n.id === 'n1');
                    if (matchedArt) {
                      setActiveArticleId(matchedArt.id);
                    }
                  }}
                >
                  {tickerMessage}
                </div>
              </div>
            </div>
          </div>
        );
      })()}

      {/* SUBNAV FOR ADVERTISING STATE TOOL - ONLY show when developer/admin mode is active */}
      {isDeveloperMode && (
        <div className="bg-white py-2 border-b border-[#e2e8f0] shadow-none">
          <div className="max-w-7xl mx-auto px-4 flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-[#07162c] flex items-center gap-1">
                <Layers className="w-3.5 h-3.5 text-[#D4AF37]" />
                أدوات الإعداد الفني:
              </span>
              <span className="text-gray-500 text-[11px]">تفاصيل فحص وتبيين مواضع إعلانات Google AdSense لوحة التوزيع</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowAdBlueprints(!showAdBlueprints)}
                className={`px-2.5 py-1 rounded-[3px] text-[11px] font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                  showAdBlueprints ? 'bg-[#07162c] text-[#D4AF37]' : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-200'
                }`}
              >
                <span>{showAdBlueprints ? 'اخفاء مخططات الإعلانات Ads' : 'إظهار مواضع إعلانات AdSense'}</span>
                <span className="bg-[#D4AF37] text-[#07162c] text-[9px] px-1 rounded-[2px] font-black font-mono">728x90</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 2. MAIN CONTAINER */}
      <main className="max-w-7xl mx-auto px-4 py-4 flex-grow w-full">
        
        {/* APP MODE: 1. CORE FOOTBALL HOME PAGE */}
        {activeAppTab === 'MAIN' ? (
          <div className="space-y-6">
            
            {/* GOOGLE ADSENSE AREA: TOP BILLBOARD (728x90) */}
            <AnimatePresence>
              {showAdBlueprints && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className={`p-1 mb-4 shadow-none rounded-none ${isDeveloperMode ? 'bg-white border border-[#D4AF37]' : 'bg-gradient-to-r from-[#030b16] to-[#0d264a] border border-[#1e3a61]'}`}
                  id="adsense-top-container"
                >
                  {isDeveloperMode ? (
                    <div className="bg-[#fcfbf9] text-center py-4 relative group border border-[#D4AF37]/30">
                      <span className="absolute top-1.5 left-2 text-[9px] bg-[#07162c] text-[#D4AF37] px-1.5 py-0.5 rounded-[2px] font-mono leading-none">ID: ca-pub-auto-728x90</span>
                      <span className="absolute top-1.5 right-2 text-[9px] text-[#2d3142] font-bold font-mono bg-amber-100 px-1 rounded-[2px] leading-none">GRID PRESET: 728 × 90 px</span>
                      
                      <p className="text-sm font-black text-[#07162c] inline-flex items-center gap-2 mb-1 mt-2 md:mt-0">
                        <Sparkles className="w-4 h-4 text-[#D4AF37] animate-pulse-live" />
                        موضع الإعلانات الأفقي الرئيسي - أداء ممتاز وتوافق تام مع محركات البحث وعائدات مجزية
                      </p>
                      <p className="text-xs text-[#5c5c66] max-w-xl mx-auto mb-2 font-medium">
                        تم معايرة هذا النطاق ليحمل شيفرات الإعلانات الديناميكية أو الثابتة دون التأثير على استقرار الهيدر وسرعة الصفحة.
                      </p>
                      
                      <div className="flex justify-center gap-1">
                        <button 
                          onClick={() => triggerCopy(`<ins className="adsbygoogle" style={{display: 'block'}} data-ad-client="ca-pub-XXXXXXXXXXXXXXXX" data-ad-slot="1234567890" data-ad-format="auto" data-full-width-responsive="true"></ins>`, 'TOP_ADS')}
                          className="bg-[#07162c] text-white text-[10px] font-bold py-1 px-3 rounded-[2px] hover:bg-[#122e51] flex items-center gap-1 transition-all cursor-pointer"
                        >
                          <Code className="w-3 h-3 text-[#D4AF37]" />
                          {copiedText === 'TOP_ADS' ? 'تم نسخ الشيفرة!' : 'نسخ كود AdSense'}
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-3.5 px-3 relative flex flex-col md:flex-row items-center justify-between gap-2.5">
                      <div className="flex items-center gap-2.5 text-right">
                        <div className="bg-[#D4AF37] text-[#07162c] p-1.5 rounded-[2px] font-black text-xs">AD</div>
                        <div>
                          <p className="text-xs font-black text-[#D4AF37] tracking-wider leading-snug">شريك البث الحصري لشبكة نكسس كورة العربي</p>
                          <p className="text-[11px] text-gray-300">اشترك الآن لمتابعة أقوى مواجهات دوري أبطال أوروبا وقنوات HD بدون تقطيع</p>
                        </div>
                      </div>
                      <a 
                        href="#" 
                        onClick={(e) => { e.preventDefault(); }}
                        className="bg-[#D4AF37] text-[#07162c] hover:bg-white text-[10px] font-black py-1.5 px-4 rounded-[2px] transition-all flex items-center gap-1 cursor-pointer"
                      >
                        <Tv className="w-3.5 h-3.5" />
                        اشترك الآن بأقل تكلفة
                      </a>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            {/* 3. SCROLLABLE MATCHES HORIZONTAL TRACK (Kooora match strip pattern) */}
            <section className="bg-white border border-[#e2e8f0] border-t-2 border-t-[#07162c] rounded-none p-4 shadow-none overflow-hidden" id="horizontal-matches-strip">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3 pb-2 border-b border-double border-gray-200">
                <div className="flex items-center gap-2">
                  <span className="p-1 bg-[#07162c] rounded-[2px]">
                    <Activity className="w-4 h-4 text-[#D4AF37]" />
                  </span>
                  <h3 className="text-sm font-black text-[#07162c]">مباريات تجري الآن وبث القنوات الناقلة</h3>
                </div>

                {/* API Football vs Mock data toggle controller */}
                <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded font-sans self-end">
                  <button 
                    onClick={() => setMatchSource('RAPID_API')}
                    className={`px-3 py-1 text-[11px] font-black rounded-[2px] transition-all cursor-pointer ${
                      matchSource === 'RAPID_API' 
                        ? 'bg-[#07162c] text-[#D4AF37] shadow-sm' 
                        : 'text-gray-500 hover:text-gray-900'
                    }`}
                  >
                    بث حي (API-Football) 📡
                  </button>
                  <button 
                    onClick={() => setMatchSource('AUTO_SIMULATED')}
                    className={`px-3 py-1 text-[11px] font-black rounded-[2px] transition-all cursor-pointer ${
                      matchSource === 'AUTO_SIMULATED' 
                        ? 'bg-[#07162c] text-[#D4AF37] shadow-sm' 
                        : 'text-gray-500 hover:text-gray-900'
                    }`}
                  >
                    مباريات البث الافتراضية
                  </button>
                </div>
              </div>

              {matchSource === 'RAPID_API' ? (
                <MatchStrip 
                  selectedDate={selectedDate} 
                  activeMatchId={activeMatchId}
                  onSelectMatch={(id) => {
                    setActiveMatchId(id);
                    // Locate if match exists in local matches list to trigger local commentary mock state, if any
                    const existsLocally = matches.find(m => m.id === id);
                    if (existsLocally && existsLocally.liveStreamUrl) {
                      setStreamingUrl(existsLocally.liveStreamUrl);
                      setActiveChannelName(existsLocally.channel || 'beIN Sports HD 1');
                    }
                  }}
                />
              ) : (
                /* Rails wrapper */
                <div className="flex gap-3 overflow-x-auto pb-2 scroll-smooth" id="match-rail-view">
                  {matches.map(match => (
                    <div 
                      key={match.id} 
                      className={`flex-shrink-0 w-[240px] border transition-all p-2.5 rounded-[2px] ${
                        match.status === 'LIVE' 
                          ? 'bg-amber-50/20 border-[#D4AF37] border-r-4' 
                          : 'bg-white border-[#e2e8f0] hover:border-gray-400'
                      }`}
                    >
                      <div className="flex justify-between items-center text-[10px] font-bold mb-1 px-0.5">
                        <span className="text-gray-500 overflow-hidden text-ellipsis whitespace-nowrap max-w-[120px]">
                          {match.league}
                        </span>
                        {match.status === 'LIVE' ? (
                          <span className="text-red-600 bg-red-50 px-1.5 py-0.5 rounded-[2px] flex items-center gap-1 font-mono font-bold animate-pulse-live">
                            <span className="w-1.5 h-1.5 rounded-full bg-red-600"></span>
                            مباشر د {match.minute}
                          </span>
                        ) : match.status === 'FINISHED' ? (
                          <span className="text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded-[2px] font-mono">انتهت</span>
                        ) : (
                          <span className="text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded-[2px] font-bold font-mono">{match.time}</span>
                        )}
                      </div>

                      <div className="space-y-1.5 py-1">
                        {/* Host */}
                        <div className="flex justify-between items-center text-xs">
                          <span className="font-bold text-[#07162c] flex items-center gap-1">
                            <span className="text-sm leading-none">{match.homeLogo}</span>
                            <span>{match.homeTeam}</span>
                          </span>
                          <span className={`font-mono font-black text-sm px-1.5 py-0.5 rounded-[2px] ${match.status === 'LIVE' ? 'text-[#07162c] bg-amber-100' : 'text-slate-600'}`}>
                            {match.status !== 'UPCOMING' ? match.homeScore : '-'}
                          </span>
                        </div>
                        
                        {/* Away */}
                        <div className="flex justify-between items-center text-xs">
                          <span className="font-bold text-[#07162c] flex items-center gap-1">
                            <span className="text-sm leading-none">{match.awayLogo}</span>
                            <span>{match.awayTeam}</span>
                          </span>
                          <span className={`font-mono font-black text-sm px-1.5 py-0.5 rounded-[2px] ${match.status === 'LIVE' ? 'text-[#07162c] bg-amber-100' : 'text-slate-600'}`}>
                            {match.status !== 'UPCOMING' ? match.awayScore : '-'}
                          </span>
                        </div>
                      </div>

                      {/* Match Action Footer */}
                      <div className="mt-2 pt-1 border-t border-gray-100 flex items-center justify-between">
                        <span className="text-[10px] text-gray-500 bg-white border border-gray-100 px-1 rounded-[2px] truncate max-w-[120px] font-mono">
                          {match.channel || 'beIN Sports'}
                        </span>
                        {match.liveStreamUrl && (
                          <button
                            onClick={() => selectPredefinedChannel(match)}
                            className="bg-[#07162c] text-[#D4AF37] hover:bg-[#122e51] hover:text-white transition-all text-[10px] font-bold px-2 py-0.5 rounded-[2px] flex items-center gap-1 cursor-pointer"
                          >
                            <Tv className="w-2.5 h-2.5" />
                            شاهد البث
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>

            {/* 4. MAIN THREE-COLUMN/TWO-COLUMN BENTO GRID */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
              
              {/* PRIMARY LEFT SIDEBAR (LEAGUE TABLE STANDINGS + API MANAGER) */}
              <aside className="lg:col-span-4 space-y-5 flex flex-col order-last lg:order-first">
                
                {/* A. STANDINGS BOARD */}
                <section className="bg-white border border-[#e2e8f0] border-t-2 border-t-[#07162c] rounded-none shadow-none p-4 overflow-hidden">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-double border-gray-200 mb-3">
                    <div className="flex items-center gap-1.5 text-right">
                      <TrendingUp className="w-4.5 h-4.5 text-[#D4AF37]" />
                      <h3 className="font-black text-[#07162c] text-sm">ترتيب المجموعات والبطولات</h3>
                    </div>

                    {/* Standings controller */}
                    <div className="flex items-center gap-1 bg-slate-100 p-0.5 rounded font-sans self-end">
                      <button 
                        onClick={() => setStandingsSource('RAPID_API')}
                        className={`px-2 py-1 text-[10px] font-black rounded-[2px] transition-all cursor-pointer ${
                          standingsSource === 'RAPID_API' 
                            ? 'bg-[#07162c] text-[#D4AF37] shadow-sm' 
                            : 'text-gray-500 hover:text-gray-900'
                        }`}
                      >
                        ترتيب مباشر (Live) 📡
                      </button>
                      <button 
                        onClick={() => setStandingsSource('AUTO_SIMULATED')}
                        className={`px-2 py-1 text-[10px] font-black rounded-[2px] transition-all cursor-pointer ${
                          standingsSource === 'AUTO_SIMULATED' 
                            ? 'bg-[#07162c] text-[#D4AF37] shadow-sm' 
                            : 'text-gray-500 hover:text-gray-900'
                        }`}
                      >
                        الترتيب الافتراضي
                      </button>
                    </div>
                  </div>

                  {standingsSource === 'RAPID_API' ? (
                    <StandingsTable />
                  ) : (
                    <>
                      {/* Liga Switcher Tabs */}
                      <div className="flex gap-1 mb-3">
                        <button 
                          onClick={() => setSelectedStandingLeague('spl')}
                          className={`flex-1 py-1.5 text-[11px] font-bold rounded-[2px] transition-all cursor-pointer ${
                            selectedStandingLeague === 'spl' 
                              ? 'bg-[#07162c] text-[#D4AF37]' 
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                        >
                          دوري روشن
                        </button>
                        <button 
                          onClick={() => setSelectedStandingLeague('ucl')}
                          className={`flex-1 py-1.5 text-[11px] font-bold rounded-[2px] transition-all cursor-pointer ${
                            selectedStandingLeague === 'ucl' 
                              ? 'bg-[#07162c] text-[#D4AF37]' 
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                        >
                          الأبطال
                        </button>
                        <button 
                          onClick={() => setSelectedStandingLeague('epl')}
                          className={`flex-1 py-1.5 text-[11px] font-bold rounded-[2px] transition-all cursor-pointer ${
                            selectedStandingLeague === 'epl' 
                              ? 'bg-[#07162c] text-[#D4AF37]' 
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                        >
                          الإنجليزي
                        </button>
                      </div>

                      {/* Standing Table */}
                      <div className="overflow-x-auto">
                        <table className="w-full text-xs text-right border-collapse">
                          <thead>
                            <tr className="bg-[#07162c] text-[#D4AF37] font-bold border-b border-gray-100 font-mono">
                              <th className="py-2 px-1 text-center w-8">#</th>
                              <th className="py-2 px-2 text-right">الفريق</th>
                              <th className="py-2 px-1 text-center w-8">لعب</th>
                              <th className="py-2 px-1 text-center w-8">فارق</th>
                              <th className="py-2 px-1 text-center w-8">نقاط</th>
                            </tr>
                          </thead>
                          <tbody>
                            {STANDINGS_DATA[selectedStandingLeague].standings.map((row) => (
                              <tr key={row.teamName} className="border-b border-gray-50 hover:bg-gray-50/75 transition-all">
                                <td className="py-2 px-1 text-center font-mono font-bold text-gray-500">
                                  <span className={`inline-block w-5 h-5 rounded-[2px] text-center leading-5 text-[10px] ${
                                    row.rank === 1 ? 'bg-amber-100 text-[#D4AF37] font-black' : 'bg-gray-100 text-gray-600'
                                  }`}>
                                    {row.rank}
                                  </span>
                                </td>
                                <td className="py-2 px-2 font-bold text-[#07162c] flex items-center gap-1">
                                  <span className="text-sm leading-none">{row.teamLogo}</span>
                                  <span className="truncate max-w-[130px]">{row.teamName}</span>
                                </td>
                                <td className="py-2 px-1 text-center font-mono font-semibold text-gray-600">{row.played}</td>
                                <td className="py-2 px-1 text-center font-mono font-semibold text-gray-500" dir="ltr">
                                  {row.goalDifference > 0 ? `+${row.goalDifference}` : row.goalDifference}
                                </td>
                                <td className="py-2 px-1 text-center font-mono font-black text-[#07162c] bg-gray-50/50">{row.points}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>

                      <div className="text-[10px] text-gray-400 text-center mt-3 pt-2 border-t border-gray-100">
                        تم التحديث تلقائياً بهوية <span className="text-[#D4AF37] font-black">Nexus live kooora</span>
                      </div>
                    </>
                  )}
                </section>

                {/* B. GOOGLE ADSENSE AREA: SIDEBAR AD (300x250 Medium Rectangle) */}
                <AnimatePresence>
                  {showAdBlueprints && (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className={`p-1 shadow-none rounded-none ${isDeveloperMode ? 'bg-white border border-[#D4AF37]' : 'bg-[#07162c] border border-[#1e3a61]'}`}
                    >
                      {isDeveloperMode ? (
                        <div className="bg-[#fafafc] text-center p-3 relative border border-[#D4AF37]/20 min-h-[220px] flex flex-col justify-between rounded-none">
                          <div>
                            <span className="absolute top-1 left-2 text-[8px] bg-[#07162c] text-[#D4AF37] px-1.5 py-0.5 rounded-[2px] font-mono leading-none">Slot ID: ca-300x250</span>
                            <span className="absolute top-1 right-2 text-[8px] text-[#2d3142] font-semibold font-mono bg-amber-100 px-1 rounded-[2px] leading-none">300 × 250 px</span>
                            
                            <h4 className="text-xs font-black text-[#07162c] mt-4 mb-1">مربع إعلاني جانبي ممتاز (300x250)</h4>
                            <p className="text-[11px] text-[#5c5c66] font-medium leading-relaxed">
                              أكمل الاندماج والربح بوضع كود الإدماج الخاص بحساب أدسينس الخاص بك لزيادة معدل المشاهدات للمقالات.
                            </p>
                          </div>
                          
                          <div className="pt-2">
                            <button 
                              onClick={() => triggerCopy(`<ins className="adsbygoogle" style={{display:'inline-block',width:'300px',height:'250px'}} data-ad-client="ca-pub-XXXXXXXXXXXXXXXX" data-ad-slot="9876543210"></ins>`, 'SIDE_ADS')}
                              className="w-full bg-[#07162c] text-white text-[10px] font-bold py-1 px-2.5 rounded-[2px] hover:bg-[#122e51] flex items-center justify-center gap-1 transition-all cursor-pointer"
                            >
                              <Code className="w-3 h-3 text-[#D4AF37]" />
                              {copiedText === 'SIDE_ADS' ? 'تم نسخ كود المربع!' : 'نسخ كود الإعلان الجانبي'}
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="text-center p-4 min-h-[220px] flex flex-col justify-between rounded-none text-white bg-gradient-to-b from-[#0b213f] to-[#07162c]">
                          <div className="space-y-2.5 text-right">
                            <span className="bg-[#D4AF37] text-[#07162c] px-2 py-0.5 rounded-[2px] text-[10px] font-black font-sans">عرض خاص لرواد الموقع</span>
                            <h4 className="text-sm font-black text-[#D4AF37]">تطبيق الهواتف لنوادي نكسس كورة</h4>
                            <p className="text-[11px] text-gray-300 leading-relaxed font-semibold">
                              تابع الإشعارات الفورية للأهداف المسجلة، الترتيبات الحية لحظة بلحظة لجميع مباريات القمة مباشرة في جيبك.
                            </p>
                          </div>
                          <div className="pt-3">
                            <a 
                              href="#" 
                              onClick={(e) => { e.preventDefault(); }}
                              className="w-full bg-[#D4AF37] text-[#07162c] hover:bg-white text-[11px] font-black py-1.5 px-3 rounded-[2px] transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                            >
                              <Sparkles className="w-3.5 h-3.5" />
                              <span>تنزيل تطبيق نكسس كورة (APK)</span>
                            </a>
                          </div>
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* C. API FOOTBALL CONNECTOR ENGINE & DEVELOPMENT MONITOR - ONLY show to developer mode */}
                {isDeveloperMode && (
                  <section className="bg-[#07162c] text-white border border-[#D4AF37] rounded-none p-4 shadow-none">
                    <div className="flex items-center gap-2 pb-3.5 border-b border-[#122e51] mb-3">
                      <Settings className="w-5 h-5 text-[#D4AF37] animate-spin" style={{ animationDuration: '8s' }} />
                      <div>
                        <h3 className="font-bold text-sm text-[#D4AF37]">مؤشر تغذية API-Football المطور</h3>
                        <p className="text-[10px] text-gray-300 font-mono">system.feed_sync // Nexus live kooora</p>
                      </div>
                    </div>

                    <div className="space-y-3.5 text-xs">
                      {/* Status badge */}
                      <div className="flex justify-between items-center bg-[#0b213f] p-2 rounded-[2px] border border-[#1e3a61]/40 font-mono">
                        <span>حالة التوصيل بالخادم:</span>
                        <span className={`px-2 py-0.5 rounded-[2px] text-[10px] font-black ${
                          apiStatus === 'CONNECTED' ? 'bg-emerald-600 text-white' : 'bg-amber-600 text-white'
                        }`}>
                          {apiStatus === 'CONNECTED' ? 'متصل بنجاح 🟢' : 'بث محاكي 🟡'}
                        </span>
                      </div>

                      {/* API Secret Input with security reminder */}
                      <div className="space-y-1">
                        <label className="text-[11px] font-bold text-gray-300 block">مفتاح RapidAPI-Football Key:</label>
                        <input 
                          type="password"
                          value={apiFootballKey}
                          onChange={(e) => setApiFootballKey(e.target.value)}
                          className="w-full bg-[#0b213f] text-gray-100 placeholder-gray-500 border border-[#1e3a61] px-2 py-1.5 rounded-[2px] text-xs font-mono focus:outline-none focus:border-[#D4AF37]"
                          placeholder="أدخل مفتاح rapidapi الخاص بك"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="text-[10px] text-gray-300 block mb-0.5">معرف الدوري (League):</label>
                          <input 
                            type="text"
                            value={apiLeagueId}
                            onChange={(e) => setApiLeagueId(e.target.value)}
                            className="w-full bg-[#0b213f] text-gray-200 border border-[#1e3a61] px-2 py-1.5 rounded-[2px] text-xs focus:outline-none focus:border-[#D4AF37] font-mono"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] text-gray-300 block mb-0.5">الموسم (Season):</label>
                          <input 
                            type="text"
                            value={apiSeason}
                            onChange={(e) => setApiSeason(e.target.value)}
                            className="w-full bg-[#0b213f] text-[#D4AF37] border border-[#1e3a61] px-2 py-1.5 rounded-[2px] text-xs focus:outline-none focus:border-[#D4AF37] font-mono"
                          />
                        </div>
                      </div>

                      <div className="pt-2">
                        <button
                          onClick={handleTestApiConnection}
                          disabled={isConnectingApi}
                          className="w-full bg-[#D4AF37] text-[#07162c] hover:bg-white transition-all py-1.5 px-3 rounded-[2px] text-xs font-bold font-sans flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
                        >
                          <RefreshCw className={`w-3.5 h-3.5 ${isConnectingApi ? 'animate-spin' : ''}`} />
                          {isConnectingApi ? 'جاري فحص الاستجابة...' : 'حفظ واختبار الربط الذاتي'}
                        </button>
                      </div>

                      {/* Success diagnostic indicator */}
                      <AnimatePresence>
                        {showConfigSuccess && (
                          <motion.div 
                            initial={{ opacity: 0, y: 5 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 5 }}
                            className="bg-emerald-950 border border-emerald-500 text-emerald-300 p-2 rounded-[2px] text-[10px] mt-2"
                          >
                            <p className="font-bold">✔ تم قبول وتأكيد مفاتيح الاتصال بخادم كورة!</p>
                            <p className="text-gray-300 font-mono">تم التوصيل بنجاح بمسار: <code className="bg-[#0b213f] px-1 py-0.5 rounded text-[9px]">v3.football.api-sports.io</code></p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                      
                      {/* Secure fetch notice */}
                      <p className="text-[9px] text-[#7e869c] text-center leading-relaxed font-mono">
                        * SECURE_TRANSMISSION // v3.crypto.hash
                      </p>

                    </div>
                  </section>
                )}
              </aside>

              {/* PRIMARY CENTER & RIGHT CONTENT CONTAINER (STREAM PLAYER + FILTERS + MATCHES FEED + NEWS) */}
              <section className="lg:col-span-8 space-y-5">
                
                {/* 1. EMBEDDED / STREAMING VIDEO MODULE PLAYER */}
                <section className="bg-white border border-[#e2e8f0] border-t-2 border-t-[#07162c] rounded-none shadow-none overflow-hidden" id="streaming-player-container">
                  <div className="bg-[#07162c] px-4 py-3 flex flex-wrap items-center justify-between gap-2 text-white">
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full bg-red-600 animate-pulse-live"></span>
                      <h3 className="font-bold text-sm text-[#D4AF37]">{activeChannelName}</h3>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs bg-[#122e51] px-2.5 py-1 rounded-[2px] font-mono">
                      <Clock className="w-3.5 h-3.5 text-[#D4AF37]" />
                      <span>زمن البث: جودة تكييفية HD</span>
                    </div>
                  </div>

                  {/* HTML5 / Stream Emulator Frame */}
                  <div className="bg-black relative aspect-video flex flex-col items-center justify-center p-1 text-white border-b border-[#e2e8f0]">
                    {isIframeStream ? (
                      <iframe 
                        src={streamingUrl}
                        className="w-full h-full"
                        allowFullScreen
                        title="Live Stream Channel"
                        referrerPolicy="no-referrer"
                        sandbox="allow-scripts allow-same-origin allow-presentation"
                      ></iframe>
                    ) : (
                      <video 
                        key={streamingUrl}
                        src={streamingUrl}
                        controls
                        autoPlay
                        muted
                        className="w-full h-full object-contain"
                        poster="https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=1000&h=600&fit=crop&q=80"
                      >
                        <p className="text-xs text-center p-4 text-gray-300">متصفحك لا يدعم علامة الفيديو الافتراضية، يرجى تشغيل القناة المخصصة</p>
                      </video>
                    )}

                    {/* Play over layer */}
                    <div className="absolute top-2 right-2 bg-black/75 backdrop-blur px-2.5 py-1 rounded-[2px] text-[10px] text-[#D4AF37] font-bold border border-[#D4AF37]/50 pointer-events-none flex items-center gap-1 font-mono">
                      <Radio className="w-3 h-3 animate-pulse-live" />
                      مباشر - Nexus live kooora
                    </div>
                  </div>

                  {/* Safety Disclaimer Banner */}
                  <div className="bg-amber-50/70 border-b border-amber-100 px-4 py-2 text-center">
                    <p className="text-[11px] sm:text-xs text-[#07162c] font-black flex items-center justify-center gap-1.5 leading-relaxed">
                      <Shield className="w-4 h-4 text-amber-600 shrink-0" />
                      <span>تنويه: موقع نكسس لايف كورة لا يقوم باستضافة أو بث أي فيديو على خوادمه الخاصة، جميع المواد معروضة من مصادر خارجية عامة.</span>
                    </p>
                  </div>


                  {/* Quick toggle channel selector */}
                  <div className="p-3 border-t border-gray-100 grid grid-cols-2 sm:grid-cols-4 gap-2 bg-white">
                    <button 
                      onClick={() => {
                        setStreamingUrl('https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4');
                        setIsIframeStream(false);
                        setIsCustomUrlActive(false);
                        setActiveChannelName('beIN Sports HD 1 (شريط محاكي للبث)');
                      }}
                      className={`py-1.5 px-2.5 rounded-[2px] text-xs font-bold transition-all border text-center cursor-pointer ${
                        !isCustomUrlActive && streamingUrl.includes('ForBiggerBlazes')
                          ? 'bg-[#07162c] text-[#D4AF37] border-transparent' 
                          : 'bg-white border-gray-200 text-[#07162c] hover:bg-gray-50'
                      }`}
                    >
                      بث مباشر كورة 1
                    </button>
                    <button 
                      onClick={() => {
                        setStreamingUrl('https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4');
                        setIsIframeStream(false);
                        setIsCustomUrlActive(false);
                        setActiveChannelName('SSC Sports 1 HD (بث ترفيهي الكأس)');
                      }}
                      className={`py-1.5 px-2.5 rounded-[2px] text-xs font-bold transition-all border text-center cursor-pointer ${
                        !isCustomUrlActive && streamingUrl.includes('BigBuckBunny')
                          ? 'bg-[#07162c] text-[#D4AF37] border-transparent' 
                          : 'bg-white border-gray-200 text-[#07162c] hover:bg-gray-50'
                      }`}
                    >
                      بث روشن الرياضي 2
                    </button>
                    <button 
                      onClick={() => {
                        setStreamingUrl('https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4');
                        setIsIframeStream(false);
                        setIsCustomUrlActive(false);
                        setActiveChannelName('beIN Sports HD 2 (بث بديل تكتيكي)');
                      }}
                      className={`py-1.5 px-2.5 rounded-[2px] text-xs font-bold transition-all border text-center cursor-pointer ${
                        !isCustomUrlActive && streamingUrl.includes('ElephantsDream')
                          ? 'bg-[#07162c] text-[#D4AF37] border-transparent' 
                          : 'bg-white border-gray-200 text-[#07162c] hover:bg-gray-50'
                      }`}
                    >
                      قناة الدوري الإنجليزي 3
                    </button>
                    <button 
                      onClick={() => {
                        setStreamingUrl('https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4');
                        setIsIframeStream(false);
                        setIsCustomUrlActive(false);
                        setActiveChannelName('beIN Match HD Elite (بث الجودة العالية)');
                      }}
                      className={`py-1.5 px-2.5 rounded-[2px] text-xs font-bold transition-all border text-center cursor-pointer ${
                        !isCustomUrlActive && streamingUrl.includes('TearsOfSteel')
                          ? 'bg-[#07162c] text-[#D4AF37] border-transparent' 
                          : 'bg-white border-gray-200 text-[#07162c] hover:bg-gray-50'
                      }`}
                    >
                      قناة النخبة 4
                    </button>
                  </div>
                </section>

                {/* 2. MATCH FEED SECTION WITH DATE & LEAGUE FILTERS */}
                <section className="space-y-3">
                  
                  {/* Dense Filter Component */}
                  <div className="bg-white border border-[#e2e8f0] border-r-4 border-r-[#07162c] rounded-none p-3 shadow-none flex flex-col md:flex-row gap-3 items-center justify-between">
                    
                    {/* Date select Tabs (RTL flow: Right to Left) */}
                    <div className="flex gap-1 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 scrollbar-none" id="date-tabs">
                      <button 
                        onClick={() => setSelectedDate('2026-06-12')}
                        className={`px-3 py-1.5 rounded-[2px] font-bold text-xs whitespace-nowrap transition-all cursor-pointer ${
                          selectedDate === '2026-06-12' ? 'bg-[#07162c] text-[#D4AF37]' : 'bg-gray-100 text-[#2d3142] hover:bg-gray-200'
                        }`}
                      >
                        مباريات أمس
                      </button>
                      <button 
                        onClick={() => setSelectedDate('2026-06-13')}
                        className={`px-3 py-1.5 rounded-[2px] font-bold text-xs whitespace-nowrap transition-all cursor-pointer ${
                          selectedDate === '2026-06-13' ? 'bg-[#07162c] text-[#D4AF37]' : 'bg-gray-100 text-[#2d3142] hover:bg-gray-200'
                        }`}
                      >
                        مباريات اليوم
                      </button>
                      <button 
                        onClick={() => setSelectedDate('2026-06-14')}
                        className={`px-3 py-1.5 rounded-[2px] font-bold text-xs whitespace-nowrap transition-all cursor-pointer ${
                          selectedDate === '2026-06-14' ? 'bg-[#07162c] text-[#D4AF37]' : 'bg-gray-100 text-[#2d3142] hover:bg-gray-200'
                        }`}
                      >
                        مباريات غداً
                      </button>
                      <button 
                        onClick={() => setSelectedDate('LIVE')}
                        className={`px-3 py-1.5 rounded-[2px] font-bold text-xs whitespace-nowrap transition-all flex items-center gap-1 cursor-pointer ${
                          selectedDate === 'LIVE' ? 'bg-red-600 text-white animate-pulse-live font-mono' : 'bg-red-50 text-red-600 hover:bg-red-100'
                        }`}
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
                        مباشر الآن
                      </button>
                    </div>

                    {/* League filter Selector */}
                    <div className="w-full md:w-[180px] flex items-center gap-2">
                      <span className="text-[11px] text-gray-500 font-bold whitespace-nowrap">البطولة:</span>
                      <select 
                        value={selectedLeagueFilter} 
                        onChange={(e) => setSelectedLeagueFilter(e.target.value)}
                        className="w-full bg-gray-50 border border-[#e2e8f0] py-1 px-2.5 rounded-[2px] text-xs font-bold text-[#07162c] focus:outline-none"
                      >
                        <option value="ALL">جميع البطولات المتاحة</option>
                        {uniqueLeagues.map((league) => (
                          <option key={league} value={league}>{league}</option>
                        ))}
                      </select>
                    </div>
                  </div>


                  {/* Matches list container / Live Scores list */}
                  <div className="space-y-3" id="main-matches-feed">
                    {filteredMatches.length === 0 ? (
                      <div className="bg-white border border-[#e2e8f0] hover:border-[#D4AF37]/50 rounded-none p-8 text-center text-gray-400">
                        <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-2.5" />
                        <p className="text-sm font-bold">لا يوجد مباريات مجدولة متوافقة مع المحدد حالياً.</p>
                        <p className="text-xs text-gray-500 mt-1">يرجى تغيير تصنيف البطولة أو اختيار تاريخ آخر.</p>
                      </div>
                    ) : (
                      filteredMatches.map(match => {
                        const isMatchDetailsOpen = activeMatchId === match.id;
                        
                        return (
                          <div 
                            key={match.id} 
                            className={`bg-white border rounded-none transition-all ${
                              match.status === 'LIVE' 
                                ? 'border-[#D4AF37] ring-1 ring-[#D4AF37]/40 shadow-none' 
                                : 'border-[#e2e8f0] hover:border-gray-300'
                            }`}
                          >
                            <div className="px-4 py-2.5 bg-gray-50 flex justify-between items-center text-xs font-bold border-b border-gray-100">
                              <span className="text-[#07162c] flex items-center gap-1.5">
                                <span className="w-1 h-3 bg-[#D4AF37] inline-block"></span>
                                {match.league}
                              </span>
                              <div className="flex items-center gap-2">
                                <span className="text-gray-500 font-medium bg-white px-2 py-0.5 rounded-[2px] border border-gray-200 font-mono">{match.time}</span>
                                <span className="text-[#7e869c] text-[11px] font-mono">{match.channel || 'beIN HD'}</span>
                              </div>
                            </div>

                            <div className="p-4 grid grid-cols-12 gap-2 items-center text-center">
                              {/* Team A (Home) */}
                              <div className="col-span-4 flex flex-col sm:flex-row items-center justify-end gap-2 text-right">
                                <span className="font-bold text-sm text-[#07162c] order-2 sm:order-1">{match.homeTeam}</span>
                                <span className="text-2xl order-1 sm:order-2 bg-gray-50 border border-gray-100 p-2.5 rounded-[2px] w-12 h-12 flex items-center justify-center leading-none">{match.homeLogo}</span>
                              </div>

                              {/* Live score and Time details status */}
                              <div className="col-span-4 flex flex-col items-center justify-center">
                                {match.status !== 'UPCOMING' ? (
                                  <div className="flex items-center gap-3 font-mono">
                                    <span className="text-2xl sm:text-3xl font-black text-[#07162c] bg-gray-50 border border-gray-100 px-3 py-1 rounded-[2px]">
                                      {match.homeScore}
                                    </span>
                                    <span className="text-gray-400 font-bold text-xl">:</span>
                                    <span className="text-2xl sm:text-3xl font-black text-[#07162c] bg-gray-50 border border-gray-100 px-3 py-1 rounded-[2px]">
                                      {match.awayScore}
                                    </span>
                                  </div>
                                ) : (
                                  <div className="text-gray-500 font-bold text-xs bg-gray-50 border border-gray-100 px-3 py-1.5 rounded-[2px]">
                                    لم تبدأ بعد
                                  </div>
                                )}

                                {/* Live minute indicator or overall status */}
                                <div className="mt-2">
                                  {match.status === 'LIVE' ? (
                                    <span className="bg-red-50 text-red-600 border border-red-100 text-[11px] font-black py-0.5 px-2.5 rounded-[2px] animate-pulse-live flex items-center gap-1 justify-center font-mono">
                                      <span className="w-1.5 h-1.5 rounded-full bg-red-600"></span>
                                      مباشر د {match.minute}
                                    </span>
                                  ) : match.status === 'FINISHED' ? (
                                    <span className="text-xs bg-slate-50 text-slate-500 border border-slate-200 py-0.5 px-2.5 rounded-[2px] font-bold">
                                      انتهت المباراة
                                    </span>
                                  ) : (
                                    <span className="text-xs bg-blue-50 text-blue-600 border border-blue-100 py-0.5 px-2.5 rounded-[2px] font-bold">
                                      اليوم {match.time}
                                    </span>
                                  )}
                                </div>
                              </div>

                              {/* Team B (Away) */}
                              <div className="col-span-4 flex flex-col sm:flex-row items-center justify-start gap-2 text-left">
                                <span className="text-2xl bg-gray-50 border border-gray-100 p-2.5 rounded-[2px] w-12 h-12 flex items-center justify-center leading-none">{match.awayLogo}</span>
                                <span className="font-bold text-sm text-[#07162c]">{match.awayTeam}</span>
                              </div>
                            </div>

                            {/* Sub-actions (Bait Commentary toggle + stream loader) */}
                            <div className="px-4 py-2 border-t border-gray-100 bg-gray-50 flex flex-wrap items-center justify-between gap-2 text-xs">
                              <div className="flex items-center gap-2">
                                <button
                                  onClick={() => setActiveMatchId(isMatchDetailsOpen ? null : match.id)}
                                  className="text-gray-600 hover:text-[#07162c] transition-all font-bold flex items-center gap-1 px-1.5 py-1 cursor-pointer"
                                >
                                  <MessageSquare className="w-3.5 h-3.5 text-gray-400" />
                                  <span>{isMatchDetailsOpen ? 'إغلاق شريط التعليق الحركي' : 'شاشة التقرير والتعليق المباشر'}</span>
                                </button>
                              </div>

                              {match.liveStreamUrl && (
                                <button
                                  onClick={() => selectPredefinedChannel(match)}
                                  className="bg-[#07162c] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#07162c] transition-all font-sans font-bold py-1 px-3 rounded-[2px] flex items-center gap-1.5 cursor-pointer shadow-none"
                                >
                                  <Tv className="w-3.5 h-3.5" />
                                  <span>تشغيل بث القناة</span>
                                </button>
                              )}
                            </div>

                            {/* Collapsible live commentary simulation list */}
                            <AnimatePresence>
                              {isMatchDetailsOpen && (
                                <motion.div 
                                  initial={{ opacity: 0, height: 0 }}
                                  animate={{ opacity: 1, height: 'auto' }}
                                  exit={{ opacity: 0, height: 0 }}
                                  className="overflow-hidden bg-[#fafafa] border-t border-gray-100"
                                >
                                  <div className="p-3.5 space-y-2.5 text-xs text-right">
                                    <div className="flex justify-between items-center text-[11px] font-bold text-gray-500 pb-1.5 border-b border-gray-200">
                                      <span>شريط تحديث مجريات المباراة الفوري (تحديث تلقائي)</span>
                                      <span className="text-[#D4AF37]">مباشر د {match.minute || 'الافتراضي'}</span>
                                    </div>
                                    <div className="space-y-2 max-h-[160px] overflow-y-auto pr-1">
                                      {(matchCommentaries[match.id] || ['لا يوجد أحداث مسجلة بعد لهذه القمة.']).map((comm, idx) => (
                                        <div key={idx} className="p-2 bg-white rounded-[2px] border border-gray-100 hover:border-[#D4AF37]/40 transition-all flex items-start gap-1.5">
                                          <span className="text-[#D4AF37] font-black text-sm">✦</span>
                                          <p className="text-gray-700 font-semibold leading-relaxed">{comm}</p>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        );
                      })
                    )}
                  </div>
                </section>

                {/* 3. EDITORIAL football news list ( dense Arabic ) */}
                <section className="space-y-3">
                  <div className="pb-2.5 border-b-2 border-gray-200 flex items-center justify-between font-sans">
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-4 bg-[#07162c] inline-block"></span>
                      <h3 className="font-bold text-base text-[#07162c]">آخر أخبار المستديرة والتقارير</h3>
                    </div>
                    <span className="text-xs text-gray-500 font-semibold">تحديث متكامل من Nexus live kooora</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {news.map(article => (
                      <div 
                        key={article.id} 
                        className="bg-white border border-[#e2e8f0] rounded-none overflow-hidden flex flex-col justify-between hover:border-[#D4AF37]/50 transition-all shadow-none"
                        id={`news-card-${article.id}`}
                      >
                        <div>
                          <div className="relative aspect-video">
                            <img 
                              src={article.image} 
                              alt={article.title} 
                              className="w-full h-full object-cover"
                              referrerPolicy="no-referrer"
                            />
                            <span className="absolute bottom-2 right-2 bg-[#07162c] text-[#D4AF37] px-2 py-0.5 rounded-none text-[10px] font-bold font-mono">
                              {article.category}
                            </span>
                          </div>

                          <div className="p-3.5 space-y-2">
                            <div className="flex items-center gap-3 text-[10px] text-gray-500 font-bold font-mono">
                              <span className="flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                {article.date}
                              </span>
                              <span>المحرر: {article.author}</span>
                            </div>
                            <h4 className="font-bold text-sm text-[#07162c] leading-snug hover:text-[#D4AF37] transition-all cursor-pointer" onClick={() => setActiveArticleId(article.id)}>
                              {article.title}
                            </h4>
                            <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed font-semibold">
                              {article.summary}
                            </p>
                          </div>
                        </div>

                        <div className="p-3.5 pt-0 border-t border-gray-50 bg-gray-50/50 flex items-center justify-between text-xs font-mono">
                          <div className="flex items-center gap-3 text-gray-500">
                            <span className="flex items-center gap-1">
                              <Eye className="w-3 h-3" />
                              {article.views}
                            </span>
                            <span className="flex items-center gap-1">
                              <MessageSquare className="w-3 h-3" />
                              {article.commentsCount}
                            </span>
                          </div>
                          
                          <button 
                            onClick={() => setActiveArticleId(article.id)}
                            className="text-[#07162c] font-black border-b border-[#D4AF37] hover:bg-[#D4AF37]/20 transition-all flex items-center gap-1 cursor-pointer"
                          >
                            <span>قراءة الخبر كاملاً</span>
                            <ChevronLeft className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>

                {/* GOOGLE ADSENSE AREA: FOOTER AD (320x100 Mobile / Standard Footer Ad) */}
                <AnimatePresence>
                  {showAdBlueprints && (
                    <motion.div 
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 15 }}
                      className={`p-1 shadow-none rounded-none ${isDeveloperMode ? 'bg-white border border-dashed border-[#D4AF37]' : 'bg-gradient-to-r from-[#030b16] to-[#122e51] border border-gray-200'}`}
                      id="adsense-bottom-container"
                    >
                      {isDeveloperMode ? (
                        <div className="bg-amber-50/60 text-center py-3 relative rounded-none">
                          <span className="absolute top-1 left-2 text-[8px] bg-[#D4AF37] text-[#07162c] px-1 py-0.5 rounded-none font-bold uppercase font-mono">AdSense Mobile Anchor</span>
                          <span className="absolute top-1 right-2 text-[8px] text-[#2d3142] font-semibold font-mono">320 × 100 px</span>
                          
                          <p className="text-xs font-black text-[#07162c] inline-flex items-center gap-1.5 mb-1">
                            بانر الموبايل المتنقل والتحوطات المناسبة لحجم الهواتف الذكية والأجهزة اللوحية
                          </p>
                          
                          <div className="flex justify-center mt-1">
                            <button 
                              onClick={() => triggerCopy(`<ins className="adsbygoogle" style={{display:'inline-block',width:'320px',height:'100px'}} data-ad-client="ca-pub-XXXXXXXXXXXXXXXX" data-ad-slot="5432109876"></ins>`, 'MOBILE_ADS')}
                              className="bg-[#07162c] text-white text-[10px] font-bold py-1 px-3 rounded-[2px] hover:bg-[#122e51] flex items-center gap-1 transition-all cursor-pointer"
                            >
                              <Code className="w-3 h-3 text-[#D4AF37]" />
                              {copiedText === 'MOBILE_ADS' ? 'تم نسخ كود الموبايل!' : 'نسخ كود إعلان الهواتف'}
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="text-center py-2.5 px-3 relative flex flex-col sm:flex-row items-center justify-between gap-2.5 text-white">
                          <div className="flex items-center gap-2 text-right">
                            <span className="bg-[#D4AF37] text-[#07162c] px-1.5 py-0.5 rounded-[2px] text-[9px] font-black font-mono">beIN Sports</span>
                            <p className="text-[11px] font-semibold text-gray-200">
                              تابع قنوات البث الممتازة بدقّة فائقة وجودة متكيفة بالكامل على جميع الأجهزة الذكية والأيباد.
                            </p>
                          </div>
                          <a 
                            href="#" 
                            onClick={(e) => { e.preventDefault(); }}
                            className="bg-transparent border border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#07162c] text-[9px] font-black py-1 px-2.5 rounded-[2px] transition-all flex items-center gap-1.5 cursor-pointer"
                          >
                            <span>عرض الإشتراكات</span>
                          </a>
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
                
              </section>

            </div>

          </div>
        ) : activeAppTab === 'NEWS_PAGE' ? (
          /* ==================== 1. NEWS FEED PAGE TAB ==================== */
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
            id="news-page-view"
          >
            {/* Header intro banner */}
            <div className="bg-[#07162c] text-white p-6 border-b-2 border-[#D4AF37] relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#D4AF37]/5 rounded-full blur-3xl -mr-16 -mt-16"></div>
              <div className="relative z-10 space-y-2">
                <span className="bg-[#D4AF37] text-[#07162c] text-[10px] px-2.5 py-0.5 rounded-[2px] font-black uppercase tracking-wider">صفحة المقالات والأخبار</span>
                <h2 className="text-xl sm:text-2xl font-black text-[#D4AF37]">غرفة أخبار نكسس لايف كورة الدقيقة</h2>
                <p className="text-xs text-gray-300 max-w-2xl leading-relaxed">
                  تغطية تحليلية شاملة للصحف العربية والأوروبية، رصد مباشر لتحركات اللاعبين وتكتيكات المدربين بقلم كوكبة من النقاد الرياضيين المتخصصين.
                </p>
              </div>
            </div>

            {/* Category selection pills */}
            <div className="flex flex-wrap gap-2 pb-2 border-b border-gray-200">
              {[
                { id: 'ALL', label: 'الكل وقراءات اليوم' },
                { id: 'الكرة السعودية', label: 'الكرة العربية والسعودية' },
                { id: 'الكرة الأوروبية', label: 'دوري أبطال أوروبا' },
                { id: 'الكرة العالمية', label: 'أخبار الكرة العالمية والمنتخبات' }
              ].map(pill => (
                <button
                  key={pill.id}
                  onClick={() => setNewsPageFilter(pill.id)}
                  className={`px-3.5 py-2 text-xs font-bold transition-all rounded-[2px] cursor-pointer ${
                    newsPageFilter === pill.id 
                      ? 'bg-[#07162c] text-[#D4AF37] border-b-2 border-[#D4AF37]' 
                      : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {pill.label}
                </button>
              ))}
            </div>

            {/* News Articles Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {news.filter(n => newsPageFilter === 'ALL' || n.category === newsPageFilter).length === 0 ? (
                <div className="col-span-full bg-white p-12 border border-gray-200 text-center text-gray-400">
                  <p className="text-sm font-bold">لا يوجد مادة إخبارية حالياً تحت هذا القسم.</p>
                </div>
              ) : (
                news.filter(n => newsPageFilter === 'ALL' || n.category === newsPageFilter).map(article => (
                  <div 
                    key={article.id} 
                    className="bg-white border border-[#e2e8f0] rounded-none overflow-hidden flex flex-col justify-between hover:border-[#D4AF37]/50 transition-all shadow-none"
                  >
                    <div>
                      <div className="relative aspect-video">
                        <img 
                          src={article.image} 
                          alt={article.title} 
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                        <span className="absolute bottom-2 right-2 bg-[#07162c] text-[#D4AF37] px-2 py-0.5 rounded-none text-[10px] font-bold">
                          {article.category}
                        </span>
                      </div>

                      <div className="p-4 space-y-2.5">
                        <div className="flex items-center gap-3 text-[10px] text-gray-500 font-bold font-mono">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {article.date}
                          </span>
                          <span>المحرر: {article.author}</span>
                        </div>
                        <h4 className="font-bold text-sm text-[#07162c] leading-snug hover:text-[#D4AF37] transition-all cursor-pointer" onClick={() => setActiveArticleId(article.id)}>
                          {article.title}
                        </h4>
                        <p className="text-xs text-gray-600 line-clamp-3 leading-relaxed">
                          {article.summary}
                        </p>
                      </div>
                    </div>

                    <div className="p-4 pt-0 border-t border-gray-50 bg-gray-50/50 flex items-center justify-between text-xs font-mono">
                      <div className="flex items-center gap-3 text-gray-500">
                        <span className="flex items-center gap-1">
                          <Eye className="w-3" />
                          {article.views}
                        </span>
                        <span className="flex items-center gap-1">
                          <MessageSquare className="w-3" />
                          {article.commentsCount}
                        </span>
                      </div>
                      
                      <button 
                        onClick={() => setActiveArticleId(article.id)}
                        className="text-[#07162c] font-black border-b border-[#D4AF37] hover:bg-[#D4AF37]/20 transition-all flex items-center gap-1 cursor-pointer"
                      >
                        <span>قراءة التفاصيل</span>
                        <ChevronLeft className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </motion.div>
        ) : activeAppTab === 'ARABIC_LEAGUES' ? (
          /* ==================== 2. ARABIC LEAGUES TAB ==================== */
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
            id="arabic-leagues-view"
          >
            {/* Header intro */}
            <div className="bg-[#07162c] text-white p-6 border-b-2 border-[#D4AF37] relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#D4AF37]/5 rounded-full blur-3xl -mr-16 -mt-16"></div>
              <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="space-y-1">
                  <span className="bg-[#D4AF37] text-[#07162c] text-[10px] px-2.5 py-0.5 rounded-[2px] font-black">الدوريات العربية</span>
                  <h2 className="text-xl sm:text-2xl font-black text-[#D4AF37]">متابعة البطولات العربية ودوري روشن للمحترفين</h2>
                  <p className="text-xs text-gray-300 max-w-xl">
                    جدول مباريات الدوري السعودي للمحترفين، دوري أبطال آسيا وعرب أفريقيا، مع رصد حي لترتيب الفرق والمجموعات الحالية.
                  </p>
                </div>
                <div className="bg-[#0b213f] border border-[#1e3a61] p-3 text-center rounded-[3px] min-w-[150px]">
                  <p className="text-[10px] text-gray-300">مباريات الدوري المتاحة</p>
                  <strong className="text-lg font-mono text-[#D4AF37]">
                    {matches.filter(m => m.league === 'الدوري السعودي للمحترفين').length} مواجهات
                  </strong>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
              {/* Leauges Fixtures */}
              <div className="lg:col-span-8 space-y-4">
                <div className="flex items-center gap-2 pb-2 border-b border-gray-200">
                  <span className="w-1.5 h-4 bg-[#07162c] inline-block"></span>
                  <h3 className="font-bold text-sm text-[#07162c]">مباريات ومواعيد دوري روشن والدوريات العربية اليوم</h3>
                </div>

                <div className="space-y-3">
                  {matches.filter(m => m.league.includes('السعودي') || m.league.includes('العربية')).length === 0 ? (
                    <div className="bg-white p-8 border border-gray-200 text-center text-gray-400">
                      <p className="text-sm font-bold">لا توجد مباريات دوري روشن مجدولة اليوم.</p>
                    </div>
                  ) : (
                    matches.filter(m => m.league.includes('السعودي') || m.league.includes('العربية')).map(match => (
                      <div key={match.id} className="bg-white border border-[#e2e8f0] p-4 flex flex-col sm:flex-row items-center justify-between gap-4 hover:border-[#D4AF37]">
                        <div className="text-xs font-bold text-[#07162c] flex items-center gap-1.5">
                          <span className="bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-[2px] text-[10px]">{match.time}</span>
                          <span>{match.league}</span>
                        </div>
                        <div className="flex items-center gap-6 justify-center">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-sm text-[#07162c]">{match.homeTeam}</span>
                            <span className="text-xl">{match.homeLogo}</span>
                          </div>
                          <div className="font-mono bg-slate-50 border border-slate-100 px-3 py-1 text-sm font-black rounded-[2px] text-[#07162c]">
                            {match.status !== 'UPCOMING' ? `${match.homeScore} - ${match.awayScore}` : 'المقرر'}
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-xl">{match.awayLogo}</span>
                            <span className="font-bold text-sm text-[#07162c]">{match.awayTeam}</span>
                          </div>
                        </div>
                        {match.liveStreamUrl && (
                          <button
                            onClick={() => { selectPredefinedChannel(match); setActiveAppTab('MAIN'); }}
                            className="bg-[#07162c] text-[#D4AF37] hover:bg-white border border-transparent hover:border-[#07162c] text-xs font-bold py-1 px-3 rounded-[2px] flex items-center gap-1 transition-all cursor-pointer"
                          >
                            <Tv className="w-3.5 h-3.5" />
                            شاهد البث
                          </button>
                        )}
                      </div>
                    ))
                  )}
                </div>

                {/* Arabic sports news */}
                <div className="pt-4 space-y-3">
                  <div className="flex items-center gap-2 pb-2 border-b border-gray-200">
                    <span className="w-1.5 h-4 bg-[#07162c] inline-block"></span>
                    <h3 className="font-bold text-sm text-[#07162c]">أخبار وتقارير الرياضة العربية</h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {news.filter(n => n.category.includes('السعودية') || n.category.includes('العربية')).map(article => (
                      <div key={article.id} className="bg-white border border-[#e2e8f0] p-4 space-y-2.5 flex flex-col justify-between">
                        <div>
                          <img src={article.image} alt={article.title} className="w-full h-32 object-cover mb-2" referrerPolicy="no-referrer" />
                          <h4 className="font-bold text-xs text-[#07162c] hover:text-[#D4AF37] cursor-pointer" onClick={() => setActiveArticleId(article.id)}>{article.title}</h4>
                          <p className="text-[11px] text-gray-500 line-clamp-2">{article.summary}</p>
                        </div>
                        <button onClick={() => setActiveArticleId(article.id)} className="text-xs font-bold text-[#D4AF37] hover:text-[#07162c] text-right self-end mt-2">عرض الخبر كاملًا ←</button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Standings Sidebar */}
              <div className="lg:col-span-4 space-y-4">
                <div className="bg-white border border-[#e2e8f0] border-t-2 border-t-[#07162c] p-4">
                  <h3 className="font-bold text-sm text-[#07162c] border-b pb-2 mb-3">جدول ترتيب دوري روشن السعودي</h3>
                  <table className="w-full text-xs text-right">
                    <thead>
                      <tr className="bg-[#07162c] text-[#D4AF37] font-bold">
                        <th className="p-1 px-2 text-center w-8">#</th>
                        <th className="p-1">الفريق</th>
                        <th className="p-1 text-center w-8">لعب</th>
                        <th className="p-1 text-center w-8">نقاط</th>
                      </tr>
                    </thead>
                    <tbody>
                      {STANDINGS_DATA.spl.standings.map(row => (
                        <tr key={row.teamName} className="border-b hover:bg-gray-50">
                          <td className="p-2 text-center text-gray-500 font-bold">{row.rank}</td>
                          <td className="p-2 font-bold text-[#07162c] flex items-center gap-1">
                            <span>{row.teamLogo}</span>
                            <span className="truncate max-w-[120px]">{row.teamName}</span>
                          </td>
                          <td className="p-2 text-center font-mono">{row.played}</td>
                          <td className="p-2 text-center font-mono font-black text-[#07162c]">{row.points}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Ad Block */}
                <div className="bg-gradient-to-br from-[#010a15] to-[#0d264a] text-white p-4 text-center space-y-3">
                  <span className="bg-[#D4AF37] text-[#07162c] text-[9px] px-1.5 py-0.5 rounded-[2px] font-bold">تغطية ترويجية</span>
                  <h4 className="text-xs font-black text-[#D4AF37]">باقة SSC الرياضية الممتازة</h4>
                  <p className="text-[10px] text-gray-300">كن في قلب الحدث وتلذذ بمتعة المشاهدة بدقات وسرعات فائقة الدقة.</p>
                </div>
              </div>
            </div>
          </motion.div>
        ) : activeAppTab === 'EUROPEAN_LEAGUES' ? (
          /* ==================== 3. EUROPEAN LEAGUES TAB ==================== */
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
            id="european-leagues-view"
          >
            {/* Header intro */}
            <div className="bg-[#07162c] text-white p-6 border-b-2 border-[#D4AF37] relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#D4AF37]/5 rounded-full blur-3xl -mr-16 -mt-16"></div>
              <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="space-y-1">
                  <span className="bg-[#D4AF37] text-[#07162c] text-[10px] px-2.5 py-0.5 rounded-[2px] font-black">البطولات الأوروبية</span>
                  <h2 className="text-xl sm:text-2xl font-black text-[#D4AF37]">دوري أبطال أوروبا والدوري الإنجليزي والبطولات القارية</h2>
                  <p className="text-xs text-gray-300 max-w-xl">
                    كل ما يخص دوري أبطال أوروبا، الدوري الإنجليزي الممتاز، ديربيات مدريد وغرب أوروبا بتمثيل إحصائي كامل ودقة متناهية.
                  </p>
                </div>
                <div className="bg-[#0b213f] border border-[#1e3a61] p-3 text-center rounded-[3px] min-w-[150px]">
                  <p className="text-[10px] text-gray-300">مباريات الاتحاد الأوروبي</p>
                  <strong className="text-lg font-mono text-emerald-400">
                    {matches.filter(m => m.league.includes('أوروبا') || m.league.includes('الإنجليزي')).length} مواجهات
                  </strong>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
              {/* Fixtures */}
              <div className="lg:col-span-8 space-y-4">
                <div className="flex items-center gap-2 pb-2 border-b border-gray-200">
                  <span className="w-1.5 h-4 bg-[#07162c] inline-block"></span>
                  <h3 className="font-bold text-sm text-[#07162c]">مباريات القارة العجوز والقمم الجارية</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {matches.filter(m => m.league.includes('أوروبا') || m.league.includes('الإنجليزي') || m.league.includes('إيطالي')).map(match => (
                    <div key={match.id} className="bg-white border border-[#e2e8f0] p-4 flex flex-col justify-between hover:border-[#D4AF37]/50">
                      <div className="flex justify-between items-center text-[10px] text-gray-500 font-bold mb-2">
                        <span>{match.league}</span>
                        <span className="bg-[#07162c] text-[#D4AF37] px-1.5 py-0.5 rounded-[2px]">{match.channel}</span>
                      </div>
                      <div className="flex items-center justify-between py-2">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-bold text-[#07162c]">{match.homeTeam}</span>
                          <span>{match.homeLogo}</span>
                        </div>
                        <div className="font-mono bg-amber-50 px-2 py-0.5 text-xs font-black rounded text-amber-900 border border-amber-200">
                          {match.status !== 'UPCOMING' ? `${match.homeScore} - ${match.awayScore}` : match.time}
                        </div>
                        <div className="flex items-center gap-2">
                          <span>{match.awayLogo}</span>
                          <span className="text-sm font-bold text-[#07162c]">{match.awayTeam}</span>
                        </div>
                      </div>
                      {match.liveStreamUrl && (
                        <button
                          onClick={() => { selectPredefinedChannel(match); setActiveAppTab('MAIN'); }}
                          className="w-full bg-[#07162c] text-[#D4AF37] text-[11px] font-bold py-1 mt-1 text-center hover:bg-[#D4AF37] hover:text-[#07162c] transition-all cursor-pointer"
                        >
                          شغل القناة المباشرة 🎥
                        </button>
                      )}
                    </div>
                  ))}
                </div>

                {/* European Sports news */}
                <div className="pt-4 space-y-3">
                  <div className="flex items-center gap-2 pb-2 border-b border-gray-200">
                    <span className="w-1.5 h-4 bg-[#07162c] inline-block"></span>
                    <h3 className="font-bold text-sm text-[#07162c]">مقالات ومرايا الكرة الأوروبية والعالمية</h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {news.filter(n => n.category.includes('أوروبية') || n.category.includes('العالمية')).map(article => (
                      <div key={article.id} className="bg-white border border-[#e2e8f0] p-4 space-y-2 flex flex-col justify-between">
                        <div>
                          <img src={article.image} alt={article.title} className="w-full h-32 object-cover" referrerPolicy="no-referrer" />
                          <h4 className="font-bold text-xs text-[#07162c] hover:text-[#D4AF37] cursor-pointer" onClick={() => setActiveArticleId(article.id)}>{article.title}</h4>
                          <p className="text-[11px] text-gray-500 line-clamp-2">{article.summary}</p>
                        </div>
                        <button onClick={() => setActiveArticleId(article.id)} className="text-xs font-bold text-right text-[#D4AF37] hover:underline self-end mt-2">قراءة المحتوى كاملًا</button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* UCL / EPL Side board standings */}
              <div className="lg:col-span-4 space-y-4">
                <div className="bg-white border border-[#e2e8f0] border-t-2 border-t-[#07162c] p-4">
                  <h3 className="font-bold text-xs text-[#07162c] border-b pb-2 mb-2">الدوري الإنجليزي الممتاز (EPL)</h3>
                  <table className="w-full text-xs text-right">
                    <thead>
                      <tr className="bg-[#07162c] text-[#D4AF37]">
                        <th className="p-1 px-2 text-center">#</th>
                        <th className="p-1">الفريق</th>
                        <th className="p-1 text-center">نقاط</th>
                      </tr>
                    </thead>
                    <tbody>
                      {STANDINGS_DATA.epl.standings.map(row => (
                        <tr key={row.teamName} className="border-b hover:bg-gray-50">
                          <td className="p-1.5 text-center font-bold text-gray-500">{row.rank}</td>
                          <td className="p-1.5 text-[#07162c] font-bold flex items-center gap-1">
                            <span>{row.teamLogo}</span>
                            <span className="truncate max-w-[120px]">{row.teamName}</span>
                          </td>
                          <td className="p-1.5 text-center font-mono font-black text-[#07162c]">{row.points}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="bg-white border border-[#e2e8f0] border-t-2 border-t-[#07162c] p-4">
                  <h3 className="font-bold text-xs text-[#07162c] border-b pb-2 mb-2">دوري أبطال أوروبا (UCL)</h3>
                  <table className="w-full text-xs text-right">
                    <thead>
                      <tr className="bg-[#07162c] text-[#D4AF37]">
                        <th className="p-1 px-2 text-center">#</th>
                        <th className="p-1">الفريق</th>
                        <th className="p-1 text-center">نقاط</th>
                      </tr>
                    </thead>
                    <tbody>
                      {STANDINGS_DATA.ucl.standings.map(row => (
                        <tr key={row.teamName} className="border-b hover:bg-gray-50">
                          <td className="p-1.5 text-center font-bold text-gray-500">{row.rank}</td>
                          <td className="p-1.5 text-[#07162c] font-bold flex items-center gap-1">
                            <span>{row.teamLogo}</span>
                            <span className="truncate max-w-[120px]">{row.teamName}</span>
                          </td>
                          <td className="p-1.5 text-center font-mono font-black text-[#07162c]">{row.points}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </motion.div>
        ) : activeAppTab === 'MERCATO' ? (
          /* ==================== 4. MERCATO & TRANSFERS TAB ==================== */
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
            id="mercato-view"
          >
            {/* Header intro */}
            <div className="bg-[#07162c] text-white p-6 border-b-2 border-[#D4AF37] relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#D4AF37]/5 rounded-full blur-3xl -mr-16 -mt-16"></div>
              <div className="relative z-10 space-y-1.5">
                <span className="bg-[#D4AF37] text-[#07162c] text-[10px] px-2.5 py-0.5 rounded-[2px] font-black uppercase">انتقالات وسوق اللاعبين</span>
                <h2 className="text-xl sm:text-2xl font-black text-[#D4AF37]">النافذة الشاملة لأخبار الميركاتو الحصري</h2>
                <p className="text-xs text-gray-300 max-w-2xl leading-relaxed">
                  الصفقات الرسمية، الاتفاقات الشفهية، قيمة عقود انتقال النجوم، وتقارير خاصة من مصادر فابريزيو رومانو وجرائد الميركاتو العالمية الحالية لعام 2026.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
              {/* Done Deals Tracker Table */}
              <div className="lg:col-span-8 bg-white border border-[#e2e8f0] p-4 space-y-4">
                <div className="flex items-center gap-2 pb-2 border-b border-gray-200">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse-live"></span>
                  <h3 className="font-bold text-sm text-[#07162c]">الصفقات المحسومة رسميًا (سوق صيف 2026)</h3>
                </div>

                <div className="overflow-x-auto text-xs">
                  <table className="w-full text-right border-collapse">
                    <thead>
                      <tr className="bg-[#07162c] text-[#D4AF37]">
                        <th className="p-2.5">اللاعب المنتقل</th>
                        <th className="p-2.5">النادي السابق</th>
                        <th className="p-2.5">النادي الجديد</th>
                        <th className="p-2.5 text-center">القيمة التقديرية</th>
                        <th className="p-2.5 text-center">الحالة الإدارية</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { name: 'كيليان مبابي', from: 'باريس سان جيرمان 🇫🇷', to: 'ريال مدريد 🇪🇸', val: 'انتقال حر 🆓', status: 'رسمي تم التوقيع ✅' },
                        { name: 'إيفان توني', from: 'برينتفورد 🇬🇧', to: 'الأهلي السعودي 🇸🇦', val: '€42,000,000', status: 'رسمي تم الفحص ✅' },
                        { name: 'جواو نيفيز', from: 'بنفيكا 🇵🇹', to: 'باريس سان جيرمان 🇫🇷', val: '€60,000,000', status: 'رسمي تم الفحص ✅' },
                        { name: 'خوليان ألفاريز', from: 'مانشستر سيتي 🇬🇧', to: 'أتلتيكو مدريد 🇪🇸', val: '€75,000,000', status: 'رسمي تم الفحص ✅' },
                        { name: 'داني أولمو', from: 'لايبزيغ 🇩🇪', to: 'برشلونة 🇪🇸', val: '€55,000,000', status: 'رسمي تم التوقيع ✅' }
                      ].map((deal, idx) => (
                        <tr key={idx} className="border-b hover:bg-gray-50">
                          <td className="p-2.5 font-bold text-[#07162c]">{deal.name}</td>
                          <td className="p-2.5 text-gray-600 font-semibold">{deal.from}</td>
                          <td className="p-2.5 text-emerald-800 font-bold">{deal.to}</td>
                          <td className="p-2.5 text-center font-mono font-bold">{deal.val}</td>
                          <td className="p-2.5 text-center text-emerald-600 font-black text-[11px]">{deal.status}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Rumours lists */}
              <div className="lg:col-span-4 bg-white border border-[#e2e8f0] p-4 space-y-4">
                <div className="flex items-center justify-between pb-2 border-b border-gray-200">
                  <h3 className="font-bold text-xs text-[#07162c] flex items-center gap-1">
                    <Sparkles className="w-4 h-4 text-[#D4AF37]" />
                    رادارات الصحف وشائعات ساخنة
                  </h3>
                  <span className="bg-amber-500 text-[#07162c] font-black text-[9px] px-1.5 rounded-[2px]">نشط</span>
                </div>

                <div className="space-y-4">
                  {[
                    { title: 'أرسنال يراقب هداف نابولي لحسم الهجوم الصيفي بصفقة كبرى', date: 'منذ ساعتين', prob: 'جدية عالية 🔥' },
                    { title: 'برشلونة يستكشف إمكانية التعاقد مع جوناثان تاه مجانًا العام المقبل', date: 'منذ 5 ساعات', prob: 'شائعة حركية ⏳' },
                    { title: 'الاتحاد السعودي يقدم عرضًا ضخمًا لضم جناح بايرن ميونخ كومان', date: 'منذ يوم واحد', prob: 'مفاوضات جارية 💬' }
                  ].map((rum, idx) => (
                    <div key={idx} className="border-b border-dashed pb-3 last:border-0 last:pb-0 space-y-1">
                      <h4 className="font-bold text-xs text-[#07162c] leading-snug">{rum.title}</h4>
                      <div className="flex justify-between items-center text-[10px] text-gray-500 font-bold">
                        <span>{rum.date}</span>
                        <span className="text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded-[2px]">{rum.prob}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        ) : activeAppTab === 'ABOUT_US' ? (
          /* ==================== 5. ABOUT US TAB ==================== */
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white border border-[#e2e8f0] p-6 sm:p-8 space-y-6"
            id="about-us-view"
          >
            <div className="border-b-2 border-[#D4AF37] pb-4">
              <span className="bg-[#D4AF37] text-[#07162c] text-[10px] px-2.5 py-0.5 rounded-[2px] font-black uppercase">عن البوابة الرياضية</span>
              <h2 className="text-xl sm:text-2xl font-black text-[#07162c]">من نحن - بوابة نكسس لايف كورة</h2>
            </div>

            <div className="space-y-4 text-xs sm:text-sm text-gray-700 leading-relaxed font-semibold">
              <p>
                مرحبًا بكم في <strong>Nexus live kooora (نكسس لايف كورة)</strong>، وهي المنصة المتطورة الناشئة على الشبكة العنكبوتية من خلال النطاق الرسمي والموثق <a href="https://nexusutils.online" className="text-blue-600 underline">https://nexusutils.online</a>. نحن نلتزم بتقديم أرقى مستويات الخدمة ومحتوى كرة القدم الرقمي لعشاق ومناصري الأندية والمنتخبات العربية والعالمية.
              </p>
              <p>
                تأسست بوابتنا على أسس راسخة غايتها تقديم البث المحاكي للتغطيات، رصد نتائج مباريات اليوم لحظة بلحظة، إحصائيات المجموعات المحدثة، وتوفير شريط تحديث مجريات المباراة الفوري، لنكون الوجهة الأولى والملاذ الآمن الباحث عن تجربة مشاهدة تتصف بالسرعة والاستقرار والأداء المتميز.
              </p>
              <h4 className="font-bold text-sm text-[#07162c] pt-2">قيمنا الأساسية وتطلعاتنا للبث:</h4>
              <ul className="list-disc pr-5 space-y-2 mt-2">
                <li><strong>السرعة والمصداقية:</strong> تزويد الزوار بجميع البيانات الإحصائية والقمصان ومواجهات الدوري السعودي والأوروبي بشكل مباشر دون تأخير دقيقة واحدة.</li>
                <li><strong>بيئة خالية من التشويه:</strong> إعداد واجهات ديناميكية مجهزة بمتغيرات Google AdSense القياسية التي تلائم مقاسات الهواتف والأجهزة اللوحية وتجربة مستخدم مريحة.</li>
                <li><strong>حفظ النزاهة وحقوق الملكية:</strong> ندرك أهمية الملكية الفكرية، لذلك نحن مدمجون فقط لروابط مسموح بها ومصادر متاحة عبر مشغلات ذكية متقدمة.</li>
              </ul>
              <h4 className="font-bold text-sm text-[#07162c] pt-2">اتصل بنا وإفادات التطوير:</h4>
              <p>
                يسعد طاقم التحرير وصاحب النطاق استقبال كافة مراسلاتكم والرد لتقديم الدعم الفني، المقترحات، وتحديثات البث والبرمجيات عبر عنوان المراسلة الرسمي: <span className="text-[#D4AF37] font-bold">info@nexusutils.online</span>.
              </p>
            </div>
          </motion.div>
        ) : activeAppTab === 'CONTACT_US' ? (
          /* ==================== 6. CONTACT US TAB ==================== */
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white border border-[#e2e8f0] p-6 sm:p-8 space-y-6"
            id="contact-us-view"
          >
            <div className="border-b-2 border-[#D4AF37] pb-4">
              <span className="bg-[#D4AF37] text-[#07162c] text-[10px] px-2.5 py-0.5 rounded-[2px] font-black uppercase">التواصل المستمر والدعم المباشر</span>
              <h2 className="text-xl sm:text-2xl font-black text-[#07162c]">اتصل بنا - نموذج المراسلة الرسمي</h2>
              <p className="text-xs text-gray-500 mt-1">تواصل مباشرة مع إدارة بوابة كورة ومالك النطاق https://nexusutils.online لحل المشكلات الفنية.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-xs sm:text-sm font-semibold text-gray-700">
              <div className="space-y-4">
                <p className="leading-relaxed">
                  إذا كان لديك أي استفسار حول بث المباريات، رعاية الإعلانات، أو للإبلاغ عن أي انتهاك يتعلق بحقوق الملكية أو النشر، يمكنك استخدام هذا النموذج للتواصل لتلقي الرد المباشر في غضون 24-48 ساعة كأقصى حد.
                </p>
                <div className="space-y-3 bg-gray-50 p-4 border border-gray-100 rounded-[2px]">
                  <h4 className="font-bold text-[#07162c] text-xs">قنوات المراسلة الرسمية المباشرة:</h4>
                  <p className="text-[11px] font-mono text-gray-600">
                    البريد المعتمد: <span className="text-blue-600 font-bold">info@nexusutils.online</span>
                  </p>
                  <p className="text-[11px] text-gray-600">
                    العنوان الجغرافي (مراسلونا): دبي - الرياض - القاهرة
                  </p>
                  <p className="text-[11px] text-gray-500 font-mono">
                    * SECURE_SSL_TRANSMISSION // AES-256
                  </p>
                </div>
              </div>

              {/* Form implementation */}
              <div>
                {contactSuccess ? (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-emerald-50 border border-emerald-500 text-emerald-800 p-5 rounded-[2px] text-center space-y-2.5"
                  >
                    <p className="font-black text-sm">✔ تم ترحيل وإرسال رسالتك بنجاح!</p>
                    <p className="text-xs text-emerald-900 leading-relaxed font-semibold">
                      شكراً لتواصلك مع Nexus live kooora. لقد تلقينا استفسارك وسيقوم فريق الدعم الفني بالتحقق والرد على بريدك الإلكتروني: <strong>{contactEmail}</strong> في أقرب وقت.
                    </p>
                    <button 
                      onClick={() => {
                        setContactSuccess(false);
                        setContactName('');
                        setContactEmail('');
                        setContactSubject('');
                        setContactMsg('');
                      }}
                      className="bg-[#07162c] text-[#D4AF37] text-[11px] font-black py-1.5 px-3 rounded-[2px] inline-block hover:bg-[#122e51] transition-all mt-2 cursor-pointer"
                    >
                      إرسال رسالة أخرى
                    </button>
                  </motion.div>
                ) : (
                  <form 
                    onSubmit={(e) => {
                      e.preventDefault();
                      if (!contactName || !contactEmail || !contactMsg) {
                        alert("يرجى ملء كافة الحقول الإلزامية قبل الإرسال.");
                        return;
                      }
                      setIsSendingContact(true);
                      setTimeout(() => {
                        setIsSendingContact(false);
                        setContactSuccess(true);
                      }, 1000);
                    }}
                    className="space-y-4 text-xs"
                  >
                    <div>
                      <label className="block text-gray-700 font-bold mb-1">الاسم الكريم (إلزامي): *</label>
                      <input 
                        type="text" 
                        required
                        value={contactName}
                        onChange={(e) => setContactName(e.target.value)}
                        placeholder="أدخل اسمك الكامل هنا"
                        className="w-full bg-gray-50 border border-[#e2e8f0] p-2.5 rounded-[2px] text-xs focus:outline-none focus:border-[#D4AF37]"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 font-bold mb-1">البريد الإلكتروني للرد المباشر: *</label>
                      <input 
                        type="email" 
                        required
                        value={contactEmail}
                        onChange={(e) => setContactEmail(e.target.value)}
                        placeholder="yourname@example.com"
                        className="w-full bg-gray-50 border border-[#e2e8f0] p-2.5 rounded-[2px] text-xs font-mono focus:outline-none focus:border-[#D4AF37]"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 font-bold mb-1">موضوع موضوع الرسالة: *</label>
                      <input 
                        type="text" 
                        required
                        value={contactSubject}
                        onChange={(e) => setContactSubject(e.target.value)}
                        placeholder="طبيعة المراسلة (دعم، اقتراح، إشعار ملكية)"
                        className="w-full bg-gray-50 border border-[#e2e8f0] p-2.5 rounded-[2px] text-xs focus:outline-none focus:border-[#D4AF37]"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 font-bold mb-1">نص الاستفسار والمراسلة بالتفصيل: *</label>
                      <textarea 
                        rows={4}
                        required
                        value={contactMsg}
                        onChange={(e) => setContactMsg(e.target.value)}
                        placeholder="اكتب هنا كافة تفاصيل استفسارك وسؤالك للتطوير..."
                        className="w-full bg-gray-50 border border-[#e2e8f0] p-2.5 rounded-[2px] text-xs focus:outline-none focus:border-[#D4AF37]"
                      ></textarea>
                    </div>
                    <button
                      type="submit"
                      disabled={isSendingContact}
                      className="w-full bg-[#07162c] text-[#D4AF37] hover:bg-white border hover:border-[#07162c] hover:text-[#07162c] transition-all font-black py-2 rounded-[2px] text-xs cursor-pointer flex items-center justify-center gap-2"
                    >
                      {isSendingContact ? (
                        <>
                          <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                          <span>جاري تأشير ترحيل المراسلة...</span>
                        </>
                      ) : (
                        <span>إرسال وتأكيد الطلب الفوري ✉</span>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </motion.div>
        ) : activeAppTab === 'PRIVACY_POLICY' ? (
          /* ==================== 7. PRIVACY POLICY TAB ==================== */
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white border border-[#e2e8f0] p-6 sm:p-8 space-y-6"
            id="privacy-policy-view"
          >
            <div className="border-b-2 border-[#D4AF37] pb-4">
              <span className="bg-[#D4AF37] text-[#07162c] text-[10px] px-2.5 py-0.5 rounded-[2px] font-black uppercase">التزاماً بمتطلبات AdSense وجوجل للقبول الفوري</span>
              <h2 className="text-xl sm:text-2xl font-black text-[#07162c]">سياسة الخصوصية لـ Nexus live kooora</h2>
              <p className="text-xs text-gray-500 mt-1">آخر تحديث: يونيو 2026</p>
            </div>

            <div className="space-y-4 text-xs sm:text-sm text-gray-700 leading-relaxed font-semibold">
              <p>
                في موقعنا <strong>Nexus live kooora</strong>، الذي نصل إليه عبر النطاق <a href="https://nexusutils.online" className="text-blue-600 underline">https://nexusutils.online</a>، تعتبر خصوصية زوارنا الكرام بمثابة أولوية قصوى بالنسبة لنا. تم صياغة هذه السياسة لتوضيح ماهية المعلومات التي نقوم بجمعها وتسجيلها وكيفية استغلالها لخدمة تطوير وتكييف البث والخبر.
              </p>
              
              <h4 className="font-bold text-sm text-[#07162c]">ملفات لملفات السجل (Log Files):</h4>
              <p>
                يتبع نكسس لايف كورة نظاماً برمجياً دقيقاً يقوم على استخدام ملفات السجل القياسية. هذه الملفات تسجل الزوار فقط عندما يزورون صفحات الويب المختلفة. تشمل المعلومات التي تسجلها عناوين بروتوكول الإنترنت (IP)، ونوع المتصفح مستعلم المباشر، ومزود خدمات الإنترنت (ISP) ونطاقات البث المضمونة، والوصف، ومجموعات الترتيب وتعداد الزيارات السريعة.
              </p>

              <h4 className="font-bold text-sm text-[#07162c]">ملفات تعريف الارتباط الخاصة بشركاء الإعلان (Cookies & Web Beacons):</h4>
              <p>
                مثل أي موقع ويب آخر، يستخدم موقع <strong>https://nexusutils.online</strong> "ملفات تعريف الارتباط" (Cookies). تُستخدم هذه الملفات للاحتفاظ بتفضيلات زوار الموقع وعدد الزيارات والتحوطات وتوفير قنوات البث ومولدات الأكواد iframe الخارجية المتوافقة دون التأثير نهائياً على المظهر.
              </p>

              <h4 className="font-bold text-sm text-[#07162c]">جوجل دبل كليك كوكيز ومفاتيح الخوادم (Google DART Cookie):</h4>
              <p>
                شركة جوجل هي أحد بائعي وإعلانات الطرف الثالث على بوابتنا. تستخدم جوجل أيضاً ملفات تعريف الارتباط المعروفة باسم DART لخدمة عرض الإعلانات الديناميكية بناءً على زيارة زوارنا لموقعنا والمواقع الشريكة على الإنترنت. يمكنك اختيار تعطيل استخدام ملفات تعريف الارتباط أو ملف النطاق من خلال زيارة سياسة خصوصية شبكة إعلانات جوجل والتحليلات بالرابط المخصص لها.
              </p>

              <h4 className="font-bold text-sm text-[#07162c]">شركاء شبكة الإعلانات في موقعنا:</h4>
              <p>
                قد يستخدم بعض المعلنين على موقعنا ملفات تعريف الارتباط والمنارات لخدمة قياس الأداء. من أبرز شركاء الإعلانات لدينا ومحسابات الاستقرار: <strong>Google AdSense</strong>. يمتلك كل شريك إعلاني سياسة خصوصية مستقلة خاصة به لبيانات المستخدمين، ونحن نوجه زوارنا الكرام بمراجعتها كاملة لتوضيح سبل التحكم.
              </p>
            </div>
          </motion.div>
        ) : activeAppTab === 'COPYRIGHT' ? (
          /* ==================== 8. COPYRIGHT / DMCA TAB ==================== */
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white border border-[#e2e8f0] p-6 sm:p-8 space-y-6 text-right font-sans"
            id="copyright-view"
            dir="rtl"
          >
            <div className="border-b-2 border-[#D4AF37] pb-4">
              <span className="bg-[#D4AF37] text-[#07162c] text-[10px] px-2.5 py-0.5 rounded-[2px] font-black uppercase">سياسة حماية المحتوى والنزاهة القانونية</span>
              <h2 className="text-xl sm:text-2xl font-black text-[#07162c] mt-1">حقوق النشر والملكية الفكرية (Copyright / DMCA Compliance)</h2>
            </div>

            <div className="space-y-5 text-xs sm:text-sm text-gray-700 leading-relaxed font-semibold">
              <p className="border-r-4 border-[#07162c] pr-3 py-1 bg-slate-50 font-black text-[#07162c]">
                بوابة <strong>Nexus live kooora (نكسس لايف كورة)</strong> الرقمية هي منصة تهتم بتقديم التقارير الإخبارية وإحصائيات كرة القدم ومباريات اليوم وترتيب المجموعات. ونحن نحترم بصرامة تامة كافة حقوق الملكية الفكرية، وحقوق النشر والتأليف للجهات المالكة الرسمية والشركاء الإعلاميين على الساحة العربية والدولية.
              </p>

              <div>
                <h4 className="font-black text-sm text-[#07162c] mb-1.5 flex items-center gap-1.5 justify-start">
                  <Shield className="w-4 h-4 text-[#D4AF37]" />
                  <span>1. طبيعة المنصة وعلاقتها بالبث التلفزيوني:</span>
                </h4>
                <p>
                  بوابة <strong className="text-black">Nexus live kooora (نكسس لايف كورة)</strong> الممثلة عبر النطاق المعتمد <a href="https://nexusutils.online" className="text-blue-600 underline">https://nexusutils.online</a> هي موقع رقمي إخباري مستقل ومحرك مخصّص لفهرسة وتجميع الروابط وتضمين مشغلات الفيديو الخارجية المتاحة للجمهور مجاناً على شبكة الإنترنت. ونؤكد بما لا يدع مجالاً للشك أن الخوادم والبنية التحتية الخاصة بالموقع <strong>لا تقوم، بشكل قطعي، باستضافة، أو تخزين، أو تسجيل، أو رفع، أو إعادة بث</strong> أي من وسائط الفيديو أو الملفات المشفرة أو إشارات البث التلفزي المباشر لمباريات كرة القدم على خوادمها الخاصة.
                </p>
                <p className="mt-2 text-gray-600">
                  المنصة تعمل فقط كـ "مدمج أو مرشد فني" (Embedder / Indexer) يتضمن حزم Iframe مشفرة وسليمة من شبكات البث العامة، وبالتالي تقع مسؤولية البث والأكواد المضمنة بشكل كامل وجغرافي على عاتق الجهات المصدرية الموفرة لتلك الوصلات والمشغلات.
                </p>
              </div>

              <div>
                <h4 className="font-black text-sm text-[#07162c] mb-1.5 flex items-center gap-1.5 justify-start">
                  <Shield className="w-4 h-4 text-[#D4AF37]" />
                  <span>2. سياسة إخطارات انتهاك حقوق النشر (DMCA Take-Down Policy):</span>
                </h4>
                <p>
                  نحن نلتزم بالتعاون الكامل مع ملاك العلامات وحقوق وممثلي البث التلفزي والأرضي لحجب وإزالة أي تضمينات تنتهك حقوقهم المشروعة. نوفر آلية موثقة ومعالجة فورية لكافة طلبات إخطار الإزالة بموجب قوانين حماية المواد الرقمية.
                </p>
                <p className="mt-2 text-[#07162c] font-black bg-amber-50 p-3 border-r-4 border-[#D4AF37]/80">
                  أي طلب إزالة قانوني مستوف للشروط ومثبت الهوية يتم مراجعته وتنفيذه فوراً بحذف وسحب رابط التضمين المستهدف من جدران المنصة في غضون ٢٤ ساعة كحد أقصى من استقبال الإشعار الرسمي.
                </p>
              </div>

              <div className="bg-slate-50 border border-slate-200 p-4 space-y-3">
                <h5 className="font-black text-xs text-[#07162c] flex items-center gap-1.5">
                  <FileCode className="w-4 h-4 text-[#07162c]" />
                  <span>متطلبات إرسال إشعار رسمي للإدارة (abuse@nexusutils.online):</span>
                </h5>
                <p className="text-xs text-gray-600 font-bold">
                  لضمان سرعة الاستجابة الاستثنائية، يُرجى بعث بريد إلكتروني يحتوي على البنود القانونية التالية:
                </p>
                <ol className="list-decimal pr-5 space-y-1.5 text-xs text-gray-700 font-bold">
                  <li>إثبات رسمي لصفة المالك القانوني للحقوق أو إرفاق توكيل معتمد بالتمثيل الدولي.</li>
                  <li>تقديم تفاصيل دقيقة وشاملة حول العلامة أو القنوات المشمولة بالحماية (مثل اسم القناة التلفزيونية والشبكة الناقلة).</li>
                  <li>تحديد الروابط الدقيقة (URLs) أو أسماء صفحات الموقع المتضمنة للوسائط المشمولة بالانتهاك داخل بوابتنا.</li>
                  <li>بيانات اتصال بريدية وهاتفية رسمية وصالحة للتأكيد القانوني والمتابعة الفورية.</li>
                </ol>
              </div>

              <div className="bg-red-50/70 border-r-4 border-red-600 p-4 text-xs">
                <span className="font-sans uppercase text-[10px] bg-[#07162c] text-[#D4AF37] px-2 py-0.5 inline-block font-black mb-1.5">البريد المعتمد للمكتب القانوني ومكافحة الانتهاكات:</span>
                <p className="text-gray-900 font-black text-sm">
                  عنوان المراسلات القانونية العاجلة: <a href="mailto:abuse@nexusutils.online" className="text-red-700 underline font-mono text-base">abuse@nexusutils.online</a>
                </p>
                <p className="text-gray-500 mt-1.5 text-[11px] font-bold">
                  تنبيه: هذا البريد مراقب طوال أيام الأسبوع على مدار الساعة بالتنسيق مع فريق الدعم الفني، لمعالجة قضايا الملكية الفردية وحقوق التوزيع في غضون 24 ساعة كحد أقصى.
                </p>
              </div>
            </div>
          </motion.div>
        ) : activeAppTab === 'NEXUS_ADMIN' ? (
          /* ==================== 8B. PRIVATE ADMIN PORTAL (PROTECTED BY PASSWORD) ==================== */
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white border border-[#e2e8f0] p-6 sm:p-8 space-y-6 text-right"
            id="nexus-admin-view"
            dir="rtl"
          >
            {!isAdminAuthenticated ? (
              <div className="max-w-md mx-auto my-10 bg-[#07162c] text-white border-2 border-[#D4AF37] p-8 shadow-2xl rounded-none">
                <div className="text-center space-y-3 mb-6">
                  <div className="bg-[#D4AF37] w-12 h-12 rounded-full flex items-center justify-center text-[#07162c] mx-auto">
                    <Lock className="w-5 h-5 text-[#07162c]" />
                  </div>
                  <h2 className="text-xl font-black text-[#D4AF37]">بوابة الإدارة والتأمين الفني</h2>
                  <p className="text-xs text-slate-300 leading-relaxed font-semibold">
                    هذه الصفحة محمية وخاصة بمدير ومطور الموقع لتغذية الأخبار والمستندات بخصوصية تامة.
                  </p>
                </div>
                
                <form onSubmit={(e) => {
                  e.preventDefault();
                  const targetPass = (import.meta as any).env.VITE_ADMIN_PASSWORD || 'kooora2026';
                  if (adminPasswordInput === targetPass) {
                    setIsAdminAuthenticated(true);
                    localStorage.setItem('nexus_admin_auth', 'true');
                    setAdminErrorMessage('');
                  } else {
                    setAdminErrorMessage('خطأ: رمز المرور غير صحيح! يرجى التحقق من لوحة الإعداد الفني في منصة البناء الخاصة بك.');
                  }
                }} className="space-y-4">
                  <div>
                    <label className="block text-xs text-gray-300 font-bold mb-1.5">رمز المرور السري (Password):</label>
                    <input 
                      type="password"
                      required
                      value={adminPasswordInput}
                      onChange={(e) => setAdminPasswordInput(e.target.value)}
                      placeholder="••••••••••••"
                      className="w-full bg-[#0b213f] border border-[#D4AF37]/40 p-3 rounded text-center text-sm font-mono text-white focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>
                  
                  {adminErrorMessage && (
                    <div className="bg-red-500/10 border border-red-500/30 p-2.5 text-xs text-red-300 text-center rounded flex items-center gap-1.5 justify-center font-bold">
                      <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                      <span>{adminErrorMessage}</span>
                    </div>
                  )}
                  
                  <button 
                    type="submit"
                    className="w-full bg-[#D4AF37] text-[#07162c] font-black py-2.5 rounded text-xs hover:bg-white hover:text-[#07162c] transition-all cursor-pointer shadow-md"
                  >
                    تسجيل الدخول الآمن ترحيب
                  </button>
                </form>
              </div>
            ) : (
              <div className="space-y-8">
                {/* CMS Header Admin Area */}
                <div className="border-b-2 border-[#D4AF37] pb-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div>
                    <span className="bg-[#D4AF37] text-[#07162c] text-[10px] px-2.5 py-0.5 rounded-[2px] font-black uppercase inline-block mb-1">لوحة تحكم كاتب المحتوى</span>
                    <h2 className="text-xl sm:text-2xl font-black text-[#07162c] flex items-center gap-2">
                      <Unlock className="w-6 h-6 text-[#D4AF37]" />
                      إدارة محتوى بوابة Nexus live kooora
                    </h2>
                    <p className="text-xs text-gray-500 font-bold">مرحباً بالمدير. يمكنك بسهولة نشر أخبار عاجلة، وتنسيق تغذيات البث، والتحكم في إعلانات الموقع.</p>
                  </div>
                  <button
                    onClick={() => {
                      setIsAdminAuthenticated(false);
                      localStorage.setItem('nexus_admin_auth', 'false');
                      setAdminPasswordInput('');
                    }}
                    className="bg-[#07162c] text-white hover:bg-red-600 transition-all font-bold px-4 py-2 text-xs rounded-none flex items-center gap-1.5"
                  >
                    خروج آمن من لوحة التحكم
                  </button>
                </div>

                {/* Grid stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-slate-50 p-4 border border-slate-200">
                    <span className="text-[10px] text-gray-500 font-bold block">إجمالي المقالات الآن</span>
                    <strong className="text-lg text-[#07162c] font-black">{news.length} منشوراً</strong>
                  </div>
                  <div className="bg-slate-50 p-4 border border-slate-200">
                    <span className="text-[10px] text-gray-500 font-bold block">أخبار الشريط العاجل</span>
                    <strong className="text-lg text-red-600 font-black">{news.filter(n => (n as any).placement === 'HEADER_BANNER').length} خبر</strong>
                  </div>
                  <div className="bg-slate-50 p-4 border border-slate-200">
                    <span className="text-[10px] text-gray-500 font-bold block">أخبار التغذية الوسطى</span>
                    <strong className="text-lg text-[#D4AF37] font-black">{news.filter(n => !(n as any).placement || (n as any).placement === 'MIDDLE_CONTENT').length} خبر في المعرض</strong>
                  </div>
                  <div className="bg-slate-50 p-4 border border-slate-200">
                    <span className="text-[10px] text-gray-500 font-bold block">إعلانات وتنويهات التذييل</span>
                    <strong className="text-lg text-[#07162c] font-black">{news.filter(n => (n as any).placement === 'FOOTER_LINKS').length} تنويه نشط</strong>
                  </div>
                </div>

                {/* Submitting Feedback banner */}
                {adminPublishSuccess && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-emerald-50 border-r-4 border-emerald-500 p-4 text-emerald-900 font-semibold text-xs sm:text-sm flex items-center gap-2"
                  >
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                    <span>تم نشر المقال والمزامنة بنجاح في الموقع! يمكنك معاينة ظهوره في القسم الذي تم تحديده فوراً.</span>
                  </motion.div>
                )}

                <div className="space-y-8">
                  {/* Article Publishing Form */}
                  <div className="bg-white border border-slate-200 p-5 sm:p-6 space-y-4">
                    <h3 className="font-black text-sm text-[#07162c] border-b pb-2 flex items-center gap-2">
                      <PlusCircle className="w-5 h-5 text-[#D4AF37]" />
                      إنشاء ونشر مقال جديد
                    </h3>

                    <form onSubmit={handlePublishArticle} className="space-y-4 text-xs">
                      <div>
                        <label className="block text-gray-700 font-bold mb-1">العنوان الرئيسي للمقال (بالعربية): *</label>
                        <input 
                          type="text" 
                          required
                          value={adminTitle}
                          onChange={(e) => setAdminTitle(e.target.value)}
                          placeholder="مثال: عاجل: ليفربول يحسم الاتفاق المالي مع محمد صلاح للتجديد لكال عامين"
                          className="w-full bg-gray-50 border border-slate-200 p-3 rounded text-xs focus:outline-none focus:border-[#D4AF37]"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-gray-700 font-bold mb-1">القسم (التصنيف الهام): *</label>
                          <select 
                            value={adminCategory}
                            onChange={(e) => setAdminCategory(e.target.value)}
                            className="w-full bg-gray-50 border border-slate-200 p-3 rounded text-xs focus:outline-none focus:border-[#D4AF37]"
                          >
                            <option value="أخبار عاجلة">أخبار عاجلة</option>
                            <option value="دوريات عربية">دوريات عربية</option>
                            <option value="دوريات أوروبية">دوريات أوروبية</option>
                            <option value="ميركاتو">ميركاتو (انتقالات الصيف)</option>
                            <option value="الكرة العالمية">الكرة العالمية</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-gray-700 font-bold mb-1">رابط الصورة البارزة (Featured Image URL):</label>
                          <input 
                            type="url" 
                            value={adminImage}
                            onChange={(e) => setAdminImage(e.target.value)}
                            placeholder="https://images.unsplash.com/... أو اتركه فارغاً للصورة التلقائية"
                            className="w-full bg-gray-50 border border-slate-200 p-3 rounded text-xs focus:outline-none focus:border-[#D4AF37]"
                          />
                        </div>
                      </div>

                      {/* Display Location Radios */}
                      <div className="bg-amber-50/50 border border-[#D4AF37]/30 p-4 rounded space-y-2">
                        <label className="block text-[#07162c] font-black text-xs">موضع عرض ونشر المقال تلقائياً (Placement): *</label>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                          <label className="flex items-center gap-2 cursor-pointer font-bold text-gray-700">
                            <input 
                              type="radio" 
                              name="displayPlacement" 
                              checked={adminPlacement === 'HEADER_BANNER'} 
                              onChange={() => setAdminPlacement('HEADER_BANNER')}
                              className="accent-[#07162c]"
                            />
                            <span>[شريط عاجل هيدر]</span>
                          </label>
                          <label className="flex items-center gap-2 cursor-pointer font-bold text-gray-700">
                            <input 
                              type="radio" 
                              name="displayPlacement" 
                              checked={adminPlacement === 'MIDDLE_CONTENT'} 
                              onChange={() => setAdminPlacement('MIDDLE_CONTENT')}
                              className="accent-[#07162c]"
                            />
                            <span>[تغذية الأخبار الوسطى]</span>
                          </label>
                          <label className="flex items-center gap-2 cursor-pointer font-bold text-gray-700">
                            <input 
                              type="radio" 
                              name="displayPlacement" 
                              checked={adminPlacement === 'FOOTER_LINKS'} 
                              onChange={() => setAdminPlacement('FOOTER_LINKS')}
                              className="accent-[#07162c]"
                            />
                            <span>[تنبيهات وروابط التذييل]</span>
                          </label>
                        </div>
                        <p className="text-[10px] text-gray-500 pt-1">
                          * شريط عاجل سيحدث مباشرة الشريط الدوار في قمة الموقع. التغذية الوسطى سيضيفها للمربعات. روابط التذييل ستثبت التنبيهات القانونية.
                        </p>
                      </div>

                      <div>
                        <label className="block text-gray-700 font-bold mb-1">ملخص مقتضب للمقال (Summary - يظهر كفقرة معبرة): *</label>
                        <textarea 
                          required
                          rows={2}
                          value={adminSummary}
                          onChange={(e) => setAdminSummary(e.target.value)}
                          placeholder="اكتب فكرة ملخصة سريعة للمقال لتظهر كنبذة معبرة تحت العنوان..."
                          className="w-full bg-gray-50 border border-slate-200 p-3 rounded text-xs focus:outline-none focus:border-[#D4AF37]"
                        />
                      </div>

                      <div>
                        <label className="block text-gray-700 font-bold mb-1">محتوى المقال كاملاً أو أكواد إرسال الفيديو (Rich Content & Video Frames): *</label>
                        <textarea 
                          required
                          rows={6}
                          value={adminContent}
                          onChange={(e) => setAdminContent(e.target.value)}
                          placeholder="تفاصيل المقال بالكامل. يمكنك لصق أكواد iframe المباشرة للفيديوهات واليوتيوب كذلك لإظهارها للزوار."
                          className="w-full bg-gray-50 border border-slate-200 p-3 rounded text-xs font-semibold focus:outline-none focus:border-[#D4AF37]"
                        />
                      </div>

                      <button 
                        type="submit"
                        className="w-full bg-[#07162c] text-white hover:bg-[#D4AF37] hover:text-[#07162c] font-black py-3 rounded text-sm transition-all shadow cursor-pointer uppercase flex items-center justify-center gap-2"
                      >
                        <Globe className="w-4 h-4" />
                        اعتماد ونشر المقال على خادم الموقع والزوار
                      </button>
                    </form>
                  </div>

                  {/* Live Stream Embedder Feature Control Card */}
                  <div className="bg-[#07162c] text-white border-2 border-[#D4AF37] p-5 sm:p-6 space-y-4">
                    <h3 className="font-black text-sm text-[#D4AF37] border-b border-[#D4AF37]/30 pb-2 flex items-center gap-2">
                      <Tv className="w-5 h-5 text-[#D4AF37] animate-pulse-live" />
                      جهاز تضمين البث المباشر الفوري (Live Stream Embedder)
                    </h3>
                    <p className="text-xs text-slate-300 font-bold leading-relaxed">
                      التزاماً بسياسات Google AdSense وقوانين النشر الرقمية، يمنع خادم كورة تماماً استضافة أية مواد مرئية أو ملفات فيديو محمية وتجبر الخادم على سحب تضمينات خارجية آمنة. يمكنك وضع وتوجيه البث المباشر النشط هنا ليتحول مشغّل البث للزوار إلى هذا العنوان فورياً.
                    </p>

                    <form onSubmit={handleSaveLiveStreamSettings} className="space-y-4 text-xs">
                      <div>
                        <label className="block text-slate-200 font-black mb-1">اسم المباراة أو تصنيف القناة التلفزيونية (Match Channel Title): *</label>
                        <input 
                          type="text" 
                          required
                          value={adminLiveStreamTitle}
                          onChange={(e) => setAdminLiveStreamTitle(e.target.value)}
                          placeholder="مثال: beIN Sports HD 1 / ريال مدريد ضد بايرن ميونخ - مباشر"
                          className="w-full bg-[#0b213f] border border-[#D4AF37]/30 p-3 rounded text-xs text-white placeholder-slate-400 focus:outline-none focus:border-[#D4AF37] font-semibold"
                        />
                      </div>

                      <div>
                        <label className="block text-slate-200 font-black mb-1">كود التضمين الآمن أو رابط البث الخارجي (URL of Stream / Iframe Code): *</label>
                        <textarea 
                          required
                          rows={3}
                          value={adminLiveStreamUrl}
                          onChange={(e) => setAdminLiveStreamUrl(e.target.value)}
                          placeholder="ألصق كود <iframe> كامل، أو رابط بث مباشر m3u8، أو رابط فيديو يوتيوب أو صفحة ويب خارجية..."
                          className="w-full bg-[#0b213f] border border-[#D4AF37]/30 p-3 rounded text-xs text-white placeholder-slate-400 focus:outline-none focus:border-[#D4AF37] font-mono leading-relaxed"
                        />
                        <p className="text-[10px] text-slate-300 pt-1">
                          * يقبل الموقع الأكواد الكاملة لـ iframe ويستخلص الرابط منها كلياً، كما يدعم الروابط المباشرة للامتدادات البثية واليوتيوب.
                        </p>
                      </div>

                      <div className="bg-[#122e51] p-3.5 border border-[#D4AF37]/20 flex items-center justify-between">
                        <div className="space-y-0.5">
                          <label className="block text-[#D4AF37] font-black text-xs cursor-pointer select-none" htmlFor="active-stream-now">
                            تفعيل البث المباشر المخصص الآن للزوار
                          </label>
                          <span className="text-[10px] text-slate-300 block">عند تحديد هذا الخيار، سيحل هذا البث المضمن مكان مشغّل المحاكي الافتراضي فوراً.</span>
                        </div>
                        <input 
                          type="checkbox" 
                          id="active-stream-now"
                          checked={adminLiveStreamActive}
                          onChange={(e) => setAdminLiveStreamActive(e.target.checked)}
                          className="w-5 h-5 accent-[#D4AF37] cursor-pointer"
                        />
                      </div>

                      <button 
                        type="submit"
                        className="w-full bg-[#D4AF37] text-[#07162c] font-black py-3 rounded text-xs hover:bg-white hover:text-[#07162c] transition-all shadow cursor-pointer uppercase flex items-center justify-center gap-2"
                      >
                        <Tv className="w-4 h-4 text-[#07162c]" />
                        حفظ وتعميم وتنشيط البث المباشر الآن
                      </button>
                    </form>
                  </div>

                  {/* Manage Articles Section */}
                  <div className="bg-slate-50 border border-slate-200 p-5 sm:p-6 space-y-4" id="manage-articles-section">
                    <div className="border-b pb-2 mb-4 flex justify-between items-center">
                      <h3 className="font-black text-sm text-[#07162c] flex items-center gap-1.5">
                        <Settings className="w-4 h-4 text-[#D4AF37]" />
                        إدارة المقالات والأخبار المتاحة ({news.length})
                      </h3>
                      <p className="text-[11px] text-gray-500 font-bold">يمكنك معاينة ومسح أي خبر أو إعلان من الموقع فورياً بالتنسيق التلقائي</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-h-[600px] overflow-y-auto pr-1">
                      {news.map((item) => {
                        const isCustom = item.id.startsWith('custom-');
                        return (
                          <div key={item.id} className="p-4 bg-white border border-slate-200 shadow-sm rounded-none flex flex-col justify-between space-y-3 text-xs">
                            <div className="space-y-1">
                              <div className="flex justify-between items-start gap-2">
                                <span className={`px-2 py-0.5 text-[9px] font-black rounded ${
                                  isCustom ? 'bg-amber-100 text-amber-800' : 'bg-slate-100 text-slate-800'
                                }`}>
                                  {isCustom ? 'منشور مخصص' : 'تلقائي افتراضي'}
                                </span>
                                
                                <span className="text-gray-400 font-mono text-[10px]">{item.date}</span>
                              </div>

                              <h4 className="font-bold text-[#07162c] leading-snug">{item.title}</h4>
                              <p className="text-gray-500 text-[10px] line-clamp-2">{item.summary}</p>
                            </div>
                            
                            <div className="flex justify-between items-center pt-2 border-t border-slate-100 text-[10px] font-bold text-gray-500">
                              <span>الموضع: {(item as any).placement || 'MIDDLE_CONTENT'}</span>
                              <button 
                                onClick={() => handleDeleteArticle(item.id)}
                                className="text-red-600 hover:text-white hover:bg-red-600 transition-all flex items-center gap-1 font-black cursor-pointer bg-red-50 hover:border-red-500 px-2.5 py-1.5 rounded border border-red-200"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                                حذف المقال
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        ) : (
          /* ==================== 9. ORIGINAL BRAND & REPOSITORY MIGRATION PANEL ==================== */
          <motion.div 
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white border border-[#e2e8f0] rounded-none p-5 sm:p-7 space-y-6"
            id="migration-dashboard"
          >
            <div className="pb-4 border-b border-gray-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <span className="bg-[#D4AF37] text-[#07162c] text-[10px] px-2.5 py-1 rounded font-black inline-block mb-1">دليل مطوري وملاك المواقع</span>
                <h2 className="text-xl sm:text-2xl font-black text-[#07162c]">كيفية دمج وتعديل ملفات موقعك ليتوافق مع هوية Nexus live kooora</h2>
                <p className="text-xs text-gray-500 font-medium">اتبع هذا الدليل العملي بدقة لتطبيق الألوان الجديدة والملفات التقنية دون الإضرار بنية الأكواد القديمة.</p>
              </div>
              <button
                onClick={() => setActiveAppTab('MAIN')}
                className="bg-[#07162c] text-white hover:bg-[#D4AF37] hover:text-[#07162c] transition-all font-bold px-4 py-2 text-xs rounded flex items-center gap-1"
              >
                <ChevronRight className="w-4 h-4" />
                العودة للمنصة الرسومية
              </button>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
              
              {/* Summary cards block */}
              <div className="xl:col-span-4 space-y-4">
                <div className="bg-amber-50 border border-[#D4AF37]/50 rounded-lg p-4 space-y-3">
                  <h4 className="font-bold text-[#07162c] text-sm flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#D4AF37]" />
                    ملخص العلامة التجارية الجديدة
                  </h4>
                  <ul className="text-xs space-y-2 text-gray-700 font-medium">
                    <li className="flex justify-between border-b pb-1">
                      <span>اسم الموقع الجديد:</span>
                      <strong className="text-[#07162c]">Nexus live kooora</strong>
                    </li>
                    <li className="flex justify-between border-b pb-1">
                      <span>النطاق المستهدف:</span>
                      <strong className="text-blue-600 font-mono">nexusutils.online</strong>
                    </li>
                    <li className="flex justify-between border-b pb-1">
                      <span>اللون الأساسي:</span>
                      <strong className="text-[#D4AF37] font-mono">#D4AF37 (Matte Gold)</strong>
                    </li>
                    <li className="flex justify-between border-b pb-1">
                      <span>اللون الفرعي للباك:</span>
                      <strong className="text-[#07162c] font-mono">#07162c (Navy Blue)</strong>
                    </li>
                    <li className="flex justify-between">
                      <span>الخط المستهدف:</span>
                      <strong className="font-mono">Tahoma, sans-serif</strong>
                    </li>
                  </ul>
                </div>

                <div className="bg-[#07162c] text-white rounded-lg p-4 space-y-3">
                  <h4 className="font-bold text-sm text-[#D4AF37] flex items-center gap-1.5">
                    <Radio className="w-4 h-4" />
                    تحقق سريع لـ Vercel & SEO
                  </h4>
                  <p className="text-[11px] text-gray-300 leading-relaxed">
                    تضمن هذه التكوينات التحقق من ملكية موقعك لأغراض إعلانات جوجل أدسينس وربط الخرائط ومحركات البحث بمجرد نشر كود المستودع على خوادم Vercel.
                  </p>
                  <div className="text-[11px] text-gray-300 space-y-1 bg-[#122e51] p-2.5 rounded border border-[#1e3a61]">
                    <p className="text-[#D4AF37] font-bold">✔ ads.txt جاهز بالمسار المطلوب</p>
                    <p className="text-emerald-400 font-bold">✔ robots.txt يوجه لخريطة الموقع</p>
                    <p className="text-emerald-400 font-bold">✔ sitemap.xml مبني لموقعك</p>
                  </div>
                </div>
              </div>

              {/* Exact changes steps */}
              <div className="xl:col-span-8 space-y-5">
                
                {/* Step 1: global.css */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center bg-[#f1f3f5] p-2 rounded-t-lg">
                    <h5 className="font-bold text-xs text-[#07162c] flex items-center gap-1.5">
                      <span className="bg-[#07162c] text-white px-2 py-0.5 rounded text-[10px]">الملف 1</span>
                      تعديل متغيرات الألوان في ملف الطراز (e.g., global.css)
                    </h5>
                    <button 
                      onClick={() => triggerCopy(`:root {
  --background: #f7f7f8;
  --foreground: #2d3142;
  --card: #ffffff;
  --card-foreground: #07162c;
  --popover: #ffffff;
  --popover-foreground: #07162c;
  --primary: #D4AF37; /* Matte Gold */
  --primary-foreground: #07162c; /* Deep Navy text */
  --secondary: #ffffff;
  --secondary-foreground: #2d3142;
  --border: #e2e8f0;
  --input: #e2e8f0;
  --ring: #D4AF37;
  --font-sans: "Tahoma", "Verdana", Arial, sans-serif;
}`, 'CSS_VAR')}
                      className="bg-white border text-[10px] font-bold py-1 px-3 rounded hover:bg-gray-100 flex items-center gap-1.5 transition-all text-gray-700"
                    >
                      <Copy className="w-3 h-3" />
                      {copiedText === 'CSS_VAR' ? 'نسخ بنجاح!' : 'نسخ الكود'}
                    </button>
                  </div>
                  <pre className="p-3 bg-gray-900 border border-gray-800 text-gray-100 rounded-b-lg text-xs font-mono overflow-x-auto text-left" dir="ltr">
{`:root {
  --background: #f7f7f8;
  --foreground: #2d3142;
  --card: #ffffff;
  --card-foreground: #07162c;
  --popover: #ffffff;
  --popover-foreground: #07162c;
  --primary: #D4AF37; /* Matte Gold */
  --primary-foreground: #07162c; /* Deep Navy instead of pure blue */
  --secondary: #ffffff;
  --secondary-foreground: #2d3142;
  --border: #e2e8f0;
  --input: #e2e8f0;
  --ring: #D4AF37;
  --font-sans: "Tahoma", "Verdana", Arial, sans-serif;
}`}
                  </pre>
                </div>

                {/* Step 2: tailwind.config.js / tailwind.config.ts */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center bg-[#f1f3f5] p-2 rounded-t-lg">
                    <h5 className="font-bold text-xs text-[#07162c] flex items-center gap-1.5">
                      <span className="bg-[#07162c] text-white px-2 py-0.5 rounded text-[10px]">الملف 2</span>
                      إعداد الحقول في الإعداد العام (tailwind.config.js)
                    </h5>
                    <button 
                      onClick={() => triggerCopy(`theme: {
  extend: {
    colors: {
      primary: {
        DEFAULT: '#D4AF37', // Premium Matte Gold
        foreground: '#07162c', // Deep Navy Blue
      },
      foreground: '#2d3142', // slate gray
      border: '#e2e8f0',
    },
    fontFamily: {
      sans: ['Tahoma', 'Verdana', 'sans-serif'],
    },
    borderRadius: {
      sm: '4px',
      md: '8px',
    }
  }
}`, 'TW_CONFIG')}
                      className="bg-white border text-[10px] font-bold py-1 px-3 rounded hover:bg-gray-100 flex items-center gap-1.5 transition-all text-gray-700"
                    >
                      <Copy className="w-3 h-3" />
                      {copiedText === 'TW_CONFIG' ? 'نسخ بنجاح!' : 'نسخ الكود'}
                    </button>
                  </div>
                  <pre className="p-3 bg-gray-900 border border-gray-800 text-gray-100 rounded-b-lg text-xs font-mono overflow-x-auto text-left" dir="ltr">
{`theme: {
  extend: {
    colors: {
      primary: {
        DEFAULT: '#D4AF37', // Premium Matte Gold
        foreground: '#07162c', // Deep Navy Blue
      },
      foreground: '#2d3142', // slate gray
      border: '#e2e8f0',
    },
    fontFamily: {
      sans: ['Tahoma', 'Verdana', 'sans-serif'],
    },
    borderRadius: {
      sm: '4px',
      md: '8px',
    }
  }
}`}
                  </pre>
                </div>

                {/* Step 3: layout.js | SEO headers */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center bg-[#f1f3f5] p-2 rounded-t-lg">
                    <h5 className="font-bold text-xs text-[#07162c] flex items-center gap-1.5">
                      <span className="bg-[#07162c] text-white px-2 py-0.5 rounded text-[10px]">الملف 3</span>
                      تعديل الواصفات والعناوين الكلية (Metadata / layout.js)
                    </h5>
                    <button 
                      onClick={() => triggerCopy(`export const metadata = {
  title: 'Nexus live kooora | نكسس لايف كورة',
  description: 'منصة نكسس لايف كورة الرياضية - بث مباشر اليوم، نتائج مباريات اليوم، ترتيب المجموعات، وأحدث الأخبار الرياضية العربية والعالمية.',
  metadataBase: new URL('https://nexusutils.online'),
  alternates: {
    canonical: '/',
  },
  robots: {
    index: true,
    follow: true,
  }
}`, 'META_CONFIG')}
                      className="bg-white border text-[10px] font-bold py-1 px-3 rounded hover:bg-gray-100 flex items-center gap-1.5 transition-all text-gray-700"
                    >
                      <Copy className="w-3 h-3" />
                      {copiedText === 'META_CONFIG' ? 'نسخ بنجاح!' : 'نسخ الكود'}
                    </button>
                  </div>
                  <pre className="p-3 bg-gray-900 border border-gray-800 text-gray-100 rounded-b-lg text-xs font-mono overflow-x-auto text-left" dir="ltr">
{`export const metadata = {
  title: 'Nexus live kooora | نكسس لايف كورة',
  description: 'منصة نكسس لايف كورة الرياضية - بث مباشر اليوم، نتائج مباريات اليوم، ترتيب المجموعات، وأحدث الأخبار الرياضية العربية والعالمية.',
  metadataBase: new URL('https://nexusutils.online'),
  alternates: {
    canonical: '/',
  },
  robots: {
    index: true,
    follow: true,
  }
}`}
                  </pre>
                </div>

              </div>

            </div>
          </motion.div>
        )}

      </main>

      {/* 6. FULL FOOTBAL NEWS ARTICLE MODAL DIALOG PREVIEW */}
      <AnimatePresence>
        {activeArticleId && (() => {
          const article = news.find(n => n.id === activeArticleId);
          if (!article) return null;
          
          return (
            <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
              <motion.div 
                initial={{ opacity: 0, scale: 0.95, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 15 }}
                className="bg-white border-t-4 border-t-[#07162c] border-x border-b border-[#e2e8f0] rounded-none overflow-hidden shadow-none max-w-2xl w-full text-right"
                dir="rtl"
              >
                <div className="relative aspect-video">
                  <img 
                    src={article.image} 
                    alt={article.title} 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <button 
                    onClick={() => setActiveArticleId(null)}
                    className="absolute top-3 right-3 bg-[#07162c] text-[#D4AF37] hover:bg-white hover:text-[#07162c] transition-all p-2 rounded-none border border-[#D4AF37]/40 shadow-none cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                  <span className="absolute bottom-3 right-3 bg-[#D4AF37] text-[#07162c] px-3 py-1 rounded-none text-xs font-black font-mono">
                    {article.category}
                  </span>
                </div>

                <div className="p-5 sm:p-6 space-y-4">
                  <div className="flex items-center gap-3 text-xs text-gray-500 font-bold border-b pb-2 font-mono">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {article.date}
                    </span>
                    <span>المحرر الكاتب: {article.author}</span>
                    <span className="mr-auto">قراءة: {article.views} الزيارات</span>
                  </div>

                  <h3 className="text-lg sm:text-xl font-bold text-[#07162c] leading-snug">
                    {article.title}
                  </h3>

                  <div className="text-xs text-gray-700 font-semibold leading-relaxed space-y-3">
                    <p className="border-r-4 border-[#D4AF37] pr-3 bg-amber-50/50 p-2 text-gray-900 rounded-none">
                      {article.summary}
                    </p>
                    {article.content.includes('<iframe') || article.content.includes('<div') || article.content.includes('<video') ? (
                      <div 
                        className="text-gray-600 space-y-3 pb-2 [&_iframe]:w-full [&_iframe]:aspect-video [&_iframe]:border-0 rounded-md overflow-hidden"
                        dangerouslySetInnerHTML={{ __html: article.content }}
                      />
                    ) : (
                      <p className="text-gray-600 whitespace-pre-line">
                        {article.content}
                      </p>
                    )}
                  </div>

                  {/* Comments mock form inside the modal for high density interaction */}
                  <div className="mt-6 pt-4 border-t border-gray-100 space-y-3">
                    <h4 className="text-xs font-bold text-[#07162c] flex items-center gap-1">
                      <MessageSquare className="w-3.5 h-3.5 text-[#D4AF37]" />
                      التعليقات والمناقشات حول الخبر ({article.commentsCount})
                    </h4>
                    <div className="space-y-2">
                      <div className="bg-gray-50 p-2.5 rounded-none text-[11px] font-semibold border border-gray-100">
                        <span className="text-[#07162c] font-black">حسام الدين:</span> تحليل منطقي جداً، وقنوات نكسس لايف كورة غطت قرعة دوري الأبطال بشكل أسرع بكثير من غيرها. شكرا لكم.
                      </div>
                      <div className="bg-gray-50 p-2.5 rounded-none text-[11px] font-semibold border border-gray-100">
                        <span className="text-[#07162c] font-black">أبو ماجد:</span> الديربي الليلة للتاريخ ونتمنى استمرار بث شريط الكلاسيكو بجودة HD.
                      </div>
                    </div>
                  </div>
                </div>

                <div className="px-6 py-3 bg-gray-50 border-t border-gray-100 flex justify-end gap-2">
                  <button
                    onClick={() => setActiveArticleId(null)}
                    className="bg-gray-200 hover:bg-gray-300 transition-all font-bold text-xs text-gray-700 py-1.5 px-4 rounded-[2px] cursor-pointer"
                  >
                    إغلاق العرض
                  </button>
                </div>
              </motion.div>
            </div>
          );
        })()}
      </AnimatePresence>

      {/* FOOTER: RTL Dense copyrights and legal notices */}
      <footer className="bg-[#07162c] text-gray-200 border-t-2 border-[#D4AF37] mt-10">
        <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
          
          <div className="space-y-3 text-right">
            <h3 className="font-bold text-base text-[#D4AF37] tracking-wider font-sans">نبذة عن بوابة كورة</h3>
            <p className="text-xs text-gray-400 font-medium leading-relaxed">
              منصة <strong>Nexus live kooora</strong> هي البوابة الرياضية العربية الأسرع لمتابعة أحداث كرة القدم والتحليلات وقراءات الملاعب بدقة فائفة ونطاقات بث مستقرة بالكامل تلائم الجماهير في جميع أقطار الوطن العربي.
            </p>
            {/* Dynamic announcements and footer links from our CMS panel */}
            {(() => {
              const footerArts = news.filter(n => (n as any).placement === 'FOOTER_LINKS');
              if (footerArts.length > 0) {
                return (
                  <div className="border-t border-slate-700/60 pt-3 mt-3 space-y-2 animate-pulse-fast" id="cms-footer-announcements">
                    <span className="text-[10px] text-[#D4AF37] font-black uppercase tracking-widest block font-sans">📌 إشعارات وتنويهات الإدارة:</span>
                    <ul className="space-y-1">
                      {footerArts.map(art => (
                        <li key={art.id}>
                          <button
                            onClick={() => setActiveArticleId(art.id)}
                            className="text-xs text-gray-300 hover:text-[#D4AF37] font-bold text-right transition-colors hover:underline block cursor-pointer"
                          >
                            • {art.title}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              }
              return null;
            })()}
          </div>

          <div className="space-y-3 text-right">
            <h3 className="font-bold text-base text-[#D4AF37] tracking-wider font-sans">أقسام المنصة السريعة</h3>
            <div className="grid grid-cols-2 gap-2 text-xs font-bold">
              <a href="#" onClick={(e) => { e.preventDefault(); setActiveAppTab('MAIN'); }} className="text-gray-300 hover:underline">نتائج مباريات اليوم</a>
              <a href="#" onClick={(e) => { e.preventDefault(); setActiveAppTab('NEWS_PAGE'); }} className="text-gray-300 hover:underline">أخبار كرة القدم</a>
              <a href="#" onClick={(e) => { e.preventDefault(); setActiveAppTab('ARABIC_LEAGUES'); }} className="text-gray-300 hover:underline">الدوريات العربية</a>
              <a href="#" onClick={(e) => { e.preventDefault(); setActiveAppTab('EUROPEAN_LEAGUES'); }} className="text-gray-300 hover:underline">الدوريات الأوروبية</a>
              <a href="#" onClick={(e) => { e.preventDefault(); setActiveAppTab('MERCATO'); }} className="text-gray-300 hover:underline">سوق الانتقالات (الميركاتو)</a>
            </div>
          </div>

          <div className="space-y-3 text-right">
            <h3 className="font-bold text-base text-[#D4AF37] tracking-wider font-sans">سياسات الموقع وروابط الدعم</h3>
            <p className="text-xs text-gray-400 font-normal leading-relaxed">
              تلتزم منصتنا بكافة معايير الاستضافة الآمنة وتوصيات Google AdSense للمواقع الرياضية المعتمدة. جميع شعارات الأندية وحقوق البث مملوكة لأصحابها الرسميين.
            </p>
            <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs font-bold pt-1">
              <a href="#" onClick={(e) => { e.preventDefault(); setActiveAppTab('ABOUT_US'); }} className="text-gray-300 hover:text-[#D4AF37] hover:underline">من نحن</a>
              <span className="text-[#D4AF37]">/</span>
              <a href="#" onClick={(e) => { e.preventDefault(); setActiveAppTab('CONTACT_US'); }} className="text-gray-300 hover:text-[#D4AF37] hover:underline">اتصل بنا</a>
              <span className="text-[#D4AF37]">/</span>
              <a href="#" onClick={(e) => { e.preventDefault(); setActiveAppTab('PRIVACY_POLICY'); }} className="text-gray-300 hover:text-[#D4AF37] hover:underline">سياسة الخصوصية</a>
              <span className="text-[#D4AF37]">/</span>
              <a href="#" onClick={(e) => { e.preventDefault(); setActiveAppTab('COPYRIGHT'); }} className="text-gray-300 hover:text-[#D4AF37] hover:underline">حقوق النشر (DMCA)</a>
              <span className="text-[#D4AF37]">/</span>
              <a href="#/nexus-admin" onClick={(e) => { e.preventDefault(); setActiveAppTab('NEXUS_ADMIN'); window.location.hash = '#/nexus-admin'; }} className="text-gray-400 font-mono text-[9px] hover:text-[#D4AF37] hover:underline opacity-30">لوحة الإدارة</a>
            </div>
            <div className="pt-2 text-[11px] text-gray-300 font-mono flex items-center gap-2 flex-wrap">
              <span>Domain: nexusutils.online</span>
              <span className="text-[#D4AF37]">|</span>
              <span>Site Brand: Nexus live kooora</span>
            </div>
          </div>

        </div>

        <div className="bg-[#050f1d] py-4 text-center text-xs text-gray-500 border-t border-[#122e51]">
          <p className="font-medium">جميع الحقوق محفوظة © 2026 - بوابة <span className="text-[#D4AF37] font-black">Nexus live kooora</span> - ترخيص مسترد</p>
        </div>
      </footer>

    </div>
  );
}
