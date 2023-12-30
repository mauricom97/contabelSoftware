import { Request, Response } from "express";
const getCompany = async (req: Request, res: Response) => {
  try {
    const companiesUser = await getUserCompany(req);
    return res.send(companiesUser);
  } catch (error: any) {
    console.log(error);
    return res.status(400).send({ error: error.message });
  }
};

async function getUserCompany(req: any) {
  try {
    return await req.prisma.companiesOnUsers.findMany({
      where: {
        userId: req.user.id,
      },
      include: {
        company: true,
      },
    });
  } catch (error) {
    console.log(error);
  }
}

export default getCompany;
