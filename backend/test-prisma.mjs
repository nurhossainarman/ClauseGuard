import { PrismaClient } from "@prisma/client";

try {
  const prisma = new PrismaClient();
  console.log("Prisma client instantiated successfully");
  
  const concerns = await prisma.concern.count();
  console.log("Found concerns:", concerns);
  
  await prisma.$disconnect();
} catch (error) {
  console.error("Error:", error.message);
  console.error("Code:", error.code);
  if (error.meta) console.error("Meta:", error.meta);
}
