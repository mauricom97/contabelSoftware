import { Request, Response } from "express";
const filters = async (req: Request, res: Response) => {
  try {
    const requestData = extractData(req);
    const entity = await findEntity(req, requestData);
    return res.send(entity);
  } catch (error) {
    console.log(error);
    res.send({ message: "Internal server error" });
  }
};

function extractData(request: Request) {
  const { search, type } = request.query;
  return { search, type };
}

async function findEntity(req: any, requestData: any) {
  try {
    return await req.prisma.entity.findMany({
      where: {
        OR: [
          {
            registerName: {
              contains: requestData.search,
              mode: "insensitive",
            },
          },
          {
            sampleName: {
              contains: requestData.search,
              mode: "insensitive",
            },
          },
          {
            cpfCnpj: {
              contains: requestData.search,
              mode: "insensitive",
            },
          },
        ],
      },
    });
  } catch (error: any) {
    throw new Error(error);
  }
}

export default filters;
