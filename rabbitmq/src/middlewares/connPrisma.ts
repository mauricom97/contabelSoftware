import { PrismaClient } from "@prisma/client";
const pgDatabase = !process.env.NODE_ENV ||
process.env.NODE_ENV === "production"
? process.env.DATABASE_URL
: process.env.PG_DATABASE_DEV;

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: "postgresql://controle_pratico_bd_user:mBQSxAbVDEd0pJ082kQhP1nEG3n1qNGr@dpg-cpvmiv6ehbks73e06na0-a.oregon-postgres.render.com/controle_pratico_bd?schema=test",
    },
  },
});

export default prisma;