import prisma from "../../../middlewares/connPrisma"
import { CompanyEntity } from "../interfaces/CompanyEntity"

async function create(companyEntity: CompanyEntity) {
    try {
        return await prisma.companyEntity.create({
            data: companyEntity
        })
    } catch (error: any) {
        throw new Error(error)
    }
}

export default create;