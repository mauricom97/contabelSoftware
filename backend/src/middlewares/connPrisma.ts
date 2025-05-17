import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";
dotenv.config();
const pgDatabase = !process.env.NODE_ENV ||
process.env.NODE_ENV === "production"
? process.env.DATABASE_URL
: process.env.PG_DATABASE_DEV;

const prisma = new PrismaClient({
  log: [
    { emit: 'stdout', level: 'query' },
    { emit: 'stdout', level: 'error' },
    { emit: 'stdout', level: 'warn' },
  ],
  datasources: {
    db: {
      url: pgDatabase,
    },
  },
});

export default prisma;