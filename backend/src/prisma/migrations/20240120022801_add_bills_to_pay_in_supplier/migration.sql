-- AlterTable
ALTER TABLE "BillsToPay" ADD COLUMN     "supplierId" INTEGER NOT NULL DEFAULT 0;

-- AddForeignKey
ALTER TABLE "BillsToPay" ADD CONSTRAINT "BillsToPay_supplierId_fkey" FOREIGN KEY ("supplierId") REFERENCES "Supplier"("idEntity") ON DELETE RESTRICT ON UPDATE CASCADE;
