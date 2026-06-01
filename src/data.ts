import { Tool, Category, BlogArticle, ResourceItem, FAQItem } from './types';

export const categories: Category[] = [
  {
    id: 'developer',
    name: 'Developer Utilities',
    description: 'Precision engineering micro-tools for formatting, serialization, and cryptographic hashing.',
    iconName: 'Terminal'
  },
  {
    id: 'creators',
    name: 'Content & Design',
    description: 'Tools for copywriters, publishers, and developers working with visual markup and digital media.',
    iconName: 'Sparkles'
  },
  {
    id: 'business',
    name: 'SEO & Business Growth',
    description: 'Technical marketing products to improve discoverability, audit performance, and elevate search visibility.',
    iconName: 'TrendingUp'
  }
];

export const tools: Tool[] = [
  {
    id: 'json-formatter',
    name: 'JSON Formatter & Validator',
    slug: 'json-formatter',
    description: 'Prettify, minify, check formatting syntax, and repair nested JSON structures with inline schema validation.',
    longDescription: 'Ensure valid structures for API request payloads. Supports formatting with varying indent sizes, minification for minimal payload sizes, syntax error locating, and beautiful color themes for readable trees.',
    category: 'developer',
    iconName: 'Code2',
    popular: true,
    trending: true,
    rating: 4.9,
    runsClientSide: true
  },
  {
    id: 'qr-generator',
    name: 'QR Code & Asset Generator',
    slug: 'qr-generator',
    description: 'Generate customizable, high-resolution QR codes with unique content patterns, custom colors, and offline compatibility.',
    longDescription: 'Create standard and dynamic QR codes for URLs, contact cards, text payloads, or WiFi connection setups. Set personalized foreground and background colors, choose the error correction levels, and export to PNG instantly.',
    category: 'creators',
    iconName: 'QrCode',
    popular: true,
    rating: 4.8,
    runsClientSide: true
  },
  {
    id: 'password-generator',
    name: 'Secure Password Generator',
    slug: 'password-generator',
    description: 'Generate high-entropy, cryptographically secure string combinations with localized password strength feedback.',
    longDescription: 'Choose from configurable character sets including symbols, digits, upper/lowercase letters, and exclude ambiguous symbols. Evaluates absolute entropy bits, length checks, and gives helpful guidelines to secure systems.',
    category: 'developer',
    iconName: 'ShieldAlert',
    popular: false,
    trending: true,
    rating: 4.7,
    runsClientSide: true
  },
  {
    id: 'markdown-editor',
    name: 'Markdown previewer & Editor',
    slug: 'markdown-editor',
    description: 'A powerful real-time markdown editor with high-contrast live HTML compilation and inline HTML tag exports.',
    longDescription: 'Draft technical blog posts, README documentation, or content packages with instantaneous dual-pane output syncing. Supports standard GFM shortcuts and immediate CSS-styled canvas previews.',
    category: 'creators',
    iconName: 'FileEdit',
    popular: false,
    rating: 4.6,
    runsClientSide: true
  },
  {
    id: 'text-analyzer',
    name: 'Base64 & Hash Converter',
    slug: 'text-analyzer',
    description: 'Rapid, offline-first encoder and decoder for Base64 formats with support for MD5 and SHA-256 calculation.',
    longDescription: 'Ensure accurate diagnostic encoding of binary frames or complex URLs. Perform standard cryptographic operations with lightweight memory profiles, high accuracy counters, and copyable results.',
    category: 'developer',
    iconName: 'Binary',
    popular: true,
    rating: 4.8,
    runsClientSide: true
  },
  {
    id: 'seo-helper',
    name: 'AI Meta Tag & Title Generator',
    slug: 'seo-helper',
    description: 'Configure high-impact, keyword-enriched click-through titles, meta descriptions, and semantic OpenGraph parameters powered by Gemini AI.',
    longDescription: 'Enter the core description of any application, product, or blog topic together with focus keywords. Leveraging state-of-the-art LLMs, receive structured, crawl-ready meta attributes optimized for web results.',
    category: 'business',
    iconName: 'Bot',
    popular: true,
    trending: true,
    rating: 5.0,
    runsClientSide: false
  },
  {
    id: 'utm-builder',
    name: 'UTM Campaign Link Builder',
    slug: 'utm-builder',
    description: 'Generate fully-compliant marketing UTM tracking links with instant validation, custom presets, and local history tracking dashboards.',
    longDescription: 'Create standardized campaign tracking resources with custom parameters like utm_source, utm_medium, utm_campaign, utm_term, and utm_content. Includes built-in quick presets and local persistence cards.',
    category: 'business',
    iconName: 'Bot',
    popular: true,
    trending: true,
    rating: 4.9,
    runsClientSide: true
  },
  {
    id: 'word-counter',
    name: 'Word Counter & SEO Density Analyzer',
    slug: 'word-counter',
    description: 'Analyze content length, reading times, and calculate real-time keyword density to optimize articles for search indexing rules.',
    longDescription: 'Perform detailed content audits in seconds. Tracks characters, sentences, paragraphs, oral speaking rates, and highlights a custom density distribution table that filters typical stop words to let your core topics shine.',
    category: 'creators',
    iconName: 'WordCounter',
    popular: true,
    trending: true,
    rating: 4.8,
    runsClientSide: true
  },
  {
    id: 'ua-parser',
    name: 'Browser Client Info & User Agent Parser',
    slug: 'ua-parser',
    description: 'Extract specs from your browser client or parse external user-agent strings to inspect browser versions, engines, and OS platforms.',
    longDescription: 'Rapid browser metadata extractor. Dissect custom request headers, screen sizes, cookie statuses, and active viewport constraints instantly. Perfect for debugging server authorization locks or parsing diagnostic client headers.',
    category: 'developer',
    iconName: 'UAParser',
    popular: false,
    trending: true,
    rating: 4.7,
    runsClientSide: true
  },
  {
    id: 'pdf-hub',
    name: 'Smart client-side PDF Box & Inspector',
    slug: 'pdf-hub',
    description: 'Convert JPG/PNG images to PDF or inspect PDF metadata structures and version security compliance completely offline.',
    longDescription: 'High-performance offline PDF workbench. Convert multiple design specs, screenshot segments, or photographs into professional PDF modules. Standardize orientation, configure custom page margins, and inspect the structural headers of any existing PDF safely in your client browser.',
    category: 'creators',
    iconName: 'FileBox',
    popular: true,
    trending: true,
    rating: 4.9,
    runsClientSide: true
  }
];

export const blogArticles: BlogArticle[] = [
  {
    slug: 'demystifying-programmatic-seo',
    title: 'Demystifying Programmatic SEO: A Developer\'s Handbook to Scaling Organic Traffic',
    description: 'Discover how to engineer database-driven templates, structure crawlable semantic categories, and scale organic reach without sacrificing content value.',
    content: `
# Demystifying Programmatic SEO: A Developer's Handbook to Scaling Organic Traffic

Programmatic Search Engine Optimization (pSEO) is the practice of publishing landing pages at scale using curated datasets and robust templates. Rather than creating individual pages manually, developers build structural paths that target "head-to-tail" keywords automatically.

Here is a breakdown of the three key pillars for executing a zero-fault programmatic campaign.

## 1. Finding the Ideal Search Intent
The most critical part of a successful programmatic launch is discovering low-competition, high-volume search parameters. These search terms are often structured as:
\`[Primary Term] + [Modifier Variable]\` (e.g., *Compare JSON Formatter with [Tool Name]*).

- **High Intent:** Users are scanning for rapid solutions (e.g., *convert csv to xml online free*).
- **High Multiplier:** The modifier has scores of relevant parameters, ensuring you can systematically create valuable guides.

## 2. Dynamic Component Design and Database Integrity
Each programmatic page must look and feel handcrafted. Search engines penalize duplicate, thin-content generators. Your pages should offer genuine interactive capabilities.
For NexusUtils, we construct dedicated FAQs, comparison grids, user reviews, and fully interactive components alongside structured guides, assuring that visitors remain highly engaged.

## 3. Dynamic JSON-LD Schema Integration
Injecting Structured Data allows search engines to construct rich cards directly from your metadata.
\`\`\`json
{
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "NexusUtils Formatter",
  "operatingSystem": "All",
  "applicationCategory": "DeveloperApplication",
  "offers": {
    "@type": "Offer",
    "price": "0.00",
    "priceCurrency": "USD"
  }
}
\`\`\`

By coupling structured schemas with rapid loading times (under 200ms on server integrations), you maximize crawlability and quickly earn prime indexing status.
    `,
    date: '2026-05-18T12:00:00Z',
    readingTime: '5 min read',
    author: {
      name: 'Elena Rostova',
      role: 'Principal Technical SEO Engineer',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&h=150&q=80'
    },
    category: 'SEO',
    tags: ['SEO', 'Marketing', 'Automation', 'Engineering'],
    relatedTools: ['seo-helper', 'json-formatter']
  },
  {
    slug: 'crypto-checksum-validation-sha256',
    title: 'Choosing the Right Hashing Algorithm: MD5 vs SHA-256 for Non-Cryptographic Workloads',
    description: 'An in-depth analysis of checksum performance, security risks, collisions, and CPU benchmarks when operating client-side string validations.',
    content: `
# Choosing the Right Hashing Algorithm: MD5 vs SHA-256

Hashing functions are the nervous system of modern payload validating routines. From file integrity matches on remote downloads to CDN cache busts, these algorithms transform arbitrary structures into fixed-length signatures.

Let's dissect the practical tradeoffs between MD5 and SHA-256 across local applications.

## Hashing Benchmarks

| Algorithm | Digest Size | Collision Resistance | Target Execution Frame | Recommended Use Cases |
| :--- | :--- | :--- | :--- | :--- |
| **MD5** | 128 bits | Broken | Very Fast (~400 MB/s) | Lightweight Cache busting, non-safe validation |
| **SHA-256** | 256 bits | Secure | Fast (~220 MB/s) | Securing APIs, crypto verification, DB indexing |

## The Dangers of MD5 Collisions
While MD5 is extremely efficient for legacy setups or file indexing, collision generation is now trivial. High-frequency generators can easily mock valid binary signatures. Unless working under extreme legacy system restrictions, team defaults must always align with **SHA-256** or modern non-cryptographic keys such as MurmurHash3.

## Client-Side Implementation in JavaScript / TypeScript
Using the built-in browser subtle Web Crypto APIs enables lightning-fast computing profiles in high-contrast React apps:
\`\`\`ts
async function sha256(message: string): Promise<string> {
  const msgBuffer = new TextEncoder().encode(message);
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}
\`\`s
    `,
    date: '2026-05-27T08:30:00Z',
    readingTime: '4 min read',
    author: {
      name: 'Kai Takahashi',
      role: 'Senior Security Architect',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150&q=80'
    },
    category: 'Development',
    tags: ['Security', 'Cryptography', 'Performance', 'Developer Tools'],
    relatedTools: ['text-analyzer', 'password-generator']
  },
  {
    slug: 'adsense-approval-guidelines-utilities',
    title: 'Google AdSense Approval Secrets for Developer Utilities: Passing Thin Content Audits',
    description: 'Learn the strict compliance pillars required to get utility platforms and micro-tools approved by Google AdSense systems.',
    content: `
# Passing Google AdSense Thin Content Audits for Web Utilities

Many developers launch interactive micro-tools only to receive "Valuable Inventory: No Content" or "Thin Content" rejection letters from Google AdSense. Because utilities rely strictly on input forms and client-side scripts, Google automated review bots often fail to find indexable text.

Here is the exact architectural blueprint to bypass publisher index blocks and secure immediate approvals.

## 1. Embed Semantic Guides Adjacent to Inputs
Never serve raw inputs on a blank canvas. Every micro-tool must be framed by rich, high-contrast structural explanations.
By incorporating structured documentation detailing **how** parameters are calculated, what equations are used, and real-world developer use cases, you build rich semantic weight.

- **Minimum Word Ceiling:** Ensure each tool page carries at least 300-500 words of authentic copy describing the utility's mechanics.
- **Avoid Slop:** Avoid repetitive keyword spamming. Write helpful, instructional developer checklists that users can actually consume.

## 2. Generate Fully Compliant Core Pages
AdSense reviewers manually inspect compliance credentials. Ensure your navigation footer links to fully fleshed-out documents:
- **Cookies and DART trackers:** Explicitly disclose ad-serving operations.
- **Privacy Policies:** Must clearly declare third-party networks, analytics channels, and how user privacy is preserved locally.
- **Physical Contact details:** List real response forms and clear brand definitions.

By combining outstanding UI responsiveness with high-density informational articles, you establish a highly authoritative publisher persona.
    `,
    date: '2026-05-30T10:00:00Z',
    readingTime: '6 min read',
    author: {
      name: 'Elena Rostova',
      role: 'Principal Technical SEO Engineer',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&h=150&q=80'
    },
    category: 'SEO',
    tags: ['AdSense', 'SEO', 'Monetization', 'Compliance'],
    relatedTools: ['seo-helper', 'utm-builder']
  },
  {
    slug: 'optimizing-ad-placement-retention',
    title: 'Creating SEO-First Web Utilities: Balancing Display Ads and UX Performance',
    description: 'How to structure high-performance tools that score 100% on Core Web Vitals while loading responsive display ads.',
    content: `
# Creating SEO-First Web Utilities: Display Ads and UX Balance

Utility platforms have unparalleled visitor view durations. A developer formatting nested JSON packages typically spends three to five minutes looking at the screen. This creates a goldmine for display publishers—yet placing ads recklessly ruins user retention and tanks Core Web Vitals metrics.

Let's explore how to optimize ad revenues without breaking layouts.

## The Performance Penalty of Third-Party Scripts

Adding standard Google Publisher Tags directly to the browser DOM can delay Interaction to Next Paint (INP) scores. Google favors pages that render buttons within 200 milliseconds.

\`\`\`ts
// Best Practice: Lazy load non-critical publisher scripts
window.addEventListener('load', () => {
  setTimeout(() => {
    const script = document.createElement('script');
    script.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js';
    script.async = true;
    document.head.appendChild(script);
  }, 2000); // 2 second ideal delay
});
\`\`\`

## Reserving Aspect-Ratio Layout Grids
Cumulative Layout Shift (CLS) is another crucial signal. If a banner ad loads late and pushes the tool's input box down, the user's cursor clicks the wrong item. 

Always define a fixed aspect ratio on wrapping components. A container styled with 'min-h-[250px] bg-slate-50' guarantees the browser reserves space beforehand, scoring a perfect 0 on visual shifts.
    `,
    date: '2026-06-01T09:15:00Z',
    readingTime: '5 min read',
    author: {
      name: 'Elena Rostova',
      role: 'Principal Technical SEO Engineer',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&h=150&q=80'
    },
    category: 'SEO',
    tags: ['AdSense', 'Performance', 'UX', 'Optimization'],
    relatedTools: ['seo-helper', 'word-counter']
  }
];

export const resources: ResourceItem[] = [
  {
    slug: 'core-web-vitals-optimization',
    type: 'guide',
    title: 'Google Core Web Vitals Optimization Guide',
    description: 'Expert-level guide to perfecting LCP, CLS, and INP metrics on client-heavy interfaces.',
    content: `
# Google Core Web Vitals Optimization

Improving user experience metrics directly correlates with elevated positioning in search networks. Google monitors three primary signals: Largest Contentful Paint (LCP), Cumulative Layout Shift (CLS), and Interaction to Next Paint (INP).

## Key Metrics Demystified

### 1. Largest Contentful Paint (LCP)
LCP tracks the loading time of the primary visible element in the viewport.
- **Target:** ≤ 2.5s
- **Best Practice:** Inline critical CSS, pre-load hero images, and leverage static asset edge caching.

### 2. Cumulative Layout Shift (CLS)
CLS gauges the visual stability of a page during updates.
- **Target:** ≤ 0.1
- **Best Practice:** Use precise aspect-ratio values on image containers and reserve spaces for progressive ad scripts.

### 3. Interaction to Next Paint (INP)
INP tracks systemic latency associated with human interactions.
- **Target:** ≤ 200ms
- **Best Practice:** Yield CPU rendering times using RequestAnimationFrame to prevent long framing delays.
    `,
    faq: [
      {
        question: 'What is the most common cause of high CLS?',
        answer: 'Dynamically injected banners or components lacking fixed structural height or width containers.'
      },
      {
        question: 'Does server performance impact Core Web Vitals?',
        answer: 'Yes. Slow Time-to-First-Byte (TTFB) extends early asset loads, ultimately driving up downstream metrics like LCP.'
      }
    ],
    relatedTools: ['seo-helper'],
    relatedArticles: ['demystifying-programmatic-seo']
  },
  {
    slug: 'technical-seo-pre-launch',
    type: 'checklist',
    title: 'Technical SEO Pre-Launch Checklist',
    description: 'A comprehensive checklist to verify that all markup, schema, and routing boundaries are crawl-ready.',
    content: `
# Technical SEO Pre-Launch Checklist

Ensure that crawl crawlers can effortlessly parse, read, index, and organize every segment of your production launch.

## Phase 1: Meta Tag Integrity
- [ ] Unique title attributes matching keyword search targets (50-60 characters).
- [ ] Concise, persuasive meta descriptions highlighting primary features (120-150 characters).
- [ ] Validate standard canonical configurations on all dynamic segments.
- [ ] Inject Open Graph properties (\`og:title\`, \`og:description\`, \`og:type\`).

## Phase 2: Structural Crawl Config
- [ ] Deploy dynamic, fully registered Sitemap paths.
- [ ] Establish standard access lists under a curated robots.txt file.
- [ ] Standardize server headers to deliver clean 200 OK or 404 NOT FOUND codes.
- [ ] Register structured rich schemas (e.g., SoftwareApplication formats).
    `,
    faq: [
      {
        question: 'Why are canonical tags necessary on tool pages?',
        answer: 'To prevent index duplicates if pages are accessed via varying tracker coordinates, UTMS, or capital letter paths.'
      }
    ],
    relatedTools: ['seo-helper', 'json-formatter'],
    relatedArticles: ['demystifying-programmatic-seo']
  },
  {
    slug: 'saas-robots-sitemap-starter',
    type: 'template',
    title: 'SaaS Robots.txt & Sitemap Starter Configuration',
    description: 'Production-ready starter configurations supporting nested folder index maps and search filters.',
    content: `
# SaaS Robots.txt & Sitemap Starter Template

Save this configurations locally to guide search agents away from private admin boards while routing them straight to your popular utilities.

## Starter robots.txt
\`\`\`txt
# robots.txt for NexusUtils platform
User-agent: *
Allow: /
Allow: /tools/
Allow: /blog/
Allow: /resources/
Disallow: /admin/
Disallow: /api/
Disallow: /*?search=

Sitemap: https://nexusutils.com/sitemap.xml
\`\`\`

## High-Performance XML Sitemap Structure
\`\`\`xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://nexusutils.com/</loc>
    <lastmod>2026-06-01</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://nexusutils.com/dashboard</loc>
    <lastmod>2026-06-01</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
</urlset>
\`\`\`
    `,
    faq: [
      {
        question: 'Does robots.txt block page indexing?',
        answer: 'No. Robots.txt keeps robots from scanning but pages can still find their way to indexes through secondary inbound mentions.'
      }
    ],
    relatedTools: ['seo-helper'],
    relatedArticles: ['demystifying-programmatic-seo']
  },
  {
    slug: 'adsense-integration-strategy',
    type: 'guide',
    title: 'Complete AdSense Integration & Optimization Strategy',
    description: 'How to position display ads across utility platforms to optimize RPM without degrading the tool user experience.',
    content: `
# AdSense Integration & Optimization Strategy

Free utilities depend on healthy monetization. Achieving high Revenue Per Mille (RPM) requires a careful balance of viewport real estate and user focus.

## Optimal Display Regions for Web Utilities

1. **The Hero Left/Right Sidebar Rail**
   - Position standard vertical banner ad slots alongside large tools. Utility pages keep users active for minutes, boosting ad view times.

2. **The "Intermittent Output" Slot**
   - Place a quiet, responsive banner directly beneath major execution outcomes (e.g., matching text outputs or parsed charts).

3. **In-Feed Blog Segments**
   - Place native programmatic cards every three or four paragraphs of deeply technical articles.

## Core Integration Requirements
- Adhere strictly to Google Publisher Policies. Avoid fake loading frames, deceptive titles (e.g., do not call ad spaces *"Utilities Output"*), or placing cards near key trigger buttons.
    `,
    faq: [
      {
        question: 'What is a typical CTR for developer tools?',
        answer: 'Usually between 0.1% and 0.5%. Because of this, optimizing view durations and target ad matches is crucial.'
      }
    ],
    relatedTools: ['seo-helper'],
    relatedArticles: ['crypto-checksum-validation-sha256']
  },
  {
    slug: 'spa-vs-ssr-seo-comparison',
    type: 'compare',
    title: 'Single-Page Application vs Server-Side Rendering for SEO',
    description: 'A deep architectural comparison scorecard highlighting loading speed, crawl risks, and indexing ratios.',
    content: `
# SPA vs SSR for Search Engine Optimization

Choosing between a Client-Side Single Page App (SPA) and Server-Side Rendering (SSR) alters how your code is navigated by search indexes.

## Scoring Matrix Checklist

- **Time to First Byte (TTFB)**
  - **SPA:** **Excellent** (served directly as static file structures from global CDN edge networks).
  - **SSR:** **Moderate** (depends on active server nodes computing dynamic pages).

- **Index Discovery Rate**
  - **SPA:** **Moderate** (Google processes JS deferred, potentially delaying index updates).
  - **SSR:** **Excellent** (pure markup served directly on request).

- **Coding Complexity**
  - **SPA:** **Low** (standard client hooks and lightweight architectures).
  - **SSR:** **High** (requires state synchronization and node containers).
    `,
    faq: [
      {
        question: 'Can search engines index dynamic client side state changes?',
        answer: 'Yes. Modern crawl modules run complex engines, but they will not wait for delayed network requests or slow client-side spinners.'
      }
    ],
    relatedTools: ['seo-helper', 'markdown-editor'],
    relatedArticles: ['demystifying-programmatic-seo']
  }
];

export const faqs: FAQItem[] = [
  {
    question: 'Are the tools on NexusUtils completely free to use?',
    answer: 'Yes, everything is 100% free with absolutely no hidden charges, caps, limits, or logins required. We are supported entirely by display advertising and sponsorships.'
  },
  {
    question: 'Does NexusUtils store any of my developer files or text entries?',
    answer: 'Absolutely not. NexusUtils operates under a strict privacy-first model. All calculations, compression, formatting, and cryptography occur locally inside your browser context. No text input is sent to our servers, except when invoking our optional AI SEO tool which streams via an encrypted proxy.'
  },
  {
    question: 'Can I integrate these services offline?',
    answer: 'Most utilities on NexusUtils operate on client-side JS. Once loaded, they continue to work without a internet connection. We are progressively adapting our codebase to fully support Offline PWA targets.'
  },
  {
    question: 'How do I submit an idea or bug report for a tool?',
    answer: 'We love feedback from developer circles! You can reach our core engineers via the form on our dedicated Contact page.'
  }
];
