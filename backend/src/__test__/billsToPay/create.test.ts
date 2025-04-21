import { Request, Response } from "express";
import createAccountPayable from "../../controllers/billsToPay/create";
import prisma from "../../middlewares/connPrisma";
import { io } from "../../app";

// Mock das dependências externas
jest.mock("../../middlewares/connPrisma");
jest.mock("../../app");

// Tipos para os mocks
const mockRequest = (body: any) => ({
  body
}) as Request;

const mockResponse = () => {
  const res = {} as Response;
  res.status = jest.fn().mockReturnValue(res);
  res.send = jest.fn().mockReturnValue(res);
  return res;
};

describe("createAccountPayable Controller", () => {
  let req: Request;
  let res: Response;

  beforeEach(() => {
    jest.clearAllMocks();
    
    // Configuração padrão dos mocks
    (prisma.billsToPay.createMany as jest.Mock).mockResolvedValue({
      count: 1
    });
    
    (io.emit as jest.Mock).mockReturnValue(null);
  });

  it("should create account payable and emit socket event successfully", async () => {
    // Dados de teste
    const testData = [{
      description: "Test Bill",
      value: 1000,
      dueDate: "2023-12-31",
      status: "pending",
      companyId: 1,
      idSupplier: 1
    }];

    req = mockRequest(testData);
    res = mockResponse();

    await createAccountPayable(req, res);

    // Verificações
    expect(prisma.billsToPay.createMany).toHaveBeenCalledWith({
      data: [{
        description: "Test Bill",
        value: 1000,
        dueDate: new Date("2023-12-31").toISOString(),
        status: "pending",
        companyId: 1,
        idSupplier: 1
      }]
    });

    expect(io.emit).toHaveBeenCalledWith("newAccountPayable", { count: 1 });
    expect(res.send).toHaveBeenCalledWith({ count: 1 });
  });

  it("should handle multiple bills correctly", async () => {
    const testData = [
      {
        description: "Bill 1",
        value: 1000,
        dueDate: "2023-12-31",
        status: "pending",
        companyId: 1,
        idSupplier: 1
      },
      {
        description: "Bill 2",
        value: 2000,
        dueDate: "2024-01-31",
        status: "pending",
        companyId: 1,
        idSupplier: 2
      }
    ];

    req = mockRequest(testData);
    res = mockResponse();

    await createAccountPayable(req, res);

    expect(prisma.billsToPay.createMany).toHaveBeenCalledWith({
      data: [
        {
          description: "Bill 1",
          value: 1000,
          dueDate: new Date("2023-12-31").toISOString(),
          status: "pending",
          companyId: 1,
          idSupplier: 1
        },
        {
          description: "Bill 2",
          value: 2000,
          dueDate: new Date("2024-01-31").toISOString(),
          status: "pending",
          companyId: 1,
          idSupplier: 2
        }
      ]
    });
  });

  it("should return 400 status when Prisma throws an error", async () => {
    const testData = [{
      description: "Test Bill",
      value: 1000,
      dueDate: "2023-12-31",
      status: "pending",
      companyId: 1,
      idSupplier: 1
    }];

    const errorMessage = "Database error";
    (prisma.billsToPay.createMany as jest.Mock).mockRejectedValue(new Error(errorMessage));

    req = mockRequest(testData);
    res = mockResponse();

    await createAccountPayable(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith({ error: errorMessage });
  });

  it("should convert dueDate to ISO string format", async () => {
    const testData = [{
      description: "Test Bill",
      value: 1000,
      dueDate: "December 31, 2023",
      status: "pending",
      companyId: 1,
      idSupplier: 1
    }];

    req = mockRequest(testData);
    res = mockResponse();

    await createAccountPayable(req, res);

    expect(prisma.billsToPay.createMany).toHaveBeenCalledWith({
      data: [{
        description: "Test Bill",
        value: 1000,
        dueDate: new Date("December 31, 2023").toISOString(),
        status: "pending",
        companyId: 1,
        idSupplier: 1
      }]
    });
  });
});