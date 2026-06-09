import { Router, Request, Response } from "express";
import { authenticateToken } from "../middleware/auth.js";
import { getPrismaClient } from "../db.js";
import { z } from "zod";

const router = Router();

const scanRequestSchema = z.object({
  documentText: z.string().min(10, "Document must be at least 10 characters"),
  documentName: z.string().optional().default("Untitled Document"),
  selectedConcernIds: z.array(z.number()).optional().default([]),
});

function fuzzyMatch(text: string, keyword: string, contextWindow = 100): string | null {
  const lowerText = text.toLowerCase();
  const lowerKeyword = keyword.toLowerCase();

  const index = lowerText.indexOf(lowerKeyword);
  if (index === -1) return null;

  const start = Math.max(0, index - contextWindow);
  const end = Math.min(text.length, index + keyword.length + contextWindow);

  return text.substring(start, end);
}

// Create a new scan
router.post("/", authenticateToken, async (req: Request, res: Response) => {
  try {
    const prisma = getPrismaClient();
    const { documentText, documentName, selectedConcernIds } = scanRequestSchema.parse(req.body);

    const scan = await prisma.scan.create({
      data: {
        userId: req.userId!,
        documentName,
      },
    });

    const concerns = await prisma.concern.findMany({
      where: selectedConcernIds.length > 0 ? { id: { in: selectedConcernIds } } : undefined,
    });

    const results = [];

    for (const concern of concerns) {
      const keywords: string[] = JSON.parse(concern.keywords);

      for (const keyword of keywords) {
        const context = fuzzyMatch(documentText, keyword);
        if (context) {
          const position = documentText.toLowerCase().indexOf(keyword.toLowerCase());
          const result = await prisma.scanResult.create({
            data: {
              scanId: scan.id,
              concernId: concern.id,
              matchedText: keyword,
              context: context.trim(),
              position,
            },
          });
          results.push({ ...result, concern });
        }
      }
    }

    res.json({
      scan: {
        id: scan.id,
        documentName: scan.documentName,
        createdAt: scan.createdAt,
      },
      results: results.map(r => ({
        id: r.id,
        matchedText: r.matchedText,
        context: r.context,
        concern: {
          id: r.concern.id,
          name: r.concern.name,
          category: r.concern.category,
          severity: r.concern.severity,
          description: r.concern.description,
        },
      })),
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.errors[0].message });
    }
    console.error("Scan error:", error);
    res.status(500).json({ error: "Scan failed" });
  }
});

// Get scan by ID
router.get("/:scanId", authenticateToken, async (req: Request, res: Response) => {
  try {
    const prisma = getPrismaClient();
    const { scanId } = req.params;

    const scan = await prisma.scan.findUnique({
      where: { id: parseInt(scanId) },
      include: {
        results: {
          include: { concern: true },
        },
      },
    });

    if (!scan) {
      return res.status(404).json({ error: "Scan not found" });
    }

    if (scan.userId !== req.userId) {
      return res.status(403).json({ error: "Not authorized" });
    }

    res.json({
      scan: {
        id: scan.id,
        documentName: scan.documentName,
        createdAt: scan.createdAt,
      },
      results: scan.results.map(r => ({
        id: r.id,
        matchedText: r.matchedText,
        context: r.context,
        concern: {
          id: r.concern.id,
          name: r.concern.name,
          category: r.concern.category,
          severity: r.concern.severity,
          description: r.concern.description,
        },
      })),
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch scan" });
  }
});

// Get user's scan history
router.get("/", authenticateToken, async (req: Request, res: Response) => {
  try {
    const prisma = getPrismaClient();

    const scans = await prisma.scan.findMany({
      where: { userId: req.userId },
      include: { results: true },
      orderBy: { createdAt: "desc" },
    });

    res.json(
      scans.map(scan => ({
        id: scan.id,
        documentName: scan.documentName,
        createdAt: scan.createdAt,
        resultCount: scan.results.length,
      }))
    );
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch scans" });
  }
});

export default router;
