import { Response } from "express";
import prisma from "../../middlewares/connPrisma"

async function getCompany(req: any, res: Response) {
  let id = parseInt(req.query.id);
  const company = await prisma.company.findFirst({ where: { id } });
  if (!company) {
    return res.status(404).json({ message: "Company not found" });
  }
  return res.status(200).json(company);
}

export default getCompany;
