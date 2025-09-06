// app/utils/__tests__/signInCallback.test.ts
import { signInCallback } from "../signInCallback";
import { prisma } from "@/app/api/utils/prisma-utils";

beforeEach(() => {
  jest.spyOn(console, "error").mockImplementation(() => {});
  jest.spyOn(console, "log").mockImplementation(() => {});
});

jest.mock("@/app/api/utils/prisma-utils", () => ({
  prisma: {
    users: {
      findUnique: jest.fn(),
      create: jest.fn(),
    },
  },
}));

describe("signInCallback", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("returns false if user.email is missing", async () => {
    const result = await signInCallback({
      user: { email: "", name: "Test User" } as any,
      account: null,
    });
    expect(result).toBe(false);
  });

  it("returns true if existing user is found", async () => {
    const mockUser = {
      id: 1,
      email: "test@example.com",
      roles: { name: "Admin" },
    };
    (prisma.users.findUnique as jest.Mock).mockResolvedValue(mockUser);

    const result = await signInCallback({
      user: { email: "test@example.com", name: "Test User" } as any,
      account: null,
    });

    expect(prisma.users.findUnique).toHaveBeenCalledWith({
      where: { email: "test@example.com" },
      include: { roles: true },
    });
    expect(result).toBe(true);
  });

  it("creates a new user if none found and returns true", async () => {
    (prisma.users.findUnique as jest.Mock).mockResolvedValue(null);
    const createdUser = {
      id: 2,
      email: "new@example.com",
      roles: { name: "Candidate" },
    };
    (prisma.users.create as jest.Mock).mockResolvedValue(createdUser);

    const result = await signInCallback({
      user: { email: "new@example.com", name: "New User" } as any,
      account: null,
    });

    expect(prisma.users.create).toHaveBeenCalledWith({
      data: {
        email: "new@example.com",
        first_name: "New",
        last_name: "User",
        roles: {
          connect: { id: 3 },
        },
      },
      include: { roles: true },
    });
    expect(result).toBe(true);
  });

  it("returns false if prisma throws an error", async () => {
    (prisma.users.findUnique as jest.Mock).mockRejectedValue(
      new Error("DB failure")
    );

    const result = await signInCallback({
      user: { email: "fail@example.com", name: "Fail User" } as any,
      account: null,
    });

    expect(result).toBe(false);
  });
});
