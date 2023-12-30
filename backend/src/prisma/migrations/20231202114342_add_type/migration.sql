/*
  Warnings:

  - Added the required column `type` to the `Entity` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Entity" ADD COLUMN     "type" TEXT NOT NULL;
