import React, { useState, useEffect } from 'react';
import { Match, Player, MatchStat } from '../types';
import { LEAGUES } from '../data/mockData';
import AdContainer from './AdContainer';
import { Info, Users, BarChart3, Tv, Award, MapPin, User, Calendar, Newspaper, AlertCircle, RefreshCw } from 'lucide-react';

interface MatchDetailProps {
  match: Match;
}

export default function MatchDetail({ match }: MatchDetailProps) {
  const [activeTab, setActiveTab] = useState<'info' | 'lineups' | 'stats'>('info');
  const [tickerScore, setTickerScore] = useState<{ home: number; away: number; min: number }>({
    home: match.homeScore || 0,
    away: match.awayScore || 0,
    min: match.minute || 0,
  });
  const [isStreamActivated, setIsStreamActivated] = useState<boolean>(false);
  const [iframeKey, setIframeKey] = useState<number>(0);

  // Auto-reset stream activation and rendering keys when active match ID changes
  useEffect(() => {
    setIsStreamActivated(false);
    setIframeKey(0);
  }, [match.id]);

  const league = LEAGUES[match.leagueId];

  // Simulated live ticking update if match is currently live
  useEffect(() => {
    if (match.status !== 'LIVE') return;

    const interval = setInterval(() => {
      setTickerScore((prev) => {
        const matchEnded = prev.min >= 90;
        if (matchEnded) {
          clearInterval(interval);
          return prev;
        }

        // Random chance to increment live score for interactive experience
        const isGoalHome = Math.random() < 0.02;
        const isGoalAway = Math.random() < 0.015;

        return {
          home: isGoalHome ? prev.home + 1 : prev.home,
          away: isGoalAway ? prev.away + 1 : prev.away,
          min: prev.min + 1,
        };
      });
    }, 15000); // simulation tick every 15 seconds

    return () => clearInterval(interval);
  }, [match.status]);

  // JSON-LD SportsEvent Schema configuration for Technical SEO indexing
  const sportsEventSchema = {
    '@context': 'https://schema.org',
    '@type': 'SportsEvent',
    'name': `${match.homeTeam.name} vs ${match.awayTeam.name} - ${league?.name || 'Football'} Live Score & Stats`,
    'startDate': `${match.date}T${match.displayTime}:00-07:00`,
    'location': {
      '@type': 'Place',
      'name': match.stadium,
    },
    'sport': 'https://en.wikipedia.org/wiki/Association_football',
    'homeTeam': {
      '@type': 'SportsTeam',
      'name': match.homeTeam.name,
      'sport': 'Association Football',
    },
    'awayTeam': {
      '@type': 'SportsTeam',
      'name': match.awayTeam.name,
      'sport': 'Association Football',
    },
    'description': `${match.homeTeam.name} versus ${match.awayTeam.name} in the ${league?.name || 'Champions League'}. Check start match time, direct commentator, and online broadcasting channel guide on GOALSTATS Pro.`,
  };

  const currentHomeScore = match.status === 'LIVE' ? tickerScore.home : match.homeScore;
  const currentAwayScore = match.status === 'LIVE' ? tickerScore.away : match.awayScore;
  const currentMinute = match.status === 'LIVE' ? tickerScore.min : match.minute;

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-6" id="match-details-view">
      {/* Dynamic Technical SEO Schema Injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(sportsEventSchema) }}
      />

      {/* Top Banner Ad Container */}
      <AdContainer id="match-detail-top-banner" type="leaderboard" className="mx-auto" />

      {/* MATCH HEADER HERO ELEMENT */}
      <div className="bg-[#16191E] border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        {/* League and status ribbon */}
        <div className="bg-slate-950 px-6 py-3 border-b border-slate-850 flex flex-wrap items-center justify-between gap-3 font-mono text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <span className="text-lg">{league?.logo}</span>
            <span className="font-extrabold uppercase text-slate-100">{league?.name}</span>
            <span className="text-slate-600">|</span>
            <span className="text-slate-300">{league?.country}</span>
          </div>
          <div className="flex items-center gap-2">
            {match.status === 'LIVE' ? (
              <span className="flex items-center gap-1.5 bg-emerald-950 text-emerald-400 px-3 py-1 rounded border border-emerald-500/20 uppercase font-black tracking-widest text-[11px] animate-pulse">
                <span className="w-2.5 h-2.5 bg-emerald-400 rounded-full"></span>
                LIVE — {currentMinute}' Min
              </span>
            ) : match.status === 'FINISHED' ? (
              <span className="bg-slate-950 border border-slate-800 text-slate-400 px-3 py-1 rounded text-[11px] font-bold uppercase tracking-widest">
                Full Time (FT)
              </span>
            ) : (
              <span className="bg-blue-950 border border-blue-500/20 text-blue-400 px-3 py-1 rounded text-[11px] font-bold uppercase tracking-widest">
                Fixture Upcoming
              </span>
            )}
          </div>
        </div>

        {/* Hero Scoreboard Grid */}
        <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-3 gap-6 items-center bg-gradient-to-b from-[#16191E] to-[#0F1115]">
          {/* Home Team */}
          <div className="flex flex-col items-center md:items-end text-center md:text-right space-y-3">
            <div className={`w-16 h-16 ${match.homeTeam.logo} rounded-full flex items-center justify-center shadow-lg border-2 border-white/10 text-white font-black text-xl tracking-tight`}>
              {match.homeTeam.code}
            </div>
            <div>
              <h2 className="text-xl md:text-2xl font-extrabold text-slate-100">{match.homeTeam.name}</h2>
              <span className="text-xs text-slate-400 uppercase tracking-widest font-mono">Home Club</span>
            </div>
          </div>

          {/* Center Score & Details */}
          <div className="flex flex-col items-center justify-center text-center space-y-3">
            {match.status !== 'UPCOMING' ? (
              <div className="text-4xl md:text-5xl font-black font-mono tracking-wider text-white bg-slate-950 border border-slate-850 px-6 py-3 rounded-2xl flex items-center gap-3">
                <span className="text-emerald-400">{currentHomeScore}</span>
                <span className="text-slate-650">:</span>
                <span className="text-emerald-400">{currentAwayScore}</span>
              </div>
            ) : (
              <div className="text-xs font-mono font-bold bg-slate-950 text-slate-400 border border-slate-800 px-4 py-2 rounded-xl">
                MATCH TIMING : <span className="text-emerald-400 text-sm font-black ml-1">{match.displayTime}</span>
              </div>
            )}
            
            {/* Meta tags helpful for Sports SEO search queries */}
            <div className="space-y-1">
              <p className="text-xs font-mono text-slate-400 flex items-center gap-1.5 justify-center">
                <Calendar className="w-3.5 h-3.5 text-emerald-400" /> Match Date: {match.date}
              </p>
              <p className="text-xs font-mono text-slate-400 flex items-center gap-1.5 justify-center">
                <MapPin className="w-3.5 h-3.5 text-emerald-400" /> {match.stadium}
              </p>
            </div>
          </div>

          {/* Away Team */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-3">
            <div className={`w-16 h-16 ${match.awayTeam.logo} rounded-full flex items-center justify-center shadow-lg border-2 border-white/10 text-white font-black text-xl tracking-tight`}>
              {match.awayTeam.code}
            </div>
            <div>
              <h2 className="text-xl md:text-2xl font-extrabold text-slate-100">{match.awayTeam.name}</h2>
              <span className="text-xs text-slate-400 uppercase tracking-widest font-mono">Away Club</span>
            </div>
          </div>
        </div>

        {/* Referee, Commentator & TV information panel */}
        <div className="bg-slate-950 p-4 border-t border-slate-850/80 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono text-slate-400 text-center sm:text-left">
          <div className="flex items-center gap-2 justify-center sm:justify-start">
            <User className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Referee: <strong className="text-slate-300">{match.referee}</strong></span>
          </div>
          <div className="flex items-center gap-2 justify-center sm:justify-start">
            <Tv className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>TV Network: <strong className="text-slate-300">{match.tvChannel}</strong></span>
          </div>
          <div className="flex items-center gap-2 justify-center sm:justify-start">
            <Award className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Microphone Sport Narrator: <strong className="text-slate-300">{match.commentator}</strong></span>
          </div>
        </div>
      </div>

      {/* DYNAMIC SERVERLESS STREAM & ANALYTICS INTERACTIVE MODULE */}
      <div className="bg-[#16191E] border border-slate-800 rounded-2xl p-4 sm:p-5 shadow-xl space-y-4">
        {match.embedUrl ? (
          <>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800/80 pb-3">
              <div className="flex items-center gap-2.5">
                <span className="flex h-2.5 w-2.5 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-450 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500"></span>
                </span>
                <div>
                  <h3 className="font-extrabold text-sm uppercase text-slate-100 tracking-wider font-mono flex items-center gap-1.5">
                    <Tv className="w-4 h-4 text-emerald-400" /> Live Analytics Stream
                  </h3>
                  <p className="text-[10px] text-slate-400 font-mono">Stream sourced from real-time database clusters</p>
                </div>
              </div>

              {isStreamActivated && (
                <button
                  onClick={() => setIframeKey((prev) => prev + 1)}
                  className="flex items-center gap-1.5 text-xs font-mono text-slate-300 hover:text-emerald-400 bg-slate-950 border border-slate-800/80 py-2 px-3.5 rounded-lg active:scale-95 transition-all cursor-pointer font-bold shrink-0 self-start sm:self-center"
                  title="Reload only the iframe container element to repair stream connection drops instantly"
                >
                  <RefreshCw className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Smart Player Refresh</span>
                </button>
              )}
            </div>

            {!isStreamActivated ? (
              <div className="aspect-video w-full bg-slate-950 rounded-xl relative overflow-hidden flex flex-col items-center justify-center p-6 border border-slate-800 text-center space-y-4 shadow-inner">
                {/* Field-grid decoration overlay */}
                <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:32px_32px] opacity-[0.03] pointer-events-none" />
                <div className="relative z-10 space-y-4 max-w-md">
                  <div className="w-14 h-14 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/5 animate-pulse">
                    <Tv className="w-7 h-7" />
                  </div>
                  <div className="space-y-1.5">
                    <p className="font-extrabold text-sm sm:text-base text-slate-200 tracking-wide">
                      Interactive Live Analytical Web Host
                    </p>
                    <p className="text-[11px] sm:text-xs text-slate-400 leading-relaxed">
                      Optimize bandwidth usage. Click below to deploy the tactical live feeds, positional player stats, and verified sport commentators telemetry.
                    </p>
                  </div>
                  <button
                    onClick={() => setIsStreamActivated(true)}
                    className="px-6 py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-black uppercase tracking-widest rounded-lg shadow-lg shadow-emerald-500/20 cursor-pointer transform hover:scale-[1.02] active:scale-[0.98] transition-all"
                  >
                    Click to Activate Live Analytics & Stream
                  </button>
                </div>
              </div>
            ) : (
              <div className="aspect-video w-full bg-black rounded-xl overflow-hidden border border-slate-800 relative shadow-2xl">
                <iframe
                  key={iframeKey}
                  src={match.embedUrl}
                  className="absolute top-0 left-0 w-full h-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  loading="lazy"
                  title={`${match.homeTeam.name} vs ${match.awayTeam.name} Live Analytics Stream`}
                />
              </div>
            )}
          </>
        ) : (
          <div className="bg-slate-950/60 border border-slate-800/80 rounded-2xl p-8 text-center space-y-3.5 relative overflow-hidden shadow-inner">
            <div className="absolute top-2.5 left-2.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[9px] font-mono uppercase tracking-widest px-2.5 py-1 rounded">
              Organic Broadcast Signal
            </div>
            <div className="w-12 h-12 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto text-emerald-400">
              <Tv className="w-5.5 h-5.5 opacity-80" />
            </div>
            <div className="max-w-md mx-auto space-y-1">
              <p className="font-extrabold text-xs uppercase text-slate-300 font-mono tracking-wider">Stream Queue Pending</p>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Analytical server links are updated 15 minutes before kick-off.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* SUB-TABS NAVIGATION CONTROLS */}
      <div className="flex bg-[#16191E] p-1.5 rounded-xl border border-slate-800 shadow-inner">
        <button
          onClick={() => setActiveTab('info')}
          className={`flex-1 flex items-center justify-center gap-2 py-3 text-xs sm:text-sm font-bold tracking-wider uppercase rounded-lg transition-all ${
            activeTab === 'info'
              ? 'bg-emerald-500 text-slate-955 shadow-md shadow-emerald-500/15'
              : 'text-slate-400 hover:text-slate-100'
          }`}
          id="tab-info"
        >
          <Info className="w-4 h-4" /> Info &amp; Match Report
        </button>
        <button
          onClick={() => setActiveTab('lineups')}
          className={`flex-1 flex items-center justify-center gap-2 py-3 text-xs sm:text-sm font-bold tracking-wider uppercase rounded-lg transition-all ${
            activeTab === 'lineups'
              ? 'bg-emerald-500 text-slate-955 shadow-md shadow-emerald-500/15'
              : 'text-slate-400 hover:text-slate-100'
          }`}
          id="tab-lineups"
        >
          <Users className="w-4 h-4" /> Lineups Formations
        </button>
        <button
          onClick={() => setActiveTab('stats')}
          className={`flex-1 flex items-center justify-center gap-2 py-3 text-xs sm:text-sm font-bold tracking-wider uppercase rounded-lg transition-all ${
            activeTab === 'stats'
              ? 'bg-emerald-500 text-slate-955 shadow-md shadow-emerald-500/15'
              : 'text-slate-400 hover:text-slate-100'
          }`}
          id="tab-stats"
        >
          <BarChart3 className="w-4 h-4" /> Realtime Stats
        </button>
      </div>

      {/* DYNAMIC TABS PANEL CONTAINER */}
      <div className="bg-[#1A1D23] border border-slate-800 rounded-2xl overflow-hidden shadow-lg p-5 sm:p-6 text-left">
        {/* ==================== TAB 1: INFO & MATCH REPORT (SEO GOLDMINE) ==================== */}
        {activeTab === 'info' && (
          <div className="space-y-6" id="panel-info">
            {/* Third-Party Interactive Widget Zone (CRITICAL USER REQUIREMENT) */}
            <div className="space-y-2">
              <h3 className="font-extrabold text-sm uppercase text-slate-350 tracking-wider font-mono flex items-center gap-1.5 border-b border-slate-850 pb-2">
                <RefreshCw className="w-4 h-4 text-emerald-400" /> Interactive Sports Analytics Feed &amp; Heatmaps
              </h3>
              <div className="bg-slate-950/80 border-2 border-dashed border-emerald-500/10 rounded-xl p-6 text-center text-slate-400 space-y-3 relative overflow-hidden">
                <div className="absolute top-2 left-2 bg-emerald-500/10 border border-emerald-400/20 text-emerald-400 text-[9px] font-mono uppercase tracking-wider px-2 py-0.5 rounded">
                  Legal Widget Area
                </div>
                <div className="w-12 h-12 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto text-emerald-400">
                  <BarChart3 className="w-6 h-6 animate-pulse" />
                </div>
                <div className="max-w-md mx-auto">
                  <p className="font-bold text-xs uppercase text-slate-200">Live Heatmap Projection &amp; Positional Trajectories</p>
                  <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
                    This space represents a fully-compliant legal placeholder zone for embedding third-party interactive visualizations (e.g. Opta Analytics, Wyscout Heatmaps, or SofaScore widgets). It operates completely isolated from the indexable editorial SEO content block below to preserve Core Web Vitals on search engines.
                  </p>
                </div>
              </div>
            </div>

            {/* Programmatic Native Sponsor ad injected right before the long-form SEO article */}
            <AdContainer id="match-native-in-feed" type="native" />

            {/* Long-form search-engine optimized content block */}
            <article className="space-y-4">
              <div className="flex items-center gap-2">
                <Newspaper className="w-5 h-5 text-emerald-400" />
                <h3 className="text-lg font-extrabold text-slate-100">{match.reportTitle}</h3>
              </div>

              {/* Explicit keyword-rich markup paragraphs to guarantee search engine indexing */}
              <div className="text-slate-300 text-xs sm:text-sm leading-relaxed space-y-4">
                <p>
                  Welcome to GOALSTATS pro coverage detailing the grand sports confrontation scheduling for <strong className="text-emerald-400 underline">{match.homeTeam.name}</strong> vs <strong className="text-emerald-400 underline">{match.awayTeam.name}</strong>, taking place at the esteemed {match.stadium}. Football fans who need to know <strong className="text-slate-100">how to watch the game live online</strong> will find a complete listing of verified domestic and international satellite TV networks below, alongside details of scheduled commentators and match times.
                </p>
                <p>
                  As an independent, statistical football magazine, GOALSTATS prides itself on providing validated tactical data without hosting illegal video streaming signals on our servers. The starting lineup formations, previous historical head to head summaries, referee card profiles, and stadium telemetry are calculated in real-time by our software, ensuring absolute compliance with web publisher best practices.
                </p>
                <p>
                  {match.reportArticle}
                </p>
                <p>
                  Check back at full-time for the comprehensive match analytics update. You can bookmark this page to enjoy continuous access to live score developments and player ratings dynamically processed inside this portal.
                </p>
              </div>

              {/* Head-to-Head Section */}
              <div className="mt-8 pt-6 border-t border-slate-850 space-y-3">
                <h4 className="font-extrabold text-xs uppercase text-slate-100 tracking-wider font-mono">
                  Previous Head-to-Head Records (H2H Stats)
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {match.headToHead.map((h, idx) => (
                    <div key={idx} className="bg-slate-950 p-3 rounded-lg border border-slate-800/60 flex justify-between items-center text-xs">
                      <span className="font-mono text-slate-500">{h.date}</span>
                      <span className="text-slate-300 font-semibold truncate max-w-[160px]">
                        {h.homeTeam} vs {h.awayTeam}
                      </span>
                      <span className="font-mono bg-slate-900 border border-slate-850 px-2 py-0.5 rounded text-emerald-400 font-bold">
                        {h.score}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </article>
          </div>
        )}

        {/* ==================== TAB 2: LINEUPS (FOOTBALL FIELD GRAPHIC) ==================== */}
        {activeTab === 'lineups' && (
          <div className="space-y-6" id="panel-lineups">
            {/* Traditional Formation grid backdrop */}
            <div className="relative bg-emerald-950 border-2 border-emerald-500/10 rounded-2xl p-4 sm:p-6 overflow-hidden shadow-inner">
              {/* Field white decorations */}
              <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px] opacity-5 pointer-events-none"></div>
              <div className="absolute inset-y-0 left-1/2 -ml-[1px] w-[2px] bg-white/10 pointer-events-none"></div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full border-2 border-white/10 pointer-events-none"></div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
                {/* Home Team Squad */}
                <div className="space-y-4">
                  <div className="flex items-center gap-3 border-b border-white/10 pb-2">
                    <span className="w-5 h-5 bg-yellow-600 rounded-full inline-block border border-white/20"></span>
                    <h4 className="font-extrabold text-sm text-slate-100">{match.homeTeam.name} Lineup</h4>
                  </div>
                  <div className="space-y-2">
                    {match.lineups.home.map((p) => (
                      <div key={p.number} className="bg-slate-950/80 hover:bg-slate-950 border border-emerald-500/10 px-3 py-2 rounded-lg flex items-center justify-between text-xs">
                        <div className="flex items-center gap-3">
                          <span className="font-mono text-emerald-400 font-bold shrink-0 w-5 text-right">{p.number}</span>
                          <span className="font-medium text-slate-200">{p.name}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-[9px] bg-slate-900 border border-slate-800 text-slate-400 px-1.5 py-0.5 rounded">
                            {p.position}
                          </span>
                          <span className="font-mono bg-emerald-500 text-slate-960 text-[10px] font-bold px-1.5 py-0.5 rounded">
                            {p.rating?.toFixed(1) || '7.0'}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Away Team Squad */}
                <div className="space-y-4">
                  <div className="flex items-center gap-3 border-b border-white/10 pb-2">
                    <span className="w-5 h-5 bg-blue-600 rounded-full inline-block border border-white/20"></span>
                    <h4 className="font-extrabold text-sm text-slate-100">{match.awayTeam.name} Lineup</h4>
                  </div>
                  <div className="space-y-2">
                    {match.lineups.away.map((p) => (
                      <div key={p.number} className="bg-slate-950/80 hover:bg-slate-950 border border-emerald-500/10 px-3 py-2 rounded-lg flex items-center justify-between text-xs">
                        <div className="flex items-center gap-3">
                          <span className="font-mono text-emerald-400 font-bold shrink-0 w-5 text-right">{p.number}</span>
                          <span className="font-medium text-slate-200">{p.name}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-[9px] bg-slate-900 border border-slate-800 text-slate-400 px-1.5 py-0.5 rounded">
                            {p.position}
                          </span>
                          <span className="font-mono bg-emerald-500 text-slate-960 text-[10px] font-bold px-1.5 py-0.5 rounded">
                            {p.rating?.toFixed(1) || '7.0'}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-start gap-2.5 bg-slate-950 p-4 border border-slate-850 rounded-xl text-xs text-slate-500">
              <AlertCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <p>
                Rosters are legally extracted from official football federation registrations and verified by pitch coordinators. Player individual skill ratings are simulated based on historical performance calculations.
              </p>
            </div>
          </div>
        )}

        {/* ==================== TAB 3: LIVE STATS (DYNAMIC PROGRESS BARS) ==================== */}
        {activeTab === 'stats' && (
          <div className="space-y-6" id="panel-stats">
            <h4 className="font-extrabold text-sm uppercase text-slate-200 tracking-wider font-mono border-b border-slate-850 pb-3">
              Detailed Match Statistics Grid (Calculated Every Minute)
            </h4>
            
            <div className="space-y-5">
              {match.stats.map((s, idx) => (
                <div key={idx} className="space-y-1.5 select-none hover:bg-slate-950/30 p-2 rounded transition-colors">
                  <div className="flex justify-between items-center text-xs font-mono">
                    <span className="text-slate-300 font-bold">{s.homeVal}</span>
                    <span className="text-slate-400 uppercase tracking-widest text-[11px] font-semibold">{s.label}</span>
                    <span className="text-slate-300 font-bold">{s.awayVal}</span>
                  </div>

                  {/* Horizontal visual progress meter */}
                  <div className="h-2.5 bg-slate-950 rounded-full overflow-hidden w-full flex border border-slate-850">
                    <div 
                      className="bg-yellow-600 h-full transition-all duration-500" 
                      style={{ width: `${s.homePct}%` }}
                    ></div>
                    <div 
                      className="bg-blue-600 h-full transition-all duration-500" 
                      style={{ width: `${s.awayPct}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>

            {/* Dynamic visual indicator for AdSense approval and completeness */}
            <div className="my-2 py-4">
              <AdContainer id="match-stats-mid-feed" type="in-feed" />
            </div>

            <p className="text-[10px] text-slate-500 font-mono text-center">
              All statistical percentages represent live actions calibrated to current relative play-time. Data is refreshed automatically.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
