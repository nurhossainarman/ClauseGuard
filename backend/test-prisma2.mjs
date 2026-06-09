import dotenv from "dotenv";
dotenv.config();

console.log("DATABASE_URL:", process.env.DATABASE_URL);

import { PrismaClient } from "@prisma/client";

try {
  const prisma = new PrismaClient({
    datasources: {
      db: {
        url: process.env.DATABASE_URL || "file:./dev.db",
      },
    },
  });
  console.log("Prisma client instantiated successfully");
  
  const concerns = await prisma.concern.count();
  console.log("Found concerns:", concerns);
  
  await prisma.$disconnect();
} catch (error) {
  console.error("Error:", error.message);
}
