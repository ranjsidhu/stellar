// app/utils/__tests__/session.test.ts
import { getSession } from "../session";

// Mock the auth module
jest.mock("@/auth", () => ({
  auth: jest.fn(),
}));

import { auth } from "@/auth";

describe("getSession", () => {
  it("calls auth and returns the session", async () => {
    // Arrange: mock auth to return a fake session object
    const fakeSession = { userId: "123", token: "abc" };
    (auth as jest.Mock).mockResolvedValue(fakeSession);

    // Act
    const session = await getSession();

    // Assert
    expect(auth).toHaveBeenCalled();
    expect(session).toBe(fakeSession);
  });

  it("propagates errors from auth", async () => {
    // Arrange: mock auth to reject with an error
    const error = new Error("auth failed");
    (auth as jest.Mock).mockRejectedValue(error);

    // Act & Assert
    await expect(getSession()).rejects.toThrow("auth failed");
  });
});
