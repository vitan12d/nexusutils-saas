import React, { useState, useMemo } from 'react';
import { ALL_50_POSTS_METADATA, slugifyCategory } from '../../data/blogData';
import { TOOLS, CATEGORIES } from '../../types';
import { Search, BookOpen, Clock, Calendar, ArrowRight, Sparkles, Send, Mail, CheckCircle, ChevronLeft, ChevronRight, Bookmark, ArrowUpRight } from 'lucide-react';

interface BlogIndexProps {
  onSelectArticle: (slug: string) => void;
  onSelectCategoryRoute: (categoryName: string) => void;
  selectedCategoryRoute?: string; // category route slug if filtered from url
  onBackToHome: () => void;
}

export default function BlogIndex({
  onSelectArticle,
  onSelectCategoryRoute,
  selectedCategoryRoute = 'all',
  onBackToHome
}: BlogIndexProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const BLOG_CATEGORIES_LIST = [
    'all',
    'SEO',
    'PDF Tools',
    'Image Tools',
    'Developer Tools',
    'Text Tools',
    'AI Tools',
    'Finance Tools',
    'Productivity',
    'Website Optimization',
    'Digital Marketing'
  ];

  // Map category slugs to full names
  const categoryRouteToNameMap: Record<string, string> = {
    'all': 'All Articles',
    'seo': 'SEO',
    'pdf-tools': 'PDF Tools',
    'image-tools': 'Image Tools',
    'developer-tools': 'Developer Tools',
    'text-tools': 'Text Tools',
    'ai-tools': 'AI Tools',
    'finance-tools': 'Finance Tools',
    'productivity': 'Productivity',
    'website-optimization': 'Website Optimization',
    'digital-marketing': 'Digital Marketing'
  };

  const activeCategoryName = categoryRouteToNameMap[selectedCategoryRoute] || 'All Articles';

  // 1. Filter Posts
  const filteredPosts = useMemo(() => {
    let result = ALL_50_POSTS_METADATA;

    // Filter by Category
    if (selectedCategoryRoute !== 'all') {
      const targetCatName = categoryRouteToNameMap[selectedCategoryRoute];
      if (targetCatName) {
        result = result.filter(post => post.category.toLowerCase() === targetCatName.toLowerCase());
      }
    }

    // Filter by Search Query
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      result = result.filter(post => 
        post.title.toLowerCase().includes(q) || 
        post.summary.toLowerCase().includes(q) ||
        post.category.toLowerCase().includes(q)
      );
    }

    return result;
  }, [selectedCategoryRoute, searchQuery]);

  // Designated Featured Post: "What Is JSON Formatting"
  const featuredPost = useMemo(() => {
    return ALL_50_POSTS_METADATA.find(post => post.slug === 'what-is-json-formatting') || ALL_50_POSTS_METADATA[0];
  }, []);

  // Designated Popular Posts (Handwritten + highly strategic examples)
  const popularPosts = useMemo(() => {
    const targets = ['what-is-json-formatting', 'how-to-merge-pdf-files-online', 'meta-tags-explained'];
    return ALL_50_POSTS_METADATA.filter(post => targets.includes(post.slug));
  }, []);

  // 2. Pagination (6 items per page)
  const itemsPerPage = 6;
  const totalPages = Math.ceil(filteredPosts.length / itemsPerPage);
  
  const paginatedPosts = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredPosts.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredPosts, currentPage]);

  const handleCategoryClick = (cat: string) => {
    setCurrentPage(1);
    onSelectCategoryRoute(cat);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.trim() && newsletterEmail.includes('@')) {
      setIsSubscribed(true);
      setTimeout(() => {
        setIsSubscribed(false);
        setNewsletterEmail('');
      }, 5000);
    }
  };

  return (
    <div className="space-y-12 animate-fade-in text-left">
      {/* 1. Category Hub Banner Row */}
      <section className="space-y-4">
        <div className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 text-[10px] font-black uppercase tracking-wider select-none">
          <Sparkles className="h-3.5 w-3.5 inline text-blue-500" />
          <span>Google AdSense Certified Knowledge Hub</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white leading-tight tracking-tight font-sans">
          NexusUtils Development & Marketing Blog
        </h1>
        <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 leading-relaxed max-w-3xl font-medium">
          Unlock standard technical guides, optimization walkthroughs, metadata checksheets, and workflow setups. All our insights leverage secure, serverless client-side methodologies.
        </p>
      </section>

      {/* 2. Interactive Filtering & Search Bar Header */}
      <div className="p-4 bg-white dark:bg-slate-900/60 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-3xs flex flex-col md:flex-row gap-4 justify-between items-center">
        {/* Search Input Box */}
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search 50 technical articles..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-xs sm:text-sm font-semibold focus:outline-none focus:border-blue-500 dark:focus:border-blue-500"
          />
        </div>

        {/* Horizontal Category Nav Chips */}
        <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto overflow-x-auto justify-start md:justify-end py-1 select-none scrollbar-none">
          {BLOG_CATEGORIES_LIST.map((catSpec) => {
            const catRoute = slugifyCategory(catSpec);
            const isActive = selectedCategoryRoute === catRoute;
            return (
              <button
                key={catSpec}
                onClick={() => handleCategoryClick(catRoute)}
                className={`px-3 py-1.5 text-[10.5px] uppercase font-extrabold tracking-wider rounded-lg transition-colors cursor-pointer ${
                  isActive
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-50 hover:bg-slate-100 dark:bg-slate-950 dark:hover:bg-slate-900 text-slate-500 dark:text-slate-400 border border-slate-205 dark:border-slate-850'
                }`}
              >
                {catSpec === 'all' ? 'All Posts' : catSpec}
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Featured Single Post Panel (Only show on default list) */}
      {selectedCategoryRoute === 'all' && searchQuery === '' && featuredPost && (
        <section className="bg-white dark:bg-slate-900/40 border border-slate-250 dark:border-slate-800 rounded-3xl overflow-hidden shadow-2xs group hover:border-slate-350 dark:hover:border-slate-700 transition duration-200 flex flex-col lg:flex-row">
          <div className="p-8 sm:p-12 space-y-4 flex-1 flex flex-col justify-between">
            <div className="space-y-3">
              <span className="text-[10px] font-black tracking-widest text-indigo-500 uppercase bg-indigo-500/10 px-3 py-1 rounded-md inline-block font-mono">
                🏆 Featured Architectural Guide
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-tight">
                {featuredPost.title}
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-semibold">
                {featuredPost.summary}
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-100 dark:border-slate-850/60 text-[11px] text-slate-400 font-bold select-none">
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1">
                  <Calendar className="h-3.5 w-3.5" />
                  {featuredPost.date}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5" />
                  {featuredPost.readTime}
                </span>
              </div>
              <button
                onClick={() => onSelectArticle(featuredPost.slug)}
                className="py-2.5 px-6 bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-xs rounded-xl flex items-center gap-1 cursor-pointer transition shadow-3xs"
              >
                <span>Read Full Article</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>

          <div className="lg:w-1/3 bg-slate-100 dark:bg-slate-950 border-t lg:border-t-0 lg:border-l border-slate-205 dark:border-slate-850/60 p-8 flex flex-col justify-center items-start space-y-4">
            <span className="text-[10px] font-black tracking-wider text-slate-400 uppercase">
              RELEVANT UTILITY WORKSPACE
            </span>
            <h3 className="text-sm font-extrabold text-slate-855 dark:text-white">
              JSON Syntactic Formatter & Compliant Linter
            </h3>
            <p className="text-[11px] text-slate-500 dark:text-slate-405 leading-relaxed font-semibold">
              Pretty print JSON structures, identify bracket offsets, remove trailing commas, or compress payloads directly local.
            </p>
            <button
              onClick={() => onSelectArticle('what-is-json-formatting')}
              className="text-xs font-black text-indigo-500 flex items-center gap-1 hover:text-indigo-400 cursor-pointer"
            >
              <span>Launch Live Workspace</span>
              <ArrowUpRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </section>
      )}

      {/* 4. Core Layout Grid: Main content list & Sidebar panels */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Main Columns: Filtered Posts list with Pagination */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex justify-between items-center pb-2 border-b border-slate-200 dark:border-slate-800">
            <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white">
              {activeCategoryName} ({filteredPosts.length} matches)
            </h2>
            <span className="text-xs text-slate-450 dark:text-slate-550 font-bold uppercase font-mono">
              Index Page {currentPage} of {totalPages || 1}
            </span>
          </div>

          {paginatedPosts.length === 0 ? (
            <div className="py-20 text-center space-y-4 bg-white dark:bg-slate-900/20 rounded-3xl border border-slate-200 dark:border-slate-800">
              <p className="text-sm text-slate-450 font-bold">No articles match your search parameters.</p>
              <button
                onClick={() => { setSearchQuery(''); handleCategoryClick('all'); }}
                className="py-2 px-4 bg-blue-600 hover:bg-blue-505 text-white rounded-xl text-xs font-black cursor-pointer"
              >
                Reset Search Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {paginatedPosts.map((post) => (
                <article
                  key={post.slug}
                  className="bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 hover:shadow-xs hover:border-slate-300 dark:hover:border-slate-700 transition duration-150 flex flex-col justify-between text-left group"
                >
                  <div className="space-y-3">
                    <div className="flex justify-between items-center select-none">
                      <span className="text-[9px] font-black tracking-wider uppercase bg-blue-500/10 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400 px-2 py-0.5 rounded font-mono">
                        {post.category}
                      </span>
                      <span className="text-[10px] text-slate-400 font-bold flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {post.readTime}
                      </span>
                    </div>

                    <h3
                      onClick={() => onSelectArticle(post.slug)}
                      className="text-base font-extrabold text-slate-900 dark:text-white group-hover:text-blue-500 transition-colors cursor-pointer leading-snug line-clamp-2"
                    >
                      {post.title}
                    </h3>

                    <p className="text-[11.5px] leading-relaxed text-slate-500 dark:text-slate-400 font-semibold line-clamp-3">
                      {post.summary}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-100 dark:border-slate-850 flex items-center justify-between text-[11px] font-extrabold text-slate-400 select-none mt-4">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {post.date}
                    </span>
                    <button
                      onClick={() => onSelectArticle(post.slug)}
                      className="text-blue-600 hover:text-blue-500 dark:text-blue-400 flex items-center gap-0.5 cursor-pointer"
                    >
                      <span>Read Guide</span>
                      <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}

          {/* Pagination Controllers */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 pt-6 select-none">
              <button
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                className="p-2 border border-slate-205 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-400 disabled:opacity-40 rounded-xl hover:bg-slate-50 cursor-pointer disabled:cursor-not-allowed transition"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              
              {Array.from({ length: totalPages }).map((_, idx) => {
                const pageNum = idx + 1;
                const isCurrent = currentPage === pageNum;
                return (
                  <button
                    key={pageNum}
                    onClick={() => setCurrentPage(pageNum)}
                    className={`h-9 w-9 text-xs font-black rounded-xl transition ${
                      isCurrent
                        ? 'bg-blue-600 text-white'
                        : 'bg-white dark:bg-slate-905 border border-slate-200 dark:border-slate-800 text-slate-500 hover:bg-slate-50 cursor-pointer'
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}

              <button
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
                className="p-2 border border-slate-205 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-400 disabled:opacity-40 rounded-xl hover:bg-slate-50 cursor-pointer disabled:cursor-not-allowed transition"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          )}

        </div>

        {/* Sidebar Column: Popular Articles, Newsletter CTA & Utility Tools links */}
        <div className="space-y-8 lg:col-span-1">
          
          {/* A. Popular Articles Box */}
          <div className="p-6 bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-3xs space-y-6">
            <h3 className="text-base font-extrabold text-slate-900 dark:text-white flex items-center gap-2 border-b border-slate-100 dark:border-slate-850 pb-3">
              <Bookmark className="h-4 w-4 text-orange-500 fill-orange-505/20" />
              <span>Trending & Popular Guides</span>
            </h3>

            <div className="space-y-4">
              {popularPosts.map((post) => (
                <div key={post.slug} className="group space-y-1 block text-left">
                  <span className="text-[9px] font-black uppercase text-blue-500">
                    {post.category}
                  </span>
                  <h4
                    onClick={() => onSelectArticle(post.slug)}
                    className="text-xs font-extrabold text-slate-800 dark:text-slate-200 hover:text-blue-500 dark:hover:text-blue-400 transition cursor-pointer leading-snug line-clamp-2"
                  >
                    {post.title}
                  </h4>
                  <p className="text-[10px] text-slate-400 font-bold select-none">{post.date}</p>
                </div>
              ))}
            </div>
          </div>

          {/* B. Newsletter Subscription Box */}
          <div className="p-6 bg-linear-to-b from-blue-600 to-indigo-700 text-white rounded-3xl shadow-md space-y-4 relative overflow-hidden">
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#ffffff_1.5px,transparent_1.5px)] [background-size:16px_16px]" />
            <div className="space-y-2">
              <div className="h-9 w-9 rounded-full bg-white/10 flex items-center justify-center text-white">
                <Mail className="h-5 w-5" />
              </div>
              <h3 className="text-base font-extrabold">Subscribe to Development Briefs</h3>
              <p className="text-[11px] leading-relaxed text-blue-100 font-semibold">
                Enjoy weekly digests detailing client-side APIs, technical SEO adjustments, and lossless formatting optimizations without tracking cookies.
              </p>
            </div>

            {isSubscribed ? (
              <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 rounded-xl text-[11.5px] font-bold flex items-center gap-2">
                <CheckCircle className="h-4 w-4 shrink-0" />
                <span>Subscription Confirmed! Welcome aboard.</span>
              </div>
            ) : (
              <form onSubmit={handleNewsletterSubmit} className="space-y-2">
                <input
                  type="email"
                  required
                  placeholder="name@company.com"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="w-full bg-white/10 border border-white/20 text-white placeholder-white/50 text-xs py-2.5 px-3 rounded-xl focus:outline-none focus:border-white focus:bg-white/15"
                />
                <button
                  type="submit"
                  className="w-full py-2.5 bg-white text-blue-700 font-black text-xs rounded-xl hover:bg-slate-50 transition flex items-center justify-center gap-1.5 cursor-pointer shadow-3xs"
                >
                  <span>Join Newsletter</span>
                  <Send className="h-3 w-3" />
                </button>
              </form>
            )}
          </div>

          {/* C. Direct Utility Tool Access Row */}
          <div className="p-6 bg-white dark:bg-slate-900/40 border border-slate-205 dark:border-slate-800 rounded-3xl shadow-3xs space-y-4 text-left">
            <h3 className="text-sm font-extrabold text-slate-900 dark:text-white pb-2 border-b border-slate-100 dark:border-slate-855">
              NexusUtils High Performance Suites
            </h3>
            <div className="grid grid-cols-2 gap-2 text-[10.5px] font-black uppercase tracking-wider select-none">
              {[
                { name: 'Merge PDF', id: 'merge-pdf' },
                { name: 'Compress Image', id: 'compress-image' },
                { name: 'JSON Formatter', id: 'json-formatter' },
                { name: 'SQL Formatter', id: 'sql-formatter' },
                { name: 'Robots Creator', id: 'robots-generator' },
                { name: 'Meta Generator', id: 'meta-generator' }
              ].map((tu) => (
                <a
                  key={tu.id}
                  href={`/tools/${tu.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    window.history.pushState(null, '', `/tools/${tu.id}`);
                    window.location.reload();
                  }}
                  className="p-2 py-2.5 bg-slate-50 hover:bg-slate-100 dark:bg-slate-950 dark:hover:bg-slate-900 text-slate-500 hover:text-blue-500 dark:text-slate-400 rounded-lg text-center font-mono border border-slate-150 dark:border-slate-850 flex items-center justify-center"
                >
                  {tu.name}
                </a>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* 5. Informational SEO Text Row (Authority content footer block) */}
      <section className="p-8 bg-slate-50 dark:bg-slate-950/20 border border-slate-200 dark:border-slate-800 rounded-3xl space-y-4 max-w-4xl">
        <h3 className="text-base font-extrabold text-slate-850 dark:text-white pb-2 border-b border-slate-150 dark:border-slate-850">
          NexusUtils Content Architecture and Google Ranking Criteria
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-semibold">
          Every article published on the NexusUtils Blog complies strictly with modern search algorithms and Google Lighthouse performance metrics. We combine helpful human research with fast, responsive layouts, clear page titles, and clean on-page internal linking. Unlike traditional SaaS aggregators that populate your workspace with unsolicited popups, we deliver absolute compliance, 0% database tracking, and offline serverless operations.
        </p>
      </section>

    </div>
  );
}
