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
    let companies = await req.prisma.UserCompany.findMany({
      where: {
        idUser: req.user.id,
      },
      select: {
        Company: true,
      },
    });
    companies = companies.map((company: any) => company.Company);
    return companies;
  } catch (error) {
    console.log(error);
  }
}

export default getCompany;
