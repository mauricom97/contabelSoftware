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
  const { description, amount, dueDate, status, companyId, entityId } =
    req.body;

  return {
    description,
    amount,
    dueDate: new Date(dueDate).toISOString(),
    status,
    companyId,
    entityId,
  };
}
async function createAccount(req: any, newAccount: any) {
  try {
    console.log(newAccount);
    const accountPayable = await req.prisma.accountsPayable.create({
      data: newAccount,
    });
    return accountPayable;
  } catch (error: any) {
    console.log(error);
    throw new Error(error);
  }
}

export default createAccountPayable;
