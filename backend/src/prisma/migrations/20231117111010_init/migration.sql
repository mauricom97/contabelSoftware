/*
  Warnings:

  - Changed the type of `createdBy` on the `AccountsPayable` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "AccountsPayable" DROP COLUMN "createdBy",
ADD COLUMN     "createdBy" INTEGER NOT NULL;
