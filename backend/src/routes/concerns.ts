import { Router, Request, Response } from "express";
import { getPrismaClient } from "../db.js";

const router = Router();

// Get all concerns
router.get("/", async (req: Request, res: Response) => {
  try {
    const prisma = getPrismaClient();
    const concerns = await prisma.concern.findMany({
      orderBy: { category: "asc" },
    });

    res.json(
      concerns.map((c) => ({
        ...c,
        keywords: JSON.parse(c.keywords),
      }))
    );
  } catch (error) {
    console.error("Concerns fetch error:", error);
    res.status(500).json({ error: "Failed to fetch concerns" });
  }
});

// Get concerns by category
router.get("/category/:category", async (req: Request, res: Response) => {
  try {
    const prisma = getPrismaClient();
    const { category } = req.params;
    const concerns = await prisma.concern.findMany({
      where: { category },
    });

    res.json(
      concerns.map((c) => ({
        ...c,
        keywords: JSON.parse(c.keywords),
      }))
    );
  } catch (error) {
    console.error("Category concerns fetch error:", error);
    res.status(500).json({ error: "Failed to fetch concerns" });
  }
});

export default router;
