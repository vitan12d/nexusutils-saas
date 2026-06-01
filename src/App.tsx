import React, { useState, useEffect } from 'react';
import { 
  BrowserRouter, Routes, Route, Link, useParams, useLocation, useNavigate 
} from 'react-router-dom';
import { 
  Terminal, Sparkles, TrendingUp, Search, Activity, BookOpen, 
  Layers, ChevronRight, Check, HelpCircle, ChevronRightSquare, 
  ArrowLeft, Star, Heart, FileText, CheckCircle2, ShieldAlert,
  Bot, AlertCircle, Copy, ThumbsUp, Send, RefreshCw, Smartphone, Laptop
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// Data & Components Import
import { categories, tools, blogArticles, resources, faqs } from './data';
import { Tool, BlogArticle, ResourceItem } from './types';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CommandPalette from './components/CommandPalette';

// Tools Components Import
import JSONFormatter from './components/JSONFormatter';
import QRCodeGenerator from './components/QRCodeGenerator';
import PasswordMeter from './components/PasswordMeter';
import MarkdownPreviewer from './components/MarkdownPreviewer';
import HashConverter from './components/HashConverter';
import SEOTagGenerator from './components/SEOTagGenerator';
import UTMBuilder from './components/UTMBuilder';
import WordCounter from './components/WordCounter';
import UAParser from './components/UAParser';
import PDFHub from './components/PDFHub';
import HTMLSitemap from './components/HTMLSitemap';

// Inject JSON-LD Schema dynamically to DOM head
function useJsonLdSchema(schema: object | string) {
  useEffect(() => {
    const existing = document.getElementById('nexus-schema-jsonld');
    if (existing) {
      existing.remove();
    }
    const script = document.createElement('script');
    script.id = 'nexus-schema-jsonld';
    script.type = 'application/ld+json';
    script.innerHTML = typeof schema === 'string' ? schema : JSON.stringify(schema);
    document.head.appendChild(script);
    return () => {
      const el = document.getElementById('nexus-schema-jsonld');
      if (el) el.remove();
    };
  }, [schema]);
}

export default function App() {
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    // Sync theme on initial boot
    const saved = localStorage.getItem('nexus-pref-theme');
    return saved === 'dark' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches);
  });
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [showCookie, setShowCookie] = useState(() => !localStorage.getItem('nexus-cookie-accept'));

  // Theme Sync effect
  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
      localStorage.setItem('nexus-pref-theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('nexus-pref-theme', 'light');
    }
  }, [darkMode]);

  // Global key combo for Command Palette (⌘K or Ctrl+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setPaletteOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleCookieAccept = () => {
    localStorage.setItem('nexus-cookie-accept', 'true');
    setShowCookie(false);
  };

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 flex flex-col font-sans transition-colors duration-200">
        
        {/* Global Navigation Shell */}
        <Navbar 
          onSearchClick={() => setPaletteOpen(true)} 
          darkMode={darkMode} 
          setDarkMode={setDarkMode} 
        />

        {/* Primary Page Router Content Area */}
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/tools/:slug" element={<ToolRunnerPage />} />
            <Route path="/blog" element={<BlogIndexPage />} />
            <Route path="/blog/:slug" element={<BlogDetailsPage />} />
            <Route path="/resources" element={<ResourcesIndexPage />} />
            <Route path="/guides/:slug" element={<ResourceDetailsPage />} />
            <Route path="/checklists/:slug" element={<ResourceDetailsPage />} />
            <Route path="/templates/:slug" element={<ResourceDetailsPage />} />
            <Route path="/examples/:slug" element={<ResourceDetailsPage />} />
            <Route path="/compare/:slug" element={<ResourceDetailsPage />} />
            <Route path="/growth" element={<GrowthPage />} />
            <Route path="/revenue" element={<RevenuePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="/terms" element={<TermsPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/faq" element={<FAQPage />} />
            <Route path="/sitemap" element={<HTMLSitemap />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>

        {/* Global Footer Elements */}
        <Footer />

        {/* Floating Command Palette (⌘K) */}
        <CommandPalette isOpen={paletteOpen} onClose={() => setPaletteOpen(false)} />

        {/* High-Contrast GDPR Cookie Notice Banner */}
        <AnimatePresence>
          {showCookie && (
            <motion.div
              id="cookie-alert-notice"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 40 }}
              className="fixed bottom-4 right-4 max-w-sm bg-white dark:bg-slate-900 border border-slate-250 dark:border-slate-800 p-4 rounded-xl shadow-xl z-55 space-y-3"
            >
              <div className="flex items-start gap-2">
                <ShieldAlert className="h-4 w-4 text-blue-500 mt-0.5 shrink-0" />
                <p className="text-[11px] text-slate-500 dark:text-slate-405 leading-relaxed font-mono">
                  We use cookies and localized state to configure visual preferences and optimize offline-first operations. No login or identity indicators are tracked.
                </p>
              </div>
              <div className="flex items-center gap-2 justify-end">
                <Link to="/privacy" className="text-[10px] text-slate-400 hover:underline">Learn Protocols</Link>
                <button
                  onClick={handleCookieAccept}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold text-[10px] uppercase font-mono px-3.5 py-1.5 rounded cursor-pointer"
                >
                  Configure Acceptance
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </BrowserRouter>
  );
}

/* ==========================================================================
   PAGE: HOME (Premium SaaS Landing Page)
   ========================================================================== */
function HomePage() {
  const [activeTab, setActiveTab] = useState('all');

  const filteredTools = activeTab === 'all' 
    ? tools 
    : tools.filter(t => t.category === activeTab);

  // Dynamic Schema
  useJsonLdSchema({
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "NexusUtils",
    "url": "https://nexusutils.com",
    "description": "Powerful privacy-first utilities for developers, creators and operational businesses.",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://nexusutils.com/dashboard?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  });

  return (
    <div id="homepage-root" className="space-y-24 pb-20">
      
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden pt-20 pb-16 lg:pt-32">
        {/* Ambient atmospheric gradients */}
        <div className="absolute top-0 right-1/4 h-[500px] w-[500px] bg-blue-550/10 dark:bg-blue-500/5 glow-blur rounded-full animate-pulse-glow" />
        <div className="absolute bottom-0 left-1/4 h-[400px] w-[400px] bg-purple-550/10 dark:bg-purple-500/5 glow-blur rounded-full" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-6">
          
          <div className="inline-flex items-center gap-1.5 bg-blue-50 dark:bg-blue-500/10 text-xs text-blue-605 dark:text-blue-400 px-3 py-1 rounded-full font-mono font-extrabold uppercase tracking-wide">
            <Sparkles className="h-3.5 w-3.5" /> Launch Announcement: Workspace v4.0 is Live
          </div>

          <h1 className="font-display font-extrabold text-slate-900 dark:text-slate-50 tracking-tight leading-none text-4xl sm:text-5xl md:text-6xl max-w-4xl mx-auto">
            Free Online Tools for Developers, Creators and Businesses
          </h1>

          <p className="font-sans text-sm sm:text-base text-slate-500 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Powerful privacy-first utilities that work instantly. No signup required. No installation overhead. Absolute offline integrity and zero computational limits.
          </p>

          {/* Call to Actions (CTAs) */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
            <Link to="/dashboard" className="button-primary w-full sm:w-auto flex items-center gap-2">
              <Activity className="h-4 w-4" /> Go to Workspace Dashboard
            </Link>
            <a href="#popular-utilities" className="button-secondary w-full sm:w-auto">
              Explore Popular Tools
            </a>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 pt-12 text-slate-400 text-[11px] font-mono uppercase tracking-wider font-bold">
            <span className="flex items-center gap-1.5"><Check className="h-4 w-4 text-emerald-500" /> 100% Free Forever</span>
            <span className="flex items-center gap-1.5"><Check className="h-4 w-4 text-emerald-500" /> Pure Client Processing</span>
            <span className="flex items-center gap-1.5"><Check className="h-4 w-4 text-emerald-500" /> No Registration Needed</span>
          </div>

        </div>
      </section>

      {/* 2. CATEGORIES & POPULAR UTILITIES (GRID) */}
      <section id="popular-utilities" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 scroll-mt-24">
        
        <div className="text-center space-y-2">
          <div className="text-xs font-mono font-bold tracking-widest text-slate-405 dark:text-slate-500 uppercase">Interactive Elements</div>
          <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-slate-900 dark:text-slate-50">Popular Utilities Directory</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 max-w-lg mx-auto">Click into any tool container to boot the localized workbench instant.</p>
        </div>

        {/* Tab Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 border-b border-slate-200/65 dark:border-slate-800 pb-4">
          <button 
            onClick={() => setActiveTab('all')}
            className={`px-4 py-1.5 text-xs font-semibold uppercase tracking-wider rounded-lg transition-colors cursor-pointer ${activeTab === 'all' ? 'bg-blue-600 text-white' : 'text-slate-600 dark:text-slate-405 hover:bg-slate-100 dark:hover:bg-slate-900'}`}
          >
            All Tools
          </button>
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveTab(cat.id)}
              className={`px-4 py-1.5 text-xs font-semibold uppercase tracking-wider rounded-lg transition-colors cursor-pointer ${activeTab === cat.id ? 'bg-blue-600 text-white' : 'text-slate-600 dark:text-slate-405 hover:bg-slate-100 dark:hover:bg-slate-900'}`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Tools Cards Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTools.map(tool => {
            const IconComponent = tool.iconName === 'Code2' ? Terminal 
              : tool.iconName === 'QrCode' ? ChevronRightSquare 
              : tool.iconName === 'ShieldAlert' ? SecurityShieldIcon
              : tool.iconName === 'FileEdit' ? FileText 
              : tool.iconName === 'Binary' ? BinaryIcon 
              : tool.iconName === 'WordCounter' ? FileText
              : tool.iconName === 'UAParser' ? Smartphone
              : Bot;

            return (
              <Link 
                key={tool.id} 
                to={`/tools/${tool.slug}`}
                className="group relative bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-xl p-5 hover:border-blue-500 dark:hover:border-blue-500/50 hover:shadow-lg transition-all duration-200 text-left cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-4 mb-4">
                    <div className="p-2 bg-slate-50 dark:bg-slate-950 border border-slate-150 dark:border-slate-800 rounded-lg text-blue-600 dark:text-blue-400 group-hover:scale-105 transition-transform duration-150 shrink-0">
                      <IconComponent className="h-5 w-5" />
                    </div>
                    {/* Badge mapping */}
                    <div className="flex items-center gap-1.5">
                      {tool.popular && (
                        <span className="text-[9px] bg-blue-100 dark:bg-blue-500/15 text-blue-600 px-2 py-0.5 rounded font-mono font-bold uppercase tracking-wider">Popular</span>
                      )}
                      {tool.trending && (
                        <span className="text-[9px] bg-purple-100 dark:bg-purple-500/15 text-purple-600 px-2 py-0.5 rounded font-mono font-bold uppercase tracking-wider">Fast</span>
                      )}
                    </div>
                  </div>

                  <span className="text-xs font-semibold text-slate-900 dark:text-slate-50 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors block">
                    {tool.name}
                  </span>
                  <p className="text-[11px] leading-relaxed text-slate-500 dark:text-slate-400 mt-2 line-clamp-2">
                    {tool.description}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-100 dark:border-slate-850 flex items-center justify-between text-[10px] font-mono text-slate-400">
                  <span className="flex items-center gap-1">
                    <Star className="h-3 w-3 text-amber-400 fill-amber-400" />
                    Rating: {tool.rating}
                  </span>
                  <span className="flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    Launch Workbench <ChevronRight className="h-3 w-3" />
                  </span>
                </div>
              </Link>
            )
          })}
        </div>

      </section>

      {/* 3. PLATFORM FEATURES & SECURITY SEALS */}
      <section className="bg-slate-100/60 dark:bg-slate-900/40 py-16 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="max-w-3xl mx-auto text-center space-y-2">
            <span className="text-xs font-mono font-bold text-blue-600 uppercase tracking-widest">Enterprise Architecture</span>
            <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-slate-900 dark:text-slate-100">Why Developers Trust NexusUtils</h2>
            <p className="text-xs text-slate-500 leading-relaxed max-w-xl mx-auto">Unlike other static formatter catalogs online, our systems preserve absolute confidentiality limits while serving beautiful UX setups.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            <div className="bg-white dark:bg-slate-950 p-6 border border-slate-200/50 dark:border-slate-850 rounded-xl space-y-3">
              <div className="h-10 w-10 bg-blue-50 dark:bg-blue-500/10 text-blue-600 rounded-lg flex items-center justify-center"><CheckCircle2 className="h-5 w-5" /></div>
              <span className="text-sm font-bold block text-slate-900 dark:text-slate-100">Privacy First Vector</span>
              <p className="text-[11px] text-slate-550 dark:text-slate-400 leading-relaxed">Calculations and transcodings take place only client-side. No logs are saved. Safe from third-party intercept loops.</p>
            </div>
            <div className="bg-white dark:bg-slate-950 p-6 border border-slate-200/50 dark:border-slate-850 rounded-xl space-y-3">
              <div className="h-10 w-10 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 rounded-lg flex items-center justify-center"><Activity className="h-5 w-5" /></div>
              <span className="text-sm font-bold block text-slate-900 dark:text-slate-100">Blazing Execution Speeds</span>
              <p className="text-[11px] text-slate-550 dark:text-slate-400 leading-relaxed">Our static SPA file footprint delivers responsive actions under 15ms. Optimized specifically for keyboard operators.</p>
            </div>
            <div className="bg-white dark:bg-slate-950 p-6 border border-slate-200/50 dark:border-slate-850 rounded-xl space-y-3">
              <div className="h-10 w-10 bg-amber-50 dark:bg-amber-500/10 text-amber-600 rounded-lg flex items-center justify-center"><Bot className="h-5 w-5" /></div>
              <span className="text-sm font-bold block text-slate-900 dark:text-slate-100">AI groundings via Gemini</span>
              <p className="text-[11px] text-slate-550 dark:text-slate-400 leading-relaxed">Enrich programmatic workflows and page structures with industry models safely proxied over encrypted servers.</p>
            </div>
          </div>

        </div>
      </section>

      {/* 4. KNOWLEDGE HUB SECTION (BLOG & RESOURCES SHORTLISTS) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12">
        
        {/* Editorial column */}
        <div className="space-y-6 text-left">
          <div className="flex justify-between items-center border-b border-slate-200/60 dark:border-slate-800 pb-3">
            <span className="font-display font-extrabold text-lg text-slate-900 dark:text-slate-50 flex items-center gap-2">
              <BookOpen className="h-4 w-4 text-amber-500" /> Latest Technical Insights
            </span>
            <Link to="/blog" className="text-xs font-semibold text-blue-600 hover:underline">View Editorial Index →</Link>
          </div>
          <div className="space-y-4">
            {blogArticles.slice(0, 2).map((art) => (
              <Link 
                key={art.slug}
                to={`/blog/${art.slug}`}
                className="block bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-850 border border-slate-200/60 dark:border-slate-800 p-4 rounded-xl transition-colors text-left"
              >
                <div className="flex items-center gap-2 text-[10px] font-mono text-slate-400 mb-1">
                  <span>{art.category}</span>
                  <span>•</span>
                  <span>{art.readingTime}</span>
                </div>
                <span className="text-xs font-semibold text-slate-850 dark:text-slate-100 group-hover:text-blue-500 block line-clamp-1">{art.title}</span>
                <p className="text-[11px] text-slate-455 dark:text-slate-400 mt-1.5 line-clamp-2 leading-relaxed">{art.description}</p>
              </Link>
            ))}
          </div>
        </div>

        {/* Resources column */}
        <div className="space-y-6 text-left">
          <div className="flex justify-between items-center border-b border-slate-200/60 dark:border-slate-800 pb-3">
            <span className="font-display font-bold text-lg text-slate-900 dark:text-slate-50 flex items-center gap-2">
              <Layers className="h-4 w-4 text-purple-500" /> Featured Checklists & Guides
            </span>
            <Link to="/resources" className="text-xs font-semibold text-blue-600 hover:underline">Knowledge Hub →</Link>
          </div>
          <div className="space-y-4 animate-fade-in">
            {resources.slice(0, 2).map((res) => (
              <Link
                key={res.slug}
                to={`/${res.type === 'guide' ? 'guides' : res.type === 'checklist' ? 'checklists' : 'templates'}/${res.slug}`}
                className="block bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-850 border border-slate-200/60 dark:border-slate-800 p-4 rounded-xl transition-colors text-left"
              >
                <div className="flex items-center gap-2 text-[10px] font-mono text-slate-400 mb-1">
                  <span className="font-bold text-purple-600 uppercase tracking-widest">{res.type}</span>
                </div>
                <span className="text-xs font-semibold text-slate-850 dark:text-slate-100 block line-clamp-1">{res.title}</span>
                <p className="text-[11px] text-slate-450 dark:text-slate-400 mt-1.5 line-clamp-2 leading-relaxed">{res.description}</p>
              </Link>
            ))}
          </div>
        </div>

      </section>

      {/* 5. NEWSLETTER CTR CONTAINER */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-blue-600 dark:bg-blue-900 rounded-2xl p-8 sm:p-12 text-center text-white relative overflow-hidden shadow-xl">
          {/* Ambient background ornament path */}
          <div className="absolute top-0 right-0 h-40 w-40 bg-white/5 rounded-full scale-150 transform translate-x-12 -translate-y-12" />
          
          <div className="max-w-2xl mx-auto space-y-4 relative z-10">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-blue-200">The Nexus Circulate</span>
            <h3 className="font-display font-extrabold text-xl sm:text-2xl">Subscribe to programmatical SEO updates</h3>
            <p className="text-xs text-blue-100 font-sans leading-relaxed">Join 18,000+ engineers, creators, and growth agents receives raw performance, AdSense optimization breakdowns, and new custom tool rollouts biweekly.</p>
            
            {/* Newsletter input layout */}
            <div className="flex flex-col sm:flex-row gap-2 pt-4 max-w-sm mx-auto">
              <input 
                type="email" 
                placeholder="Enter workspace email..." 
                className="w-full bg-white/10 dark:bg-black/20 border border-white/20 px-4 py-2.5 rounded-lg text-xs placeholder-white/60 text-white focus:outline-none focus:ring-2 focus:ring-white/40"
              />
              <button 
                onClick={() => alert("Success! Workspace subscription verified.")}
                className="bg-white hover:bg-slate-50 text-blue-600 font-bold px-5 py-2.5 rounded-lg text-xs tracking-wider uppercase font-mono cursor-pointer shrink-0 transition-colors"
              >
                Join
              </button>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}

/* ==========================================================================
   PAGE: DASHBOARD (Modern SaaS Workspace Core)
   ========================================================================== */
function DashboardPage() {
  const [filterQuery, setFilterQuery] = useState('');
  const [favorites, setFavorites] = useState<string[]>(['json-formatter', 'qr-generator']);

  const toggleFavorite = (id: string) => {
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
    );
  };

  const searchedTools = tools.filter(tool => 
    tool.name.toLowerCase().includes(filterQuery.toLowerCase()) ||
    tool.description.toLowerCase().includes(filterQuery.toLowerCase())
  );

  return (
    <div id="dashboard-root" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10 text-left">
      
      {/* Upper header segment */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-6">
        <div>
          <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-slate-900 dark:text-white">Workspace Dashboard</h1>
          <p className="text-xs text-slate-500 mt-1">Unified entry panel to all active system modules, shortcuts and operational trackers.</p>
        </div>
        
        {/* Rapid filter input */}
        <div className="relative w-full md:w-72">
          <input
            type="text"
            value={filterQuery}
            onChange={(e) => setFilterQuery(e.target.value)}
            placeholder="Filter active modules..."
            className="input-field pl-9"
          />
          <div className="absolute left-3 top-3.5 text-slate-400">
            <Search className="h-4 w-4" />
          </div>
        </div>
      </div>

      {/* FAVORITES SHELF */}
      {favorites.length > 0 && !filterQuery && (
        <div className="space-y-4" id="fav-shelf">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-405 flex items-center gap-1.5">
            <Heart className="h-4 w-4 text-red-500 fill-red-500 animate-pulse" /> Your Favorite Workbenches
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {tools.filter(t => favorites.includes(t.id)).map(fav => (
              <div 
                key={fav.id}
                className="bg-white dark:bg-slate-900 p-4 border border-slate-200/80 dark:border-slate-850 rounded-xl flex items-center justify-between gap-4 relative hover:border-slate-300 dark:hover:border-slate-800 transition-colors"
              >
                <div className="truncate pr-4">
                  <Link to={`/tools/${fav.slug}`} className="text-xs font-bold text-slate-800 dark:text-slate-100 hover:text-blue-500 block truncate">
                    {fav.name}
                  </Link>
                  <span className="text-[10px] text-slate-400 font-mono italic block truncate mt-0.5">{fav.description}</span>
                </div>
                <button 
                  onClick={() => toggleFavorite(fav.id)}
                  className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-red-500 cursor-pointer shrink-0"
                  title="Remove from workbench favorites"
                >
                  <Trash2Icon className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* PRIMARY GRID OF ALL MODULES */}
      <div className="space-y-4">
        <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-405 block">
          All Workspace Utilities ({searchedTools.length})
        </span>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {searchedTools.map(tool => {
            const isFav = favorites.includes(tool.id);
            return (
              <div 
                key={tool.id}
                className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 hover:border-slate-350 dark:hover:border-slate-750 p-5 rounded-xl flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-between items-start gap-4">
                    <Link to={`/tools/${tool.slug}`} className="text-xs font-bold font-display text-slate-850 dark:text-slate-50 hover:text-blue-600 dark:hover:text-blue-400 block">
                      {tool.name}
                    </Link>
                    <button
                      onClick={() => toggleFavorite(tool.id)}
                      className={`p-1.5 rounded-lg border border-slate-200/40 dark:border-slate-800/60 hover:bg-slate-50 dark:hover:bg-slate-900 cursor-pointer shrink-0 ${isFav ? 'text-red-500' : 'text-slate-400'}`}
                      title={isFav ? "Favorited" : "Mark as workspace favorite"}
                    >
                      <Heart className={`h-4 w-4 ${isFav ? 'fill-red-500' : ''}`} />
                    </button>
                  </div>
                  <p className="text-[11px] leading-relaxed text-slate-500 mt-2 line-clamp-3">{tool.description}</p>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-100 dark:border-slate-850 flex items-center justify-between text-[10px] font-mono font-bold">
                  <span className={tool.runsClientSide ? 'text-emerald-600 dark:text-emerald-450' : 'text-amber-600 dark:text-amber-450'}>
                    ● {tool.runsClientSide ? 'Client Sandbox' : 'AI Node API'}
                  </span>
                  <Link to={`/tools/${tool.slug}`} className="text-blue-600 dark:text-blue-450 hover:underline">
                    Initialize Workbench →
                  </Link>
                </div>
              </div>
            )
          })}
        </div>
      </div>

    </div>
  );
}

/* ==========================================================================
   PAGE: TOOL RUNNER (Active tool workspace core)
   ========================================================================== */
function ToolRunnerPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const tool = tools.find(t => t.slug === slug);

  if (!tool) {
    return <NotFoundPage />;
  }

  // Dynamic schema LD injection for indexing optimization
  useJsonLdSchema({
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": tool.name,
    "operatingSystem": "All",
    "applicationCategory": "DeveloperApplication",
    "description": tool.description,
    "offers": {
      "@type": "Offer",
      "price": "0.00",
      "priceCurrency": "USD"
    }
  });

  return (
    <div id="runner-root" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12 text-left">
      
      {/* 1. Header trace links */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-150 dark:border-slate-850 pb-5">
        <div className="space-y-1">
          <div className="flex items-center gap-1 text-[11px] font-mono text-slate-400">
            <Link to="/dashboard" className="hover:text-blue-600 hover:underline">Dashboard</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-slate-550 dark:text-slate-350 capitalize">{tool.category}</span>
          </div>
          <h1 className="font-display font-extrabold text-2xl text-slate-900 dark:text-white flex items-center gap-2">
            {tool.name}
          </h1>
          <p className="text-xs text-slate-500 leading-normal max-w-xl">{tool.longDescription}</p>
        </div>

        <button 
          onClick={() => navigate('/dashboard')}
          className="button-secondary shrink-0 text-xs py-2 px-3.5 flex items-center gap-1.5"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Workspace
        </button>
      </div>

      {/* 2. CORE WORKSPACE UTILITY BLOCK */}
      <section className="bg-white dark:bg-slate-900 border border-slate-250/80 dark:border-slate-800 p-5 md:p-8 rounded-2xl shadow-sm">
        {tool.id === 'json-formatter' && <JSONFormatter />}
        {tool.id === 'qr-generator' && <QRCodeGenerator />}
        {tool.id === 'password-generator' && <PasswordMeter />}
        {tool.id === 'markdown-editor' && <MarkdownPreviewer />}
        {tool.id === 'text-analyzer' && <HashConverter />}
        {tool.id === 'seo-helper' && <SEOTagGenerator />}
        {tool.id === 'utm-builder' && <UTMBuilder />}
        {tool.id === 'word-counter' && <WordCounter />}
        {tool.id === 'ua-parser' && <UAParser />}
        {tool.id === 'pdf-hub' && <PDFHub />}
      </section>

      {/* 3. RELATED SCIENTIFIC FAQS Segment */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left deep description */}
        <div className="lg:col-span-1 space-y-3">
          <HelpCircle className="h-8 w-8 text-blue-500" />
          <h3 className="font-display font-bold text-lg text-slate-900 dark:text-slate-50">Scientific Tool Documentation</h3>
          <p className="text-[11px] leading-relaxed text-slate-455">
            Designed and compiled utilizing low-overhead compilation engines, guaranteeing that your values remain safe from network tracking tags. Explore answers to mechanical questions nearby.
          </p>
        </div>

        {/* Right list */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-slate-50 dark:bg-slate-900 rounded-xl p-5 border border-slate-150 dark:border-slate-800">
            <span className="font-semibold text-xs block text-slate-850 dark:text-slate-100">Does {tool.name} transfer data blocks to servers?</span>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
              No. Our workspace runs 100% on client JS. No data inputs reach external routes, except when leveraging optional AI content modules proxied safely under SSL layers.
            </p>
          </div>
          <div className="bg-slate-50 dark:bg-slate-900 rounded-xl p-5 border border-slate-150 dark:border-slate-800">
            <span className="font-semibold text-xs block text-slate-850 dark:text-slate-100">Can other operators view history strings?</span>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
              No. Every payload cleans automatically out of variable spaces once browser tabs are closed. Your secrets remain secure.
            </p>
          </div>
        </div>

      </section>

    </div>
  );
}

/* ==========================================================================
   PAGE: TECHNICAL EDITORIAL INDEX (BLOG)
   ========================================================================== */
function BlogIndexPage() {
  return (
    <div id="blog-index-root" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12 text-left">
      
      <div className="border-b border-slate-200 dark:border-slate-800 pb-6">
        <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-slate-900 dark:text-white">Editorial & Technical Blog</h1>
        <p className="text-xs text-slate-500 mt-1">Deep architectural breakdowns, SEO frameworks, cryptographic performance benchmarks, and scale tactics.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {blogArticles.map(art => (
          <article 
            key={art.slug}
            className="flex flex-col justify-between bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-xl p-6 hover:shadow-lg transition-shadow relative"
          >
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-[10px] font-mono text-slate-400 uppercase">
                <span className="font-bold text-blue-600 dark:text-blue-400">{art.category}</span>
                <span>•</span>
                <span>{art.readingTime}</span>
              </div>
              <Link to={`/blog/${art.slug}`} className="font-display font-extrabold text-base hover:text-blue-600 hover:underline block leading-snug">
                {art.title}
              </Link>
              <p className="text-[11px] text-slate-500 leading-relaxed line-clamp-3">{art.description}</p>
            </div>

            {/* Author row */}
            <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-850 flex items-center gap-3">
              <img src={art.author.avatar} alt="Author file profile" className="h-8 w-8 rounded-full border border-slate-200 shrink-0 object-cover" />
              <div>
                <span className="text-[11px] font-semibold text-slate-800 dark:text-slate-100 block">{art.author.name}</span>
                <span className="text-[9px] text-slate-400 block">{art.author.role}</span>
              </div>
            </div>
          </article>
        ))}
      </div>

    </div>
  );
}

/* ==========================================================================
   PAGE: EDITORIAL ARTICLE DETAILS (BLOG SINGLE)
   ========================================================================== */
function BlogDetailsPage() {
  const { slug } = useParams<{ slug: string }>();
  const art = blogArticles.find(b => b.slug === slug);

  if (!art) {
    return <NotFoundPage />;
  }

  // Dynamic schema mapping
  useJsonLdSchema({
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": art.title,
    "description": art.description,
    "datePublished": art.date,
    "author": {
      "@type": "Person",
      "name": art.author.name
    }
  });

  return (
    <article id="article-details-root" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-left space-y-8">
      
      {/* Return button */}
      <Link to="/blog" className="text-xs text-blue-600 hover:underline inline-flex items-center gap-1 font-mono font-bold uppercase">
        <ArrowLeft className="h-3.5 w-3.5" /> Back to Blog Index
      </Link>

      <div className="space-y-4">
        <div className="flex items-center gap-2 text-xs font-mono text-slate-400 uppercase font-bold">
          <span className="text-blue-605">{art.category}</span>
          <span>•</span>
          <span>{art.readingTime}</span>
        </div>
        <h1 className="font-display font-extrabold text-2xl sm:text-4xl text-slate-900 dark:text-white leading-tight">
          {art.title}
        </h1>
        
        {/* Author box */}
        <div className="flex items-center gap-3 pt-2">
          <img src={art.author.avatar} alt="Writer logo avatar" className="h-9 w-9 rounded-full border shrink-0 object-cover" />
          <div>
            <span className="text-xs font-semibold block text-slate-800 dark:text-slate-100">{art.author.name}</span>
            <span className="text-[10px] text-slate-400 block">{art.author.role}</span>
          </div>
        </div>
      </div>

      {/* Render Markdown block compilation inside HTML layout */}
      <div className="markdown-body border-y border-slate-150 dark:border-slate-850 py-8 text-sm leading-relaxed space-y-4 whitespace-pre-wrap select-text text-slate-750 dark:text-slate-300">
        {art.content}
      </div>

      {/* Related tags */}
      <div className="flex flex-wrap gap-2 pt-4">
        {art.tags.map(tag => (
          <span key={tag} className="text-[10px] uppercase font-mono font-semibold bg-slate-100 dark:bg-slate-900 px-2.5 py-1 rounded">
            #{tag}
          </span>
        ))}
      </div>

    </article>
  );
}

/* ==========================================================================
   PAGE: RESOURCES KNOWLEGDE INDEX (HQ GUIDES / CHECKS)
   ========================================================================== */
function ResourcesIndexPage() {
  return (
    <div id="resources-index-root" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12 text-left animate-fade-in">
      
      <div className="border-b border-slate-200 dark:border-slate-800 pb-6">
        <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-slate-900 dark:text-white">Knowledge Hub & Resources</h1>
        <p className="text-xs text-slate-500 mt-1">High-impact pre-launch checklist variables, detailed optimization guides, and architectural scorecards.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {resources.map(res => {
          const typePath = res.type === 'guide' ? 'guides' : res.type === 'checklist' ? 'checklists' : res.type === 'template' ? 'templates' : res.type === 'example' ? 'examples' : 'compare';
          return (
            <Link 
              key={res.slug}
              to={`/${typePath}/${res.slug}`}
              className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-855 rounded-xl p-5 hover:border-purple-500 dark:hover:border-purple-650 transition-colors flex flex-col justify-between cursor-pointer"
            >
              <div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400 block mb-2">{res.type}</span>
                <span className="text-xs font-semibold text-slate-800 dark:text-slate-50 hover:text-purple-500 block">
                  {res.title}
                </span>
                <p className="text-[11px] text-slate-450 mt-2 line-clamp-3">{res.description}</p>
              </div>
              <div className="mt-5 pt-3 border-t border-slate-100 dark:border-slate-850 flex items-center justify-between text-[11px] font-mono text-slate-400">
                <span>View Details</span>
                <ChevronRight className="h-4 w-4" />
              </div>
            </Link>
          );
        })}
      </div>

    </div>
  );
}

/* ==========================================================================
   PAGE: RESOURCE DETAILS SINGLE (GUIDE/CHECKLIST VIEWER)
   ========================================================================== */
function ResourceDetailsPage() {
  const { slug } = useParams<{ slug: string }>();
  const res = resources.find(r => r.slug === slug);

  if (!res) {
    return <NotFoundPage />;
  }

  // Schema LD
  useJsonLdSchema({
    "@context": "https://schema.org",
    "@type": "TechArticle",
    "headline": res.title,
    "description": res.description
  });

  return (
    <div id="resource-detail-view" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 text-left space-y-10">
      
      <Link to="/resources" className="text-xs text-blue-600 hover:underline font-mono font-bold uppercase inline-flex items-center gap-1">
        <ArrowLeft className="h-4 w-4" /> Back to Knowledge Hub
      </Link>

      <div className="space-y-2">
        <span className="text-xs font-mono font-bold uppercase tracking-wider text-purple-600">{res.type} document</span>
        <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-slate-900 dark:text-white">{res.title}</h1>
        <p className="text-sm text-slate-500">{res.description}</p>
      </div>

      {/* Render Markdown */}
      <div className="prose dark:prose-invert border-y border-slate-150 dark:border-slate-850 py-8 text-sm text-slate-700 dark:text-slate-300 leading-relaxed space-y-4 whitespace-pre-wrap select-text">
        {res.content}
      </div>

      {/* Interactive FAQ associated */}
      {res.faq && res.faq.length > 0 && (
        <div className="space-y-4 pt-4">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-405 block">FAQ Details</span>
          <div className="space-y-3">
            {res.faq.map((f, i) => (
              <div key={i} className="bg-slate-50 dark:bg-slate-900 p-4 border border-slate-200/80 dark:border-slate-800 rounded-xl">
                <span className="font-semibold text-xs block text-slate-850 dark:text-slate-100">{f.question}</span>
                <p className="text-[11px] text-slate-500 mt-1">{f.answer}</p>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}

/* ==========================================================================
   PAGE: GROWTH BLUEPRINT (Technical SEO)
   ========================================================================== */
function GrowthPage() {
  return (
    <div id="growth-center-root" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12 text-left">
      
      <div className="border-b border-slate-200 dark:border-slate-800 pb-6 max-w-3xl">
        <h1 className="font-display font-extrabold text-2xl sm:text-4xl text-slate-900 dark:text-white">SEO Growth Center</h1>
        <p className="text-sm text-slate-500 mt-2 leading-relaxed">Discover battle-tested techniques to systematically increase index visibility, capture raw intent traffic, and architect high-margin programmatic utility directories.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
        
        <div className="bg-white dark:bg-slate-900 border border-slate-205 dark:border-slate-800 p-6 rounded-2xl relative space-y-4">
          <div className="h-10 w-10 bg-amber-50 dark:bg-amber-500/10 text-amber-600 rounded-lg flex items-center justify-center"><Sparkles className="h-5 w-5" /></div>
          <span className="font-display font-extrabold text-base text-slate-900 dark:text-white block">Programmatic SEO Frameworks</span>
          <p className="text-xs leading-relaxed text-slate-500 dark:text-slate-400">
            Learn step-by-step how to construct databases targeting "vs", "alternative to", "format", and "hashing" long-tail index variables. We optimize page structures to ensure immediate indexing on Google Search Console.
          </p>
          <div className="text-[11px] font-mono font-semibold text-blue-600"><Link to="/blog/demystifying-programmatic-seo" className="hover:underline">Read Programmatic Guide →</Link></div>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-205 dark:border-slate-800 p-6 rounded-2xl relative space-y-4">
          <div className="h-10 w-10 bg-blue-50 dark:bg-blue-500/10 text-blue-600 rounded-lg flex items-center justify-center"><Activity className="h-5 w-5" /></div>
          <span className="font-display font-bold text-base text-slate-900 dark:text-white block">Speed and INP optimizations</span>
          <p className="text-xs leading-relaxed text-slate-500 dark:text-slate-400">
            Lighthouse scores are a core ranking signal. We outline strategies to keep core interaction frames (INP) under 200 milliseconds by performing computing locally and optimizing asynchronous script deferments.
          </p>
          <div className="text-[11px] font-mono font-semibold text-blue-600"><Link to="/guides/core-web-vitals-optimization" className="hover:underline">Read Core Web Vitals Guide →</Link></div>
        </div>

      </div>

    </div>
  );
}

/* ==========================================================================
   PAGE: REVENUE BLUEPRINT (AdSense Checklist)
   ========================================================================== */
function RevenuePage() {
  return (
    <div id="revenue-center-root" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12 text-left">
      
      <div className="border-b border-slate-200 dark:border-slate-800 pb-6 max-w-3xl">
        <h1 className="font-display font-extrabold text-2xl sm:text-4xl text-slate-900 dark:text-white">Revenue & Monetization Strategy</h1>
        <p className="text-sm text-slate-500 mt-2 leading-relaxed">Maximize Publisher Revenue without degrading client interaction. Actionable techniques on display configurations, AdSense setups, and yield multipliers.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
        
        <div className="bg-white dark:bg-slate-900 border border-slate-205 dark:border-slate-800 p-6 rounded-2xl relative space-y-4">
          <div className="h-10 w-10 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 rounded-lg flex items-center justify-center"><Star className="h-5 w-5" /></div>
          <span className="font-display font-bold text-base text-slate-900 dark:text-white block">Ad Placement Checklist</span>
          <p className="text-xs leading-relaxed text-slate-500 dark:text-slate-400">
            Analyze exactly where to place display banners on developer utility sites. Banners next to long-duration form areas earn significantly higher CPM because of enhanced view-duration parameters.
          </p>
          <div className="text-[11px] font-mono font-semibold text-blue-600"><Link to="/guides/adsense-integration-strategy" className="hover:underline">Read Monetization Guide →</Link></div>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-205 dark:border-slate-800 p-6 rounded-2xl relative space-y-4">
          <div className="h-10 w-10 bg-purple-50 dark:bg-purple-500/10 text-purple-600 rounded-lg flex items-center justify-center"><Layers className="h-5 w-5" /></div>
          <span className="font-display font-bold text-base text-slate-900 dark:text-white block">Affiliate & Products</span>
          <p className="text-xs leading-relaxed text-slate-500 dark:text-slate-400">
            Combine quiet display cards with custom sponsors, hosting affiliates, or API keys packages. Free traffic can be systematically converted into premium SaaS conversions.
          </p>
          <div className="text-[11px] font-mono font-semibold text-blue-600"><Link to="/blog/demystifying-programmatic-seo" className="hover:underline">Read SaaS Strategy →</Link></div>
        </div>

      </div>

    </div>
  );
}

/* ==========================================================================
   PAGE: ABOUT
   ========================================================================== */
function AboutPage() {
  return (
    <div id="about-root" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-left space-y-6">
      <div className="border-b border-slate-200 dark:border-slate-800 pb-5">
        <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-slate-900 dark:text-white">About NexusUtils</h1>
        <p className="text-xs text-slate-500 mt-1">Our mission, engineering values, and dedication to speed.</p>
      </div>
      <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
        NexusUtils was founded in 2026 by a collaborative network of software engineers, technical SEO professionals, and media editors. Our goal is to solve a common developer headache: the bloat, slowness, and overwhelming intrusion of logins and ads typical of legacy micro-utility websites. We envisioned a fast, unified, client-safe hub that values your screen estate and loading times above all.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
        <div className="p-5 bg-slate-50 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800 rounded-xl space-y-2">
          <h3 className="font-bold text-xs text-slate-900 dark:text-slate-100 uppercase tracking-wide">Client-Side Architecture</h3>
          <p className="text-[11px] text-slate-500 leading-relaxed">
            Unlike other utilities, we prioritize client-side execution. Your private data — such as cryptographic hashes, base64 strings, or custom API JSON structures — is computed inside your local browser context. It is never transmitted across the network, ensuring complete confidentiality.
          </p>
        </div>
        <div className="p-5 bg-slate-50 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800 rounded-xl space-y-2">
          <h3 className="font-bold text-xs text-slate-900 dark:text-slate-100 uppercase tracking-wide">SEO & Content Synergy</h3>
          <p className="text-[11px] text-slate-500 leading-relaxed">
            By accompanying our robust, high-performance web utility calculators with dynamic tutorial blocks, schema JSON-LD, and deep editorial studies, we build a comprehensive resource space both search crawlers and human readers love.
          </p>
        </div>
      </div>
      <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed pt-2">
        NexusUtils remains entirely free of cost. We support our hosting costs and independent research solely through premium display slots (such as Google AdSense) that respect layouts and score outstanding metrics on Core Web Vitals (LCP, CLS, INP).
      </p>
    </div>
  );
}

/* ==========================================================================
   PAGE: PRIVACY PROTOCOLS (GOOGLE ADSENSE COMPLIANT)
   ========================================================================== */
function PrivacyPage() {
  return (
    <div id="privacy-root" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-left space-y-6 select-text leading-relaxed">
      <div className="border-b border-slate-200 dark:border-slate-800 pb-5">
        <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-slate-900 dark:text-white">Privacy Policy & Cookies</h1>
        <p className="text-xs text-slate-405 font-mono">Last Updated & Verified: June 1, 2026</p>
      </div>

      <p className="text-xs text-slate-550">
        At NexusUtils, accessible from our primary domain, the privacy of our visitors is one of our absolute main priorities. This Privacy Policy document contains types of information that is collected and recorded by NexusUtils and how we utilize it.
      </p>

      <div className="space-y-4">
        <h3 className="font-display font-bold text-sm text-slate-900 dark:text-white">1. Local Device Memory Isolation</h3>
        <p className="text-xs text-slate-500 font-sans">
          Most utilities provided on the NexusUtils platform (e.g., JSON Formatter, Secure Password Generator, UTM Builder, Word Counter, Hash Converters) operate in complete isolation in your client-side browser layer. No user input text, files, credentials, or outputs are collected or processed on our backend servers.
        </p>

        <h3 className="font-display font-bold text-sm text-slate-900 dark:text-white">2. Log Files & Diagnostic Data</h3>
        <p className="text-xs text-slate-500 font-sans">
          NexusUtils follows a standard procedure of using log files. These files log visitors when they visit websites. All hosting companies do this as part of hosting services' analytics. The information collected by log files includes internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date and time stamp, referring/exit pages, and possibly the number of clicks. These are not linked to any information that is personally identifiable. The purpose of the information is for analyzing trends, administering the site, tracking users' movement on the website, and gathering demographic info.
        </p>

        <h3 className="font-display font-bold text-sm text-slate-900 dark:text-white">3. Google DoubleClick DART Cookies & Advertisements</h3>
        <p className="text-xs text-slate-500 font-sans">
          Google is one of the essential third-party vendors on our site. It also uses cookies, known as DART cookies, to serve ads to our site visitors based upon their visit to our platform and other sites on the internet. However, visitors may choose to decline the use of DART cookies by visiting the Google ad and content network Privacy Policy at the following URL – <a href="https://policies.google.com/technologies/ads" className="text-blue-500 hover:underline" target="_blank" rel="noopener noreferrer">https://policies.google.com/technologies/ads</a>.
        </p>

        <h3 className="font-display font-bold text-sm text-slate-900 dark:text-white">4. Our Advertising Partners & Third-Party Actions</h3>
        <p className="text-xs text-slate-500 font-sans">
          Some of the advertisers on our site may use cookies and web beacons. Our advertising partners include Google AdSense. Third-party ad servers or ad networks use technologies like cookies, JavaScript, or Web Beacons that are used in their respective advertisements and links that appear on NexusUtils, which are sent directly to users' browsers. They automatically receive your IP address when this occurs. These technologies are used to measure the effectiveness of their advertising campaigns and/or to personalize the advertising content that you see on websites that you visit.
        </p>
        <p className="text-xs text-slate-400 font-sans italic">
          Please note that NexusUtils has no access to or control over these cookies used by third-party advertisers. You should consult their respective privacy protocols for detailed opting guidelines.
        </p>

        <h3 className="font-display font-bold text-sm text-slate-900 dark:text-white">5. GDPR & CCPA Privacy Rights (Do Not Sell My Info)</h3>
        <p className="text-xs text-slate-500 font-sans">
          We want to make sure you are fully aware of all of your data protection rights. Every user is entitled to the following:
        </p>
        <ul className="list-disc pl-5 text-xs text-slate-500 space-y-1 font-sans">
          <li><strong>The right to access</strong> – You have the right to request copies of your personal data.</li>
          <li><strong>The right to rectification</strong> – You have the right to request that we correct any information you believe is inaccurate.</li>
          <li><strong>The right to erasure</strong> – You have the right to request that we erase your personal data under certain conditions.</li>
          <li><strong>The right to restrict processing</strong> – You have the right to request that we object to or restrict processing.</li>
        </ul>
      </div>
    </div>
  );
}

/* ==========================================================================
   PAGE: TERMS OF USE
   ========================================================================== */
function TermsPage() {
  return (
    <div id="terms-root" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-left space-y-6 select-text leading-relaxed">
      <div className="border-b border-slate-200 dark:border-slate-800 pb-5">
        <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-slate-900 dark:text-white">Terms of Service</h1>
        <p className="text-xs text-slate-405 font-mono font-bold uppercase">Platform Agreement Version V26.1</p>
      </div>

      <div className="space-y-4 text-xs text-slate-500 font-sans">
        <p>
          Welcome to NexusUtils. By accessing our platform, tools, web portals, and resources, you agree to comply with and be bound by the following Terms of Service. If you do not accept these terms, you are restricted from utilizing our services.
        </p>
        
        <h3 className="font-display font-bold text-sm text-slate-900 dark:text-white uppercase tracking-wider">1. Use License</h3>
        <p>
          Permission is granted to open-access and utilize the tools on NexusUtils entirely free of cost for personal, educational, developer sandbox testing, or commercial applications. You must not:
        </p>
        <ul className="list-disc pl-5 mt-1 space-y-1">
          <li>Use the tools for automatic high-volume malicious server-access loops.</li>
          <li>Incorporate our client-side modules into frame wrappers without explicit attribution.</li>
          <li>Attempt to decompile or reverse-engineer any proprietary metadata segments.</li>
        </ul>

        <h3 className="font-display font-bold text-sm text-slate-900 dark:text-white uppercase tracking-wider">2. Disclaimer of Liabilities</h3>
        <p>
          The utilities and output models provided by NexusUtils are rendered on an "As-Is" and "As-Available" basis. NexusUtils makes no structural warranties, expressed or implied, regarding the continuous availability, error-free execution, or validation accuracy of our cryptographic formats, JSON parsers, or SEO generation blocks.
        </p>
      </div>
    </div>
  );
}

/* ==========================================================================
   PAGE: DEVELOPER CONTACT
   ========================================================================== */
function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('Utility Feedback');
  const [msg, setMsg] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const clickSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setName('');
    setEmail('');
    setMsg('');
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <div id="contact-root" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-left grid grid-cols-1 md:grid-cols-12 gap-8 select-text">
      
      {/* Contact info (Left 5 cols) */}
      <div className="md:col-span-5 space-y-6">
        <div className="space-y-2">
          <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-slate-900 dark:text-white">Contact Our Team</h1>
          <p className="text-xs text-slate-500 leading-relaxed">Have custom utility suggestions, found an error, or have AdSense partnership inquiries? Reach out directly.</p>
        </div>

        <div className="space-y-4">
          <div className="p-4 bg-slate-50 dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 rounded-xl space-y-1.5">
            <span className="text-[10px] font-mono font-bold text-blue-500 uppercase">General Inquiries</span>
            <span className="text-xs font-bold text-slate-800 dark:text-slate-100 block font-mono">support@nexusutils.online</span>
          </div>

          <div className="p-4 bg-slate-50 dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 rounded-xl space-y-1.5">
            <span className="text-[10px] font-mono font-bold text-emerald-500 uppercase">Administration & Ads Support</span>
            <span className="text-xs font-bold text-slate-800 dark:text-slate-100 block font-mono">admin@nexusutils.online</span>
          </div>

          <p className="text-[10px] text-slate-400 font-sans italic leading-relaxed">
            * Our team makes a strict effort to follow up on developer suggestions and partnership inquiries within 24–48 hours of transmission.
          </p>
        </div>
      </div>

      {/* Form (Right 7 cols) */}
      <form onSubmit={clickSubmit} className="md:col-span-7 bg-white dark:bg-slate-950 p-6 border border-slate-200 dark:border-slate-800 rounded-2xl space-y-4">
        <span className="text-xs font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wide block">Transmission Portal</span>

        {submitted && (
          <div className="p-3 bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200/80 dark:border-emerald-500/20 text-emerald-600 dark:text-emerald-400 rounded-lg text-xs font-semibold">
            Success! Your transmission has been safely received. Our representative will respond shortly.
          </div>
        )}

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <label htmlFor="contact-name" className="text-[10px] font-mono font-bold text-slate-400 uppercase">Full Name</label>
            <input 
              id="contact-name"
              type="text" 
              required 
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Elena Rostova" 
              className="input-field w-full" 
            />
          </div>

          <div className="space-y-1">
            <label htmlFor="contact-email" className="text-[10px] font-mono font-bold text-slate-400 uppercase">Email Address</label>
            <input 
              id="contact-email"
              type="email" 
              required 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="elena@company.com" 
              className="input-field w-full" 
            />
          </div>
        </div>

        <div className="space-y-1">
          <label htmlFor="contact-subject" className="text-[10px] font-mono font-bold text-slate-400 uppercase">Subject Topic</label>
          <select 
            id="contact-subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="input-field w-full bg-white dark:bg-slate-950"
          >
            <option value="Feedback">Suggestions & Feedback</option>
            <option value="Error">Bug Report & Support</option>
            <option value="AdSense">AdSense & Advertising partnership</option>
          </select>
        </div>

        <div className="space-y-1">
          <label htmlFor="contact-msg" className="text-[10px] font-mono font-bold text-slate-400 uppercase">Detailed Description</label>
          <textarea 
            id="contact-msg"
            required 
            rows={4} 
            value={msg}
            onChange={(e) => setMsg(e.target.value)}
            placeholder="Type your message description here..." 
            className="input-field w-full resize-none" 
          />
        </div>

        <button type="submit" className="button-primary w-full cursor-pointer">
          Transmit Message Coordinates
        </button>
      </form>
    </div>
  );
}

/* ==========================================================================
   PAGE: PLATFORM FAQ
   ========================================================================== */
function FAQPage() {
  return (
    <div id="faq-root" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-left space-y-8 animate-fade-in">
      
      <div className="border-b border-slate-200 dark:border-slate-800 pb-5">
        <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-slate-900 dark:text-white">Frequently Asked Answers</h1>
        <p className="text-xs text-slate-500 mt-1">Get fast guidance around system architectures and security validations.</p>
      </div>

      <div className="space-y-4">
        {faqs.map((f, idx) => (
          <div key={idx} className="bg-white dark:bg-slate-905 p-5 border border-slate-200/80 dark:border-slate-850 rounded-xl space-y-1.5">
            <span className="font-display font-bold text-xs text-slate-900 dark:text-white flex items-center gap-1.5 leading-snug">
              <HelpCircle className="h-4 w-4 text-blue-500 shrink-0" /> {f.question}
            </span>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-2 pl-5.5 leading-relaxed font-sans">{f.answer}</p>
          </div>
        ))}
      </div>

    </div>
  );
}

/* ==========================================================================
   PAGE: NOT FOUND (404)
   ========================================================================== */
function NotFoundPage() {
  return (
    <div id="notfound-root" className="max-w-md mx-auto px-4 py-24 text-center space-y-6">
      <div className="h-14 w-14 bg-red-50 dark:bg-red-500/10 text-red-600 rounded-2xl flex items-center justify-center mx-auto shadow-sm">
        <ShieldAlert className="h-8 w-8" />
      </div>
      <div className="space-y-2">
        <span className="text-2xl font-display font-extrabold text-slate-900 dark:text-white">Module Not Mapped (404)</span>
        <p className="text-xs text-slate-500 font-sans leading-relaxed">The relative routing identifier requested does not match any current programmatic tool coordinates inside the NexusUtils system indexes.</p>
      </div>
      <Link to="/" className="button-primary inline-flex gap-2">
        Return Home
      </Link>
    </div>
  );
}

/* ==========================================================================
   AUXILIARY SVGS MAPPED LOCALLY FOR COMPOSABILITY (NO DEPS)
   ========================================================================== */
function SecurityShieldIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  );
}

function BinaryIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect x="14" y="14" width="4" height="6" rx="2" />
      <rect x="6" y="14" width="4" height="6" rx="2" />
      <rect x="14" y="4" width="4" height="6" rx="2" />
      <rect x="6" y="4" width="4" height="6" rx="2" />
      <path d="M10 10l4 4" />
    </svg>
  );
}

function Trash2Icon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <polyline points="3 6 5 6 21 6" />
      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
      <line x1="10" y1="11" x2="10" y2="17" />
      <line x1="14" y1="11" x2="14" y2="17" />
    </svg>
  );
}
