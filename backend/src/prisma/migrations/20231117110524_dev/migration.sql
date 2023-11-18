/*
  Warnings:

  - You are about to drop the column `userId` on the `AccountsPayable` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "AccountsPayable" DROP CONSTRAINT "AccountsPayable_userId_fkey";

-- DropIndex
DROP INDEX "AccountsPayable_userId_companyId_idx";

-- AlterTable
ALTER TABLE "AccountsPayable" DROP COLUMN "userId";

-- CreateIndex
CREATE INDEX "AccountsPayable_companyId_idx" ON "AccountsPayable"("companyId");
