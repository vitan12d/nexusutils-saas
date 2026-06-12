import React from 'react';

interface AdContainerProps {
  id: string;
  type: 'leaderboard' | 'native' | 'in-feed';
  className?: string;
}

export default function AdContainer({ id, type, className = '' }: AdContainerProps) {
  // Simulating an active high-CTR sports advertiser to maximize visual realism for AdSense compliance & CTR demonstration
  const getAdContent = () => {
    switch (type) {
      case 'leaderboard':
        return (
          <div className="flex flex-col sm:flex-row items-center justify-between w-full h-full px-6 py-3 bg-gradient-to-r from-emerald-950/40 to-slate-900 border border-emerald-500/20 rounded-lg">
            <div className="flex items-center space-x-4">
              <span className="text-[10px] font-mono tracking-wider text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-500/30 uppercase">
                Sponsored
              </span>
              <div>
                <h4 className="text-sm font-semibold text-slate-100">DirectBet Sportsbook Match Predictor</h4>
                <p className="text-xs text-slate-400 hidden sm:block">Sign up today & get up to $150 in Free Play Credits. T&C Apply.</p>
              </div>
            </div>
            <button className="mt-2 sm:mt-0 px-4 py-1.5 text-xs font-bold text-slate-900 bg-emerald-400 hover:bg-emerald-300 transition-colors rounded shadow-lg shadow-emerald-500/20 whitespace-nowrap">
              Bet Live Now
            </button>
          </div>
        );
      case 'native':
        return (
          <div className="my-6 p-4 sm:p-5 bg-slate-900/90 border-l-4 border-amber-500 rounded-r-lg shadow-md">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[9px] font-mono tracking-wider text-amber-400 bg-amber-950 px-2 py-0.5 rounded uppercase border border-amber-500/20">
                Native Advertisement
              </span>
              <span className="text-[10px] text-slate-500 hover:underline cursor-pointer">Report Ad</span>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
              <div className="w-16 h-16 bg-gradient-to-tr from-amber-500 to-amber-700 font-bold text-center flex items-center justify-center text-slate-900 rounded text-xl shrink-0">
                Stream
              </div>
              <div className="flex-1">
                <h5 className="text-sm font-semibold text-slate-100 hover:text-amber-400 transition-colors cursor-pointer">
                  How To Watch Global Football Matches In HD Safely?
                </h5>
                <p className="text-xs text-slate-400 mt-1">
                  Enjoy lag-free high-definition broadcasting of all major European and African tournaments. Click here to check authorized streaming channels!
                </p>
              </div>
              <button className="px-3 py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold rounded transition-colors self-end sm:self-center">
                Watch Here
              </button>
            </div>
          </div>
        );
      case 'in-feed':
      default:
        return (
          <div className="p-4 bg-gradient-to-r from-blue-955/20 to-slate-950 border border-blue-500/10 rounded-lg flex flex-col md:flex-row items-center justify-between gap-3 my-4">
            <div className="flex items-center gap-3">
              <span className="text-[9px] font-mono text-blue-400 bg-blue-950 border border-blue-500/20 px-1.5 py-0.5 rounded uppercase">
                Programmatic Ad
              </span>
              <div>
                <p className="text-sm font-semibold text-slate-200">Official Sports Apparel Store — Save 25% Off Today</p>
                <p className="text-xs text-slate-400">Drip the new season jerseys of Manchester City, Real Madrid & Arsenal.</p>
              </div>
            </div>
            <button className="px-3.5 py-1.5 bg-blue-500 hover:bg-blue-400 text-slate-950 font-bold text-xs rounded transition-all whitespace-nowrap">
              Shop Kits
            </button>
          </div>
        );
    }
  }

  return (
    <div 
      id={id} 
      className={`relative w-full overflow-hidden transition-all duration-300 ${className}`}
      data-adsense-zone={id}
    >
      {/* Background container grid lines to look like an actual premium pubbed slot */}
      <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:16px_16px] opacity-10 pointer-events-none"></div>
      
      {getAdContent()}

      {/* Subtle AdSense crawler detection hook */}
      <span className="absolute bottom-1 right-2 text-[8px] font-mono text-slate-600 pointer-events-none">
        AdSense Slot {id} (Responsive)
      </span>
    </div>
  );
}
