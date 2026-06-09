import "dotenv/config";

console.log("DATABASE_URL env:", process.env.DATABASE_URL);
console.log("NODE_ENV:", process.env.NODE_ENV);

import PC from "@prisma/client";
console.log("Prisma default export:", Object.keys(PC));

const { PrismaClient } = PC;
console.log("PrismaClient:", typeof PrismaClient);

try {
  const prisma = new PrismaClient();
  console.log("Client created");
} catch (e) {
  console.error("Error:", e.message);
  console.error("Stack:", e.stack);
}
