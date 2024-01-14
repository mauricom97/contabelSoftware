import { Response } from "express";

async function getUser(req: any, res: Response) {
  let id = parseInt(req.query.id);
  let user = await req.prisma.user.findFirst({ where: { id } });
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  delete user.password;
  return res.status(200).json(user);
}

export default getUser;
