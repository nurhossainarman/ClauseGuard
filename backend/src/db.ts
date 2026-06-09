import { PrismaClient } from "@prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";

let client: PrismaClient | null = null;

export function getPrismaClient(): PrismaClient {
  if (client) return client;

  const adapter = new PrismaBetterSqlite3({
    url: process.env.DATABASE_URL || "file:./dev.db",
  });

  client = new PrismaClient({
    adapter,
    log: ["error", "warn"],
  });
  return client;
}
