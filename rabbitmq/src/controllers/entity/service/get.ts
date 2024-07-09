import prisma from "../../../middlewares/connPrisma"

async function get(filters: any) {
    try {
        return await prisma.entity.findUnique({
            where: filters
        })
    } catch (error: any) {
        throw new Error(error)
    }
  
}

export default get;