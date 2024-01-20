/*
  Warnings:

  - You are about to drop the column `supplierId` on the `BillsToPay` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "BillsToPay" DROP CONSTRAINT "BillsToPay_supplierId_fkey";

-- AlterTable
ALTER TABLE "BillsToPay" DROP COLUMN "supplierId",
ADD COLUMN     "idSupplier" INTEGER NOT NULL DEFAULT 0;

-- AddForeignKey
ALTER TABLE "BillsToPay" ADD CONSTRAINT "BillsToPay_idSupplier_fkey" FOREIGN KEY ("idSupplier") REFERENCES "Supplier"("idEntity") ON DELETE RESTRICT ON UPDATE CASCADE;
