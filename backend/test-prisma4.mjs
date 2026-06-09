import "dotenv/config";
import { PrismaClient } from "@prisma/client";

console.log("Environment variables:");
console.log("DATABASE_URL:", process.env.DATABASE_URL);
console.log("PRISMA_QUERY_ENGINE_LIBRARY:", process.env.PRISMA_QUERY_ENGINE_LIBRARY);

try {
  console.log("Attempting to create Prisma client...");
  const options = {
    errorFormat: "pretty",
  };
  console.log("Options:", options);
  
  const prisma = new PrismaClient(options);
  console.log("Client created successfully!");
} catch (e) {
  console.error("Full error object:", JSON.stringify(e, null, 2));
  console.error("Error message:", e.message);
}
