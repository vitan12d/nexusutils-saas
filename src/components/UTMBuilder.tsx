import { useState, useEffect } from 'react';
import { Copy, Check, Trash2, Link2, RotateCcw, HelpCircle, Save, Percent } from 'lucide-react';

interface UTMHistoryItem {
  id: string;
  originalUrl: string;
  generatedUrl: string;
  source: string;
  medium: string;
  name: string;
  timestamp: string;
}

export default function UTMBuilder() {
  const [url, setUrl] = useState('');
  const [source, setSource] = useState('');
  const [medium, setMedium] = useState('');
  const [name, setName] = useState('');
  const [term, setTerm] = useState('');
  const [content, setContent] = useState('');
  const [generatedUrl, setGeneratedUrl] = useState('');
  const [copied, setCopied] = useState(false);
  const [history, setHistory] = useState<UTMHistoryItem[]>([]);
  const [copiedHistoryId, setCopiedHistoryId] = useState<string | null>(null);

  // Load history on mount
  useEffect(() => {
    const saved = localStorage.getItem('nexus_utm_history');
    if (saved) {
      try {
        setHistory(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to parse UTM history:', e);
      }
    }
  }, []);

  // Sync state to localStorage
  const saveToLocalStorage = (newHistory: UTMHistoryItem[]) => {
    localStorage.setItem('nexus_utm_history', JSON.stringify(newHistory));
    setHistory(newHistory);
  };

  // Generate UTM URL in real-time
  useEffect(() => {
    if (!url.trim()) {
      setGeneratedUrl('');
      return;
    }

    try {
      // Basic validation wrapper
      let sanitizedUrl = url.trim();
      if (!/^https?:\/\//i.test(sanitizedUrl)) {
        sanitizedUrl = 'https://' + sanitizedUrl;
      }

      const parsedUrl = new URL(sanitizedUrl);
      const params = new URLSearchParams(parsedUrl.search);

      if (source.trim()) params.set('utm_source', source.trim().toLowerCase());
      if (medium.trim()) params.set('utm_medium', medium.trim().toLowerCase());
      if (name.trim()) params.set('utm_campaign', name.trim().toLowerCase());
      if (term.trim()) params.set('utm_term', term.trim().toLowerCase());
      if (content.trim()) params.set('utm_content', content.trim().toLowerCase());

      parsedUrl.search = params.toString();
      setGeneratedUrl(parsedUrl.toString());
    } catch (e) {
      // Fallback string manipulation if URL parsing fails
      let composite = url.trim();
      if (!composite.includes('?')) {
        composite += '?';
      } else if (!composite.endsWith('?') && !composite.endsWith('&')) {
        composite += '&';
      }

      const pairs: string[] = [];
      if (source.trim()) pairs.push(`utm_source=${encodeURIComponent(source.trim().toLowerCase())}`);
      if (medium.trim()) pairs.push(`utm_medium=${encodeURIComponent(medium.trim().toLowerCase())}`);
      if (name.trim()) pairs.push(`utm_campaign=${encodeURIComponent(name.trim().toLowerCase())}`);
      if (term.trim()) pairs.push(`utm_term=${encodeURIComponent(term.trim().toLowerCase())}`);
      if (content.trim()) pairs.push(`utm_content=${encodeURIComponent(content.trim().toLowerCase())}`);

      setGeneratedUrl(composite + pairs.join('&'));
    }
  }, [url, source, medium, name, term, content]);

  const handleCopy = () => {
    if (!generatedUrl) return;
    navigator.clipboard.writeText(generatedUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSaveToHistory = () => {
    if (!generatedUrl || !url.trim() || !source.trim()) return;

    const newItem: UTMHistoryItem = {
      id: crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).substring(2, 9),
      originalUrl: url.trim(),
      generatedUrl: generatedUrl,
      source: source.trim(),
      medium: medium.trim(),
      name: name.trim(),
      timestamp: new Date().toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })
    };

    const updated = [newItem, ...history].slice(0, 15); // limit to 15 items
    saveToLocalStorage(updated);
  };

  const handleCopyHistoryItem = (itemUrl: string, itemId: string) => {
    navigator.clipboard.writeText(itemUrl);
    setCopiedHistoryId(itemId);
    setTimeout(() => setCopiedHistoryId(null), 2000);
  };

  const handleDeleteHistoryItem = (itemId: string) => {
    const updated = history.filter(item => item.id !== itemId);
    saveToLocalStorage(updated);
  };

  const handleReset = () => {
    setUrl('');
    setSource('');
    setMedium('');
    setName('');
    setTerm('');
    setContent('');
  };

  const applyPreset = (presetSource: string, presetMedium: string) => {
    setSource(presetSource);
    setMedium(presetMedium);
  };

  return (
    <div id="utm-builder-container" className="space-y-8 select-text">
      {/* 2 columns layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Input Parameters Form (Left Half) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-slate-50 dark:bg-slate-950/40 border border-slate-200/60 dark:border-slate-800/80 p-5 rounded-xl space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wide block">Configure Parameters</span>
              <button 
                onClick={handleReset}
                className="text-[10px] text-slate-400 hover:text-red-500 font-medium flex items-center gap-1 transition-colors"
                id="utm-reset-btn"
              >
                <RotateCcw className="h-3 w-3" /> Clear Fields
              </button>
            </div>

            {/* Main URL Input */}
            <div className="space-y-1">
              <label htmlFor="utm-target-url" className="text-[10px] font-mono font-bold text-slate-400 uppercase flex items-center gap-1">
                Website URL <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Link2 className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                <input 
                  id="utm-target-url"
                  type="text"
                  required
                  placeholder="e.g. https://mywebsite.com/landing-page"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  className="w-full bg-white dark:bg-slate-900 border border-slate-250 dark:border-slate-800 rounded-lg pl-9 pr-4 py-2 text-xs font-medium focus:ring-1 focus:ring-blue-500 focus:outline-none placeholder-slate-400 dark:placeholder-slate-600"
                />
              </div>
            </div>

            {/* Presets segment */}
            <div className="space-y-1.5 pt-1">
              <span className="text-[10px] font-mono font-bold text-slate-400 uppercase block">Quick Campaign Presets</span>
              <div className="flex flex-wrap gap-1.5">
                <button 
                  onClick={() => applyPreset('google', 'cpc')} 
                  type="button"
                  className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-slate-350 dark:hover:border-slate-700 text-[10px] px-2.5 py-1 rounded-md text-slate-600 dark:text-slate-300 transition-colors font-medium"
                >
                  Google CPC
                </button>
                <button 
                  onClick={() => applyPreset('facebook', 'social')} 
                  type="button"
                  className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-slate-350 dark:hover:border-slate-700 text-[10px] px-2.5 py-1 rounded-md text-slate-600 dark:text-slate-300 transition-colors font-medium"
                >
                  Facebook Ad
                </button>
                <button 
                  onClick={() => applyPreset('newsletter', 'email')} 
                  type="button"
                  className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-slate-350 dark:hover:border-slate-700 text-[10px] px-2.5 py-1 rounded-md text-slate-600 dark:text-slate-300 transition-colors font-medium"
                >
                  Email Newsletter
                </button>
                <button 
                  onClick={() => applyPreset('twitter', 'social')} 
                  type="button"
                  className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-slate-350 dark:hover:border-slate-700 text-[10px] px-2.5 py-1 rounded-md text-slate-600 dark:text-slate-300 transition-colors font-medium"
                >
                  Twitter/X Post
                </button>
              </div>
            </div>

            {/* Source & Medium Two-Column inputs */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label htmlFor="utm-source" className="text-[10px] font-mono font-bold text-slate-400 uppercase flex items-center justify-between">
                  <span>Campaign Source <span className="text-red-500">*</span></span>
                  <span className="text-[8px] text-slate-400 lowercase font-normal italic">utm_source</span>
                </label>
                <input 
                  id="utm-source"
                  type="text"
                  required
                  placeholder="e.g. google, newsletter, facebook"
                  value={source}
                  onChange={(e) => setSource(e.target.value)}
                  className="w-full bg-white dark:bg-slate-900 border border-slate-250 dark:border-slate-800 rounded-lg px-3 py-2 text-xs font-medium focus:ring-1 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label htmlFor="utm-medium" className="text-[10px] font-mono font-bold text-slate-400 uppercase flex items-center justify-between">
                  <span>Campaign Medium</span>
                  <span className="text-[8px] text-slate-400 lowercase font-normal italic">utm_medium</span>
                </label>
                <input 
                  id="utm-medium"
                  type="text"
                  placeholder="e.g. cpc, email, banner, social"
                  value={medium}
                  onChange={(e) => setMedium(e.target.value)}
                  className="w-full bg-white dark:bg-slate-900 border border-slate-250 dark:border-slate-800 rounded-lg px-3 py-2 text-xs font-medium focus:ring-1 focus:ring-blue-500 focus:outline-none"
                />
              </div>
            </div>

            {/* Campaign Name & Term inputs */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label htmlFor="utm-name" className="text-[10px] font-mono font-bold text-slate-400 uppercase flex items-center justify-between">
                  <span>Campaign Name</span>
                  <span className="text-[8px] text-slate-400 lowercase font-normal italic">utm_campaign</span>
                </label>
                <input 
                  id="utm-name"
                  type="text"
                  placeholder="e.g. summer_sale, promo_v1"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-white dark:bg-slate-900 border border-slate-250 dark:border-slate-800 rounded-lg px-3 py-2 text-xs font-medium focus:ring-1 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label htmlFor="utm-term" className="text-[10px] font-mono font-bold text-slate-400 uppercase flex items-center justify-between">
                  <span>Campaign Term</span>
                  <span className="text-[8px] text-slate-400 lowercase font-normal italic">utm_term</span>
                </label>
                <input 
                  id="utm-term"
                  type="text"
                  placeholder="e.g. running_shoes, target_audience"
                  value={term}
                  onChange={(e) => setTerm(e.target.value)}
                  className="w-full bg-white dark:bg-slate-900 border border-slate-250 dark:border-slate-800 rounded-lg px-3 py-2 text-xs font-medium focus:ring-1 focus:ring-blue-500 focus:outline-none"
                />
              </div>
            </div>

            {/* Campaign Content */}
            <div className="space-y-1">
              <label htmlFor="utm-content" className="text-[10px] font-mono font-bold text-slate-400 uppercase flex items-center justify-between">
                <span>Campaign Content</span>
                <span className="text-[8px] text-slate-400 lowercase font-normal italic">utm_content</span>
              </label>
              <input 
                id="utm-content"
                type="text"
                placeholder="e.g. header_button, sidebar_banner_link"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full bg-white dark:bg-slate-900 border border-slate-250 dark:border-slate-800 rounded-lg px-3 py-2 text-xs font-medium focus:ring-1 focus:ring-blue-500 focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Live preview + Output (Right Half) */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
          <div className="bg-slate-900 dark:bg-slate-955 text-white p-6 rounded-xl space-y-5 flex-1 flex flex-col justify-between">
            <div className="space-y-3">
              <span className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-widest block">URL Output Preview</span>
              
              <div className="bg-slate-950 p-4 border border-slate-800/80 rounded-lg h-32 overflow-y-auto break-all font-mono text-[11px] leading-relaxed select-all">
                {generatedUrl || (
                  <span className="text-slate-600 block italic py-4 text-center">Fill out the URL and Campaign Source to generate the link...</span>
                )}
              </div>
            </div>

            {/* Generated Params Breakdown Display */}
            <div className="space-y-2">
              <span className="text-[10px] font-mono font-bold text-slate-500 uppercase block">Active Query Elements</span>
              <div className="grid grid-cols-2 gap-2 text-[10px] font-mono text-slate-400">
                <div className="bg-slate-950/50 p-1.5 px-2.5 rounded border border-slate-800 flex justify-between">
                  <span className="text-slate-600">source:</span>
                  <span className="text-amber-400 truncate max-w-[80px]">{source || '-'}</span>
                </div>
                <div className="bg-slate-950/50 p-1.5 px-2.5 rounded border border-slate-800 flex justify-between">
                  <span className="text-slate-600">medium:</span>
                  <span className="text-green-400 truncate max-w-[80px]">{medium || '-'}</span>
                </div>
                <div className="bg-slate-950/50 p-1.5 px-2.5 rounded border border-slate-800 flex justify-between">
                  <span className="text-slate-600">campaign:</span>
                  <span className="text-blue-400 truncate max-w-[80px]">{name || '-'}</span>
                </div>
                <div className="bg-slate-950/50 p-1.5 px-2.5 rounded border border-slate-800 flex justify-between">
                  <span className="text-slate-600">content/term:</span>
                  <span className="text-purple-400 truncate max-w-[80px]">{term || content || '-'}</span>
                </div>
              </div>
            </div>

            <div className="flex gap-2.5 pt-4">
              <button
                onClick={handleCopy}
                disabled={!generatedUrl}
                className="flex-1 bg-blue-600 hover:bg-blue-500 disabled:bg-slate-850 disabled:text-slate-600 py-2.5 px-4 rounded-lg font-bold text-xs text-center text-white flex items-center justify-center gap-2 cursor-pointer transition-colors"
                id="utm-copy-btn"
              >
                {copied ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
                {copied ? 'Copied Link' : 'Copy Campaign Link'}
              </button>

              <button
                onClick={handleSaveToHistory}
                disabled={!generatedUrl || !url || !source}
                className="bg-slate-800 hover:bg-slate-700 disabled:bg-slate-850 disabled:text-slate-600 p-2.5 rounded-lg text-white font-medium text-xs flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
                title="Save current parameters to local history board"
                id="utm-save-btn"
              >
                <Save className="h-4 w-4" />
                <span className="hidden sm:inline">Save</span>
              </button>
            </div>
          </div>
        </div>

      </div>

      {/* History Dashboard */}
      {history.length > 0 && (
        <div className="bg-white dark:bg-slate-950 p-6 border border-slate-200 dark:border-slate-800 rounded-xl space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-900 pb-3">
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider">Save History Board</span>
              <span className="bg-slate-100 dark:bg-slate-900 text-slate-500 dark:text-slate-400 px-2 py-0.5 rounded text-[10px] font-mono leading-none">{history.length} Saved</span>
            </div>
            <button 
              onClick={() => {
                if (confirm('Clear entire history?')) {
                  saveToLocalStorage([]);
                }
              }}
              className="text-[10px] font-medium text-red-500 hover:text-red-600 flex items-center gap-1 cursor-pointer"
            >
              <Trash2 className="h-3 w-3" /> Clear History
            </button>
          </div>

          <div className="space-y-2 max-h-[280px] overflow-y-auto pr-1">
            {history.map((item) => (
              <div 
                key={item.id} 
                className="p-3 bg-slate-50/60 dark:bg-slate-900/50 rounded-lg border border-slate-200/50 dark:border-slate-850 flex flex-col md:flex-row md:items-center justify-between gap-4 text-left hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors"
              >
                <div className="space-y-1 overflow-hidden flex-1">
                  <div className="flex flex-wrap items-center gap-2 text-[10px]">
                    <span className="font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-500/10 px-1.5 py-0.5 rounded font-mono">source: {item.source}</span>
                    {item.medium && (
                      <span className="font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10 px-1.5 py-0.5 rounded font-mono">medium: {item.medium}</span>
                    )}
                    {item.name && (
                      <span className="font-bold text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-500/10 px-1.5 py-0.5 rounded font-mono">campaign: {item.name}</span>
                    )}
                    <span className="text-slate-400 font-normal ml-auto text-[9px]">{item.timestamp}</span>
                  </div>
                  <div className="font-mono text-xs text-slate-800 dark:text-slate-200 truncate pr-16" title={item.generatedUrl}>
                    {item.generatedUrl}
                  </div>
                </div>

                <div className="flex items-center gap-1.5 shrink-0 ml-auto md:ml-0">
                  <button
                    onClick={() => handleCopyHistoryItem(item.generatedUrl, item.id)}
                    className="p-2 bg-white dark:bg-slate-950 border border-slate-150 dark:border-slate-800 rounded-lg text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-50 cursor-pointer"
                    title="Copy this generated URL"
                  >
                    {copiedHistoryId === item.id ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5" />}
                  </button>
                  <button
                    onClick={() => handleDeleteHistoryItem(item.id)}
                    className="p-2 bg-white dark:bg-slate-950 border border-slate-150 dark:border-slate-800 rounded-lg text-slate-400 hover:text-red-500 hover:bg-slate-50 cursor-pointer"
                    title="Delete item"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Structured AdSense-friendly SEO guideline documentation block */}
      <div id="utm-documentation" className="border-t border-slate-200 dark:border-slate-800 pt-8 mt-12 space-y-6">
        <h3 className="font-display font-bold text-lg text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <HelpCircle className="h-5 w-5 text-blue-500" /> Understanding Campaign UTM Parameters Grouping
        </h3>
        <p className="text-xs text-slate-505 leading-relaxed">
          UTM (Urchin Tracking Module) codes are tiny fragments of query parameters added to web addresses. They allow analytic networks like Google Analytics to track user referral flows with high precision.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="p-4 bg-slate-50/50 dark:bg-slate-900/50 border border-slate-200/60 dark:border-slate-850 rounded-xl space-y-2">
            <span className="text-[10px] font-mono font-bold text-blue-500 uppercase">1. Campaign Source (utm_source)</span>
            <p className="text-[11px] text-slate-500 leading-relaxed">
              Defines the engine, social network, or environment initiating the click (e.g. <code className="font-mono bg-slate-100 dark:bg-slate-950 px-1 py-0.5 rounded text-[10px]">google</code>, <code className="font-mono bg-slate-100 dark:bg-slate-950 px-1 py-0.5 rounded text-[10px]">newsletter</code>, <code className="font-mono bg-slate-100 dark:bg-slate-950 px-1 py-0.5 rounded text-[10px]">facebook</code>).
            </p>
          </div>

          <div className="p-4 bg-slate-50/50 dark:bg-slate-900/50 border border-slate-200/60 dark:border-slate-850 rounded-xl space-y-2">
            <span className="text-[10px] font-mono font-bold text-emerald-500 uppercase">2. Campaign Medium (utm_medium)</span>
            <p className="text-[11px] text-slate-500 leading-relaxed">
              Describes the marketing channels or media format used to drive traffic (e.g. <code className="font-mono bg-slate-100 dark:bg-slate-950 px-1 py-0.5 rounded text-[10px]">cpc</code> for paid search, <code className="font-mono bg-slate-100 dark:bg-slate-950 px-1 py-0.5 rounded text-[10px]">email</code>, <code className="font-mono bg-slate-100 dark:bg-slate-950 px-1 py-0.5 rounded text-[10px]">social</code>, <code className="font-mono bg-slate-100 dark:bg-slate-950 px-1 py-0.5 rounded text-[10px]">banner</code>).
            </p>
          </div>

          <div className="p-4 bg-slate-50/50 dark:bg-slate-900/50 border border-slate-200/60 dark:border-slate-850 rounded-xl space-y-2">
            <span className="text-[10px] font-mono font-bold text-purple-500 uppercase">3. Campaign Name (utm_campaign)</span>
            <p className="text-[11px] text-slate-500 leading-relaxed">
              An identifier or brand name linked to a specific set of sales, advertisements, or content launches (e.g. <code className="font-mono bg-slate-100 dark:bg-slate-950 px-1 py-0.5 rounded text-[10px]">spring_clearout</code>, <code className="font-mono bg-slate-100 dark:bg-slate-950 px-1 py-0.5 rounded text-[10px]">product_launch_2026</code>).
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
