import { Link } from 'react-router-dom';
import { 
  Terminal, ShieldCheck, Mail, Globe, 
  Github, Twitter, Layers, Heart, Sparkles 
} from 'lucide-react';

export default function Footer() {
  return (
    <footer id="site-footer" className="bg-slate-50 dark:bg-slate-950 border-t border-slate-200/80 dark:border-slate-900 transition-colors duration-200">
      
      {/* Upper informational bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 xl:gap-12">
          
          {/* Brand Card column */}
          <div className="col-span-2 md:col-span-3 lg:col-span-2">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="h-8 w-8 bg-blue-600 dark:bg-blue-500 rounded-xl flex items-center justify-center text-white font-semibold">
                N
              </div>
              <span className="font-display font-bold text-slate-900 dark:text-slate-50 tracking-tight text-base sm:text-lg">
                Nexus<span className="text-blue-600 dark:text-blue-400">Utils</span>
              </span>
            </Link>
            <p className="mt-4 text-xs leading-relaxed text-slate-500 dark:text-slate-400 max-w-sm">
              One of the best premium-grade free developer toolboxes and programmatic marketing resource centers on the web. Zero limits, zero registrations, client-first encryption vectors.
            </p>
            
            <div className="mt-6 flex items-center gap-3">
              <div className="flex items-center gap-1.5 text-[11px] font-mono font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10 px-2.5 py-1 rounded-full">
                <div className="h-1.5 w-1.5 bg-emerald-500 rounded-full animate-pulse"></div>
                Privacy Shield Enabled
              </div>
              <div className="text-[11px] font-mono text-slate-400 dark:text-slate-500">
                Lighthouse 100% SEO Ready
              </div>
            </div>
          </div>

          {/* Tools Grid Column */}
          <div className="col-span-1">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
              Toolbox Elements
            </span>
            <ul className="mt-4 space-y-2.5">
              <li>
                <Link to="/tools/json-formatter" className="text-xs text-slate-550 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  JSON Formatter & Validator
                </Link>
              </li>
              <li>
                <Link to="/tools/seo-helper" className="text-xs text-slate-550 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  AI Meta Tag Generator
                </Link>
              </li>
              <li>
                <Link to="/tools/utm-builder" className="text-xs text-slate-550 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  UTM Campaign Link Builder
                </Link>
              </li>
              <li>
                <Link to="/tools/word-counter" className="text-xs text-slate-550 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Word Counter & Density
                </Link>
              </li>
              <li>
                <Link to="/tools/ua-parser" className="text-xs text-slate-550 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Device UA Parser Spec
                </Link>
              </li>
              <li>
                <Link to="/tools/pdf-hub" className="text-xs text-slate-550 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Smart PDF Box & Inspector
                </Link>
              </li>
              <li>
                <Link to="/tools/password-generator" className="text-xs text-slate-550 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Secure Password Generator
                </Link>
              </li>
              <li>
                <Link to="/tools/text-analyzer" className="text-xs text-slate-550 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Base64 & Hash Converter
                </Link>
              </li>
              <li>
                <Link to="/tools/qr-generator" className="text-xs text-slate-550 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  QR Code Generator
                </Link>
              </li>
              <li>
                <Link to="/tools/markdown-editor" className="text-xs text-slate-550 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Markdown Editor Live
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources Column */}
          <div>
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
              Knowledge Hub
            </span>
            <ul className="mt-4 space-y-2.5">
              <li>
                <Link to="/resources" className="text-xs text-slate-550 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Deep Guides & Checklists
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-xs text-slate-550 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Technical Insights Blog
                </Link>
              </li>
              <li>
                <Link to="/growth" className="text-xs text-slate-550 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  SEO Growth Blueprint
                </Link>
              </li>
              <li>
                <Link to="/revenue" className="text-xs text-slate-550 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Publisher Monetization
                </Link>
              </li>
            </ul>
          </div>

          {/* Organization & Legal Column */}
          <div>
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
              Compliance
            </span>
            <ul className="mt-4 space-y-2.5">
              <li>
                <Link to="/about" className="text-xs text-slate-550 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Behind NexusUtils
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-xs text-slate-550 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Privacy Protocols
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-xs text-slate-550 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/disclaimer" className="text-xs text-slate-550 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Compliance Disclaimer
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-xs text-slate-550 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Developer Contacts
                </Link>
              </li>
              <li>
                <Link to="/sitemap" className="text-xs text-slate-550 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  HTML Site Directory
                </Link>
              </li>
            </ul>
          </div>

        </div>

        {/* Lower row */}
        <div className="mt-16 pt-8 border-t border-slate-200/80 dark:border-slate-900/60 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-[11px] text-slate-500 dark:text-slate-400 font-mono text-center md:text-left">
            © {new Date().getFullYear()} NexusUtils Platform. Built serverless with React 19, TypeScript, and TailwindCSS 4.
          </div>
          
          <div className="flex items-center gap-6 text-slate-450">
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-slate-900 dark:hover:text-white transition-colors flex items-center" aria-label="Our Twitter feed">
              <Twitter className="h-4 w-4" />
              <span className="sr-only">Twitter Feed</span>
            </a>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-slate-900 dark:hover:text-white transition-colors flex items-center" aria-label="GitHub platform details">
              <Github className="h-4 w-4" />
              <span className="sr-only">GitHub Workspace Repo</span>
            </a>
            <a href="mailto:support@nexusutils.com" className="hover:text-slate-900 dark:hover:text-white transition-colors flex items-center" aria-label="Support Mailbox">
              <Mail className="h-4 w-4" />
              <span className="sr-only">Support Mailbox</span>
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}
