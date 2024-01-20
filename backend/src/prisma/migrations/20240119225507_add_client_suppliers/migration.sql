/*
  Warnings:

  - You are about to drop the `EntityClient` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `EntitySupplier` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "EntityClient" DROP CONSTRAINT "EntityClient_idEntity_fkey";

-- DropForeignKey
ALTER TABLE "EntitySupplier" DROP CONSTRAINT "EntitySupplier_idEntity_fkey";

-- DropTable
DROP TABLE "EntityClient";

-- DropTable
DROP TABLE "EntitySupplier";

-- CreateTable
CREATE TABLE "Client" (
    "idEntity" INTEGER NOT NULL,

    CONSTRAINT "Client_pkey" PRIMARY KEY ("idEntity")
);

-- CreateTable
CREATE TABLE "Supplier" (
    "idEntity" INTEGER NOT NULL,

    CONSTRAINT "Supplier_pkey" PRIMARY KEY ("idEntity")
);

-- AddForeignKey
ALTER TABLE "Client" ADD CONSTRAINT "Client_idEntity_fkey" FOREIGN KEY ("idEntity") REFERENCES "Entity"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Supplier" ADD CONSTRAINT "Supplier_idEntity_fkey" FOREIGN KEY ("idEntity") REFERENCES "Entity"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
