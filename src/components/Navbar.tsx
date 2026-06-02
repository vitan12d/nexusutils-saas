import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Sun, Moon, Search, Menu, X, ChevronDown, 
  Terminal, Sparkles, TrendingUp, Layers, 
  HelpCircle, BookOpen, Heart, Activity
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface NavbarProps {
  onSearchClick: () => void;
  darkMode: boolean;
  setDarkMode: (dark: boolean) => void;
}

export default function Navbar({ onSearchClick, darkMode, setDarkMode }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeMega, setActiveMega] = useState<'tools' | 'resources' | null>(null);
  const location = useLocation();

  // Close menus when route changes
  useEffect(() => {
    setIsOpen(false);
    setActiveMega(null);
  }, [location]);

  return (
    <header id="site-header" className="sticky top-0 z-40 w-full border-b border-slate-200/80 dark:border-slate-800/80 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo Section */}
          <div className="flex items-center gap-8">
            <Link id="logo-link" to="/" className="flex items-center gap-2.5 group">
              <div className="h-9 w-9 bg-blue-600 dark:bg-blue-500 rounded-xl flex items-center justify-center text-white font-semibold shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform duration-200">
                <span className="font-display text-lg tracking-tight">N</span>
              </div>
              <div className="flex flex-col">
                <span className="font-display font-bold text-slate-900 dark:text-slate-50 leading-none tracking-tight text-base sm:text-lg">
                  Nexus<span className="text-blue-600 dark:text-blue-400">Utils</span>
                </span>
                <span className="text-[9px] font-mono text-slate-400 dark:text-slate-500 tracking-wider uppercase mt-0.5 font-bold">
                  Master Workspace
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav id="desktop-nav" className="hidden lg:flex items-center gap-1">
              
              {/* Tools Dropdown */}
              <div 
                className="relative"
                onMouseEnter={() => setActiveMega('tools')}
                onMouseLeave={() => setActiveMega(null)}
              >
                <button className={`flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-lg transition-colors cursor-pointer ${activeMega === 'tools' || location.pathname.startsWith('/tools') ? 'text-blue-600 dark:text-blue-400 bg-slate-50 dark:bg-slate-900/40' : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'}`}>
                  Tools <ChevronDown className="h-4 w-4" />
                </button>
                <AnimatePresence>
                  {activeMega === 'tools' && (
                    <motion.div 
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.15 }}
                      className="absolute left-0 mt-0.5 w-[560px] rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 p-5 shadow-xl shadow-slate-100 dark:shadow-none"
                    >
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <div className="text-xs font-mono font-bold tracking-wider text-slate-400 dark:text-slate-500 uppercase px-2 mb-2">Categories</div>
                          <div className="space-y-1">
                            <Link to="/#categories" className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-900 group">
                              <div className="p-1.5 rounded-md bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400"><Terminal className="h-4 w-4" /></div>
                              <div>
                                <div className="text-xs font-semibold text-slate-800 dark:text-slate-200">Developer Tools</div>
                                <div className="text-[11px] text-slate-400 dark:text-slate-500">Formatters, converters, secure generators</div>
                              </div>
                            </Link>
                            <Link to="/#categories" className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-900 group">
                              <div className="p-1.5 rounded-md bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"><Sparkles className="h-4 w-4" /></div>
                              <div>
                                <div className="text-xs font-semibold text-slate-800 dark:text-slate-200">Creators & Media</div>
                                <div className="text-[11px] text-slate-400 dark:text-slate-500">Markdown engines, QR modules, content tags</div>
                              </div>
                            </Link>
                          </div>
                        </div>

                        <div className="border-l border-slate-100 dark:border-slate-900 pl-4">
                          <div className="text-xs font-mono font-bold tracking-wider text-slate-400 dark:text-slate-500 uppercase px-2 mb-2">Popular Utilities</div>
                          <div className="space-y-1">
                            <Link to="/tools/json-formatter" className="flex items-center justify-between p-2 rounded-lg text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-900">
                              <span>JSON Formatter & Validator</span>
                              <span className="text-[10px] bg-blue-100 dark:bg-blue-500/15 text-blue-600 dark:text-blue-400 px-1.5 py-0.5 rounded font-bold uppercase">Popular</span>
                            </Link>
                            <Link to="/tools/seo-helper" className="flex items-center justify-between p-2 rounded-lg text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-900">
                              <span>AI Meta Tag Generator</span>
                              <span className="text-[10px] bg-amber-100 dark:bg-amber-500/15 text-amber-600 dark:text-amber-400 px-1.5 py-0.5 rounded font-bold uppercase">Gemini</span>
                            </Link>
                            <Link to="/tools/utm-builder" className="flex items-center justify-between p-2 rounded-lg text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-900">
                              <span>UTM Campaign Link Builder</span>
                              <span className="text-[10px] bg-sky-100 dark:bg-sky-500/15 text-sky-600 dark:text-sky-400 px-1.5 py-0.5 rounded font-bold uppercase">SEO</span>
                            </Link>
                            <Link to="/tools/word-counter" className="flex items-center justify-between p-2 rounded-lg text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-900">
                              <span>Word Counter & Density</span>
                              <span className="text-[10px] bg-emerald-100 dark:bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 px-1.5 py-0.5 rounded font-bold uppercase">Crawl</span>
                            </Link>
                            <Link to="/tools/pdf-hub" className="flex items-center justify-between p-2 rounded-lg text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-900">
                              <span>Smart PDF Box & Inspector</span>
                              <span className="text-[10px] bg-fuchsia-100 dark:bg-fuchsia-500/15 text-fuchsia-600 dark:text-fuchsia-400 px-1.5 py-0.5 rounded font-bold uppercase">PDF</span>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Resources Dropdown */}
              <div 
                className="relative"
                onMouseEnter={() => setActiveMega('resources')}
                onMouseLeave={() => setActiveMega(null)}
              >
                <button className={`flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-lg transition-colors cursor-pointer ${activeMega === 'resources' || location.pathname.startsWith('/resources') || location.pathname.startsWith('/guides') || location.pathname.startsWith('/checklists') || location.pathname.startsWith('/templates') ? 'text-blue-600 dark:text-blue-400 bg-slate-50 dark:bg-slate-900/40' : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'}`}>
                  Resources <ChevronDown className="h-4 w-4" />
                </button>
                <AnimatePresence>
                  {activeMega === 'resources' && (
                    <motion.div 
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.15 }}
                      className="absolute left-0 mt-0.5 w-[380px] rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 p-4 shadow-xl shadow-slate-100 dark:shadow-none"
                    >
                      <div className="space-y-1">
                        <Link to="/resources" className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-900">
                          <Layers className="h-4 w-4 text-purple-500" />
                          <div>
                            <div className="text-xs font-semibold text-slate-800 dark:text-slate-200">Knowledge Hub</div>
                            <div className="text-[11px] text-slate-400 dark:text-slate-500">Guides, Checklists, Comparisons & Templates</div>
                          </div>
                        </Link>
                        <Link to="/blog" className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-900">
                          <BookOpen className="h-4 w-4 text-blue-500" />
                          <div>
                            <div className="text-xs font-semibold text-slate-800 dark:text-slate-200">Technical Blog</div>
                            <div className="text-[11px] text-slate-400 dark:text-slate-500">Deep-dive architecture & marketing strategies</div>
                          </div>
                        </Link>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Normal Links */}
              <Link to="/growth" className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${location.pathname === '/growth' ? 'text-blue-600 dark:text-blue-400' : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'}`}>
                Growth Center
              </Link>
              <Link to="/revenue" className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${location.pathname === '/revenue' ? 'text-blue-600 dark:text-blue-400' : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'}`}>
                Revenue Center
              </Link>
              <Link to="/faq" className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${location.pathname === '/faq' ? 'text-blue-600 dark:text-blue-400' : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'}`}>
                FAQ
              </Link>
            </nav>
          </div>

          {/* Action Tools Section */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Global Search Button */}
            <button 
              id="search-trigger"
              onClick={onSearchClick}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 text-xs text-slate-400 dark:text-slate-500 hover:border-slate-300 dark:hover:border-slate-700 hover:text-slate-600 dark:hover:text-slate-300 transition-all cursor-pointer"
            >
              <Search className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Search...</span>
              <kbd className="hidden md:inline-flex items-center gap-0.5 text-[10px] font-mono bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 px-1.5 py-0.5 rounded text-slate-450">
                ⌘K
              </kbd>
            </button>

            {/* Light/Dark Switcher */}
            <button 
              id="theme-toggler"
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-lg border border-slate-150 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors cursor-pointer"
              aria-label="Toggle theme brightness"
            >
              {darkMode ? <Sun className="h-4 w-4 text-amber-400" /> : <Moon className="h-4 w-4" />}
            </button>

            {/* Dashboard Link button */}
            <Link 
              id="dashboard-cta"
              to="/dashboard"
              className="hidden sm:inline-flex items-center gap-1.5 bg-slate-900 dark:bg-slate-100 hover:bg-slate-800 dark:hover:bg-white text-white dark:text-slate-900 font-medium text-xs px-3.5 py-2 rounded-lg transition-colors"
            >
              <Activity className="h-3.5 w-3.5" />
              Dashboard
            </Link>

            {/* Mobile Nav Menu Toggler */}
            <button 
              id="mobile-nav-toggle"
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>

          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            id="mobile-nav-drawer"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-2">
              <div className="text-xs font-mono font-bold text-slate-400 dark:text-slate-500 uppercase px-3 py-1">Nexus Master Menu</div>
              <Link to="/dashboard" className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-900 rounded-lg">
                <Activity className="h-4 w-4" /> Workspace Dashboard
              </Link>
              <Link to="/#categories" className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-900 rounded-lg">
                <Terminal className="h-4 w-4" /> Browse Utilities
              </Link>
              <Link to="/resources" className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-900 rounded-lg">
                <Layers className="h-4 w-4" /> Resources & Templates
              </Link>
              <Link to="/blog" className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-900 rounded-lg">
                <BookOpen className="h-4 w-4" /> Editorial Blog
              </Link>
              <Link to="/growth" className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-900 rounded-lg">
                <TrendingUp className="h-4 w-4" /> SEO Growth Center
              </Link>
              <Link to="/revenue" className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-900 rounded-lg">
                <Sparkles className="h-4 w-4" /> Revenue Strategies
              </Link>
              <Link to="/faq" className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-900 rounded-lg">
                <HelpCircle className="h-4 w-4" /> Platform FAQ
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
