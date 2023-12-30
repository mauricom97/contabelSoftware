-- AlterTable
ALTER TABLE "AccountsPayable" ADD COLUMN     "expenseCategoryId" INTEGER;

-- CreateTable
CREATE TABLE "ExpenseCategory" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ExpenseCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AccountsPayableExpenseCategory" (
    "accountsPayableId" INTEGER NOT NULL,
    "expenseCategoryId" INTEGER NOT NULL,

    CONSTRAINT "AccountsPayableExpenseCategory_pkey" PRIMARY KEY ("accountsPayableId","expenseCategoryId")
);

-- AddForeignKey
ALTER TABLE "AccountsPayable" ADD CONSTRAINT "AccountsPayable_expenseCategoryId_fkey" FOREIGN KEY ("expenseCategoryId") REFERENCES "ExpenseCategory"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AccountsPayableExpenseCategory" ADD CONSTRAINT "AccountsPayableExpenseCategory_accountsPayableId_fkey" FOREIGN KEY ("accountsPayableId") REFERENCES "AccountsPayable"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AccountsPayableExpenseCategory" ADD CONSTRAINT "AccountsPayableExpenseCategory_expenseCategoryId_fkey" FOREIGN KEY ("expenseCategoryId") REFERENCES "ExpenseCategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
