import prisma from "../../middlewares/connPrisma";

const updateBillToPay = async (billToPayId: number, data: any) => {
  try {
    const updatedBillToPay = await prisma.billsToPay.update({
      where: { id: billToPayId },
      data: {
        description: data.description,
        value: data.value,
        dueDate: new Date(data.dueDate).toISOString(),
        status: data.status,
        companyId: data.companyId,
        idSupplier: data.idSupplier,
      },
    });
    return updatedBillToPay;
  } catch (error: any) {
    console.log(error);
    throw new Error(error);
  }
};

export default updateBillToPay;
