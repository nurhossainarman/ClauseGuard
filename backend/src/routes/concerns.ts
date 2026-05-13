import { Router, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const router = Router();
const prisma = new PrismaClient();

// Get all concerns
router.get("/", async (req: Request, res: Response) => {
  try {
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
    res.status(500).json({ error: "Failed to fetch concerns" });
  }
});

// Get concerns by category
router.get("/category/:category", async (req: Request, res: Response) => {
  try {
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
    res.status(500).json({ error: "Failed to fetch concerns" });
  }
});

export default router;
