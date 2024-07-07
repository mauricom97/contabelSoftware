import { PrismaClient } from "@prisma/client";
const pgDatabase =
process.env.NODE_ENV === "production"
? process.env.DATABASE_URL
: process.env.PG_DATABASE_DEV;
console.log(`########################${pgDatabase}##########################`)

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: "postgresql://controle_pratico_bd_user:mBQSxAbVDEd0pJ082kQhP1nEG3n1qNGr@dpg-cpvmiv6ehbks73e06na0-a/controle_pratico_bd",
    },
  },
});

export default prisma;