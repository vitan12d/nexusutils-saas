import { useState } from 'react';
import { Clipboard, Check, Tags, BarChart3, Bot, CheckCircle2, Monitor, Globe } from 'lucide-react';

export default function SeoTools({ toolId }: { toolId: string }) {
  if (toolId === 'meta-generator') return <MetaGenerator />;
  if (toolId === 'keyword-density') return <KeywordDensityChecker />;
  if (toolId === 'robots-generator') return <RobotsGenerator />;
  if (toolId === 'seo-preview') return <SeoPreview />;
  return null;
}

// 1. Meta Tag Generator Component
function MetaGenerator() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [keywords, setKeywords] = useState('');
  const [author, setAuthor] = useState('');
  const [copied, setCopied] = useState(false);

  const generateCode = () => {
    return `<!-- SEO Primary Meta Tags -->
<title>${title || 'NexusUtils - Core utilities'}</title>
<meta name="title" content="${title || 'NexusUtils - Core utilities'}">
<meta name="description" content="${description || 'Professional SaaS tool utility collection.'}">
<meta name="keywords" content="${keywords || 'utilities, developer tools, seo, finance'}">
<meta name="author" content="${author || 'NexusUtils Team'}">

<!-- Open Graph / Facebook -->
<meta property="og:type" content="website">
<meta property="og:title" content="${title || 'NexusUtils - Core utilities'}">
<meta property="og:description" content="${description || 'Professional SaaS tool utility collection.'}">
<meta property="og:image" content="https://nexusutils.online/meta_og_banner.jpg">

<!-- Twitter -->
<meta property="twitter:card" content="summary_large_image">
<meta property="twitter:title" content="${title || 'NexusUtils - Core utilities'}">
<meta property="twitter:description" content="${description || 'Professional SaaS tool utility collection.'}">
<meta property="twitter:image" content="https://nexusutils.online/meta_og_banner.jpg">`;
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generateCode());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="p-6 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-5">
        <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
          <Tags className="h-5 w-5 text-blue-500" />
          On-Page SEO Meta Tag Generator
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <div className="space-y-1">
              <div className="flex justify-between text-xs font-bold text-slate-505 dark:text-slate-400 uppercase tracking-wider">
                <span>Page Title</span>
                <span className={title.length > 60 ? 'text-red-500' : 'text-blue-500'}>{title.length}/60 chars</span>
              </div>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g., NexusUtils - Free Professional Online Tools"
                className="w-full p-2.5 bg-slate-50 dark:bg-slate-950/30 border border-slate-200 dark:border-slate-800 rounded outline-none text-xs text-slate-850 dark:text-slate-150 font-semibold"
              />
            </div>

            <div className="space-y-1">
              <div className="flex justify-between text-xs font-bold text-slate-550 dark:text-slate-400 uppercase tracking-wider">
                <span>Meta Description</span>
                <span className={description.length > 160 ? 'text-red-500' : 'text-blue-500'}>{description.length}/160 chars</span>
              </div>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="e.g., Access over 20+ free utility tools for development, content creation, image optimization, PDF processing, and standard calculations."
                className="w-full h-24 p-2.5 bg-slate-50 dark:bg-slate-950/30 border border-slate-200 dark:border-slate-800 rounded outline-none text-xs text-slate-800 dark:text-slate-150 resize-none"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-550 dark:text-slate-400 uppercase tracking-wider block">Keywords (Comma separated)</label>
              <input
                type="text"
                value={keywords}
                onChange={(e) => setKeywords(e.target.value)}
                placeholder="e.g., pdf combiner, image compress, tax estimator, color spaces"
                className="w-full p-2.5 bg-slate-50 dark:bg-slate-950/30 border border-slate-200 dark:border-slate-800 rounded outline-none text-xs text-slate-850"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-550 dark:text-slate-400 uppercase tracking-wider block">Site Author</label>
              <input
                type="text"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                placeholder="e.g., NexusUtils Team"
                className="w-full p-2.5 bg-slate-50 dark:bg-slate-950/30 border border-slate-200 dark:border-slate-800 rounded outline-none text-xs text-slate-850"
              />
            </div>
          </div>

          <div className="space-y-2.5">
            <div className="flex justify-between items-center text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              <span>Code Block HTML output</span>
              <button
                onClick={copyToClipboard}
                className="py-1 px-2.5 bg-slate-50 hover:bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-700 dark:text-slate-200 rounded flex items-center gap-1.5 transition"
              >
                {copied ? <Check className="h-3.5 w-3.5 text-green-500" /> : <Clipboard className="h-3.5 w-3.5" />}
                {copied ? 'Copied HTML!' : 'Copy Code'}
              </button>
            </div>
            <pre className="p-3 bg-slate-950 text-slate-300 rounded-lg overflow-x-auto text-[10px] font-mono leading-relaxed h-[312px] border border-slate-850">
              {generateCode()}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}

// 2. Keyword Density Checker Component
function KeywordDensityChecker() {
  const [text, setText] = useState('');
  const [density, setDensity] = useState<{ word: string; count: number; percent: number }[]>([]);

  const handleCheck = () => {
    if (!text.trim()) {
      setDensity([]);
      return;
    }

    // Clean punctuation, lower cases, split
    const cleaned = text
      .toLowerCase()
      .replace(/[.,/#!$%^&*;:{}=\-_`~()?"\d]/g, '')
      .replace(/\s+/g, ' ');

    const words = cleaned.split(' ').filter((w) => w.length > 2); // Filter small stop-words
    const totalWords = words.length;

    const occurrences: Record<string, number> = {};
    words.forEach((w) => {
      occurrences[w] = (occurrences[w] || 0) + 1;
    });

    const list = Object.entries(occurrences)
      .map(([word, count]) => ({
        word,
        count,
        percent: totalWords > 0 ? Math.round((count / totalWords) * 1000) / 10 : 0,
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);

    setDensity(list);
  };

  return (
    <div className="space-y-6">
      <div className="p-6 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-5">
        <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
          <BarChart3 className="h-5 w-5 text-blue-500" />
          Keyword Density Checker & Spam Safeguard
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="md:col-span-2 space-y-3">
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest block">Input Blog Copy / Content text</span>
            <textarea
              value={text}
              onChange={(e) => {
                setText(e.target.value);
                setDensity([]);
              }}
              placeholder="Paste copy here to analyze..."
              className="w-full h-64 p-3 border border-slate-200 dark:border-slate-800 rounded-lg outline-none focus:border-blue-500 bg-white dark:bg-slate-950/20 text-slate-850 dark:text-slate-150 font-sans text-xs leading-normal resize-none"
            />
            <button
              onClick={handleCheck}
              disabled={!text}
              className="w-full py-2.5 bg-blue-600 hover:bg-blue-500 disabled:bg-slate-300 text-white font-bold text-xs rounded-lg transition shadow-xs"
            >
              Analyze Focus Keywords
            </button>
          </div>

          <div className="space-y-3">
            <span className="text-xs font-bold text-slate-505 dark:text-slate-400 uppercase tracking-widest block">Keyword Densities (Top 10)</span>
            <div className="p-4 bg-slate-50 dark:bg-slate-950/25 border border-slate-150 dark:border-slate-850 rounded-lg h-[264px] overflow-y-auto space-y-3">
              {density.length > 0 ? (
                density.map((item, i) => (
                  <div key={i} className="space-y-1">
                    <div className="flex justify-between text-xs font-semibold">
                      <span className="text-slate-700 dark:text-slate-300">"{item.word}"</span>
                      <span className={`${item.percent > 3.0 ? 'text-red-500' : 'text-slate-400'} font-mono`}>{item.percent}%</span>
                    </div>
                    <div className="w-full bg-slate-200 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
                      <div className={`h-full ${item.percent > 3.0 ? 'bg-red-500' : 'bg-blue-600'}`} style={{ width: `${item.percent * 10}%` }} />
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-slate-400 dark:text-slate-600 h-full flex flex-col items-center justify-center text-center text-xs p-4 gap-1.5">
                  <BarChart3 className="h-8 w-8 text-slate-350 dark:text-slate-700" />
                  No text analyzed yet
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// 3. Robots.txt Generator Component
function RobotsGenerator() {
  const [sitemap, setSitemap] = useState('https://nexusutils.online/sitemap.xml');
  const [adminDisall, setAdminDisall] = useState(true);
  const [searchDisall, setSearchDisall] = useState(true);
  const [tempDisall, setTempDisall] = useState(true);
  const [copied, setCopied] = useState(false);

  const generateCode = () => {
    let output = `# Robots.txt Generated via NexusUtils core optimizer\nUser-agent: *\n`;
    if (adminDisall) output += `Disallow: /admin/\n`;
    if (searchDisall) output += `Disallow: /search/\n`;
    if (tempDisall) output += `Disallow: /tmp/\n`;
    output += `Allow: /\n\n# Sitemap Reference Link\nSitemap: ${sitemap || 'https://nexusutils.online/sitemap.xml'}`;
    return output;
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generateCode());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="p-6 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-5">
        <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
          <Bot className="h-5 w-5 text-blue-500" />
          Robots.txt Crawl Directory Config Generator
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-550 dark:text-slate-400 uppercase tracking-wider block">Sitemap URL Index</label>
              <input
                type="text"
                value={sitemap}
                onChange={(e) => setSitemap(e.target.value)}
                placeholder="https://nexusutils.online/sitemap.xml"
                className="w-full p-2.5 bg-slate-50 dark:bg-slate-950/30 border border-slate-200 dark:border-slate-800 rounded outline-none text-xs text-slate-850 font-semibold"
              />
            </div>

            <div className="space-y-2 bg-slate-50 dark:bg-slate-950/20 p-4.5 rounded-lg border border-slate-150 dark:border-slate-850">
              <span className="text-xs font-extrabold text-slate-450 dark:text-slate-400 uppercase tracking-widest block mb-2">Block Crawler Spider Targets</span>

              {[
                { label: 'Disallow admin directories (/admin/)', value: adminDisall, setter: setAdminDisall },
                { label: 'Disallow system search queries (/search/)', value: searchDisall, setter: setSearchDisall },
                { label: 'Disallow caching temp indices (/tmp/)', value: tempDisall, setter: setTempDisall },
              ].map((opt, i) => (
                <div key={i} className="flex items-center gap-2 py-1.5 border-b border-slate-100 dark:border-slate-800/60 last:border-none">
                  <input
                    type="checkbox"
                    id={`opt-seo-${i}`}
                    checked={opt.value}
                    onChange={(e) => opt.setter(e.target.checked)}
                    className="w-4.5 h-4.5 text-blue-600 border-slate-200 dark:border-slate-800 rounded focus:ring-blue-500"
                  />
                  <label htmlFor={`opt-seo-${i}`} className="text-xs font-semibold text-slate-650 dark:text-slate-300 cursor-pointer select-none">
                    {opt.label}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-2.5">
            <div className="flex justify-between items-center text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              <span>Code Output preview</span>
              <button
                onClick={copyToClipboard}
                className="py-1.5 px-3 bg-slate-50 hover:bg-slate-100 dark:bg-slate-800 border border-slate-205 text-xs text-slate-750 dark:text-slate-250 font-bold rounded flex items-center gap-1 transition"
              >
                {copied ? <Check className="h-3.5 w-3.5 text-green-500" /> : <Clipboard className="h-3.5 w-3.5" />}
                {copied ? 'Copied Robots!' : 'Copy Code'}
              </button>
            </div>
            <pre className="p-3 bg-slate-950 text-green-400 rounded-lg overflow-x-auto text-xs font-mono leading-relaxed h-[190px] border border-slate-850">
              {generateCode()}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}

// 4. Google SEO Search Snippet & Social OG Tag Simulator
function SeoPreview() {
  const [title, setTitle] = useState('NexusUtils | Free High-Performance SaaS Developers Tools Suite');
  const [desc, setDesc] = useState('Explore NexusUtils, the fastest client-side tools platform for developers and designers. Convert JSON to structures, compress images, and simulate SEO tags safely.');
  const [url, setUrl] = useState('https://nexusutils.online');
  const [ogImg, setOgImg] = useState('https://nexusutils.online/social_og_graphic.png');
  const [viewMode, setViewMode] = useState<'google' | 'facebook' | 'twitter'>('google');
  const [copied, setCopied] = useState(false);

  const generateMetaHTML = () => {
    return `<!-- Recommended SEO & Social Media Metadata Tags -->
<title>${title}</title>
<meta name="description" content="${desc}">
<link rel="canonical" href="${url}">

<!-- Open Graph / Facebook -->
<meta property="og:type" content="website">
<meta property="og:url" content="${url}">
<meta property="og:title" content="${title}">
<meta property="og:description" content="${desc}">
<meta property="og:image" content="${ogImg}">

<!-- X / Twitter -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:url" content="${url}">
<meta name="twitter:title" content="${title}">
<meta name="twitter:description" content="${desc}">
<meta name="twitter:image" content="${ogImg}">`;
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generateMetaHTML());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="p-6 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-slate-100 dark:border-slate-800 pb-4">
          <div>
            <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
              <Monitor className="h-5 w-5 text-indigo-500" />
              Google & Social Media Card Preview Simulator
            </h3>
            <p className="text-xs text-slate-400 dark:text-slate-500">
              Input meta structures and inspect precisely how search engines and social feeds represent your web assets.
            </p>
          </div>
          <div className="flex p-1 bg-slate-50 dark:bg-slate-950/40 border border-slate-200 dark:border-slate-850 rounded-lg shrink-0">
            <button
              onClick={() => setViewMode('google')}
              className={`px-3.5 py-1 text-xs font-bold rounded ${
                viewMode === 'google' ? 'bg-indigo-600 text-white shadow-xs' : 'text-slate-500'
              }`}
            >
              Google Feed
            </button>
            <button
              onClick={() => setViewMode('facebook')}
              className={`px-3.5 py-1 text-xs font-bold rounded ${
                viewMode === 'facebook' ? 'bg-indigo-600 text-white shadow-xs' : 'text-slate-500'
              }`}
            >
              Facebook Share
            </button>
            <button
              onClick={() => setViewMode('twitter')}
              className={`px-3.5 py-1 text-xs font-bold rounded ${
                viewMode === 'twitter' ? 'bg-indigo-600 text-white shadow-xs' : 'text-slate-500'
              }`}
            >
              X Card Info
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="space-y-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Meta Title Header (Target &lt; 60 Chars)</span>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full h-10 px-3 border border-slate-200 dark:border-slate-850 rounded-lg outline-none focus:border-indigo-500 bg-slate-50/50 dark:bg-slate-950/40 text-slate-850 dark:text-slate-150 font-sans text-xs"
                placeholder="Page Title Header"
              />
              <div className="flex justify-between text-[10px] font-bold text-slate-400">
                <span>Character length count: {title.length} characters</span>
                <span className={title.length > 60 ? 'text-amber-500' : 'text-green-500'}>
                  {title.length > 60 ? '⚠️ Excess standard limit' : '✓ Safe length'}
                </span>
              </div>
            </div>

            <div className="space-y-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Meta Description Header (Target &lt; 155 Chars)</span>
              <textarea
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                className="w-full h-24 p-3 border border-slate-200 dark:border-slate-850 rounded-lg outline-none focus:border-indigo-500 bg-slate-50/50 dark:bg-slate-950/40 text-slate-850 dark:text-slate-150 font-sans text-xs resize-none"
                placeholder="Give rich contextual summary..."
              />
              <div className="flex justify-between text-[10px] font-bold text-slate-400">
                <span>Character length count: {desc.length} characters</span>
                <span className={desc.length > 155 ? 'text-amber-500' : 'text-green-500'}>
                  {desc.length > 155 ? '⚠️ Excess standard limit' : '✓ Safe length'}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Canonical Link Address</span>
                <input
                  type="text"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  className="w-full h-10 px-3 border border-slate-200 dark:border-slate-850 rounded-lg outline-none focus:border-indigo-500 bg-slate-50/50 dark:bg-slate-950/40 text-slate-850 dark:text-slate-150 font-sans text-xs"
                />
              </div>

              <div className="space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Og Social Image Graphic URL</span>
                <input
                  type="text"
                  value={ogImg}
                  onChange={(e) => setOgImg(e.target.value)}
                  className="w-full h-10 px-3 border border-slate-200 dark:border-slate-850 rounded-lg outline-none focus:border-indigo-500 bg-slate-50/50 dark:bg-slate-950/40 text-slate-850 dark:text-slate-150 font-sans text-xs"
                />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Simulated Feed Preview</span>
            
            {viewMode === 'google' && (
              <div className="p-5 border border-slate-150 dark:border-slate-850 bg-slate-50/60 dark:bg-slate-950/30 rounded-xl space-y-1">
                <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400">
                  <Globe className="h-3.5 w-3.5" />
                  <span>{url}</span>
                </div>
                <h4 className="text-lg font-medium text-[#1a0dab] dark:text-[#a0c5fc] hover:underline cursor-pointer leading-tight truncate">
                  {title}
                </h4>
                <p className="text-xs text-[#4d5156] dark:text-[#c9cbcf] leading-relaxed line-clamp-2">
                  {desc || 'Missing meta description. Search engines will fallback to raw body texts.'}
                </p>
              </div>
            )}

            {viewMode === 'facebook' && (
              <div className="border border-slate-150 dark:border-slate-850 bg-white dark:bg-slate-950 rounded-lg overflow-hidden max-w-md mx-auto shadow-xs">
                <img
                  src={ogImg}
                  onError={(e) => {
                    (e.target as any).src = 'https://images.unsplash.com/photo-1557683316-973673baf926?q=80&w=600';
                  }}
                  alt="OG Card"
                  className="w-full h-44 object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="p-3 bg-slate-50 dark:bg-slate-900 border-t border-slate-100 dark:border-slate-850">
                  <span className="text-[10px] font-sans font-bold text-slate-400 dark:text-slate-500 uppercase">{new URL(url).hostname}</span>
                  <h4 className="text-sm font-bold text-slate-800 dark:text-slate-150 truncate mt-0.5">{title}</h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-450 line-clamp-1 leading-snug mt-1">{desc}</p>
                </div>
              </div>
            )}

            {viewMode === 'twitter' && (
              <div className="border border-slate-150 dark:border-slate-850 bg-white dark:bg-slate-950 rounded-xl overflow-hidden max-w-md mx-auto shadow-xs">
                <img
                  src={ogImg}
                  onError={(e) => {
                    (e.target as any).src = 'https://images.unsplash.com/photo-1557683316-973673baf926?q=80&w=600';
                  }}
                  alt="X Card"
                  className="w-full h-44 object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="p-3 bg-white dark:bg-slate-950">
                  <span className="text-[10px] text-slate-400 dark:text-slate-500">{new URL(url).hostname}</span>
                  <h4 className="text-xs font-bold text-slate-800 dark:text-slate-150 truncate mt-0.5">{title}</h4>
                  <p className="text-[10px] text-slate-500 dark:text-slate-450 line-clamp-1 leading-snug mt-1">{desc}</p>
                </div>
              </div>
            )}

            <div className="space-y-2 pt-2 border-t border-slate-150 dark:border-slate-800/80">
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Constructed HTML Tags</span>
                <button
                  onClick={handleCopy}
                  className="py-1 px-2.5 bg-indigo-50 dark:bg-indigo-955/20 hover:bg-indigo-100 border border-indigo-200 dark:border-indigo-900 text-[10px] text-indigo-700 dark:text-indigo-400 font-bold rounded flex items-center gap-1 transition"
                >
                  {copied ? <Check className="h-3.5 w-3.5" /> : <Clipboard className="h-3.5 w-3.5" />}
                  {copied ? 'Copied' : 'Copy HTML'}
                </button>
              </div>
              <pre className="p-3 bg-slate-950 text-slate-200 rounded-lg overflow-x-auto text-[10px] font-mono leading-normal h-44 border border-slate-850">
                {generateMetaHTML()}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

