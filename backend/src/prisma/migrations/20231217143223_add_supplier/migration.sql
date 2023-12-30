-- CreateTable
CREATE TABLE "Suppliers" (
    "id" SERIAL NOT NULL,
    "entityId" INTEGER NOT NULL,

    CONSTRAINT "Suppliers_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Suppliers" ADD CONSTRAINT "Suppliers_entityId_fkey" FOREIGN KEY ("entityId") REFERENCES "Entity"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
