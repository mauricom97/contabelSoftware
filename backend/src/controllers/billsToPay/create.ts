import { Request, Response } from "express";
import { io } from "../../app";

async function createAccountPayable(req: Request, res: Response) {
  const requestData = extractData(req);
  const newAccountPayable = await createAccount(req, requestData);
  io.emit("newAccountPayable", newAccountPayable);
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
async function createAccount(req: any, newAccount: any) {
  const accountPayable = await req.prisma.accountsPayable.create({
    data: newAccount,
  });
  return accountPayable;
}

export default createAccountPayable;
