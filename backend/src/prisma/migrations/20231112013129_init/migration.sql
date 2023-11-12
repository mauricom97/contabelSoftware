/*
  Warnings:

  - Added the required column `assignedBy` to the `CompaniesOnUsers` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CompaniesOnUsers" ADD COLUMN     "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "assignedBy" TEXT NOT NULL;
