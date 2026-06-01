import React, { useState, useEffect, useMemo } from 'react';
import { BlogPost, compileDynamicArticle, ALL_50_POSTS_METADATA } from '../../data/blogData';
import { TOOLS } from '../../types';
import AdSpace from '../seo/AdSpace';
import { ArrowLeft, Calendar, Clock, User, Bookmark, Share2, CornerDownRight, Check, CheckCircle2, MessageSquare, ChevronDown, ChevronUp, Sparkles, Send, Star, ExternalLink, HelpCircle } from 'lucide-react';

interface ArticleTemplateProps {
  post: BlogPost;
  onGoBack: () => void;
  onNavigateSlug: (slug: string) => void;
  onNavigateCategory: (categoryName: string) => void;
  onLaunchTool?: (toolId: string) => void;
}

export default function ArticleTemplate({
  post,
  onGoBack,
  onNavigateSlug,
  onNavigateCategory,
  onLaunchTool
}: ArticleTemplateProps) {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeTab, setActiveTab] = useState<'read' | 'schema'>('read');
  const [commentName, setCommentName] = useState('');
  const [commentText, setCommentText] = useState('');
  const [comments, setComments] = useState<{ id: string; name: string; text: string; date: string }[]>(() => {
    // Basic preloaded comments to simulate healthy local user feedback
    return [
      { id: '1', name: 'DevOps_Dan', text: 'Stitching PDFs client-side of this app is unbelievably snappy! No uploading required is a massive bonus for security. Outstanding writeup.', date: '3 hours ago' },
      { id: '2', name: 'SEO_Wizard_99', text: 'The table on pixel boundaries and character limitations is very clear. Standard titles should always lead with the principal keyword.', date: '1 day ago' }
    ];
  });
  const [commentSuccess, setCommentSuccess] = useState(false);
  const [faqOpenState, setFaqOpenState] = useState<Record<number, boolean>>({ 0: true });

  // Update dynamic document titles and meta tags upon rendering
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const originalTitle = document.title;
      // Core SEO Update
      document.title = `${post.metaTitle} | NexusUtils`;
      
      // Update Meta Description
      let descriptionMeta = document.querySelector('meta[name="description"]');
      if (!descriptionMeta) {
        descriptionMeta = document.createElement('meta');
        descriptionMeta.setAttribute('name', 'description');
        document.head.appendChild(descriptionMeta);
      }
      descriptionMeta.setAttribute('content', post.metaDesc);

      // Add/Update canonical link
      let canonicalLink = document.querySelector('link[rel="canonical"]');
      if (!canonicalLink) {
        canonicalLink = document.createElement('link');
        canonicalLink.setAttribute('rel', 'canonical');
        document.head.appendChild(canonicalLink);
      }
      canonicalLink.setAttribute('href', `${window.location.origin}/blog/${post.slug}`);

      // Open Graph tag edits
      const ogTitle = document.querySelector('meta[property="og:title"]');
      if (ogTitle) ogTitle.setAttribute('content', post.metaTitle);
      const ogDesc = document.querySelector('meta[property="og:description"]');
      if (ogDesc) ogDesc.setAttribute('content', post.metaDesc);

      window.scrollTo(0, 0);

      return () => {
        document.title = originalTitle;
      };
    }
  }, [post]);

  // Compute scroll bar progress percentage
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = (window.scrollY / totalHeight) * 100;
        setScrollProgress(progress);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 1. Compile schema metadata payloads dynamically
  const schemas = useMemo(() => {
    const articleSchema = {
      "@context": "https://schema.org",
      "@type": "TechArticle",
      "headline": post.h1,
      "description": post.metaDesc,
      "inLanguage": "en",
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": typeof window !== 'undefined' ? `${window.location.origin}/blog/${post.slug}` : `https://nexusutils.com/blog/${post.slug}`
      },
      "datePublished": "2026-06-01T01:14:00Z",
      "dateModified": "2026-06-01T01:14:00Z",
      "author": {
        "@type": "Person",
        "name": post.author.name,
        "jobTitle": post.author.role
      },
      "publisher": {
        "@type": "Organization",
        "name": "NexusUtils Solutions",
        "logo": {
          "@type": "ImageObject",
          "url": "https://nexusutils.com/icon.png"
        }
      }
    };

    const breadcrumbSchema = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": typeof window !== 'undefined' ? window.location.origin : "https://nexusutils.com"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Blog",
          "item": typeof window !== 'undefined' ? `${window.location.origin}/blog` : "https://nexusutils.com/blog"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": post.category,
          "item": typeof window !== 'undefined' ? `${window.location.origin}/blog/category/${post.category.toLowerCase().replace(/\s+/g, '-')}` : `https://nexusutils.com/blog/category/${post.category.toLowerCase().replace(/\s+/g, '-')}`
        },
        {
          "@type": "ListItem",
          "position": 4,
          "name": post.title,
          "item": typeof window !== 'undefined' ? `${window.location.origin}/blog/${post.slug}` : `https://nexusutils.com/blog/${post.slug}`
        }
      ]
    };

    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": post.faqs.map(item => ({
        "@type": "Question",
        "name": item.q,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": item.a
        }
      }))
    };

    const organizationSchema = {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "NexusUtils Solutions",
      "url": "https://nexusutils.com",
      "logo": "https://nexusutils.com/icon.png",
      "contactPoint": {
        "@type": "ContactPoint",
        "email": "hasnichoura@gmail.com",
        "contactType": "customer support"
      }
    };

    return {
      article: JSON.stringify(articleSchema, null, 2),
      breadcrumb: JSON.stringify(breadcrumbSchema, null, 2),
      faq: JSON.stringify(faqSchema, null, 2),
      org: JSON.stringify(organizationSchema, null, 2)
    };
  }, [post]);

  // Inject script tags on client
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Remove any existing dynamic schemas to prevent duplication
      const existing = document.querySelectorAll('.dynamic-jsonld-schema');
      existing.forEach(el => el.remove());

      // Inject new scripts
      const appendSchema = (content: string, typeName: string) => {
        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.className = 'dynamic-jsonld-schema';
        script.setAttribute('data-schema-type', typeName);
        script.text = content;
        document.head.appendChild(script);
      };

      appendSchema(schemas.article, 'article');
      appendSchema(schemas.breadcrumb, 'breadcrumb');
      appendSchema(schemas.faq, 'faq');
      appendSchema(schemas.org, 'org');
    }
  }, [schemas]);

  // 2. Headings Extraction to render the Table Of Contents (TOC)
  const headings = useMemo(() => {
    const list: { id: string; text: string }[] = [];
    const lines = post.content.split('\n');
    lines.forEach((line) => {
      if (line.startsWith('### ')) {
        const text = line.replace('### ', '').trim();
        const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-');
        list.push({ id, text });
      }
    });
    return list;
  }, [post.content]);

  // 3. Simple elegant Markdown parsing layout
  const renderContentWithAds = useMemo(() => {
    const blocks = post.content.split('\n\n');
    const elements: React.ReactNode[] = [];

    blocks.forEach((block, index) => {
      const trimmed = block.trim();
      if (!trimmed) return;

      // Render Headings (H3)
      if (trimmed.startsWith('### ')) {
        const text = trimmed.replace('### ', '').trim();
        const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-');
        elements.push(
          <h3 key={`h3-${index}`} id={id} className="text-xl sm:text-2xl font-extrabold text-slate-850 dark:text-white pt-6 pb-2 border-b border-slate-100 dark:border-slate-800 flex items-center gap-2 group scroll-mt-20">
            <span className="text-indigo-500 font-mono text-sm">#</span>
            <span>{text}</span>
          </h3>
        );
        return;
      }

      // Render Subheadings (H4)
      if (trimmed.startsWith('#### ')) {
        const text = trimmed.replace('#### ', '').trim();
        elements.push(
          <h4 key={`h4-${index}`} className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100 pt-4 pb-1">
            {text}
          </h4>
        );
        return;
      }

      // Render Tables
      if (trimmed.startsWith('|')) {
        const lines = trimmed.split('\n');
        const rows = lines.map(line => line.split('|').map(cell => cell.trim()).filter((_, idx, arr) => idx > 0 && idx < arr.length - 1));
        const hasHeader = lines.length > 1 && lines[1].includes(':---');
        
        elements.push(
          <div key={`table-${index}`} className="my-6 overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800">
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <thead className="bg-slate-50 dark:bg-slate-950/60 font-bold text-slate-800 dark:text-slate-300">
                <tr>
                  {rows[0].map((cell, cIdx) => (
                    <th key={`thead-${cIdx}`} className="py-3.5 px-4 font-extrabold border-b border-slate-200 dark:border-slate-800">
                      {cell}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-semibold text-slate-600 dark:text-slate-400">
                {rows.slice(hasHeader ? 2 : 1).map((row, rIdx) => (
                  <tr key={`tr-${rIdx}`} className="hover:bg-slate-50/50 dark:hover:bg-slate-950/20">
                    {row.map((cell, cIdx) => (
                      <td key={`td-${cIdx}`} className="py-3 px-4">
                        {cell.replace(/`/g, '')}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
        return;
      }

      // Render Bullet point lists
      if (trimmed.startsWith('* ') || trimmed.startsWith('- ')) {
        const listItems = trimmed.split('\n').map(item => item.replace(/^[*-\s]+/, '').trim());
        elements.push(
          <ul key={`ul-${index}`} className="my-4 space-y-2.5 pl-4 list-decimal marker:text-indigo-500 font-semibold text-slate-600 dark:text-slate-400 text-xs sm:text-sm">
            {listItems.map((item, liIdx) => (
              <li key={`li-${liIdx}`} className="pl-1 leading-relaxed">
                {item}
              </li>
            ))}
          </ul>
        );
        return;
      }

      // Default to Paragraph block
      // Quick clean check for code tick tags `code`
      const cleanText = trimmed.replace(/`([^`]+)`/g, '<code class="px-1.5 py-0.5 bg-slate-100 dark:bg-slate-950 border border-slate-150 dark:border-slate-800 rounded font-mono text-[11px] text-indigo-500">$1</code>');
      
      elements.push(
        <p
          key={`p-${index}`}
          className="leading-relaxed text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-semibold my-4"
          dangerouslySetInnerHTML={{ __html: cleanText }}
        />
      );

      // --- AD SITES PROGRAMMATIC INSERT POINTS ---
      // 1. After Introduction: Place right after block index 1 (approx 1st paragraph or heading)
      if (index === 1) {
        elements.push(
          <div key="ad-after-intro" className="my-6">
            <span className="text-[8.5px] uppercase font-black text-slate-350 tracking-widest block text-center mb-1">Recommended advertisement</span>
            <AdSpace id="ad-after-introduction" format="rectangle" />
          </div>
        );
      }

      // 2. Middle Content: Place right in the middle
      if (index === Math.floor(blocks.length / 2)) {
        elements.push(
          <div key="ad-middle" className="my-6">
            <span className="text-[8.5px] uppercase font-black text-slate-350 tracking-widest block text-center mb-1">Sponsor content section</span>
            <AdSpace id="ad-middle-content" format="auto" />
          </div>
        );
      }
    });

    return elements;
  }, [post.content]);

  // Find related tools objects to render launcher buttons
  const matchedTools = useMemo(() => {
    return TOOLS.filter(t => post.relatedTools.includes(t.id));
  }, [post.relatedTools]);

  // Find related articles records
  const matchedArticles = useMemo(() => {
    return ALL_50_POSTS_METADATA.filter(p => post.relatedBlogs.includes(p.slug));
  }, [post.relatedBlogs]);

  const handlePostComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (commentName.trim() && commentText.trim()) {
      const newComment = {
        id: Date.now().toString(),
        name: commentName,
        text: commentText,
        date: 'Just now'
      };
      setComments([newComment, ...comments]);
      setCommentText('');
      setCommentName('');
      setCommentSuccess(true);
      setTimeout(() => setCommentSuccess(false), 5000);
    }
  };

  const jumpToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="relative animate-fade-in text-left">
      {/* Scroll indicator strip */}
      <div 
        className="fixed top-0 left-0 h-1 bg-gradient-to-r from-blue-600 via-indigo-500 to-indigo-600 z-50 transition-all duration-100 ease-out" 
        style={{ width: `${scrollProgress}%` }}
      />

      {/* Breadcrumb strip & Back Button controls */}
      <div className="max-w-4xl mx-auto mb-8 flex flex-wrap items-center justify-between gap-4 py-2 text-xs text-slate-450 font-bold select-none border-b border-slate-100 dark:border-slate-850">
        <div className="flex items-center gap-2">
          <button
            onClick={onGoBack}
            className="flex items-center gap-1 hover:text-blue-500 transition cursor-pointer"
          >
            ← Back To Blog
          </button>
          <span className="text-slate-300">/</span>
          <span className="text-slate-400 capitalize">{post.category}</span>
          <span className="text-slate-300">/</span>
          <span className="text-slate-600 dark:text-slate-300 truncate max-w-xs">{post.title}</span>
        </div>
        
        <div className="flex items-center gap-2">
          <button 
            onClick={() => {
              navigator.clipboard.writeText(window.location.href);
              alert('Copied article canonical link to clipboard!');
            }}
            className="p-1.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-755 rounded-lg text-slate-550 hover:text-blue-500 transition cursor-pointer"
            title="Share Article Link"
          >
            <Share2 className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {/* Main Core Formatted Body template */}
      <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Left column (Main Article space) */}
        <div className="lg:col-span-3 space-y-8">
          
          {/* A. Hero Unit */}
          <header className="space-y-4">
            <span className="inline-flex items-center gap-1 px-3 py-1 bg-indigo-500/10 text-indigo-600 dark:text-blue-400 font-extrabold text-[10px] tracking-wider uppercase rounded-md font-mono select-none">
              <Sparkles className="h-3.5 w-3.5 text-indigo-500" />
              {post.category}
            </span>
            <h1 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white leading-tight tracking-tight">
              {post.h1}
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-semibold leading-relaxed">
              {post.summary}
            </p>

            {/* Author card & Date Duration strip */}
            <div className="pt-4 border-t border-slate-100 dark:border-slate-850 flex items-center gap-4 select-none">
              <img
                src={post.author.avatar}
                alt={post.author.name}
                className="h-10 w-10 rounded-full object-cover border border-slate-205 dark:border-slate-805"
              />
              <div className="text-[11px] leading-tight">
                <p className="font-extrabold text-slate-900 dark:text-white text-xs">{post.author.name}</p>
                <p className="text-slate-400 font-medium">{post.author.role}</p>
              </div>
              <div className="ml-auto text-[10px] sm:text-[11px] text-slate-400 font-semibold flex items-center gap-3">
                <span className="flex items-center gap-1">
                  <Calendar className="h-3.5 w-3.5 text-slate-400" />
                  {post.date}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5 text-slate-400" />
                  {post.readTime}
                </span>
              </div>
            </div>
          </header>

          {/* Ad Slot #3: Placement after introduction blocks */}
          
          {/* B. Table of Contents Container (Mobile friendly dropdown representation) */}
          {headings.length > 0 && (
            <div className="p-5 bg-slate-50 dark:bg-slate-900/25 border border-slate-200 dark:border-slate-800 rounded-2xl select-none">
              <h3 className="text-xs font-black uppercase text-indigo-500 tracking-wider mb-2.5 flex items-center gap-2">
                <Bookmark className="h-4 w-4" />
                <span>Jump-Link Navigation Index</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-bold">
                {headings.map((h, hIdx) => (
                  <button
                    key={h.id}
                    onClick={() => jumpToSection(h.id)}
                    className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400 hover:text-blue-500 hover:underline transition text-left py-1"
                  >
                    <CornerDownRight className="h-3.5 w-3.5 shrink-0 text-indigo-550" />
                    <span className="truncate">{h.text}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* C. Dynamic Article Content with programmed AdSense modules inside */}
          <article className="prose prose-slate dark:prose-invert max-w-none">
            {renderContentWithAds}
          </article>

          {/* D. Key Takeaways Component (Visual card format) */}
          <section className="p-6 sm:p-8 bg-indigo-500/5 dark:bg-indigo-500/10 border border-indigo-500/20 rounded-3xl space-y-4">
            <h3 className="text-base sm:text-lg font-black text-indigo-600 dark:text-blue-400 flex items-center gap-2 select-none">
              <CheckCircle2 className="h-5 w-5 fill-indigo-500/15" />
              <span>Key Technical Takeaways</span>
            </h3>
            <div className="space-y-3">
              {post.takeaways.map((take, tIdx) => (
                <div key={tIdx} className="flex gap-3 text-xs sm:text-sm text-slate-600 dark:text-slate-350 font-semibold leading-relaxed">
                  <div className="h-5 w-5 rounded-full bg-blue-600/10 text-blue-600 shrink-0 flex items-center justify-center font-bold text-xs select-none">
                    <Check className="h-3 w-3" />
                  </div>
                  <p>{take}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Ad Slot #5: Before FAQ section */}
          <div>
            <span className="text-[8.5px] uppercase font-black text-slate-350 tracking-widest block text-center mb-1">Recommended ad feed</span>
            <AdSpace id="ad-before-faq" format="auto" />
          </div>

          {/* E. FAQ Accordion Section */}
          <section className="space-y-4 bg-white dark:bg-slate-900/20 p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800">
            <h3 className="text-base sm:text-lg font-black text-slate-850 dark:text-white flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-3 select-none">
              <HelpCircle className="h-5 w-5 text-indigo-500" />
              <span>Frequently Asked Questions (FAQ)</span>
            </h3>

            <div className="divide-y divide-slate-100 dark:divide-slate-800 space-y-2">
              {post.faqs.map((faq, fIdx) => {
                const isOpen = !!faqOpenState[fIdx];
                return (
                  <div key={fIdx} className="pt-3 block">
                    <button
                      onClick={() => setFaqOpenState(prev => ({ ...prev, [fIdx]: !prev[fIdx] }))}
                      className="w-full flex justify-between items-center text-xs sm:text-sm font-extrabold text-slate-800 dark:text-slate-200 py-1 cursor-pointer hover:text-blue-500 transition"
                    >
                      <span className="text-left">{faq.q}</span>
                      {isOpen ? <ChevronUp className="h-4 w-4 shrink-0 text-slate-400" /> : <ChevronDown className="h-4 w-4 shrink-0 text-slate-400" />}
                    </button>
                    
                    {isOpen && (
                      <p className="text-xs leading-relaxed text-slate-500 dark:text-slate-400 font-semibold mt-2 pl-2 border-l border-indigo-500/30">
                        {faq.a}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </section>

          {/* F. Action CTA Marketing Box */}
          <section className="p-8 bg-linear-to-r from-blue-600 to-indigo-700 text-white rounded-3xl shadow-md text-center space-y-4 relative overflow-hidden select-none">
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#ffffff_1.5px,transparent_1.5px)] [background-size:16px_16px]" />
            <span className="text-[9px] uppercase font-black tracking-widest text-blue-100 bg-white/10 px-3 py-1 rounded-sm inline-block">
              100% Free Development Solutions
            </span>
            <h3 className="text-lg sm:text-2xl font-black">Ready to utilize our high-performance toolkit?</h3>
            <p className="text-[11.5px] text-blue-100 font-semibold max-w-xl mx-auto leading-relaxed">
              Ditch slow subscription sites. Process documents, format complex JSON keys, Pick standard colors and optimize images locally inside your device. No cookies, no cloud storage leaks.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <button
                onClick={() => {
                  window.history.pushState(null, '', '/');
                  window.location.reload();
                }}
                className="py-2.5 px-6 bg-white text-blue-700 font-extrabold text-xs rounded-xl hover:bg-slate-50 transition cursor-pointer shadow-3xs"
              >
                Launch Utilities Workspace
              </button>
              <button
                onClick={() => {
                  alert('Thank you for bookmarking our SEO Center!');
                }}
                className="py-2.5 px-5 bg-white/10 text-white font-extrabold text-xs rounded-xl hover:bg-white/15 transition cursor-pointer"
              >
                Bookmark This Guide
              </button>
            </div>
          </section>

          {/* G. Comments Interactive Playground Placeholder */}
          <section className="space-y-6 bg-slate-50/50 dark:bg-slate-900/20 p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800">
            <h3 className="text-base font-extrabold text-slate-900 dark:text-white flex items-center gap-2 border-b border-slate-100 dark:border-slate-850 pb-3">
              <MessageSquare className="h-5 w-5 text-indigo-500" />
              <span>Reader Discussion ({comments.length})</span>
            </h3>

            {commentSuccess && (
              <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 rounded-xl text-xs font-bold">
                Comment added successfully to local volatile registry.
              </div>
            )}

            <form onSubmit={handlePostComment} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  required
                  placeholder="Your Name / Handle"
                  value={commentName}
                  onChange={(e) => setCommentName(e.target.value)}
                  className="bg-white dark:bg-slate-950 border border-slate-205 dark:border-slate-850 rounded-xl px-4 py-2.5 text-xs sm:text-sm font-semibold focus:outline-none focus:border-blue-500"
                />
              </div>
              <textarea
                required
                rows={3}
                placeholder="Share your feedback, ask a question, or discuss with other developers..."
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                className="w-full bg-white dark:bg-slate-950 border border-slate-205 dark:border-slate-850 rounded-xl px-4 py-2.5 text-xs sm:text-sm font-semibold focus:outline-none focus:border-blue-500"
              />
              <button
                type="submit"
                className="py-2.5 px-6 bg-indigo-600 hover:bg-indigo-550 text-white rounded-xl text-xs font-extrabold flex items-center gap-1 cursor-pointer transition shadow-3xs"
              >
                <span>Publish Comment</span>
                <Send className="h-3 w-3" />
              </button>
            </form>

            <div className="pt-4 divide-y divide-slate-100 dark:divide-slate-850 space-y-4">
              {comments.map((comment) => (
                <div key={comment.id} className="pt-3 block">
                  <div className="flex justify-between items-center text-[11px] font-bold select-none text-slate-400">
                    <span className="text-slate-800 dark:text-slate-300 flex items-center gap-1.5">
                      <User className="h-3.5 w-3.5" />
                      {comment.name}
                    </span>
                    <span>{comment.date}</span>
                  </div>
                  <p className="text-[11.5px] leading-relaxed text-slate-500 dark:text-slate-400 font-semibold mt-1.5 pl-3 border-l border-slate-250 dark:border-slate-800">
                    {comment.text}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Ad Slot #7: End of Article content */}
          <div>
            <span className="text-[8.5px] uppercase font-black text-slate-350 tracking-widest block text-center mb-1">Related advertisement feed</span>
            <AdSpace id="ad-end-of-article" format="auto" />
          </div>

        </div>

        {/* Right column (Sidebar widgets - Related tools and Metadata logs) */}
        <div className="lg:col-span-1 space-y-8 select-none">
          
          {/* Related Tools list widget */}
          {matchedTools.length > 0 && (
            <div className="p-6 bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-3xs space-y-4">
              <h3 className="text-xs font-black uppercase text-blue-500 tracking-wider pb-2 border-b border-slate-100 dark:border-slate-800 flex items-center gap-1.5">
                <Star className="h-4 w-4 fill-blue-500/20 text-blue-500" />
                <span>Companion Utilities</span>
              </h3>
              
              <div className="space-y-3.5">
                {matchedTools.map((t) => (
                  <div key={t.id} className="space-y-1 block pb-3 border-b border-dashed border-slate-100 dark:border-slate-850 last:border-0 last:pb-0">
                    <h4 className="text-xs font-extrabold text-slate-900 dark:text-white">{t.name}</h4>
                    <p className="text-[10.5px] text-slate-400 font-semibold leading-relaxed leading-snug">
                      {t.description}
                    </p>
                    <button
                      onClick={() => onLaunchTool ? onLaunchTool(t.id) : alert('Tool launcher bound!')}
                      className="py-1.5 px-3 bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-[10.5px] rounded-lg mt-2 flex items-center gap-0.5 cursor-pointer transition shadow-3xs"
                    >
                      <span>Launch Tool</span>
                      <ExternalLink className="h-3 w-3" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Related Articles list widget */}
          {matchedArticles.length > 0 && (
            <div className="p-6 bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-3xs space-y-4">
              <h3 className="text-xs font-black uppercase text-indigo-500 tracking-wider pb-2 border-b border-slate-100 dark:border-slate-800">
                Related Reading
              </h3>

              <div className="space-y-4">
                {matchedArticles.map((relArt) => (
                  <div key={relArt.slug} className="group cursor-pointer" onClick={() => onNavigateSlug(relArt.slug)}>
                    <span className="text-[9px] font-black text-indigo-400 uppercase font-mono">{relArt.category}</span>
                    <h4 className="text-xs font-extrabold text-slate-800 dark:text-slate-200 group-hover:text-blue-500 transition mt-0.5 leading-snug">
                      {relArt.title}
                    </h4>
                    <p className="text-[10px] text-slate-405 font-bold">{relArt.date}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Quick legal checklist panel */}
          <div className="p-5 bg-slate-50 dark:bg-slate-950/20 border border-slate-205 dark:border-slate-850 rounded-2xl space-y-3">
            <h4 className="text-[11px] uppercase font-black tracking-widest text-slate-400">Compliance & Privacy</h4>
            <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-normal font-semibold">
              All tools linked inside this publication conform strictly to the Zero Server Data Storage privacy standards. Processing runs entirely locally in your current session.
            </p>
          </div>

        </div>

      </div>
    </div>
  );
}
