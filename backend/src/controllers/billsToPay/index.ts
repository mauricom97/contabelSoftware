import { Request, Response } from "express";

export default async (req: any, res: Response) => {
  try {
    const billsToPay = await req.prisma.accountsPayable.findMany({
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
