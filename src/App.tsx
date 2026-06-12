import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link, useParams } from 'react-router-dom';
import { Trophy, Calendar, Radio, Globe, Play, RefreshCw, FileText, Info, Users } from 'lucide-react';

/* ==========================================================================
   1. API CONFIGURATION & TRANSLATION DICTIONARY (قاموس الترجمة التلقائية للسيو العربي)
   ========================================================================== */
// يمكنك الحصول على مفتاح مجاني من موقع API-Football وضعه هنا
const API_KEY = "8cd82cd6aef655f725a40158b4413ed8"; 
const API_URL = "https://v3.football.api-sports.io/fixtures?date=";

const translateToArabic = (text: string): string => {
  const dictionary: { [key: string]: string } = {
    "UEFA Champions League": "دوري أبطال أوروبا",
    "Premier League": "الدوري الإنجليزي الممتاز",
    "La Liga": "الدوري الإسباني",
    "Real Madrid": "ريال مدريد",
    "Liverpool": "ليفربول",
    "Barcelona": "برشلونة",
    "Manchester City": "مانشستر سيتي",
    "Arsenal": "أرسنال",
    "Paris Saint Germain": "باريس سان جيرمان",
    "Bayern Munich": "بايرن ميونخ",
    "Not Started": "لم تبدأ بعد",
    "First Half": "مباشر - الشوط الأول",
    "Second Half": "مباشر - الشوط الثاني",
    "Halftime": "استراحة بين الشوطين",
    "Match Finished": "انتهت المباراة"
  };
  return dictionary[text] || text;
};

// دالة توليد روابط السيو التلقائية المفرغة بشرطات
const generateSlug = (text: string) => {
  return text.toLowerCase().replace(/[^a-z0-9ㄱ-ㅎㅏ-ㅣ가-힣أ-ي\s]/g, '').replace(/\s+/g, '-');
};

/* ==========================================================================
   2. DYNAMIC LIVE SPORTS API FETCHING ENGINE (محرك جلب البيانات الذكي)
   ========================================================================== */
const fetchLiveGamesFromAPI = async (dateString: string) => {
  try {
    // ميزة الكاش الذكي لحماية خطتك المجانية من النفاد عند كثرة الزوار
    const cacheKey = `kora_matrix_api_${dateString}`;
    const cached = localStorage.getItem(cacheKey);
    const cacheTime = localStorage.getItem(`${cacheKey}_time`);
    if (cached && cacheTime && Date.now() - parseInt(cacheTime) < 45000) {
      return JSON.parse(cached);
    }

    // إذا لم يوجد كاش، يتصل بالـ API العالمي فوراً
    const response = await fetch(`${API_URL}${dateString}`, {
      method: "GET",
      headers: {
        "x-rapidapi-host": "v3.football.api-sports.io",
        "x-rapidapi-key": API_KEY
      }
    });
    const data = await response.json();
    
    // إعادة هيكلة البيانات القادمة لتتوافق مع تصميم موقعك ثنائي اللغة
    const formattedMatches = data.response.map((item: any) => {
      const homeNameEn = item.teams.home.name;
      const awayNameEn = item.teams.away.name;
      const leagueNameEn = item.league.name;
      const statusEn = item.fixture.status.long;

      return {
        id: item.fixture.id.toString(),
        slug_en: generateSlug(`${homeNameEn}-vs-${awayNameEn}`),
        slug_ar: generateSlug(`مباراة-${translateToArabic(homeNameEn)}-ضد-${translateToArabic(awayNameEn)}`),
        league_en: leagueNameEn,
        league_ar: translateToArabic(leagueNameEn),
        time: new Date(item.fixture.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }),
        score: item.goals.home !== null ? `${item.goals.home} - ${item.goals.away}` : "0 - 0",
        status_en: statusEn,
        status_ar: translateToArabic(statusEn),
        homeTeam_en: homeNameEn,
        homeTeam_ar: translateToArabic(homeNameEn),
        awayTeam_en: awayNameEn,
        awayTeam_ar: translateToArabic(awayNameEn),
        homeLogo: item.teams.home.logo,
        awayLogo: item.teams.away.logo,
        stadium_en: item.fixture.venue.name || "Main Stadium",
        stadium_ar: item.fixture.venue.name ? "ملعب المباراة" : "الملعب الرئيسي",
        embedUrl: "" // يتم سحبه ديناميكياً من Firebase بمطابقة الـ ID عند رغبتك في وضع بث للمباراة
      };
    });

    localStorage.setItem(cacheKey, JSON.stringify(formattedMatches));
    localStorage.setItem(`${cacheKey}_time`, Date.now().toString());
    return formattedMatches;
  } catch (error) {
    console.error("API Connection Error, falling back to secure simulation Mode", error);
    return [];
  }
};

/* ==========================================================================
   3. MAIN APPLICATION ROUTER & LAYOUT
   ========================================================================== */
export default function App() {
  const [isArabic, setIsArabic] = useState<boolean>(true);

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col antialiased" dir={isArabic ? 'rtl' : 'ltr'}>
        
        <header className="bg-slate-950 border-b border-slate-800 sticky top-0 z-50 shadow-xl">
          <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2">
              <div className="bg-gradient-to-r from-emerald-600 to-teal-500 text-white p-2 rounded-xl font-black text-lg tracking-wider shadow-md">
                KORA<span className="text-amber-400 font-bold font-mono">MATRIX</span>
              </div>
            </Link>
            <div className="flex items-center gap-3">
              <button onClick={() => setIsArabic(!isArabic)} className="flex items-center gap-1 bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-xl text-xs font-bold text-amber-400 transition-all">
                <Globe className="h-3.5 w-3.5" />
                <span>{isArabic ? "English" : "العربية"}</span>
              </button>
              <Link to="/" className="bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-black px-3 py-1.5 rounded-xl text-xs transition-all">
                {isArabic ? "الرئيسية" : "Home"}
              </Link>
            </div>
          </div>
        </header>

        <main className="flex-grow max-w-6xl w-full mx-auto px-4 py-6">
          <Routes>
            <Route path="/" element={<HomeDashboard isArabic={isArabic} />} />
            <Route path="/match/:slug" element={<MatchDetailPage isArabic={isArabic} />} />
          </Routes>
        </main>

        <footer className="bg-slate-950 border-t border-slate-800 py-6 text-center text-slate-500 text-[11px] px-4 space-y-2">
          <p>{isArabic ? "كوراماتريكس © 2026 - نظام الأتمتة الرياضية الذكي عبر الـ API" : "KoraMatrix © 2026 - Automated API Live Network"}</p>
          <p className="max-w-4xl mx-auto text-slate-600 leading-relaxed">
            {isArabic ? "جميع حقوق البيانات محفوظة للشركات المزودة للإحصائيات الحية والنتائج الفورية." : "Live feeds and technical match data properties are delivered via authorized global sports database networks."}
          </p>
        </footer>

      </div>
    </BrowserRouter>
  );
}

/* ==========================================================================
   4. HOME DASHBOARD (جدول مباريات اليوم الآلي بالكامل)
   ========================================================================== */
function HomeDashboard({ isArabic }: { isArabic: boolean }) {
  const [matches, setMatches] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // الحصول على تاريخ اليوم بصيغة YYYY-MM-DD المطلوبة للـ API
    const todayStr = new Date().toISOString().split('T')[0];
    fetchLiveGamesFromAPI(todayStr).then((data) => {
      setMatches(data);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <div className="text-center py-24 space-y-3 font-mono text-xs text-slate-500">
        <div className="h-6 w-6 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
        <p>{isArabic ? "اتصال آمن.. جاري سحب مباريات اليوم من السيرفر العالمي..." : "Connecting to global API sports database..."}</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="bg-slate-950 border border-slate-850 p-4 rounded-2xl text-center min-h-[90px] flex items-center justify-center relative">
        <span className="absolute top-1 right-2 text-[9px] font-mono text-slate-700">ADVERTISEMENT</span>
        <div className="text-xs font-mono text-slate-500">{isArabic ? "مساحة إعلان قوقل أدسنس التلقائي" : "Google AdSense Live Feed Asset"}</div>
      </div>

      <div className="space-y-3">
        {matches.length === 0 ? (
          <div className="text-center py-12 bg-slate-950 rounded-2xl border border-slate-850 text-slate-500 text-xs font-mono">
            {isArabic ? "انتهت مباريات اليوم أو لا توجد داتا نشطة حالياً." : "No active matches found in the API feed for today."}
          </div>
        ) : (
          matches.map((match) => (
            <div key={match.id} className="bg-slate-950 border border-slate-850 rounded-2xl overflow-hidden shadow-lg hover:border-emerald-500/20 transition-all">
              <div className="bg-slate-900/60 px-4 py-2 border-b border-slate-850 flex items-center justify-between text-xs font-bold text-slate-400">
                <div className="flex items-center gap-1.5">
                  <Trophy className="h-3.5 w-3.5 text-amber-400" />
                  <h2>{isArabic ? match.league_ar : match.league_en}</h2>
                </div>
                <span className="font-mono text-[10px] text-slate-500">{match.time}</span>
              </div>

              <Link to={`/match/${isArabic ? match.slug_ar : match.slug_en}`} className="block p-4 sm:p-5 hover:bg-slate-900/20 transition-all group">
                <div className="grid grid-cols-3 items-center gap-2 text-center">
                  <div className={`flex items-center gap-2.5 font-black text-xs sm:text-sm ${isArabic ? 'justify-start text-right' : 'justify-end text-left'}`}>
                    <img src={match.homeLogo} alt="" className="h-5 w-5 object-contain" />
                    <span className="truncate group-hover:text-emerald-400 transition-colors">{isArabic ? match.homeTeam_ar : match.homeTeam_en}</span>
                  </div>

                  <div className="flex flex-col items-center justify-center space-y-1">
                    <div className="font-mono font-black text-xs sm:text-sm bg-slate-900 px-3 py-1 rounded-xl border border-slate-800 text-amber-400 shadow-inner">
                      {match.score}
                    </div>
                    <span className="text-[9px] font-bold px-2 py-0.5 rounded bg-emerald-950/50 text-emerald-400 border border-emerald-900/20">
                      {isArabic ? match.status_ar : match.status_en}
                    </span>
                  </div>

                  <div className={`flex items-center gap-2.5 font-black text-xs sm:text-sm ${isArabic ? 'justify-end text-left flex-row-reverse' : 'justify-start text-right flex-row-reverse'}`}>
                    <img src={match.awayLogo} alt="" className="h-5 w-5 object-contain" />
                    <span className="truncate group-hover:text-emerald-400 transition-colors">{isArabic ? match.awayTeam_ar : match.awayTeam_en}</span>
                  </div>
                </div>
              </Link>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

/* ==========================================================================
   5. MATCH DETAIL PAGE (صفحة التحليل المتقدم والبث الحي الذكي)
   ========================================================================= */
function MatchDetailPage({ isArabic }: { isArabic: boolean }) {
  const { slug } = useParams<{ slug: string }>();
  const [match, setMatch] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isPlayerActive, setIsPlayerActive] = useState<boolean>(false);

  useEffect(() => {
    const todayStr = new Date().toISOString().split('T')[0];
    fetchLiveGamesFromAPI(todayStr).then((data) => {
      const found = data.find(m => m.slug_ar === slug || m.slug_en === slug);
      setMatch(found);
      setLoading(false);
    });
  }, [slug]);

  if (loading) return <div className="text-center py-20 font-mono text-xs text-slate-600">Syncing Match Room...</div>;
  if (!match) return <div className="text-center py-20 font-mono text-xs text-red-400">Match Node Offline</div>;

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-b from-slate-950 to-slate-900 border border-slate-850 rounded-3xl p-5 shadow-2xl">
        <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-4 text-center">
          <div className="flex items-center gap-3 justify-center md:justify-start">
            <img src={match.homeLogo} alt="" className="h-10 w-10 object-contain bg-slate-950 p-1.5 rounded-xl border border-slate-800" />
            <h1 className="font-black text-base sm:text-lg text-white">{isArabic ? match.homeTeam_ar : match.homeTeam_en}</h1>
          </div>
          <div className="space-y-1 py-2 border-y md:border-y-0 md:border-x border-slate-800">
            <span className="text-[10px] bg-slate-950 px-2.5 py-0.5 rounded-full text-slate-400 border border-slate-850 font-bold">{isArabic ? match.league_ar : match.league_en}</span>
            <div className="text-xl font-black font-mono text-amber-400 tracking-wider">{match.score}</div>
            <span className="text-[9px] font-mono bg-red-950/40 text-red-400 px-2 rounded">{isArabic ? match.status_ar : match.status_en}</span>
          </div>
          <div className="flex items-center gap-3 justify-center md:justify-start md:flex-row-reverse">
            <img src={match.awayLogo} alt="" className="h-10 w-10 object-contain bg-slate-950 p-1.5 rounded-xl border border-slate-800" />
            <h2 className="font-black text-base sm:text-lg text-white">{isArabic ? match.awayTeam_ar : match.awayTeam_en}</h2>
          </div>
        </div>
      </div>

      {/* بوابة تفعيل البث الآمن المربوط بالفايربيس */}
      <div className="bg-slate-950 border border-slate-850 rounded-2xl p-4 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-900 pb-2">
          <span className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
            <Radio className="h-4 w-4 text-emerald-400" /> {isArabic ? "شاشة البث المباشر والإحصائيات التفاعلية" : "Live Streaming Matrix Gateway"}
          </span>
        </div>

        {!isPlayerActive ? (
          <div className="bg-slate-900 border border-slate-850 aspect-video w-full max-w-xl mx-auto rounded-xl flex flex-col items-center justify-center text-center p-6 space-y-3 shadow-inner">
            <Play className="h-10 w-10 text-emerald-400 bg-emerald-950/60 p-2.5 rounded-full animate-pulse" />
            <p className="text-xs font-bold text-slate-300">{isArabic ? "انقر لتفعيل مشغل البث والتحليل الإحصائي الحي للمباراة" : "Click to initialize secure media server for this event"}</p>
            <button onClick={() => setIsPlayerActive(true)} className="bg-gradient-to-r from-emerald-500 to-teal-600 text-slate-950 font-black text-xs px-6 py-2 rounded-xl shadow-md transition-all">
              {isArabic ? "تفعيل المشغل الحي" : "Connect Live Server"}
            </button>
          </div>
        ) : (
          <div className="aspect-video w-full max-w-xl mx-auto rounded-xl overflow-hidden border border-slate-900 bg-black relative">
            <div className="text-xs text-slate-600 flex items-center justify-center h-full font-mono">{isArabic ? "بوابة الأمان: يرجى ربط الـ embedUrl الخاص بالفايربيس لتشغيل الفيديو." : "Security Token: Link your Firebase stream hook to execute embed player."}</div>
          </div>
        )}
      </div>

      <div className="bg-slate-950 border border-slate-850 rounded-2xl p-5">
        <article className="text-xs sm:text-sm text-slate-400 leading-relaxed font-light space-y-2">
          <h3 className="font-bold text-slate-200 text-base">{isArabic ? `تحليل وموعد مباراة ${match.homeTeam_ar} وضد ${match.awayTeam_ar}` : `Match Report: ${match.homeTeam_en} vs ${match.awayTeam_en}`}</h3>
          <p>
            {isArabic 
              ? `بث مباشر ومتابعة حية لمباراة ${match.homeTeam_ar} ضد ${match.awayTeam_ar} برسم مواجهات بطولة ${match.league_ar}. تقام هذه الملحمة الكروية اليوم على أرضية وملعب ${match.stadium_ar} حيث يبحث كلا الفريقين عن انتزاع الثلاث نقاط الثمينة وتأكيد الصدارة وسط ترقب جماهيري عالمي وعربي كبير.`
              : `Welcome to the live analytical breakdown of ${match.homeTeam_en} going head-to-head against ${match.awayTeam_en} in the tournament ${match.league_en}. The highly anticipated tactical matchup is hosted at ${match.stadium_en} with massive global viewership forecasts.`}
          </p>
        </article>
      </div>
    </div>
  );
}
