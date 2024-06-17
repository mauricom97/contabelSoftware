-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" VARCHAR NOT NULL,
    "birthdate" DATE NOT NULL,
    "firstname" VARCHAR NOT NULL,
    "lastname" VARCHAR NOT NULL,
    "password" VARCHAR NOT NULL,
    "phone" VARCHAR NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Company" (
    "id" SERIAL NOT NULL,
    "sampleName" VARCHAR NOT NULL,
    "registerName" VARCHAR NOT NULL,
    "cnpj" VARCHAR NOT NULL,
    "ie" VARCHAR,
    "phone" VARCHAR,
    "email" VARCHAR,
    "address" VARCHAR,
    "city" VARCHAR,
    "state" VARCHAR,

    CONSTRAINT "Company_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Entity" (
    "id" SERIAL NOT NULL,
    "ie" VARCHAR,
    "phone" VARCHAR,
    "email" VARCHAR,
    "address" VARCHAR,
    "city" VARCHAR,
    "state" VARCHAR,
    "cpfCnpj" VARCHAR NOT NULL,
    "registerName" VARCHAR NOT NULL,
    "sampleName" VARCHAR NOT NULL,
    "type" VARCHAR NOT NULL,
    "cep" VARCHAR,
    "complement" VARCHAR,
    "neighborhood" VARCHAR,
    "number" INTEGER,
    "observation" VARCHAR,

    CONSTRAINT "Entity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CompanyEntity" (
    "idCompany" INTEGER NOT NULL,
    "idEntity" INTEGER NOT NULL,

    CONSTRAINT "CompanyEntity_pkey" PRIMARY KEY ("idCompany","idEntity")
);

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

-- CreateTable
CREATE TABLE "UserCompany" (
    "idUser" INTEGER NOT NULL,
    "idCompany" INTEGER NOT NULL,
    "permission" INTEGER NOT NULL,
    "defaultCompany" BOOLEAN NOT NULL,

    CONSTRAINT "UserCompany_pkey" PRIMARY KEY ("idUser","idCompany")
);

-- CreateTable
CREATE TABLE "BillsToPay" (
    "id" SERIAL NOT NULL,
    "description" TEXT,
    "dueDate" TIMESTAMP(3) NOT NULL,
    "value" DOUBLE PRECISION NOT NULL,
    "status" INTEGER NOT NULL,
    "companyId" INTEGER NOT NULL,
    "idSupplier" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "BillsToPay_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_phone_key" ON "User"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "Company_registerName_key" ON "Company"("registerName");

-- CreateIndex
CREATE UNIQUE INDEX "Company_cnpj_key" ON "Company"("cnpj");

-- CreateIndex
CREATE UNIQUE INDEX "Entity_cpfCnpj_key" ON "Entity"("cpfCnpj");

-- CreateIndex
CREATE UNIQUE INDEX "Entity_registerName_key" ON "Entity"("registerName");

-- AddForeignKey
ALTER TABLE "CompanyEntity" ADD CONSTRAINT "CompanyEntity_idCompany_fkey" FOREIGN KEY ("idCompany") REFERENCES "Company"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "CompanyEntity" ADD CONSTRAINT "CompanyEntity_idEntity_fkey" FOREIGN KEY ("idEntity") REFERENCES "Entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Client" ADD CONSTRAINT "Client_idEntity_fkey" FOREIGN KEY ("idEntity") REFERENCES "Entity"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Supplier" ADD CONSTRAINT "Supplier_idEntity_fkey" FOREIGN KEY ("idEntity") REFERENCES "Entity"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserCompany" ADD CONSTRAINT "UserCompany_idCompany_fkey" FOREIGN KEY ("idCompany") REFERENCES "Company"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "UserCompany" ADD CONSTRAINT "UserCompany_idUser_fkey" FOREIGN KEY ("idUser") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "BillsToPay" ADD CONSTRAINT "BillsToPay_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BillsToPay" ADD CONSTRAINT "BillsToPay_idSupplier_fkey" FOREIGN KEY ("idSupplier") REFERENCES "Supplier"("idEntity") ON DELETE RESTRICT ON UPDATE CASCADE;
