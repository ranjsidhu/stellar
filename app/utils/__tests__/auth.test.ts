import { NextResponse } from "next/server";
import { prisma } from "@/app/api/utils/prisma-utils";
import { getSession } from "@/app/utils/session";
import {
  checkAdminAccess,
  checkRecruiterAccess,
  checkAdminOrRecruiterAccess,
  removeUndefined,
  validateUserIdMatch,
} from "@/app/utils/auth";

// Suppress console.error for cleaner test output
beforeAll(() => {
  jest.spyOn(console, "error").mockImplementation(() => {});
});
afterAll(() => {
  (console.error as jest.Mock).mockRestore();
});

// Mock NextResponse
const jsonMock = jest.fn((body, init) => ({ body, init }));
jest.spyOn(NextResponse, "json").mockImplementation(jsonMock as any);

// Mock dependencies
jest.mock("@/app/utils/session", () => ({ getSession: jest.fn() }));
jest.mock("@/app/api/utils/prisma-utils", () => ({
  prisma: { users: { findUnique: jest.fn() } },
}));
jest.mock("@/app/utils/config", () => ({
  config: {
    adminRoleName: "admin",
    recruiterRoleName: "recruiter",
  },
}));

describe("auth-utils", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("check*Access functions (via getAuthenticatedUser)", () => {
    it("returns 401 if no session", async () => {
      (getSession as jest.Mock).mockResolvedValue(null);

      const result = await checkAdminAccess();
      expect(result.isAuthorized).toBe(false);
      expect(NextResponse.json).toHaveBeenCalledWith(
        { error: "Unauthorized: No session found" },
        { status: 401 }
      );
    });

    it("returns 401 if user has no role", async () => {
      (getSession as jest.Mock).mockResolvedValue({
        user: { email: "a@b.com" },
      });
      (prisma.users.findUnique as jest.Mock).mockResolvedValue({
        id: 1,
        roles: null,
      });

      const result = await checkAdminAccess();
      expect(result.isAuthorized).toBe(false);
      expect(NextResponse.json).toHaveBeenCalledWith(
        { error: "Unauthorized: User not found or has no role" },
        { status: 401 }
      );
    });

    it("returns 500 if getAuthenticatedUser throws", async () => {
      (getSession as jest.Mock).mockRejectedValue(new Error("db fail"));

      const result = await checkAdminAccess();
      expect(result.isAuthorized).toBe(false);
      expect(NextResponse.json).toHaveBeenCalledWith(
        { error: "Internal server error" },
        { status: 500 }
      );
    });

    it("returns 403 if role mismatch", async () => {
      (getSession as jest.Mock).mockResolvedValue({
        user: { email: "x@y.com" },
      });
      (prisma.users.findUnique as jest.Mock).mockResolvedValue({
        id: 1,
        roles: { name: "user" },
      });

      const result = await checkAdminAccess();
      expect(result.isAuthorized).toBe(false);
      expect(NextResponse.json).toHaveBeenCalledWith(
        { error: "Unauthorized: admin access required" },
        { status: 403 }
      );
    });

    it("returns authorized if role matches admin", async () => {
      (getSession as jest.Mock).mockResolvedValue({
        user: { email: "x@y.com" },
      });
      (prisma.users.findUnique as jest.Mock).mockResolvedValue({
        id: 1,
        roles: { name: "admin" },
      });

      const result = await checkAdminAccess();
      expect(result).toEqual({
        isAuthorized: true,
        response: null,
        user: { id: 1, role: "admin" },
      });
    });

    it("works with recruiter role", async () => {
      (getSession as jest.Mock).mockResolvedValue({
        user: { email: "x@y.com" },
      });
      (prisma.users.findUnique as jest.Mock).mockResolvedValue({
        id: 2,
        roles: { name: "recruiter" },
      });

      const result = await checkRecruiterAccess();
      expect(result.isAuthorized).toBe(true);
    });

    it("works with admin or recruiter role", async () => {
      (getSession as jest.Mock).mockResolvedValue({
        user: { email: "x@y.com" },
      });
      (prisma.users.findUnique as jest.Mock).mockResolvedValue({
        id: 3,
        roles: { name: "admin" },
      });

      const result = await checkAdminOrRecruiterAccess();
      expect(result.isAuthorized).toBe(true);
    });
  });

  describe("removeUndefined", () => {
    it("removes undefined, null, and empty string", () => {
      const obj = { a: 1, b: undefined, c: null, d: "", e: "ok" };
      expect(removeUndefined(obj)).toEqual({ a: 1, e: "ok" });
    });
  });

  describe("validateUserIdMatch", () => {
    it("returns not authorized if getAuthenticatedUser fails", async () => {
      (getSession as jest.Mock).mockResolvedValue(null);
      const result = await validateUserIdMatch("1");
      expect(result.isAuthorized).toBe(false);
      expect(result.response).not.toBeNull();
    });

    it("returns 400 if no userId provided", async () => {
      (getSession as jest.Mock).mockResolvedValue({
        user: { email: "x@y.com" },
      });
      (prisma.users.findUnique as jest.Mock).mockResolvedValue({
        id: 10,
        roles: { name: "admin" },
      });

      const result = await validateUserIdMatch(undefined);
      expect(result.isAuthorized).toBe(false);
      expect(NextResponse.json).toHaveBeenCalledWith(
        { error: "User ID parameter is required" },
        { status: 400 }
      );
    });

    it("returns 403 if userId does not match", async () => {
      (getSession as jest.Mock).mockResolvedValue({
        user: { email: "x@y.com" },
      });
      (prisma.users.findUnique as jest.Mock).mockResolvedValue({
        id: 10,
        roles: { name: "admin" },
      });

      const result = await validateUserIdMatch("11");
      expect(result.isAuthorized).toBe(false);
      expect(NextResponse.json).toHaveBeenCalledWith(
        { error: "Unauthorized: User ID does not match session" },
        { status: 403 }
      );
    });

    it("returns authorized if userId matches", async () => {
      (getSession as jest.Mock).mockResolvedValue({
        user: { email: "x@y.com" },
      });
      (prisma.users.findUnique as jest.Mock).mockResolvedValue({
        id: 5,
        roles: { name: "admin" },
      });

      const result = await validateUserIdMatch("5");
      expect(result).toEqual({
        isAuthorized: true,
        response: null,
        userId: 5,
      });
    });
  });
});
