import { PrismaClient } from "@prisma/client";
const pgDatabase = !process.env.NODE_ENV ||
process.env.NODE_ENV === "production"
? process.env.DATABASE_URL
: process.env.PG_DATABASE_DEV;

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: pgDatabase,
    },
  },
});

export default prisma;