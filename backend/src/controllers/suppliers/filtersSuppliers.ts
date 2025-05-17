import { Request, Response } from "express";
import prisma from "../../middlewares/connPrisma";
async function filtersSuppliers(req: Request, res: Response) {
  try {
    const requestData = extractData(req);
    await analyseData(requestData);
    const suppliers = await getSuppliers(requestData);
    res.send(suppliers);
  } catch (error) {
    console.log(error);
  }
}
export default filtersSuppliers;

function extractData(req: Request) {
  const { filter } = req.query;
  return filter;
}

async function analyseData(request: any) {
  if (!request) {
    throw new Error("You must provide at least one filter");
  }
}

async function getSuppliers(request: any) {
  try {
    const contentFilter = request.toLowerCase();
    let suppliers = await prisma.supplier.findMany({
      where: {
        OR: [
          {
            Entity: {
              sampleName: {
                contains: contentFilter,
                mode: "insensitive",
              },
            },
          },
          {
            Entity: {
              registerName: {
                contains: contentFilter,
                mode: "insensitive",
              },
            },
          },
        ],
      },
      select: {
        Entity: true,
      },
    });
    console.log(suppliers);
    suppliers = suppliers.map((supplier: any) => supplier.Entity);
    return suppliers;
  } catch (error: any) {
    console.log(error);
    throw new Error(error);
  }
}
