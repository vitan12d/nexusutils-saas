import express from 'express';
import path from 'path';
import fs from 'fs';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';

const app = express();
const PORT = 3000;

app.use((req, res, next) => {
  res.setHeader('Content-Security-Policy', "default-src 'self' 'unsafe-inline' 'unsafe-eval' https://images.unsplash.com https://fonts.googleapis.com https://fonts.gstatic.com; img-src 'self' data: https://images.unsplash.com; font-src 'self' https://fonts.gstatic.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; frame-ancestors 'self' https://*.google.com https://*.run.app;");
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader('Strict-Transport-Security', 'max-age=63072000; includeSubDomains; preload');
  next();
});

app.use(express.json());

// Lazy-initialized Gemini Client
let aiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI {
  if (!aiClient) {
    const key = process.env.GEMINI_API_KEY;
    if (!key) {
      throw new Error('GEMINI_API_KEY is not configured in environment variables.');
    }
    aiClient = new GoogleGenAI({
      apiKey: key,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }
  return aiClient;
}

// 1. API: AI Meta Tag Generator Proxy using Gemini API
app.post('/api/generate', async (req, res) => {
  try {
    const { title, description, keywords } = req.body;
    if (!title || !description) {
      res.status(400).json({ error: 'Title and description are required parameters.' });
      return;
    }

    const ai = getGeminiClient();
    const prompt = `You are an expert SaaS Copywriter and SEO specialist. Generate optimization metrics for a tool or app page.
Title: "${title}"
Short Description: "${description}"
Focus Keywords: "${keywords || 'developer tools, free utilities'}"

Return ONLY a flat JSON object (no Markdown blocks, no backticks, just raw json) matching this precise keys, populated with highly customized, engaging, click-friendly marketing entries:
{
  "recommendedTitle": "SEO-Optimized Title (50-60 chars)",
  "recommendedDescription": "Engaging click-through search description (130-155 chars) that includes primary keywords.",
  "openGraphTitle": "Social-friendly title version",
  "openGraphDescription": "Social-friendly description optimized for card shares",
  "focusKeywords": ["keyword1", "keyword2", "keyword3"],
  "structuredDataSchema": "Valid JSON-LD Schema (as text code block) for SoftwareApplication or WebSite object"
}`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.5-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
      },
    });

    const text = response.text || '';
    // Safely parse JSON result from response
    const parsedData = JSON.parse(text.trim());
    res.json(parsedData);
  } catch (err: any) {
    console.error('API Error:', err);
    res.status(500).json({
      error: 'Failed to generate SEO tags using Gemini AI. Please configure your GEMINI_API_KEY in Secrets.',
      details: err.message,
    });
  }
});

// Helper database objects for dynamic Sitemap (synchronized with /src/data.ts)
const staticSlugs = [
  '', 'dashboard', 'blog', 'growth', 'revenue', 'about', 'privacy', 'terms', 'contact', 'faq'
];
const toolSlugs = [
  'json-formatter', 'qr-generator', 'password-generator', 'markdown-editor', 'text-analyzer', 'seo-helper'
];
const articleSlugs = [
  'demystifying-programmatic-seo', 'crypto-checksum-validation-sha256'
];
const resourceSlugs = [
  'core-web-vitals-optimization', 'technical-seo-pre-launch', 'saas-robots-sitemap-starter', 'adsense-integration-strategy', 'spa-vs-ssr-seo-comparison'
];

// 2. SEO Routing: Dynamic sitemap.xml
app.get('/sitemap.xml', (req, res) => {
  const host = req.get('host') || 'nexusutils.com';
  const protocol = req.protocol === 'https' || (req.headers['x-forwarded-proto'] === 'https') ? 'https' : 'http';
  const origin = `${protocol}://${host}`;

  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

  // Static URLs
  staticSlugs.forEach((slug) => {
    xml += `  <url>\n    <loc>${origin}/${slug}</loc>\n    <changefreq>daily</changefreq>\n    <priority>${slug === '' ? '1.0' : '0.8'}</priority>\n  </url>\n`;
  });

  // Tools URLs
  toolSlugs.forEach((slug) => {
    xml += `  <url>\n    <loc>${origin}/tools/${slug}</loc>\n    <changefreq>weekly</changefreq>\n    <priority>0.9</priority>\n  </url>\n`;
  });

  // Blog posts URLs
  articleSlugs.forEach((slug) => {
    xml += `  <url>\n    <loc>${origin}/blog/${slug}</loc>\n    <changefreq>weekly</changefreq>\n    <priority>0.7</priority>\n  </url>\n`;
  });

  // Resources URLs (Guides, checklists, templates, examples, comparisons)
  resourceSlugs.forEach((slug) => {
    // Add multiple pathways to simulate deep programmatic mapping
    xml += `  <url>\n    <loc>${origin}/guides/${slug}</loc>\n    <changefreq>weekly</changefreq>\n    <priority>0.7</priority>\n  </url>\n`;
    xml += `  <url>\n    <loc>${origin}/checklists/${slug}</loc>\n    <changefreq>weekly</changefreq>\n    <priority>0.7</priority>\n  </url>\n`;
    xml += `  <url>\n    <loc>${origin}/templates/${slug}</loc>\n    <changefreq>weekly</changefreq>\n    <priority>0.7</priority>\n  </url>\n`;
    xml += `  <url>\n    <loc>${origin}/compare/${slug}</loc>\n    <changefreq>weekly</changefreq>\n    <priority>0.7</priority>\n  </url>\n`;
  });

  xml += `</urlset>`;

  res.header('Content-Type', 'application/xml');
  res.send(xml);
});

// 3. SEO Routing: robots.txt
app.get('/robots.txt', (req, res) => {
  const host = req.get('host') || 'nexusutils.com';
  const protocol = req.protocol === 'https' || (req.headers['x-forwarded-proto'] === 'https') ? 'https' : 'http';
  const origin = `${protocol}://${host}`;

  const robots = `User-agent: *
Allow: /
Allow: /tools/
Allow: /blog/
Allow: /resources/
Disallow: /api/

Sitemap: ${origin}/sitemap.xml`;

  res.header('Content-Type', 'text/plain');
  res.send(robots);
});

// 3b. Publisher Routing: ads.txt
app.get('/ads.txt', (req, res) => {
  const adsPath = path.join(process.cwd(), 'public', 'ads.txt');
  if (fs.existsSync(adsPath)) {
    res.header('Content-Type', 'text/plain');
    res.sendFile(adsPath);
  } else {
    res.header('Content-Type', 'text/plain');
    res.send('google.com, pub-0000000000000000, DIRECT, f08c47fec0942fa0');
  }
});

// 3c. AI Discoverability Routing: llms.txt
app.get('/llms.txt', (req, res) => {
  const llmsPath = path.join(process.cwd(), 'public', 'llms.txt');
  if (fs.existsSync(llmsPath)) {
    res.header('Content-Type', 'text/plain; charset=utf-8');
    res.sendFile(llmsPath);
  } else {
    res.header('Content-Type', 'text/plain; charset=utf-8');
    res.send('# NexusUtils\nPremium developer utilities and SEO structuring suite.');
  }
});

// 4. manifest.json
app.get('/manifest.json', (req, res) => {
  const manifest = {
    short_name: 'NexusUtils',
    name: 'NexusUtils - Free Premium Utility Suite',
    icons: [
      {
        src: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=192&h=192&q=80',
        type: 'image/jpeg',
        sizes: '192x192'
      }
    ],
    start_url: '/',
    background_color: '#0F172A',
    theme_color: '#2563EB',
    display: 'standalone',
    orientation: 'portrait'
  };
  res.json(manifest);
});

// 5. Integrate Vite Server for Development or Static Asset Serving for Production
async function bootstrap() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`NexusUtils server running on http://localhost:${PORT}`);
  });
}

bootstrap();
