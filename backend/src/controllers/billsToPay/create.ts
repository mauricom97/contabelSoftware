import { Request, Response } from "express";
import { io } from "../../app";

async function createAccountPayable(req: Request, res: Response) {
  try {
    const requestData = extractData(req);
    const newAccountPayable = await createAccount(req, requestData);
    io.emit("newAccountPayable", newAccountPayable);
    return res.send(newAccountPayable);
  } catch (error: any) {
    console.log(error);
    return res.status(400).send({ error: error.message });
  }
}

function extractData(req: any) {
  const bills = req.body.map((bill: bill) => {
    return {
      description: bill.description,
      value: bill.value,
      dueDate: new Date(bill.dueDate).toISOString(),
      status: bill.status,
      companyId: bill.companyId,
      idSupplier: bill.idSupplier,
    };
  });

  return bills;
}
async function createAccount(req: any, newAccount: any) {
  try {
    console.log(newAccount);
    const accountPayable = await req.prisma.BillsToPay.createMany({
      data: newAccount,
    });
    return accountPayable;
  } catch (error: any) {
    console.log(error);
    throw new Error(error);
  }
}

export default createAccountPayable;

interface bill {
  description: string;
  value: number;
  dueDate: string;
  status: string;
  companyId: number;
  idSupplier: number;
}
