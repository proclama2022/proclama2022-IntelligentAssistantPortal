import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes.js";
import { setupVite, serveStatic, log } from "./vite.js";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Serve static files from server/static directory
app.use('/images', express.static(path.resolve(__dirname, 'static/images')));

// Enable CORS for Vercel deployment
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  next();
});

app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }

      log(logLine);
    }
  });

  next();
});

// Initialize routes
await registerRoutes(app);

app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
  const status = err.status || err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  res.status(status).json({ message });
});

// For Vercel deployment, we need to handle static files in a slightly different way
if (process.env.VERCEL) {
  log("Running on Vercel");
  // Let Vercel handle static files via vercel.json configuration
} else if (process.env.NODE_ENV === "development") {
  const server = app.listen({
    port: process.env.PORT ? parseInt(process.env.PORT) : 3000,
    host: "0.0.0.0",
    reusePort: true,
  }, () => {
    const port = process.env.PORT ? parseInt(process.env.PORT) : 3000;
    log(`Development server running on port ${port}`);
  });
  
  // Pass both app and server to setupVite
  await setupVite(app, server);
} else {
  // In production (non-Vercel), serve static files and handle client-side routing
  const port = process.env.PORT ? parseInt(process.env.PORT) : 3000;
  const server = app.listen(port, "0.0.0.0", () => {
    log(`Production server running on port ${port}`);
  });
  
  // Serve static files
  serveStatic(app);
}

// Export the Express app for Vercel
export default app;
