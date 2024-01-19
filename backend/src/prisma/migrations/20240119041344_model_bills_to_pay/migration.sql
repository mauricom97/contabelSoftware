-- CreateTable
CREATE TABLE "BillsToPay" (
    "id" SERIAL NOT NULL,
    "description" TEXT,
    "dueDate" TIMESTAMP(3) NOT NULL,
    "value" DOUBLE PRECISION NOT NULL,
    "status" INTEGER NOT NULL,
    "companyId" INTEGER NOT NULL,

    CONSTRAINT "BillsToPay_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "BillsToPay" ADD CONSTRAINT "BillsToPay_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
