import { useState, useMemo } from 'react';
import { Copy, Check, Hash, Clock, FileText, Activity, Trash2, HelpCircle, AlignLeft, Info } from 'lucide-react';

export default function WordCounter() {
  const [text, setText] = useState('');
  const [copied, setCopied] = useState(false);

  // Clean, fast metrics computation
  const metrics = useMemo(() => {
    const rawText = text || '';
    const charCountWithSpaces = rawText.length;
    const charCountNoSpaces = rawText.replace(/\s/g, '').length;
    
    // Words list (filtering empty ones)
    const words = rawText.trim().split(/\s+/).filter(w => w.length > 0);
    const wordCount = words.length;

    // Sentences count (delimited by ., !, ?)
    const sentences = rawText.split(/[.!?]+/).filter(s => s.trim().length > 0);
    const sentenceCount = sentences.length;

    // Paragraphs count (delimited by double newlines)
    const paragraphs = rawText.split(/\n\s*\n/).filter(p => p.trim().length > 0);
    const paragraphCount = paragraphs.length;

    // Estimated reading time (avg 225 words per minute)
    const readingTimeMins = Math.ceil(wordCount / 225) || (wordCount > 0 ? 1 : 0);
    
    // Speaking time (avg 150 words per minute)
    const speakingTimeMins = Math.ceil(wordCount / 150) || (wordCount > 0 ? 1 : 0);

    // Calculate keyword density
    // Filter stop words to provide actual SEO insights
    const stopWords = new Set([
      'the', 'is', 'at', 'which', 'and', 'on', 'a', 'an', 'to', 'in', 'of', 'for', 'with', 'as', 
      'i', 'you', 'he', 'she', 'they', 'we', 'it', 'its', 'this', 'that', 'these', 'those', 'are',
      'was', 'were', 'be', 'been', 'being', 'have', 'has', 'had', 'do', 'does', 'did', 'but', 'if', 
      'or', 'because', 'as', 'until', 'while', 'about', 'into', 'through', 'during', 'before', 'after'
    ]);

    const frequencyMap: Record<string, number> = {};
    words.forEach(w => {
      const cleanWord = w.toLowerCase().replace(/[^a-zA-Z0-9]/g, '');
      if (cleanWord && !stopWords.has(cleanWord) && cleanWord.length > 2) {
        frequencyMap[cleanWord] = (frequencyMap[cleanWord] || 0) + 1;
      }
    });

    // Sort to get top 8
    const topKeywords = Object.entries(frequencyMap)
      .map(([word, count]) => ({
        word,
        count,
        density: wordCount > 0 ? ((count / wordCount) * 100).toFixed(1) : '0'
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 8);

    return {
      charCountWithSpaces,
      charCountNoSpaces,
      wordCount,
      sentenceCount,
      paragraphCount,
      readingTimeMins,
      speakingTimeMins,
      topKeywords
    };
  }, [text]);

  const handleCopy = () => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClear = () => {
    setText('');
  };

  const uppercaseAction = () => {
    setText(prev => prev.toUpperCase());
  };

  const lowercaseAction = () => {
    setText(prev => prev.toLowerCase());
  };

  const titleCaseAction = () => {
    const res = text.replace(/\w\S*/g, (txt) => {
      return txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase();
    });
    setText(res);
  };

  const sentenceCaseAction = () => {
    if (!text) return;
    // Lowercase first, then capitalize letters following terminal punctuation
    const sentences = text.toLowerCase().split(/([.!?]\s+)/);
    const converted = sentences.map(sect => {
      if (!sect || /^[.!?]\s+$/.test(sect)) return sect;
      return sect.charAt(0).toUpperCase() + sect.slice(1);
    });
    setText(converted.join(''));
  };

  const trimSpacesAction = () => {
    setText(prev => prev.replace(/\s+/g, ' ').trim());
  };

  return (
    <div id="word-counter-root" className="space-y-8 select-text">
      
      {/* Dynamic Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Main Text Input Pane */}
        <div className="lg:col-span-8 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wide block">Content Corpus</span>
            <div className="flex gap-2 text-[10px]">
              <button 
                onClick={handleCopy}
                disabled={!text}
                className="text-slate-500 hover:text-blue-600 font-medium disabled:opacity-40 transition-colors flex items-center gap-1 cursor-pointer"
                id="word-copy-btn"
              >
                {copied ? <Check className="h-3 w-3 text-emerald-500" /> : <Copy className="h-3 w-3" />} Copy Text
              </button>
              <span className="text-slate-200 dark:text-slate-800">|</span>
              <button 
                onClick={handleClear}
                disabled={!text}
                className="text-slate-500 hover:text-red-500 font-medium disabled:opacity-40 transition-colors flex items-center gap-1 cursor-pointer"
                id="word-clear-btn"
              >
                <Trash2 className="h-3 w-3" /> Clear Text
              </button>
            </div>
          </div>

          <textarea 
            id="word-textarea"
            rows={12}
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Type, paste, or draft your SEO copy or blog content here..."
            className="w-full bg-slate-50 dark:bg-slate-950/20 border border-slate-200 dark:border-slate-800 rounded-xl p-4 text-xs font-mono focus:ring-1 focus:ring-blue-500 focus:outline-none placeholder-slate-400 dark:placeholder-slate-600 leading-relaxed"
          />

          {/* Action modifiers toolbar */}
          <div className="bg-slate-50 dark:bg-slate-950/40 border border-slate-200/60 dark:border-slate-850 p-3 rounded-lg flex flex-wrap gap-2 items-center">
            <span className="text-[9px] font-mono font-bold text-slate-400 uppercase mr-1">Utilities:</span>
            <button 
              onClick={uppercaseAction} 
              disabled={!text}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 hover:bg-slate-100 disabled:opacity-40 px-2.5 py-1 text-[10px] rounded text-slate-700 dark:text-slate-300 transition-colors font-medium cursor-pointer"
            >
              UPPERCASE
            </button>
            <button 
              onClick={lowercaseAction}
              disabled={!text}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 hover:bg-slate-100 disabled:opacity-40 px-2.5 py-1 text-[10px] rounded text-slate-700 dark:text-slate-300 transition-colors font-medium cursor-pointer"
            >
              lowercase
            </button>
            <button 
              onClick={sentenceCaseAction}
              disabled={!text}
              className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 hover:bg-slate-100 disabled:opacity-40 px-2.5 py-1 text-[10px] rounded text-slate-700 dark:text-slate-300 transition-colors font-medium cursor-pointer"
            >
              Sentence case
            </button>
            <button 
              onClick={titleCaseAction}
              disabled={!text}
              className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 hover:bg-slate-100 disabled:opacity-40 px-2.5 py-1 text-[10px] rounded text-slate-700 dark:text-slate-300 transition-colors font-medium cursor-pointer"
            >
              Title Case
            </button>
            <button 
              onClick={trimSpacesAction}
              disabled={!text}
              className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 hover:bg-slate-100 disabled:opacity-40 px-2.5 py-1 text-[10px] rounded text-slate-700 dark:text-slate-300 transition-colors font-medium cursor-pointer"
              title="Remove double whitespace characters and trim start/end values"
            >
              Trim Extra Spaces
            </button>
          </div>
        </div>

        {/* Real-time counters panel (Right Half) */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 p-5 rounded-xl space-y-5">
            <span className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wide block">Dynamic Diagnostics</span>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 bg-slate-50 dark:bg-slate-900 border border-slate-200/50 dark:border-slate-850 rounded-lg">
                <span className="text-slate-400 dark:text-slate-500 text-[10px] block font-mono uppercase">Total Words</span>
                <span className="text-xl font-display font-extrabold text-blue-600 dark:text-blue-400 mt-1 block">{metrics.wordCount}</span>
              </div>

              <div className="p-3 bg-slate-50 dark:bg-slate-900 border border-slate-200/50 dark:border-slate-850 rounded-lg">
                <span className="text-slate-400 dark:text-slate-500 text-[10px] block font-mono uppercase">Characters</span>
                <span className="text-xl font-display font-extrabold text-slate-800 dark:text-slate-200 mt-1 block">{metrics.charCountWithSpaces}</span>
              </div>

              <div className="p-3 bg-slate-50 dark:bg-slate-900 border border-slate-200/50 dark:border-slate-850 rounded-lg">
                <span className="text-slate-400 dark:text-slate-500 text-[10px] block font-mono uppercase">Char (No Space)</span>
                <span className="text-lg font-bold text-slate-750 dark:text-slate-250 mt-1 block">{metrics.charCountNoSpaces}</span>
              </div>

              <div className="p-3 bg-slate-50 dark:bg-slate-900 border border-slate-200/50 dark:border-slate-850 rounded-lg">
                <span className="text-slate-400 dark:text-slate-500 text-[10px] block font-mono uppercase">Sentences</span>
                <span className="text-lg font-bold text-slate-750 dark:text-slate-250 mt-1 block">{metrics.sentenceCount}</span>
              </div>

              <div className="p-3 bg-slate-50 dark:bg-slate-900 border border-slate-200/50 dark:border-slate-850 rounded-lg">
                <span className="text-slate-400 dark:text-slate-500 text-[10px] block font-mono uppercase">Paragraphs</span>
                <span className="text-lg font-bold text-slate-750 dark:text-slate-250 mt-1 block">{metrics.paragraphCount}</span>
              </div>

              <div className="p-3 bg-slate-50 dark:bg-slate-900 border border-slate-200/50 dark:border-slate-850 rounded-lg">
                <span className="text-slate-400 dark:text-slate-500 text-[10px] block font-mono uppercase">Reading Time</span>
                <span className="text-xs font-semibold text-slate-750 dark:text-slate-250 mt-1.5 flex items-center gap-1">
                  <Clock className="h-3 w-3 text-emerald-500" /> ~{metrics.readingTimeMins} min
                </span>
              </div>
            </div>

            <div className="border-t border-slate-100 dark:border-slate-900 pt-4 flex justify-between text-[11px] text-slate-500 font-medium">
              <span className="flex items-center gap-1 font-mono"><AlignLeft className="h-3.5 w-3.5 text-blue-500" /> Speaking Speed:</span>
              <span className="text-slate-700 dark:text-slate-200">~{metrics.speakingTimeMins} minutes</span>
            </div>
          </div>
        </div>

      </div>

      {/* SEO Keyword Density Distribution Analysis Component */}
      <div className="bg-slate-50 dark:bg-slate-950/30 border border-slate-200 dark:border-slate-850 p-6 rounded-xl space-y-4">
        <h4 className="font-display font-bold text-xs text-slate-800 dark:text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
          <Activity className="h-4 w-4 text-indigo-500" /> SEO Content Density Analysis
        </h4>
        <p className="text-[11px] text-slate-455 leading-relaxed max-w-2xl">
          We strip basic, generic connectors (e.g. <i>the, at, before</i>) and compute repeating concepts of length 3+ characters. Keeping focus keywords at a healthy density ratio (under <span className="font-bold text-indigo-600">2.5%</span>) ensures high rankings across publisher indexing rules without trigger alarms.
        </p>

        {metrics.topKeywords.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-2">
            {metrics.topKeywords.map((item, idx) => (
              <div 
                key={idx}
                className="bg-white dark:bg-slate-900 p-2.5 px-3 rounded-lg border border-slate-150 dark:border-slate-800 flex items-center justify-between"
              >
                <div className="overflow-hidden pr-2">
                  <span className="text-xs font-bold text-slate-800 dark:text-slate-200 truncate block font-mono" title={item.word}>
                    {idx + 1}. {item.word}
                  </span>
                  <span className="text-[9px] text-slate-400 mt-0.5 block">{item.count} occurrences</span>
                </div>
                <div className="bg-slate-100 dark:bg-slate-950 text-indigo-600 dark:text-indigo-400 text-[10px] font-mono font-bold px-2 py-1 rounded">
                  {item.density}%
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-6 border border-dashed border-slate-200 dark:border-slate-800 rounded-lg text-slate-400 italic text-[11px]">
            Input key paragraphs above to generate search frequency grids automatically...
          </div>
        )}
      </div>

      {/* Structured SEO Guide Details */}
      <div id="word-info" className="border-t border-slate-200 dark:border-slate-800 pt-8 mt-12 space-y-5">
        <span className="font-display font-medium text-xs text-slate-500 uppercase tracking-widest block">Guide: Text Copy Optimization</span>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left text-xs leading-relaxed text-slate-505">
          <div className="space-y-2">
            <h5 className="font-bold text-slate-900 dark:text-slate-100 flex items-center gap-1">
              <Info className="h-4 w-4 text-blue-500" /> Ideal Article Length for AdSense Approval
            </h5>
            <p>
              Google publishers prefer articles hosting original value with at least 600 - 1,200 words. Higher, original article volumes provide more structural opportunities for programmatic engines to seed highly relevant display creatives.
            </p>
          </div>
          <div className="space-y-2">
            <h5 className="font-bold text-slate-900 dark:text-slate-100 flex items-center gap-1">
              <Hash className="h-4 w-4 text-indigo-500" /> Preventing "Keyword Stuffing" Penalties
            </h5>
            <p>
              Search bots analyze semantic tags using absolute keyword densities. If a topic (e.g. "JSON Formatter") makes up more than 3% of your corpus, it might get flagged for artificial density, hindering natural organic rankings.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
