import { Link } from 'react-router-dom';
import { tools, blogArticles, resources } from '../data';
import { Network, ArrowRightSquare, FileText, LayoutGrid, HelpCircle, Shield, ArrowUpRight } from 'lucide-react';

export default function HTMLSitemap() {
  // Aggregate static core routes
  const corePages = [
    { name: 'NexusUtils Home Portal', path: '/', desc: 'Primary application hub and interactive toolbox index.' },
    { name: 'Developer Dynamic Dashboard', path: '/dashboard', desc: 'Centralized diagnostic workspace and favorite utilities board.' },
    { name: 'SEO Growth Blueprint Hub', path: '/growth', desc: 'Detailed whitepapers and search optimization growth guides.' },
    { name: 'AdSense & Publisher Revenue Masterclass', path: '/revenue', desc: 'Display network integration advice and Core Web Vitals optimization.' },
    { name: 'Behind NexusUtils (Our Story)', path: '/about', desc: 'About our mission, team credentials, and operational standards.' },
    { name: 'Privacy Protocols & Cookie Policy', path: '/privacy', desc: 'DoubleClick DART cookies transparency declarations and privacy preservation.' },
    { name: 'Terms of Service & License', path: '/terms', desc: 'Calculations warranties disclaimers and usage terms agreements.' },
    { name: 'Developer Contact Support', path: '/contact', desc: 'Submit suggestions, error logs, and sponsorship coordination forms.' },
    { name: 'Comprehensive FAQ Guide', path: '/faq', desc: 'Got questions? Direct answers on caching, client cryptography, and search indexing.' }
  ];

  return (
    <div id="html-sitemap-root" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-left space-y-10 select-text leading-relaxed">
      
      {/* Header element */}
      <div className="border-b border-slate-200 dark:border-slate-800 pb-6 space-y-2">
        <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400">
          <Network className="h-6 w-6" />
          <span className="font-mono text-xs font-bold uppercase tracking-wider">Dynamic XML/HTML Search Map</span>
        </div>
        <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-slate-900 dark:text-white">HTML Site Index Directory</h1>
        <p className="text-xs text-slate-505 max-w-3xl">
          To comply with stringent search indexing standards and optimize crawling depth, we maintain an explicit, flat-layout HTML sitemap listing all programmatic tools, educational whitepapers, and legal policy segments.
        </p>
      </div>

      {/* Grid wrapper */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        
        {/* Core Administrative & Legal Segment */}
        <div className="space-y-4">
          <h2 className="font-display font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2 border-b border-slate-100 dark:border-slate-900 pb-2">
            <Shield className="h-4 w-4 text-emerald-500" /> Compliance & Core Pages <span className="text-[10px] bg-emerald-55 font-normal text-emerald-600 px-1.5 py-0.5 rounded ml-auto">{corePages.length} Pages</span>
          </h2>
          <div className="space-y-3">
            {corePages.map((page, idx) => (
              <div key={idx} className="group p-3 bg-slate-50/60 dark:bg-slate-900/30 rounded-lg border border-slate-200/50 dark:border-slate-850 hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors">
                <Link to={page.path} className="font-semibold text-xs text-slate-800 dark:text-slate-200 hover:text-indigo-600 dark:hover:text-indigo-400 flex items-center gap-1">
                  {page.name} <ArrowUpRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
                <p className="text-[10px] text-slate-400 mt-1">{page.desc}</p>
                <span className="text-[9px] font-mono text-slate-400/80 block mt-1 pt-1 border-t border-dashed border-slate-200/30">Route: <code className="text-indigo-505">{page.path}</code></span>
              </div>
            ))}
          </div>
        </div>

        {/* Dynamic Client Utility Tools */}
        <div className="space-y-4">
          <h2 className="font-display font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2 border-b border-slate-100 dark:border-slate-900 pb-2">
            <LayoutGrid className="h-4 w-4 text-blue-500" /> Structural Web Utilities <span className="text-[10px] bg-blue-55 font-normal text-blue-600 px-1.5 py-0.5 rounded ml-auto">{tools.length} Tools</span>
          </h2>
          <div className="space-y-3">
            {tools.map((tool) => (
              <div key={tool.id} className="group p-3 bg-slate-50/60 dark:bg-slate-900/30 rounded-lg border border-slate-200/50 dark:border-slate-850 hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors">
                <Link to={`/tools/${tool.id}`} className="font-semibold text-xs text-slate-800 dark:text-slate-200 hover:text-indigo-600 dark:hover:text-indigo-400 flex items-center gap-1">
                  {tool.name} <ArrowUpRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
                <p className="text-[10px] text-slate-400 mt-1 line-clamp-2">{tool.description}</p>
                <span className="text-[9px] font-mono text-slate-400/80 block mt-1 pt-1 border-t border-dashed border-slate-200/30">Target: <code className="text-blue-505">/tools/{tool.id}</code></span>
              </div>
            ))}
          </div>
        </div>

        {/* Informative Blog Articles & Resources */}
        <div className="space-y-6 col-span-1">
          
          {/* Blog posts list */}
          <div className="space-y-4">
            <h2 className="font-display font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2 border-b border-slate-100 dark:border-slate-900 pb-2">
              <FileText className="h-4 w-4 text-indigo-500" /> High-Value Blog Articles <span className="text-[10px] bg-indigo-55 font-normal text-indigo-600 px-1.5 py-0.5 rounded ml-auto">{blogArticles.length} Posts</span>
            </h2>
            <div className="space-y-3">
              {blogArticles.map((article) => (
                <div key={article.slug} className="group p-3 bg-slate-50/60 dark:bg-slate-900/30 rounded-lg border border-slate-200/50 dark:border-slate-850 hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors">
                  <Link to={`/blog/${article.slug}`} className="font-semibold text-xs text-slate-800 dark:text-slate-200 hover:text-indigo-600 dark:hover:text-indigo-400 flex items-center gap-1">
                    {article.title} <ArrowUpRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                  <p className="text-[10px] text-slate-400 mt-1 line-clamp-2">{article.description}</p>
                  <span className="text-[9px] font-mono text-slate-400/80 block mt-1 pt-1 border-t border-dashed border-slate-200/30">Target: <code className="text-indigo-505">/blog/{article.slug}</code></span>
                </div>
              ))}
            </div>
          </div>

          {/* Resources checklist segments lists */}
          <div className="space-y-4 pt-2">
            <h2 className="font-display font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2 border-b border-slate-100 dark:border-slate-900 pb-2">
              <HelpCircle className="h-4 w-4 text-amber-500" /> Deep Manuals & Blueprints <span className="text-[10px] bg-amber-55 font-normal text-amber-600 px-1.5 py-0.5 rounded ml-auto">{resources.length} Guides</span>
            </h2>
            <div className="space-y-3">
              {resources.map((res) => {
                const targetPath = res.type === 'guide' ? `/guides/${res.slug}`
                    : res.type === 'checklist' ? `/checklists/${res.slug}`
                    : res.type === 'template' ? `/templates/${res.slug}`
                    : res.type === 'example' ? `/examples/${res.slug}`
                    : `/compare/${res.slug}`;
                return (
                  <div key={res.slug} className="group p-3 bg-slate-50/60 dark:bg-slate-900/30 rounded-lg border border-slate-200/50 dark:border-slate-850 hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors">
                    <Link to={targetPath} className="font-semibold text-xs text-slate-800 dark:text-slate-200 hover:text-indigo-600 dark:hover:text-indigo-400 flex items-center gap-1">
                      {res.title} <ArrowUpRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Link>
                    <p className="text-[10px] text-slate-400 mt-1 line-clamp-2">{res.description}</p>
                    <span className="text-[9px] font-mono text-slate-400/80 block mt-1 pt-1 border-t border-dashed border-slate-200/30">Target: <code className="text-amber-505">{targetPath}</code></span>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

      </div>

      {/* SEO guidelines footer within sitemap */}
      <div id="index-criteria-block" className="border-t border-slate-200 dark:border-slate-800 pt-8 mt-6">
        <h3 className="font-display font-bold text-xs text-slate-800 dark:text-slate-200 uppercase tracking-widest block mb-1">Index Crawling Criteria Compliance</h3>
        <p className="text-[11px] text-slate-500">
          This platform conforms to standard index compliance policies. Dynamically loaded components deploy dedicated micro-layouts with robust typography pairings. Client side states use isolated browser databases without external telemetry or background tracker listeners.
        </p>
      </div>

    </div>
  );
}
