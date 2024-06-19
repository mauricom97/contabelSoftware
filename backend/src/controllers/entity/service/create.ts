import InterfaceEntity from "../interfaces/InterfaceEntity"
import prisma from "../../../middlewares/connPrisma"

async function create(supplier: any) {
    try {
        return await prisma.entity.create({
            data: supplier
        })
    } catch (error: any) {
        throw new Error(error)
    }
  
}

export default create;