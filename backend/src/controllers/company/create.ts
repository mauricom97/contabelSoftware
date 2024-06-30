import prisma from "../../middlewares/connPrisma"
import { Request, Response } from "express";

async function create(req: any, res: Response) {
  try {
    const requestData = extractData(req);
    await analyseData(requestData);
    const newCompany = await createNewCompany(req, requestData);
    await associateCompanyWithUser(req, newCompany.id);
    return res.send(newCompany);
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

async function createNewCompany(
  req: any,
  requestData: {
    sampleName: string;
    registerName: string;
    cnpj: string;
    ie: string;
    phone: string;
    email: string;
    address: string;
    city: string;
    state: string;
  }
) {
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

async function associateCompanyWithUser(req: any, companyId: number) {
  await prisma.userCompany.create({
    data: {
      idUser: req.user.id,
      idCompany: companyId,
      permission: 1,
      defaultCompany: true,
    },
  });

  await prisma.userCompany.updateMany({
    where: {
      idUser: req.user.id,
      idCompany: { not: companyId },
    },
    data: { defaultCompany: false },
  });
}

export default create;
