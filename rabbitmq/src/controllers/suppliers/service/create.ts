import prisma from "../../../middlewares/connPrisma"

async function createSupplier(entity: any) {
    try {
      return await prisma.supplier.create({
        data: {
          idEntity: entity.id,
        },
      });
    } catch (error: any) {
      throw new Error(error);
    }
  }

export default createSupplier;