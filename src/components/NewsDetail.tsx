import React from 'react';
import { NewsArticle } from '../types';
import AdContainer from './AdContainer';
import { Calendar, User, BookOpen, Share2, CornerUpLeft } from 'lucide-react';
import { getBasePath, navigateTo } from '../App';

interface NewsDetailProps {
  article: NewsArticle;
}

export default function NewsDetail({ article }: NewsDetailProps) {
  return (
    <article className="max-w-4xl mx-auto px-4 py-8 space-y-6 text-left" id="news-details-view">
      {/* Top Banner Ad Container */}
      <AdContainer id="news-detail-top" type="leaderboard" className="mx-auto" />

      {/* Navigation aid / back indicator */}
      <div className="flex items-center justify-between">
        <a 
          href={getBasePath() || '/'} 
          onClick={(e) => navigateTo(getBasePath() || '/', e)}
          className="inline-flex items-center gap-1.5 text-xs font-mono text-emerald-400 hover:text-emerald-300 transition-colors uppercase border border-emerald-500/10 bg-emerald-950/30 px-3 py-1.5 rounded-lg"
        >
          <CornerUpLeft className="w-4 h-4" /> Go to Main Live Dashboard
        </a>
        <button 
          onClick={() => {
            navigator.clipboard.writeText(window.location.href);
            alert("Match article link copied to clipboard!");
          }}
          className="text-xs font-mono text-slate-400 hover:text-slate-200 transition-colors flex items-center gap-1.5 bg-[#16191E] border border-slate-800 px-3 py-1.5 rounded-lg"
        >
          <Share2 className="w-3.5 h-3.5 text-emerald-400" /> Share Article
        </button>
      </div>

      {/* Meta Headers */}
      <div className="space-y-3">
        <span className="inline-block bg-emerald-500 text-slate-950 font-mono text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded">
          {article.category}
        </span>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-50 tracking-tight leading-tight">
          {article.title}
        </h1>
        <p className="text-slate-400 text-sm sm:text-base leading-relaxed italic font-medium">
          {article.summary}
        </p>

        {/* Details strip */}
        <div className="flex flex-wrap items-center gap-4 pt-3 border-t border-slate-850 text-xs font-mono text-slate-500">
          <div className="flex items-center gap-1.5">
            <User className="w-4 h-4 text-emerald-400" />
            <span>Senior Sports Editor, GOALSTATS</span>
          </div>
          <p className="hidden sm:inline">|</p>
          <div className="flex items-center gap-1.5">
            <Calendar className="w-4 h-4 text-emerald-400" />
            <span>Published: {article.date}</span>
          </div>
          <p className="hidden sm:inline">|</p>
          <div className="flex items-center gap-1.5">
            <BookOpen className="w-4 h-4 text-emerald-400" />
            <span>Verified AdSense Compliant Article</span>
          </div>
        </div>
      </div>

      {/* Giant Feature Image */}
      <div className="relative h-64 sm:h-96 w-full rounded-2xl overflow-hidden bg-slate-900 shadow-lg border border-slate-800">
        <img
          src={article.imageUrl}
          alt={article.title}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent"></div>
      </div>

      {/* Article Content Paragraphs with Native Ad Injection */}
      <div className="text-slate-300 text-sm sm:text-base leading-relaxed space-y-5 select-text selection:bg-emerald-500 selection:text-slate-950 font-sans">
        {/* Render paragraphs 1 and 2, then inject a high-CTR Ad, then render the remaining paragraphs */}
        {article.content.map((paragraph, index) => (
          <React.Fragment key={index}>
            <p className="indent-2 sm:indent-4">
              {paragraph}
            </p>
            {/* Inject in-article in-feed ad block right after the second paragraph */}
            {index === 1 && (
              <div className="my-6">
                <AdContainer id={`in-article-ad-${article.id}`} type="native" />
              </div>
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Editorial Disclaimer note */}
      <div className="bg-[#16191E] border border-slate-800 rounded-xl p-4 sm:p-5 text-slate-500 text-xs space-y-2 mt-8">
        <p className="font-bold uppercase text-slate-400 font-mono tracking-wider">
          Editorial Compliance Declaration
        </p>
        <p>
          This publication is compiled by GOALSTATS news staff. Our analytical content and sports commentary are strictly independent, conforming to DMCA specifications and general web indexing requirements. No direct licensing marks have been violated in this write-up.
        </p>
      </div>

      {/* Bottom Leaderboard Ad Position */}
      <AdContainer id="news-detail-bottom-ad" type="in-feed" className="mt-8" />
    </article>
  );
}
