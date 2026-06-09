import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { BetterSqlite3Adapter } from "@prisma/adapter-better-sqlite3";
import Database from "better-sqlite3";

console.log("Creating Prisma client with better-sqlite3 adapter...");

try {
  const db = new Database(process.env.DATABASE_URL || "file:./dev.db");
  const adapter = new BetterSqlite3Adapter(db);
  const prisma = new PrismaClient({ adapter });
  
  console.log("✅ Prisma client created successfully!");
  
  const concernCount = await prisma.concern.count();
  console.log(`✅ Found ${concernCount} concerns in database`);
  
  const userCount = await prisma.user.count();
  console.log(`✅ Found ${userCount} users in database`);
  
  await prisma.$disconnect();
  console.log("✅ All tests passed!");
} catch (e) {
  console.error("❌ Error:", e.message);
  process.exit(1);
}
