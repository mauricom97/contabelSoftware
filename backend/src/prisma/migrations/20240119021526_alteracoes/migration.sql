/*
  Warnings:

  - You are about to drop the column `createdAt` on the `Entity` table. All the data in the column will be lost.
  - You are about to drop the column `createdBy` on the `Entity` table. All the data in the column will be lost.
  - You are about to drop the column `defaultCompany` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `AccountsPayable` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `AccountsPayableExpenseCategory` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `CompaniesOnUsers` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ExpenseCategory` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Suppliers` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[registerName]` on the table `Entity` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[phone]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "AccountsPayable" DROP CONSTRAINT "AccountsPayable_companyId_fkey";

-- DropForeignKey
ALTER TABLE "AccountsPayable" DROP CONSTRAINT "AccountsPayable_entityId_fkey";

-- DropForeignKey
ALTER TABLE "AccountsPayable" DROP CONSTRAINT "AccountsPayable_expenseCategoryId_fkey";

-- DropForeignKey
ALTER TABLE "AccountsPayableExpenseCategory" DROP CONSTRAINT "AccountsPayableExpenseCategory_accountsPayableId_fkey";

-- DropForeignKey
ALTER TABLE "AccountsPayableExpenseCategory" DROP CONSTRAINT "AccountsPayableExpenseCategory_expenseCategoryId_fkey";

-- DropForeignKey
ALTER TABLE "CompaniesOnUsers" DROP CONSTRAINT "CompaniesOnUsers_companyId_fkey";

-- DropForeignKey
ALTER TABLE "CompaniesOnUsers" DROP CONSTRAINT "CompaniesOnUsers_userId_fkey";

-- DropForeignKey
ALTER TABLE "Suppliers" DROP CONSTRAINT "Suppliers_entityId_fkey";

-- DropIndex
DROP INDEX "Company_email_key";

-- DropIndex
DROP INDEX "Company_ie_key";

-- DropIndex
DROP INDEX "Company_phone_key";

-- DropIndex
DROP INDEX "Entity_email_key";

-- DropIndex
DROP INDEX "Entity_ie_key";

-- DropIndex
DROP INDEX "Entity_phone_key";

-- AlterTable
ALTER TABLE "Company" ALTER COLUMN "sampleName" SET DATA TYPE VARCHAR,
ALTER COLUMN "registerName" SET DATA TYPE VARCHAR,
ALTER COLUMN "cnpj" SET DATA TYPE VARCHAR,
ALTER COLUMN "ie" DROP NOT NULL,
ALTER COLUMN "ie" SET DATA TYPE VARCHAR,
ALTER COLUMN "phone" DROP NOT NULL,
ALTER COLUMN "phone" SET DATA TYPE VARCHAR,
ALTER COLUMN "email" DROP NOT NULL,
ALTER COLUMN "email" SET DATA TYPE VARCHAR,
ALTER COLUMN "address" DROP NOT NULL,
ALTER COLUMN "address" SET DATA TYPE VARCHAR,
ALTER COLUMN "city" DROP NOT NULL,
ALTER COLUMN "city" SET DATA TYPE VARCHAR,
ALTER COLUMN "state" DROP NOT NULL,
ALTER COLUMN "state" SET DATA TYPE VARCHAR;

-- AlterTable
ALTER TABLE "Entity" DROP COLUMN "createdAt",
DROP COLUMN "createdBy",
ADD COLUMN     "cep" VARCHAR,
ADD COLUMN     "complement" VARCHAR,
ADD COLUMN     "neighborhood" VARCHAR,
ADD COLUMN     "number" INTEGER,
ADD COLUMN     "observation" VARCHAR,
ALTER COLUMN "ie" DROP NOT NULL,
ALTER COLUMN "ie" SET DATA TYPE VARCHAR,
ALTER COLUMN "phone" DROP NOT NULL,
ALTER COLUMN "phone" SET DATA TYPE VARCHAR,
ALTER COLUMN "email" DROP NOT NULL,
ALTER COLUMN "email" SET DATA TYPE VARCHAR,
ALTER COLUMN "address" DROP NOT NULL,
ALTER COLUMN "address" SET DATA TYPE VARCHAR,
ALTER COLUMN "city" DROP NOT NULL,
ALTER COLUMN "city" SET DATA TYPE VARCHAR,
ALTER COLUMN "state" DROP NOT NULL,
ALTER COLUMN "state" SET DATA TYPE VARCHAR,
ALTER COLUMN "cpfCnpj" SET DATA TYPE VARCHAR,
ALTER COLUMN "registerName" SET DATA TYPE VARCHAR,
ALTER COLUMN "sampleName" SET DATA TYPE VARCHAR,
ALTER COLUMN "type" SET DATA TYPE VARCHAR;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "defaultCompany",
ALTER COLUMN "email" SET DATA TYPE VARCHAR,
ALTER COLUMN "birthdate" SET DATA TYPE DATE,
ALTER COLUMN "firstname" SET DATA TYPE VARCHAR,
ALTER COLUMN "lastname" SET DATA TYPE VARCHAR,
ALTER COLUMN "password" SET DATA TYPE VARCHAR,
ALTER COLUMN "phone" SET DATA TYPE VARCHAR;

-- DropTable
DROP TABLE "AccountsPayable";

-- DropTable
DROP TABLE "AccountsPayableExpenseCategory";

-- DropTable
DROP TABLE "CompaniesOnUsers";

-- DropTable
DROP TABLE "ExpenseCategory";

-- DropTable
DROP TABLE "Suppliers";

-- CreateTable
CREATE TABLE "CompanyEntity" (
    "idCompany" INTEGER NOT NULL,
    "idEntity" INTEGER NOT NULL,

    CONSTRAINT "CompanyEntity_pkey" PRIMARY KEY ("idCompany","idEntity")
);

-- CreateTable
CREATE TABLE "EntityClient" (
    "id" SERIAL NOT NULL,
    "idEntity" INTEGER,

    CONSTRAINT "EntityClient_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EntitySupplier" (
    "id" SERIAL NOT NULL,
    "idEntity" INTEGER,

    CONSTRAINT "EntitySupplier_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserCompany" (
    "idUser" INTEGER NOT NULL,
    "idCompany" INTEGER NOT NULL,
    "permission" INTEGER NOT NULL,
    "defaultCompany" BOOLEAN NOT NULL,

    CONSTRAINT "UserCompany_pkey" PRIMARY KEY ("idUser","idCompany")
);

-- CreateIndex
CREATE UNIQUE INDEX "Entity_registerName_key" ON "Entity"("registerName");

-- CreateIndex
CREATE UNIQUE INDEX "User_phone_key" ON "User"("phone");

-- AddForeignKey
ALTER TABLE "CompanyEntity" ADD CONSTRAINT "CompanyEntity_idCompany_fkey" FOREIGN KEY ("idCompany") REFERENCES "Company"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "CompanyEntity" ADD CONSTRAINT "CompanyEntity_idEntity_fkey" FOREIGN KEY ("idEntity") REFERENCES "Entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "EntityClient" ADD CONSTRAINT "EntityClient_idEntity_fkey" FOREIGN KEY ("idEntity") REFERENCES "Entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "EntitySupplier" ADD CONSTRAINT "EntitySupplier_idEntity_fkey" FOREIGN KEY ("idEntity") REFERENCES "Entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "UserCompany" ADD CONSTRAINT "UserCompany_idCompany_fkey" FOREIGN KEY ("idCompany") REFERENCES "Company"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "UserCompany" ADD CONSTRAINT "UserCompany_idUser_fkey" FOREIGN KEY ("idUser") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
