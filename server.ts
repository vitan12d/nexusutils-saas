/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import { DEFAULT_ADS_CONFIG } from './src/data.js';

// In-Memory Ads Configuration Store that persists during server runtime
let currentAdsConfig = { ...DEFAULT_ADS_CONFIG };

// Lazy initialisation function for GoogleGenAI
let aiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error('GEMINI_API_KEY is not defined in the environment secrets.');
  }
  if (!aiClient) {
    aiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }
  return aiClient;
}

// Helper to call API-Sports for today's fixtures
async function fetchFootballFixtures(): Promise<any> {
  const apiKey = process.env.FOOTBALL_API_KEY;
  if (!apiKey) {
    throw new Error('FOOTBALL_API_KEY is not defined in the environment.');
  }

  const response = await fetch('https://v3.football.api-sports.io/fixtures?date=2026-06-12', {
    method: 'GET',
    headers: {
      'x-apisports-key': apiKey,
    }
  });

  if (!response.ok) {
    throw new Error(`Football API returned status: ${response.status}`);
  }

  return response.json();
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Middleware for body parsing
  app.use(express.json());

  // --- API ROUTES ---

  // Health check
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', time: new Date().toISOString() });
  });

  // Call API-Sports Football API
  app.get('/api/football-fixtures', async (req, res) => {
    try {
      const data = await fetchFootballFixtures();
      res.json({ success: true, data });
    } catch (error: any) {
      console.error('Error in /api/football-fixtures:', error.message || error);
      res.status(500).json({
        success: false,
        error: error.message || 'فشل جلب قائمة مباريات اليوم من المزود الخارجي.'
      });
    }
  });

  // Get current ads configurations
  app.get('/api/ads', (req, res) => {
    res.json(currentAdsConfig);
  });

  // Update ads configurations
  app.post('/api/ads', (req, res) => {
    const newConfig = req.body;
    if (newConfig) {
      currentAdsConfig = {
        ...currentAdsConfig,
        ...newConfig,
      };
      res.json({ success: true, message: 'تم تحديث الإعلانات بنجاح!', data: currentAdsConfig });
    } else {
      res.status(400).json({ success: false, error: 'بيانات غير صالحة' });
    }
  });

  // AI-Powered Sports Analyst proxy using Google Gemini API
  app.post('/api/ask-gemini', async (req, res) => {
    const { prompt, matchContext } = req.body;
    if (!prompt) {
      return res.status(400).json({ error: 'الرجاء توفير السؤال' });
    }

    try {
      // Lazy init client
      const ai = getGeminiClient();

      const contextString = matchContext 
        ? `حول مباراة ${matchContext.homeTeam} ضد ${matchContext.awayTeam} في بطولة ${matchContext.competition}. المعلق: ${matchContext.commentator}، القناة: ${matchContext.channel}.`
        : 'الكرة العالمية والمحلية وجدول المباريات.';

      const systemInstruction = `أنت الخبير الفني ومحلل قنوات SSC و beIN Sports في موقع "نكسس كورة" (Nexus Korra).
اسمك "محلل نكسس كورة الذكي" المتصل بالدومين Nexusutils. أجب باحترافية تامة، لغة عربية سليمة وجميلة، واستخدم مصطلحات كرة القدم الحيوية والحماسية لجمهور نكسس كورة.
أعط الزوار تحليلات واقعية، تكتيكية وتوقعات دقيقة مبنية على تاريخ الفريقين والمباراة التالية.
سياق الجلسة الحالي: ${contextString}
لا تذكر شيئاً عن الأكواد البرمجية أو السيرفرات، ركز فقط في الرياضية وعروض البث.`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.5-flash',
        contents: prompt,
        config: {
          systemInstruction,
          temperature: 0.82,
        },
      });

      const replyText = response.text || 'عذراً، لم أتمكن من صياغة إجابة مناسبة حالياً.';
      res.json({ success: true, answer: replyText });
    } catch (error: any) {
      console.error('Error in ask-gemini route:', error.message || error);
      
      // Fallback response in case GEMINI_API_KEY is not defined, so the app remains perfectly functional and gorgeous!
      if (!process.env.GEMINI_API_KEY) {
        // Return a highly realistic mock analyst output that feels genuine!
        const matchName = matchContext ? `${matchContext.homeTeam} و ${matchContext.awayTeam}` : 'الكلاسيكو';
        const fallbackAnswers = [
          `بناءً على التشكيلة المتوقعة لـ ${matchName}، نلاحظ ضغطاً عالياً متوقعاً في خط الوسط. خطة 4-3-3 لريال مدريد ستكون حاسمة بوجود الأطراف، بينما الهجمات المرتدة هي السلاح الأخطر للسيتي. التوقع النهائي: 2-1 لصالح الفريق المستضيف لتقارب الأجنحة الفنية!`,
          `مواجهة ${matchName} تاريخية ولا تحتمل القسمة على اثنين! دفاعياً، التفوق طفيف بسبب الصلابة التكتيكية والاعتماد على الكرات العرضية الطويلة. نتوقع مباراة هجومية شرسة وتنافس قوي على منطقة الجزاء!`,
          `المعلق الصوتي غني عن التعريف، والأجواء مشتعلة في منتدى كووورة تكتيكياً. كفة الاستحواذ تميل لخطوط العمق والمحاورة السريعة في الأطراف.`
        ];
        const randomAnswer = fallbackAnswers[Math.floor(Math.random() * fallbackAnswers.length)];
        
        return res.json({
          success: true,
          answer: `[تحليل تجريبي ديربي كووورة]\n${randomAnswer}\n\n*ملاحظة: يمكنك تهيئة مفتاح GEMINI_API_KEY في قسم الـ Secrets لتفعيل المحلل التكتيكي الذكي فائق الدقة الحية من جوجل.*`
        });
      }

      res.status(500).json({ error: 'حدث خطأ أثناء معالجة طلبك تكتيكياً.' });
    }
  });

  // --- VITE MIDDLEWARE SETUP ---

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
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
