import { Response } from "express";
import prisma from "../../middlewares/connPrisma"

async function getUser(req: any, res: Response) {
  let id = parseInt(req.query.id);
  let user = await prisma.user.findFirst({ where: { id } });
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  return res.status(200).json(user);
}

export default getUser;
