import { Request, Response } from "express";
async function create(req: any, res: Response) {
  try {
    const requestData = extractData(req);
    await analyseData(requestData);
    const newExpenseCategory = await createNewExpenseCategory(req, requestData);
    res.send(newExpenseCategory);
  } catch (error: any) {
    console.error(error);
    res.status(404).send({ error: error.message });
  }
}

function extractData(req: Request) {
  const { name, description } = req.body;
  return { name, description };
}

async function analyseData(requestData: { name: string; description: string }) {
  const { name } = requestData;
  if (!name) throw new Error("Name is required");
}

async function createNewExpenseCategory(
  req: any,
  requestData: { name: string; description: string }
) {
  const { name, description } = requestData;
  const newExpenseCategory = await req.prisma.expenseCategory.create({
    data: {
      name,
      description,
    },
  });
  return newExpenseCategory;
}

export default create;
