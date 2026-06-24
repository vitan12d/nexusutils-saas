import { useState } from 'react';
import { ALL_PSEO_ITEMS } from '../../content/loader';
import { PSEOItem, PSEOCategory } from '../../content/pseoTypes';
import { 
  FileText, Search, BookOpen, CheckSquare, 
  Code, Layout, Compass, Shield, Award, HelpCircle
} from 'lucide-react';

interface PSEOIndexDirectoryProps {
  onSelectArticle: (category: 'guide' | 'checklist' | 'template' | 'example' | 'compare', slug: string) => void;
  onGoBack: () => void;
}

type FilterTab = 'all' | PSEOCategory;

export default function PSEOIndexDirectory({ onSelectArticle, onGoBack }: PSEOIndexDirectoryProps) {
  const [activeTab, setActiveTab] = useState<FilterTab>('all');
  const [searchVal, setSearchVal] = useState('');

  const TABS: { id: FilterTab; label: string; icon: any }[] = [
    { id: 'all', label: 'All Resources', icon: Compass },
    { id: 'guide', label: 'Guides', icon: BookOpen },
    { id: 'checklist', label: 'Checklists', icon: CheckSquare },
    { id: 'template', label: 'Templates', icon: Layout },
    { id: 'example', label: 'Examples', icon: Code },
    { id: 'compare', label: 'Comparisons', icon: FileText }
  ];

  // Filtering criteria routines
  const filteredItems = ALL_PSEO_ITEMS.filter(item => {
    const matchesTab = activeTab === 'all' || item.category === activeTab;
    
    const terms = searchVal.toLowerCase();
    const matchesSearch = !searchVal || 
      item.title.toLowerCase().includes(terms) ||
      item.subtitle.toLowerCase().includes(terms) ||
      item.badge.toLowerCase().includes(terms) ||
      item.targetKeywords.some(kw => kw.toLowerCase().includes(terms));

    return matchesTab && matchesSearch;
  });

  const CATEGORY_STYLES: Record<PSEOCategory, { bg: string, text: string }> = {
    guide: { bg: 'bg-emerald-500/10', text: 'text-emerald-600 dark:text-emerald-400' },
    checklist: { bg: 'bg-amber-500/10', text: 'text-amber-600 dark:text-amber-400' },
    template: { bg: 'bg-blue-500/10', text: 'text-blue-600 dark:text-blue-400' },
    example: { bg: 'bg-indigo-500/10', text: 'text-indigo-600 dark:text-indigo-400' },
    compare: { bg: 'bg-pink-500/10', text: 'text-pink-600 dark:text-pink-400' }
  };

  return (
    <div className="bg-slate-50 dark:bg-[#0F172A] min-h-screen py-10 transition-colors duration-200">
      <div className="max-w-6xl mx-auto px-4 space-y-10">
        
        {/* Header Header */}
        <header className="text-center space-y-4 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-1.5 py-1 px-3.5 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 text-xs font-black uppercase tracking-wider font-mono">
            <Award className="h-4 w-4" />
            <span>Developer Knowledge Hub</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-slate-900 dark:text-white">
            Programmatic SEO Engine
          </h1>
          <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 font-semibold leading-relaxed">
            Discover 50+ rich technical guides, checklists, templates, and comparisons. Master web data formats, media compilation, and offline operations safely within our browser sandboxes.
          </p>
          
          <div className="flex justify-center select-none pt-2">
            <button
              onClick={onGoBack}
              className="py-2 px-5 bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-300 border border-slate-200 dark:border-slate-800 text-xs font-extrabold rounded-lg transition"
            >
              ← Back to Tools Directory
            </button>
          </div>
        </header>

        {/* Stats Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 rounded-2xl bg-white dark:bg-[#1E293B] border border-slate-200 dark:border-slate-800 shadow-3xs max-w-4xl mx-auto">
          <div className="text-center space-y-1">
            <span className="block text-2xl font-black font-mono text-blue-600 dark:text-blue-400">50</span>
            <span className="block text-[10px] font-bold text-slate-450 dark:text-slate-500 uppercase tracking-widest font-mono">Rich Assets</span>
          </div>
          <div className="text-center space-y-1 border-l border-slate-100 dark:border-slate-800/80">
            <span className="block text-2xl font-black font-mono text-emerald-600 dark:text-emerald-400">100%</span>
            <span className="block text-[10px] font-bold text-slate-450 dark:text-slate-500 uppercase tracking-widest font-mono">Offline Engine</span>
          </div>
          <div className="text-center space-y-1 border-l border-slate-100 dark:border-slate-800/80">
            <span className="block text-2xl font-black font-mono text-indigo-600 dark:text-indigo-400">100k+</span>
            <span className="block text-[10px] font-bold text-slate-450 dark:text-slate-500 uppercase tracking-widest font-mono">Words Core</span>
          </div>
          <div className="text-center space-y-1 border-l border-slate-100 dark:border-slate-800/80">
            <span className="block text-2xl font-black font-mono text-amber-600 dark:text-amber-400">Zero</span>
            <span className="block text-[10px] font-bold text-slate-450 dark:text-slate-500 uppercase tracking-widest font-mono">Server Tracking</span>
          </div>
        </div>

        {/* Controls Layout: Tab Filters + Unified Search */}
        <div className="space-y-4 max-w-4xl mx-auto">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 select-none" />
            <input
              type="text"
              value={searchVal}
              onChange={(e) => setSearchVal(e.target.value)}
              placeholder="Filter by keywords (e.g. pdf, csv, meta tags, schema markup)..."
              className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-404 text-sm font-semibold shadow-3xs text-slate-800 dark:text-white placeholder-slate-400"
            />
          </div>

          <div className="flex flex-wrap gap-2 justify-center select-none">
            {TABS.map((tab) => {
              const TabIcon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-2 px-4 rounded-xl text-xs font-black tracking-wide flex items-center gap-2 transition cursor-pointer border ${
                    activeTab === tab.id
                      ? 'bg-blue-600 text-white border-blue-600 shadow-3xs'
                      : 'bg-white dark:bg-slate-905 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-805 hover:bg-slate-50 hover:dark:bg-slate-800'
                  }`}
                >
                  <TabIcon className="h-4 w-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Results Matrix Block Grid */}
        <main className="max-w-5xl mx-auto">
          {filteredItems.length === 0 ? (
            <div className="text-center py-16 p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              <HelpCircle className="h-10 w-10 text-slate-400 mx-auto mb-3" />
              <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200">No matching resources found</h3>
              <p className="text-sm text-slate-450 dark:text-slate-550 max-w-md mx-auto mt-1">
                Your search parameters did not align with any of our active programmatic assets. Try searching for "PDF", "WebP", "Invoice", "Meta" or "Schema".
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredItems.map((item) => {
                const styles = CATEGORY_STYLES[item.category];
                return (
                  <article
                    key={item.slug}
                    onClick={() => onSelectArticle(item.category, item.slug)}
                    className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-805/80 hover:border-blue-500 hover:-translate-y-1 hover:shadow-xs transition duration-200 cursor-pointer flex flex-col justify-between group shadow-3xs"
                  >
                    <div className="space-y-3">
                      <div className="flex justify-between items-center select-none">
                        <span className={`text-[9px] font-black uppercase tracking-widest ${styles.bg} ${styles.text} px-2 py-0.5 rounded font-mono`}>
                          {item.category}
                        </span>
                        <span className="text-blue-500 text-xs font-mono font-black opacity-0 group-hover:opacity-100 transition-opacity">
                          View →
                        </span>
                      </div>
                      
                      <h3 className="text-sm font-black text-slate-900 dark:text-white leading-snug group-hover:text-blue-600 dark:group-hover:text-blue-405 transition duration-150 line-clamp-2">
                        {item.title}
                      </h3>

                      <p className="text-xs text-slate-500 dark:text-slate-405 leading-relaxed font-semibold line-clamp-3">
                        {item.subtitle}
                      </p>
                    </div>

                    <div className="pt-4 mt-4 border-t border-slate-100 dark:border-slate-800 flex flex-wrap gap-1.5 select-all">
                      {item.targetKeywords.slice(0, 2).map((kw, idx) => (
                        <span 
                          key={idx} 
                          className="text-[9px] font-bold text-slate-450 dark:text-slate-550 font-mono bg-slate-50 dark:bg-slate-950 px-1.5 py-0.5 rounded"
                        >
                          #{kw}
                        </span>
                      ))}
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
