/*
  Warnings:

  - You are about to drop the column `defaultCompany` on the `Entity` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Entity" DROP COLUMN "defaultCompany";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "defaultCompany" INTEGER NOT NULL DEFAULT 1;
