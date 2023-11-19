import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async (req: Request, res: Response) => {
  try {
    const requestData = extractData(req);
    await analyseData(requestData);
    const billsToPay = await getBillsToPay(requestData);
    res.send(billsToPay);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
};

function extractData(req: any) {
  const { id, dueDate, status } = req.query;

  return {
    id,
    dueDate: dueDate ? new Date(dueDate).toISOString() : null,
    status,
  };
}

async function analyseData(filters: any) {
  if (!filters.id && !filters.dueDate && !filters.status) {
    throw new Error("You must provide at least one filter");
  }
}

async function getBillsToPay(filters: any) {
  const filter: any = {};
  if (filters.id) {
    filter.id = parseInt(filters.id);
  }
  if (filters.dueDate) {
    filter.dueDate = filters.dueDate;
  }
  if (filters.status) {
    filter.status = filters.status;
  }
  const billsToPay = await prisma.accountsPayable.findMany({
    where: filter,
    orderBy: {
      dueDate: "asc",
    },
  });
  return billsToPay;
}
