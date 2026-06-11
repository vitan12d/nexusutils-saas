/* ==========================================================================
   PAGE: TOOL RUNNER (Active tool workspace core with Monetization Placements)
   ========================================================================== */
function ToolRunnerPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [shared, setShared] = useState(false);

  const tool = tools.find(t => t.slug === slug);

  if (!tool) {
    return <NotFoundPage />;
  }

  // Dynamic schema LD injection for indexing optimization
  useJsonLdSchema({
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": tool.name,
    "operatingSystem": "All",
    "applicationCategory": "DeveloperApplication",
    "description": tool.description,
    "offers": {
      "@type": "Offer",
      "price": "0.00",
      "priceCurrency": "USD"
    }
  });

  return (
    <div id="runner-root" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12 text-left">
      
      {/* 1. Header trace links */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-150 dark:border-slate-850 pb-5">
        <div className="space-y-1">
          <div className="flex items-center gap-1 text-[11px] font-mono text-slate-400">
            <Link to="/dashboard" className="hover:text-blue-600 hover:underline">Dashboard</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-slate-550 dark:text-slate-350 capitalize">{tool.category}</span>
          </div>
          <h1 className="font-display font-extrabold text-2xl text-slate-900 dark:text-white flex items-center gap-2">
            {tool.name}
          </h1>
          <p className="text-xs text-slate-500 leading-normal max-w-xl">{tool.longDescription}</p>

          {/* SECURE DYNAMIC SOCIAL SHARING COMPONENT */}
          <div className="pt-2 flex flex-wrap items-center gap-2 text-xs">
            <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest font-mono">Recommend workbench:</span>
            <div className="flex flex-wrap items-center gap-1.5">
              <a
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(`Boost performance and format code securely with premium ${tool.name} fully client-side on NexusUtils!`)}&url=${encodeURIComponent(`https://nexusutils.online/tools/${tool.slug}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1 px-2 border border-slate-200 dark:border-slate-850 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-905 text-[10px] flex items-center gap-1 text-slate-600 dark:text-slate-400 font-semibold"
              >
                <Twitter className="h-3 w-3 text-blue-400" /> Share on X
              </a>
              <button
                onClick={async () => {
                  try {
                    await navigator.clipboard.writeText(`https://nexusutils.online/tools/${tool.slug}`);
                    setShared(true);
                    setTimeout(() => setShared(false), 2000);
                  } catch (e) {
                    console.warn(e);
                  }
                }}
                className="p-1 px-2 border border-slate-200 dark:border-slate-850 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-905 text-[10px] flex items-center gap-1 text-slate-600 dark:text-slate-400 font-semibold cursor-pointer"
              >
                {shared ? "Copied Done!" : "Copy Link"}
              </button>
            </div>
          </div>
        </div>

        <button 
          onClick={() => navigate('/dashboard')}
          className="button-secondary shrink-0 text-xs py-2 px-3.5 flex items-center gap-1.5"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Workspace
        </button>
      </div>

      {/* 2. CORE WORKSPACE UTILITY BLOCK */}
      <section className="bg-white dark:bg-slate-900 border border-slate-250/80 dark:border-slate-800 p-5 md:p-8 rounded-2xl shadow-sm">
        {tool.id === 'json-formatter' && <JSONFormatter />}
        {tool.id === 'qr-generator' && <QRCodeGenerator />}
        {tool.id === 'password-generator' && <PasswordMeter />}
        {tool.id === 'markdown-editor' && <MarkdownPreviewer />}
        {tool.id === 'text-analyzer' && <HashConverter />}
        {tool.id === 'seo-helper' && <SEOTagGenerator />}
        {tool.id === 'utm-builder' && <UTMBuilder />}
        {tool.id === 'word-counter' && <WordCounter />}
        {tool.id === 'ua-parser' && <UAParser />}
        {tool.id === 'pdf-hub' && <PDFHub />}
      </section>

      {/* NEW INTEGRATION: Native Smartlink Promotion Slot */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-6 text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-md">
        <div className="space-y-1 text-center sm:text-left">
          <span className="text-[10px] font-mono font-bold uppercase tracking-widest bg-white/20 px-2 py-0.5 rounded-full">Partner Offer</span>
          <h4 className="font-display font-bold text-sm sm:text-base">Looking for Elite Cloud Infrastructures?</h4>
          <p className="text-xs text-blue-100 max-w-xl">Accelerate production pipelines with optimized computing architectures. Scale deployment instances across global delivery frameworks instantly.</p>
        </div>
        <a 
          href="https://www.effectivecpmnetwork.com/hcak2ak7?key=61ce18b1365bd02ec50882ca14064338" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="bg-white text-indigo-700 hover:bg-slate-50 font-bold px-5 py-2.5 rounded-xl text-xs uppercase tracking-wide transition-all font-mono whitespace-nowrap shadow-sm shrink-0"
        >
          Explore Global Nodes →
        </a>
      </section>

      {/* 2.5. HIGH-DENSITY PUBLISHER REFERENCE GUIDE FOR GOOGLE ADSENSE COMPLIANCE */}
      <ToolGuideSection toolId={tool.id} toolName={tool.name} />

      {/* 3. RELATED SCIENTIFIC FAQS Segment */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 space-y-3">
          <HelpCircle className="h-8 w-8 text-blue-500" />
          <h3 className="font-display font-bold text-lg text-slate-900 dark:text-slate-50">Scientific Tool Documentation</h3>
          <p className="text-[11px] leading-relaxed text-slate-455">
            Designed and compiled utilizing low-overhead compilation engines, guaranteeing that your values remain safe from network tracking tags. Explore answers to mechanical questions nearby.
          </p>
        </div>

        <div className="lg:col-span-2 space-y-4">
          <div className="bg-slate-50 dark:bg-slate-900 rounded-xl p-5 border border-slate-150 dark:border-slate-800">
            <span className="font-semibold text-xs block text-slate-850 dark:text-slate-100">Does {tool.name} transfer data blocks to servers?</span>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
              No. Our workspace runs 100% on client JS. No data inputs reach external routes, except when leveraging optional AI content modules proxied safely under SSL layers.
            </p>
          </div>
        </div>
      </section>

    </div>
  );
}
