import React from 'react';
import { ShieldAlert, BookOpen, Scale, Landmark } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="w-full bg-[#16191E] border-t border-slate-800 mt-12 text-slate-400 text-xs text-left">
      {/* Upper footer columns */}
      <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <div className="flex items-center space-x-2 text-white mb-3">
            <div className="w-6 h-6 bg-emerald-500 flex items-center justify-center rounded">
              <span className="text-slate-950 font-bold text-xs uppercase">GS</span>
            </div>
            <h3 className="font-extrabold text-white text-base">GOALSTATS</h3>
          </div>
          <p className="text-slate-400 leading-relaxed text-[11px]">
            The leading independent statistical digital magazine for world association football. Providing real-time live scores, starting lineups, referee logs, stadium statistics, and deep tactical analytical data across major domestic and international leagues.
          </p>
        </div>

        <div>
          <h4 className="font-extrabold text-slate-200 uppercase tracking-widest text-xs mb-3 flex items-center gap-1.5 font-mono">
            <BookOpen className="w-3.5 h-3.5 text-emerald-400" /> Editorial Pillars & Advertising
          </h4>
          <p className="text-slate-400 text-[11px] leading-relaxed">
            We are dedicated to exceptional User Experience & Core Web Vitals. To sustain our publishing platform, we participate in high-CTR Google AdSense program. Programmatic ad modules are clearly labeled as "Sponsored" or "Advertisement" and comply with Google Publisher Policies. No overlays, deceptive links, or pop-unders.
          </p>
        </div>

        <div>
          <h4 className="font-extrabold text-slate-200 uppercase tracking-widest text-xs mb-3 flex items-center gap-1.5 font-mono">
            <Scale className="w-3.5 h-3.5 text-emerald-400" /> DMCA Copyright Policy & Status
          </h4>
          <p className="text-slate-400 text-[11px] leading-relaxed">
            All proprietary statistical databases, player ratings, and historical head to head summaries are calculated by our internal software algorithms. Company logos and team symbols are registered trademarks of their intellectual property holders, used here strictly under fair use principles for public data indexing.
          </p>
        </div>
      </div>

      {/* Prominent Legal footnote area (DMCA and Privacy Policy disclaimer as required) */}
      <div className="bg-black/25 border-t border-slate-800 py-6 px-4">
        <div className="max-w-7xl mx-auto flex flex-col gap-4 text-[11px] text-slate-500 leading-relaxed">
          <div className="flex items-start gap-2.5">
            <ShieldAlert className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
            <div className="space-y-2">
              <p className="text-slate-300 font-semibold uppercase font-mono tracking-wider text-[10px]">
                Official Legal DMCA & Streaming Disclaimer
              </p>
              <p>
                <strong>GOALSTATS (goalstats.com)</strong> is an independent digital football score journal and sports analytics database. Note that **we do not host, broadcast, transmit, upload, or index any copyrighted video clips, live streaming signals, or audio audio feeds of matches on our servers or systems**. All match videos, goals, stream highlights, or external links remain copyrighted content of their respective holders (e.g., UEFA, Premier League, beIN Sports, Sky Sports). 
              </p>
              <p>
                We do not cooperate with or endorse unofficial torrent streams or external illegal third-party live players. Any interactive components, widgets, or stats cards displayed within this platform are dedicated legal data feeds displaying exclusively mathematical statistics, names, and score updates. If you suspect any copyright violations or wish to file a take-down request, please contact our authorized legal agent directly via our DMCA compliance registry email (dmca@goalstats.com), and we will review and remove the reported items immediately.
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between border-t border-slate-900 pt-4 mt-2 text-[10px] text-slate-600 font-mono">
            <span>© 2026 GOALSTATS PRO. All Rights Reserved. Not affiliated with any soccer league.</span>
            <div className="flex gap-4">
              <a href="#privacy" className="hover:text-emerald-400 transition-colors">Privacy Policy</a>
              <a href="#terms" className="hover:text-emerald-400 transition-colors pointer-events-none">| Terms of Service</a>
              <a href="#dmca" className="hover:text-emerald-400 transition-colors">| DMCA Registry</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
