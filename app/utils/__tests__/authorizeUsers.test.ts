import { prisma } from "@/app/api/utils/prisma-utils";
import { hashPassword, verifyPassword } from "@/app/utils/password";
import { authorizeUsers } from "@/app/utils/authorizeUsers";

// Mock dependencies
jest.mock("@/app/api/utils/prisma-utils", () => ({
  prisma: {
    users: {
      findUnique: jest.fn(),
      create: jest.fn(),
    },
  },
}));

jest.mock("@/app/utils/password", () => ({
  hashPassword: jest.fn(),
  verifyPassword: jest.fn(),
}));

describe("authorizeUsers", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("returns null if email or password is missing", async () => {
    expect(await authorizeUsers({})).toBeNull();
    expect(await authorizeUsers({ email: "test@example.com" })).toBeNull();
    expect(await authorizeUsers({ password: "123" })).toBeNull();
  });

  it("creates a new user if none found", async () => {
    (prisma.users.findUnique as jest.Mock).mockResolvedValue(null);
    (hashPassword as jest.Mock).mockResolvedValue("hashedpass");
    (prisma.users.create as jest.Mock).mockResolvedValue({
      id: 1,
      email: "new@example.com",
      first_name: "new",
      last_name: "user",
      roles: { name: "admin" },
    });

    const result = await authorizeUsers({
      email: "new@example.com",
      password: "secret",
    });

    expect(hashPassword).toHaveBeenCalledWith("secret");
    expect(prisma.users.create).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({
          email: "new@example.com",
          password: "hashedpass",
        }),
      })
    );
    expect(result).toEqual({
      id: "1",
      email: "new@example.com",
      name: "new user",
      role: "admin",
    });
  });

  it("returns null if password is invalid for existing user", async () => {
    (prisma.users.findUnique as jest.Mock).mockResolvedValue({
      id: 2,
      email: "exist@example.com",
      first_name: "Exist",
      last_name: "User",
      password: "storedHash",
      roles: { name: "user" },
    });
    (verifyPassword as jest.Mock).mockResolvedValue(false);

    const result = await authorizeUsers({
      email: "exist@example.com",
      password: "wrong",
    });

    expect(verifyPassword).toHaveBeenCalledWith("wrong", "storedHash");
    expect(result).toBeNull();
  });

  it("returns user object if password is valid", async () => {
    (prisma.users.findUnique as jest.Mock).mockResolvedValue({
      id: 3,
      email: "exist@example.com",
      first_name: "Exist",
      last_name: "User",
      password: "storedHash",
      roles: { name: "manager" },
    });
    (verifyPassword as jest.Mock).mockResolvedValue(true);

    const result = await authorizeUsers({
      email: "exist@example.com",
      password: "correct",
    });

    expect(result).toEqual({
      id: "3",
      email: "exist@example.com",
      name: "Exist User",
      role: "manager",
    });
  });
});
