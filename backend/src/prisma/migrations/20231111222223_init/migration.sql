/*
  Warnings:

  - Added the required column `access` to the `UserCompany` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "UserCompany" ADD COLUMN     "access" TEXT NOT NULL;
