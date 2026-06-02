import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Terminal, BookOpen, Layers, X, FileText } from 'lucide-react';
import { tools, blogArticles, resources } from '../data';
import { motion, AnimatePresence } from 'motion/react';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
}

interface CommandItem {
  id: string;
  title: string;
  description: string;
  category: 'tool' | 'blog' | 'resource';
  url: string;
}

export default function CommandPalette({ isOpen, onClose }: CommandPaletteProps) {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus input automatically when opened
  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 80);
    }
  }, [isOpen]);

  // Aggregate search index
  const items: CommandItem[] = [
    ...tools.map(t => ({
      id: t.id,
      title: t.name,
      description: t.description,
      category: 'tool' as const,
      url: `/tools/${t.slug}`
    })),
    ...blogArticles.map(b => ({
      id: b.slug,
      title: b.title,
      description: b.description,
      category: 'blog' as const,
      url: `/blog/${b.slug}`
    })),
    ...resources.map(r => ({
      id: r.slug,
      title: r.title,
      description: r.description,
      category: 'resource' as const,
      url: `/${r.type === 'guide' ? 'guides' : r.type === 'checklist' ? 'checklists' : r.type === 'template' ? 'templates' : r.type === 'example' ? 'examples' : 'compare'}/${r.slug}`
    }))
  ];

  // Filtering result set
  const filteredItems = items.filter(item => 
    item.title.toLowerCase().includes(query.toLowerCase()) ||
    item.description.toLowerCase().includes(query.toLowerCase()) ||
    item.category.toLowerCase().includes(query.toLowerCase())
  ).slice(0, 7); // Max 7 items for rapid viewing

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % Math.max(1, filteredItems.length));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + filteredItems.length) % Math.max(1, filteredItems.length));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (filteredItems[selectedIndex]) {
          navigate(filteredItems[selectedIndex].url);
          onClose();
        }
      } else if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, filteredItems, selectedIndex, navigate, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div id="cmd-palette-modal" className="fixed inset-0 z-50 flex items-start justify-center pt-[10vh] px-4">
          
          {/* Backdrop screen overlay */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm cursor-pointer"
          />

          {/* Dialog block container */}
          <motion.div 
            initial={{ scale: 0.96, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.96, opacity: 0 }}
            transition={{ type: 'spring', duration: 0.25 }}
            className="relative w-full max-w-xl rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 shadow-2xl overflow-hidden focus:outline-none"
          >
            {/* Input Header bar */}
            <div className="flex items-center gap-3 border-b border-slate-100 dark:border-slate-900 px-4 py-3.5">
              <Search className="h-5 w-5 text-slate-400 dark:text-slate-500" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setSelectedIndex(0);
                }}
                placeholder="Search across tools, guides, blog resources..."
                className="w-full bg-transparent border-none text-slate-850 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 text-sm focus:outline-none focus:ring-0"
              />
              <button 
                onClick={onClose}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-250 hover:bg-slate-50 dark:hover:bg-slate-900 cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Content Results panel */}
            <div className="max-h-[380px] overflow-y-auto p-2">
              
              {/* Empty state conditional */}
              {filteredItems.length === 0 ? (
                <div className="py-12 text-center">
                  <div className="text-slate-400 dark:text-slate-500 mb-2">No matching resources mapped</div>
                  <span className="text-[11px] font-mono text-slate-400">Refine parameters, e.g. "json", "seo", "guide"</span>
                </div>
              ) : (
                <div className="space-y-0.5" id="suggested-cmd-list">
                  {filteredItems.map((item, index) => {
                    const isSelected = index === selectedIndex;
                    return (
                      <div
                        key={item.category + '-' + item.id}
                        onMouseEnter={() => setSelectedIndex(index)}
                        onClick={() => {
                          navigate(item.url);
                          onClose();
                        }}
                        className={`flex items-start gap-3 p-3 rounded-lg transition-colors cursor-pointer ${
                          isSelected 
                            ? 'bg-slate-50 dark:bg-slate-900' 
                            : 'hover:bg-slate-50/50 dark:hover:bg-slate-900/30'
                        }`}
                      >
                        {/* Selector Category icon mapping */}
                        <div className={`mt-0.5 p-1.5 rounded-md ${
                          item.category === 'tool' 
                            ? 'bg-blue-50 dark:bg-blue-500/15 text-blue-600 dark:text-blue-400'
                            : item.category === 'blog' 
                            ? 'bg-amber-50 dark:bg-amber-500/15 text-amber-600 dark:text-amber-400'
                            : 'bg-purple-50 dark:bg-purple-500/15 text-purple-600 dark:text-purple-400'
                        }`}>
                          {item.category === 'tool' && <Terminal className="h-4 w-4" />}
                          {item.category === 'blog' && <BookOpen className="h-4 w-4" />}
                          {item.category === 'resource' && <Layers className="h-4 w-4" />}
                        </div>

                        {/* Title and Short Description */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-2">
                            <span className="text-xs font-semibold text-slate-800 dark:text-slate-100 truncate">
                              {item.title}
                            </span>
                            <span className={`text-[9px] font-mono font-bold uppercase tracking-wider px-1.5 py-0.5 rounded ${
                              item.category === 'tool' 
                                ? 'bg-blue-50 dark:bg-blue-500/10 text-blue-600'
                                : item.category === 'blog' 
                                ? 'bg-amber-50 dark:bg-amber-500/10 text-amber-600'
                                : 'bg-purple-50 dark:bg-purple-500/10 text-purple-600'
                            }`}>
                              {item.category}
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-400 dark:text-slate-500 truncate mt-0.5">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Input Footnote instruction */}
            <div className="bg-slate-50 dark:bg-slate-950 border-t border-slate-100 dark:border-slate-900 px-4 py-2.5 flex items-center justify-between text-[11px] font-mono text-slate-400 dark:text-slate-500">
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1">
                  <kbd className="bg-white dark:bg-slate-900 px-1 py-0.5 border border-slate-200 dark:border-slate-800 rounded">↓↑</kbd> to navigate
                </span>
                <span className="flex items-center gap-1">
                  <kbd className="bg-white dark:bg-slate-900 px-1 py-0.5 border border-slate-200 dark:border-slate-800 rounded">Enter</kbd> to select
                </span>
              </div>
              <span>ESC to dismiss</span>
            </div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
