/*
  Warnings:

  - You are about to drop the column `cnpj` on the `Entity` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Entity` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[cpfCnpj]` on the table `Entity` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `cpfCnpj` to the `Entity` table without a default value. This is not possible if the table is not empty.
  - Added the required column `registerName` to the `Entity` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sampleName` to the `Entity` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Entity_cnpj_key";

-- AlterTable
ALTER TABLE "Entity" DROP COLUMN "cnpj",
DROP COLUMN "name",
ADD COLUMN     "cpfCnpj" TEXT NOT NULL,
ADD COLUMN     "registerName" TEXT NOT NULL,
ADD COLUMN     "sampleName" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Entity_cpfCnpj_key" ON "Entity"("cpfCnpj");
