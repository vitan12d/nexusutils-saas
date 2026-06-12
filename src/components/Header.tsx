import React, { useState, useEffect } from 'react';
import { Shield, Radio, Activity, Search, Trophy } from 'lucide-react';
import { getBasePath, navigateTo } from '../App';

interface HeaderProps {
  onSearch?: (query: string) => void;
  liveCount: number;
}

export default function Header({ onSearch, liveCount }: HeaderProps) {
  const [time, setTime] = useState<string>('');

  useEffect(() => {
    // Ticking UTC / Live clock to feel premium and updated
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="w-full bg-[#16191E] border-b border-slate-800 sticky top-0 z-50 shadow-md">
      {/* Top Bar Info Strip */}
      <div className="bg-slate-950/40 text-emerald-400 text-xs px-4 py-1.5 flex justify-between items-center border-b border-slate-800 font-mono">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1">
            <Radio className="w-3.5 h-3.5 animate-pulse text-emerald-400" />
            <span className="font-bold">{liveCount}</span> Matches Live Now
          </span>
          <span className="hidden sm:inline-block text-slate-500">|</span>
          <span className="hidden sm:inline text-slate-300">
            AdSense Safe Digital Sports Magazine
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-slate-400">Match Clock (Local Time):</span>
          <span className="font-semibold text-emerald-300 bg-slate-900 px-2 py-0.5 rounded border border-emerald-500/10">
            {time || '18:10:00'}
          </span>
        </div>
      </div>

      {/* Main Bar Navigation */}
      <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Branding */}
        <a 
          href={getBasePath() || '/'} 
          onClick={(e) => navigateTo(getBasePath() || '/', e)}
          className="flex items-center space-x-2 text-white hover:opacity-90 transition-opacity"
        >
          <div className="w-10 h-10 bg-emerald-500 flex items-center justify-center rounded-lg shadow-lg shadow-emerald-500/20">
            <Trophy className="w-6 h-6 text-slate-950 stroke-[2]" />
          </div>
          <div>
            <h1 className="text-xl font-extrabold tracking-tight text-white flex items-center gap-1.5 font-sans">
              GOAL<span className="text-emerald-400">STATS</span>
              <span className="text-[10px] uppercase font-mono tracking-widest text-emerald-400 border border-emerald-400/20 px-1 py-0.5 rounded-sm">
                Pro
              </span>
            </h1>
            <p className="text-[10px] text-slate-400 font-mono tracking-tight leading-none mt-0.5">
              Live Scores & Football Analytics Platform
            </p>
          </div>
        </a>

        {/* Global Stats bar */}
        <div className="flex items-center gap-4 text-xs font-mono text-slate-300">
          <div className="flex items-center gap-1.5 bg-[#0F1115] border border-slate-800 px-3 py-1.5 rounded-lg font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span>English Premier League</span>
          </div>
          <div className="flex items-center gap-1.5 bg-[#0F1115] border border-slate-800 px-3 py-1.5 rounded-lg font-medium">
            <span className="w-2 h-2 rounded-full bg-blue-500"></span>
            <span>La Liga</span>
          </div>
          <div className="flex items-center gap-1.5 bg-[#0F1115] border border-slate-800 px-3 py-1.5 rounded-lg font-medium hidden sm:flex">
            <span className="w-2 h-2 rounded-full bg-yellow-500"></span>
            <span>CAF Champions League</span>
          </div>
        </div>

        {/* Search Bar Input */}
        <div className="relative w-full md:w-64">
          <input
            id="search-input"
            type="text"
            placeholder="Search teams, leagues, news..."
            onChange={(e) => onSearch?.(e.target.value)}
            className="w-full bg-[#0F1115] text-slate-100 text-sm pl-10 pr-4 py-2 rounded-lg border border-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent placeholder-slate-505 transition-all"
          />
          <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-500" />
        </div>
      </div>
    </header>
  );
}
