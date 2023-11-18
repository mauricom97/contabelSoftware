import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import { Request, Response, NextFunction } from "express";

async function create(req: any, res: Response, next: NextFunction) {
  try {
    const requestData = extractData(req);
    console.log(requestData);
    await analyseData(requestData);
    const newCompany = await createNewCompany(requestData);
    await associateCompanyWithUser(newCompany.id, req.user.id);
    res.send(newCompany);
  } catch (error: any) {
    console.error(error);
    res.status(404).send({ error: error.message });
  }
}

function extractData(req: Request) {
  const { body } = req;
  const {
    sampleName,
    registerName,
    cnpj,
    ie,
    phone,
    email,
    address,
    city,
    state,
  } = body;
  return {
    sampleName,
    registerName,
    cnpj,
    ie,
    phone,
    email,
    address,
    city,
    state,
  };
}

async function analyseData(requestData: {
  sampleName: string;
  registerName: string;
  cnpj: string;
  ie: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  state: string;
}) {
  const {
    sampleName,
    registerName,
    cnpj,
    ie,
    phone,
    email,
    address,
    city,
    state,
  } = requestData;
  if (
    !sampleName ||
    !registerName ||
    !cnpj ||
    !ie ||
    !phone ||
    !email ||
    !address ||
    !city ||
    !state
  ) {
    throw new Error("Missing data");
  }
}

async function createNewCompany(requestData: {
  sampleName: string;
  registerName: string;
  cnpj: string;
  ie: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  state: string;
}) {
  const {
    sampleName,
    registerName,
    cnpj,
    ie,
    phone,
    email,
    address,
    city,
    state,
  } = requestData;

  const newCompany = await prisma.company.create({
    data: {
      sampleName,
      registerName,
      cnpj,
      ie,
      phone,
      email,
      address,
      city,
      state,
    },
  });
  return newCompany;
}

async function associateCompanyWithUser(companyId: number, userId: number) {
  const assignedBy = "someValue"; // Substitua "someValue" pelo valor apropriado ou lógica de atribuição
  await prisma.companiesOnUsers.create({
    data: {
      companyId,
      userId,
      assignedBy,
    },
  });
}

export default create;
