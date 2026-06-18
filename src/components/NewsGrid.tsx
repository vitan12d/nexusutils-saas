/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Article } from '../types';
import { MessageSquare, ThumbsUp, Share2, Filter, Eye } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';

interface NewsGridProps {
  articles: Article[];
  isAdmin?: boolean;
  onEditArticle?: (art: Article) => void;
  onDeleteArticle?: (id: string) => void;
}

export default function NewsGrid({ articles, isAdmin, onEditArticle, onDeleteArticle }: NewsGridProps) {
  const { language, t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [likesState, setLikesState] = useState<Record<string, number>>({});
  const [showShareTooltip, setShowShareTooltip] = useState<string | null>(null);

  const isEn = language === 'en';

  const categories = [
    { id: 'all', label: isEn ? 'All' : 'الجميع' },
    { id: 'world-cup', label: isEn ? 'World Cup' : 'كأس العالم', match: 'أخبار كأس العالم' },
    { id: 'analysis', label: isEn ? 'Analysis & Tactics' : 'تحليلات وتكتيك', match: 'تحليلات رياضية' },
    { id: 'reports', label: isEn ? 'Special Reports' : 'تقارير حصرية', match: 'تقارير خاصة' },
  ];

  const filteredArticles = selectedCategory === 'all'
    ? articles
    : articles.filter(art => {
        const catObj = categories.find(c => c.id === selectedCategory);
        return catObj && art.category === catObj.match;
      });

  const handleLike = (id: string) => {
    setLikesState(prev => ({
      ...prev,
      [id]: (prev[id] || 0) + (prev[id] === 1 ? -1 : 1)
    }));
  };

  const handleShareClick = (id: string, event: React.MouseEvent) => {
    event.stopPropagation();
    navigator.clipboard.writeText(`${window.location.origin}#article-${id}`);
    setShowShareTooltip(id);
    setTimeout(() => setShowShareTooltip(null), 2000);
  };

  const articleTitle = (art: Article) => {
    return art.title;
  };

  const articleSummary = (art: Article) => {
    return art.contentSummary;
  };

  return (
    <div className="w-full py-8 text-right" id="msn-sports-news-grid">
      <div className="max-w-7xl mx-auto px-4">
        {/* Row header & filter */}
        <div className={`flex flex-col md:flex-row md:items-center justify-between border-b border-gray-200 pb-3.5 mb-6 gap-4 ${isEn ? 'md:flex-row-reverse' : ''}`}>
          <div className={`flex items-center gap-2 ${isEn ? 'flex-row-reverse' : ''}`}>
            <span className="w-1 h-6 bg-red-600 rounded-full"></span>
            <h3 className="text-base font-black text-gray-950">
              {isEn ? "Comprehensive World Cup News & Reports" : "تقارير وأخبار مونديالية شاملة"}
            </h3>
          </div>

          {/* Inline filters */}
          <div className={`flex items-center gap-1.5 overflow-x-auto no-scrollbar scroll-smooth ${isEn ? 'flex-row-reverse' : ''}`}>
            <Filter className="w-3.5 h-3.5 text-gray-400 hidden sm:inline shrink-0" />
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`text-[11px] font-black px-3 py-1.5 rounded-md transition-all whitespace-nowrap ${
                  selectedCategory === cat.id
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-100'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Regular list or grid of cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredArticles.map((art) => {
              const hasLiked = likesState[art.id] === 1;
              return (
                <motion.article
                  key={art.id}
                  layout
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white rounded-xl overflow-hidden border border-gray-200 hover:shadow-lg hover:border-gray-300 transition-all duration-300 flex flex-col h-full group"
                >
                  {/* Card visual thumb */}
                  <div className="relative aspect-video w-full overflow-hidden bg-gray-100">
                    <img
                      src={art.image}
                      alt={art.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-103"
                    />
                    <span className="absolute top-3 right-3 bg-gray-900/80 backdrop-blur-xs text-white text-[10px] font-bold px-2 py-0.5 rounded-sm">
                      {t(art.category)}
                    </span>

                    {/* Admin HOVER Actions Overlay */}
                    {isAdmin && (
                      <div className="absolute inset-0 bg-slate-950/70 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center gap-2.5 z-10">
                        {onEditArticle && (
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              onEditArticle(art);
                            }}
                            className="bg-amber-500 hover:bg-amber-600 text-slate-900 rounded-lg px-3.5 py-1.5 text-xs font-black shadow-lg transition-transform hover:scale-105 cursor-pointer"
                          >
                            {language === 'ar' ? 'تعديل ✍️' : 'Edit ✍️'}
                          </button>
                        )}
                        {onDeleteArticle && (
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              onDeleteArticle(art.id);
                            }}
                            className="bg-red-600 hover:bg-red-700 text-white rounded-lg px-3.5 py-1.5 text-xs font-black shadow-lg transition-transform hover:scale-105 cursor-pointer"
                          >
                            {language === 'ar' ? 'حذف 🗑️' : 'Delete 🗑️'}
                          </button>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Card text content */}
                  <div className="p-4 flex flex-col justify-between flex-grow">
                    <div className="mb-4">
                      <div className={`flex items-center gap-2 text-[10px] text-gray-400 font-bold mb-2 ${isEn ? 'flex-row' : 'flex-row-reverse'}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${art.publisherLogoColor}`}></span>
                        <span>
                          {isEn ? art.publisherName.replace('الجزيرة رياضة', 'Al Jazeera').replace('موقع كورة كورة', 'Kooora').replace('سكاي نيوز عربية', 'Sky News').replace('CNN بالعربية', 'CNN').replace('العربية نت', 'Al Arabiya').replace('فرانس 24', 'France 24') : art.publisherName}
                        </span>
                        <span>•</span>
                        <span>{t(art.elapsed)}</span>
                      </div>
                      <h4 className={`text-xs md:text-sm font-black text-gray-950 group-hover:text-blue-600 leading-snug line-clamp-2 transition-colors ${isEn ? 'text-left' : 'text-right'}`}>
                        {articleTitle(art)}
                      </h4>
                      <p className={`text-[11px] text-gray-500 line-clamp-2 mt-2 leading-relaxed ${isEn ? 'text-left' : 'text-right'}`}>
                        {articleSummary(art)}
                      </p>
                    </div>

                    {/* Stats footer bar inside article */}
                    <div className={`flex items-center justify-between pt-3 border-t border-gray-50 text-[11px] text-gray-400 mt-auto ${isEn ? 'flex-row-reverse' : ''}`}>
                      <span className={`flex items-center gap-1 ${isEn ? 'flex-row-reverse' : ''}`}>
                        <Eye className="w-3.5 h-3.5 text-gray-300" />
                        <span>
                          {art.viewsCount >= 1000 ? `${(art.viewsCount / 1000).toFixed(1)}k ` : art.viewsCount} {isEn ? "views" : "تصفح"}
                        </span>
                      </span>

                      <div className={`flex items-center gap-3 ${isEn ? 'flex-row-reverse' : ''}`}>
                        {/* Comments button */}
                        <span className="flex items-center gap-1.5" title="التعليقات">
                          <MessageSquare className="w-3.5 h-3.5 text-gray-300" />
                          <span className="font-mono text-[10px] font-bold">{art.commentsCount}</span>
                        </span>

                        {/* Likes action */}
                        <button
                          onClick={() => handleLike(art.id)}
                          className={`flex items-center gap-1 transition-colors hover:text-red-500 ${
                            hasLiked ? 'text-red-500 font-bold' : ''
                          }`}
                        >
                          <ThumbsUp className={`w-3.5 h-3.5 ${hasLiked ? 'fill-red-500 text-red-500' : ''}`} />
                          <span className="font-mono text-[10px]">{art.likesCount + (hasLiked ? 1 : 0)}</span>
                        </button>

                        {/* Share */}
                        <button
                          onClick={(e) => handleShareClick(art.id, e)}
                          className="p-1.5 hover:bg-slate-100 rounded-full transition-colors relative text-gray-400 hover:text-blue-600 cursor-pointer"
                        >
                          <Share2 className="w-3.5 h-3.5" />
                          {showShareTooltip === art.id && (
                            <span className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-[9px] font-bold py-1 px-2 rounded-md whitespace-nowrap shadow-md z-30 animate-scale-up">
                              {isEn ? "Link Copied!" : "تم نسخ الرابط!"}
                            </span>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
