import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import { Request, Response, NextFunction } from "express";

async function create(req: Request, res: Response, next: NextFunction) {
  try {
    const requestData = extractData(req);
    await analyseData(requestData);
    const newCompany = await createNewCompany(requestData);
    res.send(newCompany);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'An error occurred while creating the company.' });
  }
}

function extractData(req: Request) {
  const { body } = req;
  const { sampleName, registerName, cnpj, ie, phone, email, address, city, state } = body;
  return { sampleName, registerName, cnpj, ie, phone, email, address, city, state };
}

async function analyseData(requestData: { sampleName: string; registerName: string; cnpj: string; ie: string; phone: string; email: string; address: string; city: string; state: string; }) {
  const { sampleName, registerName, cnpj, ie, phone, email, address, city, state } =
    requestData;
  if (!sampleName || !registerName || !cnpj || !ie || !phone || !email || !address || !city || !state) {
    throw new Error("Missing data");
  }
}

async function createNewCompany(requestData: { sampleName: string; registerName: string; cnpj: string; ie: string; phone: string; email: string; address: string; city: string; state: string; }) {
  const { sampleName, registerName, cnpj, ie, phone, email, address, city, state } =
    requestData;

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
      state
    },
  });
  return newCompany;
}

export default create;