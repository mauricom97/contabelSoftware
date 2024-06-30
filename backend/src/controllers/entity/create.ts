import { Request, Response } from "express";
import { interfaceEntity } from "../../interfaces";
import { io } from "../../app";
import prisma from "../../middlewares/connPrisma"

const create = async (req: Request, res: Response) => {
  try {
    const requestData = extractData(req);
    const entity = await createEntity(requestData);
    await createCompanyEntity(req, entity);
    if (requestData.isSupplier) await createSupplier(req, entity);
    io.emit("newEntity", entity);
    res.send(entity);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

function extractData(request: any) {
  const {
    type,
    registerName,
    sampleName,
    cpfCnpj,
    ie,
    phone,
    email,
    cep,
    address,
    number,
    complement,
    neighborhood,
    city,
    state,
    observation,
    isSupplier,
  } = request.body;
  return {
    type,
    registerName,
    sampleName,
    cpfCnpj,
    ie,
    phone,
    email,
    cep,
    address,
    number,
    complement,
    neighborhood,
    city,
    state,
    observation,
    isSupplier,
  };
}

async function createEntity(requestData: interfaceEntity) {
  try {
    return await prisma.entity.create({
      data: {
        type: requestData.type,
        registerName: requestData.registerName,
        sampleName: requestData.sampleName,
        cpfCnpj: requestData.cpfCnpj,
        ie: requestData.ie,
        phone: requestData.phone,
        email: requestData.email,
        cep: requestData.cep,
        address: requestData.address,
        number: requestData.number,
        complement: requestData.complement,
        neighborhood: requestData.neighborhood,
        city: requestData.city,
        state: requestData.state,
      },
    });
  } catch (error: any) {
    console.log(error);
    throw new Error(error);
  }
}

async function createCompanyEntity(req: any, entityCompany: any) {
  try {
    return await prisma.companyEntity.create({
      data: {
        idCompany: parseInt(req.company),
        idEntity: entityCompany.id,
      },
    });
  } catch (error: any) {
    console.log(error);
    throw new Error(error);
  }
}

async function createSupplier(req: any, entity: any) {
  try {
    return await prisma.supplier.create({
      data: {
        idEntity: entity.id,
      },
    });
  } catch (error: any) {
    throw new Error(error);
  }
}

export default create;
