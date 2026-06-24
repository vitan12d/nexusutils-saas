import { useState, useEffect, useMemo } from 'react';
import LandingPage from './components/LandingPage';
import Dashboard from './components/Dashboard';
import StaticPages from './components/StaticPages';
import ToolLandingPage, { SEO_SLUGS } from './components/ToolLandingPage';
import BlogIndex from './components/blog/BlogIndex';
import ArticleTemplate from './components/blog/ArticleTemplate';
import SearchResults from './components/SearchResults';
import N8nAutomationLanding from './components/N8nAutomationLanding';
import { ALL_50_POSTS_METADATA, compileDynamicArticle, BlogPost } from './data/blogData';
import { ArrowLeft, BookOpen, Sparkles, Compass } from 'lucide-react';

// Programmatic SEO Imports
import { resolvePSEOItem } from './content/loader';
import PSEOTemplateView from './components/seo/PSEOTemplateView';
import PSEOIndexDirectory from './components/seo/PSEOIndexDirectory';
import GrowthControlCenter from './components/seo/GrowthControlCenter';
import RevenueControlCenter from './components/seo/RevenueControlCenter';

type AppView = 'landing' | 'dashboard' | 'static' | 'tool-landing' | 'blog' | 'blog-article' | 'pseo-article' | 'pseo-directory' | 'growth' | 'revenue' | 'n8n-automation' | 'search-results';

export default function App() {
  const [view, setView] = useState<AppView>('landing');
  const [activeStaticPage, setActiveStaticPage] = useState<string>('about');
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(undefined);
  const [activeSlug, setActiveSlug] = useState<string>('json-formatter');
  const [directToolId, setDirectToolId] = useState<string | undefined>(undefined);

  // Blog-specific states
  const [selectedBlogCategoryRoute, setSelectedBlogCategoryRoute] = useState<string>('all');
  const [activeArticleSlug, setActiveArticleSlug] = useState<string>('');

  // Programmatic SEO States
  const [activePSEOType, setActivePSEOType] = useState<'guide' | 'checklist' | 'template' | 'example' | 'compare'>('guide');
  const [activePSEOSlug, setActivePSEOSlug] = useState<string>('');

  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('theme') === 'dark' ||
      (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches);
  });

  // Simple and robust HTML routing handler built directly in state
  useEffect(() => {
    const handleRouteCheck = () => {
      const path = window.location.pathname;

      // Programmatic SEO Path Resolvers
      if (path.startsWith('/guides/')) {
        const slug = path.replace('/guides/', '');
        setActivePSEOType('guide');
        setActivePSEOSlug(slug);
        setView('pseo-article');
        window.scrollTo({ top: 0, behavior: 'instant' });
        return;
      }
      if (path.startsWith('/checklists/')) {
        const slug = path.replace('/checklists/', '');
        setActivePSEOType('checklist');
        setActivePSEOSlug(slug);
        setView('pseo-article');
        window.scrollTo({ top: 0, behavior: 'instant' });
        return;
      }
      if (path.startsWith('/templates/')) {
        const slug = path.replace('/templates/', '');
        setActivePSEOType('template');
        setActivePSEOSlug(slug);
        setView('pseo-article');
        window.scrollTo({ top: 0, behavior: 'instant' });
        return;
      }
      if (path.startsWith('/examples/')) {
        const slug = path.replace('/examples/', '');
        setActivePSEOType('example');
        setActivePSEOSlug(slug);
        setView('pseo-article');
        window.scrollTo({ top: 0, behavior: 'instant' });
        return;
      }
      if (path.startsWith('/compare/')) {
        const slug = path.replace('/compare/', '');
        setActivePSEOType('compare');
        setActivePSEOSlug(slug);
        setView('pseo-article');
        window.scrollTo({ top: 0, behavior: 'instant' });
        return;
      }
      if (path === '/resources' || path === '/resources/') {
        setView('pseo-directory');
        window.scrollTo({ top: 0, behavior: 'instant' });
        return;
      }
      
      // 1. Tool Landing Views
      if (path.startsWith('/tools/')) {
        const slug = path.replace('/tools/', '');
        if (SEO_SLUGS[slug]) {
          setActiveSlug(slug);
          setView('tool-landing');
          return;
        }
      }

      // 2. Blog Category Routes: /blog/category/:category
      if (path.startsWith('/blog/category/')) {
        const catRoute = path.replace('/blog/category/', '');
        setSelectedBlogCategoryRoute(catRoute);
        setView('blog');
        window.scrollTo({ top: 0, behavior: 'instant' });
        return;
      }

      // 3. Blog Article View: /blog/:slug
      if (path.startsWith('/blog/')) {
        const articleSlug = path.replace('/blog/', '');
        if (articleSlug && articleSlug !== 'category') {
          setActiveArticleSlug(articleSlug);
          setView('blog-article');
          window.scrollTo({ top: 0, behavior: 'instant' });
          return;
        }
      }

      // 4. General Blog Index: /blog
      if (path === '/blog' || path === '/blog/') {
        setSelectedBlogCategoryRoute('all');
        setView('blog');
        window.scrollTo({ top: 0, behavior: 'instant' });
        return;
      }

      // 5. Growth, SEO, and Traffic Acquisition Center: /growth or /seo
      if (path === '/growth' || path === '/growth/' || path === '/seo' || path === '/seo/') {
        setView('growth');
        window.scrollTo({ top: 0, behavior: 'instant' });
        return;
      }

      // 5.5 Revenue and Monetization Optimization Hub: /revenue or /monetization
      if (path === '/revenue' || path === '/revenue/' || path === '/monetization' || path === '/monetization/') {
        setView('revenue');
        window.scrollTo({ top: 0, behavior: 'instant' });
        return;
      }

      // 5.6 Static Pages clean URLs: /about, /privacy, /terms, /contact, /faq
      if (path === '/about' || path === '/about/') {
        setActiveStaticPage('about');
        setView('static');
        window.scrollTo({ top: 0, behavior: 'instant' });
        return;
      }

      // 5.7 N8n Automations view
      if (path === '/n8n' || path === '/n8n/') {
        setView('n8n-automation');
        window.scrollTo({ top: 0, behavior: 'instant' });
        return;
      }
      if (path === '/privacy' || path === '/privacy/') {
        setActiveStaticPage('privacy');
        setView('static');
        window.scrollTo({ top: 0, behavior: 'instant' });
        return;
      }
      if (path === '/terms' || path === '/terms/') {
        setActiveStaticPage('terms');
        setView('static');
        window.scrollTo({ top: 0, behavior: 'instant' });
        return;
      }
      if (path === '/contact' || path === '/contact/') {
        setActiveStaticPage('contact');
        setView('static');
        window.scrollTo({ top: 0, behavior: 'instant' });
        return;
      }
      if (path === '/faq' || path === '/faq/') {
        setActiveStaticPage('faq');
        setView('static');
        window.scrollTo({ top: 0, behavior: 'instant' });
        return;
      }

      // 6. Clean home or generic paths
      if (path === '/' || path === '') {
        setView('landing');
      }
    };

    handleRouteCheck();

    // Listen to history pop events
    window.addEventListener('popstate', handleRouteCheck);
    return () => window.removeEventListener('popstate', handleRouteCheck);
  }, []);

  const triggerCategory = (catId: string) => {
    setSelectedCategory(catId);
    setDirectToolId(undefined);
    setView('dashboard');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const showStaticPage = (pageId: string) => {
    setActiveStaticPage(pageId);
    setView('static');
    window.history.pushState(null, '', `/${pageId}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleGoHome = () => {
    setSelectedCategory(undefined);
    setDirectToolId(undefined);
    setView('landing');
    window.history.pushState(null, '', '/');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleExploreAll = () => {
    setSelectedCategory(undefined);
    setDirectToolId(undefined);
    setView('dashboard');
    window.history.pushState(null, '', '/');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateSlug = (slug: string) => {
    setActiveSlug(slug);
    setView('tool-landing');
    window.history.pushState(null, '', `/tools/${slug}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLaunchTool = (toolId: string) => {
    setDirectToolId(toolId);
    setSelectedCategory(undefined);
    setView('dashboard');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // ----- BLOG ROUTING DISPATCHERS -----
  const handleSelectArticle = (slug: string) => {
    setActiveArticleSlug(slug);
    setView('blog-article');
    window.history.pushState(null, '', `/blog/${slug}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectBlogCategoryRoute = (catRoute: string) => {
    setSelectedBlogCategoryRoute(catRoute);
    setView('blog');
    window.history.pushState(null, '', catRoute === 'all' ? '/blog' : `/blog/category/${catRoute}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToBlogIndex = () => {
    setSelectedBlogCategoryRoute('all');
    setView('blog');
    window.history.pushState(null, '', '/blog');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Resolve current active article object
  const activeArticle = useMemo((): BlogPost | null => {
    if (view !== 'blog-article' || !activeArticleSlug) return null;
    const meta = ALL_50_POSTS_METADATA.find(p => p.slug === activeArticleSlug);
    if (!meta) return null;
    return compileDynamicArticle(meta);
  }, [view, activeArticleSlug]);

  // ----- PROGRAMMATIC SEO ROUTING DISPATCHERS -----
  const handleSelectPSEOArticle = (category: 'guide' | 'checklist' | 'template' | 'example' | 'compare', slug: string) => {
    setActivePSEOType(category);
    setActivePSEOSlug(slug);
    setView('pseo-article');
    const prefix = category === 'compare' ? 'compare' : `${category}s`;
    window.history.pushState(null, '', `/${prefix}/${slug}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleGoToPSEODirectory = () => {
    setView('pseo-directory');
    window.history.pushState(null, '', '/resources');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Resolve current active PSEO item
  const activePSEOItem = useMemo(() => {
    if (view !== 'pseo-article' || !activePSEOSlug) return null;
    return resolvePSEOItem(activePSEOType, activePSEOSlug);
  }, [view, activePSEOType, activePSEOSlug]);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0F172A] transition-colors duration-200">
      
      {/* 1. Show Landing View */}
      {view === 'landing' && (
        <>
          {/* Landing Mini Top Header */}
          <nav className="h-16 border-b border-slate-200/60 dark:border-white/5 px-4 flex items-center justify-between bg-white dark:bg-[#0F172A] sticky top-0 z-50">
            <div className="max-w-7xl mx-auto w-full flex justify-between items-center">
              <div className="flex items-center gap-2.5 cursor-pointer font-extrabold text-base select-none" onClick={handleGoHome}>
                <div className="h-7 w-7 rounded bg-blue-600 flex items-center justify-center text-white text-xs font-black">N</div>
                <span className="text-slate-900 dark:text-white font-sans">Nexus<span className="text-blue-500">Utils</span></span>
              </div>
              <div className="flex items-center gap-4 select-none">
                <button
                  onClick={handleBackToBlogIndex}
                  className="px-3 py-1.5 text-xs text-slate-550 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 font-extrabold transition cursor-pointer flex items-center gap-1.5"
                >
                  <BookOpen className="h-4 w-4" />
                  <span>Technical Blog</span>
                </button>
                <button
                  onClick={handleExploreAll}
                  className="py-1.5 px-4 bg-blue-600 text-white font-bold text-xs rounded-xl shadow-xs hover:bg-blue-500 transition cursor-pointer"
                >
                  Launch Dashboard
                </button>
              </div>
            </div>
          </nav>

          <LandingPage
            onExplore={handleExploreAll}
            onSelectCategory={triggerCategory}
            onNavigateSlug={handleNavigateSlug}
          />

          {/* Simple footer on landing */}
          <footer className="py-12 bg-white dark:bg-[#0F172A] border-t border-slate-150 dark:border-white/5 text-center text-xs text-slate-400">
            <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4 font-semibold">
              <p>© 2026 NexusUtils • جميع الحقوق محفوظة. Infinite Utilities, zero server data storage.</p>
              <div className="flex flex-wrap gap-4 items-center justify-center">
                {[
                  { id: 'about', label: 'About Us' },
                  { id: 'privacy', label: 'Privacy Policy' },
                  { id: 'terms', label: 'Terms of Service' },
                  { id: 'contact', label: 'Contact Us' },
                  { id: 'faq', label: 'FAQs' }
                ].map((p) => (
                  <a
                    key={p.id}
                    href={`/${p.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      showStaticPage(p.id);
                    }}
                    className="hover:text-indigo-500 hover:underline transition cursor-pointer px-1"
                  >
                    {p.label}
                  </a>
                ))}
                <span className="text-slate-300 dark:text-slate-800">|</span>
                <button
                  onClick={handleBackToBlogIndex}
                  className="hover:text-indigo-500 hover:underline transition cursor-pointer font-semibold"
                >
                  SEO Blog Center
                </button>
                <span className="text-slate-300 dark:text-slate-800">|</span>
                <button
                  onClick={() => {
                    setView('growth');
                    window.history.pushState(null, '', '/growth');
                  }}
                  className="hover:text-blue-500 hover:underline transition cursor-pointer font-extrabold text-blue-600 dark:text-blue-400"
                >
                  🚀 SEO Growth Center
                </button>
                <span className="text-slate-300 dark:text-slate-800">|</span>
                <button
                  onClick={() => {
                    setView('revenue');
                    window.history.pushState(null, '', '/revenue');
                  }}
                  className="hover:text-emerald-500 hover:underline transition cursor-pointer font-extrabold text-emerald-600 dark:text-emerald-400"
                >
                  💰 Revenue Hub
                </button>
                <span className="text-slate-300 dark:text-slate-800">|</span>
                <a 
                  href="mailto:hasnichoura@gmail.com" 
                  className="hover:text-indigo-500 hover:underline transition cursor-pointer"
                >
                  Contact Support
                </a>
              </div>
            </div>
          </footer>
        </>
      )}

      {/* 2. Show Main Tools Workspace Dashboard */}
      {view === 'dashboard' && (
        <Dashboard
          initialCategoryId={selectedCategory}
          initialToolId={directToolId}
          onGoHome={handleGoHome}
          onGoStaticPage={showStaticPage}
        />
      )}

      {/* 3. Show Static Content View */}
      {view === 'static' && (
        <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-[#0F172A] text-slate-800 dark:text-slate-100 font-sans transition-colors duration-250">
          {/* Static View Navigation Header */}
          <header className="sticky top-0 bg-white/85 dark:bg-[#0F172A]/80 backdrop-blur-md border-b border-slate-200 dark:border-white/5 z-35 py-3.5 px-4">
            <div className="max-w-7xl mx-auto w-full flex justify-between items-center">
              <button
                onClick={() => setView('dashboard')}
                className="flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 bg-slate-100 dark:bg-slate-800 py-1.5 px-3.5 rounded-lg transition cursor-pointer"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                Go Back Dashboard
              </button>
              <div className="flex items-center gap-3 select-none">
                <button 
                  onClick={handleBackToBlogIndex}
                  className="text-xs hover:text-blue-500 font-extrabold text-slate-500 flex items-center gap-1 cursor-pointer transition"
                >
                  <BookOpen className="h-3.5 w-3.5" />
                  <span>Technical Blog</span>
                </button>
                <div onClick={handleGoHome} className="flex items-center gap-2 cursor-pointer font-black text-sm select-none">
                  <div className="h-7 w-7 rounded bg-blue-600 flex items-center justify-center text-white text-[12px]">N</div>
                  <span className="text-slate-805 dark:text-white">NexusUtils</span>
                </div>
              </div>
            </div>
          </header>

          <main className="flex-1 py-10 px-4">
            <StaticPages 
              pageId={activeStaticPage} 
              onNavigateSlug={handleNavigateSlug}
              onGoHome={handleGoHome}
            />
          </main>

          <footer className="py-8 bg-white dark:bg-[#0F172A] border-t border-slate-200 dark:border-white/5 text-center text-xs text-slate-400">
            <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4 font-semibold">
              <p>© 2026 NexusUtils • جميع الحقوق محفوظة. Certified AdSense-ready network portal.</p>
              <div className="flex flex-wrap gap-4 items-center justify-center">
                {[
                  { id: 'about', label: 'About Us' },
                  { id: 'privacy', label: 'Privacy Policy' },
                  { id: 'terms', label: 'Terms of Service' },
                  { id: 'contact', label: 'Contact Us' },
                  { id: 'faq', label: 'FAQs' }
                ].map((p) => (
                  <a
                    key={p.id}
                    href={`/${p.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      showStaticPage(p.id);
                    }}
                    className="hover:text-indigo-500 hover:underline transition cursor-pointer px-1"
                  >
                    {p.label}
                  </a>
                ))}
                <span className="text-slate-300 dark:text-slate-800">|</span>
                <button
                  onClick={handleBackToBlogIndex}
                  className="hover:text-indigo-500 hover:underline transition cursor-pointer"
                >
                  Blog Articles
                </button>
                <span className="text-slate-300 dark:text-slate-800">|</span>
                <a 
                  href="mailto:hasnichoura@gmail.com" 
                  className="hover:text-indigo-500 hover:underline transition cursor-pointer"
                >
                  Contact Support
                </a>
              </div>
            </div>
          </footer>
        </div>
      )}

      {/* 3.5 Show N8n Automation Landing View */}
      {view === 'n8n-automation' && (
        <N8nAutomationLanding onGoBack={handleGoHome} />
      )}

      {/* 4. Show Tool Landing Content View */}
      {view === 'tool-landing' && (
        <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-[#0F172A] text-slate-800 dark:text-slate-100 font-sans transition-colors duration-250">
          
          {/* Main Top Header Navigation */}
          <nav className="h-16 border-b border-slate-200/60 dark:border-white/5 px-4 flex items-center justify-between bg-white dark:bg-[#0F172A] sticky top-0 z-50">
            <div className="max-w-7xl mx-auto w-full flex justify-between items-center">
              <div className="flex items-center gap-2.5 cursor-pointer font-extrabold text-base select-none" onClick={handleGoHome}>
                <div className="h-7 w-7 rounded bg-blue-600 flex items-center justify-center text-white text-xs font-black">N</div>
                <span className="text-slate-900 dark:text-white font-sans">Nexus<span className="text-blue-500">Utils</span></span>
              </div>
              <div className="flex items-center gap-4 select-none">
                <button
                  onClick={handleBackToBlogIndex}
                  className="px-3 py-1.5 text-xs text-slate-550 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 font-extrabold transition cursor-pointer flex items-center gap-1"
                >
                  <BookOpen className="h-4 w-4" />
                  <span>Technical Blog</span>
                </button>
                <button
                  onClick={handleExploreAll}
                  className="py-1.5 px-4 bg-blue-600 text-white font-bold text-xs rounded-xl shadow-xs hover:bg-blue-500 transition cursor-pointer"
                >
                  Launch Dashboard
                </button>
              </div>
            </div>
          </nav>

          {/* Core Content Body */}
          <main className="flex-1 py-10 px-4 bg-slate-50 dark:bg-[#0F172A]">
            <ToolLandingPage
              slug={activeSlug}
              onLaunchTool={handleLaunchTool}
              onNavigateSlug={handleNavigateSlug}
              onBackToMain={handleGoHome}
            />
          </main>

          {/* Common Footer */}
          <footer className="py-12 bg-white dark:bg-[#0F172A] border-t border-slate-150 dark:border-white/5 text-center text-xs text-slate-400">
            <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4 font-semibold">
              <p>© 2026 NexusUtils • جميع الحقوق محفوظة. Infinite Utilities, zero server data storage.</p>
              <div className="flex flex-wrap gap-4 items-center justify-center">
                {[
                  { id: 'about', label: 'About Us' },
                  { id: 'privacy', label: 'Privacy Policy' },
                  { id: 'terms', label: 'Terms of Service' },
                  { id: 'contact', label: 'Contact Us' },
                  { id: 'faq', label: 'FAQs' }
                ].map((p) => (
                  <a
                    key={p.id}
                    href={`/${p.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      showStaticPage(p.id);
                    }}
                    className="hover:text-indigo-500 hover:underline transition cursor-pointer px-1"
                  >
                    {p.label}
                  </a>
                ))}
                <span className="text-slate-300 dark:text-slate-800">|</span>
                <button
                  onClick={handleBackToBlogIndex}
                  className="hover:text-indigo-500 hover:underline transition cursor-pointer"
                >
                  SEO Blog Center
                </button>
                <span className="text-slate-300 dark:text-slate-800">|</span>
                <a 
                  href="mailto:hasnichoura@gmail.com" 
                  className="hover:text-indigo-500 hover:underline transition cursor-pointer"
                >
                  Contact Support
                </a>
              </div>
            </div>
          </footer>
        </div>
      )}

      {/* 5. SHOW SEO BLOG INDEX VIEW */}
      {view === 'blog' && (
        <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-[#0F172A] text-slate-800 dark:text-slate-100 font-sans transition-colors duration-250">
          <nav className="h-16 border-b border-slate-200/60 dark:border-white/5 px-4 flex items-center justify-between bg-white dark:bg-[#0F172A] sticky top-0 z-50 select-none">
            <div className="max-w-7xl mx-auto w-full flex justify-between items-center">
              <div className="flex items-center gap-2.5 cursor-pointer font-extrabold text-base select-none" onClick={handleGoHome}>
                <div className="h-7 w-7 rounded bg-blue-600 flex items-center justify-center text-white text-xs font-black">N</div>
                <span className="text-slate-900 dark:text-white font-sans">Nexus<span className="text-blue-500">Utils</span></span>
              </div>
              <div className="flex items-center gap-4">
                <button
                  onClick={handleGoHome}
                  className="px-3 py-1.5 text-xs text-slate-550 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 font-extrabold transition cursor-pointer"
                >
                  Main Home
                </button>
                <button
                  onClick={handleExploreAll}
                  className="py-1.5 px-4 bg-blue-600 text-white font-bold text-xs rounded-xl shadow-xs hover:bg-blue-500 transition cursor-pointer"
                >
                  Launch Dashboard
                </button>
              </div>
            </div>
          </nav>

          <main className="flex-1 max-w-7xl mx-auto w-full py-10 px-4">
            <BlogIndex
              onSelectArticle={handleSelectArticle}
              onSelectCategoryRoute={handleSelectBlogCategoryRoute}
              selectedCategoryRoute={selectedBlogCategoryRoute}
              onBackToHome={handleGoHome}
            />
          </main>

          <footer className="py-12 bg-white dark:bg-[#0F172A] border-t border-slate-150 dark:border-white/5 text-center text-xs text-slate-400">
            <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4 font-semibold">
              <p>© 2026 NexusUtils • جميع الحقوق محفوظة. Infinite Utilities, zero server data storage.</p>
              <div className="flex flex-wrap gap-4 items-center justify-center">
                {[
                  { id: 'about', label: 'About Us' },
                  { id: 'privacy', label: 'Privacy Policy' },
                  { id: 'terms', label: 'Terms of Service' },
                  { id: 'contact', label: 'Contact Us' },
                  { id: 'faq', label: 'FAQs' }
                ].map((p) => (
                  <a
                    key={p.id}
                    href={`/${p.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      showStaticPage(p.id);
                    }}
                    className="hover:text-indigo-500 hover:underline transition cursor-pointer px-1"
                  >
                    {p.label}
                  </a>
                ))}
                <span className="text-slate-300 dark:text-slate-800">|</span>
                <a 
                  href="mailto:hasnichoura@gmail.com" 
                  className="hover:text-indigo-500 hover:underline transition cursor-pointer"
                >
                  Contact Support
                </a>
              </div>
            </div>
          </footer>
        </div>
      )}

      {/* 6. SHOW BLOG POST ARTICLE VIEW */}
      {view === 'blog-article' && (
        <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-[#0F172A] text-slate-800 dark:text-slate-100 font-sans transition-colors duration-250">
          <nav className="h-16 border-b border-slate-200/60 dark:border-white/5 px-4 flex items-center justify-between bg-white dark:bg-[#0F172A] sticky top-0 z-50 select-none">
            <div className="max-w-7xl mx-auto w-full flex justify-between items-center">
              <div className="flex items-center gap-2.5 cursor-pointer font-extrabold text-base select-none" onClick={handleGoHome}>
                <div className="h-7 w-7 rounded bg-blue-600 flex items-center justify-center text-white text-xs font-black">N</div>
                <span className="text-slate-900 dark:text-white font-sans">Nexus<span className="text-blue-500">Utils</span></span>
              </div>
              <div className="flex items-center gap-4">
                <button
                  onClick={handleBackToBlogIndex}
                  className="px-3 py-1.5 text-xs text-blue-600 dark:text-blue-400 font-extrabold transition cursor-pointer flex items-center gap-1"
                >
                  <BookOpen className="h-4 w-4" />
                  <span>Technical Blog</span>
                </button>
                <button
                  onClick={handleExploreAll}
                  className="py-1.5 px-4 bg-blue-600 text-white font-bold text-xs rounded-xl shadow-xs hover:bg-blue-500 transition cursor-pointer"
                >
                  Launch Dashboard
                </button>
              </div>
            </div>
          </nav>

          <main className="flex-1 max-w-7xl mx-auto w-full py-10 px-4">
            {activeArticle ? (
              <ArticleTemplate
                post={activeArticle}
                onGoBack={handleBackToBlogIndex}
                onNavigateSlug={handleSelectArticle}
                onNavigateCategory={handleSelectBlogCategoryRoute}
                onLaunchTool={handleLaunchTool}
              />
            ) : (
              <div className="py-24 text-center space-y-4">
                <h3 className="text-lg font-bold text-red-500">Article could not be compiled or was not found.</h3>
                <button
                  onClick={handleBackToBlogIndex}
                  className="py-2 px-5 bg-blue-600 text-white font-bold rounded-xl cursor-pointer"
                >
                  Return to Blog Index
                </button>
              </div>
            )}
          </main>

          <footer className="py-12 bg-white dark:bg-[#0F172A] border-t border-slate-150 dark:border-white/5 text-center text-xs text-slate-400">
            <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4 font-semibold">
              <p>© 2026 NexusUtils • جميع الحقوق محفوظة. Infinite Utilities, zero server data storage.</p>
              <div className="flex flex-wrap gap-4 items-center justify-center">
                {[
                  { id: 'about', label: 'About Us' },
                  { id: 'privacy', label: 'Privacy Policy' },
                  { id: 'terms', label: 'Terms of Service' },
                  { id: 'contact', label: 'Contact Us' },
                  { id: 'faq', label: 'FAQs' }
                ].map((p) => (
                  <a
                    key={p.id}
                    href={`/${p.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      showStaticPage(p.id);
                    }}
                    className="hover:text-indigo-500 hover:underline transition cursor-pointer px-1"
                  >
                    {p.label}
                  </a>
                ))}
                <span className="text-slate-300 dark:text-slate-800">|</span>
                <button
                  onClick={handleBackToBlogIndex}
                  className="hover:text-indigo-500 hover:underline transition cursor-pointer"
                >
                  SEO Blog Center
                </button>
                <span className="text-slate-300 dark:text-slate-800">|</span>
                <a 
                  href="mailto:hasnichoura@gmail.com" 
                  className="hover:text-indigo-500 hover:underline transition cursor-pointer"
                >
                  Contact Support
                </a>
              </div>
            </div>
          </footer>
        </div>
      )}

      {/* 7. SHOW PROGRAMMATIC SEO ARTICLE VIEW */}
      {view === 'pseo-article' && (
        <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-[#0F172A] text-slate-800 dark:text-slate-100 font-sans transition-colors duration-250">
          <nav className="h-16 border-b border-slate-200/60 dark:border-white/5 px-4 flex items-center justify-between bg-white dark:bg-[#0F172A] sticky top-0 z-50 select-none">
            <div className="max-w-7xl mx-auto w-full flex justify-between items-center">
              <div className="flex items-center gap-2.5 cursor-pointer font-extrabold text-base select-none" onClick={handleGoHome}>
                <div className="h-7 w-7 rounded bg-blue-600 flex items-center justify-center text-white text-xs font-black">N</div>
                <span className="text-slate-900 dark:text-white font-sans">Nexus<span className="text-blue-500">Utils</span></span>
              </div>
              <div className="flex items-center gap-4">
                <button
                  onClick={handleGoToPSEODirectory}
                  className="px-3 py-1.5 text-xs text-blue-600 dark:text-blue-400 font-extrabold transition cursor-pointer flex items-center gap-1"
                >
                  <Compass className="h-4 w-4" />
                  <span>Knowledge Hub</span>
                </button>
                <button
                  onClick={handleExploreAll}
                  className="py-1.5 px-4 bg-blue-600 text-white font-bold text-xs rounded-xl shadow-xs hover:bg-blue-500 transition cursor-pointer"
                >
                  Launch Dashboard
                </button>
              </div>
            </div>
          </nav>

          <main className="flex-1">
            {activePSEOItem ? (
              <PSEOTemplateView
                item={activePSEOItem}
                onGoBack={handleGoToPSEODirectory}
                onNavigateSlug={handleSelectPSEOArticle}
                onNavigateStaticPage={showStaticPage}
                onLaunchTool={handleLaunchTool}
              />
            ) : (
              <div className="py-24 text-center space-y-4">
                <h3 className="text-lg font-bold text-red-500">Programmatic resource was not found or is still compiling.</h3>
                <button
                  onClick={handleGoToPSEODirectory}
                  className="py-2 px-5 bg-blue-600 text-white font-bold rounded-xl cursor-pointer"
                >
                  Return to Resources Index
                </button>
              </div>
            )}
          </main>

          <footer className="py-12 bg-white dark:bg-[#0F172A] border-t border-slate-150 dark:border-white/5 text-center text-xs text-slate-400">
            <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4 font-semibold">
              <p>© 2026 NexusUtils • جميع الحقوق محفوظة. Infinite Utilities, zero server data storage.</p>
              <div className="flex flex-wrap gap-4 items-center justify-center">
                {[
                  { id: 'about', label: 'About Us' },
                  { id: 'privacy', label: 'Privacy Policy' },
                  { id: 'terms', label: 'Terms of Service' },
                  { id: 'contact', label: 'Contact Us' },
                  { id: 'faq', label: 'FAQs' }
                ].map((p) => (
                  <a
                    key={p.id}
                    href={`/${p.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      showStaticPage(p.id);
                    }}
                    className="hover:text-indigo-500 hover:underline transition cursor-pointer px-1"
                  >
                    {p.label}
                  </a>
                ))}
                <span className="text-slate-300 dark:text-slate-800">|</span>
                <button
                  onClick={handleGoToPSEODirectory}
                  className="hover:text-indigo-500 hover:underline transition cursor-pointer font-semibold"
                >
                  Resources Catalog
                </button>
              </div>
            </div>
          </footer>
        </div>
      )}

      {/* 8. SHOW PROGRAMMATIC SEO CENTRAL CATALOG VIEW */}
      {view === 'pseo-directory' && (
        <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-[#0F172A] text-slate-800 dark:text-slate-100 font-sans transition-colors duration-250">
          <nav className="h-16 border-b border-slate-200/60 dark:border-white/5 px-4 flex items-center justify-between bg-white dark:bg-[#0F172A] sticky top-0 z-50 select-none">
            <div className="max-w-7xl mx-auto w-full flex justify-between items-center">
              <div className="flex items-center gap-2.5 cursor-pointer font-extrabold text-base select-none" onClick={handleGoHome}>
                <div className="h-7 w-7 rounded bg-blue-600 flex items-center justify-center text-white text-xs font-black">N</div>
                <span className="text-slate-900 dark:text-white font-sans">Nexus<span className="text-blue-500">Utils</span></span>
              </div>
              <div className="flex items-center gap-4">
                <button
                  onClick={handleGoHome}
                  className="px-3 py-1.5 text-xs text-slate-550 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 font-extrabold transition cursor-pointer"
                >
                  Main Home
                </button>
                <button
                  onClick={handleExploreAll}
                  className="py-1.5 px-4 bg-blue-600 text-white font-bold text-xs rounded-xl shadow-xs hover:bg-blue-500 transition cursor-pointer"
                >
                  Launch Dashboard
                </button>
              </div>
            </div>
          </nav>

          <main className="flex-1">
            <PSEOIndexDirectory
              onSelectArticle={handleSelectPSEOArticle}
              onGoBack={handleGoHome}
            />
          </main>

          <footer className="py-12 bg-white dark:bg-[#0F172A] border-t border-slate-150 dark:border-white/5 text-center text-xs text-slate-400">
            <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4 font-semibold">
              <p>© 2026 NexusUtils • جميع الحقوق محفوظة. Infinite Utilities, zero server data storage.</p>
              <div className="flex flex-wrap gap-4 items-center justify-center">
                {[
                  { id: 'about', label: 'About Us' },
                  { id: 'privacy', label: 'Privacy Policy' },
                  { id: 'terms', label: 'Terms of Service' },
                  { id: 'contact', label: 'Contact Us' },
                  { id: 'faq', label: 'FAQs' }
                ].map((p) => (
                  <a
                    key={p.id}
                    href={`/${p.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      showStaticPage(p.id);
                    }}
                    className="hover:text-indigo-500 hover:underline transition cursor-pointer px-1"
                  >
                    {p.label}
                  </a>
                ))}
              </div>
            </div>
          </footer>
        </div>
      )}

      {/* 9. SHOW GROWTH & TRAFFIC ACQUISITION CONTROL CENTER VIEW */}
      {view === 'growth' && (
        <GrowthControlCenter onGoBack={handleGoHome} />
      )}

      {/* 9.5 SHOW REVENUE & MONETIZATION HUB VIEW */}
      {view === 'revenue' && (
        <RevenueControlCenter onGoBack={handleGoHome} />
      )}

    </div>
  );
}
