import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertDocumentSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Generate documents endpoint
  app.post("/api/generate-documents", async (req: Request, res: Response) => {
    try {
      // Validate request body against schema
      const result = insertDocumentSchema.safeParse({
        ...req.body,
        createdAt: new Date().toISOString()
      });
      
      if (!result.success) {
        return res.status(400).json({ 
          message: "Validation error", 
          errors: result.error.format() 
        });
      }
      
      // Save document data
      const document = await storage.createDocument(result.data);
      
      // In a real implementation, this would generate actual documents
      // and possibly email them to the client
      
      res.status(200).json({ 
        message: "Documenti generati con successo",
        documentId: document.id
      });
    } catch (error) {
      console.error("Error generating documents:", error);
      res.status(500).json({ message: "Errore durante la generazione dei documenti" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
