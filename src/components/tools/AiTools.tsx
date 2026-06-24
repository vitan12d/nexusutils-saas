import { useState, useEffect } from 'react';
import { 
  Sparkles, Clipboard, Check, Download, RefreshCw, AlertCircle, 
  Globe, Sliders, ArrowRight, Code, AlertTriangle, CheckCircle 
} from 'lucide-react';

interface AiToolsProps {
  toolId?: string;
}

export default function AiTools({ toolId = 'ai-assistant' }: AiToolsProps) {
  // Common states
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState('');

  // 1. Copywriting Assistant States
  const [text, setText] = useState('');
  const [action, setAction] = useState<'rewrite' | 'summarize' | 'expand' | 'improve'>('improve');
  const [tone, setTone] = useState('Professional');

  // 2. Clone Architect States
  const [targetUrl, setTargetUrl] = useState('https://example.com');
  const [activeStack, setActiveStack] = useState('react-vite-tailwind');
  const [complexity, setComplexity] = useState('landing-page');
  const [cloneModules, setCloneModules] = useState({
    reconnaissance: true,
    designSystem: true,
    components: true,
    responsiveness: true,
    fileStructure: true,
    starterCode: true,
  });

  // 3. CMS Architect States
  const [cmsProjectName, setCmsProjectName] = useState('ZenithCMS');
  const [dbEngine, setDbEngine] = useState('mysql');
  const [stylingStyle, setStylingStyle] = useState('twilight');
  const [cmsModules, setCmsModules] = useState({
    installer: true,
    schema: true,
    adminPanel: true,
    adsense: true,
    analytics: true,
    staticPages: true,
    seqLayer: true,
  });

  // Reset results when changing tools
  useEffect(() => {
    setResult('');
    setError(null);
  }, [toolId]);

  // Generators for dynamic prompt templates
  const getClonePromptText = () => {
    const stackNames: Record<string, string> = {
      'react-vite-tailwind': 'React 18+ with Vite, TypeScript, and Tailwind CSS with Lucide Icons and Motion animations',
      'nextjs-approuter': 'Next.js 14+ with App Router, TypeScript, Tailwind CSS, and Server Actions',
      'tailwind-html-js': 'Vanilla HTML5 semantic layout, fully styled with CDN Tailwind CSS, paired with modern ES6 JS',
      'php-bootstrap': 'Standard Vanilla PHP 8+ object-oriented files with Bootstrap 5.3 CDN components'
    };

    const complexityNames: Record<string, string> = {
      'landing-page': 'Single-Screen High-Conversion Landing Page with smooth entrances and elegant scrolling',
      'multipage-corporate': 'Complete Multi-Page Enterprise Portal with About, Services, dynamic FAQs, and Contact drawers',
      'saas-dashboard': 'SaaS Analytics Control Center layout, with sidebars, grid cards, dark/light themes, and Recharts charts simulations',
      'ecommerce-cart': 'Modern E-commerce storefront with dynamic categories grids, filters, interactive product details modal, and persistent local storage checkout cart'
    };

    const selectedPhases = [];
    if (cloneModules.reconnaissance) selectedPhases.push('Phase 1 - RECONNAISSANCE: Scan active DOM structures, identify frontend frameworks, and map structural sections.');
    if (cloneModules.designSystem) selectedPhases.push('Phase 2 - DESIGN SYSTEM AUDIT: Extract absolute color palette hexadecimal variables, typography font face pairings, spacing parameters, and border-radius profiles.');
    if (cloneModules.components) selectedPhases.push('Phase 3 - COMPONENT LIBRARY: Outline layout files mapping the exact sticky headers, navigation menus, hero zones, section blocks, form interfaces, and footer elements.');
    if (cloneModules.responsiveness) selectedPhases.push('Phase 4 - RESPONSIVENESS & INTERACTION STATE: Map mobile-first responsive break-points (sm:, md:, lg:, xl:), active hover cursor configurations, transition timings, and click micro-feedback parameters.');
    if (cloneModules.fileStructure) selectedPhases.push('Phase 5 - REPLICATION ROADMAP: Compile a clean directory folder tree layout, asset placeholder configurations list, sequence build-order, and difficulty scale calculation.');
    if (cloneModules.starterCode) selectedPhases.push('Phase 6 - BOILERPLATE STARTER CODE: Output immediately executable boilerplate code containing styled tokens, global layout container, and an eye-catching, fully-responsive Hero block.');

    return `★ THE PROMPT ★

Act as an expert frontend engineer, design system architect, and premium AI prompt builder. Perform a complete, professional decomposition and design analysis plan for creating a clean clone of this platform:

1. TARGET WEBSITE URL: [ ${targetUrl || 'https://example.com'} ]
2. SYSTEM PROGRAMMING STACK: [ ${stackNames[activeStack] || activeStack} ]
3. APPLICATION COMPLEXITY LEVEL: [ ${complexityNames[complexity] || complexity} ]

Analyze this target URL structurally and generate an outstanding, step-by-step implementation blueprint formatted strictly across the following designated coordinates:

${selectedPhases.map((phase, idx) => `${idx + 1}. ${phase}`).join('\n')}

BLUEPRINT FORMULATION EXPECTATIONS:
- Define precise CSS styling, responsive margin limits, and flexible layouts.
- Output exact hexadecimal colors (e.g., deep background grays, elegant teal highlights, off-white card fills).
- Provide clean, highly structured guidelines without general summaries. Ensure it delivers highly tailored instructions.

Let's begin! Analyze the structure first and then output the full code reconstruction plan.`;
  };

  const getCmsPromptText = () => {
    const dbNames: Record<string, string> = {
      'mysql': 'MySQL via PDO Prepared Statements (OOP, fully secured from injections)',
      'sqlite': 'SQLite3 via PHP PDO SQLite driver (Zero-setup standalone backend file storage)',
      'postgresql': 'PostgreSQL with relational constraint foreign-key schemas and parametrical queries',
      'firestore': 'Google Firebase Firestore (Real-time NoSQL document collections structure)'
    };

    const styleNames: Record<string, string> = {
      'twilight': 'Deep Twilight Navy Slate (#0B0F19) paired with Rich Gold (#D4AF37) accents and soft border glows',
      'emerald': 'Sleek Corporate Emerald Green (#065F46) styled with crisp white panels and emerald-600 buttons',
      'oceanic': 'Cosmic Blue (#0D1B2A) paired with electric cobalt highlights, yielding a sleek futuristic SaaS layout',
      'classic': 'Minimal Editorial theme with soft warm grays, deep black headings, clean typography, and generous margins'
    };

    const includedModules = [];
    if (cmsModules.installer) includedModules.push('Module 1 - AUTOMATIC SECTIONS INSTALLER: A step-by-step set-up script checking server requirements, testing database connections, constructing administrative users, and saving config.php parameters.');
    if (cmsModules.schema) includedModules.push('Module 2 - RELATIONAL DATABASE SCHEMA: Complete SQL declarations for normalized structures spanning site configuration settings, static pages, menus layout, google adsense tags, and visitor logs.');
    if (cmsModules.adminPanel) includedModules.push('Module 3 - CONTROL PANEL WORKSPACE: A powerful unified sidebar panel housing 13 management screens to customize pages, manage menus layouts, inject widgets, configure AdSense banners, and inspect traffic analytics charts.');
    if (cmsModules.adsense) includedModules.push('Module 4 - ADSENSE & GOOGLE AD MANAGER PLUGIN: Seamless custom plugins allowing administrative injection of Google AdSense script tags, customized placements inside responsive container grids, and layout rules.');
    if (cmsModules.analytics) includedModules.push('Module 5 - LIVE SITE STATISTICS AND ANALYSIS: Embedded lightweight analytical tracks counting daily hits, referrers, unique browser signatures, and drawing charts representing web performance.');
    if (cmsModules.staticPages) includedModules.push('Module 6 - FRONTEND VIEW & LAYOUT ROUTER: Simple public routing dispatcher loading files, mapping custom menu headers, injecting custom templates, and outputting SEO-optimized responsive pages.');
    if (cmsModules.seqLayer) includedModules.push('Module 7 - INTEGRATED WEB SECURITY SHIELD: Implements session validation, safe security headers, anti XSS sanitization classes, CSRF token managers, and robust cryptographical hash protections.');

    return `★ THE PROMPT ★

Act as a master web engineer, database architect, and elite AI prompt engineer. Create a comprehensive, industrial-grade blueprint code plan to build a lightweight, database-backed Content Management System (CMS) with an Admin Dashboard:

1. DYNAMIC CMS PROJECT NAME: [ ${cmsProjectName || 'ZenithCMS'} ]
2. BACKBONE STORAGE INFRASTRUCTURE: [ ${dbNames[dbEngine] || dbEngine} ]
3. FRONTEND STYLING THEME: [ ${styleNames[stylingStyle] || stylingStyle} ]

Decompose this specification and map complete, fully secure file outlines covering the following structural modules:

${includedModules.map((m, idx) => `${idx + 1}. ${m}`).join('\n')}

UNIFIED SYSTEM DIRECTIVES:
- Return fully-elaborated source code modules without omitting logic or relying on simple stubs.
- Adhere to safe prepared parameters, input validation, and proper session tracking.
- Output clean styling parameters, dynamic installers, and fully functional router blocks.

Generate the detailed CMS system construction guide now.`;
  };

  const handleGeneratePromptLocal = () => {
    setError(null);
    if (toolId === 'ai-clone-architect') {
      setResult(getClonePromptText());
    } else if (toolId === 'ai-cms-architect') {
      setResult(getCmsPromptText());
    }
  };

  const handleGenerateViaAI = async () => {
    setLoading(true);
    setError(null);
    setResult('');

    let prompt = '';
    let systemInstruction = '';

    if (toolId === 'ai-assistant') {
      if (!text.trim()) {
        setError('Please enter some text to refine.');
        setLoading(false);
        return;
      }
      try {
        const response = await fetch('/api/ai/writing-assistant', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ text, action, tone }),
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.error || 'Server error');
        setResult(data.result || '');
      } catch (err: any) {
        console.error(err);
        setError(err.message || 'Unable to contact server. Confirm your GEMINI_API_KEY.');
      } finally {
        setLoading(false);
      }
      return;
    }

    if (toolId === 'ai-clone-architect') {
      prompt = `${getClonePromptText()}\n\nPlease execute Phase 1 through Phase 5 immediately for the target URL: ${targetUrl}. Do not return the prompt itself, perform the actual AI analysis of this URL as a simulated website cloning expert and output the complete audit blueprint directly.`;
      systemInstruction = "You are an expert Website Systems Decomposing Analyst representing NexusUtils. Formulate extreme technical detail of colors, margins, breakpoints, file structures, and responsive shells for cloning the requested site. Speak directly and professionally without conversational chit-chat.";
    } else if (toolId === 'ai-cms-architect') {
      prompt = `${getCmsPromptText()}\n\nPlease execute Module 1 through Module 7 immediately. Return the complete, fully cohesive architecture guide containing actual tables schemas, HTML code shells, template outlines, and security rules for the project: ${cmsProjectName}. Do not return the prompt itself, build the unified architectural guide direct output.";`;
      systemInstruction = "You are a Senior Systems Architect specializing in secure, self-contained PHP applications and relational databases layout. Structure beautifully complete modular files and database schemas with extreme technical depth.";
    }

    try {
      const response = await fetch('/api/ai/writing-assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'custom',
          customPrompt: prompt,
          systemInstruction: systemInstruction,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Server returned an error');
      }

      setResult(data.result || '');
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Unable to process your AI design request. Ensure GEMINI_API_KEY is configured in Settings > Secrets.');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    if (!result) return;
    navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadTxt = () => {
    if (!result) return;
    const blob = new Blob([result], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `nexusutils_${toolId}_output.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      <div className="p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-5">
        
        {/* --- 1. TOOL HEADERS --- */}
        {toolId === 'ai-assistant' && (
          <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-indigo-500 animate-pulse" />
            Intellectual AI Copywriting Assistant
          </h3>
        )}

        {toolId === 'ai-clone-architect' && (
          <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
            <Globe className="h-5 w-5 text-blue-500 shrink-0" />
            AI Website Clone Planner & Prompter
          </h3>
        )}

        {toolId === 'ai-cms-architect' && (
          <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
            <Sliders className="h-5 w-5 text-emerald-500 shrink-0" />
            AI CMS Control Panel Architect
          </h3>
        )}

        {/* --- 2. DOUBLE COLUMN GRID WORKSPACE --- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* LEFT CHROME CONTROLS PANEL */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* Tool 1: AI Assistant Controls */}
            {toolId === 'ai-assistant' && (
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest block">Input Copy</span>
                  <textarea
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Paste your content or rough bullet points here to refine..."
                    className="w-full h-56 p-3 border border-slate-200 dark:border-slate-800 rounded-lg outline-none focus:border-indigo-500 bg-white dark:bg-slate-950/20 text-slate-850 dark:text-slate-150 font-sans text-sm resize-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">Core Action</span>
                    <select
                      value={action}
                      onChange={(e) => setAction(e.target.value as any)}
                      className="w-full p-2.5 bg-slate-50 dark:bg-slate-950/30 border border-slate-200 dark:border-slate-800 rounded outline-none text-xs font-semibold text-slate-800 dark:text-slate-200 cursor-pointer"
                    >
                      <option value="improve">Enhance Clarity & Fix Style</option>
                      <option value="rewrite">Rewrite from scratch</option>
                      <option value="summarize">Summarize to takeaways</option>
                      <option value="expand">Expand with technical details</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">Adjust Tone</span>
                    <select
                      value={tone}
                      onChange={(e) => setTone(e.target.value)}
                      className="w-full p-2.5 bg-slate-50 dark:bg-slate-950/30 border border-slate-200 dark:border-slate-800 rounded outline-none text-xs font-semibold text-slate-800 dark:text-slate-200 cursor-pointer"
                    >
                      <option value="Professional">💼 Professional & Concise</option>
                      <option value="Casual">☕ Casual & Friendly</option>
                      <option value="Academic">🎓 Academic & Deep</option>
                      <option value="Exciting">🚀 Exciting & Persuasive</option>
                      <option value="Empathetic">🌸 Compassionate & Warm</option>
                    </select>
                  </div>
                </div>

                <button
                  onClick={handleGenerateViaAI}
                  disabled={loading || !text.trim()}
                  className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-300 text-white font-bold text-xs rounded-lg shadow-sm transition flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  {loading ? (
                    <>
                      <RefreshCw className="h-4 w-4 animate-spin" />
                      Generating via Gemini...
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-4 w-4" />
                      Refine Copy with AI
                    </>
                  )}
                </button>
              </div>
            )}

            {/* Tool 2: Clone Planner Controls */}
            {toolId === 'ai-clone-architect' && (
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest block">Target URL</span>
                  <input
                    type="url"
                    value={targetUrl}
                    onChange={(e) => setTargetUrl(e.target.value)}
                    placeholder="https://example.com"
                    className="w-full p-3 border border-slate-200 dark:border-slate-800 rounded-lg outline-none focus:border-indigo-500 bg-white dark:bg-slate-1000/20 text-slate-850 dark:text-slate-150 font-mono text-xs"
                  />
                </div>

                <div className="space-y-1.5">
                  <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest block">Output Stack</span>
                  <select
                    value={activeStack}
                    onChange={(e) => setActiveStack(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 dark:bg-slate-950/30 border border-slate-200 dark:border-slate-800 rounded outline-none text-xs font-semibold text-slate-800 dark:text-slate-200 cursor-pointer"
                  >
                    <option value="react-vite-tailwind">React 18 + Vite + Tailwind CSS</option>
                    <option value="nextjs-approuter">Next.js (App Router & Server Actions)</option>
                    <option value="tailwind-html-js">Pure HTML5 + Vanilla JS + Tailwind</option>
                    <option value="php-bootstrap">OOP PHP 8+ + Bootstrap 5.3 CDN</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest block">Target Complexity</span>
                  <select
                    value={complexity}
                    onChange={(e) => setComplexity(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 dark:bg-slate-950/30 border border-slate-200 dark:border-slate-800 rounded outline-none text-xs font-semibold text-slate-800 dark:text-slate-200 cursor-pointer"
                  >
                    <option value="landing-page">Single-Page Premium Landing Card</option>
                    <option value="multipage-corporate">Multipage Business Profile Hub</option>
                    <option value="saas-dashboard">Premium Dashboards & Analytics charts</option>
                    <option value="ecommerce-cart">E-commerce storefront & persist cart</option>
                  </select>
                </div>

                {/* Blueprint Phases Selection */}
                <div className="space-y-2.5 bg-slate-50 dark:bg-slate-950/20 p-3.5 border border-slate-150 dark:border-slate-850 rounded-xl">
                  <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest block">Blueprint Phases</span>
                  <div className="space-y-2">
                    {Object.entries(cloneModules).map(([key, val]) => (
                      <label key={key} className="flex items-center gap-2 cursor-pointer text-xs font-medium text-slate-700 dark:text-slate-300">
                        <input
                          type="checkbox"
                          checked={val}
                          onChange={(e) => setCloneModules({ ...cloneModules, [key]: e.target.checked })}
                          className="rounded border-slate-300 dark:border-slate-750 text-indigo-650 focus:ring-indigo-550 h-3.5 w-3.5"
                        />
                        <span className="capitalize">{key === 'designSystem' ? 'Design Tokens Audit' : key.replace(/([A-Z])/g, ' $1')}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={handleGeneratePromptLocal}
                    className="py-2.5 px-3 bg-white hover:bg-slate-50 border border-slate-200 dark:bg-slate-950/20 dark:border-slate-800 dark:hover:bg-slate-900 text-slate-750 dark:text-slate-250 font-bold text-xs rounded-lg shadow-sm transition flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Code className="h-3.5 w-3.5 text-blue-500" />
                    Build Prompt
                  </button>
                  <button
                    onClick={handleGenerateViaAI}
                    disabled={loading}
                    className="py-2.5 px-3 bg-indigo-650 hover:bg-indigo-500 text-white font-bold text-xs rounded-lg shadow-sm transition flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
                  >
                    {loading ? <RefreshCw className="h-3.5 w-3.5 animate-spin" /> : <Sparkles className="h-100 h-3.5 w-3.5" />}
                    Consult AI
                  </button>
                </div>
              </div>
            )}

            {/* Tool 3: CMS Architect Controls */}
            {toolId === 'ai-cms-architect' && (
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest block">CMS Project Name</span>
                  <input
                    type="text"
                    value={cmsProjectName}
                    onChange={(e) => setCmsProjectName(e.target.value)}
                    placeholder="ZenithCMS"
                    className="w-full p-3 border border-slate-200 dark:border-slate-800 rounded-lg outline-none focus:border-indigo-500 bg-white dark:bg-slate-1000/20 text-slate-850 dark:text-slate-150 text-xs font-semibold"
                  />
                </div>

                <div className="space-y-1.5">
                  <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest block">Database Engine</span>
                  <select
                    value={dbEngine}
                    onChange={(e) => setDbEngine(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 dark:bg-slate-950/30 border border-slate-200 dark:border-slate-800 rounded outline-none text-xs font-semibold text-slate-800 dark:text-slate-200 cursor-pointer"
                  >
                    <option value="mysql">MySQL with PDO (Structured & OOP)</option>
                    <option value="sqlite">SQLite3 Single-File (Embedded)</option>
                    <option value="postgresql">PostgreSQL Enterprise Relations</option>
                    <option value="firestore">Google Firestore NoSQL Database</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest block">Design Theme</span>
                  <select
                    value={stylingStyle}
                    onChange={(e) => setStylingStyle(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 dark:bg-slate-950/30 border border-slate-200 dark:border-slate-800 rounded outline-none text-xs font-semibold text-slate-800 dark:text-slate-200 cursor-pointer"
                  >
                    <option value="twilight">Deep Twilight Slate + Gold Accent</option>
                    <option value="emerald">Sleek corporate Emerald + Off-white</option>
                    <option value="oceanic">Cosmic Oceanic Blue + Cobalt Glow</option>
                    <option value="classic">Warm Minimal Editorial (Light Theme)</option>
                  </select>
                </div>

                {/* CMS Modules Selection */}
                <div className="space-y-2.5 bg-slate-50 dark:bg-slate-950/20 p-3.5 border border-slate-150 dark:border-slate-850 rounded-xl">
                  <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest block">CMS Features to Build</span>
                  <div className="space-y-1.5">
                    {Object.entries(cmsModules).map(([key, val]) => (
                      <label key={key} className="flex items-center gap-2 cursor-pointer text-xs font-medium text-slate-700 dark:text-slate-300">
                        <input
                          type="checkbox"
                          checked={val}
                          onChange={(e) => setCmsModules({ ...cmsModules, [key]: e.target.checked })}
                          className="rounded border-slate-300 dark:border-slate-750 text-indigo-650 focus:ring-indigo-550 h-3.5 w-3.5"
                        />
                        <span className="capitalize">{
                          key === 'staticPages' ? 'Content & Page editors' :
                          key === 'seqLayer' ? 'Unified Security shield' :
                          key.replace(/([A-Z])/g, ' $1')
                        }</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={handleGeneratePromptLocal}
                    className="py-2.5 px-3 bg-white hover:bg-slate-50 border border-slate-200 dark:bg-slate-950/20 dark:border-slate-800 dark:hover:bg-slate-900 text-slate-750 dark:text-slate-250 font-bold text-xs rounded-lg shadow-sm transition flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Code className="h-3.5 w-3.5 text-emerald-500" />
                    Build Prompt
                  </button>
                  <button
                    onClick={handleGenerateViaAI}
                    disabled={loading}
                    className="py-2.5 px-3 bg-indigo-650 hover:bg-indigo-500 text-white font-bold text-xs rounded-lg shadow-sm transition flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
                  >
                    {loading ? <RefreshCw className="h-3.5 w-3.5 animate-spin" /> : <Sparkles className="h-3.5 w-3.5" />}
                    Consult AI
                  </button>
                </div>
              </div>
            )}

          </div>

          {/* RIGHT PREVIEW & DEMAND PANEL */}
          <div className="lg:col-span-7 space-y-2.5 relative flex flex-col justify-between">
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest block">Output Results Console</span>
            
            <div className="h-[432px] w-full bg-slate-50/50 dark:bg-slate-950/20 border border-slate-150 dark:border-slate-850 rounded-xl p-4 text-xs overflow-y-auto leading-relaxed relative flex-1">
              {loading && (
                <div className="absolute inset-0 bg-slate-50/75 dark:bg-slate-950/80 flex flex-col items-center justify-center text-center gap-3 text-indigo-600 dark:text-indigo-400 font-semibold z-10">
                  <RefreshCw className="h-7 w-7 animate-spin text-indigo-550" />
                  <span className="animate-pulse tracking-wide font-mono text-[11px]">Deploying engineering nodes via Gemini-3.5-Flash...</span>
                </div>
              )}

              {result ? (
                <pre className="text-slate-755 dark:text-slate-250 select-text whitespace-pre-wrap font-mono text-xs text-left leading-relaxed">{result}</pre>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-[11px] text-slate-400 dark:text-slate-600 text-center gap-3 font-medium">
                  {toolId === 'ai-assistant' ? (
                    <>
                      <Sparkles className="h-10 w-10 text-slate-300 dark:text-slate-800 animate-pulse" />
                      Generated rewrite context will manifest here
                    </>
                  ) : (
                    <>
                      <Code className="h-10 w-10 text-slate-300 dark:text-slate-800 animate-pulse" />
                      Configure preferences and tap "Build Prompt" or "Consult AI"
                    </>
                  )}
                </div>
              )}
            </div>

            {result && !loading && (
              <div className="flex gap-2 justify-end pt-3">
                <button
                  onClick={copyToClipboard}
                  className="px-3.5 py-1.5 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-250 dark:border-slate-705 text-xs font-bold text-slate-700 dark:text-slate-200 rounded-lg shadow-2xs flex items-center gap-1.5 cursor-pointer"
                >
                  {copied ? (
                    <>
                      <CheckCircle className="h-3.5 w-3.5 text-green-500" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Clipboard className="h-3.5 w-3.5 text-indigo-505" />
                      Copy Content
                    </>
                  )}
                </button>
                <button
                  onClick={downloadTxt}
                  className="px-3.5 py-1.5 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-250 dark:border-slate-705 text-xs font-bold text-slate-700 dark:text-slate-200 rounded-lg shadow-2xs flex items-center gap-1.5 cursor-pointer"
                >
                  <Download className="h-3.5 w-3.5 text-slate-500" />
                  Save Plaintext
                </button>
              </div>
            )}

          </div>

        </div>

        {/* --- 3. ERROR LOG ANCHOR --- */}
        {error && (
          <div className="p-3.5 bg-red-50 dark:bg-red-955/10 text-red-750 dark:text-red-400 border border-red-200 dark:border-red-900/35 rounded-xl flex items-center gap-2 text-xs">
            <AlertTriangle className="h-4.5 w-4.5 text-red-500 shrink-0" />
            <span className="font-semibold">{error}</span>
          </div>
        )}

      </div>
    </div>
  );
}
