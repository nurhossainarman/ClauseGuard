import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import type { JWTPayload } from "../types.js";

declare global {
  namespace Express {
    interface Request {
      userId?: number;
      userEmail?: string;
    }
  }
}

export function authenticateToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const token = req.headers["authorization"]?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Access token required" });
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "secret"
    ) as JWTPayload;

    req.userId = decoded.id;
    req.userEmail = decoded.email;
    next();
  } catch {
    res.status(403).json({ error: "Invalid or expired token" });
  }
}
