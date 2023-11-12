-- CreateTable
CREATE TABLE "Company" (
    "id" SERIAL NOT NULL,
    "sampleName" TEXT NOT NULL,
    "registerName" TEXT NOT NULL,
    "cnpj" TEXT NOT NULL,
    "ie" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "Company_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Company_registerName_key" ON "Company"("registerName");

-- CreateIndex
CREATE UNIQUE INDEX "Company_cnpj_key" ON "Company"("cnpj");

-- CreateIndex
CREATE UNIQUE INDEX "Company_ie_key" ON "Company"("ie");

-- CreateIndex
CREATE UNIQUE INDEX "Company_phone_key" ON "Company"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "Company_email_key" ON "Company"("email");
