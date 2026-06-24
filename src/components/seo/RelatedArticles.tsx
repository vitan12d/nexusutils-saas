import React from 'react';
import { BookOpen, Calendar, Clock } from 'lucide-react';

interface RelatedArticlesProps {
  category: string;
}

interface Article {
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
}

const ARTICLES_BY_CATEGORY: Record<string, Article[]> = {
  pdf: [
    {
      title: 'How to Secure and Audit Corporate PDF Files Under GDPR Limits',
      excerpt: 'Learn the core tactics required to merge, redact, and store sensitive PDF documents without triggering data-protection audit penalties.',
      date: 'May 24, 2026',
      readTime: '6 min read'
    },
    {
      title: 'Lossless Formatting: Why Scanned PDFs Lose Vector Content Upon Conversion',
      excerpt: 'Understanding the technical differences between raster scans and native text coordinate streams inside portable digital layouts.',
      date: 'Apr 18, 2026',
      readTime: '8 min read'
    },
    {
      title: 'A Technical Deep-Dive Into Font Embedding and Subsetting Algorithms',
      excerpt: 'Stretching or compiling files can break your presentation layout. Discover how embedded subset weights alter portable rendering paths.',
      date: 'Mar 10, 2026',
      readTime: '5 min read'
    }
  ],
  image: [
    {
      title: 'Responsive Images: Navigating Core Web Vitals with WebP Migrations',
      excerpt: 'A comprehensive guide on how converting heavy legacy PNG files to modern Google WebP containers shaves off 40% loading latencies.',
      date: 'May 30, 2026',
      readTime: '7 min read'
    },
    {
      title: 'Aspect Ratios Decoded: The Core Grid of Standard Social Media Banners',
      excerpt: 'Avoid warped or stretched content. Refer to our modern pixel guides to optimize layout crops for mobile, tablet, and desktop screens.',
      date: 'May 12, 2026',
      readTime: '4 min read'
    },
    {
      title: 'Lossy vs. Lossless Compression: Finding the Photographic Quality Sweet Spot',
      excerpt: 'Why 80% compression serves as the industry standard, and why human eyes cannot process detailed color ranges above 90% qualities.',
      date: 'Feb 15, 2026',
      readTime: '9 min read'
    }
  ],
  developer: [
    {
      title: 'Unmarshaling Complex Payloads: Advanced JSON Formatting Standards',
      excerpt: 'Deep nest structures can create severe memory leaks if parse models are malformed. Learn standard schema safeguards to sanitize feeds.',
      date: 'Jun 01, 2026',
      readTime: '5 min read'
    },
    {
      title: 'Defeating Reverse Engineering: Modern JavaScript Obfuscation Models',
      excerpt: 'Mangle markers, rename variables, and protect proprietary client algorithms using static lexical compile filters.',
      date: 'May 04, 2026',
      readTime: '11 min read'
    },
    {
      title: 'Unicode Escapes: Translating Base64 Across Multi-Byte API Networks',
      excerpt: 'Avoid database translation corruption by formatting UTF-16 strings to standard ASCII-64 structures cleanly.',
      date: 'Apr 22, 2026',
      readTime: '6 min read'
    }
  ],
  general: [
    {
      title: 'Bypassing Server Latencies: What are Offline-First Web Applications?',
      excerpt: 'Process gigabytes of files on-fly directly local. Discover how modern JavaScript compilers eliminate cloud costs and data leak triggers.',
      date: 'May 28, 2026',
      readTime: '6 min read'
    },
    {
      title: 'The Search Engine Optimization Framework: Elevating Click-Through Rates',
      excerpt: 'How writing human-readable, semantic articles with custom FAQs and Schema maps boosts search engine rankings over AI spam feeds.',
      date: 'May 15, 2026',
      readTime: '8 min read'
    },
    {
      title: 'Establishing Portable Accounting: Generating Compliance Commercial Billing',
      excerpt: 'How sequential numbers, legal taxation identifiers, and exact total matrices ensure corporate accounts receivable settle on-time.',
      date: 'Apr 02, 2026',
      readTime: '5 min read'
    }
  ]
};

export default function RelatedArticles({ category }: RelatedArticlesProps) {
  const articles = ARTICLES_BY_CATEGORY[category] || ARTICLES_BY_CATEGORY['general'];

  return (
    <div className="space-y-6">
      <div className="text-left space-y-1">
        <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Featured Technical Articles
        </h2>
        <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">
          Read top-ranking engineering insights and structural guides curated by our editors
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {articles.map((art, idx) => (
          <div
            key={idx}
            className="group block bg-white dark:bg-slate-900/40 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-6 hover:shadow-md hover:border-slate-300 dark:hover:border-slate-700 transition duration-150 flex flex-col justify-between text-left"
          >
            <div className="space-y-3">
              <div className="flex items-center gap-4 text-[10px] font-bold text-slate-400 select-none">
                <span className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  {art.date}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {art.readTime}
                </span>
              </div>
              
              <h3 className="text-sm font-extrabold text-slate-850 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-405 transition-colors line-clamp-2 leading-snug">
                {art.title}
              </h3>
              
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-semibold line-clamp-3">
                {art.excerpt}
              </p>
            </div>

            <div className="flex items-center gap-1.5 text-xs font-black text-blue-600 dark:text-blue-400 pt-4 mt-4 border-t border-slate-100 dark:border-slate-800 select-none">
              <BookOpen className="h-3.5 w-3.5" />
              <span>Read Full Article</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
