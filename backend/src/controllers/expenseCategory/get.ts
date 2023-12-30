import { Request, Response } from "express";

async function get(req: any, res: Response) {
  try {
    const expenseCategories = await req.prisma.expenseCategory.findMany({
      orderBy: {
        name: "asc",
      },
      where: {
        name: {
          contains: req.query.name as string,
          mode: "insensitive",
        },
      },
    });
    res.send(expenseCategories);
  } catch (error: any) {
    console.error(error);
    res.status(404).send({ error: error.message });
  }
}

export default get;
