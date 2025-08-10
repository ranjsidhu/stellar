// app/api/utils/__tests__/routeProtection.test.ts

import { NextRequest, NextResponse } from "next/server";

// Mock all the auth-related modules before importing the functions to test
jest.mock("@/auth");
jest.mock("@/app/utils/session");
jest.mock("@/app/utils/auth");

// Now import the functions to test
import {
  withUserProtection,
  withAdminProtection,
  withRecruiterProtection,
  withAdminOrRecruiterProtection,
} from "@/app/api/utils/routeProtection";

import { getSession } from "@/app/utils/session";
import {
  checkAdminAccess,
  checkRecruiterAccess,
  checkAdminOrRecruiterAccess,
} from "@/app/utils/auth";

// Type the mocked functions
const mockedGetSession = getSession as jest.MockedFunction<typeof getSession>;
const mockedCheckAdminAccess = checkAdminAccess as jest.MockedFunction<
  typeof checkAdminAccess
>;
const mockedCheckRecruiterAccess = checkRecruiterAccess as jest.MockedFunction<
  typeof checkRecruiterAccess
>;
const mockedCheckAdminOrRecruiterAccess =
  checkAdminOrRecruiterAccess as jest.MockedFunction<
    typeof checkAdminOrRecruiterAccess
  >;

describe("Route Protection Utils", () => {
  let mockRequest: NextRequest;
  let mockContext: any;
  let mockHandler: jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();

    // Create mock request
    mockRequest = new NextRequest("http://localhost:3000/api/test");

    // Create mock context
    mockContext = { params: { id: "123" } };

    // Create mock handler that returns a NextResponse
    mockHandler = jest
      .fn()
      .mockResolvedValue(NextResponse.json({ success: true }));
  });

  describe("withUserProtection", () => {
    it("should allow access when user session exists", async () => {
      mockedGetSession.mockResolvedValue({
        user: {
          email: "user@example.com",
          id: "1",
          name: "Test User",
        },
        expires: new Date(Date.now() + 86400000).toISOString(),
      } as any);

      const protectedHandler = withUserProtection(mockHandler);
      const response = await protectedHandler(mockRequest, mockContext);

      expect(mockHandler).toHaveBeenCalledWith(mockRequest, mockContext);
      expect(await response.json()).toEqual({ success: true });
    });

    it("should deny access when no session exists", async () => {
      mockedGetSession.mockResolvedValue(null);

      const protectedHandler = withUserProtection(mockHandler);
      const response = await protectedHandler(mockRequest, mockContext);

      expect(mockHandler).not.toHaveBeenCalled();
      expect(response.status).toBe(401);
      expect(await response.json()).toEqual({
        isAuthorized: false,
        error: "Unauthorized: No session found",
      });
    });

    it("should deny access when session exists but no user", async () => {
      mockedGetSession.mockResolvedValue({} as any);

      const protectedHandler = withUserProtection(mockHandler);
      const response = await protectedHandler(mockRequest, mockContext);

      expect(mockHandler).not.toHaveBeenCalled();
      expect(response.status).toBe(401);
    });

    it("should deny access when user exists but no email", async () => {
      mockedGetSession.mockResolvedValue({
        user: {
          name: "John Doe",
          id: "1",
        },
        expires: new Date(Date.now() + 86400000).toISOString(),
      } as any);

      const protectedHandler = withUserProtection(mockHandler);
      const response = await protectedHandler(mockRequest, mockContext);

      expect(mockHandler).not.toHaveBeenCalled();
      expect(response.status).toBe(401);
    });
  });

  describe("withAdminProtection", () => {
    it("should allow access when user is admin", async () => {
      mockedCheckAdminAccess.mockResolvedValue({
        isAuthorized: true,
        response: null,
      } as any);

      const protectedHandler = withAdminProtection(mockHandler);
      const response = await protectedHandler(mockRequest, mockContext);

      expect(mockedCheckAdminAccess).toHaveBeenCalled();
      expect(mockHandler).toHaveBeenCalledWith(mockRequest, mockContext);
      expect(await response.json()).toEqual({ success: true });
    });

    it("should deny access when user is not admin", async () => {
      const mockUnauthorizedResponse = NextResponse.json(
        { error: "Admin access required" },
        { status: 403 }
      );

      mockedCheckAdminAccess.mockResolvedValue({
        isAuthorized: false,
        response: mockUnauthorizedResponse,
      } as any);

      const protectedHandler = withAdminProtection(mockHandler);
      const response = await protectedHandler(mockRequest, mockContext);

      expect(mockedCheckAdminAccess).toHaveBeenCalled();
      expect(mockHandler).not.toHaveBeenCalled();
      expect(response).toBe(mockUnauthorizedResponse);
    });

    it("should allow access when isAuthorized is false but no response", async () => {
      mockedCheckAdminAccess.mockResolvedValue({
        isAuthorized: false,
        response: null,
      } as any);

      const protectedHandler = withAdminProtection(mockHandler);
      await protectedHandler(mockRequest, mockContext);

      expect(mockedCheckAdminAccess).toHaveBeenCalled();
      expect(mockHandler).toHaveBeenCalledWith(mockRequest, mockContext);
    });
  });

  describe("withRecruiterProtection", () => {
    it("should allow access when user is recruiter", async () => {
      mockedCheckRecruiterAccess.mockResolvedValue({
        isAuthorized: true,
        response: null,
      } as any);

      const protectedHandler = withRecruiterProtection(mockHandler);
      const response = await protectedHandler(mockRequest, mockContext);

      expect(mockedCheckRecruiterAccess).toHaveBeenCalled();
      expect(mockHandler).toHaveBeenCalledWith(mockRequest, mockContext);
      expect(await response.json()).toEqual({ success: true });
    });

    it("should deny access when user is not recruiter", async () => {
      const mockUnauthorizedResponse = NextResponse.json(
        { error: "Recruiter access required" },
        { status: 403 }
      );

      mockedCheckRecruiterAccess.mockResolvedValue({
        isAuthorized: false,
        response: mockUnauthorizedResponse,
      } as any);

      const protectedHandler = withRecruiterProtection(mockHandler);
      const response = await protectedHandler(mockRequest, mockContext);

      expect(mockedCheckRecruiterAccess).toHaveBeenCalled();
      expect(mockHandler).not.toHaveBeenCalled();
      expect(response).toBe(mockUnauthorizedResponse);
    });
  });

  describe("withAdminOrRecruiterProtection", () => {
    it("should allow access when user is admin or recruiter", async () => {
      mockedCheckAdminOrRecruiterAccess.mockResolvedValue({
        isAuthorized: true,
        response: null,
      } as any);

      const protectedHandler = withAdminOrRecruiterProtection(mockHandler);
      const response = await protectedHandler(mockRequest, mockContext);

      expect(mockedCheckAdminOrRecruiterAccess).toHaveBeenCalled();
      expect(mockHandler).toHaveBeenCalledWith(mockRequest, mockContext);
      expect(await response.json()).toEqual({ success: true });
    });

    it("should deny access when user is neither admin nor recruiter", async () => {
      const mockUnauthorizedResponse = NextResponse.json(
        { error: "Admin or Recruiter access required" },
        { status: 403 }
      );

      mockedCheckAdminOrRecruiterAccess.mockResolvedValue({
        isAuthorized: false,
        response: mockUnauthorizedResponse,
      } as any);

      const protectedHandler = withAdminOrRecruiterProtection(mockHandler);
      const response = await protectedHandler(mockRequest, mockContext);

      expect(mockedCheckAdminOrRecruiterAccess).toHaveBeenCalled();
      expect(mockHandler).not.toHaveBeenCalled();
      expect(response).toBe(mockUnauthorizedResponse);
    });
  });

  describe("Error handling", () => {
    it("should handle errors thrown by the handler", async () => {
      mockedGetSession.mockResolvedValue({
        user: {
          email: "user@example.com",
          id: "1",
          name: "Test User",
        },
        expires: new Date(Date.now() + 86400000).toISOString(),
      } as any);

      const errorHandler = jest
        .fn()
        .mockRejectedValue(new Error("Handler error"));

      const protectedHandler = withUserProtection(errorHandler);

      await expect(protectedHandler(mockRequest, mockContext)).rejects.toThrow(
        "Handler error"
      );

      expect(errorHandler).toHaveBeenCalledWith(mockRequest, mockContext);
    });

    it("should handle errors from getSession", async () => {
      mockedGetSession.mockRejectedValue(new Error("Session error"));

      const protectedHandler = withUserProtection(mockHandler);

      await expect(protectedHandler(mockRequest, mockContext)).rejects.toThrow(
        "Session error"
      );

      expect(mockHandler).not.toHaveBeenCalled();
    });

    it("should handle errors from checkAdminAccess", async () => {
      mockedCheckAdminAccess.mockRejectedValue(new Error("Auth check error"));

      const protectedHandler = withAdminProtection(mockHandler);

      await expect(protectedHandler(mockRequest, mockContext)).rejects.toThrow(
        "Auth check error"
      );

      expect(mockHandler).not.toHaveBeenCalled();
    });
  });
});
