import { useState, useEffect } from 'react';
import { Copy, Check, Shield, Monitor, Cpu, Globe, Search, RefreshCw, HelpCircle, HardDrive } from 'lucide-react';

interface ParsedUA {
  browser: string;
  version: string;
  os: string;
  engine: string;
  device: string;
}

export default function UAParser() {
  const [userAgentInput, setUserAgentInput] = useState('');
  const [copied, setCopied] = useState(false);
  const [clientSpecs, setClientSpecs] = useState({
    screenSize: 'Loading...',
    viewport: 'Loading...',
    pixelRatio: '1',
    cookiesEnabled: 'Unknown',
    language: 'Unknown',
    platform: 'Unknown',
    onlineStatus: 'Online',
  });

  // Self parsing logic for accurate user-agent insights without bloated libraries
  const parseUA = (uaString: string): ParsedUA => {
    const ua = uaString || '';
    let browser = 'Unknown Browser';
    let version = 'Unknown';
    let os = 'Unknown OS';
    let engine = 'Unknown Engine';
    let device = 'Desktop';

    // Parse OS
    if (/windows/i.test(ua)) os = 'Windows';
    else if (/macintosh|mac os x/i.test(ua)) os = 'macOS';
    else if (/android/i.test(ua)) { os = 'Android'; device = 'Mobile/Tablet'; }
    else if (/iphone|ipad|ipod/i.test(ua)) { os = 'iOS'; device = 'Mobile/Tablet'; }
    else if (/linux/i.test(ua)) os = 'Linux';
    else if (/ubuntu/i.test(ua)) os = 'Ubuntu';

    // Parse Browser
    if (/chrome|crios/i.test(ua) && !/edge|edg/i.test(ua) && !/opr/i.test(ua)) {
      browser = 'Chrome';
      const match = ua.match(/(?:chrome|crios)\/([0-9.]+)/i);
      if (match) version = match[1];
    } else if (/safari/i.test(ua) && !/chrome|crios/i.test(ua) && !/edge|edg/i.test(ua)) {
      browser = 'Safari';
      const match = ua.match(/version\/([0-9.]+)/i);
      if (match) version = match[1];
    } else if (/firefox|fxios/i.test(ua)) {
      browser = 'Firefox';
      const match = ua.match(/(?:firefox|fxios)\/([0-9.]+)/i);
      if (match) version = match[1];
    } else if (/edge|edg/i.test(ua)) {
      browser = 'Microsoft Edge';
      const match = ua.match(/edg(?:e)?\/([0-9.]+)/i);
      if (match) version = match[1];
    } else if (/opr/i.test(ua)) {
      browser = 'Opera';
      const match = ua.match(/opr\/([0-9.]+)/i);
      if (match) version = match[1];
    }

    // Parse Engine
    if (/webkit/i.test(ua)) engine = 'WebKit (Blink)';
    else if (/gecko/i.test(ua) && !/webkit/i.test(ua)) engine = 'Gecko';
    else if (/trident/i.test(ua)) engine = 'Trident';

    return { browser, version, os, engine, device };
  };

  const currentUA = typeof navigator !== 'undefined' ? navigator.userAgent : '';
  
  // Parse inputs dynamically; default to client's UA
  const parsedSpecs = parseUA(userAgentInput || currentUA);

  // Initialize client characteristics on mount
  useEffect(() => {
    if (typeof window !== 'undefined' && typeof navigator !== 'undefined') {
      const updateDimensions = () => {
        setClientSpecs({
          screenSize: `${window.screen.width} x ${window.screen.height}`,
          viewport: `${window.innerWidth} x ${window.innerHeight}`,
          pixelRatio: window.devicePixelRatio.toString(),
          cookiesEnabled: navigator.cookieEnabled ? 'Enabled' : 'Disabled',
          language: navigator.language || 'English',
          platform: navigator.platform || 'Unknown',
          onlineStatus: navigator.onLine ? 'Online' : 'Offline',
        });
      };

      updateDimensions();
      window.addEventListener('resize', updateDimensions);
      return () => window.removeEventListener('resize', updateDimensions);
    }
  }, []);

  const handleCopyUA = () => {
    const value = userAgentInput || currentUA;
    navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2050);
  };

  const handleResetToCurrent = () => {
    setUserAgentInput('');
  };

  return (
    <div id="ua-parser-root" className="space-y-8 select-text">
      
      {/* Upper Layout: Paste external User Agent OR check current UA */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* User Agent Input Box (Left 7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wide block">User Agent input console</span>
            {userAgentInput && (
              <button 
                onClick={handleResetToCurrent}
                className="text-[10px] text-blue-500 hover:text-blue-600 font-medium flex items-center gap-1 transition-colors cursor-pointer"
                id="ua-reset-btn"
              >
                <RefreshCw className="h-3 w-3" /> Reset to Current Device
              </button>
            )}
          </div>

          <div className="relative">
            <textarea 
              id="ua-text-input"
              rows={4}
              value={userAgentInput}
              onChange={(e) => setUserAgentInput(e.target.value)}
              placeholder={`Active Device: ${currentUA}`}
              className="w-full bg-slate-50 dark:bg-slate-950/20 border border-slate-200 dark:border-slate-800 rounded-xl p-4 pr-16 text-xs font-mono focus:ring-1 focus:ring-blue-500 focus:outline-none placeholder-slate-500 dark:placeholder-slate-600 leading-relaxed resize-none"
            />
            
            <button
              onClick={handleCopyUA}
              className="absolute right-3.5 bottom-3.5 p-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-slate-500 hover:text-blue-500 transition-colors shadow-sm cursor-pointer"
              title="Copy active user agent string"
              id="ua-copy-btn"
            >
              {copied ? <Check className="h-4 w-4 text-emerald-500" /> : <Copy className="h-4 w-4" />}
            </button>
          </div>
          
          <p className="text-[10px] text-slate-400 italic">
            * Edit the string above to parse any visitor logs or test custom server configurations.
          </p>
        </div>

        {/* Parsed Specs Cards (Right 5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-slate-900 dark:bg-slate-955 text-white p-5 rounded-xl space-y-4">
            <span className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-widest block">Metadata Extraction Matrix</span>

            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs border-b border-slate-800 pb-2.5">
                <span className="text-slate-500 flex items-center gap-1.5"><Shield className="h-4 w-4 text-orange-400 shrink-0" /> OS Platform</span>
                <span className="font-bold text-slate-105 font-mono">{parsedSpecs.os}</span>
              </div>
              <div className="flex items-center justify-between text-xs border-b border-slate-800 pb-2.5">
                <span className="text-slate-500 flex items-center gap-1.5"><Cpu className="h-4 w-4 text-cyan-400 shrink-0" /> Browser Name</span>
                <span className="font-bold text-slate-105 font-mono">{parsedSpecs.browser}</span>
              </div>
              <div className="flex items-center justify-between text-xs border-b border-slate-800 pb-2.5">
                <span className="text-slate-500 flex items-center gap-1.5"><Globe className="h-4 w-4 text-blue-400 shrink-0" /> Version Tag</span>
                <span className="font-bold text-slate-105 font-mono truncate max-w-[140px]" title={parsedSpecs.version}>{parsedSpecs.version}</span>
              </div>
              <div className="flex items-center justify-between text-xs border-b border-slate-800 pb-2.5">
                <span className="text-slate-500 flex items-center gap-1.5"><Monitor className="h-4 w-4 text-yellow-400 shrink-0" /> Device Category</span>
                <span className="font-bold text-slate-105 font-mono">{parsedSpecs.device}</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-500 flex items-center gap-1.5"><Monitor className="h-4 w-4 text-purple-400 shrink-0" /> Render Engine</span>
                <span className="font-bold text-slate-105 font-mono">{parsedSpecs.engine}</span>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Grid: Client system specs dimensions inside sandbox (Only on local client context) */}
      <div className="bg-white dark:bg-slate-950 p-6 border border-slate-200 dark:border-slate-800 rounded-xl space-y-4">
        <div className="flex items-center gap-1.5 border-b border-slate-100 dark:border-slate-900 pb-3">
          <Monitor className="h-4 w-4 text-blue-500" />
          <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider">Dynamic Client Specs (Self Diagnostic)</h4>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-3.5 bg-slate-50/60 dark:bg-slate-900/50 rounded-lg border border-slate-200/50 dark:border-slate-850">
            <span className="text-slate-400 dark:text-slate-500 text-[9px] font-mono uppercase block">Screen Resolution</span>
            <span className="text-xs font-bold text-slate-800 dark:text-slate-200 mt-1 block font-mono">{clientSpecs.screenSize}</span>
          </div>

          <div className="p-3.5 bg-slate-50/60 dark:bg-slate-900/50 rounded-lg border border-slate-200/50 dark:border-slate-850">
            <span className="text-slate-400 dark:text-slate-500 text-[9px] font-mono uppercase block">Viewport Size</span>
            <span className="text-xs font-bold text-slate-800 dark:text-slate-200 mt-1 block font-mono">{clientSpecs.viewport}</span>
          </div>

          <div className="p-3.5 bg-slate-50/60 dark:bg-slate-900/50 rounded-lg border border-slate-200/50 dark:border-slate-850">
            <span className="text-slate-400 dark:text-slate-500 text-[9px] font-mono uppercase block">Device Pixel Ratio</span>
            <span className="text-xs font-bold text-slate-800 dark:text-slate-200 mt-1 block font-mono">{clientSpecs.pixelRatio}x</span>
          </div>

          <div className="p-3.5 bg-slate-50/60 dark:bg-slate-900/50 rounded-lg border border-slate-200/50 dark:border-slate-850">
            <span className="text-slate-400 dark:text-slate-500 text-[9px] font-mono uppercase block">Navigator Language</span>
            <span className="text-xs font-bold text-slate-800 dark:text-slate-200 mt-1 block font-mono">{clientSpecs.language}</span>
          </div>

          <div className="p-3.5 bg-slate-50/60 dark:bg-slate-900/50 rounded-lg border border-slate-200/50 dark:border-slate-850">
            <span className="text-slate-400 dark:text-slate-500 text-[9px] font-mono uppercase block">Cookies Enabled</span>
            <span className="text-xs font-bold text-slate-800 dark:text-slate-200 mt-1 block font-mono">{clientSpecs.cookiesEnabled}</span>
          </div>

          <div className="p-3.5 bg-slate-50/60 dark:bg-slate-900/50 rounded-lg border border-slate-200/50 dark:border-slate-850">
            <span className="text-slate-400 dark:text-slate-500 text-[9px] font-mono uppercase block">Platform Identity</span>
            <span className="text-xs font-bold text-slate-800 dark:text-slate-200 mt-1 block font-mono truncate" title={clientSpecs.platform}>{clientSpecs.platform}</span>
          </div>

          <div className="p-3.5 bg-slate-50/60 dark:bg-slate-900/50 rounded-lg border border-slate-200/50 dark:border-slate-850">
            <span className="text-slate-400 dark:text-slate-500 text-[9px] font-mono uppercase block">W3C Online Status</span>
            <span className="text-xs font-bold mt-1 block font-mono text-emerald-500 flex items-center gap-1">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span> {clientSpecs.onlineStatus}
            </span>
          </div>

          <div className="p-3.5 bg-slate-50/60 dark:bg-slate-900/50 rounded-lg border border-slate-200/50 dark:border-slate-850">
            <span className="text-slate-400 dark:text-slate-500 text-[9px] font-mono uppercase block">JS Execution</span>
            <span className="text-xs font-bold text-indigo-500 mt-1 block font-mono">Enabled (Perfect)</span>
          </div>
        </div>
      </div>

      {/* Structured SEO info */}
      <div id="ua-docs" className="border-t border-slate-200 dark:border-slate-800 pt-8 mt-12 space-y-5">
        <span className="font-display font-medium text-xs text-slate-500 uppercase tracking-widest block">Guide: Device Analysis & Web Crawling</span>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-xs leading-relaxed text-slate-505">
          <div className="space-y-2">
            <h5 className="font-bold text-slate-900 dark:text-slate-100 flex items-center gap-1">
              <HardDrive className="h-4 w-4 text-blue-500" /> What is a Browser User-Agent?
            </h5>
            <p>
              A User Agent is a text header passed alongside web connections. It reports your specific application name, host operating system, layout engine, and rendering version. This allows web servers to optimize page sizing for responsive screens dynamically.
            </p>
          </div>
          <div className="space-y-2">
            <h5 className="font-bold text-slate-900 dark:text-slate-100 flex items-center gap-1">
              <Search className="h-4 w-4 text-orange-500" /> Identifying Search Engine Index Bots
            </h5>
            <p>
              Crawlers have unique identifiers. For example, Googlebot passes a specific string: <code className="font-mono bg-slate-100 dark:bg-slate-900 px-1 py-0.5 rounded text-[10px] break-all">Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)</code>. This lets publishers log crawler index frequencies and protect precious server bandwidth.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
