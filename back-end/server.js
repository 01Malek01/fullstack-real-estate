import {app} from "./app.js";
import { PrismaClient } from "@prisma/client";

const PORT = process.env.PORT || 8000;

const prisma = new PrismaClient();

async function main() {
  try {
    await prisma.$connect();
    console.log("DB connected");
  } catch (e) {
    console.error("Failed to connect to the database", e);
  } finally {
    await prisma.$disconnect();
  }
}

main();


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
