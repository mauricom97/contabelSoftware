-- DropIndex
DROP INDEX "AccountsPayable_companyId_idx";

-- AlterTable
ALTER TABLE "AccountsPayable" ADD COLUMN     "entityId" INTEGER NOT NULL DEFAULT 1;

-- CreateIndex
CREATE INDEX "AccountsPayable_companyId_entityId_idx" ON "AccountsPayable"("companyId", "entityId");

-- AddForeignKey
ALTER TABLE "AccountsPayable" ADD CONSTRAINT "AccountsPayable_entityId_fkey" FOREIGN KEY ("entityId") REFERENCES "Entity"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
