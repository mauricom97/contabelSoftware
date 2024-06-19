import { Request, Response } from "express";
import prisma from "../../middlewares/connPrisma";

async function del(req: any, res: Response) {
  try {
    const { id } = req.query;
    const deletedAccount = await prisma.billsToPay.delete({
      where: {
        id: Number(id),
      },
    });
    return res.send(deletedAccount);
  } catch (error: any) {
    console.log(error);
    return res.status(400).send({ error: error.message });
  }
}

export default del;
