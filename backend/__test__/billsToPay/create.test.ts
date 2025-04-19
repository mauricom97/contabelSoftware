import { Request, Response } from "express";
import { io } from "../../app";
import prisma from "../../middlewares/connPrisma";
import createAccountPayable, { extractData, createAccount } from "./createAccountPayable";

// Mock das dependências externas
jest.mock("../../app", () => ({
  io: {
    emit: jest.fn()
  }
}));

jest.mock("../../middlewares/connPrisma", () => ({
  billsToPay: {
    createMany: jest.fn()
  }
}));

describe("createAccountPayable Controller", () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let mockNext: jest.Mock;

  beforeEach(() => {
    mockRequest = {
      body: [
        {
          description: "Test Bill",
          value: 1000,
          dueDate: "2023-12-31",
          status: "pending",
          companyId: 1,
          idSupplier: 1
        }
      ]
    };
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
      sendStatus: jest.fn()
    };
    mockNext = jest.fn();
    
    // Reset mocks antes de cada teste
    jest.clearAllMocks();
  });

  describe("extractData function", () => {
    it("should correctly extract and transform data from request", () => {
      const result = extractData({
        body: [
          {
            description: "Test",
            value: 100,
            dueDate: "2023-01-01",
            status: "pending",
            companyId: 1,
            idSupplier: 1
          }
        ]
      });

      expect(result).toEqual([
        {
          description: "Test",
          value: 100,
          dueDate: new Date("2023-01-01").toISOString(),
          status: "pending",
          companyId: 1,
          idSupplier: 1
        }
      ]);
    });

    it("should handle empty array", () => {
      const result = extractData({ body: [] });
      expect(result).toEqual([]);
    });
  });

  describe("createAccount function", () => {
    it("should create accounts in database", async () => {
      const mockData = [
        {
          description: "Test",
          value: 100,
          dueDate: new Date("2023-01-01").toISOString(),
          status: "pending",
          companyId: 1,
          idSupplier: 1
        }
      ];

      (prisma.billsToPay.createMany as jest.Mock).mockResolvedValue({
        count: 1
      });

      await expect(createAccount({} as Request, mockData)).resolves.toEqual({
        count: 1
      });

      expect(prisma.billsToPay.createMany).toHaveBeenCalledWith({
        data: mockData
      });
    });

    it("should throw error when database operation fails", async () => {
      const mockData = [{}];
      const mockError = new Error("Database error");

      (prisma.billsToPay.createMany as jest.Mock).mockRejectedValue(mockError);

      await expect(createAccount({} as Request, mockData)).rejects.toThrow(mockError);
    });
  });

  describe("createAccountPayable controller", () => {
    it("should successfully create account payable and emit socket event", async () => {
      const mockAccount = { count: 1 };
      
      // Mock das funções chamadas internamente
      jest.spyOn(prisma.billsToPay, 'createMany').mockResolvedValue(mockAccount);

      await createAccountPayable(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.send).toHaveBeenCalledWith(mockAccount);
      expect(io.emit).toHaveBeenCalledWith("newAccountPayable", mockAccount);
    });

    it("should handle error and return 400 status", async () => {
      const mockError = new Error("Test error");
      
      jest.spyOn(prisma.billsToPay, 'createMany').mockRejectedValue(mockError);

      await createAccountPayable(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.send).toHaveBeenCalledWith({ error: "Test error" });
    });

    it("should handle empty request body", async () => {
      mockRequest.body = [];
      
      await createAccountPayable(mockRequest as Request, mockResponse as Response);

      expect(prisma.billsToPay.createMany).toHaveBeenCalledWith({ data: [] });
    });
  });
});