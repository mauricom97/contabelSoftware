import { Request, Response } from "express";
import { interfaceEntity } from "../../interfaces";
import { io } from "../../app";

const create = async (req: Request, res: Response) => {
  try {
    const requestData = extractData(req);
    const entity = await createEntity(req, requestData);
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

async function createEntity(req: any, requestData: interfaceEntity) {
  try {
    const entity = await req.prisma.entity.create({
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
        createdBy: req.user.id.toString(),
        observation: requestData.observation,
      },
    });
    return entity;
  } catch (error: any) {
    throw new Error(error);
  }
}

async function createSupplier(req: any, entity: any) {
  try {
    console.log(entity);
    return await req.prisma.suppliers.create({
      data: {
        entityId: entity.id,
      },
    });
  } catch (error: any) {
    throw new Error(error);
  }
}

export default create;
