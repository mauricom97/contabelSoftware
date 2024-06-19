import { Request, Response } from "express";
import prisma from "../../middlewares/connPrisma";

export default async (req: Request, res: Response) => {
  try {
    const requestData = extractData(req);
    // await analyseData(requestData);
    const billsToPay = await getBillsToPay(req, requestData);
    res.send(billsToPay);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
};

function extractData(req: any) {
  const { id, dtStart, dtEnd, status } = req.query;

  return {
    id,
    dtStart: dtStart ? new Date(dtStart).toISOString() : null,
    dtEnd: dtEnd ? new Date(dtEnd).toISOString() : null,
    status
  };
}


async function getBillsToPay(req: any, filters: any) {
  const filter: any = {};
  if (filters.id) {
    filter.id = parseInt(filters.id);
  }
  if (filters.dtStart && filters.dtEnd) {
    filter.dueDate = {
      gte: new Date(filters.dtStart),
      lte: new Date(filters.dtEnd),
    };
  }
  filters.status = filters.status.map((s: any) => parseInt(s))
  if (filters.status.length > 0) {
    filter.status = {
      in: filters.status,
    };
  }
  filter.companyId = parseInt(req.company);
  console.log(filter)
  const billsToPay = await prisma.billsToPay.findMany({
    where: filter,
    select: {
      id: true,
      description: true,
      value: true,
      dueDate: true,
      status: true,
      Supplier: {
        select: {
          Entity: true,
        },
      },
    },
    orderBy: {
      dueDate: "asc",
    },
  });
  console.log(billsToPay);
  return billsToPay;
}
