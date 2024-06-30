import { Response } from "express";
import prisma from "../../middlewares/connPrisma"

export default async (res: Response) => {
  try {
    const billsToPay = await prisma.billsToPay.findMany({
      orderBy: {
        dueDate: "asc",
      },
    });
    res.send(billsToPay);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
};
