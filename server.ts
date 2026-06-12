import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";

async function startServer() {
  const app = express();
  const PORT = 3000;

  // 1. Health checks and core diagnostic services
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", service: "Koora Live Gateway" });
  });

  // 2. Integration of Vite Dev Middleware / Production Static Asset Pipeline
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
    console.log("[Dev Server] Vite middleware plugged into Express pipeline successfully.");
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    // Serve static files from production build directory
    app.use(express.static(distPath, {
      maxAge: '1d',
      etag: true,
      index: false // Let index.html fall back to catch-all route
    }));

    // Universal single-page routing catch-all fallback
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
    console.log("[Prod Server] Static server serving production assets with routing fallback.");
  }

  // Bind to 0.0.0.0 as required for Cloud Run containers ingress
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Koora Server running inside container on port ${PORT}`);
  });
}

startServer();
