import React, { useState } from 'react';
import { Bot, Sparkles, Copy, Check, Eye, HelpCircle, FileJson, AlertTriangle } from 'lucide-react';

interface GeminiSEOResponse {
  recommendedTitle: string;
  recommendedDescription: string;
  openGraphTitle: string;
  openGraphDescription: string;
  focusKeywords: string[];
  structuredDataSchema: string;
}

export default function SEOTagGenerator() {
  const [title, setTitle] = useState('NexusUtils Formatter');
  const [description, setDescription] = useState('An online utility suite that formats JSON payload variables and evaluates password metrics without logs.');
  const [keywords, setKeywords] = useState('json validator, free developer tool');
  const [loading, setLoading] = useState(false);
  const [errorHeader, setErrorHeader] = useState<string | null>(null);
  const [result, setResult] = useState<GeminiSEOResponse | null>(null);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return;

    setLoading(true);
    setErrorHeader(null);
    setResult(null);

    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, description, keywords })
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Server error generating metadata.');
      }

      setResult(data);
    } catch (err: any) {
      console.error('Gemini API Error:', err);
      setErrorHeader(err.message || 'Connection lost to AI optimization services.');
    } finally {
      setLoading(false);
    }
  };

  const handleCopyText = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <div id="ai-seo-master" className="space-y-8">
      
      {/* Upper split panel */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        
        {/* Input variables Form card */}
        <form onSubmit={handleGenerate} className="lg:col-span-2 bg-slate-50 dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-xl p-5 md:p-6 space-y-5 h-fit">
          <div className="flex items-center gap-2 border-b border-slate-200/45 dark:border-slate-800 pb-3 mb-1">
            <Bot className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            <span className="text-xs font-bold text-slate-850 dark:text-slate-100 uppercase tracking-wider">AI Copypaper Variables</span>
          </div>

          {/* Form input: Title */}
          <div className="space-y-1">
            <label htmlFor="form-title" className="text-[10px] font-mono font-bold text-slate-450 uppercase block">Seed App/Tool Name</label>
            <input
              id="form-title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. JSON Prettifier Tool"
              required
              className="input-field"
            />
          </div>

          {/* Form input: Description */}
          <div className="space-y-1">
            <label htmlFor="form-desc" className="text-[10px] font-mono font-bold text-slate-450 uppercase block">Short Seed Description</label>
            <textarea
              id="form-desc"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Draft what this utility solves..."
              required
              rows={3}
              className="input-field resize-none"
            />
          </div>

          {/* Form input: Focus Keywords */}
          <div className="space-y-1">
            <label htmlFor="form-keywords" className="text-[10px] font-mono font-bold text-slate-450 uppercase block">Focus Keyword Targets</label>
            <input
              id="form-keywords"
              type="text"
              value={keywords}
              onChange={(e) => setKeywords(e.target.value)}
              placeholder="e.g. validator, pretty, coder utilities"
              className="input-field"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="button-primary w-full cursor-pointer flex items-center justify-center gap-2"
          >
            <Sparkles className="h-4 w-4 text-white" />
            {loading ? 'Optimizing Tags...' : 'Optimize with Gemini AI'}
          </button>
        </form>

        {/* Output pane panel (3 cols) */}
        <div className="lg:col-span-3 min-h-[380px] flex flex-col justify-center border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 rounded-xl relative p-6">
          
          {loading && (
            <div className="text-center py-16 space-y-4 animate-pulse">
              <Bot className="h-10 w-10 text-blue-600 dark:text-blue-550 mx-auto animate-bounce" />
              <span className="text-xs text-slate-500 block">Consulting Gemini modeling indexes...</span>
              <p className="text-[10px] text-slate-400 font-mono">Refining structured data JSON markup configurations</p>
            </div>
          )}

          {!loading && !result && !errorHeader && (
            <div className="text-center py-16 text-slate-400">
              <Sparkles className="h-10 w-10 text-slate-200 dark:text-slate-750 mx-auto mb-3" />
              <span className="text-xs block mb-1">Awaiting parameters optimization</span>
              <span className="text-[10px]">Enter configurations and submit. Response updates instantaneously.</span>
            </div>
          )}

          {errorHeader && (
            <div className="bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-850 p-5 rounded-lg text-xs leading-relaxed font-mono">
              <AlertTriangle className="h-5 w-5 text-red-550 mb-2" />
              <span className="font-bold text-red-650 dark:text-red-400 block mb-1">Configuration Exception:</span>
              <p className="text-red-650 dark:text-red-405">{errorHeader}</p>
              <div className="mt-4 text-[10px] text-slate-400">
                Ensure a real, server-side <code className="bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 px-1 py-0.5 rounded font-bold">GEMINI_API_KEY</code> has been configured inside Secrets.
              </div>
            </div>
          )}

          {/* Results outputs */}
          {result && !loading && (
            <div className="space-y-6 select-text w-full">
              
              {/* Dynamic Google Search preview module */}
              <div className="bg-slate-50 dark:bg-slate-900 p-4 border border-slate-150 dark:border-slate-800 rounded-xl space-y-1.5 shadow-inner">
                <span className="text-[9px] font-mono font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest block">GOOGLE SEARCH PREVIEW</span>
                <span className="text-xs font-sans text-green-700 dark:text-green-450 font-medium tracking-wide block truncate">
                  https://nexusutils.com/tools/{title.toLowerCase().replace(/[^a-z0-9]/g, '-')}
                </span>
                <span className="text-[15px] font-sans text-blue-800 dark:text-blue-400 font-semibold hover:underline cursor-pointer block leading-snug">
                  {result.recommendedTitle}
                </span>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
                  {result.recommendedDescription}
                </p>
              </div>

              {/* Tag Details table */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {/* Meta details card */}
                <div className="space-y-2 bg-slate-50/50 dark:bg-slate-900/30 p-3.5 border border-slate-100 dark:border-slate-850 rounded-xl relative">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-[10px] font-mono font-bold text-slate-400">OPENGRAPH SOCIAL META</span>
                    <button
                      onClick={() => handleCopyText(result.openGraphTitle, 'og-t')}
                      className="text-[10px] text-blue-500 flex items-center gap-0.5 cursor-pointer"
                    >
                      {copiedKey === 'og-t' ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                    </button>
                  </div>
                  <span className="text-xs font-semibold block text-slate-800 dark:text-slate-200">{result.openGraphTitle}</span>
                  <p className="text-[11px] text-slate-500 leading-normal">{result.openGraphDescription}</p>
                </div>

                {/* Focus Keywords details */}
                <div className="space-y-2 bg-slate-50/50 dark:bg-slate-900/30 p-3.5 border border-slate-100 dark:border-slate-850 rounded-xl">
                  <span className="text-[10px] font-mono font-bold text-slate-400 block mb-1">AI STRATEGIC KEYWORDS</span>
                  <div className="flex flex-wrap gap-1.5">
                    {result.focusKeywords.map((k, i) => (
                      <span key={i} className="text-[10px] bg-blue-105 dark:bg-blue-550/15 text-blue-700 dark:text-blue-350 px-2.5 py-1 rounded-full font-medium">
                        {k}
                      </span>
                    ))}
                  </div>
                </div>

              </div>

              {/* Structured schema block */}
              {result.structuredDataSchema && (
                <div className="space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-mono font-bold text-slate-400 flex items-center gap-1">
                      <FileJson className="h-3.5 w-3.5 text-slate-500" /> STRUCTURAL JSON-LD MARKUP SCHEMA
                    </span>
                    <button
                      onClick={() => handleCopyText(result.structuredDataSchema, 'schema-v')}
                      className="text-[11px] text-blue-600 dark:text-blue-400 hover:bg-slate-50 dark:hover:bg-slate-900 border border-slate-250/20 px-2.5 py-1 rounded flex items-center gap-1 cursor-pointer font-semibold"
                    >
                      {copiedKey === 'schema-v' ? <Check className="h-3 w-3" /> : 'Copy Copy'}
                    </button>
                  </div>
                  <pre className="p-3 bg-slate-900 text-slate-100 text-[10px] font-mono rounded-lg overflow-auto max-h-[140px] whitespace-pre-wrap select-all">
                    {result.structuredDataSchema}
                  </pre>
                </div>
              )}

            </div>
          )}

        </div>

      </div>

    </div>
  );
}
