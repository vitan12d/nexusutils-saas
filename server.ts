import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: "10mb" }));

  // Initialize Gemini Client
  const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      }
    }
  });

  // API Health check
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  // AI Writing Assistant Endpoint
  app.post("/api/ai/writing-assistant", async (req: any, res: any) => {
    try {
      const { text, action, tone } = req.body;
      if (!text) {
        return res.status(400).json({ error: "Text is required" });
      }

      let prompt = "";
      if (action === "rewrite") {
        prompt = `Please rewrite the following text in a ${tone} tone:\n\n"${text}"`;
      } else if (action === "summarize") {
        prompt = `Please summarize the following text to be concise and clear, written in a ${tone} tone:\n\n"${text}"`;
      } else if (action === "expand") {
        prompt = `Please expand the following text with more details and explanation, maintaining a ${tone} tone:\n\n"${text}"`;
      } else if (action === "improve") {
        prompt = `Please proofread and improve the clarity, vocabulary, and flow of the following text, keeping it in a ${tone} tone:\n\n"${text}"`;
      } else {
        prompt = `Please process the following text:\n\n"${text}"`;
      }

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: prompt,
        config: {
          systemInstruction: "You are a professional AI Writing Assistant for NexusUtils. Provide high-quality proofread, summarized, expanded, or rewritten text according to user preferences. Only return the processed text directly without any extra chat context, introductions, or conversational filler.",
        }
      });

      res.json({ result: response.text });
    } catch (error: any) {
      console.error("AI Assistant Error:", error);
      res.status(500).json({ error: error.message || "Something went wrong on the server." });
    }
  });

  // Vite middleware setup
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer();
