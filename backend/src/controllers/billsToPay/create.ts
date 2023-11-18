import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
const prisma = new PrismaClient();

async function createAccountPayable(req: Request, res: Response) {
  const requestData = extractData(req);
  const newAccountPayable = await createAccount(requestData);
  return res.send(newAccountPayable);
}

function extractData(req: any) {
  const { description, amount, dueDate, status, companyId } = req.body;

  return {
    description,
    amount,
    dueDate: new Date(dueDate).toISOString(),
    status,
    companyId,
    createdBy: req.user.name,
  };
}
async function createAccount(newAccount: any) {
  const accountPayable = await prisma.accountsPayable.create({
    data: newAccount,
  });
  return accountPayable;
}

export default createAccountPayable;
