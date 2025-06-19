-- CreateTable
CREATE TABLE "BillsToReceive" (
    "id" SERIAL NOT NULL,
    "description" TEXT,
    "dueDate" TIMESTAMP(3) NOT NULL,
    "value" DOUBLE PRECISION NOT NULL,
    "status" INTEGER NOT NULL,
    "companyId" INTEGER NOT NULL,
    "idClient" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "BillsToReceive_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "BillsToReceive" ADD CONSTRAINT "BillsToReceive_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BillsToReceive" ADD CONSTRAINT "BillsToReceive_idClient_fkey" FOREIGN KEY ("idClient") REFERENCES "Client"("idEntity") ON DELETE RESTRICT ON UPDATE CASCADE;
