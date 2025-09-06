jest.mock("@/generated/prisma", () => ({
  PrismaClient: jest.fn().mockImplementation(() => ({
    $connect: jest.fn().mockResolvedValue(undefined),
    $disconnect: jest.fn().mockResolvedValue(undefined),
    $on: jest.fn(),
    $use: jest.fn(),
    $extends: jest.fn(),
    $transaction: jest.fn(),
    $queryRaw: jest.fn(),
    $executeRaw: jest.fn(),
  })),
}));

import { prisma } from "@/app/api/utils/prisma-utils";

describe("Prisma Utils", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("prisma instance", () => {
    it("should have standard PrismaClient methods", () => {
      expect(prisma.$connect).toBeDefined();
      expect(prisma.$disconnect).toBeDefined();
      expect(prisma.$on).toBeDefined();
      expect(prisma.$extends).toBeDefined();
      expect(prisma.$transaction).toBeDefined();
    });
  });

  describe("prisma operations", () => {
    it("should allow calling $connect", async () => {
      await prisma.$connect();
      expect(prisma.$connect).toHaveBeenCalledTimes(1);
    });

    it("should allow calling $disconnect", async () => {
      await prisma.$disconnect();
      expect(prisma.$disconnect).toHaveBeenCalledTimes(1);
    });

    it("should allow extensions with $extends", () => {
      const extension = { name: "testExtension" };
      prisma.$extends(extension as any);
      expect(prisma.$extends).toHaveBeenCalledWith(extension);
    });

    it("should allow transactions", async () => {
      const transactionCallback = jest.fn();
      await prisma.$transaction(transactionCallback);
      expect(prisma.$transaction).toHaveBeenCalledWith(transactionCallback);
    });
  });

  describe("module caching", () => {
    it("should use the same instance across multiple imports", () => {
      // Clear the module cache
      jest.resetModules();

      // Mock PrismaClient again for the fresh import
      const mockPrismaClient = () => ({
        $connect: jest.fn(),
        $disconnect: jest.fn(),
      });

      jest.mock("@/generated/prisma", () => ({
        PrismaClient: jest.fn().mockImplementation(mockPrismaClient),
      }));

      // Import multiple times
      const { prisma: firstImport } = require("@/app/api/utils/prisma-utils");
      const { prisma: secondImport } = require("@/app/api/utils/prisma-utils");
      const { prisma: thirdImport } = require("@/app/api/utils/prisma-utils");

      // All imports should reference the same instance
      expect(firstImport).toBe(secondImport);
      expect(secondImport).toBe(thirdImport);
    });
  });
});
