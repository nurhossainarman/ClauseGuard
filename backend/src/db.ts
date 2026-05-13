import type { PrismaClient } from "@prisma/client";

let client: PrismaClient | null = null;

export async function getPrismaClient(): Promise<PrismaClient> {
  if (client) return client;

  const { PrismaClient: PC } = await import("@prisma/client");
  client = new PC() as unknown as PrismaClient;
  return client;
}
