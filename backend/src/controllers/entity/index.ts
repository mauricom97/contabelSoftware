import prisma from "../../middlewares/connPrisma"

const index = async (req: any, res: any) => {
  try {
    let entities = await prisma.companyEntity.findMany({
      where: {
        idCompany: parseInt(req.company),
      },
      select: {
        Entity: true,
      },
    });
    let data = entities.map((entity: any) => {
      return entity.Entity;
    });
    return res.send(data);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error });
  }
};

export default index;
