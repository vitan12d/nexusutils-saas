import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Dashboard from './components/Dashboard';
import MatchDetail from './components/MatchDetail';
import NewsDetail from './components/NewsDetail';
import LoadingSkeleton from './components/LoadingSkeleton';
import { TermsPage, PrivacyPage, DmcaPage } from './components/LegalPages';
import { Match, NewsArticle } from './types';
import { AlertTriangle, Home, Database, RefreshCw, Wifi, Clock, Zap } from 'lucide-react';
import { collection, onSnapshot } from 'firebase/firestore';
import { db, seedFirestoreIfNeeded } from './firebase';
import { generateSlug } from './utils/slug';

// Helper to capture base path if deployed in subfolders (e.g. /koora)
export const getBasePath = (): string => {
  const path = window.location.pathname;
  const matchIdx = path.indexOf('/match/');
  const newsIdx = path.indexOf('/news/');
  if (matchIdx !== -1) {
    return path.substring(0, matchIdx);
  }
  if (newsIdx !== -1) {
    return path.substring(0, newsIdx);
  }
  return path.endsWith('/') ? path.slice(0, -1) : path;
};

// Global navigation helper to prevent application reload
export const navigateTo = (route: string, e?: React.MouseEvent) => {
  if (e) {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    e.preventDefault();
  }
  window.history.pushState({}, '', route);
  window.dispatchEvent(new PopStateEvent('popstate'));
};

const CACHE_TTL = 30 * 1000; // 30-second TTL

export default function App() {
  const [matches, setMatches] = useState<Match[]>([]);
  const [apiMatches, setApiMatches] = useState<Match[]>([]);
  const [newsArticles, setNewsArticles] = useState<NewsArticle[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [apiLoading, setApiLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isSeeding, setIsSeeding] = useState<boolean>(false);
  const [currentRoute, setCurrentRoute] = useState<{ type: 'dashboard' | 'match' | 'news' | 'terms' | 'privacy' | 'dmca'; id?: string }>({
    type: 'dashboard',
  });

  // Client-Side cache states
  const [isLiveConnected, setIsLiveConnected] = useState<boolean>(false);
  const [cacheCountdown, setCacheCountdown] = useState<number>(0);

  // Combine Firestore/Mock matches with real API-sports matches
  const combinedMatches = [...matches];
  apiMatches.forEach((apiMatch) => {
    if (!combinedMatches.some((m) => m.id === apiMatch.id)) {
      combinedMatches.push(apiMatch);
    }
  });

  const fetchApiFixtures = async () => {
    try {
      setApiLoading(true);
      const dates = ['2026-06-10', '2026-06-11', '2026-06-12'];
      const allFetched: Match[] = [];
      
      await Promise.all(
        dates.map(async (dt) => {
          try {
            const res = await fetch(`/api/fixtures?date=${dt}`);
            if (res.ok) {
              const data = await res.json();
              if (Array.isArray(data)) {
                allFetched.push(...data);
              }
            }
          } catch (e) {
            console.error(`Failed to fetch API fixtures for ${dt}:`, e);
          }
        })
      );
      
      if (allFetched.length > 0) {
        setApiMatches(allFetched);
      }
    } catch (err) {
      console.error('API fixtures loading failed:', err);
    } finally {
      setApiLoading(false);
    }
  };

  useEffect(() => {
    fetchApiFixtures();
  }, []);

  // Dynamic entity resolvers for bilingual slug routing
  const resolveMatch = (slugOrId: string | undefined): Match | undefined => {
    if (!slugOrId) return undefined;
    
    // 1. Direct exact ID match
    const exact = combinedMatches.find((m) => m.id === slugOrId);
    if (exact) return exact;

    // 2. Format is "id-slug", check if prefixed with "id-"
    const prefixed = combinedMatches.find((m) => slugOrId.startsWith(m.id + '-'));
    if (prefixed) return prefixed;

    // 3. Fallback: match using generateSlug directly
    const slugMatch = combinedMatches.find((m) => {
      const matchSlug = generateSlug(`${m.homeTeam.name} vs ${m.awayTeam.name}`);
      return slugOrId === matchSlug || slugOrId.endsWith('-' + matchSlug);
    });
    if (slugMatch) return slugMatch;

    return undefined;
  };

  const resolveNews = (slugOrId: string | undefined): NewsArticle | undefined => {
    if (!slugOrId) return undefined;

    // 1. Direct exact ID match
    const exact = newsArticles.find((a) => a.id === slugOrId);
    if (exact) return exact;

    // 2. Format is "id-slug", check if prefixed with "id-"
    const prefixed = newsArticles.find((a) => slugOrId.startsWith(a.id + '-'));
    if (prefixed) return prefixed;

    // 3. Fallback: match using generateSlug directly
    const slugMatch = newsArticles.find((a) => {
      const newsSlug = generateSlug(a.title);
      return slugOrId === newsSlug || slugOrId.endsWith('-' + newsSlug);
    });
    if (slugMatch) return slugMatch;

    return undefined;
  };

  // Helper to load valid cache and return remaining TTL seconds
  const loadCacheAndGetTTL = (): number => {
    try {
      const matchesCache = localStorage.getItem('koora_matches_cache');
      const newsCache = localStorage.getItem('koora_news_cache');
      const timestampCache = localStorage.getItem('koora_cache_timestamp');

      if (matchesCache && newsCache && timestampCache) {
        const timestamp = parseInt(timestampCache, 10);
        const elapsed = Date.now() - timestamp;
        if (elapsed < CACHE_TTL) {
          setMatches(JSON.parse(matchesCache));
          setNewsArticles(JSON.parse(newsCache));
          return Math.ceil((CACHE_TTL - elapsed) / 1000);
        }
      }
    } catch (e) {
      console.warn('Cache deserialization failed:', e);
    }
    return 0;
  };

  // 1. Dynamic Live score/news DB real-time observer + 30-sec caching
  useEffect(() => {
    let unsubscribeMatches: () => void = () => {};
    let unsubscribeNews: () => void = () => {};
    let countdownInterval: any = null;

    const startDatabaseObserver = async () => {
      try {
        setError(null);
        await seedFirestoreIfNeeded();

        // Subscribe matches stream
        unsubscribeMatches = onSnapshot(
          collection(db, 'matches'),
          (snapshot) => {
            const matchesList: Match[] = [];
            snapshot.forEach((doc) => {
              matchesList.push(doc.data() as Match);
            });
            setMatches(matchesList);
            setIsLiveConnected(true);
            setIsLoading(false);
            setCacheCountdown(0);
            
            try {
              localStorage.setItem('koora_matches_cache', JSON.stringify(matchesList));
              localStorage.setItem('koora_cache_timestamp', Date.now().toString());
            } catch (e) {}
          },
          (err) => {
            console.error('Matches snapshot failed:', err);
            setError('Failed to establish connection to the remote sports server.');
            setIsLoading(false);
          }
        );

        // Subscribe news stream
        unsubscribeNews = onSnapshot(
          collection(db, 'news'),
          (snapshot) => {
            const newsList: NewsArticle[] = [];
            snapshot.forEach((doc) => {
              newsList.push(doc.data() as NewsArticle);
            });
            setNewsArticles(newsList);
            setIsLiveConnected(true);
            setIsLoading(false);
            setCacheCountdown(0);

            try {
              localStorage.setItem('koora_news_cache', JSON.stringify(newsList));
              localStorage.setItem('koora_cache_timestamp', Date.now().toString());
            } catch (e) {}
          },
          (err) => {
            console.error('News snapshot failed:', err);
            setError('Failed to establish connection to remote editorial server.');
            setIsLoading(false);
          }
        );
      } catch (err: any) {
        console.error('Database connection failed:', err);
        setError(err?.message || 'Database initialization error.');
        setIsLoading(false);
      }
    };

    const remainingSecs = loadCacheAndGetTTL();
    if (remainingSecs > 0) {
      setIsLoading(false);
      setIsLiveConnected(false);
      setCacheCountdown(remainingSecs);

      let tick = remainingSecs;
      countdownInterval = setInterval(() => {
        tick--;
        setCacheCountdown(Math.max(0, tick));
        if (tick <= 0) {
          clearInterval(countdownInterval);
          startDatabaseObserver();
        }
      }, 1000);
    } else {
      setIsLoading(true);
      startDatabaseObserver();
    }

    return () => {
      unsubscribeMatches();
      unsubscribeNews();
      if (countdownInterval) clearInterval(countdownInterval);
    };
  }, []);

  // 2. URL state observer for custom lightweight multi-tab routing support
  useEffect(() => {
    const handleUrlChange = () => {
      const pathname = window.location.pathname;
      const params = new URLSearchParams(window.location.search);
      const matchId = params.get('match');
      const newsId = params.get('news');

      if (matchId) {
        setCurrentRoute({ type: 'match', id: matchId });
        return;
      }
      if (newsId) {
        setCurrentRoute({ type: 'news', id: newsId });
        return;
      }

      const pathParts = pathname.split('/');
      const matchIndex = pathParts.indexOf('match');
      const newsIndex = pathParts.indexOf('news');

      if (pathParts.includes('terms') || pathname.endsWith('/terms')) {
        setCurrentRoute({ type: 'terms' });
      } else if (pathParts.includes('privacy') || pathname.endsWith('/privacy')) {
        setCurrentRoute({ type: 'privacy' });
      } else if (pathParts.includes('dmca') || pathname.endsWith('/dmca')) {
        setCurrentRoute({ type: 'dmca' });
      } else if (matchIndex !== -1 && pathParts[matchIndex + 1]) {
        setCurrentRoute({ type: 'match', id: pathParts[matchIndex + 1] });
      } else if (newsIndex !== -1 && pathParts[newsIndex + 1]) {
        setCurrentRoute({ type: 'news', id: pathParts[newsIndex + 1] });
      } else {
        setCurrentRoute({ type: 'dashboard' });
      }
    };

    handleUrlChange();
    window.addEventListener('popstate', handleUrlChange);
    return () => window.removeEventListener('popstate', handleUrlChange);
  }, []);

  // 3. Dynamic SEO Metadata Sync (Runs on-the-fly when route or data updates)
  useEffect(() => {
    let title = "Koora Live - Football Live Score & Sports Analytics Platform";
    let description = "Real-time soccer match scores, tactical lineup analysis, official broadcasting TV channels, and legal live stream commentary.";

    if (currentRoute.type === 'match' && currentRoute.id) {
      const activeMatch = resolveMatch(currentRoute.id);
      if (activeMatch) {
        title = `Live Score: ${activeMatch.homeTeam.name} vs ${activeMatch.awayTeam.name} | ${activeMatch.displayTime} Stream`;
        description = activeMatch.reportTitle || `Watch live score updates and real-time lineup stats for ${activeMatch.homeTeam.name} vs ${activeMatch.awayTeam.name} played in ${activeMatch.stadium}.`;
      }
    } else if (currentRoute.type === 'news' && currentRoute.id) {
      const activeArticle = resolveNews(currentRoute.id);
      if (activeArticle) {
        title = `${activeArticle.title} | Sports Editorial`;
        description = activeArticle.summary;
      }
    }

    // Dynamic browser header updates
    document.title = title;

    // Search Engine Optimization Tags Injector
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', description);

    // OpenGraph Social Previews Tags Injector
    let ogTitle = document.querySelector('meta[property="og:title"]');
    if (!ogTitle) {
      ogTitle = document.createElement('meta');
      ogTitle.setAttribute('property', 'og:title');
      document.head.appendChild(ogTitle);
    }
    ogTitle.setAttribute('content', title);

    let ogDesc = document.querySelector('meta[property="og:description"]');
    if (!ogDesc) {
      ogDesc = document.createElement('meta');
      ogDesc.setAttribute('property', 'og:description');
      document.head.appendChild(ogDesc);
    }
    ogDesc.setAttribute('content', description);
  }, [currentRoute, matches, newsArticles]);

  const handleForceSeed = async () => {
    try {
      setIsSeeding(true);
      await seedFirestoreIfNeeded(true);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSeeding(false);
    }
  };

  const handleManualSync = async () => {
    setIsLoading(true);
    setError(null);
    localStorage.removeItem('koora_cache_timestamp');
    setCacheCountdown(0);
    
    // Triggers full layout re-render via state update
    window.location.reload();
  };

  const liveCount = matches.filter((m) => m.status === 'LIVE').length;

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const renderContent = () => {
    if (isLoading) {
      return <LoadingSkeleton />;
    }

    if (error) {
      return (
        <div className="max-w-xl mx-auto px-6 py-16 text-center space-y-6" id="error-screen">
          <div className="w-16 h-16 bg-red-950/40 text-red-500 rounded-full flex items-center justify-center mx-auto border border-red-500/10">
            <AlertTriangle className="w-8 h-8" />
          </div>
          <div className="space-y-2">
            <h2 className="text-xl font-bold text-slate-100">Database Connection Issue</h2>
            <p className="text-slate-400 text-sm leading-relaxed">
              {error}
            </p>
          </div>
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 text-left space-y-3">
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-300 font-mono">
              <Database className="w-4 h-4 text-emerald-400" /> Administrative Controls
            </div>
            <p className="text-xs text-slate-400 leading-normal">
              If this is a fresh setup, you might need to re-seed or verify credentials in your Local Firebase Applet Config.
            </p>
            <button
              onClick={handleForceSeed}
              disabled={isSeeding}
              className="w-full flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold py-2 px-4 rounded text-xs transition-colors disabled:opacity-50"
            >
              {isSeeding ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : null}
              {isSeeding ? 'Seeding Database...' : 'Force Database Seeding'}
            </button>
          </div>
        </div>
      );
    }

    switch (currentRoute.type) {
      case 'match': {
        const activeMatch = resolveMatch(currentRoute.id);
        if (!activeMatch) {
          return (
            <div className="max-w-7xl mx-auto px-4 py-16 text-center space-y-4">
              <div className="w-16 h-16 bg-red-950/40 text-red-500 rounded-full flex items-center justify-center mx-auto border border-red-500/10">
                <AlertTriangle className="w-8 h-8" />
              </div>
              <h2 className="text-xl font-bold text-slate-100">Match Profile Not Found</h2>
              <p className="text-slate-400 text-sm max-w-sm mx-auto">
                The requested match score record does not exist or may have expired from our active indexing cycle.
              </p>
              <a 
                href={getBasePath() || '/'} 
                onClick={(e) => navigateTo(getBasePath() || '/', e)}
                className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded text-xs transition-colors mt-2 text-sm"
              >
                <Home className="w-4 h-4" /> Go to Scoreboard
              </a>
            </div>
          );
        }
        return <MatchDetail match={activeMatch} />;
      }
      case 'news': {
        const activeArticle = resolveNews(currentRoute.id);
        if (!activeArticle) {
          return (
            <div className="max-w-7xl mx-auto px-4 py-16 text-center space-y-4">
              <div className="w-16 h-16 bg-red-950/40 text-red-500 rounded-full flex items-center justify-center mx-auto border border-red-500/10">
                <AlertTriangle className="w-8 h-8" />
              </div>
              <h2 className="text-xl font-bold text-slate-100">Article Profile Not Found</h2>
              <p className="text-slate-400 text-sm max-w-sm mx-auto">
                The soccer report you are trying to view does not exist on our servers.
              </p>
              <a 
                href={getBasePath() || '/'} 
                onClick={(e) => navigateTo(getBasePath() || '/', e)}
                className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded text-xs transition-colors mt-2 text-sm"
              >
                <Home className="w-4 h-4" /> Return Home
              </a>
            </div>
          );
        }
        return <NewsDetail article={activeArticle} />;
      }
      case 'terms':
        return <TermsPage onBack={(e) => navigateTo(getBasePath() || '/', e)} />;
      case 'privacy':
        return <PrivacyPage onBack={(e) => navigateTo(getBasePath() || '/', e)} />;
      case 'dmca':
        return <DmcaPage onBack={(e) => navigateTo(getBasePath() || '/', e)} />;
      case 'dashboard':
      default:
        return <Dashboard matches={combinedMatches} newsArticles={newsArticles} searchQuery={searchQuery} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#0F1115] text-slate-100 flex flex-col font-sans antialiased selection:bg-emerald-500 selection:text-slate-950">
      {/* 1. Header component */}
      <Header onSearch={handleSearch} liveCount={liveCount} />

      {/* 2. Real-Time Hub / Cache Caching telemetry notification banner bar */}
      <div className="bg-slate-950 border-b border-slate-900 px-4 py-2">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
          <div className="flex items-center gap-2.5 font-mono text-xs text-slate-400">
            {cacheCountdown > 0 ? (
              <div className="flex items-center gap-2 text-amber-400/90 font-semibold">
                <Clock className="w-3.5 h-3.5" />
                <span>Performance Caching Active (Syncing in {cacheCountdown}s)</span>
              </div>
            ) : isLiveConnected ? (
              <div className="flex items-center gap-2 text-emerald-400 font-semibold">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span>Real-Time Football Hub Stream Connected</span>
              </div>
            ) : (
              <div className="flex items-center gap-2 text-indigo-400">
                <Zap className="w-3.5 h-3.5 animate-bounce" />
                <span>Synchronizing Score feeds...</span>
              </div>
            )}
          </div>
          
          <div className="flex items-center gap-3 self-end sm:self-auto">
            <button
              onClick={handleManualSync}
              className="flex items-center gap-1 bg-slate-900 hover:bg-slate-850 hover:text-slate-100 border border-slate-800 text-[10px] font-mono font-bold text-slate-400 px-2 py-1 rounded transition-all cursor-pointer"
              title="Invalidate 30-sec cache and download fresh matches data instantly"
            >
              <RefreshCw className={`w-3 h-3 ${isLoading ? 'animate-spin' : ''}`} /> Reset & Force Sync
            </button>
          </div>
        </div>
      </div>

      {/* 3. Main content view block containing current route */}
      <div className="flex-1">
        {renderContent()}
      </div>

      {/* 4. Permanent Legal Compliance and DMCA Disclaimer Footer */}
      <Footer />
    </div>
  );
}
